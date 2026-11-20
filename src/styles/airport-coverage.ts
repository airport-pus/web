'use client';
import styled from 'styled-components';

export const AirportCoverage = styled.section`
  padding: 0 0 160px;
  text-align: center;
  h2 { margin: 0; color: #252a31; font-size: 28px; line-height: 1.5; font-weight: 600; letter-spacing: -.035em; }
  ul { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1320px; margin: 52px auto 0; padding: 0; list-style: none; }
  li { min-width: 0; color: #59616c; }
  .airport-photo { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 18px; margin: 0 auto 22px; }
  li:first-child .airport-photo { object-position: center 65%; }
  .airport-name { display: flex; align-items: baseline; justify-content: center; gap: 12px; }
  .airport-name > span:first-child { font-size: 26px; font-weight: 600; letter-spacing: -.03em; }
  .airport-code { font-size: 16px; font-weight: 400; letter-spacing: .06em; color: #969eaa; }
  @media (max-width: 800px) {
    padding-bottom: 100px;
    h2 { font-size: 22px; }
    ul { grid-template-columns: repeat(2, 1fr); gap: 32px 16px; margin-top: 40px; }
    .airport-name { gap: 8px; }
    .airport-photo { margin-bottom: 14px; border-radius: 12px; }
    .airport-name > span:first-child { font-size: 22px; }
    .airport-code { font-size: 13px; }
  }
`;
