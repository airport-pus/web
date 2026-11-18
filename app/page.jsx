import { SiteHeader } from "../src/styles/header";
import { HeroIntro } from "../src/styles/hero";
import { FlightScroll } from "../src/styles/flight";
import { ServicesIntro } from "../src/styles/intro";
import FeatureSections from "./feature-sections";
import { SiteFooter } from "../src/styles/footer";
import { Toast } from "../src/styles/toast";
import LandingRuntime from "./landing-runtime";

export default function HomePage() {
 return <>

<SiteHeader className="top"><div className="wrap"><a className="brand" href="#" aria-label="산들 홈"><img src="/assets/airport-connection.png" alt="" width="28" height="28" />산들</a><nav aria-label="주요 메뉴"><button type="button" id="mcp-button">AI에서 사용하기</button></nav></div></SiteHeader>

<main>
<HeroIntro className="hero-intro"><h1>공항 정보는 한눈에,<br />여행 전 산들에서 시작하세요.</h1><div className="hero-action"><p className="hero-desc">비행기 출발과 도착 시간부터 공항 혼잡도, 주차 정보까지<br />여행에 필요한 국내 공항 정보를 한곳에 모아, 산들과 가볍게 출발하세요.</p><button className="download app-download">앱 다운로드</button></div></HeroIntro>
<FlightScroll className="flight-scroll" aria-label="집에서 함께 산들 앱으로 여행을 준비하는 두 사람"><div className="showcase flight-stage"><div id="scene" aria-hidden="true"></div></div></FlightScroll>
<ServicesIntro className="services-intro section-shell"><p className="section-eyebrow">공항 가기 전에는 산들</p><h2>산들, 여행 전 필요한 공항 정보를 한눈에</h2><a className="intro-detail" href="#feature-story">자세히 보기</a><div className="intro-topics" aria-hidden="true"><span>↗ 운항정보</span><span>◷ 혼잡도</span><span>Ⓟ 주차 안내</span></div></ServicesIntro>
<FeatureSections />
</main><SiteFooter className="footer"><div className="wrap"><div className="footer-title">공항 가는 길이<br />산들 가벼워져요.</div><div className="footer-info"><strong>산들</strong><p>국내 공항 통합 정보 조회 서비스</p><a href="https://github.com/airport-pus/airport-kr-client" target="_blank" rel="noopener noreferrer">개발자 GitHub ↗</a><p>Made by. 신희성 · 김승빈 · 김규민</p><small>© 2026 산들. All rights reserved.</small></div></div></SiteFooter><Toast id="ai-toast" role="status" aria-live="polite"></Toast>
<LandingRuntime />
</>;
}
