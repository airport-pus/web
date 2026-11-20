"use client";
import styled from 'styled-components';
import { skyCard, cardStripRadius, cardTextInset, cardTitle, cardText, cardPill, cardPanel, sectionFrame } from './feature-card';
export const ProductStory = styled.div`
 color:#191b20;
 /* Second card row under the feature grid: ticket reminder | AI demo, same strip as the feature cards. */
 .companion-grid { ${sectionFrame} display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); grid-template-rows:auto auto 1fr; ${cardStripRadius('.card-visual')} }
 .companion-grid > * { display:grid; grid-row:span 3; grid-template-rows:subgrid; min-width:0; scroll-margin-top:80px; }
 .card-visual { ${skyCard} min-height:clamp(350px,31vw,430px); display:grid; place-items:center; padding:clamp(56px,5vw,72px) 18px clamp(36px,4vw,56px); }
 .companion-grid > :last-child .card-visual { box-shadow:inset 1px 0 #ffffff99; }
 .card-label { position:absolute; top:18px; left:18px; ${cardPill} font-weight:600; }
 .push-summary > header, .push-summary > .reminder-options { ${cardTextInset} }
 .ticket-copy h2, .ai-copy h2 { ${cardTitle} margin:22px 0 8px; font-size:clamp(21px,2vw,28px); color:#191f28; }
 .ticket-copy p { ${cardText} margin:0; }
 .reminder-options { display:flex; flex-wrap:wrap; align-content:start; gap:6px; margin-top:16px; }
 .reminder-preview { display:grid; justify-items:center; width:100%; }
 .boarding-pass { box-sizing:border-box; width:min(91%,365px); ${cardPanel} padding:22px 24px 38px; }
 .pass-top,.pass-bottom,.pass-route { display:flex; align-items:center; justify-content:space-between; }
 .pass-top,.pass-bottom { font-size:14px; }
 .pass-route { gap:12px; margin:24px 0; }
 .pass-route span { font-size:clamp(34px,4vw,52px); font-weight:700; letter-spacing:-.04em; line-height:1; }
 .pass-route small { display:block; font-size:14px; letter-spacing:0; font-weight:500; color:#637585; margin-top:7px; }
 .pass-route i { flex:1; text-align:center; color:#6098bd; font-style:normal; background:linear-gradient(#d4e3ed,#d4e3ed) center / 100% 1px no-repeat; }
 .pass-bottom { border-top:1px dashed #cad7df; padding-top:14px; font-variant-numeric:tabular-nums; }
 .reminder-preview .push-message { position:relative; margin-top:-16px; }
 @media(max-width:800px){
   .companion-grid { grid-template-columns:1fr; grid-template-rows:none; gap:40px; }
   .companion-grid > * { display:block; grid-row:auto; }
   .card-visual { border-radius:24px; min-height:340px; padding:68px 16px 32px; }
   .companion-grid > :last-child .card-visual { box-shadow:none; }
   .push-summary > header, .push-summary > .reminder-options { margin-inline:0; }
   .ticket-copy h2, .ai-copy h2 { font-size:21px; margin-top:18px; }
 }
  @keyframes notification-in {from{opacity:0; transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}
  @media(prefers-reduced-motion:no-preference){.push-message{transform-origin:50% 0; animation:notification-in .28s var(--ease-out)}}
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
