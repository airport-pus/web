'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PhoneMockup from './phone-mockup';

const steps = [
  { label: '운항정보', description: '항공편의 출발 시각과 탑승구를 확인하세요.' },
  { label: '공항 혼잡도', description: '보안검색 구간별로 얼마나 붐비는지 살펴보세요.' },
  { label: '주차 현황', description: '공항에 가기 전, 주차장별 빈자리를 확인하세요.' },
  { label: '주차 요금', description: '이용 시간과 할인 조건으로 예상 요금을 계산하세요.' },
  { label: '내 항공권', description: '내 항공편을 담고 원하는 시간에 출발 알림을 받으세요.' },
];

const Story = styled.section`
  position: relative;
  height: calc(100svh + 240svh);

  .stage {
    position: sticky;
    top: 60px;
    height: calc(100svh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(12px, 2.6svh, 24px);
    text-align: center;
  }

  .stage > :first-child {
    width: min(61vw, 290px, 28svh);
    flex: none;
    margin: 0;
  }

  .steps {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: repeat(${steps.length}, minmax(0, 1fr));
    box-sizing: border-box;
    width: min(490px, calc(100% - 24px));
    padding: 4px;
    border-radius: 999px;
    background: #242427;
  }
  .steps::before {
    content: '';
    position: absolute;
    inset: 4px auto 4px 4px;
    width: calc((100% - 8px) / ${steps.length});
    border-radius: inherit;
    background: #fff;
    transform: translateX(calc(var(--step) * 100%));
    pointer-events: none;
    z-index: -1;
  }
  @media (prefers-reduced-motion: no-preference) {
    .steps::before { transition: transform 180ms ease-out; }
  }
  .steps button {
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: #fff;
    padding: 10px 0;
    font: inherit;
    font-size: clamp(12px, 3.5vw, 15px);
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
    cursor: pointer;
  }
  .steps button[aria-current="step"] { color: #242427; }
  .steps button:focus-visible { outline: 2px solid #659dff; outline-offset: -2px; }
  p { margin: 0; padding: 0 16px; font-size: clamp(15px, 2vw, 20px); word-break: keep-all; }
  @media (max-height: 500px) {
    .stage { gap: 6px; }
    .stage > :first-child { width: min(20svh, 160px); }
  }
`;

export default function PhoneStory() {
  const story = useRef(null);
  const stage = useRef(null);
  const [active, setActive] = useState(0);

  function scrollRange() {
    return story.current.offsetHeight - stage.current.offsetHeight;
  }

  useEffect(() => {
    function syncStep() {
      const offset = stage.current.offsetTop;
      const index = Math.round(offset / scrollRange() * (steps.length - 1));
      setActive(Math.max(0, Math.min(steps.length - 1, index)));
    }
    syncStep();
    window.addEventListener('scroll', syncStep, { passive: true });
    window.addEventListener('resize', syncStep);
    return () => {
      window.removeEventListener('scroll', syncStep);
      window.removeEventListener('resize', syncStep);
    };
  }, []);

  function selectStep(index) {
    const start = window.scrollY + story.current.getBoundingClientRect().top
      - parseFloat(getComputedStyle(stage.current).top);
    window.scrollTo({ top: start + scrollRange() * index / (steps.length - 1), behavior: 'instant' });
    setActive(index);
  }

  return (
    <Story ref={story} aria-label="산들 앱 기능">
      <div className="stage" ref={stage}>
        <PhoneMockup screenSrc={steps[active].screenSrc} alt={steps[active].label} />
        <div className="steps" style={{ '--step': active }} role="group" aria-label="기능 선택">
          {steps.map(({ label }, index) => (
            <button key={label} type="button" aria-current={active === index ? 'step' : undefined}
              onClick={() => selectStep(index)}>{label}</button>
          ))}
        </div>
        <p>{steps[active].description}</p>
      </div>
    </Story>
  );
}
