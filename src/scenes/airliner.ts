import { withBasePath } from '../site-path';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { addMesh } from './scene-primitives';

type AircraftMaterials = Record<'white'|'blue'|'navy'|'silver'|'dark', THREE.Material>;


// 꼬리 양면에 기존 산들 심벌을 흰색 도색으로 적용한다.
function tailBrandTexture() {
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=1024;
  const context=canvas.getContext('2d')!;
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;
  const logo=new Image();let disposed=false;
  texture.addEventListener('dispose',()=>{disposed=true;});
  const draw=()=>{
    if(disposed)return;
    context.clearRect(0,0,canvas.width,canvas.height);
    if(logo.complete&&logo.naturalWidth){
      context.drawImage(logo,24,24,976,976);
      context.globalCompositeOperation='source-in';context.fillStyle='#ffffff';context.fillRect(0,0,1024,1024);context.globalCompositeOperation='source-over';
    }
    texture.needsUpdate=true;
  };
  logo.onload=draw;logo.src=withBasePath('/brand/symbol.svg');
  draw();return texture;
}

// 동체를 한 곡면으로 만들고 날개·엔진을 같은 비율에 맞춘 공용 여객기 모델.
export function buildAirliner(m:AircraftMaterials) {
  const aircraft=new THREE.Group();
  const box=(w:number,h:number,d:number,material:THREE.Material,x:number,y:number,z:number)=>addMesh(aircraft,new RoundedBoxGeometry(w,h,d,3,Math.min(.025,w/4,h/4,d/4)),material,x,y,z);
  const profileCurve=new THREE.CatmullRomCurve3([
    [0,-4.95],[.1,-4.85],[.23,-4.5],[.4,-3.8],[.53,-2.8],[.56,-1.8],
    [.56,2.8],[.54,3.3],[.45,3.95],[.32,4.5],[.19,4.88],[.09,5.015],[0,5.045],
  ].map(([r,z])=>new THREE.Vector3(r,z,0)),false,'centripetal');
  const profile=profileCurve.getPoints(140).map(v=>new THREE.Vector2(Math.max(0,v.x),v.y));
  const fuselage=addMesh(aircraft,new THREE.LatheGeometry(profile,64),m.white);
  fuselage.rotation.x=Math.PI/2;
  const radiusAt=(z:number)=>{
    for(let i=1;i<profile.length;i++)if(profile[i].y>=z){
      const a=profile[i-1],b=profile[i];return THREE.MathUtils.lerp(a.x,b.x,(z-a.y)/(b.y-a.y));
    }
    return 0;
  };
  // 조종석 유리는 동체 곡면에 밀착시켜 돌출된 검은 상자처럼 보이지 않게 한다.
  function cockpitPane(side:number,a0:number,a1:number,z0:number,z1:number){
    const vertices:number[]=[],indices:number[]=[];
    for(let j=0;j<=4;j++)for(let i=0;i<=4;i++){
      const z=THREE.MathUtils.lerp(z0,z1,j/4),angle=THREE.MathUtils.lerp(a0,a1,i/4),r=radiusAt(z)+.008;
      vertices.push(side*r*Math.sin(angle),r*Math.cos(angle),z);
    }
    for(let j=0;j<4;j++)for(let i=0;i<4;i++){const k=j*5+i;indices.push(k,k+1,k+5,k+1,k+6,k+5);}
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setIndex(indices);geometry.computeVertexNormals();
    const glass=new THREE.MeshStandardMaterial({color:'#244260',roughness:.2,metalness:.3,side:THREE.DoubleSide});
    addMesh(aircraft,geometry,glass);
  }
  // 단면 두께가 날개 끝으로 갈수록 줄어드는 익형. 앞전과 뒷전도 곡면으로 연결한다.
  function foil(side:number,sections:number[][],material:THREE.Material){
    const vertices:number[]=[],indices:number[]=[],rings=24;
    for(const [span,center,chord,y,thickness] of sections)for(let i=0;i<rings;i++){
      const angle=i/rings*Math.PI*2;
      vertices.push(side*span,y+Math.sin(angle)*thickness,center+Math.cos(angle)*chord/2);
    }
    for(let j=0;j<sections.length-1;j++)for(let i=0;i<rings;i++){
      const a=j*rings+i,b=j*rings+(i+1)%rings,c=a+rings,d=b+rings;
      if(side>0)indices.push(a,c,b,b,c,d);else indices.push(a,b,c,b,d,c);
    }
    for(const end of [0,sections.length-1])for(let i=1;i<rings-1;i++){
      const a=end*rings;indices.push(a,a+i,a+i+1);
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setIndex(indices);geometry.computeVertexNormals();
    const surface=material.clone();surface.side=THREE.DoubleSide;
    addMesh(aircraft,geometry,surface);
  }
  for(const side of [-1,1]){
    foil(side,[[.35,.25,2.5,-.14,.09],[1.3,-.14,1.9,-.12,.075],[2.8,-.9,.98,.02,.045],[4.55,-1.65,.38,.2,.022]],m.white);
    foil(side,[[4.54,-1.65,.38,.2,.025],[4.65,-1.75,.32,.43,.02],[4.76,-1.9,.16,.78,.012]],m.blue);
    foil(side,[[.22,-3.6,1.03,.08,.045],[1.08,-3.95,.62,.17,.03],[1.75,-4.25,.25,.25,.015]],m.white);
    const nacelleProfile=[[.22,-.62],[.28,-.5],[.33,-.18],[.35,.28],[.33,.52],[.3,.59],[.27,.57],[.265,.41]];
    const engine=addMesh(aircraft,new THREE.LatheGeometry(nacelleProfile.map(([r,z])=>new THREE.Vector2(r,z)),48),m.white,side*1.7,-.58,.28);engine.rotation.x=Math.PI/2;
    box(.12,.35,.55,m.white,side*1.7,-.29,.04);
    addMesh(aircraft,new THREE.CircleGeometry(.265,40),m.dark,side*1.7,-.58,.7);
    const hub=addMesh(aircraft,new THREE.SphereGeometry(.075,20,12),m.silver,side*1.7,-.58,.75);hub.scale.z=1.5;
    for(let i=0;i<12;i++){
      const a=i/12*Math.PI*2;
      const blade=box(.035,.16,.016,m.silver,side*1.7+Math.cos(a)*.15,-.58+Math.sin(a)*.15,.716);blade.rotation.z=a-.7;
    }
    for(let i=0;i<17;i++){
      const window=addMesh(aircraft,new THREE.SphereGeometry(1,16,12),m.navy,side*.543,.15,2.78-i*.32);window.scale.set(.018,.045,.06);
    }
    for(const z of [3.05,-2.45])box(.018,.49,.24,m.silver,side*.55,-.015,z);
    cockpitPane(side,.12,.65,3.98,4.37);cockpitPane(side,.72,1.15,3.62,4.05);
    box(.055,.32,.055,m.silver,side*.56,-.68,-.65);
    for(const z of [-.85,-.55]){
      const wheel=addMesh(aircraft,new THREE.CylinderGeometry(.14,.14,.1,24),m.dark,side*.58,-.98,z);wheel.rotation.z=Math.PI/2;
    }
  }
  box(.055,.52,.055,m.silver,0,-.7,3.3);
  for(const x of [-.08,.08]){
    const wheel=addMesh(aircraft,new THREE.CylinderGeometry(.115,.115,.07,24),m.dark,x,-.99,3.3);wheel.rotation.z=Math.PI/2;
  }
  const finShape=new THREE.Shape();
  finShape.moveTo(0,0);finShape.quadraticCurveTo(.35,.12,.5,.4);
  finShape.lineTo(1.22,1.53);finShape.quadraticCurveTo(1.27,1.6,1.36,1.6);
  finShape.lineTo(1.72,1.6);finShape.quadraticCurveTo(1.78,1.6,1.79,1.52);
  finShape.lineTo(1.98,-.14);finShape.closePath();
  const fin=addMesh(aircraft,new THREE.ExtrudeGeometry(finShape,{depth:.065,bevelEnabled:true,bevelSize:.018,bevelThickness:.018,bevelSegments:3,curveSegments:16}),m.blue,-.0325,.22,-2.8);fin.rotation.y=Math.PI/2;
  const tailInk=new THREE.MeshBasicMaterial({map:tailBrandTexture(),transparent:true,depthWrite:false});
  for(const side of [-1,1]){
    const decal=addMesh(aircraft,new THREE.PlaneGeometry(.72,.76),tailInk,side*.075,1.05,-4.22);decal.rotation.y=side*Math.PI/2;decal.castShadow=false;decal.receiveShadow=false;
  }
  return aircraft;
}
