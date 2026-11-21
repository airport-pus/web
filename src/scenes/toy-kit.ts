// 첫 화면과 기능 카드에서 공유하는 점토 인형풍 3D 모델 도구.
// 모든 형태는 코드에서 생성한다.
import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

// 구를 초타원체로 변형해 모서리가 둥근 상자를 만든다.
// 지수가 작을수록 면이 평평해지고, 1이면 타원체가 된다.
export type AddMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, x?: number, y?: number, z?: number) => THREE.Mesh;
export type FaceMaterials = Record<"skin" | "hair" | "eye" | "blush" | "mouth", THREE.Material>;

export function softBox(w: number, h: number, d: number, ex = .3, ey = ex, ez = ex, seg = 24) {
 let g: THREE.BufferGeometry = new THREE.SphereGeometry(1, seg, Math.round(seg * .75));
 g.deleteAttribute('uv'); g.deleteAttribute('normal');
 g = mergeVertices(g);
 const p = g.attributes.position, s = (v: number, e: number) => Math.sign(v) * Math.pow(Math.abs(v), e);
 for (let i = 0; i < p.count; i++) p.setXYZ(i, s(p.getX(i), ex) * w / 2, s(p.getY(i), ey) * h / 2, s(p.getZ(i), ez) * d / 2);
 g.computeVertexNormals();
 return g;
}

// 점들을 따라 이어지는 관을 만들고 양 끝을 둥글게 마감한다.
export function tube(points: [number, number, number][], r: number, { r2 = r, seg = 16, radial = 12, caps = true } = {}) {
 const curve = new THREE.CatmullRomCurve3(points.map(v => new THREE.Vector3(...v)), false, 'centripetal');
 const g = new THREE.TubeGeometry(curve, seg, 1, radial, false);
 // 관을 따라 반지름을 r에서 r2까지 선형으로 바꾼다.
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

export function lathe(points: [number, number][], seg = 32) {
 return new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), seg);
}

function clean(g: THREE.BufferGeometry) {
 g = g.index ? g.toNonIndexed() : g.clone();
 for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal') g.deleteAttribute(k);
 g.morphAttributes = {};
 return g;
}

// 고정 메시를 재질별로 합쳐 그리기 호출을 줄인다.
// keep에 지정한 메시와 하위 그룹은 개별 객체로 유지한다.
export function bake(group: THREE.Group, keep: THREE.Object3D[] = []) {
 group.updateMatrixWorld(true);
 const inv = group.matrixWorld.clone().invert(), buckets = new Map<THREE.Material | THREE.Material[], {geos: THREE.BufferGeometry[]; cast: boolean; receive: boolean}>(), victims = [];
 for (const child of group.children) {
  if (!(child instanceof THREE.Mesh) || keep.includes(child) || child.userData.keep) continue;
  const m = child.matrixWorld.clone().premultiply(inv);
  const g = clean(child.geometry).applyMatrix4(m);
  const key = child.material;
  if (!buckets.has(key)) buckets.set(key, { geos: [], cast: false, receive: false });
  const b = buckets.get(key)!; b.geos.push(g); b.cast ||= child.castShadow; b.receive ||= child.receiveShadow;
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

// 방사형 텍스처로 바닥과 맞닿은 부분에 부드러운 그림자를 만든다.
export function blobTexture() {
 const c = document.createElement('canvas'); c.width = c.height = 128;
 const ctx = c.getContext('2d')!, g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
 g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.45, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
 ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
 const t = new THREE.CanvasTexture(c); return t;
}
export function contactShadow(parent: THREE.Object3D, texture: THREE.Texture, w: number, d: number, { x = 0, y = .01, z = 0, opacity = .22, color = '#27426b', rot = 0 } = {}) {
 const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: texture, color, transparent: true, opacity, depthWrite: false, toneMapped: false }));
 m.rotation.set(-Math.PI / 2, 0, rot); m.position.set(x, y, z); m.renderOrder = -1; m.userData.keep = true;
 parent.add(m); return m;
}

// 얼굴과 머리카락을 하나의 그룹으로 조합한다.
// 얼굴 중심을 원점으로 두고 +z 방향을 바라보게 한다.
export function cuteHead(add: AddMesh, r: number, { skin, hair, eye, blush, mouth }: FaceMaterials, style = 0, q = 1) {
 const n = (v: number) => Math.max(6, Math.round(v * q));
 add(new THREE.SphereGeometry(r, n(32), n(24)), skin).scale.set(1, 1.04, .96);
 for (const s of [-1, 1]) {
  add(new THREE.SphereGeometry(r * .2, n(14), n(10)), skin, s * r * .97, -r * .04, -r * .02).scale.set(.55, 1, .8);
  add(new THREE.SphereGeometry(r * .085, n(14), n(10)), eye, s * r * .33, r * .02, r * .9).scale.set(.85, 1.15, .5);
  add(new THREE.SphereGeometry(r * .13, n(14), n(10)), blush, s * r * .55, -r * .2, r * .77).scale.set(1, .6, .35);
 }
 add(new THREE.SphereGeometry(r * .075, n(12), n(8)), skin, 0, -r * .1, r * .97);
 const smile = add(new THREE.TorusGeometry(r * .12, r * .022, 6, n(16), Math.PI), mouth, 0, -r * .26, r * .9);
 smile.rotation.set(-.25, 0, Math.PI);
 // 뒤통수와 앞머리를 조합해 머리 모양을 구분한다.
 const cap = add(new THREE.SphereGeometry(r * 1.07, n(32), n(20), 0, Math.PI * 2, 0, Math.PI * .58), hair, 0, r * .04, -r * .05);
 cap.rotation.x = -.42;
 cap.scale.set(1, 1.02, 1);
 // 앞머리 가닥을 이마 경계선에 맞춘다.
 const locks = style % 2 === 0
  ? [[-.5, .42, .36, -.6], [-.08, .5, .42, .25], [.42, .44, .36, .7]]
  : [[-.55, .4, .34, -.3], [-.15, .5, .44, .2], [.35, .47, .38, .35]];
 const dir = new THREE.Vector3();
 for (const [x, y, s, rz] of locks) {
  dir.set(x, y, .85).normalize().multiplyScalar(r * .98);
  const l = add(new THREE.SphereGeometry(r * s, n(18), n(12)), hair, dir.x, dir.y, dir.z);
  l.scale.set(1.15, .62, .55); l.rotation.set(-.5, 0, rz);
 }
 if (style === 1) { // 올림머리
  add(new THREE.SphereGeometry(r * .36, n(18), n(12)), hair, 0, r * .95, -r * .45);
 } else if (style === 2) { // 등 뒤로 내려오는 긴 머리
  const back = add(new THREE.SphereGeometry(r * .95, n(24), n(16)), hair, 0, -r * .35, -r * .3);
  back.scale.set(1.05, 1.0, .75);
 } else if (style === 3) { // 옆으로 가르마를 탄 머리
  add(new THREE.SphereGeometry(r * .5, n(18), n(12)), hair, -r * .55, r * .7, r * .2).scale.set(1, .7, 1);
 }
}

// 운동화의 앞코는 +z 방향이다.
export function sneaker(add: AddMesh, s: number, upper: THREE.Material, sole: THREE.Material, x = 0, y = 0, z = 0, q = 1) {
 add(softBox(s * 1.05, s * .32, s * 2.1, .25, .5, .35, Math.round(20 * q)), sole, x, y + s * .16, z + s * .1);
 const u = add(new THREE.SphereGeometry(s * .55, Math.round(20 * q), Math.round(14 * q)), upper, x, y + s * .48, z + s * .05);
 u.scale.set(.95, .75, 1.75);
 add(new THREE.SphereGeometry(s * .32, Math.round(14 * q), Math.round(10 * q)), upper, x, y + s * .78, z - s * .45).scale.set(1.2, 1, 1);
}

// 오른손(side = +1)의 손바닥은 기본적으로 -x 방향을 향한다.
export function mitten(add: AddMesh, s: number, skin: THREE.Material, x: number, y: number, z: number, side = 1, q = 1) {
 add(new THREE.SphereGeometry(s, Math.round(16 * q), Math.round(12 * q)), skin, x, y, z).scale.set(.75, 1, .95);
 add(new THREE.SphereGeometry(s * .45, Math.round(12 * q), Math.round(8 * q)), skin, x - side * s * .35, y + s * .35, z + s * .55);
}

// 차량의 옆면을 돌출시켜 차체를 만들며, 앞부분은 +z 방향이다.
export function toyCar(paint: THREE.Material, glass: THREE.Material, tyre: THREE.Material, rim: THREE.Material, light: THREE.Material, tail: THREE.Material, scale = 1) {
 const g = new THREE.Group();
 const add = (geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; g.add(o); return o; };
 const L = 2.2 * scale, W = 1.12 * scale;
 // (z, y) 평면에 낮은 앞부분과 둥근 지붕을 그린다.
 const body = new THREE.Shape();
 const P = (z: number, y: number): [number, number] => [z * L / 2, y * scale];
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
 // 창문 위에 도색된 지붕을 덮는다.
 const cabin = new THREE.Shape();
 const C = (z: number, y: number): [number, number] => [z * L / 2, y * scale];
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
 // 앞뒤 측면 창문 사이의 기둥
 for (const s of [-1, 1]) add(softBox(.05 * scale, .34 * scale, .1 * scale, .5, .5, .5, 8), paint, s * cw / 2 + s * .01, .82 * scale, -.18 * L / 2);
 // 차체 안쪽에 타이어와 휠을 배치한다.
 for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
  const t = add(new THREE.TorusGeometry(.15 * scale, .085 * scale, 8, 16), tyre, sx * (W / 2 - .06 * scale), .23 * scale, sz * L * .31);
  t.rotation.y = Math.PI / 2;
  const r = add(new THREE.CylinderGeometry(.11 * scale, .11 * scale, .1 * scale, 14), rim, sx * (W / 2 - .04 * scale), .23 * scale, sz * L * .31);
  r.rotation.z = Math.PI / 2;
 }
 // 전조등과 후미등
 for (const s of [-1, 1]) {
  add(softBox(.24 * scale, .09 * scale, .06 * scale, .4, .4, .4, 8), light, s * W * .32, .52 * scale, L / 2 + .02 * scale);
  add(softBox(.22 * scale, .08 * scale, .06 * scale, .4, .4, .4, 8), tail, s * W * .32, .54 * scale, -L / 2 - .02 * scale);
 }
 return bake(g);
}
