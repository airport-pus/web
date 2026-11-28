import * as THREE from 'three';
import { addMesh, createMaterial } from './scene-primitives';
import { softBox, toyCar, bake, blobTexture, contactShadow } from './toy-kit';

// 기존 장면의 색감을 유지하면서 차량 표면과 작은 부품의 입체감을 보강한다.
export function buildParkingCar(color:THREE.ColorRepresentation) {
  const paint=new THREE.MeshPhysicalMaterial({color,metalness:.28,roughness:.26,clearcoat:1,clearcoatRoughness:.16});
  const glass=new THREE.MeshPhysicalMaterial({color:'#24445d',metalness:.35,roughness:.15,clearcoat:1});
  const tyre=createMaterial('#273544',0,.9),chrome=createMaterial('#bac9d6',.8,.25);
  const lamp=new THREE.MeshStandardMaterial({color:'#f0faff',emissive:'#d2eaff',emissiveIntensity:.25});
  const tail=new THREE.MeshStandardMaterial({color:'#c76066',roughness:.35});
  const car=toyCar(paint,glass,tyre,chrome,lamp,tail);
  const box=(w:number,h:number,d:number,m:THREE.Material,x=0,y=0,z=0)=>addMesh(car,softBox(w,h,d,.3,.4,.3,14),m,x,y,z);
  box(.65,.12,.025,tyre,0,.36,1.16);
  box(.25,.075,.02,chrome,0,.43,1.18);
  box(.8,.045,.035,chrome,0,.25,1.12);
  box(.65,.06,.025,tyre,0,.28,-1.13);
  for(const side of [-1,1]) {
    box(.15,.08,.17,paint,side*.61,.79,.32);
    box(.015,.05,.11,glass,side*.69,.79,.32);
    for(const z of [-.43,.28])box(.018,.025,.13,chrome,side*.575,.63,z);
    box(.025,.045,1.35,chrome,side*.565,.31,-.03);
    for(const z of [-.682,.682]){
      const center=addMesh(car,new THREE.CylinderGeometry(.055,.055,.012,20),chrome,side*.589,.23,z);center.rotation.z=Math.PI/2;
      for(let i=0;i<5;i++) {
        const a=i*Math.PI*2/5;
        const spoke=box(.015,.115,.024,chrome,side*.591,.23+Math.cos(a)*.055,z+Math.sin(a)*.055);spoke.rotation.x=a;
      }
    }
  }
  bake(car);
  // 바퀴 접지와 차체 아래의 부드러운 그림자는 조명 범위 밖에서도 유지한다.
  contactShadow(car,blobTexture(),1.45,2.65,{x:0,y:-.035,z:0,opacity:.25,color:'#172d43'});
  car.scale.set(1.08,.94,1.24);
  return car;
}

export function createAsphaltMaterial() {
  const data=new Uint8Array(256*256*4);
  let seed=71;
  for(let i=0;i<256*256;i++) {
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const value=155+(seed%65);
    data[i*4]=data[i*4+1]=data[i*4+2]=value;data[i*4+3]=255;
  }
  const grain=new THREE.DataTexture(data,256,256,THREE.RGBAFormat);
  grain.wrapS=grain.wrapT=THREE.RepeatWrapping;grain.repeat.set(20,12);
  grain.magFilter=THREE.LinearFilter;grain.minFilter=THREE.LinearMipmapLinearFilter;grain.generateMipmaps=true;grain.needsUpdate=true;
  return new THREE.MeshStandardMaterial({color:'#6684a0',roughness:.91,metalness:0,bumpMap:grain,bumpScale:.018,roughnessMap:grain});
}
