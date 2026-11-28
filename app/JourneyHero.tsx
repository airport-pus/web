'use client';

import { useEffect, useRef } from 'react';
import JourneyFilm from './JourneyFilm';
import { JourneyHeroLayout } from '../src/styles/journey-hero';

export default function JourneyHero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false, frame = 0, timeout = 0;
    // CSS가 로딩 중에 끝나지 않도록 표시 준비 후 재생합니다.
    void Promise.race([
      document.fonts.load('500 81px Outfit').catch(() => {}),
      new Promise<void>(resolve => { timeout = window.setTimeout(resolve, 300); }),
    ]).then(() => {
      clearTimeout(timeout);
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (!cancelled) section.current?.setAttribute('data-intro', 'playing');
        });
      });
    });
    return () => { cancelled = true; clearTimeout(timeout); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    let frame = 0, progress = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    function render() {
      frame = 0;
      if (!section.current || !stage.current) return;
      const distance = Math.max(1, section.current.offsetHeight - stage.current.offsetHeight);
      const target = Math.max(0, Math.min(1, -section.current.getBoundingClientRect().top / distance));
      progress = progress + (target - progress) * .075;
      if (Math.abs(target - progress) < .0005) progress = target;
      stage.current.style.setProperty('--journey-progress', String(progress));
      stage.current.style.setProperty('--expand', String(Math.min(1, progress / .392)));
      stage.current.style.setProperty('--title-opacity', String(Math.max(0, 1 - progress * 4)));
      if (progress !== target) frame = requestAnimationFrame(render);
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(render); };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    reduced.addEventListener('change', request);
    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request); window.removeEventListener('resize', request);
      reduced.removeEventListener('change', request);
    };
  }, []);

  return <JourneyHeroLayout ref={section} aria-labelledby="journey-title">
    <div className="journey-stage" ref={stage}>
      <div className="journey-title">
        <h1 id="journey-title" aria-label="Fly light, Sandeul.">
          <span aria-hidden="true">Fly light, </span>
          <span className="journey-brand" aria-hidden="true">
            Sandeul.
          </span>
        </h1>
      </div>
      <div className="journey-scene">
        <JourneyFilm />

      </div>
    </div>
  </JourneyHeroLayout>;
}
