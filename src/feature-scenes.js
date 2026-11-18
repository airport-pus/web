import {disposeScene} from './dispose-scene.js';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

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
  function tick(now){raf=0;if(!isActive()){sync();return;}elapsed+=last?Math.min((now-last)/1000,.05):0;last=now;engine.render(reduced.matches && host.dataset.featureScene === "parking" ? 8 : reduced.matches ? 0 : elapsed);if(!reduced.matches)raf=requestAnimationFrame(tick);}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'0px'});observer.observe(host);
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('feature-activate',sync);
  reduced.addEventListener('change',sync);
  cleanups.push(()=>{
   visible=false;observer.disconnect();cancelAnimationFrame(raf);
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
 const shadow=mesh(scene,new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:kind === "flight" ? .018 : .1}),0,-.25,0);shadow.rotation.x=-Math.PI/2;shadow.castShadow=false;
 let animate=()=>{};
 if(kind==='flight'){
  const search = new THREE.Group();
  root.add(search);
  search.position.y = 1.92;
  search.rotation.set(-.08, -.12, -.035);

  // Independent enamel-like layers give the search field and results real depth.
  function layer(width, height, y, background) {
   const group = new THREE.Group();
   search.add(group);
   group.position.y = y;
   box(group,width,height,.16,mat(background),0,0,0,.08);
   const canvas = document.createElement('canvas');
   canvas.width = 1440;
   canvas.height = Math.round(canvas.width * height / width);
   const ctx = canvas.getContext('2d');
   const texture = new THREE.CanvasTexture(canvas);
   texture.colorSpace = THREE.SRGBColorSpace;
   texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
   const face = new THREE.Mesh(new THREE.PlaneGeometry(width-.06,height-.06),
    new THREE.MeshBasicMaterial({map:texture, transparent:true, toneMapped:false}));
   face.position.z = .085;
   group.add(face);
   function paint(draw) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.roundRect(0,0,canvas.width,canvas.height,24);
    ctx.fill();
    draw((value,x,y,size,weight=500,color='#294659')=>{
     ctx.font = weight+' '+size+'px system-ui, sans-serif';
     ctx.fillStyle = color;
     ctx.fillText(value,x,y);
    });
    texture.needsUpdate = true;
   }
   return {group,paint};
  }
  const field = layer(5.25,.73,1.68,'#eaf7ff');
  const lens = mesh(field.group,new THREE.TorusGeometry(.17,.04,16,48),navy,-2.22,.04,.16);
  const handle = box(field.group,.08,.20,.08,navy,lens.position.x+.17,-.13,.16);
  handle.rotation.z = .72;
  const paper = new THREE.Shape();
  const left = -3.4, right = 3.4, top = 1.25, bottom = -1.25;
  const stub = 1.55, notch = .16, corner = .18;
  paper.moveTo(left + corner, bottom);
  paper.lineTo(stub - notch, bottom);
  paper.absarc(stub,bottom,notch,Math.PI,0,true);
  paper.lineTo(right-corner,bottom);
  paper.quadraticCurveTo(right,bottom,right,bottom+corner);
  paper.lineTo(right,top-corner);
  paper.quadraticCurveTo(right,top,right-corner,top);
  paper.lineTo(stub+notch,top);
  paper.absarc(stub,top,notch,0,-Math.PI,true);
  paper.lineTo(left+corner,top);
  paper.quadraticCurveTo(left,top,left,top-corner);
  paper.lineTo(left,bottom+corner);
  paper.quadraticCurveTo(left,bottom,left+corner,bottom);

  const stock = new THREE.ExtrudeGeometry(paper,{depth:.07,bevelEnabled:false,curveSegments:24});
  const uv = stock.attributes.uv, position = stock.attributes.position;
  for(let i=0;i<uv.count;i++){
   uv.setXY(i,(position.getX(i)-left)/(right-left),(position.getY(i)-bottom)/(top-bottom));
  }
  const print = document.createElement('canvas');
  print.width = 1632; print.height = 600;
  const ink = print.getContext('2d');
  const seam = (stub-left)*240;
  ink.fillStyle='#fcfdff'; ink.fillRect(0,0,print.width,print.height);
  ink.fillStyle='#a8dcf6'; ink.fillRect(seam,0,print.width-seam,print.height);
  ink.strokeStyle='#76b7d7'; ink.lineWidth=3; ink.setLineDash([9,10]);
  ink.beginPath(); ink.moveTo(seam,45); ink.lineTo(seam,555); ink.stroke();
  function lettering(value,x,y,size,weight,color='#203f55'){
   ink.font=weight+' '+size+'px system-ui,sans-serif';
   ink.fillStyle=color; ink.fillText(value,x,y);
  }
  lettering('대한항공  ·  KE1533',72,96,47,550);
  lettering('PUS',65,274,144,650);
  lettering('→',455,248,72,400,'#6999b3');
  lettering('CJU',655,274,144,650);
  lettering('김해',75,354,46,500);
  lettering('제주',669,354,46,500);
  ink.fillStyle='#dae7ee'; ink.fillRect(72,405,1020,3);
  lettering('출발',73,510,42,500);
  lettering('14:20',230,517,69,650);
  lettering('탑승구',seam+65,186,54,550);
  lettering('05',seam+53,390,179,650);
  const printed = new THREE.CanvasTexture(print);
  printed.colorSpace=THREE.SRGBColorSpace;
  printed.anisotropy=renderer.capabilities.getMaxAnisotropy();
  const ticket = mesh(search,stock,[new THREE.MeshBasicMaterial({map:printed,toneMapped:false}),mat('#a8c7da')]);
  const query='KE1533';
  let lastCount=-1;
  animate=time=>{
   const phase=time===0?5:time%9;
   const count=Math.min(query.length,Math.floor(Math.max(0,phase-.55)*4));
   if(count!==lastCount){
    field.paint(text=>text(count?query.slice(0,count):'항공편 검색',239,135,79,550));
    lastCount=count;
   }
   const reveal=THREE.MathUtils.smoothstep(phase,2.05,2.9)*(1-THREE.MathUtils.smoothstep(phase,8.3,9));
   ticket.visible=reveal>.002;
   ticket.scale.setScalar(.9+.1*reveal);
   ticket.position.set(0,-.75+.47*reveal,.45*reveal);
   ticket.rotation.set(-.27+.23*reveal,.025,-.065*reveal);
   field.group.position.y=.25+1.25*reveal;
   search.rotation.y=-.12+.045*Math.sin(time*.6);
  };
 }else if(kind==='crowd'){
  const queues = [1, 6, 3];
  const laneIndicators = [];
  const skin = mat("#edcdb6");
  const luggageColors = [mat('#78add6'), mat('#d0a381'), mat('#6f9298')];
  function addSuitcase(x, z, shell) {
   const bag = new THREE.Group();
   bag.position.set(x + .35, .11, z + .19);
   bag.rotation.x = -.16;
   root.add(bag);
   box(bag,.31,.42,.22,shell,0,.25,0,.06);
   for (const dx of [-.10,.10]) {
    ball(bag,.043,navy,dx,.035,.07);
    cyl(bag,.013,.21,silver,dx,.54,0);
   }
   box(bag,.23,.045,.045,navy,0,.65,0);
   const arm = box(root,.105,.27,.105,blue,x+.19,.63,z+.055);
   arm.rotation.z = .55;
   ball(root,.056,skin,x+.255,.73,z+.085);
  }
  function addBackpack(x,z,shell) {
   box(root,.29,.35,.19,shell,x,.58,z+.175,.07);
   box(root,.22,.13,.08,shell,x,.51,z+.275,.03);
   for (const dx of [-.12,.12]) {
    box(root,.043,.29,.10,navy,x+dx,.66,z+.08,.02);
   }
  }
  queues.forEach((count, lane) => {
   const x = (lane - 1) * 2;
   box(root, 1.55, .12, 6, silver, x, -.12, 1.2);
   const lamp = mat(['#73c59c','#ef9670','#e8c56f'][lane]);
   laneIndicators.push(box(root, 1.4, .23, .3, lamp, x, .15, -1.75));
   for (let row = 0; row < count; row++) {
    const z = -1 + row * .85;
    box(root, 1.10, .10, .68, lamp, x, .03, z, .05);
    for (const dx of [-.09, .09]) cyl(root,.063,.30,navy,x+dx,.23,z);
    mesh(root,new THREE.CapsuleGeometry(.18,.24,6,16),row%2 ? silver : blue,x,.55,z);
    ball(root,.17,skin,x,.96,z);
    mesh(root,new THREE.SphereGeometry(.177,24,16,0,Math.PI*2,0,1.38),navy,x,.99,z);
    const shell = luggageColors[(lane + row) % luggageColors.length];
    if ((lane + row) % 3 === 1) addBackpack(x,z,shell);
    else addSuitcase(x,z,shell);

   }
  });
  animate = time => {
   laneIndicators.forEach((indicator, lane) => {
    indicator.material.emissive.copy(indicator.material.color);
    indicator.material.emissiveIntensity = .12 + .7 * (.5 + .5 * Math.cos(time * 1.5 - lane * 2));
   });
   root.rotation.y = .08 * Math.sin(time * .48);
  };
  for(const x of [-3,3])for(const z of [-.5,2,4.5]){cyl(root,.035,.7,silver,x,.25,z);ball(root,.07,navy,x,.63,z);}

 }else{
  box(root,12,.12,10,mat('#dde8f6'),0,-.1,0);for(const z of [-2.7,2.7])for(let i=0;i<6;i++){box(root,.045,.02,2.5,white,-6+i*2,.01,z);box(root,1.95,.02,.045,white,-5+i*2,.01,z-1.25);}
  function car(m){const g=new THREE.Group();box(g,.95,.36,1.8,m,0,.4,0,.14);box(g,.8,.3,.9,m,0,.7,-.1,.13);box(g,.7,.22,.035,navy,0,.72,.37);box(g,.7,.22,.035,navy,0,.72,-.56);for(const x of [-.47,.47])for(const z of [-.5,.5]){const wheel=cyl(g,.18,.12,navy,x,.21,z);wheel.rotation.z=Math.PI/2;}root.add(g);return g;}
  const occupied = new Set([0, 1, 3, 4, 6, 8, 11]);
  const freeSpaces = [];
  for(let slot=0; slot<12; slot++){
   const x=-5+(slot%6)*2, z=slot<6?-2.7:2.7;
   if(occupied.has(slot)) car(slot%3?white:navy).position.set(x,0,z);
   else freeSpaces.push(box(root,1.84,.025,2.35,mat('#47aa98'),x,.015,z));
  }
  const arriving = car(blue);
  const path = new THREE.CurvePath();
  path.add(new THREE.LineCurve3(new THREE.Vector3(6.9,0,0), new THREE.Vector3(2.5,0,0)));
  path.add(new THREE.CubicBezierCurve3(
   new THREE.Vector3(2.5,0,0), new THREE.Vector3(1.5,0,0),
   new THREE.Vector3(1,0,.9), new THREE.Vector3(1,0,1.5)
  ));
  path.add(new THREE.LineCurve3(new THREE.Vector3(1,0,1.5), new THREE.Vector3(1,0,2.7)));

  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 390;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const receipt = new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,toneMapped:false}));
  receipt.scale.set(8.3,3.6,1);
  root.add(receipt);
  let lastMinutes = -1;
  function updateFee(minutes) {
   if(minutes === lastMinutes) return;
   lastMinutes = minutes;
   ctx.clearRect(0,0,900,390);
   ctx.fillStyle = '#fff';
   ctx.beginPath();ctx.roundRect(0,0,900,390,38);ctx.fill();
   ctx.fillStyle = '#345a74';
   ctx.font = '500 46px sans-serif';
   ctx.fillText('예상 주차 요금',58,85);
   ctx.font = '500 42px sans-serif';
   ctx.fillText('이용 '+minutes+'분   ·   30분당 1,000원',58,178);
   ctx.fillStyle = '#123c65';
   ctx.font = '650 90px sans-serif';
   ctx.fillText((Math.ceil(minutes/30)*1000).toLocaleString('ko-KR')+'원',55,316);
   texture.needsUpdate = true;
  }
  animate = time => {
   const phase = time % 12;
   const progress = THREE.MathUtils.smoothstep(phase,0,4);
   const direction = path.getTangentAt(progress);
   arriving.position.copy(path.getPointAt(progress));
   arriving.rotation.y = Math.atan2(direction.x,direction.z);
   arriving.visible = phase < 11.8;
   const reveal = THREE.MathUtils.smoothstep(phase,4.2,5);
   receipt.visible = reveal > 0;
   receipt.position.set(-1.5,3.8+reveal*.6,-1.3);
   receipt.material.opacity = reveal*(1-THREE.MathUtils.smoothstep(phase,11,11.8));
   if(receipt.visible) updateFee(Math.round(90*THREE.MathUtils.smoothstep(phase,5,7.6)));
   freeSpaces.forEach((space,index) => {
    space.visible = space.position.x !== 1 || space.position.z !== 2.7 || progress < .96;
    const pulse = .5 + .5 * Math.cos(time * 1.6 - index * .48);
    space.material.emissive.setHex(0x52d6ba);
    space.material.emissiveIntensity = pulse * .65;
    space.position.y = .02 + pulse * .10;
   });
  };
 }
 const framing = {
  flight: { position: [.8, 2.9, 13], target: [0, 1.7, 0] },
  crowd: { position: [7, 8, 11], target: [0, .5, 1] },
  parking: { position: [12, 14, 17], target: [0, 0, 0] },
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
