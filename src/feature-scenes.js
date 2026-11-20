import {disposeScene} from './dispose-scene.js';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { softBox, lathe, tube, bake, blobTexture, contactShadow, cuteHead, sneaker, mitten, toyCar } from './toy-kit.js';

export function mountFeatureScenes(container = document){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const cleanups=[];
 container.querySelectorAll('[data-feature-scene]').forEach(host=>{
  let engine,visible=false,raf=0,last=0,elapsed=0;
  const card=host.closest('[data-story-card]');
  const isActive=()=>visible&&!document.hidden&&(!card||card.getAttribute('aria-hidden')==='false');
  function sync(){
   const active=isActive();
   host.classList.toggle('scene-active',active);
   if(!active){cancelAnimationFrame(raf);raf=0;last=0;return;}
   if(!engine){try{engine=build(host);}catch(error){host.classList.add('scene-unavailable');console.error(error);return;}}
   if(!raf)raf=requestAnimationFrame(tick);
  }
  function tick(now){raf=0;if(!isActive()){sync();return;}elapsed+=last?Math.min((now-last)/1000,.05):0;last=now;engine.render(reduced.matches && host.dataset.featureScene !== "crowd" ? 8 : reduced.matches ? 0 : elapsed);if(!reduced.matches)raf=requestAnimationFrame(tick);}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'0px'});observer.observe(host);
  function replay(){
   elapsed=0;last=0;sync();
  }
  host.addEventListener('replay-scene',replay);
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('feature-activate',sync);
  reduced.addEventListener('change',sync);
  cleanups.push(()=>{
   visible=false;observer.disconnect();cancelAnimationFrame(raf);
   host.removeEventListener('replay-scene',replay);
   document.removeEventListener('visibilitychange',sync);
   document.removeEventListener('feature-activate',sync);
   reduced.removeEventListener('change',sync);
   engine?.dispose();host.classList.remove('scene-active');
  });
 });
 return ()=>cleanups.forEach(dispose=>dispose());
}
function build(host){
 const kind=host.dataset.featureScene,scene=new THREE.Scene();
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio, 1.5), 2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.toneMapping=THREE.NeutralToneMapping;renderer.toneMappingExposure=1;host.appendChild(renderer.domElement);
 const camera=new THREE.PerspectiveCamera(35,1,.1,100);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
 const environmentTarget=pmrem.fromScene(room,.04);scene.environment=environmentTarget.texture;scene.environmentIntensity=.55;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xffffff,0xb5cbe7,2));const sun=new THREE.DirectionalLight(0xffffff,3);sun.position.set(6,12,9);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-14,right:14,top:14,bottom:-14});sun.shadow.normalBias=.03;sun.shadow.radius=4;scene.add(sun);
 const mat=c=>new THREE.MeshStandardMaterial({color:c,roughness:.4,metalness:.06});const physical=c=>new THREE.MeshPhysicalMaterial({color:c,roughness:.35,metalness:.05,clearcoat:1,clearcoatRoughness:.2});const white=mat('#ffffff'),blue=mat('#3182f6'),navy=mat('#233e62'),silver=mat('#afc3de'),glass=mat('#83b4e7');
 const root=new THREE.Group();scene.add(root);
 function mesh(g,geo,m,x=0,y=0,z=0){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
 function box(g,w,h,d,m,x=0,y=0,z=0,r=.06){return mesh(g,new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/4,h/4,d/4)),m,x,y,z);}
 function ball(g,r,m,x,y,z){return mesh(g,new THREE.SphereGeometry(r,24,16),m,x,y,z);}
 function cyl(g,r,h,m,x,y,z){return mesh(g,new THREE.CylinderGeometry(r,r,h,24),m,x,y,z);}
 const shadow=mesh(scene,new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:kind === "flight" ? .018 : .1}),0,-.25,0);shadow.rotation.x=-Math.PI/2;shadow.castShadow=false;shadow.visible=kind!=="flight";
 // The floor extends beyond the frame so the two locations have no display base.
 if(kind !== 'flight'){
  const ground = mesh(scene,new THREE.PlaneGeometry(150,150),mat(kind === 'crowd' ? '#dedfdc' : '#9ba3ae'));
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
 let animate=()=>{};
 if(kind==='flight'){
  const canvas=document.createElement('canvas');
  canvas.width=960; canvas.height=760;
  const ctx=canvas.getContext('2d');
  const screen=new THREE.CanvasTexture(canvas);
  screen.colorSpace=THREE.SRGBColorSpace;
  screen.anisotropy=renderer.capabilities.getMaxAnisotropy();
  mesh(root,new THREE.PlaneGeometry(6.05,6.05*760/960),
   new THREE.MeshBasicMaterial({map:screen,transparent:true,toneMapped:false}),0,0,.161);
  function rect(x,y,w,h,r,color){
   ctx.fillStyle=color;
   ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();
  }
  function text(value,x,y,size,weight=500,color='#233749'){
   ctx.fillStyle=color;ctx.font=weight+' '+size+'px system-ui,sans-serif';ctx.fillText(value,x,y);
  }
  // Paint the result once. Fade it in at its final position.
  text('대한항공 · KE1533',40,367,41,500,'#445f74');
  text('제주',36,480,98,650);text('CJU',262,475,51,500,'#526e82');
  rect(40,530,878,3,1,'#9dbdcf');
  text('출발 시각',40,610,38,500,'#445f74');text('탑승구',566,610,38,500,'#445f74');
  text('14:20',36,712,82,650);text('5',562,712,82,650);
  const resultCanvas=canvas.cloneNode();
  resultCanvas.getContext('2d').drawImage(canvas,0,0);
  const resultTexture=new THREE.CanvasTexture(resultCanvas);
  resultTexture.colorSpace=screen.colorSpace;
  resultTexture.anisotropy=screen.anisotropy;
  const resultMaterial=new THREE.MeshBasicMaterial({
   map:resultTexture, transparent:true, depthWrite:false, toneMapped:false
  });
  const result=mesh(root,new THREE.PlaneGeometry(6.05,6.05*760/960),resultMaterial,0,0,.161);
  result.renderOrder=1;
  result.castShadow=false;
  const query='KE1533';
  const typingStart=.35, letterInterval=.20;
  const revealStart=typingStart+query.length*letterInterval+.18;
  let lastCount=-1;
  animate=time=>{
   const reveal=THREE.MathUtils.smootherstep(time,revealStart,revealStart+.35);
   result.visible=reveal>0;
   resultMaterial.opacity=reveal;
   const count=Math.min(query.length,Math.floor(Math.max(0,time-typingStart)/letterInterval));
   if(lastCount===count)return;
   lastCount=count;
   ctx.clearRect(0,0,960,760);
   text('김해공항 출발',40,100,67,650);
   rect(38,148,884,104,30,'#f7fcff');
   ctx.strokeStyle='#60788b';ctx.lineWidth=5;ctx.beginPath();
   ctx.arc(98,198,15,0,Math.PI*2);ctx.moveTo(109,209);ctx.lineTo(122,222);ctx.stroke();
   text(count?query.slice(0,count):'편명 검색',146,216,47);
   screen.needsUpdate=true;
  };
 }else if(kind==='crowd'){
  const queues = [1, 6, 3];
  const cloth = c => new THREE.MeshPhysicalMaterial({color:c,roughness:.8,sheen:.6,sheenColor:new THREE.Color('#ffffff'),sheenRoughness:.6});
  const shirts = ['#6487a0','#e1b39b','#bfc9b4','#9facc3'].map(cloth);
  const pants = ['#2c4a77','#55607a','#3d5f8c','#e9e4da'].map(cloth);
  const hairs = ['#2b3149','#5b3f33','#1f2430','#8a5a3c'].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.55}));
  const skins = ['#f1d2bd','#e8c1a4','#d9a988','#f4dccb'].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.6}));
  const faceParts = {eye:mat('#1d2433'),blush:mat('#f3aaa0'),mouth:mat('#b9655c')};
  const soleMat = mat('#f4f6fa');
  const blob = blobTexture();
  // Daylight through a curtain wall behind the security checkpoint.
  for(let panel=-3; panel<=3; panel++){
   box(root,2.45,3.6,.08,glass,panel*2.5,1.8,-3.7);
   box(root,.05,3.6,.1,silver,panel*2.5-1.24,1.8,-3.65);
  }
  box(root,17.5,.055,.1,white,0,1.55,-3.62);
  const belt = mat('#566b7a');
  const posts = new THREE.Group(); root.add(posts);
  for(const x of [-3,-1,1,3]){
   for(const z of [-1.1,1.2,3.5]){
    mesh(posts,lathe([[0,0],[.13,0],[.14,.02],[.1,.05],[.04,.07],[0,.07]],20),silver,x,0,z);
    mesh(posts,new THREE.CylinderGeometry(.032,.032,.66,12),silver,x,.39,z);
    mesh(posts,new THREE.SphereGeometry(.05,12,8),silver,x,.73,z).scale.y=.7;
    if(z<3) mesh(posts,softBox(.03,.08,2.3,.5,.5,.2,12),belt,x,.66,z+1.15);
   }
  }
  bake(posts);
  const luggageColors = [physical('#78add6'), physical('#d0a381'), physical('#6f9298')];
  // Rolling carry-on behind the traveler, pulled by the right hand.
  function addSuitcase(person, x, z, shell) {
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
  function addBackpack(person,x,z,shell) {
   mesh(person,softBox(.3,.36,.18,.35,.3,.5,14),shell,x,.6,z+.17);
   mesh(person,softBox(.22,.14,.08,.35,.4,.5,10),shell,x,.51,z+.27);
   mesh(person,new THREE.TorusGeometry(.03,.012,6,12,Math.PI),navy,x,.79,z+.17).rotation.y=Math.PI/2;
   for (const dx of [-.11,.11]) mesh(person,tube([[x+dx,.76,z+.1],[x+dx,.82,z],[x+dx,.74,z-.12],[x+dx,.55,z-.1]],.022,{seg:10,radial:6}),navy);
  }
  function shoe(person, x, upper){
   const g = new THREE.Group(); person.add(g); g.position.set(x,0,-.035);
   sneaker((geo,m,a=0,b=0,c=0)=>mesh(g,geo,m,a,b,c),.12,upper,soleMat,0,0,0,.5);
   g.rotation.y = Math.PI; bake(g); return g;
  }
  const travelers = [];
  const lights = [];
  const gates = new THREE.Group(); root.add(gates);
  queues.forEach((count, lane) => {
   const x = (lane - 1) * 2;
   for(const side of [-.65,.65]) mesh(gates,softBox(.18,1.74,.48,.4,.12,.4,16),white,x+side,.87,-1.9);
   mesh(gates,softBox(1.5,.24,.5,.15,.4,.4,16),white,x,1.72,-1.9);
   for(const side of [-.57,.57]) mesh(gates,softBox(.03,1.5,.36,.5,.1,.4,12),silver,x+side,.85,-1.9);
   const lamp = mat(['#73c59c','#ef9670','#e8c56f'][lane]);
   lights.push(lamp);
   const signal = mesh(root,softBox(.26,.07,.03,.4,.5,.5,16),lamp,x,1.7,-1.64);
   signal.castShadow = false;
   for (let row = 0; row < count; row++) {
    const person = new THREE.Group();
    root.add(person);
    person.position.x = x;
    const z = 0, i = lane * 2 + row;
    const shirt = shirts[(row+lane)%shirts.length], skin = skins[i%skins.length], hair = hairs[(i+1)%hairs.length], trousers = pants[(row+2*lane)%pants.length];
    const shoes = [-.085,.085].map(dx => shoe(person, dx, i%2 ? navy : white));
    travelers.push({person,row,lane,shoes});
    // Body built facing +z, then turned to face the gate (-z).
    const fig = new THREE.Group(); fig.rotation.y = Math.PI;
    const f = (geo,m,a=0,b=0,c=0) => mesh(fig,geo,m,a,b,c);
    for (const dx of [-.085,.085]) f(tube([[dx,.44,0],[dx,.25,0],[dx,.1,.005]],.068,{r2:.058,seg:6,radial:10}),trousers);
    const torso = f(lathe([[0,0],[.17,0],[.2,.05],[.21,.2],[.2,.34],[.15,.43],[.07,.47],[0,.47]],16),shirt,0,.38,0);
    torso.scale.z = .78;
    for (const s of [-1,1]) {
     const pulling = s < 0 && (lane + row) % 3 !== 1;
     const hand = pulling ? [-.34,.76,-.09] : [s*.25,.46,.05];
     const elbow = pulling ? [-.31,.66,-.03] : [s*.25,.58,.02];
     f(tube([[s*.19,.78,0],elbow,hand],.055,{r2:.048,seg:8,radial:8}),shirt);
     mitten(f,.045,skin,hand[0],hand[1]-.03,hand[2],s,.5);
    }
    const head = new THREE.Group(); head.position.set(0,1.06,0); fig.add(head);
    cuteHead((geo,m,a=0,b=0,c=0)=>mesh(head,geo,m,a,b,c),.2,{skin,hair,...faceParts},i%4,.55);
    bake(head);
    person.add(fig);
    contactShadow(person,blob,.75,.75,{y:.004,opacity:.22});
    const shell = luggageColors[(lane + row) % luggageColors.length];
    if ((lane + row) % 3 === 1) addBackpack(person,0,z,shell);
    else addSuitcase(person,0,z,shell);
    bake(fig); bake(person);
   }
  });
  bake(gates);
  animate = time => {
   const selected = Number(host.dataset.zone ?? 1);
   lights.forEach((lamp,lane) => {
    lamp.emissive.copy(lamp.color);
    lamp.emissiveIntensity = lane === selected ? .85 : .08;
   });
   for(const {person,row,lane,shoes} of travelers){
    const cycle = (time + (lane === selected ? 0 : 3) + (6-row)*.32) % 9;
    const stride = THREE.MathUtils.smoothstep(cycle, 1, 3.4);
    const settle = THREE.MathUtils.smoothstep(cycle, 5, 8.6);
    const shift = stride - settle;
    person.position.z = -.85 + row * .85 - .44 * shift;
    const step = Math.sin(stride * Math.PI * 4) - Math.sin(settle * Math.PI * 4);
    shoes[0].position.z = -.035 + .085 * step;
    shoes[1].position.z = -.035 - .085 * step;
    person.position.y = .024 * Math.abs(step);
    person.rotation.y = .12 * Math.sin(cycle / 9 * Math.PI * 2);
   }
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
  function car(m){const g=toyCar(m,carGlass,tyre,rim,headlight,taillight,.82);contactShadow(g,carBlob,1.5,2.4,{y:.006,opacity:.3});root.add(g);return g;}
  const occupied = new Set([0, 1, 3, 4, 6, 8, 11]);

  for(let slot=0; slot<12; slot++){
   const x=-5+(slot%6)*2, z=slot<6?-2.7:2.7;
   if(occupied.has(slot)) car(paints[slot%3]).position.set(x,0,z);

  }
  const arriving = car(arrivingPaint);
  const path = new THREE.CurvePath();
  path.add(new THREE.LineCurve3(new THREE.Vector3(10,0,0), new THREE.Vector3(2.5,0,0)));
  path.add(new THREE.CubicBezierCurve3(
   new THREE.Vector3(2.5,0,0), new THREE.Vector3(1.5,0,0),
   new THREE.Vector3(1,0,.9), new THREE.Vector3(1,0,1.5)
  ));
  path.add(new THREE.LineCurve3(new THREE.Vector3(1,0,1.5), new THREE.Vector3(1,0,2.7)));

  animate = time => {
   const cycle = time % 18;
   const progress = THREE.MathUtils.smoothstep(cycle,0,5.5)
    - THREE.MathUtils.smoothstep(cycle,11,17.5);
   const direction = path.getTangentAt(progress);
   arriving.position.copy(path.getPointAt(progress));
   arriving.rotation.y = Math.atan2(direction.x,direction.z);
   host.classList.toggle('parked', progress === 1);
  };
 }
 const framing = {
  flight: { position: [0, 0, 10.8], target: [0, 0, 0] },
  crowd: { position: [5.1, 4.8, 8.8], target: [0, .85, .65] },
  parking: { position: [8, 11, 13], target: [0, 0, 0] },
 }[kind];
 const target = new THREE.Vector3(...framing.target);
 const offset = new THREE.Vector3(...framing.position).sub(target);
 let lastFrame = 0;
 function render(time) {
  lastFrame = time;
  camera.aspect = host.clientWidth / host.clientHeight;
  camera.updateProjectionMatrix();
  camera.position.copy(offset).multiplyScalar(1 / Math.min(camera.aspect, 1)).add(target);
  camera.lookAt(target);
  animate(time);
  renderer.render(scene,camera);
 }
 const observer=new ResizeObserver(()=>{renderer.setSize(host.clientWidth,host.clientHeight,false);render(lastFrame);});observer.observe(host);
 renderer.setSize(host.clientWidth,host.clientHeight,false);render(0);return {render,dispose(){observer.disconnect();disposeScene(scene,renderer,environmentTarget);}};
}
