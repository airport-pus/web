import { withBasePath } from '../site-path';
import { buildPackingCase } from './packing-case';
import * as THREE from 'three';
import { buildTraveler } from './traveler';
import { addMesh, createMaterial, roundedShape } from './scene-primitives';
import { softBox, lathe, tube, bake, blobTexture, contactShadow } from './toy-kit';

type SharedMaterials = Record<'blue' | 'navy' | 'silver' | 'dark', THREE.Material>;
type CreatePhone = (parent: THREE.Object3D, screenAsset: string) => THREE.Group;

function fabric(color: THREE.ColorRepresentation) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82 });
}

function createHomeMaterials(shared: SharedMaterials) {
  const upholstery = fabric('#c4d7ee'),
    cushion = fabric('#dce8f6'),
    shirt = fabric('#3182f6'),
    trousers = fabric('#2c4a77'),
    skin = createMaterial('#f1d2bd', 0, 0.62),
    hair = createMaterial('#2b3149', 0, 0.55);
  const oak = createMaterial('#d9bf9b', 0, 0.55),
    soft = createMaterial('#ffffff', 0, 0.42),
    sole = createMaterial('#a9bfdb', 0, 0.6);
  const face = {
    skin,
    hair,
    eye: createMaterial('#1d2433', 0, 0.25),
    blush: createMaterial('#f3aaa0', 0, 0.7),
    mouth: createMaterial('#b9655c', 0, 0.5),
    white: soft,
    sole,
  };
  return { ...shared, upholstery, cushion, shirt, trousers, oak, soft, face };
}
type HomeMaterials = ReturnType<typeof createHomeMaterials>;

function addRoom(home: THREE.Group, { soft, silver }: HomeMaterials) {
  // 별도의 받침대 없이 바닥이 화면 끝까지 이어진다.
  const homeFloor = addMesh(
    home,
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshBasicMaterial({ color: '#5386b9', toneMapped: false }),
    0,
    -0.12,
    0,
  );
  homeFloor.rotation.x = -Math.PI / 2;
  homeFloor.castShadow = false;
  const floorShadow = addMesh(
    home,
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ opacity: 0.17, color: '#3b5f94' }),
    0,
    -0.115,
    0,
  );
  floorShadow.rotation.x = -Math.PI / 2;
  floorShadow.castShadow = false;
  const homeWall = addMesh(
    home,
    new THREE.PlaneGeometry(200, 100),
    new THREE.MeshBasicMaterial({ color: '#5386b9', toneMapped: false }),
    0,
    45,
    -4.7,
  );
  homeWall.castShadow = false;
  // 창틀과 창가의 주름진 커튼
  const room = new THREE.Group();
  home.add(room);
  const frame = new THREE.Shape(roundedShape(3.8, 3.7, 0.22).getPoints(12));
  frame.holes.push(new THREE.Path(roundedShape(3.3, 3.2, 0.12).getPoints(12).reverse()));
  addMesh(
    room,
    new THREE.ExtrudeGeometry(frame, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
      curveSegments: 8,
    }),
    soft,
    2.8,
    3.1,
    -4.62,
  );
  const sky = document.createElement('canvas');
  sky.width = 8;
  sky.height = 128;
  {
    const ctx = sky.getContext('2d')!,
      grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, '#8fc0f2');
    grad.addColorStop(1, '#e3f1ff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 8, 128);
  }
  const skyTexture = new THREE.CanvasTexture(sky);
  skyTexture.colorSpace = THREE.SRGBColorSpace;
  const pane = addMesh(
    home,
    new THREE.PlaneGeometry(3.32, 3.22),
    new THREE.MeshBasicMaterial({ map: skyTexture, toneMapped: false }),
    2.8,
    3.1,
    -4.6,
  );
  pane.castShadow = false;
  addMesh(room, softBox(0.09, 3.25, 0.1, 0.5, 0.2, 0.5, 16), soft, 2.8, 3.1, -4.52);
  addMesh(room, softBox(3.35, 0.09, 0.1, 0.2, 0.5, 0.5, 16), soft, 2.8, 3.1, -4.52);
  addMesh(room, softBox(4.3, 0.14, 0.5, 0.12, 0.5, 0.25), soft, 2.8, 1.2, -4.35);
  const wave = new THREE.Shape(),
    wavePts = [];
  for (let i = 0; i <= 30; i++) {
    const t = i / 30;
    wavePts.push([t * 0.78 - 0.39, Math.sin(t * Math.PI * 6) * 0.07]);
  }
  wavePts.forEach(([x, y], i) => (i ? wave.lineTo(x, y) : wave.moveTo(x, y)));
  for (let i = 30; i >= 0; i--) wave.lineTo(wavePts[i][0], wavePts[i][1] - 0.05);
  const curtainGeo = new THREE.ExtrudeGeometry(wave, {
    depth: 4.65,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 4,
  });
  curtainGeo.rotateX(-Math.PI / 2);
  const curtain = fabric('#ffffff');
  for (const x of [0.7, 4.9]) addMesh(room, curtainGeo, curtain, x, 0.48, -4.15);
  const rod = addMesh(room, new THREE.CylinderGeometry(0.035, 0.035, 5.2, 12), silver, 2.8, 5.25, -4.15);
  rod.rotation.z = Math.PI / 2;
  for (const x of [0.2, 5.4]) addMesh(room, new THREE.SphereGeometry(0.08, 14, 10), silver, x, 5.25, -4.15);
  bake(room);
}

function addRug(home: THREE.Group) {
  // 테두리를 두른 러그
  const rug = new THREE.Group();
  home.add(rug);
  rug.position.set(0, -0.12, 1);
  rug.scale.z = 0.73;
  addMesh(
    rug,
    lathe(
      [
        [0, 0],
        [4.45, 0],
        [4.52, 0.03],
        [4.46, 0.06],
        [0, 0.065],
      ],
      96,
    ),
    fabric('#e1ebf8'),
  );
  const ring = addMesh(rug, new THREE.TorusGeometry(3.95, 0.07, 4, 96), fabric('#c3d7f0'), 0, 0.06, 0);
  ring.rotation.x = Math.PI / 2;
  ring.scale.z = 0.25;
  bake(rug);
}

function addSofa(home: THREE.Group, { upholstery, cushion, oak }: HomeMaterials, blob: THREE.Texture) {
  // 소파의 좌방석, 등받이, 팔걸이와 나무 다리
  const sofa = new THREE.Group();
  home.add(sofa);
  addMesh(sofa, softBox(6.1, 0.6, 2.6, 0.18, 0.35, 0.2), upholstery, -1, 0.52, -0.62);
  addMesh(sofa, softBox(6.1, 1.75, 0.6, 0.18, 0.25, 0.4), upholstery, -1, 1.5, -1.72);
  for (const x of [-2.45, 0.45]) {
    addMesh(sofa, softBox(2.78, 0.44, 2.2, 0.16, 0.55, 0.16), cushion, x, 1.0, -0.38);
    addMesh(sofa, softBox(2.72, 1.18, 0.58, 0.2, 0.32, 0.6), cushion, x, 1.78, -1.28).rotation.x = -0.12;
  }
  for (const x of [-3.86, 1.86])
    addMesh(sofa, softBox(0.66, 1.22, 2.68, 0.55, 0.3, 0.22), upholstery, x, 1.08, -0.6);
  for (const x of [-3.65, 1.65])
    for (const z of [-1.75, 0.48])
      addMesh(sofa, new THREE.CylinderGeometry(0.075, 0.05, 0.36, 14), oak, x, 0.06, z);
  const pillow = addMesh(
    sofa,
    softBox(1.0, 0.95, 0.34, 0.35, 0.35, 0.7),
    fabric('#9dc4fa'),
    -3.15,
    1.68,
    -0.95,
  );
  pillow.rotation.set(-0.15, 0.25, 0.22);
  bake(sofa);
  contactShadow(home, blob, 8.4, 4.4, { x: -1, y: -0.1, z: -0.55, opacity: 0.3 });
}

function addTravelers(
  home: THREE.Group,
  { face, shirt, trousers, navy, soft }: HomeMaterials,
  blob: THREE.Texture,
  phone: CreatePhone,
) {
  // 두 여행객이 한 휴대폰을 함께 바라본다.
  const traveler = new THREE.Group();
  home.add(traveler);
  traveler.position.set(-1.8, 0, 0);
  const holder = buildTraveler(
    traveler,
    { mesh: addMesh },
    { ...face, shirt, trousers },
    { pose: 'phone', hairStyle: 0 },
  );
  const homePhone = phone(home, withBasePath('/assets/sandeul-home-screen.svg'));
  homePhone.scale.setScalar(0.17);
  homePhone.position.set(-1.73, 2.13, 1.46);
  homePhone.rotation.set(0.45, Math.PI + 0.08, 0);
  const phoneBack = addMesh(
    homePhone,
    new THREE.ShapeGeometry(roundedShape(3.03, 6.22, 0.38)),
    createMaterial('#b9d4f5', 0.35, 0.4),
    0,
    0,
    -0.14,
  );
  phoneBack.rotation.y = Math.PI;
  for (const y of [2.3, 1.85]) {
    const lens = addMesh(homePhone, new THREE.CylinderGeometry(0.16, 0.16, 0.06, 32), navy, 0.95, y, -0.19);
    lens.rotation.x = Math.PI / 2;
  }
  const companion = new THREE.Group();
  home.add(companion);
  companion.position.set(-0.15, 0, 0.12);
  companion.rotation.y = -0.28;
  const partner = buildTraveler(
    companion,
    { mesh: addMesh },
    {
      ...face,
      shirt: fabric('#a7c9f5'),
      trousers: fabric('#f4f1ea'),
      hair: createMaterial('#5b3f33', 0, 0.55),
    },
    { pose: 'lap', hairStyle: 2, shoe: { upper: createMaterial('#2c4a77', 0, 0.6), sole: soft } },
  );
  const companionHead = partner.head;
  companionHead.position.x = -0.2;
  companionHead.rotation.set(0.32, -0.4, 0.2);
  contactShadow(home, blob, 1.3, 1.1, { x: -2.15, y: -0.1, z: 1.85, opacity: 0.25 });
  contactShadow(home, blob, 1.3, 1.1, { x: -0.4, y: -0.1, z: 1.95, opacity: 0.25 });
  // 같은 팔 그룹에 휴대폰을 연결해 손에서 떨어지지 않게 한다.
  home.updateMatrixWorld(true);
  holder.gesture.attach(homePhone);
  const ease = (t: number) => { const v = THREE.MathUtils.clamp(t, 0, 1); return v * v * (3 - 2 * v); };
  const animate = (seconds: number, scroll: number) => {
    const t = seconds % 12;
    const show = ease((t - 1) / 2.2) * (1 - ease((t - 8) / 2.5));
    const follow = ease((t - 2) / 2) * (1 - ease((t - 8.5) / 2.5));
    const nod = t > 4 && t < 6 ? Math.sin((t - 4) * Math.PI / 2) ** 2 : 0;
    const breath = Math.sin(seconds * Math.PI / 2) * .006;
    holder.gesture.rotation.set(-.075 * show, .11 * show, 0);
    holder.head.rotation.set(.23 + scroll * .06 - .035 * show, .09 * show, 0);
    holder.head.position.y = 3.17 + breath;
    holder.torso.scale.y = 1 + breath;
    partner.head.rotation.set(.32 + .09 * nod, -.4 - .12 * follow, .2 - .035 * follow);
    partner.head.position.y = 3.17 - breath;
    partner.torso.scale.y = 1 - breath;
  };
  return { travelerHead: holder.head, animate };
}

function addTable(home: THREE.Group, { soft, oak, blue }: HomeMaterials, blob: THREE.Texture) {
  // 커피와 여행 안내책을 올린 테이블
  const table = new THREE.Group();
  home.add(table);
  table.position.set(1.35, 0, 3.4);
  addMesh(
    table,
    lathe(
      [
        [0, 0],
        [1.16, 0],
        [1.22, 0.04],
        [1.23, 0.1],
        [1.18, 0.15],
        [0, 0.16],
      ],
      64,
    ),
    soft,
    0,
    0.92,
    0,
  );
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.4,
      c = Math.cos(a),
      s = Math.sin(a);
    addMesh(
      table,
      tube(
        [
          [c * 0.55, 0.94, s * 0.55],
          [c * 0.8, -0.12, s * 0.8],
        ],
        0.06,
        { r2: 0.04, seg: 4, radial: 10 },
      ),
      oak,
    );
  }
  addMesh(
    table,
    lathe(
      [
        [0, 0],
        [0.15, 0],
        [0.19, 0.03],
        [0.2, 0.33],
        [0.17, 0.33],
        [0.16, 0.06],
        [0, 0.06],
      ],
      32,
    ),
    soft,
    -0.05,
    1.08,
    -0.05,
  );
  addMesh(
    table,
    new THREE.CircleGeometry(0.165, 24),
    createMaterial('#7a5640', 0, 0.3),
    -0.05,
    1.36,
    -0.05,
  ).rotation.x = -Math.PI / 2;
  addMesh(
    table,
    new THREE.TorusGeometry(0.09, 0.026, 8, 16, Math.PI * 1.2),
    soft,
    0.16,
    1.24,
    -0.05,
  ).rotation.z = -Math.PI * 0.6;
  addMesh(table, softBox(0.66, 0.05, 0.86, 0.2, 0.5, 0.2, 16), soft, -0.62, 1.1, 0.42).rotation.y = 0.3;
  addMesh(table, softBox(0.72, 0.035, 0.92, 0.2, 0.5, 0.2, 16), blue, -0.62, 1.14, 0.42).rotation.y = 0.3;
  bake(table);
  contactShadow(home, blob, 2.9, 2.9, { x: 1.35, y: -0.1, z: 3.4, opacity: 0.18 });
}

function addLamp(home: THREE.Group, { soft, silver }: HomeMaterials, blob: THREE.Texture) {
  // 은은하게 빛나는 스탠드 조명
  const lamp = new THREE.Group();
  home.add(lamp);
  lamp.position.set(-4.6, 0, -2.5);
  addMesh(
    lamp,
    lathe(
      [
        [0, 0],
        [0.42, 0],
        [0.46, 0.03],
        [0.42, 0.08],
        [0.12, 0.12],
        [0, 0.13],
      ],
      40,
    ),
    soft,
    0,
    -0.12,
    0,
  );
  addMesh(lamp, new THREE.CylinderGeometry(0.035, 0.035, 3.6, 12), silver, 0, 1.75, 0);
  addMesh(
    lamp,
    new THREE.CylinderGeometry(0.48, 0.82, 0.8, 48, 1, true),
    new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.7,
      emissive: '#fff0d6',
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
    }),
    0,
    3.9,
    0,
  );
  addMesh(
    lamp,
    new THREE.SphereGeometry(0.16, 16, 12),
    new THREE.MeshBasicMaterial({ color: '#fff6e6', toneMapped: false }),
    0,
    3.7,
    0,
  );
  bake(lamp);
  contactShadow(home, blob, 1.3, 1.3, { x: -4.6, y: -0.1, z: -2.5, opacity: 0.22 });
}

export function buildHomeScene(shared: SharedMaterials, phone: CreatePhone) {
  const room = new THREE.Group();
  const materials = createHomeMaterials(shared);
  const shadowTexture = blobTexture();
  addRoom(room, materials);
  addRug(room);
  addSofa(room, materials, shadowTexture);
  const { travelerHead, animate } = addTravelers(room, materials, shadowTexture, phone);
  const packingCase = buildPackingCase(room);
  addTable(room, materials, shadowTexture);
  addLamp(room, materials, shadowTexture);
  return { room, travelerHead, animate, updatePacking: packingCase.update };
}
