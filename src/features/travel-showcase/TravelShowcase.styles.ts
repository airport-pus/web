import styled from 'styled-components';
import { landingTitle } from '../../styles/hero';
export const Showcase = styled.section`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 60px) clamp(88px, 11vw, 170px);
  scroll-margin-top: 60px;
  .feature-intro {
    --title-offset: clamp(28px, 3vw, 52px);
    padding: calc(clamp(92px, 8vw, 152px) + var(--title-offset)) 0 clamp(20px, 2vw, 32px);
    text-align: center;
    color: #191f28;
  }
  .feature-intro h2 {
    ${landingTitle} margin:0;
    font-size: min(6.6vw, 64px);
    white-space: nowrap;
    font-weight: 700;
    line-height: 1.26;
    letter-spacing: -0.048em;
  }
  .feature-intro p {
    margin: calc(clamp(78px, 7vw, 132px) - var(--title-offset)) auto 0;
    font-size: clamp(18px, 1.45vw, 26px);
    font-weight: 650;
    line-height: 1.75;
    letter-spacing: -0.045em;
    word-break: keep-all;
    text-wrap: balance;
  }
  .feature-intro p span {
    display: inline-block;
    padding: 0 0.38em;
    border-radius: 0.38em;
    background: #f1f3f5;
    color: #505966;
    font-size: 0.83em;
    line-height: 1.55;
    vertical-align: 0.06em;
  }
  .feature-intro h2 img {
    width: 1em;
    height: 1em;
    vertical-align: -0.12em;
  }
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  article {
    min-width: 0;
  }
  .feature-visual {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    height: clamp(350px, 31vw, 430px);
    background: #d3e8fa url('/assets/feature-sky.webp') center/cover;
  }
  article:first-child .feature-visual {
    border-radius: 32px 0 0 32px;
  }
  article:last-child .feature-visual {
    border-radius: 0 32px 32px 0;
  }
  .feature-model,
  .scene-fallback {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .scene-fallback,
  .feature-visual video {
    object-fit: contain;
  }
  .feature-visual:is([data-media-slot='crowd'], [data-media-slot='parking']) :is(.scene-fallback, video) {
    object-fit: cover;
  }
  .feature-visual video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .feature-model canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  .feature-visual:has([data-ready]) .scene-fallback,
  .feature-visual:has(video) .scene-fallback {
    display: none;
  }
  .scene-reading {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 14px;
    border-radius: 24px;
    white-space: nowrap;
    background: #ffffffe8;
    color: #354c60;
    font-size: 14px;
    pointer-events: none;
  }
  .scene-reading b {
    margin-left: 5px;
  }

  .segment-reading {
    display: grid;
    gap: 3px;
    border-radius: 14px;
    padding: 9px 14px;
    background: rgba(255,255,255,.96);
    line-height: 1.4;
  }
  .segment-reading small { font-size: 12px; color: #53616c; }
  .segment-reading span { font-weight: 600; color: #233749; }
  .segment-reading b { display: inline-block; padding: 2px 7px; border-radius: 6px; font-size: 12px; }
  .segment-reading [data-level='원활'] { background: #e3f4ed; color: #22624a; }
  .segment-reading [data-level='보통'] { background: #edf1f5; color: #41596b; }
  .segment-reading [data-level='혼잡'] { background: #fce9dc; color: #93431e; }

  article h3,
  article > p,
  .demo-choices,
  .replay-search {
    margin-inline: clamp(12px, 1.5vw, 24px);
  }
  article h3 {
    margin-block: 20px 7px;
    font-size: clamp(19px, 1.65vw, 24px);
    line-height: 1.4;
    letter-spacing: -0.035em;
    font-weight: 600;
  }
  article > p {
    margin-block: 0;
    font-size: 15px;
    line-height: 1.7;
    color: #53616c;
  }
  .demo-choices {
    display: flex;
    gap: 4px;
    margin-top: 14px;
  }
  button {
    font: inherit;
    font-size: 14px;
    cursor: pointer;
    border: 0;
    border-radius: 10px;
  }
  .demo-choices button {
    padding: 6px 11px;
    background: #f4f6f8;
    color: #576774;
  }
  .demo-choices button[aria-pressed='true'] {
    background: #e2eff9;
    color: #224c6b;
    font-weight: 600;
  }
  .replay-search {
    margin-top: 14px;
    background: #f4f6f8;
    color: #314d61;
    padding: 6px 11px;
  }
  @media (max-width: 800px) {
    .feature-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .feature-grid article .feature-visual {
      height: 340px;
      border-radius: 24px;
    }
    article h3,
    article > p,
    .demo-choices,
    .replay-search {
      margin-inline: 0;
    }
    article h3 {
      font-size: 22px;
      margin-top: 14px;
    }
  }
`;
