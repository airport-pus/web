'use client';
import { useEffect, useRef, useState } from 'react';
import { features, gimhaeSegments, type FeatureKind } from './features';
import ScenePlayback, { playbackAsset } from './ScenePlayback';
import { Showcase } from './TravelShowcase.styles';
export default function TravelShowcase() {
  const section = useRef<HTMLElement>(null);
  const [unavailable, setUnavailable] = useState<Record<string, boolean>>({});
  const [zone, setZone] = useState(1);
  const [minutes, setMinutes] = useState(90);
  const segment = gimhaeSegments[zone];
  useEffect(() => {
    let mounted = true;
    let dispose: (() => void) | undefined;
    import('../../scenes/feature-scenes')
      .then(({ mountFeatureScenes }) => {
        if (mounted && section.current)
          dispose = mountFeatureScenes(section.current, (kind) => {
            if (mounted) setUnavailable((previous) => ({ ...previous, [kind]: true }));
          });
      })
      .catch(() => {
        if (mounted) setUnavailable({ flight: true, crowd: true, parking: true });
      });
    return () => {
      mounted = false;
      dispose?.();
    };
  }, []);
  function replayScene(kind: FeatureKind) {
    const video = section.current?.querySelector<HTMLVideoElement>(
      `[data-media-slot="${kind === 'flight' ? 'flights' : kind}"] video`,
    );
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        video.controls = true;
      });
      return;
    }
    section.current
      ?.querySelector(`[data-feature-scene="${kind}"]`)
      ?.dispatchEvent(new Event('replay-scene'));
  }
  return (
    <Showcase ref={section} id="app-features" aria-labelledby="app-features-title">
      <header className="feature-intro">
        <h2 id="app-features-title">
          공항 가기 전 집에서도 <img src="/brand/symbol.svg" alt="" />
          <span className="brand-name">산들로</span>
        </h2>
        <p>
          공항 가기 전 <span>항공편</span> <span>혼잡도</span> <span>주차</span> 산들에서 확인하세요.
        </p>
      </header>
      <div className="feature-grid">
        {features.map((feature) => (
          <article key={feature.slot}>
            <div className="feature-visual" data-media-slot={feature.slot}>
              <img
                className="scene-fallback"
                alt=""
                loading="lazy"
                src={playbackAsset(feature.kind, 'webp')}
              />
              <div
                className="feature-model"
                data-editorial="true"
                data-zone={feature.slot === 'crowd' ? zone : undefined}
                data-feature-scene={feature.kind}
                role="img"
                aria-label={
                  feature.slot === 'flights'
                    ? feature.label + ', ' + feature.value + ', ' + feature.detail
                    : feature.label
                }
              />
              {unavailable[feature.kind] && <ScenePlayback kind={feature.kind} zone={zone} />}
              {feature.slot === 'crowd' && (
                <output className="scene-reading segment-reading">
                  <small>{zone + 1}구간</small>
                  <span>{segment.route} <b data-level={segment.level}>{segment.level}</b></span>
                </output>
              )}
              {feature.slot === 'parking' && (
                <output className="scene-reading parking-estimate">
                  {minutes}분 예상 요금 <b>{(Math.ceil(minutes / 30) * 1000).toLocaleString('ko-KR')}원</b>
                </output>
              )}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            {feature.slot === 'flights' && (
              <button className="replay-search" type="button" onClick={() => replayScene('flight')}>
                편명 검색 다시 보기 <span aria-hidden="true">↻</span>
              </button>
            )}
            {feature.slot === 'crowd' && (
              <div className="demo-choices" role="group" aria-label="국내선 수속 구간">
                {gimhaeSegments.map(({ route }, i) => (
                  <button
                    type="button"
                    key={route}
                    aria-label={`${i + 1}구간 · ${route}`}
                    aria-pressed={zone === i}
                    onClick={() => setZone(i)}
                  >
                    {i + 1}구간
                  </button>
                ))}
              </div>
            )}
            {feature.slot === 'parking' && (
              <div className="demo-choices" role="group" aria-label="주차 시간">
                {[30, 60, 90].map((value) => (
                  <button
                    type="button"
                    key={value}
                    aria-pressed={minutes === value}
                    onClick={() => setMinutes(value)}
                  >
                    {value}분
                  </button>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Showcase>
  );
}
