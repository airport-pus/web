import * as THREE from 'three';
import { softBox, bake } from './toy-kit';
import { addMesh, createMaterial } from './scene-primitives';

const ease = (start: number, end: number, value: number) => {
  const t = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
};

// 닫힌 캐리어 → 짐 담기 → 닫고 출발. 모든 자세를 스크롤 값에서 계산해 역방향도 이어진다.
export function buildPackingCase(parent: THREE.Group) {
  const suitcase = new THREE.Group(); parent.add(suitcase);
  const shell = new THREE.MeshPhysicalMaterial({color:'#3182f6',roughness:.3,clearcoat:1,clearcoatRoughness:.18});
  const navy = createMaterial('#23446f',0,.55);
  const silver = createMaterial('#c3d5e7',.65,.3);
  const rib = createMaterial('#6aa6fa',.1,.3);
  const lining = createMaterial('#a7c7ed',0,.95);
  const box = (group:THREE.Object3D,w:number,h:number,d:number,m:THREE.Material,x=0,y=0,z=0) => addMesh(group,softBox(w,h,d,.25,.25,.4,20),m,x,y,z);
  box(suitcase,1.45,2.05,.4,shell,0,1.2,-.2);
  box(suitcase,1.3,1.9,.06,lining,0,1.2,.025);
  for(const x of [-.69,.69])box(suitcase,.08,1.98,.38,shell,x,1.2,0);
  for(const y of [.22,2.18])box(suitcase,1.4,.08,.38,shell,0,y,0);
  const lid = new THREE.Group();suitcase.add(lid);lid.position.set(-.73,1.2,0);
  box(lid,1.45,2.05,.24,shell,.73,0,.22);
  box(lid,1.29,1.88,.045,lining,.73,0,.075);
  for(let i=0;i<4;i++)box(lid,.09,1.62,.08,rib,.34+i*.26,0,.36);
  bake(lid);
  for(const x of [-.52,.52])for(const z of [-.24,.24]){
    const wheel=addMesh(suitcase,new THREE.CylinderGeometry(.09,.09,.09,20),navy,x,.05,z);wheel.rotation.z=Math.PI/2;
  }
  const handle=new THREE.Group();suitcase.add(handle);
  for(const x of [-.38,.38])addMesh(handle,new THREE.CylinderGeometry(.035,.035,.85,16),silver,x,2.55,-.24);
  box(handle,.9,.13,.17,navy,0,2.98,-.24);
  addMesh(suitcase,new THREE.TorusGeometry(.2,.045,12,24,Math.PI),navy,0,2.23,0);
  const garments:THREE.Group[]=[];
  for(let i=0;i<3;i++){
    const folded=new THREE.Group();suitcase.add(folded);garments.push(folded);
    const fabric=createMaterial(['#f7fafc','#b9dcf4','#719ad4'][i],0,.95);
    box(folded,1.03,.46,.13,fabric);
    box(folded,.46,.38,.04,fabric,0,0,.08);
    addMesh(folded,new THREE.TorusGeometry(.095,.018,8,20,Math.PI),lining,0,.14,.095);
    bake(folded);
  }
  const glasses=new THREE.Group();suitcase.add(glasses);
  for(const x of [-.16,.16]){
    addMesh(glasses,new THREE.TorusGeometry(.13,.022,8,24),navy,x,0,0);
    addMesh(glasses,new THREE.CircleGeometry(.105,24),createMaterial('#51779f',.3,.3),x,0,-.005);
  }
  box(glasses,.1,.025,.025,navy);
  return {update(progress:number){
    const lay=ease(.22,.4,progress)*(1-ease(.79,.93,progress));
    const open=ease(.34,.48,progress)*(1-ease(.71,.83,progress));
    const leave=ease(.92,1,progress);
    suitcase.position.set(3.1+ease(.22,.4,progress)*2.2+leave*1.8,.48*lay,.25);
    suitcase.rotation.set(-Math.PI/2*lay,-.2+leave*.16,-.08*leave);
    lid.rotation.y=-2.35*open;
    handle.position.y=-.65*lay;
    garments.forEach((item,i)=>{
      const packed=ease(.46+i*.045,.6+i*.045,progress);
      const reveal=ease(.37,.45,progress);
      const arriving=(1-packed)*reveal;
      item.visible=progress<.3||reveal>.01;
      item.scale.setScalar(progress<.3?1:reveal);
      item.position.set(arriving*(i-1)*.45,.62+i*.53,.13+arriving*(1.9+i*.35));
      item.rotation.set(arriving*.2,arriving*.22,arriving*(i-1)*.15);
    });
    const packed=ease(.61,.71,progress);
    glasses.visible=progress>.43;
    glasses.position.set(.05,1.25,.29+(1-packed)*2.3);
    glasses.rotation.z=(1-packed)*.5;
  }};
}
