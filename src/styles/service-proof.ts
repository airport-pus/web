'use client';
import styled from 'styled-components';

export const ServiceProof = styled.section`
  scroll-margin-top: 84px;
  .sources {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8px 40px;
    padding: clamp(28px, 4vw, 54px) 0;
    border-block: 1px solid #ebedf0;
  }
  h2 { grid-row: span 3; font-size: 22px; font-weight: 600; }
  p { margin: 0; font-size: 15px; color: #505966; }
  .source-links { display: flex; flex-wrap: wrap; gap: 8px 20px; }
  a { font-size: 14px; color: #324d64; text-underline-offset: 4px; }
  small { font-size: 12px; color: #707986; }
  @media (max-width: 800px) {
    .sources { grid-template-columns: 1fr; gap: 12px; }
    h2 { grid-row: auto; }
  }
`;
