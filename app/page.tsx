import { SiteHeader } from '../src/styles/header';
import { HeroIntro } from '../src/styles/hero';
import { FlightScroll } from '../src/styles/flight';
import ProductStorySection from './ProductStorySection';
import { SiteFooter } from '../src/styles/footer';
import { Toast } from '../src/styles/toast';
import LandingEndingSection from './LandingEndingSection';
import LandingRuntime from './LandingRuntime';

export default function HomePage() {
  return (
    <>
      <SiteHeader className="top">
        <div className="wrap">
          <a className="brand" href="#" aria-label="산들 홈">
            <img src="/brand/sandeul.svg" alt="" width="250" height="64" />
          </a>
          <nav aria-label="주요 메뉴">
            <button type="button" id="mcp-button" className="mcp-connect">
              AI에서 사용하기
            </button>
            <button type="button" className="app-download">
              앱 다운로드
            </button>
          </nav>
        </div>
      </SiteHeader>

      <main>
        <HeroIntro className="hero-intro">
          <h1>
            공항 정보는 한눈에,
            <br />
            여행 전 산들에서 시작하세요.
          </h1>
          <div className="hero-action">
            <p className="hero-desc">
              비행기 출발과 도착 시간부터 공항 혼잡도, 주차 정보까지
              <br />
              여행에 필요한 국내 공항 정보를 한곳에 모아, 산들과 가볍게 출발하세요.
            </p>
            <button className="download app-download">앱 다운로드</button>
          </div>
        </HeroIntro>
        <FlightScroll className="flight-scroll" aria-label="집에서 함께 산들 앱으로 여행을 준비하는 두 사람">
          <div className="showcase flight-stage">
            <div id="scene" aria-hidden="true"></div>
          </div>
        </FlightScroll>

        <ProductStorySection />
      </main>
      <LandingEndingSection>
        <SiteFooter>
          <div className="section-shell">
            <img src="/brand/sandeul.svg" width="90" height="24" alt="Sandeul" />
            <div className="footer-info">
              <div className="contact">
                <a href="mailto:contact@sandeul.app">E. contact@sandeul.app</a>
              </div>
              <span>© 2026 Sandeul. All rights reserved.</span>
            </div>
            <nav aria-label="서비스 정보">
              <a href="/data">데이터 안내</a>
              <a href="https://github.com/airport-pus/web" target="_blank" rel="noopener noreferrer">
                개발자 GitHub ↗
              </a>
            </nav>
          </div>
        </SiteFooter>
      </LandingEndingSection>
      <Toast id="ai-toast" role="status" aria-live="polite"></Toast>
      <LandingRuntime />
    </>
  );
}
