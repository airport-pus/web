"use client";
import styled from 'styled-components';
import { landingTitle } from './hero';
export const ProductStory = styled.div`
 color:#191b20;
 .push-summary { box-sizing:border-box; max-width:1320px; margin:auto; padding:0 clamp(20px,4vw,60px) clamp(72px,9vw,144px);
   display:grid; grid-template-columns:.9fr 1.1fr; align-items:center; gap:clamp(32px,5vw,90px); scroll-margin-top:80px; }
 .ticket-copy h2 { ${landingTitle} font-size:clamp(32px,3.6vw,54px); line-height:1.22; letter-spacing:-.055em; margin:12px 0 16px; }
 .ticket-copy p { font-size:16px; line-height:1.65; margin:0; color:#53616c; word-break:keep-all; }
 .ticket-copy p:first-child { font-size:15px; font-weight:650; color:#39739a; }
 .reminder-options { display:flex; flex-wrap:wrap; gap:5px; margin-top:24px; }
 .reminder-options button { border:0; border-radius:10px; padding:9px 13px; background:#f4f6f8; color:#52606b; font:inherit; font-size:14px; cursor:pointer; }
 .reminder-options button[aria-pressed=true] { background:#e2eff9; color:#224c6b; font-weight:650; }
 .reminder-preview { border-radius:32px; background:#e8f1f7; padding:clamp(36px,5vw,80px) 18px; display:grid; justify-items:center; }
 .boarding-pass { box-sizing:border-box; width:min(91%,365px); background:white; border-radius:16px; padding:22px 24px 38px; color:#1e3547; }
 .pass-top,.pass-bottom,.pass-route { display:flex; align-items:center; justify-content:space-between; }
 .pass-top,.pass-bottom { font-size:14px; }
 .pass-route { gap:12px; margin:24px 0; }
 .pass-route span { font-size:clamp(34px,4vw,52px); font-weight:700; letter-spacing:-.045em; line-height:1; }
 .pass-route small { display:block; font-size:14px; letter-spacing:0; font-weight:500; color:#637585; margin-top:7px; }
 .pass-route i { flex:1; text-align:center; color:#6098bd; font-style:normal; background:linear-gradient(#d4e3ed,#d4e3ed) center / 100% 1px no-repeat; }
 .pass-bottom { border-top:1px dashed #cad7df; padding-top:14px; }
 .reminder-preview .push-message { position:relative; margin-top:-16px; }
 @media(max-width:800px){.push-summary{grid-template-columns:1fr;gap:26px}.reminder-preview{border-radius:24px}}
  @keyframes notification-in {from{opacity:.1; transform:scale(.98)}to{opacity:1;transform:none}}
  @media(prefers-reduced-motion:no-preference){.push-message{animation:notification-in .45s ease-out}}
  .push-message {
    text-align:left; box-sizing:border-box; width:min(100%,408px); display:flex; align-items:center; gap:12px;
    padding:15px; border-radius:24px; color:#142536; border:1px solid #ffffffa6;
    background:linear-gradient(125deg,#ffffffbd,#eef7ff85);
    -webkit-backdrop-filter:blur(18px) saturate(135%); backdrop-filter:blur(18px) saturate(135%);
    box-shadow:inset 0 1px 1px #ffffff80,0 5px 18px #20384c20; line-height:1.4;
  }
  .push-message img { border-radius:11px; flex:none; }
  .notification-body { flex:1; min-width:0; }
  .notification-meta { display:flex; justify-content:space-between; align-items:baseline; color:#485867; font-size:12px; margin-bottom:2px; }
  .notification-meta time { font-variant-numeric:tabular-nums; }
  .push-message strong { font-size:16px; font-weight:650; letter-spacing:-.025em; }
  .push-message p { font-size:13px; margin:2px 0 0; }
`;
