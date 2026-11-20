import { buildTraveler } from "./traveler";
import {disposeScene} from './dispose-scene.js';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { softBox, lathe, tube, bake, blobTexture, contactShadow } from './toy-kit.js';

export function isSoftwareGL(renderer){
 try{const gl=renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');return /swiftshader|llvmpipe|software/i.test(ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'');}catch{return false;}
}
export function createExperience(container){
 let disposed=false;
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
 const small=innerWidth<800;renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio,1.5),2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.toneMapping=THREE.NeutralToneMapping;renderer.toneMappingExposure=1;container.appendChild(renderer.domElement);
 // Software WebGL (no GPU: SwiftShader/llvmpipe) is fill-rate bound; render at 1x there.
 if(isSoftwareGL(renderer))renderer.setPixelRatio(1);
 const scene=new THREE.Scene();scene.background=new THREE.Color('#ffffff');
 const camera=new THREE.PerspectiveCamera(36,1,.1,160);
 const pmrem=new THREE.PMREMGenerator(renderer);const environment=new RoomEnvironment();const environmentTarget=pmrem.fromScene(environment,.04);scene.environment=environmentTarget.texture;scene.environmentIntensity=.6;environment.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xf4f8ff,0x8ea3c0,.8));
 const sun=new THREE.DirectionalLight(0xfff8ee,2.9);sun.position.set(8,18,12);sun.castShadow=true;sun.shadow.mapSize.setScalar(small?1024:2048);sun.shadow.radius=small?3:5;sun.shadow.camera.left=-21;sun.shadow.camera.right=21;sun.shadow.camera.top=21;sun.shadow.camera.bottom=-21;sun.shadow.bias=-.0003;sun.shadow.normalBias=.03;scene.add(sun);scene.add(sun.target);
 const fill=new THREE.DirectionalLight(0xa9cfff,1.2);fill.position.set(-12,8,-8);scene.add(fill);
 // Rim light from behind separates soft white forms from the pale background.
 const rim=new THREE.DirectionalLight(0xdfeeff,1.1);rim.position.set(-4,9,-14);scene.add(rim);
 const mat=(color,metalness=0,roughness=.5)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
 const white=mat('#f9fbff',.12,.27),blue=mat('#3182f6',.35,.25),navy=mat('#172f53',.3,.3),glass=mat('#6e98c0',.6,.17),silver=mat('#b7c5d6',.65,.23),tarmac=mat('#ced8e6',.05,.8),dark=mat('#243b58',.3,.45);
 const groups=[];
 function mesh(parent,geometry,material,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 function box(parent,w,h,d,material,x=0,y=0,z=0,r=.04){return mesh(parent,new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/4,h/4,d/4)),material,x,y,z);}
 function cylinder(parent,r1,r2,h,material,x=0,y=0,z=0){return mesh(parent,new THREE.CylinderGeometry(r1,r2,h,32),material,x,y,z);}
 function sphere(parent,r,material,x=0,y=0,z=0){return mesh(parent,new THREE.SphereGeometry(r,32,20),material,x,y,z);}
 function ground(g,w=23,d=19){box(g,w,.3,d,white,1,-.2,0,.14);}
 function textTexture(lines,{width=1024,height=512,bg='#ffffff',color='#191f28',size=50}={}){const c=document.createElement('canvas');c.width=width;c.height=height;const ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);lines.forEach((line,i)=>{ctx.fillStyle=line.color||color;ctx.font=`${line.weight||600} ${line.size||size}px Pretendard,Arial,sans-serif`;ctx.textAlign=line.align||'left';ctx.fillText(line.text,line.x??50,line.y??(85+i*75));});const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();return texture;}
 function label(g,lines,w,h,x,y,z,options={}){const texture=textTexture(lines,options);return mesh(g,new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}),x,y,z);}
 function group(index){const g=new THREE.Group();g.position.x=0;scene.add(g);groups.push(g);return g;}
 function wing(g,points,depth,material,y=0){const shape=new THREE.Shape();points.forEach(([x,z],i)=>i?shape.lineTo(x,z):shape.moveTo(x,z));shape.closePath();const m=mesh(g,new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:.04,bevelSize:.03,bevelSegments:2,steps:1}),material);m.rotation.x=Math.PI/2;m.position.y=y;return m;}
 function airplane(){const g=new THREE.Group();const body=cylinder(g,.62,.62,7.4,white,0,0,0);body.rotation.x=Math.PI/2;
  const nose=sphere(g,.63,white,0,0,3.7);nose.scale.set(1,1,1.8);const tail=sphere(g,.62,white,0,0,-3.7);tail.scale.set(.95,.95,1.8);
  for(const side of [-1,1]){wing(g,[[side*.25,1.3],[side*5.5,-1.5],[side*5.7,-2],[side*1.1,-1.55],[side*.25,-.65]],.13,white,-.1);wing(g,[[side*.2,-2.9],[side*2.25,-4.15],[side*2.3,-4.55],[side*.3,-4.1]],.1,white,.15);
   const tip=box(g,.12,.62,.65,blue,side*5.55,.18,-1.76,.05);tip.rotation.z=-side*.3;
   const engine=cylinder(g,.4,.46,1.5,white,side*2,-.65,-.2);engine.rotation.x=Math.PI/2;const intake=cylinder(g,.32,.32,.05,dark,side*2,-.65,.57);intake.rotation.x=Math.PI/2;const hub=sphere(g,.13,silver,side*2,-.65,.61);
   for(let j=0;j<13;j++){const p=sphere(g,.062,navy,side*.59,.2,2.5-j*.43);p.scale.set(.24,1,1.35);}
   box(g,.025,.58,.3,silver,side*.62,-.01,2.85,.02);
   for(let j=0;j<2;j++){const wheel=cylinder(g,.17,.17,.14,dark,side*.65,-.88,-1+j*.37);wheel.rotation.z=Math.PI/2;}
  }
  const finShape=new THREE.Shape();finShape.moveTo(0,0);finShape.lineTo(0,1.9);finShape.lineTo(1.7,.1);finShape.closePath();const fin=mesh(g,new THREE.ExtrudeGeometry(finShape,{depth:.13,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2}),blue,-.065,.35,-4.1);fin.rotation.y=Math.PI/2;
  const cockpit=box(g,.83,.23,.5,navy,0,.43,3.45,.1);cockpit.rotation.x=-.25;
  return g;
 }
 function terminal(g){box(g,11,1.6,3.2,glass,1,.75,-6);for(let i=0;i<15;i++)box(g,.08,1.9,3.4,silver,-4.5+i*.78,.85,-6);box(g,11.5,.22,3.6,white,1,1.72,-6);for(const x of [-3,1,5]){box(g,1.15,.8,3.1,silver,x,.7,-3.5);box(g,1.3,.75,.6,glass,x,.6,-2);}
 const tower=cylinder(g,.3,.55,3.8,white,7,1.85,-6);const towerTop=cylinder(g,.9,.65,.85,glass,7,4.05,-6);cylinder(g,1,1,.12,white,7,4.52,-6);}
 const airport=group(0);ground(airport,27,23);box(airport,5,.025,19,tarmac,2,0,2);for(let i=0;i<8;i++)box(airport,.13,.025,.85,white,2,.022,-6+i*2.1);for(const x of [-.25,4.25])box(airport,.055,.03,19,white,x,.03,2);terminal(airport);
 const plane=airplane();plane.position.set(2,1.45,1.1);plane.rotation.y=-.33;airport.add(plane);
 for(let i=0;i<7;i++){box(airport,.12,.1,.12,blue,-.5,.05,-5+i*2.6);box(airport,.12,.1,.12,blue,4.5,.05,-5+i*2.6);}
 // 3D device: rounded body, glass, physical screen, camera and side buttons.
 function roundedShape(w,h,r){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;}
 const loader=new THREE.TextureLoader();function phone(g,asset){const device=new THREE.Group();g.add(device);
 mesh(device,new THREE.ExtrudeGeometry(roundedShape(3.1,6.3,.4),{depth:.22,bevelEnabled:true,bevelThickness:.025,bevelSize:.025,bevelSegments:3,steps:1}),silver,0,0,-.1);
 mesh(device,new THREE.ShapeGeometry(roundedShape(2.99,6.18,.36)),new THREE.MeshBasicMaterial({color:'#172231'}),0,0,.145);
 const texture=loader.load(asset,()=>renderLast());texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();
 const screen=new THREE.ShapeGeometry(roundedShape(2.81,5.98,.29));const pos=screen.attributes.position,uv=screen.attributes.uv;for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)+1.405)/2.81,(pos.getY(i)+2.99)/5.98);
 mesh(device,screen,new THREE.MeshBasicMaterial({map:texture,toneMapped:false}),0,0,.16);box(device,.55,.11,.025,dark,0,2.79,.20,.05);sphere(device,.045,glass,.4,2.79,.20);box(device,.07,.5,.14,silver,-1.58,.8,0);box(device,.07,.7,.14,silver,1.58,.3,0);return device;}
 const flight=group(1);const flightFloor=mesh(flight,new THREE.CircleGeometry(11,96),mat('#ffffff'),1,-.2,0);flightFloor.rotation.x=-Math.PI/2;
 const device=phone(flight,'/assets/sandeul-flight.svg');device.position.set(3,3.3,0);device.rotation.set(-.08,-.3,-.12);
 const ticket=new THREE.Group();flight.add(ticket);box(ticket,4.35,2.45,.1,white,0,0,0,.12);label(ticket,[{text:'산들',x:70,y:75,size:36,color:'#3182f6'},{text:'BOARDING PASS',x:720,y:70,size:19},{text:'PUS',x:70,y:205,size:105},{text:'→',x:450,y:195,size:65,color:'#3182f6'},{text:'CJU',x:690,y:205,size:105},{text:'부산 / 김해',x:75,y:250,size:25,color:'#8b95a1'},{text:'제주',x:700,y:250,size:25,color:'#8b95a1'},{text:'14:20',x:70,y:380,size:48},{text:'GATE 04',x:385,y:380,size:42},{text:'탑승 중',x:740,y:380,size:38,color:'#3182f6'},{text:'대한항공 · KE1533',x:70,y:455,size:23,color:'#8b95a1'}],4.16,2.3,0,0,.065,{height:550});ticket.position.set(3,3.15,1.2);ticket.rotation.set(0,-.2,.04);
 // Airport interior and people flowing through a physical security gate.
 const crowd=group(2);ground(crowd,17,14);box(crowd,14,.25,2.5,white,2,4.3,-3.8);for(const x of [-4,2,8])box(crowd,.22,4.3,.22,silver,x,2.05,-3.8);
 for(let i=0;i<4;i++){box(crowd,2.4,1.25,1.3,white,-3.1+i*3, .6,-2.4,.15);box(crowd,1.9,.15,.9,blue,-3.1+i*3,1.3,-2.4);box(crowd,.6,.5,.08,navy,-3.1+i*3,1.6,-2.45);}
 for(const x of [-1.5,1.5,4.5]){box(crowd,.15,2.6,.8,white,x,1.3,1);box(crowd,.15,2.6,.8,white,x+1.35,1.3,1);box(crowd,1.5,.2,.8,blue,x+.67,2.6,1);}
 label(crowd,[{text:'출국장  ·  DEPARTURES',x:100,y:160,size:63,color:'#fff'},{text:'01             02             03',x:115,y:290,size:50,color:'#8fc1ff'}],7.6,1.1,2,3.75,-2.48,{bg:'#223b5b',height:400});
 const people=[];for(let i=0;i<24;i++){const person=new THREE.Group();const col=[blue,navy,mat('#8ba8cc'),mat('#d4bfaa')][i%4];cylinder(person,.12,.17,.52,col,0,.57,0);sphere(person,.14,mat('#edd8c5'),0,.99,0);for(const x of [-.08,.08])cylinder(person,.045,.05,.4,dark,x,.2,0);box(person,.22,.33,.17,col,.27,.2,.08,.05);person.position.set(-3+(i%6)*1.36,0,3+Math.floor(i/6)*1.35);crowd.add(person);people.push(person);}
 const crowdSign=new THREE.Group();crowd.add(crowdSign);box(crowdSign,4.3,1.6,.15,white,0,0,0,.15);label(crowdSign,[{text:'김해공항 혼잡도',x:55,y:105,size:43,color:'#6b7684'},{text:'여유로워요',x:55,y:245,size:83,color:'#3182f6'}],4.12,1.44,0,0,.085,{height:350});crowdSign.position.set(5,3.1,3);crowdSign.rotation.y=-.2;
 // Parking deck with 3D vehicles and a moving arriving car.
 function car(color=blue){const g=new THREE.Group();box(g,1.13,.42,2.2,color,0,.45,0,.18);box(g,.92,.37,1.1,color,0,.8,-.1,.16);box(g,.82,.25,.03,navy,0,.82,.46,.03);box(g,.82,.24,.03,navy,0,.8,-.66,.03);for(const side of [-1,1]){box(g,.025,.25,.8,navy,side*.465,.82,-.09,.02);for(const z of [-.65,.65]){const w=cylinder(g,.23,.23,.13,dark,side*.56,.28,z);w.rotation.z=Math.PI/2;const rim=cylinder(g,.12,.12,.14,silver,side*.565,.28,z);rim.rotation.z=Math.PI/2;}box(g,.26,.07,.04,white,side*.32,.53,1.105);box(g,.26,.07,.04,mat('#fa7d78'),side*.32,.53,-1.105);}return g;}
 const parking=group(3);ground(parking,19,18);box(parking,16,.035,15,tarmac,2,.015,0);for(const z of [-4.5,4.5]){for(let i=0;i<7;i++){const x=-5+i*2.3;box(parking,.045,.03,3.2,white,x,.05,z);box(parking,2.25,.03,.045,white,x+1.12,.05,z-1.6);} }
 for(let i=0;i<10;i++){if(i===3)continue;const c=car([white,navy,silver,blue][i%4]);c.position.set(-3.8+(i%5)*2.3,0,i<5?-4.5:4.5);c.rotation.y=i<5?0:Math.PI;parking.add(c);}
 const targetSpace=box(parking,2.17,.025,3.15,mat('#c1e0ff'),3.1,.07,-4.5);const arriving=car(blue);parking.add(arriving);
 for(const x of [-2,2,6])box(parking,.18,.03,.7,white,x,.06,0);
 box(parking,.16,4.5,.16,silver,7,2.25,-6);box(parking,2.6,2.7,.25,blue,7,4.4,-6,.18);label(parking,[{text:'P',x:210,y:335,size:340,color:'#fff',align:'center'}],2.35,2.4,7,4.4,-5.85,{bg:'#3182f6',width:420,height:430});
 const parkingSign=new THREE.Group();parking.add(parkingSign);box(parkingSign,4.5,2,.16,white,0,0,0,.15);label(parkingSign,[{text:'P1 국내선 · 주차 가능',x:65,y:95,size:39,color:'#8b95a1'},{text:'248',x:65,y:270,size:155,color:'#3182f6'},{text:'대',x:400,y:270,size:55,color:'#4e5968'},{text:'빈자리부터 예상 요금까지',x:65,y:365,size:32,color:'#8b95a1'}],4.3,1.8,0,0,.09,{height:420});parkingSign.position.set(4,3,3.1);parkingSign.rotation.y=-.25;
 const takeoff=group(4);const departing=airplane();departing.position.set(2,3,0);takeoff.add(departing);for(let i=0;i<6;i++){const cloud=new THREE.Group();for(let j=0;j<4;j++){const s=sphere(cloud,.8+j*.13,white,j*.8,Math.sin(j)*.3,0);s.scale.y=.55;}cloud.position.set(-6+i*3,-1+(i%3),-5+(i%2)*7);takeoff.add(cloud);}
 const runway=box(takeoff,4,.1,32,tarmac,2,-3,0);for(let i=0;i<12;i++)box(takeoff,.12,.02,1,white,2,-2.93,-13+i*2.4);
 const cameraStates=[{pos:[12,9,18],look:[-1,1,0]},{pos:[5,4,15],look:[7,2.8,0]},{pos:[12,12,22],look:[1,3,0]},{pos:[11,13,19],look:[6,1,0]},{pos:[12,8,19],look:[-1,2,0]}];
 let width=0,height=0,lastP=0,lastMobile=false,lastReduce=false;
 const smooth=n=>n*n*(3-2*n);const clamp=n=>Math.max(0,Math.min(1,n));const v=new THREE.Vector3();const targetLook=new THREE.Vector3();
 function update(progress,mobile=false,reduced=false,showcase=false){lastP=progress;lastMobile=mobile;lastReduce=reduced;const idx=Math.min(4,Math.floor(progress)),p=progress-idx;
  // Adjacent scenes share one stage; overlapping scale and depth motion avoids empty camera travel.
  const transition=idx===4?0:smooth(clamp((p-.68)/.32));const next=Math.min(4,idx+1);
  const state=cameraStates[idx],following=cameraStates[next];
  v.fromArray(state.pos).lerp(new THREE.Vector3(...following.pos),transition);
  targetLook.fromArray(state.look).lerp(new THREE.Vector3(...following.look),transition);
  if(mobile){v.set(10,11,24);targetLook.set(2.5,6.3,0);}
  else {v.z-=Math.sin(p*Math.PI)*.9;}
  if(showcase){v.set(15,12,22);targetLook.set(1.5,1,0);if(idx===2){v.set(14,13,23);targetLook.set(1.5,1.5,0);}if(idx===3){v.set(14,17,23);targetLook.set(2,0,0);}if(mobile)v.multiplyScalar(1.12);}
  camera.position.copy(v);camera.lookAt(targetLook);
  sun.position.set(8,18,12);sun.target.position.set(1,0,0);fill.position.x=-12;
  groups.forEach((g,i)=>{
   const weight=i===idx?1-transition:i===next?transition:0;
   g.visible=weight>.001;g.scale.setScalar(Math.max(.001,weight));
   g.position.set((i===idx?-1:1)*(1-weight)*6,-(1-weight)*2, -(1-weight)*5);
  });
  const flightP=clamp(progress-1),crowdP=clamp(progress-2),parkingP=clamp(progress-3),takeoffP=clamp(progress-4);
  plane.position.z=1.1-p*1.5;plane.rotation.y=-.33+p*.14;
  device.rotation.y=-.35+flightP*.7;device.rotation.z=-.12+flightP*.18;device.position.y=3.3+Math.sin(flightP*Math.PI)*.18;
  ticket.position.set(3-flightP*1.3,2.4+flightP*.9,1.2+flightP*1.4);ticket.rotation.y=-.25+flightP*.3;ticket.scale.setScalar(.65+.35*smooth(clamp((flightP-.08)/.5)));
  people.forEach((person,i)=>{const advance=smooth(clamp((crowdP-.13-(i%6)*.045)/.7));person.position.z=3+Math.floor(i/6)*1.35-advance*(5.8+(i%3));person.scale.setScalar(1-.25*advance);});
  crowdSign.position.y=2.5+smooth(clamp(crowdP/.5))*.8;crowdSign.rotation.y=-.35+crowdP*.22;
  const travel=smooth(clamp((parkingP-.08)/.75));if(travel<.55){arriving.position.set(-5+travel/.55*8.1,0,0);arriving.rotation.y=Math.PI/2;}else{const t=(travel-.55)/.45;arriving.position.set(3.1,0,-t*4.5);arriving.rotation.y=THREE.MathUtils.lerp(Math.PI/2,0,smooth(clamp(t*2)));}
  parkingSign.position.y=2.5+smooth(clamp((parkingP-.25)/.5))*.7;targetSpace.material.emissive.set('#3182f6');targetSpace.material.emissiveIntensity=.06+.1*travel;
  departing.position.set(2,2.3+takeoffP*4.2,2-takeoffP*4);departing.rotation.set(-.08-takeoffP*.13,-.38+takeoffP*.3,-.04-takeoffP*.08);departing.scale.setScalar(1+takeoffP*.12);
  renderer.render(scene,camera);
 }
 let flightMode=true,flightProgress=0;
 const skyClouds=new THREE.Group();scene.add(skyClouds);
 for(let i=0;i<7;i++){const cloud=new THREE.Group();for(let j=0;j<4;j++){const puff=sphere(cloud,1+j*.16,white,j*.9,Math.sin(j)*.3,0);puff.scale.y=.5;}cloud.position.set(-16+i*5,5+(i%3)*2,-15+(i%2)*23);skyClouds.add(cloud);}
 skyClouds.visible=false;
 // Preparing at home: a seated traveler checks Sandeul before leaving.
 const home=new THREE.Group();scene.add(home);
 // Plain standard materials: physical sheen cost ~1.7x frame time in software rendering for little visible gain.
 const fabric=color=>new THREE.MeshStandardMaterial({color,roughness:.82});
 const upholstery=fabric('#c4d7ee','#f2f7ff'),cushion=fabric('#dce8f6'),shirt=fabric('#3182f6','#9cc3ff'),trousers=fabric('#2c4a77','#7f9cc8'),skin=mat('#f1d2bd',0,.62),hair=mat('#2b3149',0,.55);
 const oak=mat('#d9bf9b',0,.55),soft=mat('#ffffff',0,.42),sole=mat('#a9bfdb',0,.6);
 const face={skin,hair,eye:mat('#1d2433',0,.25),blush:mat('#f3aaa0',0,.7),mouth:mat('#b9655c',0,.5),white:soft,sole};
 const blob=blobTexture();
 // Continuous studio floor: no raised square base or visible platform edges.
 const homeFloor=mesh(home,new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({color:'#edf5ff',toneMapped:false}),0,-.12,0);homeFloor.rotation.x=-Math.PI/2;homeFloor.castShadow=false;
 const floorShadow=mesh(home,new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.17,color:'#3b5f94'}),0,-.115,0);floorShadow.rotation.x=-Math.PI/2;floorShadow.castShadow=false;
 const homeWall=mesh(home,new THREE.PlaneGeometry(200,100),new THREE.MeshBasicMaterial({color:'#edf5ff',toneMapped:false}),0,45,-4.7);homeWall.castShadow=false;
 const add=(parent,geo,m,x,y,z)=>mesh(parent,geo,m,x,y,z);
 // Window with a soft sky, sill, and gathered curtains on a rod.
 const room=new THREE.Group();home.add(room);
 const frame=new THREE.Shape(roundedShape(3.8,3.7,.22).getPoints(12));frame.holes.push(new THREE.Path(roundedShape(3.3,3.2,.12).getPoints(12).reverse()));
 add(room,new THREE.ExtrudeGeometry(frame,{depth:.1,bevelEnabled:true,bevelThickness:.05,bevelSize:.05,bevelSegments:3,curveSegments:8}),soft,2.8,3.1,-4.62);
 const sky=document.createElement('canvas');sky.width=8;sky.height=128;{const ctx=sky.getContext('2d'),grad=ctx.createLinearGradient(0,0,0,128);grad.addColorStop(0,'#8fc0f2');grad.addColorStop(1,'#e3f1ff');ctx.fillStyle=grad;ctx.fillRect(0,0,8,128);}
 const skyTexture=new THREE.CanvasTexture(sky);skyTexture.colorSpace=THREE.SRGBColorSpace;
 const pane=add(home,new THREE.PlaneGeometry(3.32,3.22),new THREE.MeshBasicMaterial({map:skyTexture,toneMapped:false}),2.8,3.1,-4.6);pane.castShadow=false;
 add(room,softBox(.09,3.25,.1,.5,.2,.5,16),soft,2.8,3.1,-4.52);add(room,softBox(3.35,.09,.1,.2,.5,.5,16),soft,2.8,3.1,-4.52);
 add(room,softBox(4.3,.14,.5,.12,.5,.25),soft,2.8,1.2,-4.35);
 const wave=new THREE.Shape(),wavePts=[];for(let i=0;i<=30;i++){const t=i/30;wavePts.push([t*.78-.39,Math.sin(t*Math.PI*6)*.07]);}
 wavePts.forEach(([x,y],i)=>i?wave.lineTo(x,y):wave.moveTo(x,y));for(let i=30;i>=0;i--)wave.lineTo(wavePts[i][0],wavePts[i][1]-.05);
 const curtainGeo=new THREE.ExtrudeGeometry(wave,{depth:4.65,bevelEnabled:true,bevelThickness:.06,bevelSize:.03,bevelSegments:2,curveSegments:4});curtainGeo.rotateX(-Math.PI/2);
 const curtain=fabric('#ffffff','#dfeaff');for(const x of [.7,4.9])add(room,curtainGeo,curtain,x,.48,-4.15);
 const rod=add(room,new THREE.CylinderGeometry(.035,.035,5.2,12),silver,2.8,5.25,-4.15);rod.rotation.z=Math.PI/2;
 for(const x of [.2,5.4])add(room,new THREE.SphereGeometry(.08,14,10),silver,x,5.25,-4.15);
 bake(room);
 // Rug: thick rounded mat with a woven border ring.
 const rug=new THREE.Group();home.add(rug);rug.position.set(0,-.12,1);rug.scale.z=.73;
 add(rug,lathe([[0,0],[4.45,0],[4.52,.03],[4.46,.06],[0,.065]],96),fabric('#e1ebf8','#ffffff'));
 const ring=add(rug,new THREE.TorusGeometry(3.95,.07,4,96),fabric('#c3d7f0'),0,.06,0);ring.rotation.x=Math.PI/2;ring.scale.z=.25;
 bake(rug);
 // Deep upholstered sofa: pillowy seat and back cushions, rolled arms, oak feet.
 const sofa=new THREE.Group();home.add(sofa);
 add(sofa,softBox(6.1,.6,2.6,.18,.35,.2),upholstery,-1,.52,-.62);
 add(sofa,softBox(6.1,1.75,.6,.18,.25,.4),upholstery,-1,1.5,-1.72);
 for(const x of [-2.45,.45]){add(sofa,softBox(2.78,.44,2.2,.16,.55,.16),cushion,x,1.0,-.38);add(sofa,softBox(2.72,1.18,.58,.2,.32,.6),cushion,x,1.78,-1.28).rotation.x=-.12;}
 for(const x of [-3.86,1.86])add(sofa,softBox(.66,1.22,2.68,.55,.3,.22),upholstery,x,1.08,-.6);
 for(const x of [-3.65,1.65])for(const z of [-1.75,.48])add(sofa,new THREE.CylinderGeometry(.075,.05,.36,14),oak,x,.06,z);
 const pillow=add(sofa,softBox(1.0,.95,.34,.35,.35,.7),fabric('#9dc4fa','#e1eeff'),-3.15,1.68,-.95);pillow.rotation.set(-.15,.25,.22);
 bake(sofa);
 contactShadow(home,blob,8.4,4.4,{x:-1,y:-.1,z:-.55,opacity:.3});
 // Clay travelers: one holds the phone, the companion leans in to look.
 const traveler=new THREE.Group();home.add(traveler);traveler.position.set(-1.8,0,0);
 const head=buildTraveler(traveler,{mesh},{...face,shirt,trousers},{pose:'phone',hairStyle:0});
 const homePhone=phone(home,'/assets/sandeul-home-screen.svg');homePhone.scale.setScalar(.17);homePhone.position.set(-1.73,2.13,1.46);homePhone.rotation.set(.45,Math.PI+.08,0);
 const phoneBack=mesh(homePhone,new THREE.ShapeGeometry(roundedShape(3.03,6.22,.38)),mat('#b9d4f5',.35,.4),0,0,-.14);phoneBack.rotation.y=Math.PI;
 for(const y of [2.3,1.85]){const lens=cylinder(homePhone,.16,.16,.06,navy,.95,y,-.19);lens.rotation.x=Math.PI/2;}
 const companion=new THREE.Group();home.add(companion);companion.position.set(-.15,0,.12);companion.rotation.y=-.28;
 const companionHead=buildTraveler(companion,{mesh},{...face,shirt:fabric('#a7c9f5','#eef5ff'),trousers:fabric('#f4f1ea'),hair:mat('#5b3f33',0,.55)},{pose:'lap',hairStyle:2,shoe:{upper:mat('#2c4a77',0,.6),sole:soft}});
 companionHead.position.x=-.2;companionHead.rotation.set(.32,-.4,.2);
 contactShadow(home,blob,1.3,1.1,{x:-2.15,y:-.1,z:1.85,opacity:.25});contactShadow(home,blob,1.3,1.1,{x:-.4,y:-.1,z:1.95,opacity:.25});
 // Packed suitcase: glossy shell, zip seam, ribs, spinner wheels, telescopic handle.
 const suitcase=new THREE.Group();home.add(suitcase);suitcase.position.set(3.1,0,.25);suitcase.rotation.y=-.2;
 const shell=new THREE.MeshPhysicalMaterial({color:'#3182f6',roughness:.32,metalness:.05,clearcoat:1,clearcoatRoughness:.18});
 add(suitcase,softBox(1.45,2.05,.8,.2,.2,.42,20),shell,0,1.2,0);
 add(suitcase,softBox(1.49,2.09,.05,.2,.2,.5,16),mat('#1f4f9e',0,.5),0,1.2,-.06);
 const rib=new THREE.MeshPhysicalMaterial({color:'#5d9bf8',roughness:.3,clearcoat:1,clearcoatRoughness:.2});
 for(let i=0;i<4;i++)add(suitcase,softBox(.1,1.62,.08,.5,.12,.5,10),rib,-.39+i*.26,1.2,.37);
 for(const x of [-.52,.52])for(const z of [-.24,.24]){add(suitcase,softBox(.16,.14,.16,.4,.4,.4,10),navy,x,.15,z);const w=add(suitcase,new THREE.CylinderGeometry(.075,.075,.07,16),dark,x,.02,z);w.rotation.z=Math.PI/2;}
 for(const x of [-.38,.38]){add(suitcase,new THREE.CylinderGeometry(.045,.045,.4,12),silver,x,2.38,-.24);add(suitcase,new THREE.CylinderGeometry(.032,.032,.5,12),silver,x,2.78,-.24);}
 add(suitcase,softBox(.92,.13,.17,.3,.5,.5,14),navy,0,3.04,-.24);
 add(suitcase,new THREE.TorusGeometry(.2,.045,10,20,Math.PI),navy,0,2.2,.06);
 bake(suitcase);
 contactShadow(home,blob,2.1,1.6,{x:3.1,y:-.1,z:.25,opacity:.32,rot:-.2});
 // Side table with a mug of coffee and a travel guide.
 const table=new THREE.Group();home.add(table);table.position.set(1.35,0,3.4);
 add(table,lathe([[0,0],[1.16,0],[1.22,.04],[1.23,.1],[1.18,.15],[0,.16]],64),soft,0,.92,0);
 for(let i=0;i<3;i++){const a=i/3*Math.PI*2+.4,c=Math.cos(a),s=Math.sin(a);add(table,tube([[c*.55,.94,s*.55],[c*.8,-.12,s*.8]],.06,{r2:.04,seg:4,radial:10}),oak);}
 add(table,lathe([[0,0],[.15,0],[.19,.03],[.2,.33],[.17,.33],[.16,.06],[0,.06]],32),soft,-.05,1.08,-.05);
 add(table,new THREE.CircleGeometry(.165,24),mat('#7a5640',0,.3),-.05,1.36,-.05).rotation.x=-Math.PI/2;
 add(table,new THREE.TorusGeometry(.09,.026,8,16,Math.PI*1.2),soft,.16,1.24,-.05).rotation.z=-Math.PI*.6;
 add(table,softBox(.66,.05,.86,.2,.5,.2,16),soft,-.62,1.1,.42).rotation.y=.3;
 add(table,softBox(.72,.035,.92,.2,.5,.2,16),blue,-.62,1.14,.42).rotation.y=.3;
 bake(table);
 contactShadow(home,blob,2.9,2.9,{x:1.35,y:-.1,z:3.4,opacity:.18});
 // Floor lamp with a glowing shade.
 const lamp=new THREE.Group();home.add(lamp);lamp.position.set(-4.6,0,-2.5);
 add(lamp,lathe([[0,0],[.42,0],[.46,.03],[.42,.08],[.12,.12],[0,.13]],40),soft,0,-.12,0);
 add(lamp,new THREE.CylinderGeometry(.035,.035,3.6,12),silver,0,1.75,0);
 add(lamp,new THREE.CylinderGeometry(.48,.82,.8,48,1,true),new THREE.MeshStandardMaterial({color:'#ffffff',roughness:.7,emissive:'#fff0d6',emissiveIntensity:.35,side:THREE.DoubleSide}),0,3.9,0);
 add(lamp,new THREE.SphereGeometry(.16,16,12),new THREE.MeshBasicMaterial({color:'#fff6e6',toneMapped:false}),0,3.7,0);
 bake(lamp);
 contactShadow(home,blob,1.3,1.3,{x:-4.6,y:-.1,z:-2.5,opacity:.22});
 function updateFlight(progress,mobile=false){
  flightMode=true;flightProgress=progress;lastMobile=mobile;
  const p=smooth(clamp(progress));groups.forEach(g=>g.visible=false);skyClouds.visible=false;home.visible=true;
  // Slowly move closer to the phone while keeping the person and luggage in view.
  const focus=new THREE.Vector3(-.2-p*.4,1.6+p*.35,.35+p*.5);
  const offset=new THREE.Vector3(7.65-p*3.65,5.95-p*1.65,11.05-p*2.85);
  if(mobile)offset.multiplyScalar(1.4);
  camera.position.copy(focus).add(offset);camera.lookAt(focus);
  head.rotation.x=.23+p*.06;
  scene.background.set('#edf5ff');sun.position.set(8,15,12);sun.target.position.set(-1,1,0);
  renderer.render(scene,camera);
 }
 function renderLast(){if(disposed)return;if(flightMode)updateFlight(flightProgress,lastMobile);else update(lastP,lastMobile,lastReduce);}
 function resize(){width=container.clientWidth;height=container.clientHeight;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();renderLast();}
 const observer=new ResizeObserver(resize);observer.observe(container);resize();document.fonts.ready.then(renderLast);
 const onContextLost=event=>{event.preventDefault();document.body.classList.add('no-webgl');};
 renderer.domElement.addEventListener('webglcontextlost',onContextLost);
 function dispose(){disposed=true;observer.disconnect();renderer.domElement.removeEventListener('webglcontextlost',onContextLost);disposeScene(scene,renderer,environmentTarget);}
 return {update,updateFlight,dispose};
}
