'use client';
import styled from 'styled-components';
import { landingTitle, sectionTitleSize } from './hero';

export const DataAndAI = styled.div`
  color:#191f28; background:#f6f8fa; scroll-margin-top:60px; padding:clamp(64px,8vw,120px) 0;
  .ai-showcase { max-width:720px; margin:auto; text-align:center; }
  .eyebrow { color:#39739a; font-size:15px; font-weight:650; margin:0 0 12px; }
  h2 { ${landingTitle} ${sectionTitleSize} margin:0; word-break:keep-all; }
  .ai-copy > p:not(.eyebrow) { color:#4d5b67; font-size:16px; line-height:1.65; margin:16px auto; word-break:keep-all; }
  .demo-form { display:flex; max-width:560px; margin:32px auto 14px; padding:8px; border:1px solid #d7e1e8; border-radius:999px; background:white; box-shadow:0 1px 2px #1d3a500a,0 6px 20px #1d3a500d; transition:border-color .15s ease, box-shadow .2s var(--ease-out); }
  .demo-form:focus-within { border-color:#3182f6; box-shadow:0 0 0 3px #3182f629,0 6px 20px #1d3a500d; }
  .demo-form input { flex:1; min-width:0; padding:0 14px; font:inherit; border:0; outline:0; border-radius:12px; background:transparent; }
  button { font:inherit; cursor:pointer; }
  button:disabled { opacity:.6; cursor:default; }
  .demo-form button { flex:none; width:44px;height:44px;border:0;border-radius:50%;color:#fff;background:#285977;font-size:20px; transition:background-color .15s ease, transform .16s var(--ease-out); }
  .demo-form button:active:not(:disabled) { transform:scale(.94); }
  .demo-examples { display:flex; flex-wrap:wrap; justify-content:center; gap:6px; }
  .demo-examples .chip { background:#e9eef2; }
  .ai-copy > .demo-disclosure:not(.eyebrow){font-size:13px;margin:22px auto 8px}
  .demo-connect {background:transparent;color:#2c5674;border:0;font-size:14px;font-weight:500;min-height:40px;padding:0 10px;border-radius:999px;transition:background-color .15s ease;}
  @media (hover:hover) and (pointer:fine){ .demo-connect:hover { background:#e9eef2; } .demo-examples .chip:not(:disabled):hover { background:#dfe6ec; } }
  .sr-only { position:absolute; width:1px; height:1px; overflow:hidden;clip-path:inset(50%); }
  .ai-preview {text-align:left;max-width:560px;margin:24px auto 0;background:white;border-radius:24px;padding:24px;box-shadow:0 1px 2px #1d3a500a,0 10px 30px #1d3a5010;}
  @keyframes preview-in {from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @media(prefers-reduced-motion:no-preference){.ai-preview{animation:preview-in .3s var(--ease-out)}.demo-answer{animation:preview-in .25s var(--ease-out)}}
  .chat-header,.chat-header span:first-child,.demo-result dl div {display:flex;align-items:center;justify-content:space-between;gap:8px}
  .chat-header {font-size:13px;color:#506775}
  .chat-question {width:fit-content;margin:20px 0 16px auto;border-radius:14px;background:#e8f2fa;padding:9px 15px;overflow-wrap:anywhere}
  .demo-answer p,.demo-loading {font-size:14px;color:#53616c}
  .demo-result {margin-top:20px}.demo-result dl {margin:8px 0}.demo-result dl div{border-top:1px solid #e6ebef;padding:7px 0;font-size:14px}
`;
