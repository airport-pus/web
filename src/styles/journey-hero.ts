'use client';
import styled, { keyframes } from 'styled-components';

const lightSweep = keyframes`
  from { background-position:0% 50%; }
  to { background-position:100% 50%; }
`;

const revealTitle = keyframes`
  from { opacity:0; transform:translateY(16px); }
  to { opacity:1; transform:translateY(0); }
`;
const revealScene = keyframes`
  from { opacity:0; transform:translateY(44px); }
  to { opacity:1; transform:translateY(0); }
`;

export const JourneyHeroLayout = styled.section`
  height:360svh; position:relative; background:#fff;
  .journey-stage { position:sticky; top:0; height:100svh; overflow:hidden; isolation:isolate; --expand:0; --aperture:0; --product:0; --screen:0; --title-opacity:1; }
  .journey-stage::before {
    content:''; position:absolute; inset:0; z-index:-1; pointer-events:none;
    background-image:linear-gradient(rgba(83,134,185,.075) 1px,transparent 1px),linear-gradient(90deg,rgba(83,134,185,.075) 1px,transparent 1px);
    background-size:128px 128px;
    mask-image:linear-gradient(transparent,#000 20%,#000 80%,transparent);
  }
  .journey-title { position:absolute; top:calc(51svh - 60px); width:100%; padding:0 30px; text-align:center; opacity:var(--title-opacity); transform:translateY(calc(-50% - var(--expand) * 100px)); }
  h1 { font-family:Outfit,sans-serif; font-size:clamp(40px,5.625vw,108px); font-weight:500; letter-spacing:-.025em; line-height:1; color:#171c23; word-break:normal; }
  .title-break { display:none; }
  .journey-brand {
    display:inline-block; white-space:nowrap;
    color:transparent; -webkit-text-fill-color:transparent;
    background:linear-gradient(110deg,#2563b9 0%,#3182f6 25%,#8bd2f5 50%,#3182f6 75%,#2563b9 100%);
    background-size:250% 100%; background-position:0% 50%;
    background-clip:text; -webkit-background-clip:text;
    animation:${lightSweep} 3.5s ease-in-out infinite alternate;
  }
  .journey-scene { position:absolute; top:calc((73.3svh - 60px) * (1 - var(--expand))); left:calc(11.85% * (1 - var(--expand))); width:calc(76.3% + 23.7% * var(--expand)); height:100svh; border-radius:calc(170px * (1 - var(--expand))) calc(170px * (1 - var(--expand))) 0 0; background:#5386b9; overflow:hidden; isolation:isolate; }
  h1 { animation:${revealTitle} 1200ms cubic-bezier(.22,.7,.3,1) both paused; }
  .journey-scene { animation:${revealScene} 2700ms cubic-bezier(.22,.7,.3,1) 550ms both paused; }
  &[data-intro='playing'] {
    h1,.journey-scene { animation-play-state:running; }
  }
  @media(max-width:800px) {
    height:330svh;
    .journey-title { top:calc(38svh - 60px); padding:0 20px; }
    h1 { font-size:8vw; }
    .brand-phrase, .title-break { display:block; }
    .journey-scene { top:calc((55svh - 60px) * (1 - var(--expand))); left:calc(5% * (1 - var(--expand))); width:calc(90% + 10% * var(--expand)); border-radius:calc(80px * (1 - var(--expand))) calc(80px * (1 - var(--expand))) 0 0; }
  }
`;
