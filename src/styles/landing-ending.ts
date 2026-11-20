'use client';
import styled, { keyframes } from 'styled-components';
import { landingTitle } from './hero';

const routeDrift = keyframes`
 from {transform:translateX(-1.5%) rotate(-8deg)} to {transform:translateX(1.5%) rotate(-5deg)}
`;

export const LandingEnding = styled.div`
  position:relative; isolation:isolate; overflow:hidden; background:linear-gradient(#eaf4fb,#f8fbfd 70%,white);
  .closing-panel {position:relative; isolation:isolate; overflow:hidden; text-align:center; padding:clamp(70px,8vw,120px) 20px 64px;}
  .closing-panel::before {content:''; position:absolute; z-index:-1; inset:-35%;
    background:repeating-radial-gradient(ellipse at 80% 130%,transparent 0 54px,#86b1ce3d 55px,transparent 57px 98px);
    mask-image:linear-gradient(90deg,#000,transparent 48%,#000);}
  @media(prefers-reduced-motion:no-preference){.closing-panel::before{animation:${routeDrift} 10s ease-in-out infinite alternate}}
  .closing-app-icon {display:grid;place-items:center;width:60px;height:60px;border-radius:16px;background:white;margin:0 auto 20px;box-shadow:0 4px 20px #40607814}
  h2 { ${landingTitle} font-size:clamp(46px,6vw,86px);line-height:1.13;letter-spacing:-.055em;margin:0;}
  .closing-content > p {color:#53687a;font-size:16px;margin:16px 0 24px}
  .store-picker {width:fit-content;margin:auto}
  .airport-directory {display:grid;grid-template-columns:repeat(4,1fr);padding:20px 0 36px;gap:16px;border-bottom:1px solid #d7e4ed}
  .airport-directory p {grid-column:1/-1;margin:0;color:#526b7e;font-size:14px}
  .airport-directory div {display:grid;gap:3px}
  .airport-directory b {font-size:clamp(30px,4vw,60px);line-height:1.08;color:#274256;letter-spacing:-.04em}
  .airport-directory span {color:#4b6172;font-size:14px}
  @media(max-width:600px){.airport-directory{grid-template-columns:repeat(2,1fr)}}
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
