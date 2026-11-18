'use client';
import styled from 'styled-components';

export const DataAndAI = styled.div`
  padding: 110px 0 130px;
  border-top: 1px solid #f0f0f3;
  scroll-margin-top: 60px;
  h2 { font-size: 42px; font-weight: 650; letter-spacing: -.045em; line-height: 1.4; color: #1d1d25; }
  .eyebrow { margin: 0 0 22px; font-size: 16px; color: #787384; }
  .mcp-intro { display: grid; grid-template-columns: .95fr 1.05fr; align-items: center; gap: 75px; }
  .mcp-copy > p:not(.eyebrow) { max-width: 450px; font-size: 17px; line-height: 1.9; color: #81808b; margin: 26px 0; }
  .question-example { margin-top: 32px; padding-left: 20px; border-left: 2px solid #cfc4ef; }
  .question-example > span { display: block; color: #a198b5; font-size: 12px; }
  .question-example strong { display: block; font-size: 20px; font-weight: 500; line-height: 1.7; color: #6e5c97; margin-top: 10px; }
  .mcp-status { display: block; font-size: 11px; color: #aaa4b6; margin-top: 28px; }
  .mcp-visual { border-radius: 32px; background: #f1edfc; overflow: hidden; }
  .story-scene { height: 540px; position: relative; }
  .scene-canvas { position: absolute; inset: 0; }
  .scene-canvas canvas { display: block; width: 100%; height: 100%; }
  .scene-fallback { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; padding: 28px; text-align: center; font-size: 14px; color: #9288a6; }
  .mcp-visual > p { color: #a598ba; font-size: 11px; text-align: center; margin: 0; padding: 0 20px 26px; }
  .demo-section { margin-top: 130px; }
  .ai-showcase { display: grid; grid-template-columns: 1fr 1fr; gap: 70px; align-items: center; scroll-margin-top: 100px; }
  .ai-copy > p:not(.eyebrow) { font-size: 16px; line-height: 1.9; color: #85828c; margin: 24px 0; }
  .demo-form { display: flex; padding: 7px; border: 1px solid #cec4df; border-radius: 40px; background: white; margin-top: 30px; box-shadow: 0 4px 18px #8775a908; }
  .demo-form:focus-within { outline: 2px solid #dcd1ee; outline-offset: 3px; }
  .demo-form input { min-width: 0; flex: 1; padding: 10px 14px; border: 0; outline: 0; font: inherit; font-size: 14px; color: #565164; background: transparent; }
  .demo-form input::placeholder { color: #aaa4b5; }
  .demo-form button { width: 42px; height: 42px; border: 0; border-radius: 50%; background: #7864a8; color: #fff; font-size: 23px; cursor: pointer; flex-shrink: 0; }
  .demo-form button:disabled { background: #d6d0df; cursor: default; }
  .demo-examples { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
  .demo-examples button { border: 0; border-radius: 20px; padding: 7px 12px; background: #f4f1f8; color: #8e839f; font: inherit; font-size: 12px; cursor: pointer; }
  .demo-examples button:disabled { opacity: .5; cursor: default; }
  .ai-copy .demo-disclosure { font-size: 11px!important; line-height: 1.8; color: #aaa4b2!important; margin: 20px 0 0!important; }
  .demo-connect { border: 0; padding: 0; background: none; font: inherit; font-size: 12px; color: #9384a7; margin-top: 18px; cursor: pointer; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
  .ai-preview { min-width: 0; background: #f7f5fa; padding: 32px; border-radius: 30px; }
  .chat-window { background: white; border-radius: 18px; padding: 26px; box-shadow: 0 12px 40px #52456b05; }
  .chat-header { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 13px; color: #68616f; padding-bottom: 22px; border-bottom: 1px solid #f1edf5; }
  .chat-header > span:first-child { display: flex; align-items: center; gap: 7px; }
  .chat-header > span:last-child { font-size: 10px; color: #b1aab9; }
  .demo-conversation { height: 370px; overflow-y: auto; overflow-wrap: anywhere; padding-right: 3px; }
  .demo-empty { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .empty-spark { color: #c4b1e1; font-size: 62px; line-height: 1; }
  .demo-empty strong { font-size: 16px; font-weight: 500; color: #776b89; margin-top: 24px; }
  .demo-empty p { font-size: 12px; color: #aaa2b3; line-height: 1.8; }
  .chat-question { width: fit-content; margin: 24px 0 20px auto; background: #f1edf8; padding: 12px 16px; border-radius: 14px 14px 3px 14px; font-size: 12px; color: #7b6a96; }
  .demo-loading { font-size: 12px; color: #a59ab6; padding: 15px 0; }
  .demo-answer > p { font-size: 12px; line-height: 1.8; color: #9c91a9; }
  .demo-result { border: 1px solid #eee9f3; border-radius: 12px; padding: 16px; margin-top: 14px; }
  .demo-result > strong { font-size: 13px; font-weight: 600; color: #7a6497; }
  .demo-result dl { margin: 12px 0 0; }
  .demo-result dl > div { display: flex; justify-content: space-between; gap: 12px; padding: 7px 0; font-size: 12px; }
  .demo-result dt { color: #a297af; }
  .demo-result dd { margin: 0; color: #7e718c; text-align: right; }
  .mcp-tasks { margin-top: 120px; }
  .tasks-heading { display: grid; grid-template-columns: 1fr 1fr; column-gap: 80px; }
  .tasks-heading .eyebrow { grid-column: 1; }
  .tasks-heading h2 { grid-column: 1; }
  .tasks-heading > p:last-child { grid-column: 2; grid-row: 2; align-self: center; margin: 0; color: #8b8594; font-size: 16px; line-height: 1.9; }
  .task-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 42px; }
  .task-grid article { padding: 30px; border-radius: 26px; background: #f7f6f9; }
  .task-grid article:nth-child(2) { background: #f2f6f5; }
  .task-grid article:nth-child(3) { background: #f9f5f0; }
  .task-number { font-size: 12px; color: #b0a6bc; }
  .task-grid h3 { font-size: 22px; font-weight: 600; color: #56515e; margin-top: 20px; }
  .task-grid p { font-size: 14px; color: #938c9c; line-height: 1.85; min-height: 78px; }
  .task-grid article > div { border-top: 1px solid #e8e5ee; padding-top: 20px; margin-top: 24px; font-size: 13px; color: #95879f; }
  .task-note { font-size: 11px; color: #aaa5b1; margin: 22px 0 0; }

  border-top:0; padding-top:0;
  h2 { color:#111; font-size:40px; }
  .eyebrow { color:#151517; font-size:17px; }
  .ai-chapter { text-align:center; padding:30px 0 70px; }
  .ai-chapter > p { font-size:18px; margin-bottom:22px; }
  .ai-chapter h2 { font-size:46px; }
  .ai-chapter a { display:inline-flex; border:1px solid #222; border-radius:28px; padding:13px 24px; color:#111; text-decoration:none; margin-top:28px; }
  .demo-section { margin-top:0; }
  .ai-showcase { gap:80px; }
  .ai-copy h2 { font-size:46px; line-height:1.4; }
  .ai-copy > p:not(.eyebrow) { color:#37373d; font-size:17px; }
  .demo-form { border-color:#d0d0d6; padding:9px; }
  .demo-form button { background:#252326; }.demo-form input { color:#222; font-size:15px; }
  .demo-examples button { color:#55515d; background:#f5f4f6; padding:9px 15px; }
  .ai-preview { position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(ellipse at 40% 25%,#edf4fc,#ccdff3 65%,#b9d2ec); padding:55px; min-height:550px; display:flex; align-items:center; border-radius:32px; }
  .ai-preview::before { content:"";position:absolute;inset:0;background:url(/assets/surface-grain.svg);opacity:.32;mix-blend-mode:soft-light;pointer-events:none;z-index:-1; }
  .chat-window { width:100%; box-shadow:0 20px 50px #393c8525; }
  .demo-empty strong { color:#40384e; }.demo-empty p { color:#73687f; }.empty-spark { color:#a48acc; }
  .chat-header { color:#2b2537; }.chat-header > span:last-child { color:#81798b; }
  .demo-answer > p { color:#6c6277; }.demo-result dt { color:#736880; }.demo-result dd { color:#40344e; }
  .mcp-intro { margin-top:140px; gap:80px; }
  .mcp-copy > p:not(.eyebrow) { color:#39353f; font-size:17px; }.question-example strong { color:#46404f; }.mcp-status { color:#81798b; }
  .mcp-visual { background:linear-gradient(135deg,#e9e4f8,#cabbe7); }
  .tasks-heading > p:last-child { color:#424047; }
  .task-grid { gap:20px; margin-top:60px; }
  .task-grid article { background:#f7f6f3!important; border-radius:32px; padding:36px; }
  .task-number { width:52px;height:52px;border-radius:16px;display:grid;place-items:center;background:white;color:#46404f;font-size:18px;margin-bottom:35px; }
  .task-grid h3 { color:#141416; font-size:24px; }.task-grid p { color:#4b4750; font-size:16px; }.task-grid article > div { color:#6e627f; font-size:14px; }
  @media(max-width:1100px) { h2 { font-size: 35px; } .mcp-intro,.ai-showcase { gap: 40px; } .story-scene { height: 480px; } .task-grid article { padding: 24px; } .task-grid h3 { font-size: 20px; } .ai-preview { padding: 24px; } }
  @media(max-width:800px) {
    padding:0 0 85px;
    .ai-chapter { padding:0 0 40px; }.ai-chapter h2 { font-size:32px; }.ai-chapter > p { font-size:14px; }.ai-chapter a { font-size:14px; }
    .ai-copy h2 { font-size:33px; }.ai-preview { min-height:460px; }.mcp-intro { margin-top:85px; }.demo-section { margin-top:0; }
    h2 { font-size: 31px; }
    .eyebrow { font-size: 14px; margin-bottom: 18px; }
    .mcp-intro,.ai-showcase { grid-template-columns: 1fr; gap: 32px; }
    .mcp-copy > p:not(.eyebrow) { font-size: 15px; }
    .question-example strong { font-size: 18px; }
    .mcp-visual { border-radius: 24px; }
    .story-scene { height: 390px; }
    .demo-section { margin-top: 85px; }
    .ai-copy > p:not(.eyebrow) { font-size: 15px; }
    .ai-preview { padding: 20px; border-radius: 24px; }
    .chat-window { padding: 20px; }
    .demo-form input { font-size: 12px; padding-left: 9px; }
    .demo-form button { width: 36px; height: 36px; }
    .demo-conversation { height: 350px; }
    .mcp-tasks { margin-top: 85px; }
    .tasks-heading { display: block; }
    .tasks-heading > p:last-child { font-size: 15px; margin-top: 20px; }
    .task-grid { grid-template-columns: 1fr; gap: 18px; margin-top: 30px; }
    .task-grid article { padding: 26px; border-radius: 24px; }
    .task-grid h3 { font-size: 23px; margin-top: 16px; }
    .task-grid p { min-height: 0; font-size: 15px; }
    .task-note { font-size: 10px; line-height: 1.8; }
  }
`;
