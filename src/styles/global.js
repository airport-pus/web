'use client';

import { createGlobalStyle } from 'styled-components';

// Shared defaults and layout utilities keep their original cascade order.
export const GlobalStyles = createGlobalStyle`
  :root {
    --ink: #191f28;
    --ink2: #4e5968;
    --ink3: #8b95a1;
    --blue: #3182f6;
    /* Motion tokens: strong ease-out for UI feedback and entrances. */
    --ease-out: cubic-bezier(.23, 1, .32, 1);
    --ease-in-out: cubic-bezier(.77, 0, .175, 1);
    /* Shared chip/toggle colors used by every small option button. */
    --chip-bg: #f1f4f7;
    --chip-bg-hover: #e6ecf1;
    --chip-ink: #4a5966;
    --chip-on-bg: #e2eff9;
    --chip-on-ink: #1d4a6b;
    --chip-on-ring: #b9d6ec;
  }
  ::selection {
    background: #cfe5f8;
    color: #0d2a40;
  }
  button, summary, a {
    -webkit-tap-highlight-color: transparent;
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
    outline-offset: 3px;
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
  /* Shared chip: small toggle/option buttons across the landing sections. */
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 40px;
    padding: 0 16px;
    border: 0;
    border-radius: 999px;
    background: var(--chip-bg);
    color: var(--chip-ink);
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    cursor: pointer;
    transition: background-color .15s ease, color .15s ease, box-shadow .15s ease, transform .16s var(--ease-out);
  }
  .chip[aria-pressed=true] {
    background: var(--chip-on-bg);
    color: var(--chip-on-ink);
    box-shadow: inset 0 0 0 1px var(--chip-on-ring);
  }
  .chip:active:not(:disabled) {
    transform: scale(.97);
  }
  .chip:disabled {
    cursor: default;
    opacity: .55;
  }
  @media (hover:hover) and (pointer:fine) {
    .chip:not(:disabled):not([aria-pressed=true]):hover {
      background: var(--chip-bg-hover);
    }
  }
  @media (pointer:coarse) {
    .chip { min-height: 44px; }
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
