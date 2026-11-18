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
    width: 28px;
    height: 28px;
    object-fit: contain;
    border-radius: 0;
  }
  :where(&).top nav {
    display: flex;
    gap: 28px;
    font-size: 15px;
    white-space: nowrap;
    min-width: 0;
  }
  :where(&).top nav button {
    font: inherit;
    color: var(--ink2);
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  :where(&).top nav button:hover {
    color: var(--ink);
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
