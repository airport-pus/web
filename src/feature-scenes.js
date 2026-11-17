import {disposeScene} from './dispose-scene.js';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function mountFeatureScenes(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const cleanups=[];
 document.querySelectorAll('[data-feature-scene]').forEach(host=>{
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
  function tick(now){raf=0;if(!isActive()){sync();return;}elapsed+=last?Math.min((now-last)/1000,.05):0;last=now;engine.render(reduced.matches?0:elapsed);if(!reduced.matches)raf=requestAnimationFrame(tick);}
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
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;host.appendChild(renderer.domElement);
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
 const shadow=mesh(scene,new THREE.PlaneGeometry(80,80),new THREE.ShadowMaterial({opacity:.1}),0,-.25,0);shadow.rotation.x=-Math.PI/2;shadow.castShadow=false;
 let animate=()=>{};
 if(kind==='flight'){
  const plane=new THREE.Group();root.add(plane);
  const body=cyl(plane,.46,5.8,white,0,0,0);body.rotation.x=Math.PI/2;
  const nose=ball(plane,.47,white,0,0,2.9);nose.scale.z=1.6;
  const tail=ball(plane,.45,white,0,0,-2.9);tail.scale.z=1.7;
  function wing(points,m,y){const shape=new THREE.Shape();points.forEach(([x,z],i)=>i?shape.lineTo(x,z):shape.moveTo(x,z));shape.closePath();const o=mesh(plane,new THREE.ExtrudeGeometry(shape,{depth:.1,bevelEnabled:true,bevelThickness:.04,bevelSize:.04,bevelSegments:2}),m);o.rotation.x=Math.PI/2;o.position.y=y;}
  for(const side of [-1,1]){wing([[0,1],[side*4,-1.1],[side*4.1,-1.6],[side*.5,-1]],white,0);wing([[0,-2.3],[side*1.8,-3.3],[side*1.8,-3.7],[0,-3.1]],white,.15);for(let i=0;i<10;i++){const w=ball(plane,.055,navy,side*.45,.15,2-i*.4);w.scale.x=.25;}const engine=cyl(plane,.3,1.1,white,side*1.7,-.5,-.2);engine.rotation.x=Math.PI/2;const intake=cyl(plane,.24,.04,navy,side*1.7,-.5,.37);intake.rotation.x=Math.PI/2;box(plane,.1,.5,.45,blue,side*4,.2,-1.35);}
  const fin=new THREE.Shape();fin.moveTo(0,0);fin.lineTo(0,1.5);fin.lineTo(1.4,0);const rudder=mesh(plane,new THREE.ExtrudeGeometry(fin,{depth:.1,bevelEnabled:false}),blue,-.05,.3,-3.2);rudder.rotation.y=Math.PI/2;
  box(plane,.65,.15,.35,navy,0,.34,2.6);plane.position.set(0,2,0);plane.rotation.y=-.35;

  animate=t=>{plane.position.y=2+Math.sin(t*.65)*.13;plane.rotation.z=Math.sin(t*.4)*.025;};
 }else if(kind==='crowd'){
  for(const x of [-2,0,2]){box(root,.14,2.5,.6,white,x-.65,1.1,-2);box(root,.14,2.5,.6,white,x+.65,1.1,-2);box(root,1.5,.22,.7,blue,x,2.4,-2);box(root,.25,.15,.08,glass,x,2.4,-1.6);}
  const people=[];for(let i=0;i<12;i++){const g=new THREE.Group();root.add(g);const color=i%3===0?blue:i%3===1?white:silver;cyl(g,.13,.45,color,0,.45,0);ball(g,.15,mat('#e8d8c8'),0,.85,0);for(const x of [-.07,.07])cyl(g,.035,.27,navy,x,.12,0);box(g,.18,.28,.16,color,.24,.15,.05);g.position.set(-2+(i%3)*2,0,0+Math.floor(i/3)*1.3);people.push(g);}
  for(const x of [-3,3])for(const z of [-.5,2,4.5]){cyl(root,.035,.7,silver,x,.25,z);ball(root,.07,navy,x,.63,z);}
  animate=t=>people.forEach((g,i)=>{g.position.z=Math.floor(i/3)*1.3+Math.sin(t*.35-i*.3)*.28;});
 }else{
  box(root,12,.12,10,mat('#dde8f6'),0,-.1,0);for(const z of [-2.7,2.7])for(let i=0;i<6;i++){box(root,.045,.02,2.5,white,-5+i*2,.01,z);box(root,1.95,.02,.045,white,-4+i*2,.01,z-1.25);}
  function car(m){const g=new THREE.Group();box(g,.95,.36,1.8,m,0,.4,0,.14);box(g,.8,.3,.9,m,0,.7,-.1,.13);box(g,.7,.22,.035,navy,0,.72,.37);box(g,.7,.22,.035,navy,0,.72,-.56);for(const x of [-.47,.47])for(const z of [-.5,.5]){const wheel=cyl(g,.18,.12,navy,x,.21,z);wheel.rotation.z=Math.PI/2;}root.add(g);return g;}
  for(let i=0;i<7;i++){const c=car(i%3?white:navy);c.position.set(-4+(i%4)*2,0,i<4?-2.7:2.7);}
  const space=box(root,1.9,.025,2.4,mat('#b7d9ff'),2,.015,2.7);const moving=car(blue);
  const path=new THREE.CubicBezierCurve3(new THREE.Vector3(6,0,0),new THREE.Vector3(2,0,0),new THREE.Vector3(2,0,1),new THREE.Vector3(2,0,2.7));
  animate=t=>{const q=(t%12)/12,u=q<.6?(q/.6)**2*(3-2*q/.6):1;moving.position.copy(path.getPoint(u));const v=path.getTangent(u);moving.rotation.y=Math.atan2(v.x,v.z);moving.visible=q<.98;};
 }
 let mobile=false;
 function render(t){mobile=innerWidth<=800;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();
  if(kind==='flight'){camera.position.set(10,8,17);camera.lookAt(mobile?0:-4.5,mobile?4.4:1.2,0);}
  else if(kind==='crowd'){camera.position.set(9,10,16);camera.lookAt(0,1.4,1);}
  else{camera.position.set(11,13,17);camera.lookAt(mobile?0:4.8,mobile?4.5:0,0);}
  if(host.dataset.editorial){
   const narrow=host.clientWidth/host.clientHeight<1.2;
   if(kind==='flight'){camera.position.set(8,5.5,12);camera.lookAt(0,1.4,0);}
   else if(kind==='crowd'){camera.position.set(7,7.5,11);camera.lookAt(0,1,1);}
   else{camera.position.set(10,11,15);camera.lookAt(0,.2,0);}
   if(narrow)camera.position.multiplyScalar(kind==='parking'?1.2:1.08);
  }
  animate(t);renderer.render(scene,camera);
 }
 const observer=new ResizeObserver(()=>{renderer.setSize(host.clientWidth,host.clientHeight,false);render(0);});observer.observe(host);
 renderer.setSize(host.clientWidth,host.clientHeight,false);render(0);return {render,dispose(){observer.disconnect();disposeScene(scene,renderer,environmentTarget);}};
}
