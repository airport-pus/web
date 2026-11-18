import * as THREE from 'three';

export function buildTraveler(traveler, { mesh, sphere, cylinder, box, limb }, { shirt, skin, hair, navy, trousers, white }) {
 const torso=sphere(traveler,.65,shirt,0,1.95,-.1);torso.scale.set(.88,1.2,.62);torso.rotation.x=.13;
 cylinder(traveler,.15,.18,.3,skin,0,2.65,.02);
 const head=new THREE.Group();head.position.set(0,3.13,.12);head.rotation.x=.23;traveler.add(head);
 const face=sphere(head,.43,skin);face.scale.set(.9,1.12,.91);
 const hairCap=mesh(head,new THREE.SphereGeometry(.445,32,20,0,Math.PI*2,0,Math.PI*.56),hair,0,.07,-.025);hairCap.scale.set(.94,1.12,.94);
 for(const x of [-.13,.13])sphere(head,.025,navy,x,-.035,.37);
 sphere(head,.055,skin,0,-.13,.39);
 for(const x of [-.33,.33]){
  limb(traveler,[x,1.3,.05],[x,1.15,1.25],.24,trousers);
  limb(traveler,[x,1.15,1.25],[x,.28,1.65],.19,trousers);
  box(traveler,.45,.24,.8,white,x,.13,1.86,.1);
 }
 limb(traveler,[-.47,2.35,0],[-.65,1.85,.65],.16,shirt);
 limb(traveler,[-.65,1.85,.65],[-.25,2.07,1.38],.12,skin);
 limb(traveler,[.47,2.35,0],[.6,1.88,.7],.16,shirt);
 limb(traveler,[.6,1.88,.7],[.3,2.15,1.45],.12,skin);
 sphere(traveler,.14,skin,-.26,2.08,1.42);sphere(traveler,.13,skin,.3,2.15,1.5);
 return head;
}
