'use client';
import styled from 'styled-components';

export const LandingEnding = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: calc(100dvh - 60px);
  background: #fff;

  .closing-panel {
    display: grid;
    place-items: center;
    padding: clamp(20px, 4vh, 48px) 0;
  }
  .closing-content { text-align: center; }
  .closing-content h2 {
    font-weight: 600;
    letter-spacing: -.02em;
    margin: 0;
    font-size: clamp(50px, 7vw, 100px);
    line-height: 1.2;
    color: var(--ink);
  }
  .store-picker { width: fit-content; margin: clamp(24px, 4vh, 40px) auto 0; }
  summary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: fit-content;
    margin: 0 auto;
    min-height: 44px;
    padding: 0 22px;
    border-radius: 999px;
    background: #202124;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    list-style: none;
  }
  summary::-webkit-details-marker { display: none; }
  summary span { font-size: 22px; line-height: 1; }
  details[open] summary span { transform: rotate(90deg); }
  .store-options { display: flex; gap: 8px; justify-content: center; margin-top: 12px; }
  .store-options > * {
    background: #fff; color: #343b45; font: inherit; font-size: 14px;
    border: 1px solid #e3e6e9; border-radius: 12px; padding: 10px 16px;
    text-decoration: none; cursor: pointer;
  }
`;
