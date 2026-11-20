'use client';
import styled from 'styled-components';
import { landingTitle } from './hero';
import { skyCard, skyCardWide, cardStripRadius, cardTextInset, cardTitle, cardText, sectionFrame } from './feature-card';

export const LandingEnding = styled.div`
  position:relative; background:white;
  /* Closing: one wide sky card with the feature-intro title voice. */
  .closing-panel { ${sectionFrame} padding-bottom:clamp(56px,6vw,88px); border-bottom:1px solid #e3ebf1; text-align:center; }
  .closing-panel:has(+ .airport-directory) { padding-bottom:0; border-bottom:0; }
  .closing-content { ${skyCardWide} border-radius:32px; padding:clamp(64px,8vw,112px) 24px; }
  .closing-app-icon {display:grid;place-items:center;width:60px;height:60px;border-radius:16px;background:white;margin:0 auto 22px;box-shadow:0 1px 2px #1d3a500d,0 8px 24px #1d3a500f}
  h2 { ${landingTitle} font-size:clamp(32px,4.6vw,60px); line-height:1.2; margin:0; }
  .closing-content > p { color:#3d4754; font-size:clamp(17px,1.35vw,21px); font-weight:500; letter-spacing:-.02em; margin:clamp(14px,1.4vw,22px) 0 28px; }
  .store-picker {width:fit-content;margin:auto}
  /* Supported airports: the feature grid's card strip, one card per airport. */
  .airport-directory { ${sectionFrame} padding-top:clamp(72px,8vw,120px); padding-bottom:clamp(56px,6vw,88px); border-bottom:1px solid #e3ebf1; }
  .airport-directory > p { margin:0 0 clamp(28px,3vw,44px); text-align:center; color:#3d4754; font-size:clamp(17px,1.35vw,21px); font-weight:500; letter-spacing:-.02em; }
  .airport-directory ul { list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); ${cardStripRadius('.airport-visual')} }
  .airport-directory li { min-width:0; }
  .airport-visual { ${skyCard} display:grid; place-items:end center; height:clamp(170px,15vw,220px); padding:0 12px; }
  .airport-illustration { display:block; width:min(100%,250px); height:auto; }
  .airport-directory b, .airport-directory span { display:block; ${cardTextInset} }
  .airport-directory b { ${cardTitle} margin-top:18px; color:#191f28; font-variant-numeric:tabular-nums; }
  .airport-directory span { ${cardText} margin-top:2px; }
  @media(max-width:800px){
    .closing-content { border-radius:24px; }
    .airport-directory ul { grid-template-columns:repeat(2,minmax(0,1fr)); gap:28px 12px; }
    .airport-visual { border-radius:24px; height:130px; padding:0 6px; }
    .airport-directory b, .airport-directory span { margin-inline:0; }
    .airport-directory b { margin-top:12px; }
  }
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
    transition: background-color .15s ease, transform .16s var(--ease-out);
  }
  summary:active { transform: scale(.97); }
  @media (hover:hover) and (pointer:fine) { summary:hover { background: #35363a; } .store-options > *:hover { background: #f4f7fa; } }
  summary::-webkit-details-marker { display: none; }
  summary span { font-size: 22px; line-height: 1; transition: transform .2s var(--ease-out); }
  details[open] summary span { transform: rotate(90deg); }
  .store-options { display: flex; gap: 8px; justify-content: center; margin-top: 12px; }
  .store-options > * {
    background: #fff; color: #343b45; font: inherit; font-size: 14px;
    border: 1px solid #e3e6e9; border-radius: 12px; padding: 10px 16px;
    text-decoration: none; cursor: pointer; min-height: 44px;
    transition: background-color .15s ease, transform .16s var(--ease-out);
  }
  .store-options > *:active { transform: scale(.97); }
  @keyframes options-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion:no-preference) { details[open] .store-options { animation: options-in .2s var(--ease-out); } }
`;
