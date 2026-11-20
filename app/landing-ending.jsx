import { LandingEnding } from '../src/styles/landing-ending';
import { storeLinks } from '../src/store-links';
import AirportIllustration from './airport-illustration';

// The supported-airport list is kept but not rendered (simplified page); pass showAirports to bring it back.
export default function Ending({ children, showAirports = false }) {
  return (
    <LandingEnding>
      <section aria-labelledby="closing-title" className="closing-panel">
      <div className="closing-content">
        <span className="closing-app-icon" aria-hidden="true">
          <img src="/brand/symbol.svg" width="40" height="40" alt="" />
        </span>
        <h2 id="closing-title">다음 출발은,<br />산들과 함께.</h2>
        <p>iPhone과 Android에서 산들을 만나보세요.</p>
        <details className="store-picker">
          <summary>앱 다운로드 <span aria-hidden="true">›</span></summary>
          <div className="store-options">
            {Object.entries({ ios: 'App Store', android: 'Google Play' }).map(([key, name]) =>
              storeLinks[key] ? (
                <a key={key} href={storeLinks[key]} target="_blank" rel="noopener noreferrer">{name}</a>
              ) : (
                <button key={key} type="button" className="app-download" aria-label={name + ' 다운로드 안내'}>{name}</button>
              )
            )}
          </div>
        </details>
      </div>
      </section>
      {showAirports && <section className="airport-directory" aria-labelledby="airport-directory-title">
        <p id="airport-directory-title">현재 국내 4개 공항을 지원합니다</p>
        <ul>
          {[
            ['PUS','김해국제공항'], ['ICN','인천국제공항'],
            ['GMP','김포국제공항'], ['CJU','제주국제공항'],
          ].map(([code,name]) => <li key={code}><div className="airport-visual"><AirportIllustration code={code} /></div><b>{code}</b><span>{name}</span></li>)}
        </ul>
      </section>}
      {children}
    </LandingEnding>
  );
}
