'use client';
import styled from 'styled-components';
import { landingTitle } from './hero';

export const DataAndAI = styled.div`
  color:#191f28; background:#f6f8fa; scroll-margin-top:60px; padding:clamp(64px,8vw,120px) 0;
  .ai-showcase { max-width:720px; margin:auto; text-align:center; }
  .eyebrow { color:#39739a; font-size:15px; font-weight:650; margin:0 0 12px; }
  h2 { ${landingTitle} margin:0; font-size:clamp(32px,3.6vw,54px); line-height:1.22; letter-spacing:-.055em; word-break:keep-all; }
  .ai-copy > p:not(.eyebrow) { color:#53616c; font-size:16px; line-height:1.65; margin:16px auto; word-break:keep-all; }
  .demo-form { display:flex; max-width:560px; margin:32px auto 12px; padding:8px; border:1px solid #d7e1e8; border-radius:18px; background:white; }
  .demo-form:focus-within { outline:2px solid #78b7df; }
  .demo-form input { flex:1; min-width:0; padding:0 10px; font:inherit; border:0; outline:0; border-radius:12px; background:transparent; }
  button { font:inherit; cursor:pointer; }
  button:disabled { opacity:.6; cursor:default; }
  .demo-form button { width:42px;height:42px;border:0;border-radius:12px;color:#fff;background:#285977;font-size:21px; }
  .demo-examples { display:flex; flex-wrap:wrap; justify-content:center; gap:5px; }
  .demo-examples button { background:#e8eef2; border:0; border-radius:10px; color:#405461; padding:8px 13px; font-size:14px; }
  .ai-copy > .demo-disclosure:not(.eyebrow){font-size:13px;margin:22px auto 8px}
  .demo-connect {background:transparent;color:#325b77;border:0;font-size:14px;padding:5px;}
  .sr-only { position:absolute; width:1px; height:1px; overflow:hidden;clip-path:inset(50%); }
  .ai-preview {text-align:left;max-width:560px;margin:24px auto 0;background:white;border-radius:20px;padding:24px;}
  .chat-header,.chat-header span:first-child,.demo-result dl div {display:flex;align-items:center;justify-content:space-between;gap:8px}
  .chat-header {font-size:13px;color:#506775}
  .chat-question {width:fit-content;margin:20px 0 16px auto;border-radius:14px;background:#e8f2fa;padding:9px 15px;overflow-wrap:anywhere}
  .demo-answer p,.demo-loading {font-size:14px;color:#53616c}
  .demo-result {margin-top:20px}.demo-result dl {margin:8px 0}.demo-result dl div{border-top:1px solid #e6ebef;padding:7px 0;font-size:14px}
`;
