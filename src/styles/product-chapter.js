'use client';

import styled from 'styled-components';

// App and MCP share the same chapter opener; their content follows below it.
export const ProductChapter = styled.header`
  border-top: 1px dashed #e4e6e9;
  padding: 96px 24px 76px;
  text-align: center;
  .chapter-eyebrow { margin: 0 0 24px; color: #343538; font-size: 16px; line-height: 1.5; font-weight: 400; }
  h2 { margin: 0; color: #19191c; font-size: 40px; line-height: 1.4; font-weight: 650; letter-spacing: -.035em; }
  .chapter-link { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; margin-top: 32px; padding: 12px 24px; border-radius: 100px; background: #242427; color: #fff; font-family: inherit; font-size: 15px; line-height: 1.5; text-decoration: none; transition: background .2s; }
  .chapter-link:hover { background: #414147; }
  @media (max-width: 800px) {
    padding: 64px 0 44px;
    .chapter-eyebrow { font-size: 13px; margin-bottom: 18px; }
    h2 { font-size: 28px; max-width: 520px; margin-inline: auto; }
    .chapter-link { min-height: 44px; margin-top: 24px; padding: 10px 21px; font-size: 13px; }
  }
`;
