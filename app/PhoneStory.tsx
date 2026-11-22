'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PhoneMockup from './PhoneMockup';

const steps = [
  { label: '운항정보', description: '내 항공편을 찾아 출발 시각과 탑승구를 확인하세요. 일정이 바뀌면 변경된 시각도 함께 볼 수 있어요.' },
  { label: '공항 혼잡도', description: '어느 구간이 붐비는지 미리 살펴보고, 공항으로 출발할 시간을 정하세요.' },
  { label: '주차 현황', description: '주차장마다 남은 자리를 비교하고 어디에 차를 세울지 골라보세요.' },
  { label: '주차 요금', description: '차를 세워 둘 시간과 할인 조건을 선택해 예상 주차 요금을 확인하세요.' },
  { label: '내 항공권', description: '여행 당일 다시 찾게 되는 내 항공편 정보를 한곳에서 살펴보세요.' },
];

const Story = styled.section`
  position: relative;
  height: 250svh;

  .stage {
    position: sticky;
    top: 60px;
    height: calc(100svh - 60px);
    box-sizing: border-box;
    width: min(1120px, 90%);
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: clamp(40px, 8vw, 128px);
  }
  .copy { min-width: 0; }
  h2 {
    margin: 0 0 clamp(20px, 5svh, 56px);
    font-size: clamp(32px, min(4.2vw, 6.4svh), 62px);
    line-height: 1.2;
    letter-spacing: -.05em;
    word-break: keep-all;
  }
  .step { border-top: 1px solid #e5e8ec; }
  .step:last-child { border-bottom: 1px solid #e5e8ec; }
  .step button {
    width: 100%;
    padding: clamp(8px, 1.6svh, 19px) 0;
    border: 0;
    background: transparent;
    text-align: left;
    font: inherit;
    font-size: clamp(16px, 1.65vw, 23px);
    font-weight: 650;
    color: #89919b;
    cursor: pointer;
  }
  .step button[aria-expanded='true'] { color: #191f28; }
  .detail { height: 0; overflow: hidden; }
  .detail[aria-hidden='false'] { height: var(--detail-height, auto); }
  .detail > div { opacity: 0; }
  .detail[aria-hidden='false'] > div { opacity: 1; }
  .detail p {
    margin: 0;
    padding-bottom: 1em;
    color: #515c69;
    font-size: clamp(14px, 1.3vw, 18px);
    line-height: 1.55;
    word-break: keep-all;
  }
  .stage[data-animated] .detail { height: calc(var(--detail-height) * var(--open)); }
  .stage[data-animated] .detail > div { opacity: var(--open); }
  .stage[data-animated] .step button {
    color: color-mix(in srgb, #191f28 calc(var(--open) * 100%), #89919b);
  }
  @media (prefers-reduced-motion: no-preference) {
    .stage[data-animated] .detail > div {
      transform: translateY(var(--slide));
    }
    @supports (animation-timeline: view()) {
      view-timeline-name: --phone-story;
      .copy {
        animation: phone-copy-enter linear both;
        animation-timeline: --phone-story;
        animation-range: entry 10% entry 78%;
      }
    }
  }
  @keyframes phone-copy-enter {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .device {
    width: min(100%, 354px, 39svh);
    justify-self: center;
  }
  .device > div { width: 100%; margin: 0; }
  @media (max-width: 650px) {
    .stage { width: 92%; gap: 4vw; grid-template-columns: 1.35fr 1fr; }
    h2 { font-size: clamp(23px, 5.6vw, 34px); }
    .step button { padding-block: 10px; }
  }
  @media (max-height: 580px) {
    h2 { font-size: 24px; margin-bottom: 8px; }
    .step button { padding-block: 4px; font-size: 15px; }
    .detail p { font-size: 13px; padding-bottom: 6px; }
  }
`;

export default function PhoneStory() {
  const story = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollRange() {
    return story.current!.offsetHeight - stage.current!.offsetHeight;
  }

  useEffect(() => {
    // 두 행이 같은 높이를 주고받게 해 전환 중에도 목록의 위아래를 고정한다.
    const panel = stage.current!;
    const paragraphs = Array.from(panel.querySelectorAll<HTMLElement>('.detail p'));
    function measureDetails() {
      const tallest = Math.max(...paragraphs.map(p => p.offsetHeight));
      panel.style.setProperty('--detail-height', `${tallest}px`);
    }
    measureDetails();
    const sizes = new ResizeObserver(measureDetails);
    paragraphs.forEach(p => sizes.observe(p));
    const rows = Array.from(panel.querySelectorAll<HTMLElement>('.step'));
    const weights = rows.map(() => 0);
    let selected = -1;
    let frame = 0;

    function paint() {
      rows.forEach((row, index) => {
        const weight = weights[index];
        row.style.setProperty('--open', String(weight));
        row.style.setProperty('--slide', `${(1 - weight) * 8}px`);
      });
    }

    function syncStep() {
      const index = Math.min(rows.length - 1, Math.max(0,
        Math.round(panel.offsetTop / scrollRange() * (rows.length - 1))));
      if (index === selected) return;
      cancelAnimationFrame(frame);
      const firstPaint = selected === -1;
      selected = index;
      setActive(index);
      if (firstPaint) {
        weights[index] = 1;
        paint();
        panel.dataset.animated = '';
        return;
      }

      // 스크롤은 다음 행만 선택하고, 펼침은 입력이 멈춰도 끝까지 진행한다.
      const from = weights.slice();
      const started = performance.now();
      function advance(now: number) {
        const t = Math.min(1, (now - started) / 520);
        const eased = t * t * (3 - 2 * t);
        rows.forEach((_, i) => {
          weights[i] = from[i] + ((i === index ? 1 : 0) - from[i]) * eased;
        });
        paint();
        if (t < 1) frame = requestAnimationFrame(advance);
      }
      frame = requestAnimationFrame(advance);
    }
    syncStep();
    window.addEventListener('scroll', syncStep, { passive: true });
    window.addEventListener('resize', syncStep);
    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      window.removeEventListener('scroll', syncStep);
      window.removeEventListener('resize', syncStep);
    };
  }, []);

  function selectStep(index: number) {
    const start = window.scrollY + story.current!.getBoundingClientRect().top
      - parseFloat(getComputedStyle(stage.current!).top);
    window.scrollTo({ top: start + scrollRange() * index / (steps.length - 1), behavior: 'instant' });
    setActive(index);
  }

  return (
    <Story id="phone-story" ref={story} aria-label="산들 앱 기능">
      <div className="stage" ref={stage}>
        <div className="copy">
          <h2>공항 가기 전,<br />산들로 한눈에</h2>
          {steps.map(({ label, description }, index) => (
            <div className="step" key={label}>
              <button type="button" aria-expanded={active === index}
                aria-controls={`phone-detail-${index}`} onClick={() => selectStep(index)}>
                {label}
              </button>
              <div className="detail" id={`phone-detail-${index}`} aria-hidden={active !== index}>
                <div><p>{description}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div className="device"><PhoneMockup /></div>
      </div>
    </Story>
  );
}
