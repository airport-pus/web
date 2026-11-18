'use client';

import styled from 'styled-components';

// :where scopes these existing selectors without increasing their specificity.
// Keep rule order: later declarations and media queries intentionally override earlier ones.
export const SiteHeader = styled.header`
  :where(&).top {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(255,255,255,.92);
    /* Match the original Next.js CSS output, which retained only the WebKit declaration. */
    -webkit-backdrop-filter: blur(10px);
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
    background: #f1f2f4;
    color: #343941;
    font-weight: 500;
    line-height: 20px;
  }
  :where(&).top nav .app-download:hover { background: #e8eaed; }
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
