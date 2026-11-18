'use client';

import styled from 'styled-components';

// :where scopes these existing selectors without increasing their specificity.
// Keep rule order: later declarations and media queries intentionally override earlier ones.
export const SiteFooter = styled.footer`
  :where(&).footer {
    background: #f8f9fb;
    padding: 55px 0;
  }
  :where(&).footer>.wrap {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
  :where(&) .footer-title {
    font-size: 26px;
    font-weight: 650;
    color: #6b7684;
  }
  :where(&) .footer-info {
    font-size: 12px;
    color: #8b95a1;
  }
  :where(&) .footer-info strong {
    color: #4e5968;
    font-size: 16px;
  }
  :where(&) .footer-info a {
    text-decoration: none;
  }
  :where(&) .footer-info small {
    display: block;
    margin-top: 25px;
  }
  @media (max-width:800px) {
    :where(&).footer>.wrap {
      display: block;
    }
    :where(&) .footer-title {
      margin-bottom: 25px;
    }
  }
`;
