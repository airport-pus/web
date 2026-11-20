'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PhoneMockup from './PhoneMockup';

const steps: {label: string; screenSrc?: string}[] = [
  { label: '운항정보' },
  { label: '공항 혼잡도' },
  { label: '주차 현황' },
  { label: '주차 요금' },
  { label: '내 항공권' },
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
    width: min(75vw, 354px, calc((100svh - 210px) / 2.2));
    flex: none;
    margin: 0;
  }

  .steps {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: clamp(4px, 1vw, 8px);
    max-width: calc(100% - 16px);
  }
  .steps button {
    border: 1px solid #e3e5e8;
    border-radius: 12px;
    background: white;
    color: #45474d;
    padding: 8px clamp(7px, 1.6vw, 14px);
    font: inherit;
    font-size: clamp(12px, 3.5vw, 15px);
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
    cursor: pointer;
  }
  @media (hover: hover) {
    .steps button:hover { background: #f5f6f7; }
  }
  .steps button[aria-current="step"] { background: #242427; border-color: #242427; color: white; }
  .steps button:focus-visible { outline: 2px solid #659dff; outline-offset: -2px; }
  @media (max-height: 500px) {
    .stage { gap: 6px; }
    .stage > :first-child { width: min(75vw, calc((100svh - 155px) / 2.2)); }
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
    function syncStep() {
      const offset = stage.current!.offsetTop;
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

  function selectStep(index: number) {
    const start = window.scrollY + story.current!.getBoundingClientRect().top
      - parseFloat(getComputedStyle(stage.current!).top);
    window.scrollTo({ top: start + scrollRange() * index / (steps.length - 1), behavior: 'instant' });
    setActive(index);
  }

  return (
    <Story ref={story} aria-label="산들 앱 기능">
      <div className="stage" ref={stage}>
        <PhoneMockup screenSrc={steps[active].screenSrc} alt={steps[active].label} />
        <div className="steps" role="group" aria-label="기능 선택">
          {steps.map(({ label }, index) => (
            <button key={label} type="button" aria-current={active === index ? 'step' : undefined}
              onClick={() => selectStep(index)}>{label}</button>
          ))}
        </div>
      </div>
    </Story>
  );
}
