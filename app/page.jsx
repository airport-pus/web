import LandingRuntime from "./landing-runtime";

export default function HomePage() {
 return <>

<header className="top"><div className="wrap"><a className="brand" href="#" aria-label="산들 홈"><img src="/assets/airport-connection.png" alt="" width="28" height="28" />산들</a><nav aria-label="주요 메뉴"><button type="button" id="mcp-button">AI에서 사용하기</button></nav></div></header>

<main>
<section className="hero-intro"><h1>공항 정보는 한눈에,<br />여행 전 산들에서 시작하세요.</h1><div className="hero-action"><p className="hero-desc">비행기 출발과 도착 시간부터 공항 혼잡도, 주차 정보까지<br />여행에 필요한 국내 공항 정보를 한곳에 모아, 산들과 가볍게 출발하세요.</p><button className="download app-download">앱 다운로드</button></div></section>
<section className="flight-scroll" aria-label="집에서 함께 산들 앱으로 여행을 준비하는 두 사람"><div className="showcase flight-stage"><div id="scene" aria-hidden="true"></div></div></section>
<section className="services-intro section-shell"><p className="section-eyebrow">공항 가기 전에는 산들</p><h2>산들, 여행 전 필요한 공항 정보를 한눈에</h2><a className="intro-detail" href="#feature-story">자세히 보기</a><div className="intro-topics" aria-hidden="true"><span>↗ 운항정보</span><span>◷ 혼잡도</span><span>Ⓟ 주차 안내</span></div></section>
<div className="feature-editorial section-shell" id="feature-story">
<section className="feature-chapter" id="flight-info">
 <div className="chapter-heading"><div><p className="chapter-label">운항정보</p><h2>기다리는 비행기 소식,<br />찾아보는 건 간단하게.</h2></div><p>언제 출발하는지, 어디에 도착하는지.<br />국내 공항의 출발·도착 정보와 운항 상태를<br />산들에서 한눈에 확인하세요.</p></div>
 <div className="chapter-visual flight-visual"><div className="feature-canvas" data-feature-scene="flight" data-editorial="true" aria-hidden="true"></div>
  <div className="boarding-pass"><div className="ticket-brand"><img src="/assets/airport-connection.png" alt="" width="25" height="25" />산들<span>운항정보</span></div><div className="ticket-route"><div><b>PUS</b><span>김해</span></div><span className="route-line">✈</span><div><b>CJU</b><span>제주</span></div></div><div className="ticket-divider"></div><div className="ticket-bottom"><div><span>출발 시간</span><strong>14:20</strong></div><div><span>대한항공 · KE1533</span><em>탑승 중</em></div></div><div className="ticket-bars" aria-hidden="true"></div></div>
  <div className="visual-caption">출발부터 도착까지, 필요한 정보만.</div>
 </div>
</section>
<section className="feature-chapter" id="airport-info">
 <div className="chapter-heading"><div><p className="chapter-label">공항 혼잡도</p><h2>공항의 지금을 알면,<br />출발이 한결 여유로워져요.</h2></div><p>공항에 도착해서야 알게 되는 기다림.<br />혼잡도를 먼저 확인하고<br />여행의 시작을 여유롭게 준비하세요.</p></div>
 <div className="chapter-visual crowd-visual"><div className="feature-canvas" data-feature-scene="crowd" data-editorial="true" aria-hidden="true"></div><div className="crowd-indicator"><p>지금, 공항은</p><h3>여유로워요<span className="status-pulse"></span></h3><div className="crowd-dial"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div className="dial-labels"><span>여유</span><span>혼잡</span></div></div><div className="visual-caption">공항에 가기 전에, 먼저 살펴보세요.</div></div>
</section>
<section className="feature-chapter" id="parking-info">
 <div className="chapter-heading"><div><p className="chapter-label">주차 안내</p><h2>차를 가져가는 날도,<br />빈자리부터 확인하세요.</h2></div><p>주차장마다 다른 빈자리와 요금.<br />미리 살펴보고 비교하면<br />공항 가는 길이 조금 더 가벼워져요.</p></div>
 <div className="chapter-visual parking-visual"><div className="feature-canvas" data-feature-scene="parking" data-editorial="true" aria-hidden="true"></div><div className="parking-total"><p>국내선 주차장</p><div><strong>20</strong><span>대<br />주차 가능</span></div><span className="parking-status"><i></i> 빈자리가 있어요</span></div><div className="visual-caption">주차 현황과 예상 요금을 한곳에서.</div></div>
</section>
</div>
</main><footer className="footer"><div className="wrap"><div className="footer-title">공항 가는 길이<br />산들 가벼워져요.</div><div className="footer-info"><strong>산들</strong><p>국내 공항 통합 정보 조회 서비스</p><a href="https://github.com/airport-pus/airport-kr-client" target="_blank" rel="noopener noreferrer">개발자 GitHub ↗</a><p>Made by. 신희성 · 김승빈 · 김규민</p><small>© 2026 산들. All rights reserved.</small></div></div></footer><div id="ai-toast" role="status" aria-live="polite"></div>
<LandingRuntime />
</>;
}
