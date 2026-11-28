import { buildAirliner } from './airliner';
import { buildTerminalFilm } from './terminal-film';
import { createMaterial as mat, addMesh as mesh, roundedShape } from './scene-primitives';
import { disposeScene } from './dispose-scene';
type CanvasLine = {
  text: string;
  x?: number;
  y: number;
  color?: string;
  size?: number;
  weight?: number;
  align?: CanvasTextAlign;
};
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function isSoftwareGL(renderer: THREE.WebGLRenderer) {
  try {
    const gl = renderer.getContext(),
      ext = gl.getExtension('WEBGL_debug_renderer_info');
    return /swiftshader|llvmpipe|software/i.test(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '');
  } catch {
    return false;
  }
}
export function createExperience(container: HTMLElement) {
  let disposed = false;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  const small = innerWidth < 800;
  renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio, 1.5), 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  // 소프트웨어 렌더러에서는 픽셀 처리 비용을 줄이기 위해 해상도 배율을 1로 제한한다.
  if (isSoftwareGL(renderer)) renderer.setPixelRatio(1);
  const scene = new THREE.Scene();
  const background = new THREE.Color('#ffffff');
  scene.background = background;
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 160);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = new RoomEnvironment();
  const environmentTarget = pmrem.fromScene(environment, 0.04);
  scene.environment = environmentTarget.texture;
  scene.environmentIntensity = 0.6;
  environment.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xf4f8ff, 0x8ea3c0, 0.8));
  const sun = new THREE.DirectionalLight(0xfff8ee, 2.9);
  sun.position.set(8, 18, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.setScalar(small ? 1024 : 2048);
  sun.shadow.radius = small ? 3 : 5;
  sun.shadow.camera.left = -21;
  sun.shadow.camera.right = 21;
  sun.shadow.camera.top = 21;
  sun.shadow.camera.bottom = -21;
  sun.shadow.bias = -0.0003;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);
  scene.add(sun.target);
  const fill = new THREE.DirectionalLight(0xa9cfff, 1.2);
  fill.position.set(-12, 8, -8);
  scene.add(fill);
  // 밝은 배경에서도 흰색 물체의 윤곽이 드러나도록 뒤에서 빛을 비춘다.
  const rim = new THREE.DirectionalLight(0xdfeeff, 1.1);
  rim.position.set(-4, 9, -14);
  scene.add(rim);
  const white = mat('#f9fbff', 0.12, 0.27),
    blue = mat('#3182f6', 0.35, 0.25),
    navy = mat('#172f53', 0.3, 0.3),
    glass = mat('#6e98c0', 0.6, 0.17),
    silver = mat('#b7c5d6', 0.65, 0.23),
    tarmac = mat('#ced8e6', 0.05, 0.8),
    dark = mat('#243b58', 0.3, 0.45);
  const groups: THREE.Group[] = [];
  function box<M extends THREE.Material>(
    parent: THREE.Object3D,
    w: number,
    h: number,
    d: number,
    material: M,
    x = 0,
    y = 0,
    z = 0,
    r = 0.04,
  ) {
    return mesh(
      parent,
      new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 4, h / 4, d / 4)),
      material,
      x,
      y,
      z,
    );
  }
  function cylinder(
    parent: THREE.Object3D,
    r1: number,
    r2: number,
    h: number,
    material: THREE.Material,
    x = 0,
    y = 0,
    z = 0,
  ) {
    return mesh(parent, new THREE.CylinderGeometry(r1, r2, h, 32), material, x, y, z);
  }
  function sphere(parent: THREE.Object3D, r: number, material: THREE.Material, x = 0, y = 0, z = 0) {
    return mesh(parent, new THREE.SphereGeometry(r, 32, 20), material, x, y, z);
  }
  function ground(g: THREE.Object3D, w = 23, d = 19) {
    box(g, w, 0.3, d, white, 1, -0.2, 0, 0.14);
  }
  function textTexture(
    lines: CanvasLine[],
    { width = 1024, height = 512, bg = '#ffffff', color = '#191f28', size = 50 } = {},
  ) {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    lines.forEach((line, i) => {
      ctx.fillStyle = line.color || color;
      ctx.font = `${line.weight || 600} ${line.size || size}px Pretendard,Arial,sans-serif`;
      ctx.textAlign = line.align || 'left';
      ctx.fillText(line.text, line.x ?? 50, line.y ?? 85 + i * 75);
    });
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return texture;
  }
  function label(
    g: THREE.Object3D,
    lines: CanvasLine[],
    w: number,
    h: number,
    x: number,
    y: number,
    z: number,
    options = {},
  ) {
    const texture = textTexture(lines, options);
    return mesh(
      g,
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
      x,
      y,
      z,
    );
  }
  function group(index: number) {
    const g = new THREE.Group();
    g.position.x = 0;
    scene.add(g);
    groups.push(g);
    return g;
  }
  function wing(
    g: THREE.Object3D,
    points: [number, number][],
    depth: number,
    material: THREE.Material,
    y = 0,
  ) {
    const shape = new THREE.Shape();
    points.forEach(([x, z], i) => (i ? shape.lineTo(x, z) : shape.moveTo(x, z)));
    shape.closePath();
    const m = mesh(
      g,
      new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.03,
        bevelSegments: 2,
        steps: 1,
      }),
      material,
    );
    m.rotation.x = Math.PI / 2;
    m.position.y = y;
    return m;
  }
  function airplane() {
    return buildAirliner({ white, blue, navy, silver, dark });
  }
  function terminal(g: THREE.Object3D) {
    box(g, 11, 1.6, 3.2, glass, 1, 0.75, -6);
    for (let i = 0; i < 15; i++) box(g, 0.08, 1.9, 3.4, silver, -4.5 + i * 0.78, 0.85, -6);
    box(g, 11.5, 0.22, 3.6, white, 1, 1.72, -6);
    for (const x of [-3, 1, 5]) {
      box(g, 1.15, 0.8, 3.1, silver, x, 0.7, -3.5);
      box(g, 1.3, 0.75, 0.6, glass, x, 0.6, -2);
    }
    const tower = cylinder(g, 0.3, 0.55, 3.8, white, 7, 1.85, -6);
    const towerTop = cylinder(g, 0.9, 0.65, 0.85, glass, 7, 4.05, -6);
    cylinder(g, 1, 1, 0.12, white, 7, 4.52, -6);
  }
  const airport = group(0);
  ground(airport, 27, 23);
  box(airport, 5, 0.025, 19, tarmac, 2, 0, 2);
  for (let i = 0; i < 8; i++) box(airport, 0.13, 0.025, 0.85, white, 2, 0.022, -6 + i * 2.1);
  for (const x of [-0.25, 4.25]) box(airport, 0.055, 0.03, 19, white, x, 0.03, 2);
  terminal(airport);
  const plane = airplane();
  plane.position.set(2, 1.45, 1.1);
  plane.rotation.y = -0.33;
  airport.add(plane);
  for (let i = 0; i < 7; i++) {
    box(airport, 0.12, 0.1, 0.12, blue, -0.5, 0.05, -5 + i * 2.6);
    box(airport, 0.12, 0.1, 0.12, blue, 4.5, 0.05, -5 + i * 2.6);
  }
  // 휴대폰의 본체, 유리, 화면, 카메라와 측면 버튼
  const loader = new THREE.TextureLoader();
  function phone(g: THREE.Object3D, asset: string) {
    const device = new THREE.Group();
    g.add(device);
    mesh(
      device,
      new THREE.ExtrudeGeometry(roundedShape(3.1, 6.3, 0.4), {
        depth: 0.22,
        bevelEnabled: true,
        bevelThickness: 0.025,
        bevelSize: 0.025,
        bevelSegments: 3,
        steps: 1,
      }),
      silver,
      0,
      0,
      -0.1,
    );
    mesh(
      device,
      new THREE.ShapeGeometry(roundedShape(2.99, 6.18, 0.36)),
      new THREE.MeshBasicMaterial({ color: '#172231' }),
      0,
      0,
      0.145,
    );
    const texture = loader.load(asset, () => renderLast());
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const screen = new THREE.ShapeGeometry(roundedShape(2.81, 5.98, 0.29));
    const pos = screen.attributes.position,
      uv = screen.attributes.uv;
    for (let i = 0; i < pos.count; i++)
      uv.setXY(i, (pos.getX(i) + 1.405) / 2.81, (pos.getY(i) + 2.99) / 5.98);
    mesh(device, screen, new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), 0, 0, 0.16);
    box(device, 0.55, 0.11, 0.025, dark, 0, 2.79, 0.2, 0.05);
    sphere(device, 0.045, glass, 0.4, 2.79, 0.2);
    box(device, 0.07, 0.5, 0.14, silver, -1.58, 0.8, 0);
    box(device, 0.07, 0.7, 0.14, silver, 1.58, 0.3, 0);
    return device;
  }
  const flight = group(1);
  const flightFloor = mesh(flight, new THREE.CircleGeometry(11, 96), mat('#ffffff'), 1, -0.2, 0);
  flightFloor.rotation.x = -Math.PI / 2;
  const device = phone(flight, '/assets/sandeul-flight.svg');
  device.position.set(3, 3.3, 0);
  device.rotation.set(-0.08, -0.3, -0.12);
  const ticket = new THREE.Group();
  flight.add(ticket);
  box(ticket, 4.35, 2.45, 0.1, white, 0, 0, 0, 0.12);
  label(
    ticket,
    [
      { text: '산들', x: 70, y: 75, size: 36, color: '#3182f6' },
      { text: 'BOARDING PASS', x: 720, y: 70, size: 19 },
      { text: 'PUS', x: 70, y: 205, size: 105 },
      { text: '→', x: 450, y: 195, size: 65, color: '#3182f6' },
      { text: 'CJU', x: 690, y: 205, size: 105 },
      { text: '부산 / 김해', x: 75, y: 250, size: 25, color: '#8b95a1' },
      { text: '제주', x: 700, y: 250, size: 25, color: '#8b95a1' },
      { text: '14:20', x: 70, y: 380, size: 48 },
      { text: 'GATE 04', x: 385, y: 380, size: 42 },
      { text: '탑승 중', x: 740, y: 380, size: 38, color: '#3182f6' },
      { text: '대한항공 · KE1533', x: 70, y: 455, size: 23, color: '#8b95a1' },
    ],
    4.16,
    2.3,
    0,
    0,
    0.065,
    { height: 550 },
  );
  ticket.position.set(3, 3.15, 1.2);
  ticket.rotation.set(0, -0.2, 0.04);
  // 공항 내부와 보안검색대를 통과하는 승객
  const crowd = group(2);
  ground(crowd, 17, 14);
  box(crowd, 14, 0.25, 2.5, white, 2, 4.3, -3.8);
  for (const x of [-4, 2, 8]) box(crowd, 0.22, 4.3, 0.22, silver, x, 2.05, -3.8);
  for (let i = 0; i < 4; i++) {
    box(crowd, 2.4, 1.25, 1.3, white, -3.1 + i * 3, 0.6, -2.4, 0.15);
    box(crowd, 1.9, 0.15, 0.9, blue, -3.1 + i * 3, 1.3, -2.4);
    box(crowd, 0.6, 0.5, 0.08, navy, -3.1 + i * 3, 1.6, -2.45);
  }
  for (const x of [-1.5, 1.5, 4.5]) {
    box(crowd, 0.15, 2.6, 0.8, white, x, 1.3, 1);
    box(crowd, 0.15, 2.6, 0.8, white, x + 1.35, 1.3, 1);
    box(crowd, 1.5, 0.2, 0.8, blue, x + 0.67, 2.6, 1);
  }
  label(
    crowd,
    [
      { text: '출국장  ·  DEPARTURES', x: 100, y: 160, size: 63, color: '#fff' },
      { text: '01             02             03', x: 115, y: 290, size: 50, color: '#8fc1ff' },
    ],
    7.6,
    1.1,
    2,
    3.75,
    -2.48,
    { bg: '#223b5b', height: 400 },
  );
  const people: THREE.Group[] = [];
  for (let i = 0; i < 24; i++) {
    const person = new THREE.Group();
    const col = [blue, navy, mat('#8ba8cc'), mat('#d4bfaa')][i % 4];
    cylinder(person, 0.12, 0.17, 0.52, col, 0, 0.57, 0);
    sphere(person, 0.14, mat('#edd8c5'), 0, 0.99, 0);
    for (const x of [-0.08, 0.08]) cylinder(person, 0.045, 0.05, 0.4, dark, x, 0.2, 0);
    box(person, 0.22, 0.33, 0.17, col, 0.27, 0.2, 0.08, 0.05);
    person.position.set(-3 + (i % 6) * 1.36, 0, 3 + Math.floor(i / 6) * 1.35);
    crowd.add(person);
    people.push(person);
  }
  const crowdSign = new THREE.Group();
  crowd.add(crowdSign);
  box(crowdSign, 4.3, 1.6, 0.15, white, 0, 0, 0, 0.15);
  label(
    crowdSign,
    [
      { text: '김해공항 혼잡도', x: 55, y: 105, size: 43, color: '#6b7684' },
      { text: '여유로워요', x: 55, y: 245, size: 83, color: '#3182f6' },
    ],
    4.12,
    1.44,
    0,
    0,
    0.085,
    { height: 350 },
  );
  crowdSign.position.set(5, 3.1, 3);
  crowdSign.rotation.y = -0.2;
  // 주차장과 진입하는 차량
  function car(color = blue) {
    const g = new THREE.Group();
    box(g, 1.13, 0.42, 2.2, color, 0, 0.45, 0, 0.18);
    box(g, 0.92, 0.37, 1.1, color, 0, 0.8, -0.1, 0.16);
    box(g, 0.82, 0.25, 0.03, navy, 0, 0.82, 0.46, 0.03);
    box(g, 0.82, 0.24, 0.03, navy, 0, 0.8, -0.66, 0.03);
    for (const side of [-1, 1]) {
      box(g, 0.025, 0.25, 0.8, navy, side * 0.465, 0.82, -0.09, 0.02);
      for (const z of [-0.65, 0.65]) {
        const w = cylinder(g, 0.23, 0.23, 0.13, dark, side * 0.56, 0.28, z);
        w.rotation.z = Math.PI / 2;
        const rim = cylinder(g, 0.12, 0.12, 0.14, silver, side * 0.565, 0.28, z);
        rim.rotation.z = Math.PI / 2;
      }
      box(g, 0.26, 0.07, 0.04, white, side * 0.32, 0.53, 1.105);
      box(g, 0.26, 0.07, 0.04, mat('#fa7d78'), side * 0.32, 0.53, -1.105);
    }
    return g;
  }
  const parking = group(3);
  ground(parking, 19, 18);
  box(parking, 16, 0.035, 15, tarmac, 2, 0.015, 0);
  for (const z of [-4.5, 4.5]) {
    for (let i = 0; i < 7; i++) {
      const x = -5 + i * 2.3;
      box(parking, 0.045, 0.03, 3.2, white, x, 0.05, z);
      box(parking, 2.25, 0.03, 0.045, white, x + 1.12, 0.05, z - 1.6);
    }
  }
  for (let i = 0; i < 10; i++) {
    if (i === 3) continue;
    const c = car([white, navy, silver, blue][i % 4]);
    c.position.set(-3.8 + (i % 5) * 2.3, 0, i < 5 ? -4.5 : 4.5);
    c.rotation.y = i < 5 ? 0 : Math.PI;
    parking.add(c);
  }
  const targetSpace = box(parking, 2.17, 0.025, 3.15, mat('#c1e0ff'), 3.1, 0.07, -4.5);
  const arriving = car(blue);
  parking.add(arriving);
  for (const x of [-2, 2, 6]) box(parking, 0.18, 0.03, 0.7, white, x, 0.06, 0);
  box(parking, 0.16, 4.5, 0.16, silver, 7, 2.25, -6);
  box(parking, 2.6, 2.7, 0.25, blue, 7, 4.4, -6, 0.18);
  label(
    parking,
    [{ text: 'P', x: 210, y: 335, size: 340, color: '#fff', align: 'center' }],
    2.35,
    2.4,
    7,
    4.4,
    -5.85,
    { bg: '#3182f6', width: 420, height: 430 },
  );
  const parkingSign = new THREE.Group();
  parking.add(parkingSign);
  box(parkingSign, 4.5, 2, 0.16, white, 0, 0, 0, 0.15);
  label(
    parkingSign,
    [
      { text: 'P1 국내선 · 주차 가능', x: 65, y: 95, size: 39, color: '#8b95a1' },
      { text: '248', x: 65, y: 270, size: 155, color: '#3182f6' },
      { text: '대', x: 400, y: 270, size: 55, color: '#4e5968' },
      { text: '빈자리부터 예상 요금까지', x: 65, y: 365, size: 32, color: '#8b95a1' },
    ],
    4.3,
    1.8,
    0,
    0,
    0.09,
    { height: 420 },
  );
  parkingSign.position.set(4, 3, 3.1);
  parkingSign.rotation.y = -0.25;
  const takeoff = group(4);
  const departing = airplane();
  departing.position.set(2, 3, 0);
  takeoff.add(departing);
  for (let i = 0; i < 6; i++) {
    const cloud = new THREE.Group();
    for (let j = 0; j < 4; j++) {
      const s = sphere(cloud, 0.8 + j * 0.13, white, j * 0.8, Math.sin(j) * 0.3, 0);
      s.scale.y = 0.55;
    }
    cloud.position.set(-6 + i * 3, -1 + (i % 3), -5 + (i % 2) * 7);
    takeoff.add(cloud);
  }
  const runway = box(takeoff, 4, 0.1, 32, tarmac, 2, -3, 0);
  for (let i = 0; i < 12; i++) box(takeoff, 0.12, 0.02, 1, white, 2, -2.93, -13 + i * 2.4);
  const cameraStates = [
    { pos: [12, 9, 18], look: [-1, 1, 0] },
    { pos: [5, 4, 15], look: [7, 2.8, 0] },
    { pos: [12, 12, 22], look: [1, 3, 0] },
    { pos: [11, 13, 19], look: [6, 1, 0] },
    { pos: [12, 8, 19], look: [-1, 2, 0] },
  ];
  let width = 0,
    height = 0,
    lastP = 0,
    lastMobile = small,
    lastReduce = false;
  const smooth = (n: number) => n * n * (3 - 2 * n);
  const clamp = (n: number) => Math.max(0, Math.min(1, n));
  const v = new THREE.Vector3();
  const targetLook = new THREE.Vector3();
  function update(progress: number, mobile = false, reduced = false, showcase = false) {
    lastP = progress;
    lastMobile = mobile;
    lastReduce = reduced;
    const idx = Math.min(4, Math.floor(progress)),
      p = progress - idx;
    // 카메라 이동 중 빈 공간이 보이지 않도록 인접한 장면의 크기와 깊이 변화를 겹친다.
    const transition = idx === 4 ? 0 : smooth(clamp((p - 0.68) / 0.32));
    const next = Math.min(4, idx + 1);
    const state = cameraStates[idx],
      following = cameraStates[next];
    v.fromArray(state.pos).lerp(new THREE.Vector3(...following.pos), transition);
    targetLook.fromArray(state.look).lerp(new THREE.Vector3(...following.look), transition);
    if (mobile) {
      v.set(10, 11, 24);
      targetLook.set(2.5, 6.3, 0);
    } else {
      v.z -= Math.sin(p * Math.PI) * 0.9;
    }
    if (showcase) {
      v.set(15, 12, 22);
      targetLook.set(1.5, 1, 0);
      if (idx === 2) {
        v.set(14, 13, 23);
        targetLook.set(1.5, 1.5, 0);
      }
      if (idx === 3) {
        v.set(14, 17, 23);
        targetLook.set(2, 0, 0);
      }
      if (mobile) v.multiplyScalar(1.12);
    }
    camera.position.copy(v);
    camera.lookAt(targetLook);
    sun.position.set(8, 18, 12);
    sun.target.position.set(1, 0, 0);
    fill.position.x = -12;
    groups.forEach((g, i) => {
      const weight = i === idx ? 1 - transition : i === next ? transition : 0;
      g.visible = weight > 0.001;
      g.scale.setScalar(Math.max(0.001, weight));
      g.position.set((i === idx ? -1 : 1) * (1 - weight) * 6, -(1 - weight) * 2, -(1 - weight) * 5);
    });
    const flightP = clamp(progress - 1),
      crowdP = clamp(progress - 2),
      parkingP = clamp(progress - 3),
      takeoffP = clamp(progress - 4);
    plane.position.z = 1.1 - p * 1.5;
    plane.rotation.y = -0.33 + p * 0.14;
    device.rotation.y = -0.35 + flightP * 0.7;
    device.rotation.z = -0.12 + flightP * 0.18;
    device.position.y = 3.3 + Math.sin(flightP * Math.PI) * 0.18;
    ticket.position.set(3 - flightP * 1.3, 2.4 + flightP * 0.9, 1.2 + flightP * 1.4);
    ticket.rotation.y = -0.25 + flightP * 0.3;
    ticket.scale.setScalar(0.65 + 0.35 * smooth(clamp((flightP - 0.08) / 0.5)));
    people.forEach((person, i) => {
      const advance = smooth(clamp((crowdP - 0.13 - (i % 6) * 0.045) / 0.7));
      person.position.z = 3 + Math.floor(i / 6) * 1.35 - advance * (5.8 + (i % 3));
      person.scale.setScalar(1 - 0.25 * advance);
    });
    crowdSign.position.y = 2.5 + smooth(clamp(crowdP / 0.5)) * 0.8;
    crowdSign.rotation.y = -0.35 + crowdP * 0.22;
    const travel = smooth(clamp((parkingP - 0.08) / 0.75));
    if (travel < 0.55) {
      arriving.position.set(-5 + (travel / 0.55) * 8.1, 0, 0);
      arriving.rotation.y = Math.PI / 2;
    } else {
      const t = (travel - 0.55) / 0.45;
      arriving.position.set(3.1, 0, -t * 4.5);
      arriving.rotation.y = THREE.MathUtils.lerp(Math.PI / 2, 0, smooth(clamp(t * 2)));
    }
    parkingSign.position.y = 2.5 + smooth(clamp((parkingP - 0.25) / 0.5)) * 0.7;
    targetSpace.material.emissive.set('#3182f6');
    targetSpace.material.emissiveIntensity = 0.06 + 0.1 * travel;
    departing.position.set(2, 2.3 + takeoffP * 4.2, 2 - takeoffP * 4);
    departing.rotation.set(-0.08 - takeoffP * 0.13, -0.38 + takeoffP * 0.3, -0.04 - takeoffP * 0.08);
    departing.scale.setScalar(1 + takeoffP * 0.12);
    renderer.render(scene, camera);
  }
  let flightMode = true,
    flightProgress = 0,
    flightTime = 0;
  const skyClouds = new THREE.Group();
  scene.add(skyClouds);
  for (let i = 0; i < 7; i++) {
    const cloud = new THREE.Group();
    for (let j = 0; j < 4; j++) {
      const puff = sphere(cloud, 1 + j * 0.16, white, j * 0.9, Math.sin(j) * 0.3, 0);
      puff.scale.y = 0.5;
    }
    cloud.position.set(-16 + i * 5, 5 + (i % 3) * 2, -15 + (i % 2) * 23);
    skyClouds.add(cloud);
  }
  skyClouds.visible = false;
  const terminalFilm=buildTerminalFilm(airplane);
  scene.add(terminalFilm.world);
  function updateFlight(progress: number, mobile = false, seconds = flightTime) {
    flightMode = true;
    flightProgress = progress;
    flightTime = seconds;
    lastMobile = mobile;
    groups.forEach((g) => (g.visible = false));
    skyClouds.visible = false;
    terminalFilm.world.visible = true;
    terminalFilm.update(progress,seconds,camera,mobile);
    background.set('#5386b9');
    // 카메라가 주차장으로 이동해도 동일한 방향의 햇빛과 접지 그림자를 유지한다.
    const lightingFocus=terminalFilm.lightTarget;
    sun.position.set(lightingFocus.x+8,18,lightingFocus.z+12);
    sun.target.position.set(lightingFocus.x,0,lightingFocus.z);
    renderer.render(scene, camera);
  }
  function renderLast() {
    if (disposed) return;
    if (flightMode) updateFlight(flightProgress, lastMobile);
    else update(lastP, lastMobile, lastReduce);
  }
  function resize() {
    if (disposed) return;
    // 같은 크기의 관찰 알림에서 버퍼를 다시 지우지 않습니다.
    if (width === container.clientWidth && height === container.clientHeight) return;
    if (!container.clientWidth || !container.clientHeight) return;
    width = container.clientWidth;
    height = container.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderLast();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();
  // 첫 프레임을 그린 뒤 캔버스를 붙여 등장 효과가 로딩 중에 끝나지 않게 한다.
  container.appendChild(renderer.domElement);
  document.fonts.ready.then(renderLast);
  const onContextLost = (event: Event) => {
    event.preventDefault();
    document.body.classList.add('no-webgl');
  };
  renderer.domElement.addEventListener('webglcontextlost', onContextLost);
  function dispose() {
    disposed = true;
    observer.disconnect();
    renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
    disposeScene(scene, renderer, environmentTarget);
  }
  return { update, updateFlight, dispose };
}
