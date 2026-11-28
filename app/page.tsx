import { withBasePath } from '../src/site-path';
import { SiteHeader } from '../src/styles/header';
import JourneyHero from './JourneyHero';
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
            <img src={withBasePath('/brand/sandeul.svg')} alt="" width="250" height="64" />
          </a>
          <nav aria-label="주요 메뉴">
            <button type="button" id="mcp-button" className="mcp-connect">
              MCP
            </button>
            <button type="button" className="app-download">
              앱 다운로드
            </button>
          </nav>
        </div>
      </SiteHeader>

      <main>
        <JourneyHero />
        <ProductStorySection />
      </main>
      <LandingEndingSection>
        <SiteFooter>
          <div className="section-shell">
            <img src={withBasePath('/brand/sandeul.svg')} width="90" height="24" alt="Sandeul" />
            <div className="footer-info">
              <div className="contact">
                <a href="mailto:contact@sandeul.app">E. contact@sandeul.app</a>
              </div>
              <span>© 2026 Sandeul. All rights reserved.</span>
            </div>
            <nav aria-label="서비스 정보">
              <a href={withBasePath('/data')}>데이터 안내</a>
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
