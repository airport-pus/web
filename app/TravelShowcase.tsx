'use client';
import styled from 'styled-components';
import { landingTitle } from '../src/styles/hero';
import { useEffect, useRef, useState } from 'react';

const features = [
 {key:'flights', label:'KE1533 · 김해 → 제주', value:'탑승구 5', detail:'제주행 출발 시각 14:20',title:'내 항공편을 바로 찾아보세요.',description:'항공편 번호나 항공사, 도시로 검색하고 출발·도착 시각과 탑승구를 확인하세요.'},
 {key:'crowd', label:'보안검색장 혼잡도', value:'2구간 혼잡', detail:'1구간 여유　·　3구간 보통',title:'공항에 가기 전에, 혼잡도부터.',description:'구간별 혼잡 현황과 시간대별 승객 수를 살펴보세요. 기다릴 시간까지 생각하고 출발할 수 있어요.'},
 {key:'parking', label:'국내선 주차장', value:'빈자리에 주차 후 예상 요금 계산', detail:'예시 요율로 90분 이용 시 3,000원',title:'주차 자리와 예상 요금을 함께.',description:'빈자리가 있는 주차장을 찾고, 차를 세워둘 시간과 할인 조건으로 예상 요금을 확인하세요.'},
];
function playbackAsset(name: string, format: string) {
 return `/assets/feature-playback/${name}.${format}?v=2`;
}

function ScenePlayback({kind, zone}: {kind: string; zone: number}) {
 const ref = useRef<HTMLVideoElement>(null);
 const clip = kind === 'crowd' && zone !== 1 ? `crowd-${zone + 1}` : kind;
 useEffect(() => {
   const video = ref.current!;
   let visible = false;
   function sync() {
     if (visible && !document.hidden) video.play().catch(() => { video.controls = true; });
     else video.pause();
   }
   const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
   observer.observe(video);
   document.addEventListener('visibilitychange', sync);
   return () => {
     observer.disconnect();
     document.removeEventListener('visibilitychange', sync);
     video.pause();
   };
 }, [clip]);
 return <video ref={ref} muted loop playsInline preload="none" aria-hidden="true"
   poster={playbackAsset(kind, 'webp')} src={playbackAsset(clip, 'mp4')} />;
}
export default function TravelShowcase() {
 const section = useRef<HTMLElement>(null);
 const [unavailable, setUnavailable] = useState<Record<string, boolean>>({});
 const [zone, setZone] = useState(1);
 const [minutes, setMinutes] = useState(90);
 const congestion = ['여유','혼잡','보통'];
 useEffect(() => {
   let mounted = true;
   let dispose: (() => void) | undefined;
   import('../src/feature-scenes').then(({ mountFeatureScenes }) => {
     if (mounted && section.current) dispose = mountFeatureScenes(section.current, kind => {
       if (mounted) setUnavailable(previous => ({ ...previous, [kind]: true }));
     });
   }).catch(() => { if (mounted) setUnavailable({flight:true, crowd:true, parking:true}); });
   return () => { mounted = false; dispose?.(); };
 }, []);
 function replayScene(kind: string) {
   const video = section.current?.querySelector<HTMLVideoElement>(`[data-media-slot="${kind === 'flight' ? 'flights' : kind}"] video`);
   if (video) {
     video.currentTime = 0;
     video.play().catch(() => { video.controls = true; });
     return;
   }
   section.current?.querySelector(`[data-feature-scene="${kind}"]`)?.dispatchEvent(new Event('replay-scene'));
 }
 return <Showcase ref={section} id="app-features" aria-labelledby="app-features-title">
 <header className="feature-intro">
   <h2 id="app-features-title">공항 가기 전 집에서도 <img src="/brand/symbol.svg" alt="" /><span className="brand-name">산들로</span></h2>
   <p>공항 가기 전 <span>항공편</span> <span>혼잡도</span> <span>주차</span> 산들에서 확인하세요.</p>
 </header>
 <div className="feature-grid">
   {features.map(feature => (
     <article key={feature.key}>
       <div className="feature-visual" data-media-slot={feature.key}>
         <img className="scene-fallback" alt="" loading="lazy"
           src={playbackAsset(feature.key === 'flights' ? 'flight' : feature.key, 'webp')} />
         <div className="feature-model" data-editorial="true" data-zone={feature.key === 'crowd' ? zone : undefined}
           data-feature-scene={feature.key === 'flights' ? 'flight' : feature.key}
           role="img" aria-label={feature.key === 'flights' ? feature.label + ', ' + feature.value + ', ' + feature.detail : feature.label} />
         {unavailable[feature.key === 'flights' ? 'flight' : feature.key] &&
           <ScenePlayback kind={feature.key === 'flights' ? 'flight' : feature.key} zone={zone} />}
         {feature.key === 'crowd' && <output className="scene-reading">보안검색 {zone+1}구간 <b>{congestion[zone]}</b></output>}
         {feature.key === 'parking' && <output className="scene-reading parking-estimate">{minutes}분 예상 요금 <b>{(Math.ceil(minutes/30)*1000).toLocaleString('ko-KR')}원</b></output>}
       </div>
       <h3>{feature.title}</h3><p>{feature.description}</p>
       {feature.key === 'flights' && <button className="replay-search" type="button" onClick={() => replayScene('flight')}>편명 검색 다시 보기 <span aria-hidden="true">↻</span></button>}
       {feature.key === 'crowd' && <div className="demo-choices" role="group" aria-label="보안검색 구간">{congestion.map((state,i)=><button type="button" key={state} aria-pressed={zone===i} onClick={()=>{setZone(i); replayScene('crowd');}}>{i+1}구간</button>)}</div>}
       {feature.key === 'parking' && <div className="demo-choices" role="group" aria-label="주차 시간">{[30,60,90].map(value=><button type="button" key={value} aria-pressed={minutes===value} onClick={()=>setMinutes(value)}>{value}분</button>)}</div>}
     </article>
   ))}
 </div>
 </Showcase>}
const Showcase=styled.section`
 max-width:1320px; margin:0 auto; padding:0 clamp(20px,4vw,60px) clamp(88px,11vw,170px); scroll-margin-top:60px;
 .feature-intro {
   --title-offset:clamp(28px,3vw,52px);
   padding:calc(clamp(92px,8vw,152px) + var(--title-offset)) 0 clamp(20px,2vw,32px);
   text-align:center; color:#191f28;
 }
 .feature-intro h2 {
   ${landingTitle} margin:0; font-size:min(6.6vw, 64px); white-space:nowrap;
   font-weight:700; line-height:1.26; letter-spacing:-.048em;
 }
 .feature-intro p {
   margin:calc(clamp(78px,7vw,132px) - var(--title-offset)) auto 0; font-size:clamp(18px,1.45vw,26px);
   font-weight:650; line-height:1.75; letter-spacing:-.045em; word-break:keep-all; text-wrap:balance;
 }
 .feature-intro p span {
   display:inline-block; padding:0 .38em; border-radius:.38em;
   background:#f1f3f5; color:#505966; font-size:.83em; line-height:1.55; vertical-align:.06em;
 }
 .feature-intro h2 img { width:1em; height:1em; vertical-align:-.12em; }
 .feature-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); }
 article { min-width:0; }
 .feature-visual { position:relative; isolation:isolate; overflow:hidden; height:clamp(350px,31vw,430px); background:#d3e8fa url('/assets/feature-sky.webp') center/cover; }
 article:first-child .feature-visual { border-radius:32px 0 0 32px; }
 article:last-child .feature-visual { border-radius:0 32px 32px 0; }
 .feature-model,.scene-fallback { position:absolute; inset:0; width:100%; height:100%; }
 .scene-fallback,.feature-visual video { object-fit:contain; }
 .feature-visual:is([data-media-slot="crowd"], [data-media-slot="parking"]) :is(.scene-fallback, video) { object-fit:cover; }
 .feature-visual video { position:absolute; inset:0; width:100%; height:100%; }
 .feature-model canvas { display:block; width:100%; height:100%; }
 .feature-visual:has([data-ready]) .scene-fallback, .feature-visual:has(video) .scene-fallback { display:none; }
 .scene-reading { position:absolute; bottom:18px; left:50%; transform:translateX(-50%); padding:6px 14px; border-radius:24px; white-space:nowrap; background:#ffffffe8; color:#354c60; font-size:14px; pointer-events:none; }
 .scene-reading b { margin-left:5px; }


 article h3, article > p, .demo-choices, .replay-search { margin-inline:clamp(12px,1.5vw,24px); }
 article h3 { margin-block:20px 7px; font-size:clamp(19px,1.65vw,24px); line-height:1.4; letter-spacing:-.035em; font-weight:600; }
 article > p { margin-block:0; font-size:15px; line-height:1.7; color:#53616c; }
 .demo-choices { display:flex; gap:4px; margin-top:14px; }
 button { font:inherit; font-size:14px; cursor:pointer; border:0; border-radius:10px; }
 .demo-choices button { padding:6px 11px; background:#f4f6f8; color:#576774; }
 .demo-choices button[aria-pressed=true] { background:#e2eff9; color:#224c6b; font-weight:600; }
 .replay-search { margin-top:14px; background:#f4f6f8; color:#314d61; padding:6px 11px; }
 @media(max-width:800px){
   .feature-grid { grid-template-columns:1fr; gap:40px; }
   .feature-grid article .feature-visual { height:340px; border-radius:24px; }
   article h3, article > p, .demo-choices, .replay-search { margin-inline:0; }
   article h3 { font-size:22px; margin-top:14px; }
 }
`;
