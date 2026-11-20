import * as THREE from 'three';
import { tube, lathe, cuteHead, sneaker, mitten, bake } from './toy-kit.js';

// Seated clay-toy traveler. `pose` is 'phone' (holding the phone up) or 'lap' (hands resting).
// Returns the head group so the caller can animate where the person looks.
export function buildTraveler(traveler, { mesh }, c, { pose = 'phone', hairStyle = 0, shoe } = {}) {
 const add = (geo, m, x = 0, y = 0, z = 0) => mesh(traveler, geo, m, x, y, z);
 // Sweater torso: lathe silhouette with shoulders, flattened front to back.
 const torso = add(lathe([[0, 0], [.47, 0], [.56, .08], [.6, .34], [.6, .74], [.57, 1.0], [.48, 1.17], [.3, 1.29], [.16, 1.33], [0, 1.33]], 24), c.shirt, 0, 1.24, -.08);
 torso.scale.set(1, 1, .68); torso.rotation.x = .1;
 add(new THREE.TorusGeometry(.18, .055, 8, 20), c.shirt, 0, 2.55, .02).rotation.x = Math.PI / 2 - .1;
 add(new THREE.CylinderGeometry(.13, .15, .3, 14, 1, true), c.skin, 0, 2.66, .04);
 // Bent legs as smooth tapered tubes (thigh -> rounded knee -> shin).
 for (const x of [-.3, .3]) {
  add(tube([[x, 1.36, -.05], [x * 1.06, 1.27, .85], [x * 1.08, 1.06, 1.32], [x * 1.08, .66, 1.52], [x * 1.08, .3, 1.62]], .24, { r2: .17, seg: 14, radial: 12 }), c.trousers);
  sneaker(add, .37, shoe?.upper ?? c.white, shoe?.sole ?? c.sole, x * 1.08, -.11, 1.72, .7);
 }
 // Sleeves end in a cuff and a mitten hand.
 const arms = pose === 'phone'
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
