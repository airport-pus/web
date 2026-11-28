import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { addMesh, createMaterial } from './scene-primitives';
import { bake } from './toy-kit';

// 여행의 시작에 집중하는 단일 장면. 스크롤에 따라 활주에서 이륙까지 이어진다.
export function buildTakeoffFilm(airplane:()=>THREE.Group) {
  const world=new THREE.Group();
  const white=createMaterial('#edf5ff',.1,.45);
  const groundMaterial=createMaterial('#8eb3d4',0,.95);
  const runwayMaterial=createMaterial('#668caf',0,.85);
  const ground=addMesh(world,new THREE.PlaneGeometry(1200,1200),groundMaterial,0,-.15,0);
  ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;ground.castShadow=false;
  const runway=addMesh(world,new THREE.PlaneGeometry(700,13),runwayMaterial,0,-.12,0);
  runway.rotation.x=-Math.PI/2;runway.receiveShadow=true;runway.castShadow=false;
  const markings=new THREE.Group();world.add(markings);
  for(let x=-300;x<350;x+=7){
    addMesh(markings,new THREE.BoxGeometry(3,.012,.18),white,x,-.1,0);
    for(const z of [-6,6])addMesh(markings,new THREE.BoxGeometry(.2,.06,.15),white,x,-.06,z);
  }
  for(const z of [-5.6,5.6])addMesh(markings,new THREE.BoxGeometry(700,.012,.09),white,0,-.1,z);
  bake(markings);
  // 멀리 놓인 낮은 터미널은 출발 장소만 암시하고 비행기를 가리지 않는다.
  const terminal=new THREE.Group();world.add(terminal);
  const glass=createMaterial('#86aacb',.2,.55);
  addMesh(terminal,new RoundedBoxGeometry(85,3.2,8,3,.2),glass,10,1.4,-65);
  addMesh(terminal,new RoundedBoxGeometry(87,.22,9,3,.08),white,10,3.1,-65);
  for(let x=-30;x<53;x+=3)addMesh(terminal,new THREE.BoxGeometry(.1,3.1,.12),white,x,1.4,-60.9);
  bake(terminal);
  const aircraft=airplane();world.add(aircraft);aircraft.scale.setScalar(1.2);
  aircraft.rotation.order='YXZ';aircraft.rotation.y=Math.PI/2;
  const cloudMaterial=createMaterial('#e6f1fc',0,.95);
  const clouds=Array.from({length:9},(_,i)=>{
    const cloud=new THREE.Group();world.add(cloud);
    for(let j=0;j<5;j++){
      const puff=addMesh(cloud,new THREE.SphereGeometry(1.7+j*.18,28,18),cloudMaterial,j*2,Math.sin(j)*.65,Math.cos(j)*.6);
      puff.scale.y=.65;puff.castShadow=false;
    }
    cloud.position.set(-55+i*21,15+(i%3)*7,-38-(i%2)*22);bake(cloud);return cloud;
  });
  const look=new THREE.Vector3();
  return {world,lightTarget:look,update(progress:number,time:number,camera:THREE.PerspectiveCamera,mobile:boolean){
    const p=THREE.MathUtils.clamp(progress,0,1);
    const lift=THREE.MathUtils.smootherstep(p,.25,1);
    const pitch=THREE.MathUtils.smootherstep(p,.2,.55);
    const x=-12+62*p*p;
    const y=1.05+lift*22;
    aircraft.position.set(x,y,0);
    aircraft.rotation.x=-pitch*.16;
    aircraft.rotation.z=-THREE.MathUtils.smootherstep(p,.7,1)*.035;
    look.set(x+.5,y+.4,0);
    // 기체를 같은 크기로 따라가며 지면만 서서히 멀어지게 한다.
    camera.position.set(x+11-lift*4,y+5-lift*1.5,mobile?32:22);
    camera.lookAt(look);
    clouds.forEach((cloud,i)=>cloud.position.x=-55+i*21+Math.sin(time*.035+i)*1.8);
  }};
}
