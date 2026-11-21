import type { AddMesh, FaceMaterials } from './toy-kit';
import * as THREE from 'three';
import { tube, lathe, cuteHead, sneaker, mitten, bake } from './toy-kit';

// 앉아 있는 여행객의 자세는 휴대폰을 든 'phone'과 손을 무릎에 둔 'lap'으로 나뉜다.
// 시선을 움직일 수 있도록 머리 그룹을 반환한다.
export function buildTraveler(traveler: THREE.Group, { mesh }: {mesh: (parent: THREE.Object3D, ...args: Parameters<AddMesh>) => THREE.Mesh}, c: FaceMaterials & Record<'shirt' | 'trousers' | 'white' | 'sole', THREE.Material>, { pose = 'phone', hairStyle = 0, shoe }: {pose?: 'phone' | 'lap'; hairStyle?: number; shoe?: {upper: THREE.Material; sole: THREE.Material}} = {}) {
 const add: AddMesh = (geo, m, x = 0, y = 0, z = 0) => mesh(traveler, geo, m, x, y, z);
 // 회전체로 만든 상체를 앞뒤로 눌러 어깨와 가슴의 형태를 잡는다.
 const torso = add(lathe([[0, 0], [.47, 0], [.56, .08], [.6, .34], [.6, .74], [.57, 1.0], [.48, 1.17], [.3, 1.29], [.16, 1.33], [0, 1.33]], 24), c.shirt, 0, 1.24, -.08);
 torso.scale.set(1, 1, .68); torso.rotation.x = .1;
 add(new THREE.TorusGeometry(.18, .055, 8, 20), c.shirt, 0, 2.55, .02).rotation.x = Math.PI / 2 - .1;
 add(new THREE.CylinderGeometry(.13, .15, .3, 14, 1, true), c.skin, 0, 2.66, .04);
 // 허벅지, 무릎, 정강이를 매끄럽게 연결한다.
 for (const x of [-.3, .3]) {
  add(tube([[x, 1.36, -.05], [x * 1.06, 1.27, .85], [x * 1.08, 1.06, 1.32], [x * 1.08, .66, 1.52], [x * 1.08, .3, 1.62]], .24, { r2: .17, seg: 14, radial: 12 }), c.trousers);
  sneaker(add, .37, shoe?.upper ?? c.white, shoe?.sole ?? c.sole, x * 1.08, -.11, 1.72, .7);
 }
 // 소매 끝에 소맷단과 손을 배치한다.
 const arms: [number, THREE.Vector3Tuple, THREE.Vector3Tuple, THREE.Vector3Tuple, THREE.Vector3Tuple][] = pose === 'phone'
  ? [[-1, [-.5, 2.36, .02], [-.68, 1.86, .62], [-.31, 2.04, 1.3], [-.26, 2.09, 1.42]], [1, [.5, 2.36, .02], [.62, 1.88, .7], [.34, 2.12, 1.38], [.3, 2.16, 1.5]]]
  : [[-1, [-.5, 2.36, .02], [-.62, 1.72, .32], [-.38, 1.47, .86], [-.32, 1.43, .97]], [1, [.5, 2.36, .02], [.62, 1.72, .32], [.38, 1.47, .86], [.32, 1.43, .97]]];
 for (const [side, shoulder, elbow, wrist, hand] of arms) {
  add(tube([shoulder, elbow, wrist], .17, { r2: .125, seg: 12, radial: 10 }), c.shirt);
  mitten(add, .12, c.skin, ...hand, side, .7);
 }
 const head = new THREE.Group(); head.position.set(0, 3.17, .14); head.rotation.x = .23; traveler.add(head);
 cuteHead((geo, m, x = 0, y = 0, z = 0) => mesh(head, geo, m, x, y, z), .5, c, hairStyle, .7);
 bake(head); bake(traveler);
 return head;
}
