'use client';
import styled from 'styled-components';

export const SiteFooter = styled.footer`
  position: relative;
  z-index: 1;
  background: transparent;
  padding: 32px 0 38px;
  color: #63717e;
  font-size: 12px;
  line-height: 1.8;
  .section-shell { display:grid; grid-template-columns:auto 1fr auto; gap:12px 24px; align-items:center; }
  img { display:block; filter:grayscale(1); opacity:.55; }
  .footer-info { display:grid; gap:2px; }
  .contact, nav { display:flex; align-items:center; flex-wrap:wrap; column-gap:8px; }
  nav { column-gap:20px; }
  nav a { display:inline-flex; align-items:center; min-height:36px; }
  a { text-decoration:none; }
  a:hover { text-decoration:underline; text-underline-offset:4px; }
  @media (max-width:760px) {
    padding:24px 0 32px;
    .section-shell { grid-template-columns:auto 1fr; gap:6px 12px; }
    .footer-info { grid-row:2; grid-column:1 / -1; }
    nav { grid-column:2; grid-row:1; justify-self:end; column-gap:12px; }
  }
`;
