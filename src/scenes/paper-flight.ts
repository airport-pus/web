import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { disposeScene } from './dispose-scene';

type FlightFrame = { step: number; progress: number };
type FlightOptions = { onFrame?: (frame: FlightFrame) => void; onReady?: () => void };

/** 종이의 접힌 면과 유리 리본을 실제 메시로 그리는 메인 비주얼. */
export function createPaperFlight(container: HTMLElement, options: FlightOptions = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#b5d6f4');
  scene.fog = new THREE.Fog('#b5d6f4', 19, 48);
  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(2,2), new THREE.ShaderMaterial({
    depthWrite:false, depthTest:false, toneMapped:false,
    vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,.9999,1.);}',
    fragmentShader:'varying vec2 vUv;void main(){vec3 c=mix(vec3(.58,.75,.92),vec3(.82,.91,.99),clamp(1.-vUv.x*.75+vUv.y*.12,0.,1.));c+=pow(max(0.,1.-distance(vUv,vec2(.14,.72))),4.)*.07;gl_FragColor=vec4(c,1.);}',
  }));
  backdrop.frustumCulled=false;backdrop.renderOrder=-100;scene.add(backdrop);
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 80);
  const generator = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = generator.fromScene(room, .035);
  scene.environment = environment.texture;
  scene.environmentIntensity = .7;
  room.dispose(); generator.dispose();
  scene.add(new THREE.HemisphereLight('#ffffff', '#82acd8', 1.1));
  const key = new THREE.DirectionalLight('#ffffff', 2.5);
  key.position.set(-5, 10, 4); scene.add(key);
  const blueLight = new THREE.DirectionalLight('#80baff', 1.1);
  blueLight.position.set(6, 2, -5); scene.add(blueLight);

  const paper = new THREE.MeshPhysicalMaterial({ color: '#eef4ff', roughness: .3, metalness: .06, clearcoat: .22, clearcoatRoughness: .3, side: THREE.DoubleSide });
  const underside = new THREE.MeshPhysicalMaterial({ color: '#a8bedb', roughness: .43, metalness: .03, side: THREE.DoubleSide });
  const airplane = new THREE.Group();
  scene.add(airplane);
  const nose = new THREE.Vector3(0, .12, -2.65);
  const ridge = new THREE.Vector3(0, .82, 1.08);
  const left = new THREE.Vector3(-2.16, .06, 1.64);
  const right = new THREE.Vector3(2.16, .06, 1.64);
  const keel = new THREE.Vector3(0, -.65, 1.72);
  const leftFold = new THREE.Vector3(-.43, .1, 1.4);
  const rightFold = new THREE.Vector3(.43, .1, 1.4);
  function face(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, material: THREE.Material) {
    const u = b.clone().sub(a).normalize();
    const normal = new THREE.Vector3().crossVectors(b.clone().sub(a),c.clone().sub(a)).normalize();
    const v = new THREE.Vector3().crossVectors(normal,u).normalize();
    const local = c.clone().sub(a);
    const shape = new THREE.Shape();
    shape.moveTo(0,0); shape.lineTo(a.distanceTo(b),0); shape.lineTo(local.dot(u),local.dot(v)); shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape,{depth:.012,bevelEnabled:true,bevelThickness:.008,bevelSize:.008,bevelSegments:2,steps:1});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.setRotationFromMatrix(new THREE.Matrix4().makeBasis(u,v,normal)); mesh.position.copy(a); airplane.add(mesh);
  }
  face(nose,left,ridge,paper); face(nose,ridge,right,paper);
  face(nose,leftFold,keel,underside); face(nose,keel,rightFold,paper);
  face(nose,ridge,leftFold,paper); face(nose,rightFold,ridge,paper);
  // 종이 가장자리의 얇은 단면에만 은은한 하이라이트를 더합니다.
  const seams = new THREE.BufferGeometry().setFromPoints([left,nose,right,ridge,left]);
  airplane.add(new THREE.Line(seams, new THREE.LineBasicMaterial({ color:'#f4faff', transparent:true, opacity:.62 })));

  const route = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10,-.8,5), new THREE.Vector3(-6,.1,1),
    new THREE.Vector3(-2,.7,-2.5), new THREE.Vector3(3,.65,-2.8),
    new THREE.Vector3(5,.05,.5), new THREE.Vector3(2,-.65,3.6),
    new THREE.Vector3(-3,-1.1,5.6), new THREE.Vector3(-10,-1.7,7),
  ], false, 'catmullrom', .5);
  const segments=220;
  const positions = new Float32Array((segments+1)*2*3);
  const uv = new Float32Array((segments+1)*2*2);
  const indices: number[]=[];
  for(let i=0;i<=segments;i++) {
    uv.set([i/segments,0,i/segments,1],i*4);
    if(i<segments){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}
  }
  const ribbonGeometry=new THREE.BufferGeometry();
  ribbonGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  ribbonGeometry.setAttribute('uv',new THREE.BufferAttribute(uv,2));
  ribbonGeometry.setIndex(indices);
  const ribbonMaterial = new THREE.MeshPhysicalMaterial({
    color:'#0760da', metalness:.04, roughness:.13, transmission:.2,
    thickness:.32, ior:1.43, clearcoat:1, clearcoatRoughness:.09, side:THREE.DoubleSide,
  });
  const ribbon=new THREE.Mesh(ribbonGeometry,ribbonMaterial);scene.add(ribbon);
  const edgePositions = [new Float32Array((segments+1)*3),new Float32Array((segments+1)*3)];
  const edges = edgePositions.map(values=>{
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(values,3));
    const line=new THREE.Line(geometry,new THREE.LineBasicMaterial({color:'#6aaaff',transparent:true,opacity:.85}));scene.add(line);return line;
  });
  const checkpoints=[.21,.38,.56].map(t=>{
    const group=new THREE.Group();
    const point=route.getPoint(t);group.position.copy(point);group.position.y+=.12;
    const material=new THREE.MeshStandardMaterial({color:'#68acff',emissive:'#298cff',emissiveIntensity:.15,metalness:.4,roughness:.2});
    const sphere=new THREE.Mesh(new THREE.SphereGeometry(.075,20,12),material);group.add(sphere);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.16,.014,8,40),new THREE.MeshBasicMaterial({color:'#e4f5ff',transparent:true,opacity:.3}));ring.rotation.x=Math.PI/2;group.add(ring);scene.add(group);
    return {group,material,ring};
  });
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(.07,20,12),new THREE.MeshBasicMaterial({color:'#ffffff'}));scene.add(pulse);
  const tangent=new THREE.Vector3(),side=new THREE.Vector3(),up=new THREE.Vector3(0,1,0);
  const points=Array.from({length:segments+1},(_,i)=>route.getPoint(i/segments));
  const tangents=Array.from({length:segments+1},(_,i)=>route.getTangent(i/segments));
  function updateRibbon(time:number) {
    for(let i=0;i<=segments;i++) {
      const t=i/segments,p=points[i];tangent.copy(tangents[i]);side.crossVectors(tangent,up).normalize();
      const wave=Math.sin(t*Math.PI*3+time*.36)*.075;
      const twist=.35+Math.sin(t*Math.PI*2-time*.14)*.85;
      const width=.15+Math.sin(t*Math.PI)*.45;
      for(let j=0;j<2;j++) {
        const sign=j===0?-1:1;
        const x=p.x+side.x*width*sign*Math.cos(twist);
        const y=p.y+wave+Math.sin(twist)*width*sign;
        const z=p.z+side.z*width*sign*Math.cos(twist);
        positions.set([x,y,z],(i*2+j)*3);edgePositions[j].set([x,y,z],i*3);
      }
    }
    ribbonGeometry.attributes.position.needsUpdate=true;ribbonGeometry.computeVertexNormals();
    edges.forEach(edge=>{edge.geometry.attributes.position.needsUpdate=true;});
  }
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let disposed=false,frame=0,last=0,time=0,visible=true,progress=0,lastStep=-1,lastReported=-1;
  let width=0,height=0;
  function draw(now:number) {
    if(disposed)return;
    const dt=last?Math.min((now-last)/1000,.05):0;last=now;
    if(visible&&!document.hidden) {
      if(!reduced.matches)time+=dt;
      // 스크롤을 되돌리면 비행과 확인 단계도 같은 경로를 역으로 따라갑니다.
      const journey=THREE.MathUtils.clamp((progress-.12)/.88,0,1);
      const takeoff=THREE.MathUtils.smoothstep(journey,.76,1);
      const travel=.18+journey*.42;
      const point=route.getPoint(travel), direction=route.getTangent(travel);
      airplane.scale.setScalar(1.2);
      airplane.position.copy(point);
      airplane.position.y+=1.8+takeoff*2+Math.sin(time*.8)*.09;
      airplane.rotation.set(.12+takeoff*.22+Math.sin(time*.7)*.025,Math.atan2(-direction.x,-direction.z),-.12+Math.sin(journey*Math.PI*2)*.18);
      updateRibbon(time+journey*8);
      pulse.position.copy(point);pulse.position.y+=.12;
      pulse.scale.setScalar(1);
      const step=journey<.25?0:journey<.5?1:journey<.76?2:3;
      checkpoints.forEach(({material,ring},i)=>{
        material.emissiveIntensity=i<=step?.8:.12;
        ring.scale.setScalar(i===step?1+Math.sin(time*2)*.1:1);
        (ring.material as THREE.MeshBasicMaterial).opacity=i<=step?.85:.25;
      });
      const mobile=width<800;
      const target=airplane.position.clone();target.y-=.7;
      const cameraOffset=new THREE.Vector3(5.8-journey*.8,4.2+Math.sin(journey*Math.PI)*.7,11.5-journey*.8);
      cameraOffset.applyAxisAngle(up,airplane.rotation.y+.88);
      camera.position.copy(target).add(cameraOffset);
      if(mobile)camera.position.sub(target).multiplyScalar(1.45).add(target);
      camera.fov=mobile?43:36;camera.lookAt(target);camera.updateProjectionMatrix();
      renderer.render(scene,camera);
      const rounded=Math.floor(journey*100);
      if(step!==lastStep||rounded!==lastReported){options.onFrame?.({step,progress:journey});lastStep=step;lastReported=rounded;}
    }
    frame=requestAnimationFrame(draw);
  }
  function resize() {
    if(disposed||!container.clientWidth||!container.clientHeight)return;
    if(width===container.clientWidth&&height===container.clientHeight)return;
    width=container.clientWidth;height=container.clientHeight;
    renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
  }
  const observer=new ResizeObserver(resize);observer.observe(container);
  const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});visibility.observe(container);
  const onLost=(event:Event)=>{event.preventDefault();container.dataset.context='lost';};
  renderer.domElement.addEventListener('webglcontextlost',onLost);
  resize();updateRibbon(0);draw(0);container.appendChild(renderer.domElement);options.onReady?.();
  return {
    update(value:number){progress=value;},
    dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();renderer.domElement.removeEventListener('webglcontextlost',onLost);disposeScene(scene,renderer,environment);},
  };
}
