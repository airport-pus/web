import { buildParkingCar, createAsphaltMaterial } from './parking-details';
import * as THREE from 'three';
import { addMesh, createMaterial } from './scene-primitives';
import { softBox, cuteHead, bake } from './toy-kit';

export function buildTerminalActivity(world:THREE.Group) {
  const blue=createMaterial('#3182f6'),pearl=createMaterial('#eff6ff'),silver=createMaterial('#adc8df',.5,.4),navy=createMaterial('#244b72');
  const skin=createMaterial('#efd5bd'),hair=createMaterial('#34445d'),blush=createMaterial('#eeb0a7'),mouth=createMaterial('#b67c70');
  const box=(parent:THREE.Object3D,w:number,h:number,d:number,m:THREE.Material,x=0,y=0,z=0)=>addMesh(parent,softBox(w,h,d,.3,.3,.35,16),m,x,y,z);
  const concourse=new THREE.Group();world.add(concourse);
  // 사람을 둘러싼 공간이 이어지도록 수속 통로와 대기 동선을 실제 위치에 둔다.
  for(const x of [20.5,27.5]){
    box(concourse,.22,3.25,.7,pearl,x,1.6,2);
    box(concourse,3.7,.24,.7,blue,x+1.7,3.1,2);
    box(concourse,.22,3.25,.7,pearl,x+3.4,1.6,2);
  }
  for(const x of [21.5,25.3])for(const z of [5,8,11,14]){
    addMesh(concourse,new THREE.CylinderGeometry(.045,.045,.95,16),silver,x,.48,z);
    addMesh(concourse,new THREE.CylinderGeometry(.17,.17,.05,20),navy,x,.015,z);
    if(z<14)box(concourse,.045,.085,3,blue,x,.9,z+1.5);
  }
  // 검색 장비와 직원은 통로 옆에 두고, 여행객의 이동 폭을 확보한다.
  const beltMaterial=createMaterial('#364f68',.1,.75);
  const trays:THREE.Group[]=[];
  const staffArms:THREE.Group[]=[];
  for(const x of [25.9,32.9]) {
    box(concourse,1.65,.22,6.5,silver,x,.76,6.2);
    box(concourse,1.35,.06,6.4,beltMaterial,x,.91,6.2);
    for(const z of [3.3,8.9])for(const dx of [-.55,.55])box(concourse,.12,.75,.12,silver,x+dx,.3,z);
    // 투과 검사 터널: 앞뒤가 열린 구조와 짙은 커튼.
    for(const dx of [-.78,.78])box(concourse,.2,1.5,2.2,pearl,x+dx,1.63,5.1);
    box(concourse,1.75,.22,2.2,blue,x,2.35,5.1);
    for(const z of [3.98,6.22])for(let j=0;j<6;j++)box(concourse,.2,1.18,.035,beltMaterial,x-.58+j*.23,1.57,z);
    box(concourse,.7,.5,.07,navy,x+1.1,1.65,5.1);
    box(concourse,.58,.37,.015,createMaterial('#7ad8ce'),x+1.1,1.65,5.15);
    for(let j=0;j<3;j++){
      const tray=new THREE.Group();world.add(tray);tray.position.set(x,1,0);
      box(tray,1.05,.08,.8,silver);
      box(tray,.65,.4,.5,j%2?blue:navy,0,.24,0);
      box(tray,.2,.055,.06,silver,0,.47,0);bake(tray);trays.push(tray);
    }
    const staff=new THREE.Group();world.add(staff);staff.position.set(x+1.45,-.15,7.8);
    box(staff,.55,.68,.36,navy,0,1.04,0);
    box(staff,.12,.09,.018,pearl,-.13,1.2,.19);
    for(const dx of [-.14,.14]){box(staff,.19,.65,.22,navy,dx,.4,0);box(staff,.22,.12,.34,pearl,dx,.04,.06);}
    const head=new THREE.Group();staff.add(head);head.position.y=1.66;
    cuteHead((geo,m,x=0,y=0,z=0)=>addMesh(head,geo,m,x,y,z),.29,{skin,hair,eye:navy,blush,mouth},1,.7);bake(head);
    const arm=new THREE.Group();staff.add(arm);arm.position.set(-.34,1.3,0);
    box(arm,.16,.44,.18,navy,0,-.2,0);addMesh(arm,new THREE.SphereGeometry(.09,12,8),skin,0,-.46,0);
    staffArms.push(arm);bake(staff);
  }
  // 양 끝의 안내 파티션 뒤에서 동선이 이어져 사람이 화면 안에서 되돌아오지 않는다.
  for(const x of [23.1,29.2])for(const z of [18.5]){
    box(concourse,3.2,2.7,.3,pearl,x,1.25,z);
    box(concourse,3.2,.16,.34,blue,x,2.55,z);
  }
  bake(concourse);
  const walkers=Array.from({length:34},(_,i)=>{
    const person=new THREE.Group();world.add(person);
    const coat=[blue,pearl,createMaterial('#8cb9df')][i%3];
    box(person,.53,.66,.35,coat,0,1.04,0);
    const head=new THREE.Group();head.position.set(0,1.65,0);person.add(head);
    cuteHead((geo,m,x=0,y=0,z=0)=>addMesh(head,geo,m,x,y,z),.29,{skin,hair,eye:navy,blush,mouth},i%4,.7);bake(head);
    const legs=[-.14,.14].map(x=>{
      const leg=new THREE.Group();person.add(leg);leg.position.set(x,.75,0);
      box(leg,.18,.58,.2,navy,0,-.29,0);box(leg,.2,.11,.32,pearl,0,-.64,.07);bake(leg);return leg;
    });
    for(const x of [-.34,.34]){
      const arm=addMesh(person,new THREE.CapsuleGeometry(.09,.43,4,12),coat,x,1,0);arm.rotation.z=x>0?.12:-.12;
      addMesh(person,new THREE.SphereGeometry(.085,12,8),skin,x,.69,0);
    }
    const bag=new THREE.Group();person.add(bag);bag.position.set(.5,.29,-.24);
    box(bag,.32,.46,.24,coat);box(bag,.18,.2,.025,silver,0,.32,0);
    for(const x of [-.1,.1])addMesh(bag,new THREE.SphereGeometry(.045,10,8),navy,x,-.24,0);
    bake(bag);bake(person);
    return {person,legs};
  });
  // 터미널 바닥이 끝나는 지점 밖에 주차장을 배치하고 보행로와 차도를 분리한다.
  const parking=new THREE.Group();world.add(parking);parking.position.z=26;
  const asphalt=createMaterial('#6587a8',0,.9),curb=createMaterial('#d8e5ef');
  const green=new THREE.MeshStandardMaterial({color:'#58c9b2',emissive:'#34a892',emissiveIntensity:.25,roughness:.6});
  const occupied=new THREE.MeshStandardMaterial({color:'#ea9c93',emissive:'#b65e59',emissiveIntensity:.12,roughness:.6});
  box(parking,220,.15,100,asphalt,50,-.17,48);
  const road=addMesh(parking,new THREE.PlaneGeometry(220,100),createAsphaltMaterial(),50,-.09,48);
  road.rotation.x=-Math.PI/2;road.receiveShadow=true;road.castShadow=false;
  box(parking,220,.16,4,curb,50,-.08,-2.2);
  // 외곽을 화면 밖까지 이어 작은 받침대처럼 잘리는 경계를 없앤다.
  for(let x=12;x<110;x+=4)box(parking,1.8,.016,.065,pearl,x,-.065,15.5);
  for(let x=31;x<110;x+=2.7){
    for(const z of [23,34]) {
      box(parking,.055,.018,4.8,pearl,x,-.065,z);
      box(parking,2.65,.018,.055,pearl,x+1.325,-.065,z-2.4);
      box(parking,1.15,.13,.18,curb,x+1.325,.005,z-1.8);
    }
  }
  for(let i=0;i<24;i++) {
    if(i%5===2)continue;
    const car=buildParkingCar(['#dfe8f0','#819cb5','#3c71a6','#e5e5de'][i%4]);
    parking.add(car);car.position.set(32.325+(i%12)*5.4,-.04,i<12?23:34);
    car.rotation.y=i<12?Math.PI:0;
  }
  // 도로 양측의 짧은 안전 볼라드로 보행 영역을 분리한다.
  for(let x=30;x<92;x+=3){
    box(parking,.12,.7,.12,silver,x,.25,-.2);
    box(parking,.14,.1,.14,pearl,x,.5,-.2);
  }
  // 횡단보도와 차선 화살표는 실제 바닥 도색으로 표현한다.
  for(let i=0;i<7;i++)box(parking,2.4,.015,.33,pearl,33,-.075,1+i*.65);
  for(const x of [21,35,49,63,77,91]) {
    box(parking,1,.015,.07,pearl,x,-.075,12);
    const arrow=new THREE.Shape();arrow.moveTo(-.45,-.28);arrow.lineTo(.05,0);arrow.lineTo(-.45,.28);arrow.closePath();
    const marker=addMesh(parking,new THREE.ShapeGeometry(arrow),pearl,x+.7,-.07,12);marker.rotation.x=-Math.PI/2;
  }
  const indicators:THREE.Mesh[]=[];
  for(let i=0;i<6;i++){
    const x=40+i*2.7;
    box(parking,.055,.02,4.6,pearl,x,-.065,6);
    box(parking,2.65,.02,.055,pearl,x+1.325,-.065,3.7);
    box(parking,2.65,.02,.055,pearl,x+1.325,-.065,8.3);
    box(parking,1.1,.14,.18,curb,x+1.325,.01,4.4);
    const light=box(parking,.7,.025,.2,i===2||i===3?green:occupied,x+1.325,-.05,8.7);indicators.push(light);
  }
  box(parking,.055,.02,4.6,pearl,56.2,-.065,6);
  const vacancy=box(parking,2.35,.012,4.2,new THREE.MeshStandardMaterial({color:'#5caaad',roughness:.85}),46.7,-.078,6);
  for(const x of [36,59]) {
    box(parking,1.5,.22,11,curb,x,.015,4.4);
    for(const z of [1,5,9]){
      addMesh(parking,new THREE.CylinderGeometry(.1,.13,1.1,16),navy,x,.65,z);
      const leaves=createMaterial('#7ba99b',0,.9);
      for(let j=0;j<5;j++) {
        const angle=j*2.4;
        const crown=addMesh(parking,new THREE.SphereGeometry(.46,20,14),leaves,x+Math.cos(angle)*.26,1.65+(j%3)*.2,z+Math.sin(angle)*.24);
        crown.scale.y=1.15;
      }
    }
  }
  for(const x of [36,59]) {
    box(parking,1.25,.035,10.75,createMaterial('#6f938b',0,1),x,.14,4.4);
    for(let z=-.8;z<10;z+=.75)box(parking,1.5,.012,.018,silver,x,.14,z);
  }
  for(let x=29;x<63;x+=1.1)box(parking,.018,.015,2, silver,x,.009,-1.4);
  for(const x of [37,58,79,100]) {
    box(parking,.09,4.6,.09,silver,x,2.25,17);
    box(parking,1.3,.12,.45,pearl,x+.5,4.55,17);
  }
  // 주차장 너머의 유리 외벽으로 실내 바닥과 야외 공간을 구분한다.
  const exteriorGlass=createMaterial('#8fb9d9',.25,.35);
  // 낮은 카메라가 지나가는 출입구 폭을 비워 외벽을 관통하지 않게 한다.
  box(world,70,5.2,1,exteriorGlass,-10,2.45,21.5);
  box(world,99,5.2,1,exteriorGlass,85.5,2.45,21.5);
  box(world,11,.45,1,pearl,30.5,4.88,21.5);
  box(world,181,.22,1.8,pearl,45,5.1,21.5);
  for(let i=0;i<=90;i++){const x=-45+i*2;if(x>25&&x<36)continue;box(world,.09,5.2,.12,pearl,x,2.45,22.05);}
  // 입구에서 보이는 터미널 외부 캐노피와 이어지는 보도.
  box(world,27,.2,4,pearl,24,4.8,24);
  for(const x of [12,24,36])box(world,.18,4.8,.18,silver,x,2.3,24);
  box(world,30,.08,3.5,curb,25,-.09,26);
  for(const i of [0,1,4,5]){
    const parked=buildParkingCar(i%2===0?'#eef3fa':'#478bdf');parking.add(parked);parked.position.set(41.3+i*2.7,-.04,5.7);parked.rotation.y=Math.PI;
  }
  const moving=buildParkingCar('#3182f6');parking.add(moving);
  const enter=new THREE.CubicBezierCurve3(new THREE.Vector3(10,0,12),new THREE.Vector3(48,0,12),new THREE.Vector3(46.7,0,13),new THREE.Vector3(46.7,0,5.8));
  const reverse=new THREE.CubicBezierCurve3(new THREE.Vector3(46.7,0,5.8),new THREE.Vector3(46.7,0,10.5),new THREE.Vector3(44,0,12),new THREE.Vector3(40.5,0,12));
  const point=new THREE.Vector3(),direction=new THREE.Vector3();
  const smooth=(t:number)=>THREE.MathUtils.smootherstep(t,0,1);
  return {update(time:number){
    walkers.forEach(({person,legs},i)=>{
      // 검색 후 창문(z=0) 전에 우회전하여 터미널 안쪽 통로로 이동한다.
      const lane=i%2, row=Math.floor(i/2);
      const step=time/3.4;
      const fraction=step-Math.floor(step);
      const travel=(Math.floor(step)+THREE.MathUtils.smootherstep(fraction,.3,.92))*1.15;
      const distance=THREE.MathUtils.euclideanModulo(travel+row*6,102);
      const laneX=lane===0?23.1:29.2;
      const turnStart=16, turnLength=Math.PI/2;
      if(distance<turnStart){
        person.position.set(laneX,-.15,18-distance);
        person.rotation.y=Math.PI;
      }else if(distance<turnStart+turnLength){
        const angle=distance-turnStart;
        person.position.set(laneX+1-Math.cos(angle),-.15,2-Math.sin(angle));
        person.rotation.y=Math.PI-angle;
      }else{
        person.position.set(laneX+1+distance-turnStart-turnLength,-.15,1);
        person.rotation.y=Math.PI/2;
      }
      // 재진입 지점은 후방 파티션, 퇴장 지점은 카메라 밖의 실내 복도다.
      person.visible=true;
      const stride=fraction>.3&&fraction<.92?Math.sin((fraction-.3)/.62*Math.PI):0;
      legs.forEach((leg,j)=>leg.rotation.x=Math.sin(time*7+j*Math.PI)*.22*stride);

    });
    trays.forEach((tray,i)=>tray.position.z=9.1-THREE.MathUtils.euclideanModulo(time*.45+(i%3)*2,6));
    staffArms.forEach((arm,i)=>{arm.rotation.z=-.65+Math.sin(time*1.1+i)*.16;arm.rotation.x=-.35;});
    const t=THREE.MathUtils.euclideanModulo(time,32);
    if(t<7){const p=smooth(t/7);enter.getPoint(p,point);enter.getTangent(p,direction);}
    else if(t<12){enter.getPoint(1,point);enter.getTangent(1,direction);}
    else if(t<17){const p=smooth((t-12)/5);reverse.getPoint(p,point);reverse.getTangent(p,direction).negate();}
    else {point.set(THREE.MathUtils.lerp(40.5,120,smooth((t-17)/15)),0,12);direction.set(1,0,0);}
    moving.position.copy(point);moving.position.y=-.04;moving.rotation.y=Math.atan2(direction.x,direction.z);
    const inSpace=point.z<8.3&&Math.abs(point.x-46.7)<1;
    indicators[2].material=inSpace?occupied:green;
    vacancy.visible=!inSpace;
  }};
}
