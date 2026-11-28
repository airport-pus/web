'use client';
import { withBasePath } from '../../site-path';

import { useEffect, useRef, useState } from 'react';
import { features, gimhaeSegments, type FeatureKind } from './features';
import ScenePlayback, { playbackAsset } from './ScenePlayback';
import { Showcase } from './TravelShowcase.styles';
export default function TravelShowcase() {
  const section = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<FeatureKind>('flight');
  const [visible, setVisible] = useState<FeatureKind[]>([]);
  const [restart, setRestart] = useState(0);
  const active = visible.includes(selected) ? selected : visible[0];
  const [unavailable, setUnavailable] = useState<Record<string, boolean>>({});
  const [zone, setZone] = useState(0);
  const [minutes, setMinutes] = useState(90);
  const segment = gimhaeSegments[zone];
  useEffect(() => {
    const cards = section.current!.querySelectorAll<HTMLElement>('[data-feature-scene]');
    const intersecting = new Set<Element>();
    function sync() {
      setVisible(document.hidden ? [] : Array.from(cards)
        .filter(card => intersecting.has(card))
        .map(card => card.dataset.featureScene as FeatureKind));
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) intersecting.add(entry.target);
        else intersecting.delete(entry.target);
      }
      sync();
    });
    cards.forEach(card => observer.observe(card));
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    document.dispatchEvent(new Event('feature-activate'));
    if (!active) return;
    const duration = active === 'flight' ? 6000 : active === 'parking' ? 18000 : 5000;
    const timer = window.setTimeout(() => {
      if (active === 'crowd' && zone < gimhaeSegments.length - 1) {
        setZone(zone + 1);
        return;
      }
      if (active === 'crowd') setZone(0);
      setSelected(visible[(visible.indexOf(active) + 1) % visible.length]);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [active, visible, restart, zone]);

  function select(kind: FeatureKind) {
    setSelected(kind);
    setRestart(value => value + 1);
  }

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
    select(kind);
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
          공항 가기 전 <img className="home-icon" src={withBasePath('/brand/home.svg')} alt="" />집에서도 <img src={withBasePath('/brand/symbol.svg')} alt="" />
          <span className="brand-name">산들로</span>
        </h2>
        <p>
          공항 가기 전{' '}
          <span className="keyword-group" role="group" aria-label="산들 기능">
            {['항공편', '혼잡도', '주차'].map((keyword, index) => (
              <button type="button" key={keyword}
                aria-pressed={active === features[index].kind}
                onClick={() => select(features[index].kind)}>
                {keyword}
              </button>
            ))}
          </span>{' '}
          산들에서 확인하세요.
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
                src={playbackAsset(feature.kind, 'webp', zone)}
              />
              <div
                className="feature-model"
                data-editorial="true"
                data-playing={active === feature.kind}
                data-zone={feature.slot === 'crowd' ? zone : undefined}
                data-feature-scene={feature.kind}
                role="img"
                aria-label={feature.label}
              />
              {unavailable[feature.kind] && active === feature.kind && <ScenePlayback kind={feature.kind} zone={zone} />}
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
                    onClick={() => {
                      setZone(i);
                      select('crowd');
                    }}
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
                    onClick={() => { setMinutes(value); select('parking'); }}
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
