'use client';
import styled from 'styled-components';
import { landingTitle } from './hero';

export const LandingEnding = styled.section`
  position: relative;
  isolation: isolate;
  text-align: center;
  padding: clamp(72px, 7vw, 112px) 20px;
  background: #fff;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: radial-gradient(#bdc9d4 .7px, transparent .9px);
    background-size: 12px 12px;
    opacity: .43;
    mask-image: radial-gradient(ellipse at center, #000 10%, transparent 73%);
  }
  .closing-app-icon {
    display: grid;
    place-items: center;
    width: 60px;
    height: 60px;
    margin: 0 auto 20px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 16px #34475a15;
  }
  h2 { ${landingTitle} margin: 0; }
  p { margin: 14px 0 24px; font-size: clamp(14px, 1.3vw, 17px); color: #646d78; }
  .store-picker { width: fit-content; margin: auto; }
  summary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: fit-content;
    margin: auto;
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
