'use client';
import styled from 'styled-components';
import { cardTextInset, cardText, cardPanel } from './feature-card';

// AI demo card: second card of the companion row (layout and card shell live in product-story.js).
export const DataAndAI = styled.section`
  color:#191f28;
  .ai-showcase { display:grid; grid-row:span 3; grid-template-rows:subgrid; min-width:0; }
  .ai-copy, .demo-actions { ${cardTextInset} }
  .ai-copy p { ${cardText} margin:0; word-break:keep-all; }
  .demo-actions { display:flex; flex-wrap:wrap; align-items:center; align-content:start; gap:6px 10px; margin-top:16px; }
  .demo-examples { display:flex; flex-wrap:wrap; gap:6px; }
  .demo-form button, .demo-connect { font:inherit; cursor:pointer; }
  .demo-form button:disabled { cursor:default; }
  .demo-connect { display:inline-flex; align-items:center; gap:4px; min-height:40px; padding:0 6px; border:0; background:transparent; color:#287aa9; font-size:14px; font-weight:600; border-radius:999px; }
  .demo-connect span { display:inline-block; transition:transform .2s var(--ease-out); }
  @media (hover:hover) and (pointer:fine){ .demo-connect:hover span { transform:translate(2px,-2px); } }
  .sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); }

  /* Chat window resting on the sky card, like the boarding pass beside it. */
  .chat-window { width:min(100%,440px); ${cardPanel} padding:18px; text-align:left; }
  .chat-header, .chat-header span:first-child, .demo-result dl div { display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .chat-header { font-size:13px; color:#506775; padding:0 4px 14px; border-bottom:1px solid #edf0f4; }
  .chat-header span:first-child { color:#1e3547; font-weight:600; }
  .demo-disclosure { margin:14px 4px; font-size:13px; line-height:1.6; color:#5d6f80; }
  .demo-form { display:flex; padding:6px; border:1px solid #d7e1e8; border-radius:999px; background:white; transition:border-color .15s ease, box-shadow .2s var(--ease-out); }
  .demo-form:focus-within { border-color:#3182f6; box-shadow:0 0 0 3px #3182f629; }
  .demo-form input { flex:1; min-width:0; padding:0 12px; font:inherit; font-size:16px; color:#1e3547; border:0; outline:0; background:transparent; }
  .demo-form input::placeholder { color:#7d8b98; }
  .demo-form button { flex:none; width:40px; height:40px; border:0; border-radius:50%; color:#fff; background:#287aa9; font-size:18px; transition:background-color .15s ease, transform .16s var(--ease-out); }
  .demo-form button:disabled { background:#b9cad7; }
  .demo-form button:active:not(:disabled) { transform:scale(.94); }
  .demo-form:has(input:disabled) { background:#f5f8fb; }
  .demo-conversation { padding:4px 4px 14px; }
  @keyframes preview-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  @media(prefers-reduced-motion:no-preference){ .ai-preview{animation:preview-in .3s var(--ease-out)} .demo-answer{animation:preview-in .25s var(--ease-out)} }
  .chat-question { width:fit-content; max-width:85%; margin:16px 0 12px auto; border-radius:14px; background:#e2eff9; color:#1d4a6b; padding:8px 14px; font-size:14px; overflow-wrap:anywhere; }
  .demo-answer p, .demo-loading { margin:0; font-size:14px; line-height:1.6; color:#4d5b67; }
  .demo-result { margin-top:14px; padding:12px 14px; border-radius:14px; background:#f3f8fc; }
  .demo-result strong { font-size:14px; color:#1e3547; }
  .demo-result dl { margin:6px 0 0; }
  .demo-result dl div { border-top:1px solid #e3ebf1; padding:6px 0; font-size:13px; }
  .demo-result dt { color:#5d6f80; }
  .demo-result dd { margin:0; color:#1e3547; font-weight:500; text-align:right; }
  .demo-conversation + .demo-form + .demo-disclosure { margin-bottom:0; }
  @media(max-width:800px){
    .ai-showcase { display:block; }
    .ai-copy, .demo-actions { margin-inline:0; }
    .chat-window { padding:14px; }
  }
`;
