import { buildSeatedTraveler } from './seated-traveler';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { addMesh, createMaterial } from './scene-primitives';
import { bake } from './toy-kit';

// 하나의 연속된 공간. 스크롤 도중 장면이나 카메라를 교체하지 않는다.
export function buildTerminalFilm(airplane:()=>THREE.Group) {
  const world=new THREE.Group();
  const pearl=createMaterial('#eff6ff',.12,.34);
  const silver=createMaterial('#bed3e8',.5,.32);
  const blue=createMaterial('#3182f6',.12,.36);
  const navy=createMaterial('#214b77',.12,.55);
  const box=(g:THREE.Object3D,w:number,h:number,d:number,m:THREE.Material,x=0,y=0,z=0)=>addMesh(g,new RoundedBoxGeometry(w,h,d,3,Math.min(.18,w/4,h/4,d/4)),m,x,y,z);
  const architecture=new THREE.Group();world.add(architecture);
  const floor=box(architecture,90,.3,25,pearl,0,-.25,10);
  floor.receiveShadow=true;
  // 긴 창의 세로 프레임이 전경을 지나며 속도와 공간 깊이를 만든다.
  for(let i=0;i<11;i++) {
    const x=-30+i*6;
    box(architecture,.19,10,.26,pearl,x,4.8,0);
    const rib=new THREE.CatmullRomCurve3([
      new THREE.Vector3(x,0,0),new THREE.Vector3(x,7,0),new THREE.Vector3(x,9,2),new THREE.Vector3(x,9.5,9),new THREE.Vector3(x,9.5,18)
    ]);
    addMesh(architecture,new THREE.TubeGeometry(rib,32,.16,10,false),pearl);
  }
  box(architecture,90,.16,.2,silver,0,2,0);
  box(architecture,90,.12,.2,silver,0,6.6,0);
  box(architecture,90,.26,.28,pearl,0,0,0);
  // 투명 판 대신 바깥까지 열어 둔 시야로 비행기 윤곽을 선명하게 유지한다.
  for(const x of [-17,-5,7,19]) {
    const bench=new THREE.Group();architecture.add(bench);bench.position.set(x,0,4.7);
    for(let i=0;i<3;i++) {
      box(bench,1.08,.2,1.15,blue,i*1.22,.65,0);
      const back=box(bench,1.08,1.05,.17,blue,i*1.22,1.2,-.48);back.rotation.x=-.12;
    }
    for(const dx of [.2,2.25])box(bench,.13,.6,.7,silver,dx,.25,0);
  }
  // 마지막 구간의 의자에만 여행객 한 명을 남긴다.
  for(const [x,seat,variant] of [[19,0,4]]){
    const traveler=buildSeatedTraveler(variant);world.add(traveler);
    traveler.position.set(x+seat*1.22,0,4.7);
  }
  bake(architecture);
  const apron=addMesh(world,new THREE.PlaneGeometry(200,180),createMaterial('#8eb3d4',0,.85),0,-.42,-75);apron.rotation.x=-Math.PI/2;
  for(let i=0;i<26;i++)box(world,1.7,.015,.09,pearl,-50+i*4,-.39,-15);
  for(const z of [-9,-20])box(world,180,.018,.055,pearl,0,-.39,z);
  const aircraft=airplane();world.add(aircraft);aircraft.scale.setScalar(1.2);aircraft.rotation.y=Math.PI/2;
  // 배경 공항은 주인공보다 낮은 대비로 두어 장난감 모형처럼 보이지 않게 한다.
  const distant=new THREE.Group();world.add(distant);
  box(distant,65,3.5,7,silver,0,1.3,-40);
  box(distant,67,.35,8,pearl,0,3.2,-40);
  for(let i=0;i<30;i++)box(distant,.12,3.3,.1,pearl,-30+i*2,1.4,-36.4);
  addMesh(distant,new THREE.CylinderGeometry(.7,1.2,11,32),pearl,26,5,-39);
  addMesh(distant,new THREE.CylinderGeometry(2.3,1.7,1.8,40),navy,26,11,-39);
  addMesh(distant,new THREE.CylinderGeometry(2.5,2.5,.25,40),pearl,26,12,-39);
  bake(distant);
  const clouds:THREE.Group[]=[];
  const cloudMaterial=createMaterial('#e6f2ff',0,.92);
  for(let i=0;i<5;i++) {
    const cloud=new THREE.Group();world.add(cloud);clouds.push(cloud);
    for(let j=0;j<4;j++){
      const puff=addMesh(cloud,new THREE.SphereGeometry(1.5+j*.2,24,16),cloudMaterial,j*1.8,Math.sin(j)*.6,0);puff.scale.y=.55;puff.castShadow=false;
    }
    cloud.position.set(-35+i*17,14+(i%2)*5,-54-(i%3)*8);bake(cloud);
  }
  const luggage=new THREE.Group();world.add(luggage);luggage.position.set(-3.5,0,4);
  box(luggage,.8,1.2,.5,blue,0,.7,0);
  for(let i=0;i<3;i++)box(luggage,.05,.9,.04,silver,-.22+i*.22,.7,.27);
  for(const x of [-.24,.24])box(luggage,.035,.5,.035,silver,x,1.48,0);
  box(luggage,.55,.08,.12,navy,0,1.75,0);
  for(const x of [-.28,.28])addMesh(luggage,new THREE.SphereGeometry(.08,12,8),navy,x,.06,0);
  bake(luggage);
  const lightTarget=new THREE.Vector3(-1,1,0);
  return {world,lightTarget,update(progress:number,time:number,camera:THREE.PerspectiveCamera,mobile:boolean){
    const p=THREE.MathUtils.smootherstep(progress,0,1);
    // 창 쪽으로 전진하지 않고 실내에서 옆으로만 이동해 의자와 바닥을 전경에 남긴다.
    camera.position.set(-8+p*18,3.1+p*.25,12+(mobile?6:0));
    camera.lookAt(-6+p*25,1.4,-14);
    const lift=THREE.MathUtils.smootherstep(progress,.4,1);
    aircraft.position.set(-6+p*27,.93+lift*3.2,-14-lift*1.5);
    aircraft.rotation.order='YXZ';
    aircraft.rotation.x=-THREE.MathUtils.smootherstep(progress,.3,.8)*.09;
    clouds.forEach((cloud,i)=>cloud.position.x=-35+i*17+Math.sin(time*.06+i)*1.2);
  }};
}
