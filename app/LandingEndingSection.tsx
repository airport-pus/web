import { LandingEnding } from '../src/styles/landing-ending';
import { storeLinks } from '../src/store-links';

export default function LandingEndingSection({ children }: React.PropsWithChildren) {
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
            {([['ios', 'App Store'], ['android', 'Google Play']] as const).map(([key, name]) =>
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
      {children}
    </LandingEnding>
  );
}
