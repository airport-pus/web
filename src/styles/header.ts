'use client';

import styled from 'styled-components';

// :where로 선택자의 우선순위를 높이지 않고 이 컴포넌트 안에서만 적용한다.
// 뒤쪽 선언과 미디어 쿼리가 앞쪽 스타일을 덮어쓰므로 순서를 유지한다.
export const SiteHeader = styled.header`
  :where(&).top {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(255,255,255,.68);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: transform 280ms cubic-bezier(.22,.7,.3,1);
  }
  :where(&).top[data-hidden='true'] {
    transform: translateY(-100%);
    pointer-events: none;
  }
  :where(&).top:focus-within {
    transform: translateY(0);
    pointer-events: auto;
  }
  :where(&).top .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: 60px;
  }
  :where(&) .brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    white-space: nowrap;
    text-decoration: none;
    color: var(--ink);
    font-weight: 700;
    font-size: 18px;
    line-height: 1;
  }
  :where(&) .brand img {
    display: block;
    width: auto;
    height: 30px;
    object-fit: contain;
    border-radius: 0;
  }
  :where(&).top nav {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 15px;
    white-space: nowrap;
    min-width: 0;
  }
  :where(&).top nav a,
  :where(&).top nav button {
    text-decoration: none;
    font: inherit;
    color: var(--ink2);
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  :where(&).top nav a:hover,
  :where(&).top nav button:hover {
    color: var(--ink);
  }
  :where(&).top nav .app-download {
    padding: 8px 13px;
    border-radius: 12px;
    background: #202124;
    color: #fff;
    font-weight: 500;
    line-height: 20px;
  }
  :where(&).top nav .app-download:hover { background: #35363a; color: #fff; }
  @media (max-width:400px) {
    :where(&).top .wrap, :where(&).top nav { gap: 8px; }
    :where(&) .brand img { height: 24px; }
    :where(&).top nav .app-download { padding-inline: 10px; }
  }
  @media (max-width:800px) {
    :where(&).top nav {
      font-size: 14px;
    }
  }
  :where(&).top .wrap {
    max-width: 1320px;
    width: calc(100% - 80px);
    padding: 0;
  }
  @media (max-width:800px) {
    :where(&).top .wrap {
      width: calc(100% - 48px);
    }
  }
`;
