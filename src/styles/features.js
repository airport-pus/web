'use client';

import styled from 'styled-components';

export const FeatureEditorial = styled.div`
  padding: 0 0 140px;
  scroll-margin-top: 100px;
  color: #202126;

  .feature-chapter { scroll-margin-top: 100px; min-width: 0; }
  .flight-chapter {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 64px;
    margin-bottom: 128px;
  }
  .chapter-label { font-size: 16px; font-weight: 500; color: #123c65; margin: 0 0 24px; }
  .chapter-copy h2 { font-size: clamp(32px, 3vw, 44px); line-height: 1.4; letter-spacing: -.045em; font-weight: 650; color: #202126; }
  .chapter-description { font-size: 17px; line-height: 1.85; color: #73767c; margin: 24px 0 0; letter-spacing: -.02em; }
  .feature-points { display: flex; flex-wrap: wrap; gap: 0; margin-top: 32px; font-size: 14px; color: #444b54; }
  .feature-points span + span::before { content: ''; display: inline-block; width: 1px; height: 12px; background: #d8dde3; margin: 0 16px; vertical-align: -1px; }
  .chapter-visual { position: relative; isolation: isolate; overflow: hidden; border-radius: 32px; }
  .flight-visual {
    height: 580px;
    background: radial-gradient(ellipse at 85% 10%, #cce7ef 0, transparent 60%), linear-gradient(145deg, #eaf1ff, #dce9f9 55%, #e8e8fa);
  }
  .feature-canvas { position: absolute; pointer-events: none; overflow: hidden; contain: paint; }
  .feature-canvas canvas { display: block; width: 100%; height: 100%; visibility: hidden; }
  .feature-canvas.scene-active canvas { visibility: visible; }
  .flight-visual .feature-canvas { width: 100%; height: 310px; top: -36px; left: 0; }
  .flight-preview { position: absolute; width: 380px; left: 50%; top: 200px; transform: translateX(-50%); padding: 25px 27px 20px; background: #fff; border: 1px solid #ffffffa8; border-radius: 22px; box-shadow: 0 20px 50px #22385812, 0 2px 4px #22385805; }
  .preview-heading { display: flex; justify-content: space-between; align-items: center; color: #8b9099; font-size: 11px; }
  .preview-brand { display: flex; gap: 6px; align-items: center; color: #123c65; font-size: 18px; font-weight: 700; }
  .preview-airport { margin-top: 22px; font-size: 21px; font-weight: 650; letter-spacing: -.04em; }
  .preview-airport > span { color: #a3a8b0; font-size: 13px; font-weight: 500; margin-left: 5px; }
  .preview-tabs { display: flex; gap: 24px; font-size: 13px; color: #979ca5; border-bottom: 1px solid #edf0f3; margin-top: 10px; }
  .preview-tabs > span { padding: 9px 1px; }
  .preview-tabs .selected { color: #123c65; font-weight: 600; border-bottom: 2px solid #123c65; }
  .flight-summary { display: flex; align-items: center; gap: 20px; padding: 20px 0; }
  .small-label { display: block; font-size: 12px; color: #7d8591; font-weight: 400; }
  .flight-summary strong { display: block; font-size: 28px; line-height: 1.3; letter-spacing: -.04em; font-weight: 600; margin-top: 3px; }
  .flight-destination { flex: 1; }
  .flight-destination b { display: block; font-size: 17px; font-weight: 600; }
  .flight-destination b span { font-size: 11px; color: #939ca8; font-weight: 400; margin-left: 3px; }
  .flight-destination > span { font-size: 10px; color: #89919e; display: block; margin-top: 4px; }
  .flight-status { color: #28765e; background: #ecf6f1; border-radius: 6px; padding: 5px 8px; font-size: 11px; white-space: nowrap; }
  .flight-details { display: flex; justify-content: space-between; border-top: 1px solid #f0f2f4; padding-top: 12px; font-size: 11px; color: #8b929d; }
  .flight-details b { color: #354254; margin-left: 6px; font-weight: 600; }


  .feature-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  .compact-chapter .chapter-copy { padding: 0 0 32px; }
  .compact-chapter .chapter-label { margin-bottom: 18px; }
  .compact-chapter h2 { font-size: 36px; }
  .compact-chapter .chapter-description { margin-top: 18px; font-size: 16px; }
  .compact-chapter .chapter-visual { height: 540px; }
  .crowd-visual { background: radial-gradient(ellipse at 20% 0, #dbefeb, transparent 65%), #edf3f1; }
  .parking-visual { background: radial-gradient(ellipse at 85% 0, #e4e5fa, transparent 65%), #edf0f8; }
  .crowd-readout, .parking-readout { position: absolute; top: 36px; left: 36px; right: 36px; background: #ffffffed; border-radius: 20px; padding: 24px 28px; box-shadow: 0 12px 35px #29394b06; z-index: 1; }
  .crowd-readout strong { display: flex; align-items: center; gap: 10px; font-size: 28px; font-weight: 600; color: #2b7865; letter-spacing: -.04em; margin-top: 4px; }
  .calm-dot { width: 7px; height: 7px; border-radius: 50%; background: #68b49b; }
  .crowd-scale { display: flex; gap: 5px; margin-top: 18px; }
  .crowd-scale i { flex: 1; height: 6px; background: #edf1ef; border-radius: 8px; }
  .crowd-scale i:nth-child(-n+2) { background: #75baa4; }
  .scale-labels { display: flex; justify-content: space-between; font-size: 10px; color: #959d9b; margin-top: 7px; }
  .compact-chapter .feature-canvas { width: 100%; height: 330px; left: 0; top: 185px; }
  .scene-note { position: absolute; bottom: 22px; left: 15px; right: 15px; text-align: center; font-size: 12px; color: #77858b; }
  .parking-readout { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; }
  .parking-readout strong { display: flex; align-items: baseline; gap: 9px; font-size: 42px; font-weight: 600; line-height: 1.35; color: #123c65; letter-spacing: -.04em; margin-top: 5px; }
  .parking-readout strong > span { font-size: 13px; font-weight: 400; letter-spacing: -.02em; color: #7d8591; }
  .parking-sign { display: grid; place-items: center; border-radius: 13px; background: #edf2fb; color: #123c65; width: 52px; height: 52px; font-size: 30px; font-weight: 600; }
  .parking-availability { width: 100%; display: flex; align-items: center; gap: 6px; border-top: 1px solid #edf0f4; margin-top: 15px; padding-top: 12px; font-size: 11px; color: #798695; }
  .parking-availability i { width: 5px; height: 5px; border-radius: 50%; background: #75baa4; }

  @media (prefers-reduced-motion: no-preference) {
    .chapter-visual { transition: transform .8s cubic-bezier(.22,1,.36,1); }
    .feature-chapter:not(.has-entered) .chapter-visual { transform: translateY(24px); }
  }
  @media (max-width: 1100px) {
    .flight-chapter { gap: 32px; }
    .chapter-copy h2 { font-size: 32px; }
    .chapter-description { font-size: 15px; }
    .flight-preview { width: calc(100% - 48px); padding: 22px; }
    .flight-summary { gap: 12px; }
    .compact-chapter h2 { font-size: 30px; }
    .compact-chapter .chapter-description { font-size: 14px; }
    .crowd-readout, .parking-readout { left: 24px; right: 24px; padding: 22px; }
  }
  @media (max-width: 800px) {
    padding-bottom: 80px;
    .flight-chapter { grid-template-columns: 1fr; gap: 28px; margin-bottom: 72px; }
    .chapter-label, .compact-chapter .chapter-label { font-size: 14px; margin-bottom: 16px; }
    .chapter-copy h2, .compact-chapter h2 { font-size: clamp(27px, 4.5vw, 36px); line-height: 1.4; }
    .chapter-description, .compact-chapter .chapter-description { font-size: 14px; line-height: 1.85; margin-top: 18px; }
    .feature-points { margin-top: 22px; font-size: 12px; }
    .feature-points span + span::before { margin: 0 12px; height: 10px; }
    .chapter-visual { border-radius: 24px; }
    .flight-visual { height: 540px; }
    .flight-visual .feature-canvas { height: 270px; top: -24px; }
    .flight-preview { top: 180px; width: min(380px, calc(100% - 36px)); padding: 20px; border-radius: 18px; }
    .feature-pair { grid-template-columns: 1fr; gap: 64px; }
    .compact-chapter .chapter-copy { padding-bottom: 26px; }
    .compact-chapter .chapter-visual { height: 500px; }
    .crowd-readout, .parking-readout { top: 24px; left: 24px; right: 24px; padding: 20px 22px; border-radius: 18px; }
    .compact-chapter .feature-canvas { top: 170px; height: 300px; }
    .crowd-readout strong { font-size: 26px; }
    .scene-note { font-size: 11px; }
  }
  @media (max-width: 360px) {
    .chapter-copy h2, .compact-chapter h2 { font-size: 25px; }
    .chapter-description br { display: none; }
    .flight-preview { padding: 16px; }
    .flight-summary { gap: 9px; }
    .flight-summary strong { font-size: 24px; }
    .flight-status { font-size: 10px; padding: 4px 6px; }
    .parking-readout strong { font-size: 36px; }
    .parking-sign { width: 42px; height: 42px; }
  }
`;
