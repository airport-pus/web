import { createFlightSearch } from './flight-search';
import {disposeScene} from './dispose-scene';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { softBox, lathe, tube, bake, blobTexture, contactShadow, cuteHead, sneaker, mitten, toyCar } from './toy-kit';

export function mountFeatureScenes(container: Document | HTMLElement = document, onUnavailable: (kind: string) => void = () => {}){
 const cleanups: (() => void)[]=[];
 container.querySelectorAll<HTMLElement>('[data-feature-scene]').forEach(host=>{
  let engine: ReturnType<typeof build> | undefined,visible=false,raf=0,last=0,elapsed=0;
  let unavailable = false;
  function fail() {
   if (unavailable) return;
   unavailable = true;
   cancelAnimationFrame(raf);
   host.removeAttribute('data-ready');
   onUnavailable(host.dataset.featureScene!);
  }
  host.addEventListener('webglcontextlost', fail, true);
  const card=host.closest('[data-story-card]');
  const isActive=()=>visible&&host.dataset.playing !== 'false'&&!document.hidden&&(!card||card.getAttribute('aria-hidden')==='false');
  function sync(){
   if (unavailable) return;
   const active=isActive();
   host.classList.toggle('scene-active',active);
   if(!active){cancelAnimationFrame(raf);raf=0;last=0;return;}
   if(!engine){try{engine=build(host);}catch(error){fail();console.error(error);return;}}
   if(!raf)raf=requestAnimationFrame(tick);
  }
  function tick(now: number) {
   raf = 0;
   if (unavailable || !isActive()) return;
   if (last) elapsed += (now - last) / 1000;
   last = now;
   engine?.render(elapsed);
   raf = requestAnimationFrame(tick);
  }
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'0px'});observer.observe(host);
  function replay(){
   elapsed=0;last=0;engine?.replay?.();sync();
  }
  host.addEventListener('replay-scene',replay);
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('feature-activate',sync);
  cleanups.push(()=>{
   host.removeEventListener('webglcontextlost', fail, true);
   host.removeAttribute('data-ready');
   visible=false;observer.disconnect();cancelAnimationFrame(raf);
   host.removeEventListener('replay-scene',replay);
   document.removeEventListener('visibilitychange',sync);
   document.removeEventListener('feature-activate',sync);
   engine?.dispose();host.classList.remove('scene-active');
  });
 });
 return ()=>cleanups.forEach(dispose=>dispose());
}
function build(host: HTMLElement): {render(time: number): void; dispose(): void; replay?(): void} {
 const kind = host.dataset.featureScene;
 if(kind==='flight') return createFlightSearch(host);
 if (kind !== "crowd" && kind !== "parking") throw new Error("Unknown feature scene");
 const scene = new THREE.Scene();
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio, 1.5), 2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.toneMapping=THREE.NeutralToneMapping;renderer.toneMappingExposure=1;host.appendChild(renderer.domElement);
 const camera=new THREE.PerspectiveCamera(35,1,.1,100);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
 const environmentTarget=pmrem.fromScene(room,.04);scene.environment=environmentTarget.texture;scene.environmentIntensity=.55;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xffffff,0xb5cbe7,2));const sun=new THREE.DirectionalLight(0xffffff,3);sun.position.set(6,12,9);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-14,right:14,top:14,bottom:-14});sun.shadow.normalBias=.03;sun.shadow.radius=4;scene.add(sun);
 const mat=(c: THREE.ColorRepresentation) =>new THREE.MeshStandardMaterial({color:c,roughness:.4,metalness:.06});const physical=(c: THREE.ColorRepresentation) =>new THREE.MeshPhysicalMaterial({color:c,roughness:.35,metalness:.05,clearcoat:1,clearcoatRoughness:.2});const white=mat('#ffffff'),blue=mat('#3182f6'),navy=mat('#233e62'),silver=mat('#afc3de'),glass=mat('#83b4e7');
 const root=new THREE.Group();scene.add(root);
 function mesh(g: THREE.Object3D,geo: THREE.BufferGeometry,m: THREE.Material,x=0,y=0,z=0){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
 function box(g: THREE.Object3D,w: number,h: number,d: number,m: THREE.Material,x=0,y=0,z=0,r=.06){return mesh(g,new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/4,h/4,d/4)),m,x,y,z);}
 function ball(g: THREE.Object3D,r: number,m: THREE.Material,x: number,y: number,z: number){return mesh(g,new THREE.SphereGeometry(r,24,16),m,x,y,z);}
 function cyl(g: THREE.Object3D,r: number,h: number,m: THREE.Material,x: number,y: number,z: number){return mesh(g,new THREE.CylinderGeometry(r,r,h,24),m,x,y,z);}
 const shadow=mesh(scene,new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:.1}),0,-.25,0);shadow.rotation.x=-Math.PI/2;shadow.castShadow=false;
 // 바닥을 화면 밖까지 연장해 받침대 가장자리가 보이지 않게 한다.
 {
  const ground = mesh(scene,new THREE.PlaneGeometry(150,150),mat(kind === 'crowd' ? '#e4edf0' : '#9ba3ae'));
  ground.rotation.x = -Math.PI/2;
  ground.castShadow = false;
  scene.fog = new THREE.FogExp2('#dae8ef', .037);
  scene.background = new THREE.Color('#dae8ef');
  if(kind === 'parking'){
   sun.color.set('#fff0d0');
   sun.position.set(-7,10,5);
   scene.fog = new THREE.FogExp2('#e5f4ff', .014);
   scene.background.set('#e5f4ff');
  }
 }
 let animate: (time: number) => void=()=>{};
 if(kind==='crowd'){
  const cloth = (c: THREE.ColorRepresentation) => new THREE.MeshPhysicalMaterial({color:c,roughness:.8,sheen:.6,sheenColor:new THREE.Color('#ffffff'),sheenRoughness:.6});
  const shirts = ['#6487a0','#e1b39b','#bfc9b4','#9facc3'].map(cloth);
  const pants = ['#2c4a77','#55607a','#3d5f8c','#e9e4da'].map(cloth);
  const hairs = ['#2b3149','#5b3f33','#1f2430','#8a5a3c'].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.55}));
  const skins = ['#f1d2bd','#e8c1a4','#d9a988','#f4dccb'].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.6}));
  const faceParts = {eye:mat('#1d2433'),blush:mat('#f3aaa0'),mouth:mat('#b9655c')};
  const soleMat = mat('#f4f6fa');
  const blob = blobTexture();
  const floorLine=mat('#cfdbdf');
  for(let x=-12;x<=12;x+=2) box(root,.012,.006,10,floorLine,x,.007,0);
  for(let z=-4;z<=4;z+=2) box(root,24,.006,.012,floorLine,0,.007,z);
  const luggageColors = [physical('#78add6'), physical('#d0a381'), physical('#6f9298')];
  // 여행객이 오른손으로 끄는 기내용 캐리어
  function addSuitcase(person: THREE.Object3D, x: number, z: number, shell: THREE.Material) {
   const bag = new THREE.Group();
   bag.position.set(x + .35, .11, z + .19);
   bag.rotation.x = -.16;
   person.add(bag);
   mesh(bag,softBox(.31,.42,.22,.22,.22,.4,14),shell,0,.25,0);
   mesh(bag,softBox(.315,.425,.02,.22,.22,.5,10),navy,0,.25,0);
   for (const dx of [-.10,.10]) {
    mesh(bag,new THREE.SphereGeometry(.035,10,8),navy,dx,.035,.07);
    mesh(bag,new THREE.CylinderGeometry(.012,.012,.21,8),silver,dx,.54,0);
   }
   mesh(bag,softBox(.25,.045,.05,.3,.5,.5,12),navy,0,.65,0);
   bake(bag);
   return bag;
  }
  function addBackpack(person: THREE.Object3D,x: number,z: number,shell: THREE.Material) {
   mesh(person,softBox(.3,.36,.18,.35,.3,.5,14),shell,x,.6,z+.17);
   mesh(person,softBox(.22,.14,.08,.35,.4,.5,10),shell,x,.51,z+.27);
   mesh(person,new THREE.TorusGeometry(.03,.012,6,12,Math.PI),navy,x,.79,z+.17).rotation.y=Math.PI/2;
   for (const dx of [-.11,.11]) mesh(person,tube([[x+dx,.76,z+.1],[x+dx,.82,z],[x+dx,.74,z-.12],[x+dx,.55,z-.1]],.022,{seg:10,radial:6}),navy);
  }
  function shoe(person: THREE.Object3D, x: number, upper: THREE.Material){
   const g = new THREE.Group(); person.add(g); g.position.set(x,0,-.035);
   sneaker((geo,m,a=0,b=0,c=0)=>mesh(g,geo,m,a,b,c),.12,upper,soleMat,0,0,0,.5);
   g.rotation.y = Math.PI; bake(g); return g;
  }
  const heads: THREE.Group[]=[];
  const gestures: THREE.Group[]=[];
  function monitor(x:number,y:number,z:number) {
   box(root,.065,.2,.065,silver,x,y-.18,z);
   box(root,.46,.3,.065,navy,x,y,z);
   box(root,.37,.21,.012,glass,x,y,z+.038);
  }
  // 체크인 카운터, 수하물 저울과 출발장 신분확인 단말기
  box(root,1.38,.72,.7,blue,-7.2,.37,-.57);
  box(root,1.48,.07,.8,white,-7.2,.76,-.57);
  monitor(-7.48,1.05,-.55);
  box(root,.87,.17,.86,navy,-5.99,.09,-.57);
  const bag=addSuitcase(root,-6.28,-.74,luggageColors[0]);bag.position.y+=.18;
  box(root,.5,.85,.46,silver,-5.18,.43,.48);monitor(-5.18,1.07,.51);
  // 트레이 투입구와 사람용 검색대를 분리한다.
  box(root,2.8,.61,.85,silver,.28,.31,-.61);
  box(root,2.9,.09,.9,navy,.28,.66,-.61);
  for(let x=-1.08;x<1.69;x+=.15) box(root,.029,.022,.79,silver,x,.72,-.61);
  for(const z of [-1.05,-.17]) box(root,1.1,.79,.12,blue,1.08,1.12,z);
  box(root,1.16,.14,1,blue,1.08,1.57,-.61);
  for(let z=-.96;z<-.2;z+=.1) box(root,.045,.59,.09,navy,.56,1.2,z);
  const tray=new THREE.Group(); root.add(tray);tray.position.set(-.63,.75,-.61);
  box(tray,.56,.045,.46,white,0,0,0);
  for(const x of [-.27,.27]) box(tray,.04,.09,.46,white,x,.05,0);
  for(const z of [-.21,.21]) box(tray,.56,.09,.04,white,0,.05,z);
  box(tray,.31,.15,.19,luggageColors[1],0,.095,0);
  for(const x of [1.05,1.97]) box(root,.13,1.68,.3,white,x,.85,.81);
  box(root,1.05,.15,.32,white,1.51,1.75,.81);
  // 탑승 대기석과 탑승권 스캐너
  for(const x of [5,5.52,6.04]){
   box(root,.47,.12,.5,navy,x,.42,-1.22);
   box(root,.47,.42,.09,navy,x,.64,-1.47);
   box(root,.08,.38,.13,silver,x,.19,-1.25);
  }
  box(root,.53,.8,.49,blue,6.75,.41,-.42);
  box(root,.41,.055,.36,navy,6.75,.84,-.41);
  const scanner=mat('#78baab');
  box(root,.26,.022,.2,scanner,6.75,.88,-.4);
  function makeTraveler(x:number,depth:number,heading:number,lane:number,row:number,task:'wait'|'scan'|'staff'){
    const person=new THREE.Group();root.add(person);person.position.set(x,0,depth);person.rotation.y=heading;
    const z = 0, i = lane * 2 + row;
    const shirt = shirts[(row+lane)%shirts.length], skin = skins[i%skins.length], hair = hairs[(i+1)%hairs.length], trousers = pants[(row+2*lane)%pants.length];
    for(const dx of [-.085,.085]) shoe(person,dx,i%2 ? navy : white);
    // 몸은 +z 방향으로 만든 다음 검색대가 있는 -z 방향으로 돌린다.
    const fig = new THREE.Group(); fig.rotation.y = Math.PI;
    const f = (geo: THREE.BufferGeometry,m: THREE.Material,a=0,b=0,c=0) => mesh(fig,geo,m,a,b,c);
    for (const dx of [-.085,.085]) f(tube([[dx,.44,0],[dx,.25,0],[dx,.1,.005]],.068,{r2:.058,seg:6,radial:10}),trousers);
    const torso = f(lathe([[0,0],[.17,0],[.2,.05],[.21,.2],[.2,.34],[.15,.43],[.07,.47],[0,.47]],16),shirt,0,.38,0);
    torso.scale.z = .78;
    for (const s of [-1,1]) {
     if(task==='scan' && s===1){
      const arm=new THREE.Group();fig.add(arm);arm.position.set(.18,.76,0);
      const part=(geo:THREE.BufferGeometry,m:THREE.Material,a=0,b=0,c=0)=>mesh(arm,geo,m,a,b,c);
      part(tube([[0,0,0],[.06,-.1,.15],[.05,.01,.34]],.052,{r2:.042,seg:8,radial:8}),shirt);
      mitten(part,.046,skin,.05,.01,.35,1,.5);
      if(lane!==1) box(arm,.16,.014,.11,white,.05,.01,.405);
      bake(arm);gestures.push(arm);continue;
     }
     const pulling = task==='wait' && s < 0 && (lane + row) % 3 !== 1;
     const hand: THREE.Vector3Tuple = pulling ? [-.34,.76,-.09] : [s*.25,.46,.05];
     const elbow: THREE.Vector3Tuple = pulling ? [-.31,.66,-.03] : [s*.25,.58,.02];
     f(tube([[s*.19,.78,0],elbow,hand],.055,{r2:.048,seg:8,radial:8}),shirt);
     mitten(f,.045,skin,hand[0],hand[1]-.03,hand[2],s,.5);
    }
    const head = new THREE.Group(); head.position.set(0,1.06,0); fig.add(head);
    cuteHead((geo,m,a=0,b=0,c=0)=>mesh(head,geo,m,a,b,c),.2,{skin,hair,...faceParts},i%4,.55);
    bake(head); heads.push(head);
    person.add(fig);
    contactShadow(person,blob,.75,.75,{y:.004,opacity:.22});
    const shell = luggageColors[(lane + row) % luggageColors.length];
    if(task==='wait'){
     if ((lane + row) % 3 === 1) addBackpack(person,0,z,shell);
     else addSuitcase(person,0,z,shell);
    }
    bake(fig); bake(person);
  }
  makeTraveler(-7.15,.06,0,0,0,'scan');makeTraveler(-7.35,-1.23,Math.PI,0,2,'staff');
  makeTraveler(-5.12,1.03,0,0,1,'scan');
  makeTraveler(-.72,-.04,0,1,0,'scan');makeTraveler(.14,-1.3,Math.PI,1,3,'staff');
  makeTraveler(-.91,.75,.02,1,2,'wait');makeTraveler(-.94,1.53,.01,1,1,'wait');
  makeTraveler(-.45,2.11,.68,1,4,'wait');makeTraveler(.29,2.15,Math.PI/2,1,3,'wait');
  makeTraveler(.99,2.12,Math.PI/2,1,5,'wait');
  makeTraveler(6.76,.09,0,2,1,'scan');makeTraveler(6.9,-1.02,Math.PI,2,3,'staff');
  makeTraveler(6.25,.95,-.45,2,0,'wait');makeTraveler(5.47,1.15,-1.05,2,2,'wait');
  let lastTime: number | undefined;
  animate=time=>{
   const desiredX=(1-Number(host.dataset.zone ?? 1))*6.45;
   root.position.x=lastTime===undefined ? desiredX :
    THREE.MathUtils.lerp(root.position.x,desiredX,1-Math.exp(-7*Math.max(0,time-lastTime)));
   lastTime=time;
   heads.forEach((head,i)=>{head.rotation.y=.14*Math.sin(time*Math.PI/3+i);});
   gestures.forEach((arm,i)=>{arm.rotation.x=.12+.27*Math.cos(time*Math.PI/2+i);});
   scanner.emissive.set('#448e6b');scanner.emissiveIntensity=.35+.3*Math.cos(time*Math.PI/2);
   // 승객은 대기 위치를 유지하고 트레이만 검색기 안으로 전진한다.
   tray.position.x=-.63+1.77*THREE.MathUtils.smoothstep(time%6,1.4,4.8);
  };
 }else{
  const paint = mat('#e9e9df');
  for(const z of [-2.7,2.7]){
   for(let i=0;i<=6;i++) box(root,.055,.014,2.6,paint,-6+i*2,.012,z);
   box(root,12,.014,.055,paint,0,.012,z+Math.sign(z)*1.3);
  }
  for(const x of [-5,-2.5,0,2.5,5]) box(root,.85,.012,.06,paint,x,.012,0);
  for(const x of [-5.8,5.8]){
   cyl(root,.075,3.5,silver,x,1.75,-4.35);
   mesh(root,softBox(.9,.14,.3,.2,.5,.4),white,x+.32,3.5,-4.35);
   mesh(root,softBox(.7,.03,.2,.2,.5,.4),new THREE.MeshBasicMaterial({color:'#fffaf0'}),x+.36,3.425,-4.35).castShadow=false;
   mesh(root,lathe([[0,0],[.22,0],[.2,.06],[.09,.1],[0,.1]],24),silver,x,0,-4.35);
  }
  const paints = [physical('#ffffff'), physical('#ffffff'), physical('#2b4a78')], arrivingPaint = physical('#3182f6');
  const carGlass = new THREE.MeshPhysicalMaterial({color:'#24364f',roughness:.15,metalness:.2,clearcoat:1});
  const tyre = mat('#2a3340'), rim = mat('#d5dde8'), headlight = new THREE.MeshStandardMaterial({color:'#fffbe8',emissive:'#fff3c4',emissiveIntensity:.4}), taillight = mat('#f2726c');
  const carBlob = blobTexture();
  function car(m: THREE.Material){const g=toyCar(m,carGlass,tyre,rim,headlight,taillight,.82);contactShadow(g,carBlob,1.5,2.4,{y:.006,opacity:.3});root.add(g);return g;}
  const occupied = new Set([0, 1, 3, 4, 6, 8, 11]);

  for(let slot=0; slot<12; slot++){
   const x=-5+(slot%6)*2, z=slot<6?-2.7:2.7;
   if(occupied.has(slot)) car(paints[slot%3]).position.set(x,0,z);

  }
  const arriving = car(arrivingPaint);
  const path = new THREE.CurvePath<THREE.Vector3>();
  path.add(new THREE.LineCurve3(new THREE.Vector3(10,0,0), new THREE.Vector3(2.5,0,0)));
  path.add(new THREE.CubicBezierCurve3(
   new THREE.Vector3(2.5,0,0), new THREE.Vector3(1.5,0,0),
   new THREE.Vector3(1,0,.9), new THREE.Vector3(1,0,1.5)
  ));
  path.add(new THREE.LineCurve3(new THREE.Vector3(1,0,1.5), new THREE.Vector3(1,0,2.7)));

  const reverseRadius = 1.7;
  const straightBack = 2.7 - reverseRadius;
  const reverseLength = straightBack + Math.PI / 2 * reverseRadius;
  const aisleX = 1 - reverseRadius;

  animate = time => {
   const cycle = time % 18;
   arriving.visible = cycle < 17.5;
   host.classList.toggle('parked', cycle >= 5.5 && cycle < 8.5);

   if (cycle < 8.5) {
    const progress = THREE.MathUtils.smoothstep(cycle, 0, 5.5);
    const tangent = path.getTangentAt(progress);
    arriving.position.copy(path.getPointAt(progress));
    arriving.rotation.y = Math.atan2(tangent.x, tangent.z);
   } else if (cycle < 12.8) {
    // 차 뒤가 주차 칸을 벗어나면 오른쪽으로 조향하며 통로까지 후진한다.
    const distance = reverseLength * THREE.MathUtils.smoothstep(cycle, 8.5, 12.8);
    const angle = Math.max(0, distance - straightBack) / reverseRadius;
    arriving.position.set(
     1 - reverseRadius * (1 - Math.cos(angle)), 0,
     2.7 - Math.min(distance, straightBack) - reverseRadius * Math.sin(angle)
    );
    arriving.rotation.y = angle;
   } else {
    // 통로에 정렬한 뒤 잠시 멈추고 원래 출구로 전진한다.
    const progress = THREE.MathUtils.smoothstep(cycle, 13.2, 17.5);
    arriving.position.set(THREE.MathUtils.lerp(aisleX, 10, progress), 0, 0);
    arriving.rotation.y = Math.PI / 2;
   }
  };
 }
 const framing = {
  crowd: { position: [-2.1, 4.1, 6.7], target: [0, .54, .45] },
  parking: { position: [8, 11, 13], target: [0, 0, 0] },
 }[kind];
 const target = new THREE.Vector3(...framing.target);
 const offset = new THREE.Vector3(...framing.position).sub(target);
 let lastFrame = 0;
 function render(time: number) {
  lastFrame = time;
  camera.aspect = host.clientWidth / host.clientHeight;
  camera.position.copy(offset).add(target);
  camera.zoom = Math.max(1, camera.aspect);
  camera.updateProjectionMatrix();
  camera.lookAt(target);
  animate(time);
  renderer.render(scene,camera);
  if (!renderer.getContext().isContextLost()) host.setAttribute('data-ready','');
 }
 const observer=new ResizeObserver(()=>{renderer.setSize(host.clientWidth,host.clientHeight,false);render(lastFrame);});observer.observe(host);
 renderer.setSize(host.clientWidth,host.clientHeight,false);render(0);return {render,dispose(){observer.disconnect();disposeScene(scene,renderer,environmentTarget);}};
}
