import { LandingEnding } from '../src/styles/landing-ending';
import { storeLinks } from '../src/store-links';

export default function Ending() {
  return (
    <LandingEnding aria-labelledby="closing-title">
      <div className="closing-content">
        <span className="closing-app-icon" aria-hidden="true">
          <img src="/brand/symbol.svg" width="40" height="40" alt="" />
        </span>
        <h2 id="closing-title">공항 가는 날,<br />산들과 가볍게 출발하세요.</h2>
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
    </LandingEnding>
  );
}
