'use client';
import styled from 'styled-components';
import { landingTitle } from '../src/styles/hero';
import { useEffect, useRef } from 'react';

const features = [
 {key:'flights', label:'KE1533 · 김해 → 제주', value:'탑승구 5', detail:'편명 검색으로 찾은 출발편',title:'내 항공편을 바로 찾아보세요.',description:'항공편 번호나 항공사, 도시로 검색하고 출발·도착 시각과 탑승구를 확인하세요.'},
 {key:'crowd', label:'보안검색장 혼잡도', value:'2구간 혼잡', detail:'1구간 여유　·　3구간 보통',title:'공항에 가기 전에, 혼잡도부터.',description:'구간별 혼잡 현황과 시간대별 승객 수를 살펴보세요. 기다릴 시간까지 생각하고 출발할 수 있어요.'},
 {key:'parking', label:'국내선 주차장', value:'빈자리에 주차 후 예상 요금 계산', detail:'예시 요율로 90분 이용 시 3,000원',title:'주차 자리와 예상 요금을 함께.',description:'빈자리가 있는 주차장을 찾고, 차를 세워둘 시간과 할인 조건으로 예상 요금을 확인하세요.'},
];
export default function TravelShowcase() {
 const section = useRef(null);
 useEffect(() => {
   let mounted = true;
   let dispose;
   import('../src/feature-scenes').then(({ mountFeatureScenes }) => {
     if (mounted) dispose = mountFeatureScenes(section.current);
   }).catch(() => {});
   return () => { mounted = false; dispose?.(); };
 }, []);
 return <Showcase ref={section} id="app-features" aria-labelledby="app-features-title">
 <header className="feature-intro">
   <h2 id="app-features-title">공항 가는 날, 산들을 쓰는 이유</h2>
   <p>이용할 공항을 고르면 내 항공편의 출발 시각부터 <br />공항 혼잡도와 남은 주차 자리까지 확인할 수 있어요.</p>
 </header>
 <div className="feature-grid">
   {features.map(feature => (
     <article key={feature.key}>
       <div className="feature-visual" data-media-slot={feature.key}>
         <img className="scene-fallback" alt="" loading="lazy"
           src={`/assets/feature-posters/${feature.key === 'flights' ? 'flight' : feature.key}.png`} />
         <div className="feature-model" data-editorial="true"
           data-feature-scene={feature.key === 'flights' ? 'flight' : feature.key}
           role="img" aria-label={feature.label + ', ' + feature.value + ', ' + feature.detail} />
       </div>
       <h3>{feature.title}</h3><p>{feature.description}</p>
     </article>
   ))}
 </div>

 </Showcase>}
const Showcase=styled.section`
 margin:clamp(80px,10vw,140px) 0 0;width:100%;scroll-margin-top:100px;
 .feature-intro {
   text-align: center;
   margin-bottom: clamp(24px, 3vw, 40px);
 }
 .feature-intro h2 { ${landingTitle} margin:0; text-wrap:balance; }
 .feature-intro p { font-size:clamp(14px,1.3vw,17px); line-height:1.7; color:#4e5968; margin:12px 0 0; text-wrap:pretty; }
 @media(max-width:480px){ .feature-intro br { display:none; } }
 .section-heading{display:grid;grid-template-columns:1.2fr 1fr;gap:90px;align-items:center;margin-bottom:60px}.eyebrow{font-size:16px;color:#171719;margin:0 0 22px}.section-heading h2{font-size:40px;line-height:1.45;letter-spacing:-.045em;font-weight:650;color:#111}.section-description{font-size:17px;line-height:1.85;color:#33353a;margin:0}
 .feature-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.feature-grid article{min-width:0}.feature-visual{height:400px;border-radius:32px;display:flex;align-items:center;justify-content:center;padding:30px;position:relative;overflow:hidden;isolation:isolate;background:
   radial-gradient(ellipse at 16% 86%, #edf6ff 0%, transparent 58%),
   radial-gradient(ellipse at 82% 10%, #e5f2ff 0%, transparent 62%),
   linear-gradient(135deg, #c4e5fa 12%, #cfe6fb 52%, #b6d3fa);
 }
 .feature-visual::before {
   content: "";
   position: absolute;
   inset: 0;
   z-index: -1;
   background: url(/assets/feature-sky.webp) repeat center / 320px auto;
   mix-blend-mode: luminosity;
   opacity: .27;
   pointer-events: none;
 }.feature-visual>img,.feature-visual>video{width:100%;height:100%;object-fit:contain;display:block}.feature-grid h3{font-size:23px;font-weight:600;line-height:1.5;letter-spacing:-.035em;color:#151517;margin:22px 0 12px}.feature-grid article>p{font-size:15px;line-height:1.85;margin:0;color:#4b4d54}.example-note{font-size:11px;color:#90969e;margin:24px 0 0}
 .feature-model{position:absolute;inset:0}.feature-model canvas{width:100%;height:100%;display:block}.feature-visual > .scene-fallback{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.feature-visual:has(.feature-model canvas) .scene-fallback{display:none}
 .screen{background:#fff;border:1px solid #e7ebef;border-radius:13px;padding:20px;box-shadow:0 16px 35px #04182a30;width:100%;color:#27384b}.screen-heading{display:flex;justify-content:space-between;align-items:center;gap:8px}.screen-heading strong{font-size:13px;font-weight:600}.screen-heading span{font-size:8px;color:#8993a0}.screen-switch{display:flex;gap:18px;font-size:10px;margin-top:20px}.screen-switch span{color:#9aa3af}.search{background:#f4f6f8;border-radius:6px;color:#9ba6b3;font-size:8px;padding:10px;margin-top:14px}.flight-row{display:flex;align-items:center;gap:16px;padding:17px 0;border-bottom:1px solid #edf0f4}.flight-row:last-child{border-bottom:0;padding-bottom:3px}.flight-row>strong{font-size:20px;font-weight:600;letter-spacing:-.04em}.flight-row>b{font-size:10px}.flight-row small{display:block;font-size:8px;font-weight:400;color:#8c98a7;margin-top:4px}.flight-row>span{margin-left:auto;font-size:8px;color:#386a9a}
 .crowd-summary{margin:20px 0}.crowd-summary>span{font-size:9px;color:#93a099}.crowd-summary>strong{font-size:23px;letter-spacing:-.04em;display:block;color:#49765e;margin-top:3px;font-weight:600}.crowd-row{margin-top:12px}.crowd-row>div:first-child{display:flex;justify-content:space-between;font-size:9px}.crowd-row b{font-weight:500;color:#658775}.meter{height:5px;background:#edf2ef;border-radius:4px;margin-top:7px}.meter i{height:100%;display:block;background:#8caf9a;border-radius:inherit}.chart{height:53px;display:flex;align-items:flex-end;gap:9px;margin-top:23px;border-bottom:1px solid #e5ebf0}.chart i{flex:1;background:#d2dfeb;border-radius:3px 3px 0 0}.chart i:nth-child(5){background:#527a9f}.chart-label{display:flex;justify-content:space-between;font-size:7px;color:#99a4af;margin-top:7px}
 .parking-group{width:100%;display:grid;gap:14px}.parking-name{font-size:10px;color:#7f8d9e;display:block;margin-top:23px}.parking-count{display:flex;align-items:baseline;gap:7px;margin:5px 0 21px}.parking-count>strong{font-size:43px;font-weight:600;color:#123c65;line-height:1.3;letter-spacing:-.05em}.parking-count>span{font-size:8px;color:#8c9bad}.parking-count>b{margin-left:auto;background:#edf2f8;color:#53769b;width:37px;height:37px;border-radius:10px;display:grid;place-items:center;font-size:24px;font-weight:500;align-self:center}.parking-row{display:flex;justify-content:space-between;font-size:9px;border-top:1px solid #edf0f4;padding-top:13px}.parking-row b{font-weight:500;color:#648574}.fee-screen>strong{font-size:11px;font-weight:600}.fee-screen>div{display:flex;justify-content:space-between;font-size:9px;margin-top:13px;gap:8px}.fee-screen span{color:#909bab}.fee-screen b{font-weight:400;color:#4a6078}
 @media(max-width:1100px){.section-heading{gap:50px}.feature-visual{padding:20px;height:350px}.feature-grid h3{font-size:20px}.screen{padding:16px}.flight-row{gap:10px}.flight-row>strong{font-size:17px}}
 @media(max-width:800px){.section-heading{grid-template-columns:1fr;gap:22px;margin-bottom:32px}.section-heading h2{font-size:31px}.eyebrow{font-size:14px;margin-bottom:16px}.section-description{font-size:14px}.feature-grid{grid-template-columns:1fr;gap:38px}.feature-visual{height:340px;border-radius:24px;padding:26px}.screen,.parking-group{max-width:330px}.parking-group .screen{max-width:none}.feature-grid h3{font-size:22px;margin-top:18px}.feature-grid article>p{font-size:14px}.example-note{font-size:10px;line-height:1.8}}
`;
