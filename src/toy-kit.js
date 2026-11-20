// Shared soft "clay toy" building blocks for the hero and feature scenes.
// Everything is procedural: no downloaded assets.
import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

// Rounded, slightly pillowy box: a sphere pushed toward a box (superellipsoid).
// Lower exponents give flatter faces; e=1 is an ellipsoid.
export function softBox(w, h, d, ex = .3, ey = ex, ez = ex, seg = 24) {
 let g = new THREE.SphereGeometry(1, seg, Math.round(seg * .75));
 g.deleteAttribute('uv'); g.deleteAttribute('normal');
 g = mergeVertices(g);
 const p = g.attributes.position, s = (v, e) => Math.sign(v) * Math.pow(Math.abs(v), e);
 for (let i = 0; i < p.count; i++) p.setXYZ(i, s(p.getX(i), ex) * w / 2, s(p.getY(i), ey) * h / 2, s(p.getZ(i), ez) * d / 2);
 g.computeVertexNormals();
 return g;
}

// Smooth tube along points, with rounded caps at both ends.
export function tube(points, r, { r2 = r, seg = 16, radial = 12, caps = true } = {}) {
 const curve = new THREE.CatmullRomCurve3(points.map(v => new THREE.Vector3(...v)), false, 'centripetal');
 const g = new THREE.TubeGeometry(curve, seg, 1, radial, false);
 // Taper radius linearly from r to r2 along the tube.
 const pos = g.attributes.position, nor = g.attributes.normal, ring = radial + 1;
 for (let i = 0; i <= seg; i++) {
  const t = i / seg, c = curve.getPointAt(t), rr = THREE.MathUtils.lerp(r, r2, t);
  for (let j = 0; j < ring; j++) {
   const k = i * ring + j;
   pos.setXYZ(k, c.x + nor.getX(k) * rr, c.y + nor.getY(k) * rr, c.z + nor.getZ(k) * rr);
  }
 }
 if (!caps) return g;
 const a = new THREE.SphereGeometry(r, radial, 8), b = new THREE.SphereGeometry(r2, radial, 8);
 const s = curve.getPointAt(0), e = curve.getPointAt(1);
 a.translate(s.x, s.y, s.z); b.translate(e.x, e.y, e.z);
 return mergeGeometries([g, a, b].map(clean));
}

export function lathe(points, seg = 32) {
 return new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), seg);
}

function clean(g) {
 g = g.index ? g.toNonIndexed() : g.clone();
 for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal') g.deleteAttribute(k);
 g.morphAttributes = {};
 return g;
}

// Bake a group's static meshes into one mesh per material to keep draw calls low.
// Meshes listed in `keep` (and nested groups) stay as they are.
export function bake(group, keep = []) {
 group.updateMatrixWorld(true);
 const inv = group.matrixWorld.clone().invert(), buckets = new Map(), victims = [];
 for (const child of group.children) {
  if (!child.isMesh || keep.includes(child) || child.userData.keep) continue;
  const m = child.matrixWorld.clone().premultiply(inv);
  const g = clean(child.geometry).applyMatrix4(m);
  const key = child.material;
  if (!buckets.has(key)) buckets.set(key, { geos: [], cast: false, receive: false });
  const b = buckets.get(key); b.geos.push(g); b.cast ||= child.castShadow; b.receive ||= child.receiveShadow;
  victims.push(child);
 }
 for (const v of victims) { group.remove(v); v.geometry.dispose(); }
 for (const [material, b] of buckets) {
  const merged = new THREE.Mesh(mergeVertices(mergeGeometries(b.geos), 1e-5), material);
  b.geos.forEach(g => g.dispose());
  merged.castShadow = b.cast; merged.receiveShadow = b.receive;
  group.add(merged);
 }
 return group;
}

// Soft radial blob texture used as a cheap contact shadow / ambient occlusion.
export function blobTexture() {
 const c = document.createElement('canvas'); c.width = c.height = 128;
 const ctx = c.getContext('2d'), g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
 g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.45, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
 ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
 const t = new THREE.CanvasTexture(c); return t;
}
export function contactShadow(parent, texture, w, d, { x = 0, y = .01, z = 0, opacity = .22, color = '#27426b', rot = 0 } = {}) {
 const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: texture, color, transparent: true, opacity, depthWrite: false, toneMapped: false }));
 m.rotation.set(-Math.PI / 2, 0, rot); m.position.set(x, y, z); m.renderOrder = -1; m.userData.keep = true;
 parent.add(m); return m;
}

// Cute head: face, ears, eyes, cheeks, smile, nose and a hair style.
// Built in a group with the face center at the origin, facing +z.
export function cuteHead(add, r, { skin, hair, eye, blush, mouth }, style = 0, q = 1) {
 const n = v => Math.max(6, Math.round(v * q));
 add(new THREE.SphereGeometry(r, n(32), n(24)), skin).scale.set(1, 1.04, .96);
 for (const s of [-1, 1]) {
  add(new THREE.SphereGeometry(r * .2, n(14), n(10)), skin, s * r * .97, -r * .04, -r * .02).scale.set(.55, 1, .8);
  add(new THREE.SphereGeometry(r * .085, n(14), n(10)), eye, s * r * .33, r * .02, r * .9).scale.set(.85, 1.15, .5);
  add(new THREE.SphereGeometry(r * .13, n(14), n(10)), blush, s * r * .55, -r * .2, r * .77).scale.set(1, .6, .35);
 }
 add(new THREE.SphereGeometry(r * .075, n(12), n(8)), skin, 0, -r * .1, r * .97);
 const smile = add(new THREE.TorusGeometry(r * .12, r * .022, 6, n(16), Math.PI), mouth, 0, -r * .26, r * .9);
 smile.rotation.set(-.25, 0, Math.PI);
 // Hair: back/top cap plus soft fringe locks, varying by style.
 const cap = add(new THREE.SphereGeometry(r * 1.07, n(32), n(20), 0, Math.PI * 2, 0, Math.PI * .58), hair, 0, r * .04, -r * .05);
 cap.rotation.x = -.42;
 cap.scale.set(1, 1.02, 1);
 // Fringe locks sit on the hairline so they read as bangs, not a helmet.
 const locks = style % 2 === 0
  ? [[-.5, .42, .36, -.6], [-.08, .5, .42, .25], [.42, .44, .36, .7]]
  : [[-.55, .4, .34, -.3], [-.15, .5, .44, .2], [.35, .47, .38, .35]];
 const dir = new THREE.Vector3();
 for (const [x, y, s, rz] of locks) {
  dir.set(x, y, .85).normalize().multiplyScalar(r * .98);
  const l = add(new THREE.SphereGeometry(r * s, n(18), n(12)), hair, dir.x, dir.y, dir.z);
  l.scale.set(1.15, .62, .55); l.rotation.set(-.5, 0, rz);
 }
 if (style === 1) { // bun
  add(new THREE.SphereGeometry(r * .36, n(18), n(12)), hair, 0, r * .95, -r * .45);
 } else if (style === 2) { // longer hair down the back
  const back = add(new THREE.SphereGeometry(r * .95, n(24), n(16)), hair, 0, -r * .35, -r * .3);
  back.scale.set(1.05, 1.0, .75);
 } else if (style === 3) { // side part puff
  add(new THREE.SphereGeometry(r * .5, n(18), n(12)), hair, -r * .55, r * .7, r * .2).scale.set(1, .7, 1);
 }
}

// Sneaker: rounded upper with a white sole, toe pointing +z.
export function sneaker(add, s, upper, sole, x = 0, y = 0, z = 0, q = 1) {
 add(softBox(s * 1.05, s * .32, s * 2.1, .25, .5, .35, Math.round(20 * q)), sole, x, y + s * .16, z + s * .1);
 const u = add(new THREE.SphereGeometry(s * .55, Math.round(20 * q), Math.round(14 * q)), upper, x, y + s * .48, z + s * .05);
 u.scale.set(.95, .75, 1.75);
 add(new THREE.SphereGeometry(s * .32, Math.round(14 * q), Math.round(10 * q)), upper, x, y + s * .78, z - s * .45).scale.set(1.2, 1, 1);
}

// Mitten hand with a thumb; palm faces -x by default (side = +1 for right hand).
export function mitten(add, s, skin, x, y, z, side = 1, q = 1) {
 add(new THREE.SphereGeometry(s, Math.round(16 * q), Math.round(12 * q)), skin, x, y, z).scale.set(.75, 1, .95);
 add(new THREE.SphereGeometry(s * .45, Math.round(12 * q), Math.round(8 * q)), skin, x - side * s * .35, y + s * .35, z + s * .55);
}

// Toy car from an extruded side profile, centered, length along z, front +z.
export function toyCar(paint, glass, tyre, rim, light, tail, scale = 1) {
 const g = new THREE.Group();
 const add = (geo, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; g.add(o); return o; };
 const L = 2.2 * scale, W = 1.12 * scale;
 // Side profile in (z, y): low nose, rounded roof, short tail.
 const body = new THREE.Shape();
 const P = (z, y) => [z * L / 2, y * scale];
 body.moveTo(...P(-1, .3));
 body.lineTo(...P(-1, .55));
 body.quadraticCurveTo(...P(-1, .66), ...P(-.86, .68));
 body.lineTo(...P(.62, .66));
 body.quadraticCurveTo(...P(.98, .62), ...P(1, .48));
 body.lineTo(...P(1, .3));
 body.quadraticCurveTo(...P(1, .2), ...P(.9, .2));
 body.lineTo(...P(-.9, .2));
 body.quadraticCurveTo(...P(-1, .2), ...P(-1, .3));
 const bevel = .09 * scale;
 const bg = new THREE.ExtrudeGeometry(body, { depth: W - bevel * 2, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 7, steps: 1 });
 bg.translate(0, 0, -(W - bevel * 2) / 2); bg.rotateY(-Math.PI / 2);
 add(bg, paint);
 // Greenhouse: glass band, then a painted roof cap on top.
 const cabin = new THREE.Shape();
 const C = (z, y) => [z * L / 2, y * scale];
 cabin.moveTo(...C(-.72, .62));
 cabin.quadraticCurveTo(...C(-.68, .98), ...C(-.38, .99));
 cabin.lineTo(...C(.12, .99));
 cabin.quadraticCurveTo(...C(.4, .98), ...C(.58, .62));
 cabin.lineTo(...C(-.72, .62));
 const cw = W * .78, cb = .07 * scale;
 const cg = new THREE.ExtrudeGeometry(cabin, { depth: cw - cb * 2, bevelEnabled: true, bevelThickness: cb, bevelSize: cb, bevelSegments: 2, curveSegments: 7, steps: 1 });
 cg.translate(0, 0, -(cw - cb * 2) / 2); cg.rotateY(-Math.PI / 2);
 add(cg, glass);
 add(softBox(cw * 1.02, .1 * scale, L * .42, .25, .5, .3, 14), paint, 0, 1.05 * scale, -.13 * L / 2);
 // Pillar between front and rear side windows.
 for (const s of [-1, 1]) add(softBox(.05 * scale, .34 * scale, .1 * scale, .5, .5, .5, 8), paint, s * cw / 2 + s * .01, .82 * scale, -.18 * L / 2);
 // Wheels: tyre torus + rim disc, set into the body.
 for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
  const t = add(new THREE.TorusGeometry(.15 * scale, .085 * scale, 8, 16), tyre, sx * (W / 2 - .06 * scale), .23 * scale, sz * L * .31);
  t.rotation.y = Math.PI / 2;
  const r = add(new THREE.CylinderGeometry(.11 * scale, .11 * scale, .1 * scale, 14), rim, sx * (W / 2 - .04 * scale), .23 * scale, sz * L * .31);
  r.rotation.z = Math.PI / 2;
 }
 // Lamps.
 for (const s of [-1, 1]) {
  add(softBox(.24 * scale, .09 * scale, .06 * scale, .4, .4, .4, 8), light, s * W * .32, .52 * scale, L / 2 + .02 * scale);
  add(softBox(.22 * scale, .08 * scale, .06 * scale, .4, .4, .4, 8), tail, s * W * .32, .54 * scale, -L / 2 - .02 * scale);
 }
 return bake(g);
}
