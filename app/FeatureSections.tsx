'use client';
import { useState } from 'react';
import { FeatureEditorial } from '../src/styles/features';

const features = [
  { key: 'flight', label: '운항정보', title: <>바뀐 출발 시간도,<br />탑승구도 놓치지 않게.</>, description: '공항과 출발·도착을 선택하고 도시나 항공편 번호로 검색하세요. 예정 시간과 변경 시간, 운항 상태를 함께 보여줘요.', details: ['예정 시간과 변경 시간 구분', '항공사·항공편 번호와 탑승구 확인', '지연 시간과 결항 여부 확인'] },
  { key: 'crowd', label: '공항 혼잡도', title: <>공항 전체보다,<br />내가 지날 구간을 먼저.</>, description: '공항 안에서도 구간마다 혼잡도가 달라요. 김해·김포·제주는 구간별로, 인천은 터미널과 출국장별로 살펴보세요.', details: ['공항별 구간·출국장 혼잡 현황', '시간대별 승객 수 확인', '집계 시각과 예상·실제 집계 구분'] },
  { key: 'parking', label: '주차 안내', title: <>어디에 세울지,<br />요금은 얼마나 나올지.</>, description: '국내선과 국제선 등 주차장별 남은 자리를 비교하세요. 이용 시간과 할인 조건에 따른 예상 주차 요금도 확인할 수 있어요.', details: ['주차장별 주차 가능 대수', '이용 시간에 따른 예상 요금', '할인 조건을 반영한 요금 확인'] },
];
const flights = [
  { time: '14:20', city: '제주', code: 'CJU', airline: '대한항공', flight: 'KE1533', gate: '5', status: '탑승 중' },
  { time: '14:40', changed: '15:10', city: '김포', code: 'GMP', airline: '에어부산', flight: 'BX8812', gate: '3', status: '지연', delay: '30분' },
];
export default function FeatureSections() {
  const [active, setActive] = useState(0);
  const [arrival, setArrival] = useState(false);
  const [search, setSearch] = useState('');
  const visible = flights.filter(item => `${item.city} ${item.flight} ${item.airline}`.toLowerCase().includes(search.trim().toLowerCase()));
  const feature = features[active];
  return <FeatureEditorial className="section-shell" id="feature-story" aria-labelledby="features-title">
    <div className="app-introduction"><div><p className="feature-kicker">산들 앱에서 확인하세요</p><h2 id="features-title">내 항공편부터 주차까지,<br />공항 갈 때 필요한 세 가지.</h2></div><p>운항정보, 공항 혼잡도, 주차 안내.<br />공항을 선택하면 필요한 정보를 앱에서 확인할 수 있어요.</p></div>
    <nav className="feature-tabs" aria-label="앱 체험 메뉴">{features.map((item, i) => <button key={item.key} type="button" aria-pressed={active === i} onClick={() => setActive(i)}>{item.label}</button>)}</nav>
    <div className="app-stage" id="app-features">
      <div className="feature-copy"><span className="feature-number">0{active + 1} / 03</span><h3>{feature.title}</h3><p>{feature.description}</p><ul>{feature.details.map(detail => <li key={detail}>{detail}</li>)}</ul><small>제공 항목은 공항과 데이터 출처에 따라 달라질 수 있어요.</small></div>
      <div className="phone-area"><div className="app-phone">
        <div className="phone-status" aria-hidden="true"><span>9:41</span><i /><span>••• ▰</span></div>
        <div className="app-brand"><img src="/assets/airport-connection.png" alt="" width="22" height="22" />산들<span>앱 미리보기</span></div>
        <div className="app-content"><div className="airport-heading"><p>김해국제공항 <span>PUS</span></p><h4>{feature.label}</h4></div>
          {active === 0 ? <><div className="flight-controls"><div className="direction-control"><button type="button" aria-pressed={!arrival} onClick={() => setArrival(false)}>출발</button><button type="button" aria-pressed={arrival} onClick={() => setArrival(true)}>도착</button></div><input aria-label="항공편 검색" placeholder="도시 또는 항공편 번호" value={search} onChange={e => setSearch(e.target.value)} maxLength={80} /></div><div className="flight-list">{visible.map(item => <article className="flight-card" key={item.flight}><div className="flight-card-top"><span>{arrival ? '도착 예정' : item.status}</span><span>{arrival ? '출발지' : '도착지'} · {item.city} {item.code}</span></div><div className="flight-time"><strong>{item.changed || item.time}</strong>{item.changed && <span>예정 {item.time}<b>{item.delay} 지연</b></span>}<span className="gate">{arrival ? '국내선' : `탑승구 ${item.gate}`}</span></div><p>{item.airline} · {item.flight}</p></article>)}{!visible.length && <p className="search-empty">일치하는 예시 항공편이 없어요.</p>}</div></> : active === 1 ? <div className="crowd-content"><div className="screen-meta"><span>국내선 · 구간별 현황</span><span>14:00 기준</span></div>{[['1구간', '여유', '22%'], ['2구간', '보통', '48%'], ['3구간', '여유', '30%']].map(([label, state, width]) => <div className="crowd-row" key={label}><div><strong>{label}</strong><span>{state}</span></div><div className="crowd-bar"><i style={{ width }} /></div></div>)}<div className="passengers"><span>시간대별 승객 수</span><div>{[42, 64, 85, 52, 32].map((height, i) => <div key={i}><i style={{ height }} /><span>{12 + i}시</span></div>)}</div><small>실제 집계 · 예시 그래프</small></div></div> : <div className="parking-content"><div className="screen-meta"><span>주차장별 빈자리</span><span>14:00 기준</span></div>{[['P1', '국내선 주차장', '20'], ['P2', '국제선 주차장', '48'], ['P3', '여객 주차장', '12']].map(([code, label, spaces]) => <div className="parking-row" key={code}><span className="lot-code">{code}</span><strong>{label}</strong><b>{spaces}<small>대</small></b></div>)}<div className="parking-estimate"><strong>예상 주차 요금</strong><p>이용 시간과 할인 조건으로 확인</p><div><span>입차 · 출차 시간</span><span>→</span></div><div><span>할인 조건</span><span>→</span></div></div></div>}
        </div>
        <div className="app-bottom-nav" aria-label="앱 미리보기 하단 메뉴">{features.map((item, i) => <button key={item.key} type="button" aria-pressed={active === i} onClick={() => setActive(i)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{i === 0 ? <path d="m3 13 7-2 6-7 3 1-4 8 5 4-1 2-7-2-4 4-2-1 2-5-5-2Z" /> : i === 1 ? <><circle cx="9" cy="7" r="3" /><path d="M3 21v-4a6 6 0 0 1 12 0v4M17 4a3 3 0 0 1 0 6m1 4a5 5 0 0 1 3 5v2" /></> : <><rect x="4" y="3" width="16" height="18" rx="4" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></>}</svg>{item.label}</button>)}</div><div className="home-indicator" />
      </div><p className="app-example-note">앱 소개용 예시 화면 · 실제 공항 현황과 다릅니다.</p></div>
    </div>
  </FeatureEditorial>;
}
