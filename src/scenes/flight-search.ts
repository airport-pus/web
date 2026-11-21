// 랜딩의 편명 검색 연출에 사용하는 예시 데이터다.
const flights = [
  { number: 'KE1533', airline: '대한항공', city: '제주', airport: 'CJU', time: '14:20', gate: '5' },
  { number: 'BX8808', airline: '에어부산', city: '김포', airport: 'GMP', time: '09:30', gate: '3' },
  { number: '7C503', airline: '제주항공', city: '제주', airport: 'CJU', time: '11:45', gate: '7' },
  { number: 'LJ602', airline: '진에어', city: '김포', airport: 'GMP', time: '16:10', gate: '4' },
];

export function createFlightSearch(host: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('편명 검색 화면을 초기화할 수 없습니다.');
  const draw = ctx;
  // 기존 검색 화면의 구도에 맞춰 짧은 변을 기준으로 중앙에 배치한다.
  canvas.style.cssText =
    'position:absolute;inset:0;margin:auto;width:90cqmin;height:auto;max-height:100%;object-fit:contain';
  host.style.containerType = 'size';
  host.appendChild(canvas);
  let pool: typeof flights = [];
  let flight: (typeof flights)[number];
  let cycle = -1;
  let lastCount = -1;
  let lastOpacity = -1;

  function selectFlight() {
    if (!pool.length) pool = [...flights];
    const candidates = pool.filter((item) => item !== flight);
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    flight = next;
    pool.splice(pool.indexOf(next), 1);
    host.setAttribute(
      'aria-label',
      `검색 예시: ${flight.airline} ${flight.number}, 김해 출발 ${flight.city}행, ${flight.time}, 탑승구 ${flight.gate}`,
    );
    lastCount = -1;
  }

  function text(value: string, x: number, y: number, size: number, weight = 500, color = '#233749') {
    draw.fillStyle = color;
    draw.font = `${weight} ${size}px system-ui,sans-serif`;
    draw.fillText(value, x, y);
  }

  function render(time: number) {
    const nextCycle = Math.floor(time / 6);
    if (nextCycle !== cycle) {
      selectFlight();
      cycle = nextCycle;
    }
    const t = time % 6;
    const count = Math.min(flight.number.length, Math.floor(Math.max(0, t - 0.35) / 0.2));
    const fade = Math.min(1, Math.max(0, (t - (0.53 + flight.number.length * 0.2)) / 0.35));
    if (lastCount === count && lastOpacity === fade) return;
    lastCount = count;
    lastOpacity = fade;
    draw.clearRect(0, 0, 960, 760);
    text('김해공항 출발', 40, 100, 67, 650);
    draw.fillStyle = '#f7fcff';
    draw.beginPath();
    draw.roundRect(38, 148, 884, 104, 30);
    draw.fill();
    draw.strokeStyle = '#60788b';
    draw.lineWidth = 5;
    draw.beginPath();
    draw.arc(98, 198, 15, 0, Math.PI * 2);
    draw.moveTo(109, 209);
    draw.lineTo(122, 222);
    draw.stroke();
    text(count ? flight.number.slice(0, count) : '편명 검색', 146, 216, 47);
    draw.globalAlpha = fade * fade * (3 - 2 * fade);
    text(`${flight.airline} · ${flight.number}`, 40, 367, 41, 500, '#445f74');
    text(flight.city, 36, 480, 98, 650);
    text(flight.airport, 262, 475, 51, 500, '#526e82');
    draw.fillStyle = '#9dbdcf';
    draw.fillRect(40, 530, 878, 3);
    text('출발 시각', 40, 610, 38, 500, '#445f74');
    text('탑승구', 566, 610, 38, 500, '#445f74');
    text(flight.time, 36, 712, 82, 650);
    text(flight.gate, 562, 712, 82, 650);
    draw.globalAlpha = 1;
  }

  render(0);
  host.setAttribute('data-ready', '');
  return {
    render,
    replay() {
      cycle = -1;
      render(0);
    },
    dispose() {
      canvas.remove();
      host.style.removeProperty('container-type');
    },
  };
}
