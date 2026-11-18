import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { disposeScene } from './dispose-scene';

export function mountProductScene(host, kind) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
  scene.add(new THREE.HemisphereLight('#ffffff', '#c4cddd', 3));
  const light = new THREE.DirectionalLight('#ffffff', 4);
  light.position.set(-4, 12, 9); light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  Object.assign(light.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12 });
  light.shadow.normalBias = .03; scene.add(light);
  const root = new THREE.Group(); scene.add(root);
  const material = color => new THREE.MeshStandardMaterial({ color, roughness: .42, metalness: .08 });
  const white = material('#ffffff'), navy = material('#123c65'), lilac = material('#aaa0df'), blue = material('#91b9d9'), pale = material('#e5edf4'), dark = material('#26364a');
  function mesh(parent, geometry, mat, x = 0, y = 0, z = 0) { const m = new THREE.Mesh(geometry, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m; }
  function box(parent, w, h, d, mat, x = 0, y = 0, z = 0, radius = .08) { return mesh(parent, new RoundedBoxGeometry(w, h, d, 3, Math.min(radius, w / 3, h / 3, d / 3)), mat, x, y, z); }
  function cylinder(parent, radius, height, mat, x, y, z) { return mesh(parent, new THREE.CylinderGeometry(radius, radius, height, 24), mat, x, y, z); }
  function sphere(parent, radius, mat, x, y, z) { return mesh(parent, new THREE.SphereGeometry(radius, 24, 16), mat, x, y, z); }
  function label(parent, lines, w, h, x, y, z, bg = '#ffffff') {
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = Math.round(1024 * h / w);
    const ctx = canvas.getContext('2d'); ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const line of lines) { ctx.fillStyle = line.color || '#203650'; ctx.font = `${line.weight || 600} ${line.size || 62}px Pretendard, sans-serif`; ctx.fillText(line.text, line.x || 65, line.y); }
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    const plane = mesh(parent, new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), x, y, z); plane.castShadow = false; return plane;
  }
  const floor = mesh(scene, new THREE.PlaneGeometry(100, 100), new THREE.ShadowMaterial({ opacity: kind === 'mcp' ? .035 : .09 }), 0, -.13, 0); floor.rotation.x = -Math.PI / 2; floor.castShadow = false;
  const moving = [];
  if (kind === 'airport') {
    box(root, 12, .2, 7, material('#f5ede6'), 0, 0, 0, .16);
    // Terminal and glazed departure hall.
    box(root, 5.5, 1.2, 1.9, white, -.5, .7, -1.1, .15);
    box(root, 5.8, .2, 2.2, pale, -.5, 1.4, -1.1);
    for (let i = 0; i < 11; i++) box(root, .38, .8, .05, blue, -2.9 + i * .48, .8, -.12, .02);
    label(root, [{ text: 'SANDEUL AIRPORT', x: 120, y: 115, size: 65 }], 3.5, .55, -.5, 1.65, -.03);
    cylinder(root, .3, 2.6, pale, -4, 1.35, -1.3);
    box(root, 1.3, .6, 1.2, navy, -4, 2.8, -1.3);
    box(root, 1.1, .3, 1.03, blue, -4, 2.83, -1.3);
    box(root, 1.5, .15, 1.4, white, -4, 3.18, -1.3); cylinder(root, .04, .6, navy, -4, 3.5, -1.3);
    // Passenger queue and parking spaces are part of the same airport scene.
    for (let i = 0; i < 6; i++) { const x = -2.1 + (i % 3) * .7, z = .8 + Math.floor(i / 3) * .7; cylinder(root, .11, .38, i % 2 ? navy : blue, x, .45, z); sphere(root, .13, material('#e7c5af'), x, .78, z); box(root, .16, .23, .18, pale, x + .2, .28, z); }
    for (let i = 0; i < 3; i++) { const z = -1.8 + i * 1.4; box(root, 2, .02, .04, white, 4, .13, z + .6); box(root, .8, .3, 1.15, i === 1 ? navy : white, 4, .35, z, .12); box(root, .65, .28, .55, blue, 4, .6, z, .1); }
    box(root, 10.5, .025, .65, material('#d8dce2'), 0, .14, 2.65);
    for (let i = 0; i < 11; i++) box(root, .45, .02, .06, white, -4.5 + i * .9, .16, 2.65);
    const plane = new THREE.Group(); root.add(plane);
    const body = cylinder(plane, .22, 2.9, white, 0, 0, 0); body.rotation.x = Math.PI / 2;
    const nose = sphere(plane, .22, white, 0, 0, 1.45); nose.scale.z = 1.7;
    for (const side of [-1, 1]) { const wing = box(plane, 1.9, .08, .65, white, side * .75, 0, -.1); wing.rotation.y = side * .3; box(plane, .7, .07, .35, white, side * .3, .08, -1.15); const engine = cylinder(plane, .13, .5, navy, side * .7, -.2, .05); engine.rotation.x = Math.PI / 2; }
    box(plane, .08, .55, .5, navy, 0, .27, -1.15);
    plane.position.set(.8, 3.3, .8); plane.rotation.set(.08, -.6, -.07); moving.push({ object: plane, y: 3.3, amplitude: .14 });
    camera.position.set(11, 9, 14); camera.lookAt(0, 1.1, 0);
  } else {
    // Physical phone, question panel and answer panel connected through an MCP hub.
    const phone = new THREE.Group(); root.add(phone); phone.position.set(-2.6, 2.9, 0); phone.rotation.y = .18; phone.rotation.z = -.08;
    box(phone, 2.65, 5.5, .3, dark, 0, 0, 0, .25);
    box(phone, 2.48, 5.3, .04, white, 0, 0, .18, .2);
    label(phone, [{ text: '산들 × AI', y: 130, size: 68 }, { text: '어떤 공항 정보가', y: 340, size: 62 }, { text: '궁금하세요?', y: 435, size: 62 }, { text: '김해 → 제주', y: 720, size: 88, color: '#6455b0' }, { text: '비행시간 알려줘', y: 830, size: 60 }, { text: '질문을 입력하세요  ↑', y: 1390, size: 46, color: '#8994a6' }], 2.2, 4.7, 0, 0, .215);
    box(phone, .7, .15, .04, dark, 0, 2.38, .23);
    const hub = new THREE.Group(); root.add(hub); box(hub, 1.35, 1.35, .8, lilac, 0, 0, 0, .2); label(hub, [{ text: 'MCP', x: 105, y: 400, size: 235, color: '#ffffff' }], 1.1, .65, 0, 0, .42, '#aaa0df'); hub.position.set(.2, 2.7, .8); hub.rotation.y = -.2; moving.push({ object: hub, y: 2.7, amplitude: .09 });
    const response = new THREE.Group(); root.add(response); response.position.set(3.2, 2.9, -.1); response.rotation.y = -.15;
    box(response, 3.3, 3.4, .2, white, 0, 0, 0, .18);
    label(response, [{ text: '항공편 조회 결과', y: 150, size: 66 }, { text: 'PUS  →  CJU', y: 350, size: 102 }, { text: '14:20 — 15:20', y: 500, size: 82 }, { text: '예상 소요  1시간', y: 665, size: 70, color: '#6455b0' }, { text: '설명을 위한 고정 예시', y: 850, size: 40, color: '#929cad' }], 2.9, 2.8, 0, 0, .12);
    for (let i = 0; i < 7; i++) { const dot = sphere(root, .055, lilac, -1 + i * .47, 1.3, 1.1); moving.push({ object: dot, y: 1.3, amplitude: .08, phase: i * .6 }); }
    camera.position.set(7, 5, 17); camera.lookAt(.1, 2.7, 0);
  }
  let visible = false, raf = 0, previous = 0, elapsed = 0, disposed = false;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function size() { if (disposed || !host.clientWidth || !host.clientHeight) return; const aspect = host.clientWidth / host.clientHeight; camera.aspect = aspect; camera.fov = aspect < 1 ? (kind === 'mcp' ? 34 : 45) : 32; camera.updateProjectionMatrix(); renderer.setSize(host.clientWidth, host.clientHeight, false); draw(); }
  function draw() { for (const item of moving) item.object.position.y = item.y + (reduced.matches ? 0 : Math.sin(elapsed * .8 + (item.phase || 0)) * item.amplitude); renderer.render(scene, camera); }
  function tick(time) { raf = 0; elapsed += previous ? Math.min((time - previous) / 1000, .05) : 0; previous = time; draw(); if (visible && !document.hidden && !reduced.matches) raf = requestAnimationFrame(tick); }
  function sync() { cancelAnimationFrame(raf); raf = 0; previous = 0; if (visible && !document.hidden) { draw(); if (!reduced.matches) raf = requestAnimationFrame(tick); } }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }); observer.observe(host);
  const resize = new ResizeObserver(size); resize.observe(host);
  document.addEventListener('visibilitychange', sync); reduced.addEventListener('change', sync); size();
  return () => { disposed = true; cancelAnimationFrame(raf); observer.disconnect(); resize.disconnect(); document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync); disposeScene(scene, renderer); };
}
