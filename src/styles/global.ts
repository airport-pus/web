'use client';
import { withBasePath } from '../site-path';


import { createGlobalStyle } from 'styled-components';

// 공통 기본값과 레이아웃 유틸리티의 적용 순서를 유지한다.
export const GlobalStyles = createGlobalStyle`
  @font-face { font-family: Outfit; src: url("${withBasePath('/fonts/outfit-500.ttf')}") format("truetype"); font-style:normal; font-weight:500; font-display:swap; }
  :root {
    --ink: #191f28;
    --ink2: #4e5968;
    --ink3: #8b95a1;
    --blue: #3182f6;
  }
  * {
    box-sizing: border-box;
  }
  html {
    -webkit-text-size-adjust: 100%;
    scroll-padding-top: 60px;
  }
  body {
    margin: 0;
    background: #f7f9fc;
    color: var(--ink2);
    font: 17px/1.65 Pretendard,-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Noto Sans KR",sans-serif;
    word-break: keep-all;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: inherit;
  }
  h1,
  h2,
  h3 {
    color: var(--ink);
    margin: 0;
    font-weight: 700;
    letter-spacing: -.02em;
  }
  .wrap {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 24px;
  }
  :focus-visible {
    outline: 2px solid #3182f6;
    outline-offset: 5px;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    background: #fff;
  }
  .content-width {
    max-width: 1120px;
    margin: auto;
    padding-left: 28px;
    padding-right: 28px;
  }
  @media (prefers-reduced-motion:reduce) {
    html {
      scroll-behavior: auto;
    }
    * {
      transition: none !important;
    }
  }
  .section-shell {
    max-width: 1320px;
    margin: 0 auto;
  }
  .section-eyebrow {
    font-size: 14px;
    color: #3182f6;
    font-weight: 600;
    margin: 0 0 22px;
  }
  @media (max-width:1400px) {
    .section-shell {
      margin-left: 40px;
      margin-right: 40px;
    }
  }
  @media (max-width:800px) {
    .section-shell {
      margin-left: 24px;
      margin-right: 24px;
    }
    .section-eyebrow {
      font-size: 11px;
      margin-bottom: 15px;
    }
  }
`;
