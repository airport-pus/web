'use client';

import styled, { keyframes } from 'styled-components';

const revealHero = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const riseHero = keyframes`
  from { transform: translateY(22px); }
  to { transform: translateY(0); }
`;

// :where로 선택자의 우선순위를 높이지 않고 이 컴포넌트 안에서만 적용한다.
// 뒤쪽 선언과 미디어 쿼리가 앞쪽 스타일을 덮어쓰므로 순서를 유지한다.
export const FlightScroll = styled.section`
  :where(&) .showcase {
    height: 690px;
    max-width: 1560px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: #edf4ff;
    border-radius: 32px;
    isolation: isolate;
  }
  :where(&) .showcase-glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(ellipse at 8% 70%,#bfdde4,transparent 52%),radial-gradient(ellipse at 80% 0%,#c4c9fb,transparent 55%),radial-gradient(ellipse at 50% 80%,#e7f1fc,transparent 65%);
  }
  :where(&) .showcase-glow:after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#fff9 1.5px,transparent 1.5px);
    background-size: 22px 22px;
    mask-image: linear-gradient(90deg,#000,transparent 35%,transparent 80%,#000);
  }
  :where(&) .product-window {
    position: absolute;
    top: 55px;
    left: 21%;
    right: 5%;
    height: 535px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 22px;
    box-shadow: 0 28px 80px #41588922;
    overflow: hidden;
  }
  :where(&) .window-bar {
    height: 60px;
    border-bottom: 1px solid #e9edf2;
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 0 24px;
    background: #f9fbfddd;
    font-size: 12px;
    color: #7e8898;
  }
  :where(&) .window-bar strong {
    font-size: 17px;
    color: #191f28;
    display: flex;
    gap: 7px;
    align-items: center;
  }
  :where(&) .window-bar img {
    width: 25px;
  }
  :where(&) .airport-chip {
    margin-left: auto;
    background: #fff;
    padding: 7px 12px;
    border-radius: 9px;
  }
  :where(&) .product-body {
    display: flex;
    height: calc(100% - 60px);
  }
  :where(&) .product-summary {
    width: 34%;
    padding: 27px 24px;
    position: relative;
    z-index: 1;
  }
  :where(&) .mini-label {
    font-size: 10px;
    color: #8995a6;
  }
  :where(&) .product-summary h2 {
    font-size: 25px;
    line-height: 1.4;
    margin: 10px 0;
  }
  :where(&) .product-summary>p {
    font-size: 11px;
    color: #8b95a1;
    line-height: 1.7;
  }
  :where(&) .flight-mini {
    margin-top: 20px;
    border: 1px solid #eaf0f6;
    padding: 15px;
    border-radius: 14px;
    background: #fff;
  }
  :where(&) .flight-mini>span {
    font-size: 10px;
    color: #8b95a1;
  }
  :where(&) .flight-mini>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #3182f6;
  }
  :where(&) .flight-mini b {
    font-size: 25px;
    color: #253b55;
  }
  :where(&) .flight-mini p {
    font-size: 9px;
    color: #8b95a1;
    margin: 3px 0 10px;
  }
  :where(&) .flight-mini p>span,
  :where(&) .flight-mini em {
    float: right;
  }
  :where(&) .flight-mini em {
    font-style: normal;
    color: #3182f6;
  }
  :where(&) .flight-mini hr {
    border: 0;
    border-top: 1px dashed #dbe3ee;
    margin: 15px 0;
  }
  :where(&) .flight-mini>strong {
    font-size: 21px;
    color: #253b55;
  }
  :where(&) .flight-mini strong small {
    font-size: 9px;
    font-weight: 400;
    color: #8b95a1;
  }
  :where(&) .demo-visual {
    position: relative;
    width: 66%;
    overflow: hidden;
    background: #fff;
  }
  :where(&) #scene {
    position: absolute;
    inset: 0;
    transition: opacity .45s;
  }
  :where(&) #scene canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  :where(&) .demo-caption {
    position: absolute;
    bottom: 22px;
    left: 22px;
    right: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #6b7d94;
  }
  :where(&) .live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3182f6;
  }
  :where(&) .phone-preview {
    position: absolute;
    left: 7%;
    top: 190px;
    width: 225px;
    border: 7px solid #23344c;
    border-radius: 37px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 22px 50px #253b5533;
    transform: rotate(-5deg);
  }
  :where(&) .phone-preview img {
    display: block;
    width: 100%;
  }
  :where(&) .demo-note {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 10px;
    color: #8492a7;
  }
  @media (min-width:1600px) {
    :where(&) .showcase {
      height: 760px;
    }
    :where(&) .product-window {
      height: 590px;
    }
    :where(&) .phone-preview {
      width: 260px;
    }
    :where(&) .product-summary {
      padding: 40px;
    }
    :where(&) .product-summary h2 {
      font-size: 30px;
    }
  }
  @media (max-width:800px) {
    :where(&) .showcase {
      border-radius: 22px;
      height: 520px;
      margin: 0 14px;
    }
    :where(&) .product-window {
      left: 10%;
      right: 5%;
      top: 35px;
      height: 380px;
    }
    :where(&) .window-bar {
      height: 44px;
      padding: 0 14px;
    }
    :where(&) .window-bar>span:not(.airport-chip) {
      display: none;
    }
    :where(&) .airport-chip {
      font-size: 9px;
    }
    :where(&) .product-body {
      height: calc(100% - 44px);
    }
    :where(&) .product-summary {
      display: none;
    }
    :where(&) .demo-visual {
      width: 100%;
    }
    :where(&) .phone-preview {
      width: 125px;
      left: 3%;
      top: 210px;
      border-width: 4px;
      border-radius: 21px;
    }
    :where(&) .demo-caption {
      left: auto;
      right: 12px;
      bottom: 18px;
      font-size: 9px;
      gap: 10px;
    }
    :where(&) .demo-note {
      font-size: 8px;
    }
  }
  @media (min-width:801px) {
    :where(&) .phone-preview {
      left: 4%;
      width: 200px;
    }
  }
  @media (min-width:1600px) {
    :where(&) .phone-preview {
      width: 240px;
    }
  }
  :where(&) .showcase {
    max-width: 1320px;
    height: 700px;
    margin: 0 auto;
    border-radius: 32px;
  }
  :where(&) .product-window {
    top: 80px;
    left: 27%;
    right: 8%;
    height: 560px;
  }
  :where(&) .product-summary {
    width: 36%;
    padding: 27px 20px;
  }
  :where(&) .demo-visual {
    width: 64%;
  }
  :where(&) .phone-preview {
    left: 8%;
    top: 240px;
    width: 235px;
    transform: none;
    border-radius: 37px;
  }
  :where(&) .demo-note {
    bottom: 10px;
  }
  @media (max-width:1400px) {
    :where(&) .showcase {
      margin: 0 40px;
    }
    :where(&) .product-summary h2 {
      font-size: 23px;
    }
    :where(&) .phone-preview {
      width: 210px;
    }
  }
  @media (max-width:1000px) and (min-width:801px) {
    :where(&) .product-summary {
      display: none;
    }
    :where(&) .demo-visual {
      width: 100%;
    }
  }
  @media (max-width:800px) {
    :where(&) .showcase {
      height: 470px;
      margin: 0 20px;
      border-radius: 24px;
    }
    :where(&) .product-window {
      top: 38px;
      left: 19%;
      right: 5%;
      height: 370px;
    }
    :where(&) .product-summary {
      display: none;
    }
    :where(&) .demo-visual {
      width: 100%;
    }
    :where(&) .phone-preview {
      left: 5%;
      top: 200px;
      width: 120px;
      border-radius: 21px;
    }
    :where(&) .demo-caption {
      font-size: 8px;
    }
    :where(&) .demo-note {
      bottom: 9px;
    }
  }
  :where(&).flight-scroll {
    height: 250svh;
    position: relative;
    margin-bottom: 140px;
  }
  :where(&) .flight-stage {
    position: sticky;
    top: 80px;
    height: min(72svh,700px);
    background: #edf5ff;
    isolation: isolate;
    overflow: hidden;
  }
  :where(&) .flight-stage #scene {
    inset: 0;
    transition: none;
  }
  :where(&) .flight-stage-caption {
    position: absolute;
    left: 36px;
    right: 36px;
    bottom: 28px;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    font-size: 12px;
    color: #526b89;
  }
  :where(&) .flight-stage-caption span:last-child {
    font-size: 10px;
    letter-spacing: 1.5px;
  }
  @media (max-width:800px) {
    :where(&).flight-scroll {
      height: 215svh;
      margin-bottom: 80px;
    }
    :where(&) .flight-stage {
      height: 65svh;
      top: 80px;
    }
    :where(&) .flight-stage-caption {
      left: 20px;
      right: 20px;
      bottom: 22px;
      font-size: 10px;
    }
    :where(&) .flight-stage-caption span:last-child {
      font-size: 8px;
    }
  }
  :where(&) .flight-stage {
    --stage-height: min(72svh,700px);
    height: var(--stage-height);
    top: calc(60px + (100svh - 60px - var(--stage-height))/2);
  }
  @media (max-width:800px) {
    :where(&) .flight-stage {
      --stage-height: 65svh;
    }
  }
  :where(&) .flight-stage #scene {
    contain: paint;
    isolation: isolate;
  }
  .hero-poster {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .hero-poster img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    max-width: none;
    height: 100%;
  }
  @media (prefers-reduced-motion: no-preference) {
    :where(&) .flight-stage {
      animation: ${riseHero} 620ms cubic-bezier(.2,.7,.25,1);
    }
    :where(&) #scene > canvas {
      animation: ${revealHero} 160ms ease-out backwards;
    }
  }
`;
