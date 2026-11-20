import {disposeScene} from './dispose-scene.js';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function mountFeatureScenes(container = document, onUnavailable = () => {}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const cleanups=[];
 container.querySelectorAll('[data-feature-scene]').forEach(host=>{
  let engine,visible=false,raf=0,last=0,elapsed=0;
  let unavailable = false, manualReplay = false;
  function fail() {
   if (unavailable) return;
   unavailable = true;
   cancelAnimationFrame(raf);
   host.removeAttribute('data-ready');
   onUnavailable(host.dataset.featureScene);
  }
  host.addEventListener('webglcontextlost', fail, true);
  const card=host.closest('[data-story-card]');
  const isActive=()=>visible&&!document.hidden&&(!card||card.getAttribute('aria-hidden')==='false');
  function sync(){
   if (unavailable) return;
   const active=isActive();
   host.classList.toggle('scene-active',active);
   if(!active){cancelAnimationFrame(raf);raf=0;last=0;return;}
   if(!engine){try{engine=build(host);}catch(error){fail();console.error(error);return;}}
   if(!raf)raf=requestAnimationFrame(tick);
  }
  function tick(now) {
   raf = 0;
   if (unavailable || !isActive()) return;
   if (last) elapsed += (now - last) / 1000;
   last = now;
   if (elapsed >= 6) manualReplay = false;
   const moving = !reduced.matches || container.dataset?.allowMotion === 'true' || manualReplay;
   const still = host.dataset.featureScene === 'crowd' ? 0 : 5;
   engine.render(moving ? elapsed : still);
   if (moving) raf = requestAnimationFrame(tick);
  }
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'0px'});observer.observe(host);
  function replay(){
   manualReplay=true;elapsed=0;last=0;sync();
  }
  function changeMotion() {
   manualReplay=false;elapsed=0;last=0;sync();
  }
  container.addEventListener('feature-motion-change',changeMotion);
  host.addEventListener('replay-scene',replay);
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('feature-activate',sync);
  reduced.addEventListener('change',sync);
  cleanups.push(()=>{
   host.removeEventListener('webglcontextlost', fail, true);
   host.removeAttribute('data-ready');
   visible=false;observer.disconnect();cancelAnimationFrame(raf);
   container.removeEventListener('feature-motion-change',changeMotion);
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
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio, 1.75), 2.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;host.appendChild(renderer.domElement);
 const camera=new THREE.PerspectiveCamera(35,1,.1,100);
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
 const environmentTarget=pmrem.fromScene(room,.04);scene.environment=environmentTarget.texture;scene.environmentIntensity=.55;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xffffff,0xb5cbe7,2));const sun=new THREE.DirectionalLight(0xffffff,3);sun.position.set(6,12,9);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-14,right:14,top:14,bottom:-14});sun.shadow.normalBias=.03;scene.add(sun);
 const mat=c=>new THREE.MeshStandardMaterial({color:c,roughness:.4,metalness:.06});const white=mat('#ffffff'),blue=mat('#3182f6'),navy=mat('#233e62'),silver=mat('#afc3de'),glass=mat('#83b4e7');
 const root=new THREE.Group();scene.add(root);
 function mesh(g,geo,m,x=0,y=0,z=0){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
 function box(g,w,h,d,m,x=0,y=0,z=0,r=.06){return mesh(g,new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/4,h/4,d/4)),m,x,y,z);}
 function ball(g,r,m,x,y,z){return mesh(g,new THREE.SphereGeometry(r,24,16),m,x,y,z);}
 function cyl(g,r,h,m,x,y,z){return mesh(g,new THREE.CylinderGeometry(r,r,h,24),m,x,y,z);}
 const shadow=mesh(scene,new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:kind === "flight" ? .018 : .1}),0,-.25,0);shadow.rotation.x=-Math.PI/2;shadow.castShadow=false;shadow.visible=kind!=="flight";
 // The floor extends beyond the frame so the two locations have no display base.
 if(kind !== 'flight'){
  const ground = mesh(scene,new THREE.PlaneGeometry(150,150),mat(kind === 'crowd' ? '#dedfdc' : '#aaa699'));
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
   time %= 6;
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
  const shirts = ['#6487a0','#e1b39b','#bfc9b4','#9facc3'].map(mat);
  // Daylight through a curtain wall behind the security checkpoint.
  for(let panel=-3; panel<=3; panel++){
   box(root,2.45,3.6,.08,glass,panel*2.5,1.8,-3.7);
   box(root,.05,3.6,.1,silver,panel*2.5-1.24,1.8,-3.65);
  }
  box(root,17.5,.055,.1,white,0,1.55,-3.62);
  const belt = mat('#566b7a');
  for(const x of [-3,-1,1,3]){
   for(const z of [-1.1,1.2,3.5]){
    cyl(root,.12,.06,silver,x,.03,z);
    cyl(root,.035,.7,silver,x,.38,z);
    if(z<3) box(root,.035,.09,2.3,belt,x,.66,z+1.15);
   }
  }
  const skin = mat("#edcdb6");
  const luggageColors = [mat('#78add6'), mat('#d0a381'), mat('#6f9298')];
  function addSuitcase(person, x, z, shell) {
   const bag = new THREE.Group();
   bag.position.set(x + .35, .11, z + .19);
   bag.rotation.x = -.16;
   person.add(bag);
   box(bag,.31,.42,.22,shell,0,.25,0,.06);
   for (const dx of [-.10,.10]) {
    ball(bag,.043,navy,dx,.035,.07);
    cyl(bag,.013,.21,silver,dx,.54,0);
   }
   box(bag,.23,.045,.045,navy,0,.65,0);
   const arm = box(person,.105,.27,.105,blue,x+.19,.63,z+.055);
   arm.rotation.z = .55;
   ball(person,.056,skin,x+.255,.73,z+.085);
  }
  function addBackpack(person,x,z,shell) {
   box(person,.29,.35,.19,shell,x,.58,z+.175,.07);
   box(person,.22,.13,.08,shell,x,.51,z+.275,.03);
   for (const dx of [-.12,.12]) {
    box(person,.043,.29,.10,navy,x+dx,.66,z+.08,.02);
   }
  }
  const travelers = [];
  const lights = [];
  queues.forEach((count, lane) => {
   const x = (lane - 1) * 2;
   for(const side of [-.65,.65]) box(root,.14,1.7,.45,silver,x+side,.85,-1.9);
   box(root,1.44,.18,.45,silver,x,1.69,-1.9);
   const lamp = mat(['#73c59c','#ef9670','#e8c56f'][lane]);
   lights.push(lamp);
   box(root,.23,.065,.025,lamp,x,1.68,-1.66);
   for (let row = 0; row < count; row++) {
    const person = new THREE.Group();
    root.add(person);

    person.position.x = x;
    const z = 0;
    const shoes = [-.09,.09].map(dx => box(person,.14,.085,.21,navy,dx,.045,z-.035));
    travelers.push({person,row,lane,shoes});
    for (const dx of [-.09, .09]) cyl(person,.063,.30,navy,dx,.23,z);
    mesh(person,new THREE.CapsuleGeometry(.18,.24,6,16),shirts[(row+lane)%shirts.length],0,.55,z);
    ball(person,.17,skin,0,.96,z);
    mesh(person,new THREE.SphereGeometry(.177,24,16,0,Math.PI*2,0,1.38),navy,0,.99,z);
    const shell = luggageColors[(lane + row) % luggageColors.length];
    if ((lane + row) % 3 === 1) addBackpack(person,0,z,shell);
    else addSuitcase(person,0,z,shell);

   }
  });
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
   box(root,.85,.12,.26,white,x+.32,3.5,-4.35);
  }
  function car(m){const g=new THREE.Group();box(g,.95,.36,1.8,m,0,.4,0,.14);box(g,.8,.3,.9,m,0,.7,-.1,.13);box(g,.7,.22,.035,navy,0,.72,.37);box(g,.7,.22,.035,navy,0,.72,-.56);for(const x of [-.47,.47])for(const z of [-.5,.5]){const wheel=cyl(g,.18,.12,navy,x,.21,z);wheel.rotation.z=Math.PI/2;}root.add(g);return g;}
  const occupied = new Set([0, 1, 3, 4, 6, 8, 11]);

  for(let slot=0; slot<12; slot++){
   const x=-5+(slot%6)*2, z=slot<6?-2.7:2.7;
   if(occupied.has(slot)) car(slot%3?white:navy).position.set(x,0,z);

  }
  const arriving = car(blue);
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
  if (!renderer.getContext().isContextLost()) host.setAttribute('data-ready','');
 }
 const observer=new ResizeObserver(()=>{renderer.setSize(host.clientWidth,host.clientHeight,false);render(lastFrame);});observer.observe(host);
 renderer.setSize(host.clientWidth,host.clientHeight,false);render(0);return {render,dispose(){observer.disconnect();disposeScene(scene,renderer,environmentTarget);}};
}
