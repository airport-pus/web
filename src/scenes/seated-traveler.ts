import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { addMesh, createMaterial } from './scene-primitives';
import { bake, cuteHead } from './toy-kit';

// 좌판 높이 0.75에 맞춰 골반·무릎·발을 배치한 대기 여행객.
export function buildSeatedTraveler(variant:number) {
  const person=new THREE.Group();
  const coat=createMaterial(['#dbe7f0','#7da7ce','#b5b8c4'][variant%3]);
  const trousers=createMaterial('#334d68'),shoe=createMaterial('#edf4fa');
  const skin=createMaterial('#ecd1b7'),hair=createMaterial(['#596573','#756b64','#5d626a'][variant%3],0,.95);
  const box=(w:number,h:number,d:number,m:THREE.Material,x=0,y=0,z=0)=>addMesh(person,new RoundedBoxGeometry(w,h,d,3,Math.min(.08,w/3,h/3,d/3)),m,x,y,z);
  box(.53,.64,.35,coat,0,1.2,-.12);
  box(.51,.2,.4,trousers,0,.86,-.02);
  for(const side of [-1,1]){
    box(.2,.2,.52,trousers,side*.15,.86,.22);
    box(.18,.67,.19,trousers,side*.15,.43,.43);
    box(.23,.14,.38,shoe,side*.15,.05,.52);
    // 양팔을 무릎 위에 얹어 서 있는 사람을 접어 놓은 인상을 피한다.
    const upper=box(.15,.37,.17,coat,side*.33,1.17,.01);upper.rotation.x=-.2;
    const forearm=box(.14,.15,.36,coat,side*.29,1,.22);forearm.rotation.z=side*.12;
    addMesh(person,new THREE.SphereGeometry(.085,16,12),skin,side*.25,1,.4);
  }
  const head=new THREE.Group();head.position.set(0,1.78,-.08);person.add(head);
  cuteHead((geometry,material,x=0,y=0,z=0)=>addMesh(head,geometry,material,x,y,z),.28,{skin,hair,eye:trousers,blush:createMaterial('#dca79a'),mouth:createMaterial('#aa7c71')},variant%4,.8);
  // 공용 얼굴은 유지하고, 덩어리 앞머리 대신 머리에 밀착된 얇은 헤어를 쓴다.
  for(const child of [...head.children]){
    if(child instanceof THREE.Mesh&&child.material===hair){head.remove(child);child.geometry.dispose();}
  }
  // 두피보다 바깥쪽에 연속된 헤어 표면을 만들어 정수리가 뚫려 보이지 않게 한다.
  const hairGeometry=new THREE.SphereGeometry(.3,40,28,0,Math.PI*2,0,1.8);
  const positions=hairGeometry.getAttribute('position');
  for(let i=0;i<positions.count;i++){
    const x=positions.getX(i),y=positions.getY(i),z=positions.getZ(i);
    const azimuth=Math.atan2(z,x);
    const fraction=Math.acos(THREE.MathUtils.clamp(y/.3,-1,1))/1.8;
    const hairline=1.8-.66*Math.max(0,Math.sin(azimuth));
    const angle=fraction*hairline;
    positions.setXYZ(i,.3*Math.sin(angle)*Math.cos(azimuth),.3*Math.cos(angle)*1.04,.3*Math.sin(angle)*Math.sin(azimuth)*.96);
  }
  hairGeometry.computeVertexNormals();
  addMesh(head,hairGeometry,hair);
  const fringe=addMesh(head,new THREE.SphereGeometry(.145,24,16),hair,variant%2?.065:-.065,.205,.19);
  fringe.scale.set(1.05,.32,.6);fringe.rotation.z=variant%2?-.22:.22;
  head.rotation.y=variant%2===0?-.14:.2;head.rotation.x=.06;bake(head);
  const luggage=new THREE.Group();person.add(luggage);luggage.position.set(.76,.34,.32);
  const bagMaterial=createMaterial(variant%2?'#6e99bf':'#a4b9cb');
  addMesh(luggage,new RoundedBoxGeometry(.38,.57,.3,3,.055),bagMaterial);
  for(const x of [-.11,.11]){
    addMesh(luggage,new THREE.BoxGeometry(.025,.32,.025),trousers,x,.39,0);
    addMesh(luggage,new THREE.SphereGeometry(.045,12,8),trousers,x,-.3,0);
  }
  addMesh(luggage,new RoundedBoxGeometry(.27,.06,.07,2,.02),trousers,0,.56,0);
  bake(luggage);bake(person);return person;
}
