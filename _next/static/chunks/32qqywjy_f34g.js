(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,22229,e=>{"use strict";var t=e.i(71645);e.s(["default",0,function(){return(0,t.useEffect)(()=>{let t,i=!1;return e.A(23050).then(({mountLanding:e})=>{i||(t=e())}).catch(console.error),()=>{i=!0,t?.()}},[]),null}])},8223,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(97053);let o=r.U.div.withConfig({displayName:"PhoneMockup__Frame",componentId:"sc-5ea90d80-0"})`
  position: relative;
  box-sizing: border-box;
  width: min(78vw, 320px);
  aspect-ratio: 600 / 1230;
  margin: 0 auto clamp(56px, 8vw, 112px);
  padding: 3px;
  border-radius: 18% / 8.8%;
  background: linear-gradient(105deg, #aaaeb2, #e8e9ea 18%, #a4a6a8 48%, #d9dbde 82%, #909397);
  box-shadow: 0 4px 32px rgb(44 57 82 / 12%);

  &::before, &::after {
    content: '';
    position: absolute;
    width: 3px;
    border-radius: 2px;
    background: linear-gradient(to right, #93969a, #d9dbde);
  }

  &::before {
    left: -2px;
    top: 24%;
    height: 7%;
    box-shadow: 0 3.5em #b0b3b6;
    font-size: clamp(12px, 3.9vw, 16px);
  }

  &::after {
    right: -2px;
    top: 29%;
    height: 11%;
  }
`,a=r.U.div.withConfig({displayName:"PhoneMockup__Screen",componentId:"sc-5ea90d80-1"})`
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  border: 8px solid #151516;
  border-radius: inherit;
  background: white;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;function n({screenSrc:e,alt:i=""}){return(0,t.jsx)(o,{"aria-hidden":!e||void 0,children:(0,t.jsx)(a,{children:e&&(0,t.jsx)("img",{src:e,alt:i,loading:"lazy"})})})}var p=e.i(5108);let s=[{label:"운항정보",description:"내 항공편을 찾아 출발 시각과 탑승구를 확인하세요. 일정이 바뀌면 변경된 시각도 함께 볼 수 있어요."},{label:"공항 혼잡도",description:"어느 구간이 붐비는지 미리 살펴보고, 공항으로 출발할 시간을 정하세요."},{label:"주차 현황",description:"주차장마다 남은 자리를 비교하고 어디에 차를 세울지 골라보세요."},{label:"주차 요금",description:"차를 세워 둘 시간과 할인 조건을 선택해 예상 주차 요금을 확인하세요."},{label:"내 항공권",description:"여행 당일 다시 찾게 되는 내 항공편 정보를 한곳에서 살펴보세요."}],d=r.U.section.withConfig({displayName:"PhoneStory__Story",componentId:"sc-af551e33-0"})`
  position: relative;
  height: 250svh;
  overflow-x: clip;
  background: linear-gradient(
    to bottom,
    #fff,
    #fcfcfd 22svh,
    #fcfcfd calc(100% - 22svh),
    #fff
  );

  .stage {
    position: sticky;
    top: 60px;
    height: calc(100svh - 60px);
    box-sizing: border-box;
    width: min(1200px, 90%);
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: clamp(40px, 8vw, 128px);
  }
  .copy { min-width: 0; }
  h2 {
    ${p.landingTitle}
    margin: 0 0 clamp(20px, 5svh, 56px);
    font-size: clamp(36px, min(5.1vw, 8svh), 76px);
    line-height: 1.35;
    word-break: keep-all;
  }
  .step { border-top: 1px solid #e5e8ec; }
  .step:last-child { border-bottom: 1px solid #e5e8ec; }
  .step button {
    width: 100%;
    padding: clamp(8px, 1.6svh, 19px) 0;
    border: 0;
    background: transparent;
    text-align: left;
    font: inherit;
    font-size: clamp(18px, 1.95vw, 28px);
    font-weight: 650;
    line-height: 1.4;
    letter-spacing: -.02em;
    color: #89919b;
    cursor: pointer;
  }
  .step button[aria-expanded='true'] { color: #191f28; }
  .detail { height: 0; overflow: hidden; }
  .detail[aria-hidden='false'] { height: var(--detail-height, auto); }
  .detail > div { opacity: 0; }
  .detail[aria-hidden='false'] > div { opacity: 1; }
  .detail p {
    margin: 0;
    padding-bottom: 1em;
    color: #515c69;
    font-size: clamp(15px, 1.45vw, 20px);
    line-height: 1.65;
    letter-spacing: -.015em;
    word-break: keep-all;
  }
  .stage[data-animated] .detail { height: calc(var(--detail-height) * var(--open)); }
  .stage[data-animated] .detail > div { opacity: var(--open); }
  .stage[data-animated] .step button {
    color: color-mix(in srgb, #191f28 calc(var(--open) * 100%), #89919b);
  }
  @media (prefers-reduced-motion: no-preference) {
    .stage[data-animated] .detail > div {
      transform: translateY(var(--slide));
    }
    @supports (animation-timeline: view()) {
      view-timeline-name: --phone-story;
      .copy {
        animation: phone-copy-enter linear both;
        animation-timeline: --phone-story;
        animation-range: entry 10% entry 78%;
      }
    }
  }
  @keyframes phone-copy-enter {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .device {
    width: min(84%, 400px, 41svh);
    justify-self: center;
    position: relative;
    isolation: isolate;
  }
  .device::before {
    content: '';
    position: absolute;
    z-index: -1;
    pointer-events: none;
    inset: 30% max(-15vw, -220px) -14% -52%;
    background:
      radial-gradient(ellipse at 64% 58%, rgb(113 188 239 / 13%), transparent 66%),
      radial-gradient(ellipse at 46% 73%, rgb(192 225 247 / 16%), transparent 60%);
    filter: blur(18px);
  }
  .device > div {
    width: 100%;
    margin: 0;
  }
  @media (max-width: 650px) {
    .stage { width: 92%; gap: 4vw; grid-template-columns: 1.35fr 1fr; }
    h2 { font-size: clamp(26px, 6.6vw, 40px); }
    .step button { padding-block: 10px; }
    .device::before { right: -10vw; }
  }
  @media (max-height: 580px) {
    h2 { font-size: 24px; margin-bottom: 8px; }
    .step button { padding-block: 4px; font-size: 15px; }
    .detail p { font-size: 13px; padding-bottom: 6px; }
  }
`;e.s(["default",0,function(){let e=(0,i.useRef)(null),r=(0,i.useRef)(null),[o,a]=(0,i.useState)(0);function p(){return e.current.offsetHeight-r.current.offsetHeight}return(0,i.useEffect)(()=>{let e=r.current,t=Array.from(e.querySelectorAll(".detail p"));function i(){let i=Math.max(...t.map(e=>e.offsetHeight));e.style.setProperty("--detail-height",`${i}px`)}i();let o=new ResizeObserver(i);t.forEach(e=>o.observe(e));let n=Array.from(e.querySelectorAll(".step")),s=n.map(()=>0),d=-1,l=0;function c(){n.forEach((e,t)=>{let i=s[t];e.style.setProperty("--open",String(i)),e.style.setProperty("--slide",`${(1-i)*8}px`)})}function h(){let t=Math.min(n.length-1,Math.max(0,Math.round(e.offsetTop/p()*(n.length-1))));if(t===d)return;cancelAnimationFrame(l);let i=-1===d;if(d=t,a(t),i){s[t]=1,c(),e.dataset.animated="";return}let r=s.slice(),o=performance.now();l=requestAnimationFrame(function e(i){let a=Math.min(1,(i-o)/520),p=a*a*(3-2*a);n.forEach((e,i)=>{s[i]=r[i]+((i===t)-r[i])*p}),c(),a<1&&(l=requestAnimationFrame(e))})}return h(),window.addEventListener("scroll",h,{passive:!0}),window.addEventListener("resize",h),()=>{cancelAnimationFrame(l),o.disconnect(),window.removeEventListener("scroll",h),window.removeEventListener("resize",h)}},[]),(0,t.jsx)(d,{id:"phone-story",ref:e,"aria-label":"산들 앱 기능",children:(0,t.jsxs)("div",{className:"stage",ref:r,children:[(0,t.jsxs)("div",{className:"copy",children:[(0,t.jsxs)("h2",{children:["공항 가기 전,",(0,t.jsx)("br",{}),"산들로 한눈에"]}),s.map(({label:i,description:n},d)=>(0,t.jsxs)("div",{className:"step",children:[(0,t.jsx)("button",{type:"button","aria-expanded":o===d,"aria-controls":`phone-detail-${d}`,onClick:()=>{let t;return t=window.scrollY+e.current.getBoundingClientRect().top-parseFloat(getComputedStyle(r.current).top),void(window.scrollTo({top:t+p()*d/(s.length-1),behavior:"instant"}),a(d))},children:i}),(0,t.jsx)("div",{className:"detail",id:`phone-detail-${d}`,"aria-hidden":o!==d,children:(0,t.jsx)("div",{children:(0,t.jsx)("p",{children:n})})})]},i))]}),(0,t.jsx)("div",{className:"device",children:(0,t.jsx)(n,{})})]})})}],8223)},78923,e=>{"use strict";var t=e.i(43476),i=e.i(71645);let r=[{kind:"flight",slot:"flights",label:"김해공항 출발 항공편 검색 예시",title:"내 항공편을 바로 찾아보세요.",description:"항공편 번호나 항공사, 도시로 검색하고 출발·도착 시각과 탑승구를 확인하세요."},{kind:"crowd",slot:"crowd",label:"수속 구간별 혼잡도",title:"공항에 가기 전에, 혼잡도부터.",description:"체크인부터 비행기에 타기까지, 어느 구간이 붐비는지 출발 전에 확인하세요."},{kind:"parking",slot:"parking",label:"국내선 주차장",value:"빈자리에 주차 후 예상 요금 계산",detail:"예시 요율로 90분 이용 시 3,000원",title:"주차 자리와 예상 요금을 함께.",description:"빈자리가 있는 주차장을 찾고, 차를 세워둘 시간과 할인 조건으로 예상 요금을 확인하세요."}],o=[{route:"체크인 → 신분확인",level:"원활"},{route:"신분확인 → 보안검색",level:"혼잡"},{route:"보안검색 → 항공기 탑승",level:"보통"}];function a(e,t,i=1){let r="crowd"===e&&1!==i?`crowd-${i+1}`:e;return`/web/assets/feature-playback/${r}.${t}?v=${r.startsWith("crowd")?12:"parking"===r?5:2}`}function n({kind:e,zone:r}){let o=(0,i.useRef)(null),p=a(e,"mp4",r);return(0,i.useEffect)(()=>{let e=o.current,t=!1;function i(){t&&!document.hidden?e.play().catch(()=>{e.controls=!0}):e.pause()}let r=new IntersectionObserver(([e])=>{t=e.isIntersecting,i()});return r.observe(e),document.addEventListener("visibilitychange",i),()=>{r.disconnect(),document.removeEventListener("visibilitychange",i),e.pause()}},[p]),(0,t.jsx)("video",{ref:o,muted:!0,loop:!0,playsInline:!0,preload:"none","aria-hidden":"true",poster:a(e,"webp",r),src:p})}var p=e.i(97053),s=e.i(5108);let d=p.U.section.withConfig({displayName:"TravelShowcase.styles__Showcase",componentId:"sc-89ccf034-0"})`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 60px) clamp(88px, 11vw, 170px);
  scroll-margin-top: 60px;
  .feature-intro {
    --title-offset: clamp(28px, 3vw, 52px);
    padding: calc(clamp(92px, 8vw, 152px) + var(--title-offset)) 0 clamp(20px, 2vw, 32px);
    text-align: center;
    color: #191f28;
  }
  .feature-intro h2 {
    ${s.landingTitle} margin:0;
    font-size: min(6.6vw, 64px);
    white-space: nowrap;
    font-weight: 700;
    line-height: 1.26;
    letter-spacing: -0.048em;
  }
  .feature-intro p {
    margin: calc(clamp(78px, 7vw, 132px) - var(--title-offset)) auto 0;
    font-size: clamp(20px, 2.35vw, 35px);
    font-weight: 650;
    line-height: 1.75;
    letter-spacing: -0.045em;
    word-break: keep-all;
    text-wrap: balance;
  }
  .keyword-group {
    display: inline-flex;
    align-items: baseline;
    vertical-align: .035em;
    isolation: isolate;
  }
  .keyword-group button {
    --ink: #bedcf9;
    --active-pose: translate(.12em, -.27em) rotate(-3deg);
    --motion-time: 320ms;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border: 0;
    padding: .33em .53em;
    border-radius: 999px;
    background: rgba(240,242,245,.93);
    color: #49515e;
    font: inherit;
    font-size: .85em;
    font-weight: 700;
    letter-spacing: inherit;
    line-height: 1.24;
    cursor: pointer;
    transition: transform var(--motion-time) cubic-bezier(.2,.7,.3,1);
  }
  .keyword-group button + button { margin-left: -.24em; }
  .keyword-group button:nth-child(2) {
    --ink: #bfe4d7;
    --active-pose: translateY(-.32em);
    --ink-start: scale(.15);
    --motion-time: 460ms;
  }
  .keyword-group button:nth-child(3) {
    --ink: #f5d2bd;
    --active-pose: translate(-.1em, -.25em) rotate(3deg);
    --motion-time: 180ms;
  }
  .keyword-group button::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 4% -8% -22%;
    background: radial-gradient(ellipse at 55% 62%, var(--ink), transparent 67%);
    opacity: 0;
    transform: var(--ink-start, none);
    transition: opacity .25s, transform var(--motion-time) ease-out;
  }
  .keyword-group button[aria-pressed='true'], .keyword-group button:focus-visible {
    z-index: 1;
    transform: var(--active-pose);
  }
  .keyword-group button[aria-pressed='true']::before, .keyword-group button:focus-visible::before {
    opacity: 1;
    transform: none;
  }
  @media (hover: hover) {
    .keyword-group:has(button:hover) button:not(:hover) { transform: none; }
    .keyword-group:has(button:hover) button:not(:hover)::before { opacity: 0; }
    .keyword-group button:hover { z-index: 2; transform: var(--active-pose); }
    .keyword-group button:hover::before { opacity: 1; transform: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .keyword-group button, .keyword-group button::before { transition: none; }
  }
  .feature-intro h2 img {
    width: 1em;
    height: 1em;
    vertical-align: -0.12em;
  }
  .feature-intro h2 .home-icon {
    width: 1.35em;
    height: 1.35em;
    margin-right: 0.06em;
    vertical-align: -0.22em;
  }
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  article {
    min-width: 0;
  }
  .feature-visual {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    height: clamp(350px, 31vw, 430px);
    background: #d3e8fa url('/web/assets/feature-sky.webp') center/cover;
  }
  article:first-child .feature-visual {
    border-radius: 32px 0 0 32px;
  }
  article:last-child .feature-visual {
    border-radius: 0 32px 32px 0;
  }
  .feature-model,
  .scene-fallback {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .scene-fallback,
  .feature-visual video {
    object-fit: contain;
  }
  .feature-visual:is([data-media-slot='crowd'], [data-media-slot='parking']) :is(.scene-fallback, video) {
    object-fit: cover;
  }
  .feature-visual video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .feature-model canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  .feature-visual:has([data-ready]) .scene-fallback,
  .feature-visual:has(video) .scene-fallback {
    display: none;
  }
  .scene-reading {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 14px;
    border-radius: 24px;
    white-space: nowrap;
    background: #ffffffe8;
    color: #354c60;
    font-size: 14px;
    pointer-events: none;
  }
  .scene-reading b {
    margin-left: 5px;
  }

  .segment-reading {
    display: grid;
    gap: 3px;
    border-radius: 14px;
    padding: 9px 14px;
    background: rgba(255,255,255,.96);
    line-height: 1.4;
  }
  .segment-reading small { font-size: 12px; color: #53616c; }
  .segment-reading span { font-weight: 600; color: #233749; }
  .segment-reading b { display: inline-block; padding: 2px 7px; border-radius: 6px; font-size: 12px; }
  .segment-reading [data-level='원활'] { background: #e3f4ed; color: #22624a; }
  .segment-reading [data-level='보통'] { background: #edf1f5; color: #41596b; }
  .segment-reading [data-level='혼잡'] { background: #fce9dc; color: #93431e; }

  article h3,
  article > p,
  .demo-choices,
  .replay-search {
    margin-inline: clamp(12px, 1.5vw, 24px);
  }
  article h3 {
    margin-block: 20px 7px;
    font-size: clamp(19px, 1.65vw, 24px);
    line-height: 1.4;
    letter-spacing: -0.035em;
    font-weight: 600;
  }
  article > p {
    margin-block: 0;
    font-size: 15px;
    line-height: 1.7;
    color: #53616c;
  }
  .demo-choices {
    display: flex;
    gap: 4px;
    margin-top: 14px;
  }
  button {
    font: inherit;
    font-size: 14px;
    cursor: pointer;
    border: 0;
    border-radius: 10px;
  }
  .demo-choices button {
    padding: 6px 11px;
    background: #f4f6f8;
    color: #576774;
  }
  .demo-choices button[aria-pressed='true'] {
    background: #e2eff9;
    color: #224c6b;
    font-weight: 600;
  }
  .replay-search {
    margin-top: 14px;
    background: #f4f6f8;
    color: #314d61;
    padding: 6px 11px;
  }
  @media (max-width: 800px) {
    .feature-intro h2 {
      font-size: min(6.6vw, 32px);
    }
    .feature-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .feature-grid article .feature-visual {
      height: 340px;
      border-radius: 24px;
    }
    article h3,
    article > p,
    .demo-choices,
    .replay-search {
      margin-inline: 0;
    }
    article h3 {
      font-size: 22px;
      margin-top: 14px;
    }
  }
`;e.s(["default",0,function(){let p=(0,i.useRef)(null),[s,l]=(0,i.useState)("flight"),[c,h]=(0,i.useState)([]),[x,g]=(0,i.useState)(0),m=c.includes(s)?s:c[0],[f,u]=(0,i.useState)({}),[w,b]=(0,i.useState)(0),[v,y]=(0,i.useState)(90),k=o[w];function z(e){l(e),g(e=>e+1)}return(0,i.useEffect)(()=>{let e=p.current.querySelectorAll("[data-feature-scene]"),t=new Set;function i(){h(document.hidden?[]:Array.from(e).filter(e=>t.has(e)).map(e=>e.dataset.featureScene))}let r=new IntersectionObserver(e=>{for(let i of e)i.isIntersecting?t.add(i.target):t.delete(i.target);i()});return e.forEach(e=>r.observe(e)),document.addEventListener("visibilitychange",i),()=>{r.disconnect(),document.removeEventListener("visibilitychange",i)}},[]),(0,i.useEffect)(()=>{if(document.dispatchEvent(new Event("feature-activate")),!m)return;let e="flight"===m?6e3:"parking"===m?18e3:5e3,t=window.setTimeout(()=>{"crowd"===m&&w<o.length-1?b(w+1):("crowd"===m&&b(0),l(c[(c.indexOf(m)+1)%c.length]))},e);return()=>window.clearTimeout(t)},[m,c,x,w]),(0,i.useEffect)(()=>{let t,i=!0;return e.A(54829).then(({mountFeatureScenes:e})=>{i&&p.current&&(t=e(p.current,e=>{i&&u(t=>({...t,[e]:!0}))}))}).catch(()=>{i&&u({flight:!0,crowd:!0,parking:!0})}),()=>{i=!1,t?.()}},[]),(0,t.jsxs)(d,{ref:p,id:"app-features","aria-labelledby":"app-features-title",children:[(0,t.jsxs)("header",{className:"feature-intro",children:[(0,t.jsxs)("h2",{id:"app-features-title",children:["공항 가기 전 ",(0,t.jsx)("img",{className:"home-icon",src:"/web/brand/home.svg",alt:""}),"집에서도 ",(0,t.jsx)("img",{src:"/web/brand/symbol.svg",alt:""}),(0,t.jsx)("span",{className:"brand-name",children:"산들로"})]}),(0,t.jsxs)("p",{children:["공항 가기 전"," ",(0,t.jsx)("span",{className:"keyword-group",role:"group","aria-label":"산들 기능",children:["항공편","혼잡도","주차"].map((e,i)=>(0,t.jsx)("button",{type:"button","aria-pressed":m===r[i].kind,onClick:()=>z(r[i].kind),children:e},e))})," ","산들에서 확인하세요."]})]}),(0,t.jsx)("div",{className:"feature-grid",children:r.map(e=>(0,t.jsxs)("article",{children:[(0,t.jsxs)("div",{className:"feature-visual","data-media-slot":e.slot,children:[(0,t.jsx)("img",{className:"scene-fallback",alt:"",loading:"lazy",src:a(e.kind,"webp",w)}),(0,t.jsx)("div",{className:"feature-model","data-editorial":"true","data-playing":m===e.kind,"data-zone":"crowd"===e.slot?w:void 0,"data-feature-scene":e.kind,role:"img","aria-label":e.label}),f[e.kind]&&m===e.kind&&(0,t.jsx)(n,{kind:e.kind,zone:w}),"crowd"===e.slot&&(0,t.jsxs)("output",{className:"scene-reading segment-reading",children:[(0,t.jsxs)("small",{children:[w+1,"구간"]}),(0,t.jsxs)("span",{children:[k.route," ",(0,t.jsx)("b",{"data-level":k.level,children:k.level})]})]}),"parking"===e.slot&&(0,t.jsxs)("output",{className:"scene-reading parking-estimate",children:[v,"분 예상 요금 ",(0,t.jsxs)("b",{children:[(1e3*Math.ceil(v/30)).toLocaleString("ko-KR"),"원"]})]})]}),(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("p",{children:e.description}),"flights"===e.slot&&(0,t.jsxs)("button",{className:"replay-search",type:"button",onClick:()=>(function(e){z(e);let t=p.current?.querySelector(`[data-media-slot="${"flight"===e?"flights":e}"] video`);if(t){t.currentTime=0,t.play().catch(()=>{t.controls=!0});return}p.current?.querySelector(`[data-feature-scene="${e}"]`)?.dispatchEvent(new Event("replay-scene"))})("flight"),children:["편명 검색 다시 보기 ",(0,t.jsx)("span",{"aria-hidden":"true",children:"↻"})]}),"crowd"===e.slot&&(0,t.jsx)("div",{className:"demo-choices",role:"group","aria-label":"국내선 수속 구간",children:o.map(({route:e},i)=>(0,t.jsxs)("button",{type:"button","aria-label":`${i+1}구간 \xb7 ${e}`,"aria-pressed":w===i,onClick:()=>{b(i),z("crowd")},children:[i+1,"구간"]},e))}),"parking"===e.slot&&(0,t.jsx)("div",{className:"demo-choices",role:"group","aria-label":"주차 시간",children:[30,60,90].map(e=>(0,t.jsxs)("button",{type:"button","aria-pressed":v===e,onClick:()=>{y(e),z("parking")},children:[e,"분"]},e))})]},e.slot))})]})}],78923)},23050,e=>{e.v(t=>Promise.all(["static/chunks/10-tgxmmstn_z.js","static/chunks/0eue94mnvww99.js"].map(t=>e.l(t))).then(()=>t(99200)))},54829,e=>{e.v(t=>Promise.all(["static/chunks/2jws7p51ye3xu.js","static/chunks/0eue94mnvww99.js"].map(t=>e.l(t))).then(()=>t(40331)))},47414,e=>{"use strict";var t=e.i(97053);let i=t.q`
  from { opacity: 0; }
  to { opacity: 1; }
`,r=t.q`
  from { transform: translateY(22px); }
  to { transform: translateY(0); }
`,o=t.U.section.withConfig({displayName:"flight__FlightScroll",componentId:"sc-69c71d81-0"})`
  :where(&) .showcase {
    height: 690px;
    max-width: 1560px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: #edf4ff;
    border-radius: 32px;
    isolation: isolate;
  }
  :where(&) .showcase-glow {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(ellipse at 8% 70%,#bfdde4,transparent 52%),radial-gradient(ellipse at 80% 0%,#c4c9fb,transparent 55%),radial-gradient(ellipse at 50% 80%,#e7f1fc,transparent 65%);
  }
  :where(&) .showcase-glow:after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(#fff9 1.5px,transparent 1.5px);
    background-size: 22px 22px;
    mask-image: linear-gradient(90deg,#000,transparent 35%,transparent 80%,#000);
  }
  :where(&) .product-window {
    position: absolute;
    top: 55px;
    left: 21%;
    right: 5%;
    height: 535px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 22px;
    box-shadow: 0 28px 80px #41588922;
    overflow: hidden;
  }
  :where(&) .window-bar {
    height: 60px;
    border-bottom: 1px solid #e9edf2;
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 0 24px;
    background: #f9fbfddd;
    font-size: 12px;
    color: #7e8898;
  }
  :where(&) .window-bar strong {
    font-size: 17px;
    color: #191f28;
    display: flex;
    gap: 7px;
    align-items: center;
  }
  :where(&) .window-bar img {
    width: 25px;
  }
  :where(&) .airport-chip {
    margin-left: auto;
    background: #fff;
    padding: 7px 12px;
    border-radius: 9px;
  }
  :where(&) .product-body {
    display: flex;
    height: calc(100% - 60px);
  }
  :where(&) .product-summary {
    width: 34%;
    padding: 27px 24px;
    position: relative;
    z-index: 1;
  }
  :where(&) .mini-label {
    font-size: 10px;
    color: #8995a6;
  }
  :where(&) .product-summary h2 {
    font-size: 25px;
    line-height: 1.4;
    margin: 10px 0;
  }
  :where(&) .product-summary>p {
    font-size: 11px;
    color: #8b95a1;
    line-height: 1.7;
  }
  :where(&) .flight-mini {
    margin-top: 20px;
    border: 1px solid #eaf0f6;
    padding: 15px;
    border-radius: 14px;
    background: #fff;
  }
  :where(&) .flight-mini>span {
    font-size: 10px;
    color: #8b95a1;
  }
  :where(&) .flight-mini>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #3182f6;
  }
  :where(&) .flight-mini b {
    font-size: 25px;
    color: #253b55;
  }
  :where(&) .flight-mini p {
    font-size: 9px;
    color: #8b95a1;
    margin: 3px 0 10px;
  }
  :where(&) .flight-mini p>span,
  :where(&) .flight-mini em {
    float: right;
  }
  :where(&) .flight-mini em {
    font-style: normal;
    color: #3182f6;
  }
  :where(&) .flight-mini hr {
    border: 0;
    border-top: 1px dashed #dbe3ee;
    margin: 15px 0;
  }
  :where(&) .flight-mini>strong {
    font-size: 21px;
    color: #253b55;
  }
  :where(&) .flight-mini strong small {
    font-size: 9px;
    font-weight: 400;
    color: #8b95a1;
  }
  :where(&) .demo-visual {
    position: relative;
    width: 66%;
    overflow: hidden;
    background: #fff;
  }
  :where(&) #scene {
    position: absolute;
    inset: 0;
    transition: opacity .45s;
  }
  :where(&) #scene canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  :where(&) .demo-caption {
    position: absolute;
    bottom: 22px;
    left: 22px;
    right: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #6b7d94;
  }
  :where(&) .live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3182f6;
  }
  :where(&) .phone-preview {
    position: absolute;
    left: 7%;
    top: 190px;
    width: 225px;
    border: 7px solid #23344c;
    border-radius: 37px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 22px 50px #253b5533;
    transform: rotate(-5deg);
  }
  :where(&) .phone-preview img {
    display: block;
    width: 100%;
  }
  :where(&) .demo-note {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 10px;
    color: #8492a7;
  }
  @media (min-width:1600px) {
    :where(&) .showcase {
      height: 760px;
    }
    :where(&) .product-window {
      height: 590px;
    }
    :where(&) .phone-preview {
      width: 260px;
    }
    :where(&) .product-summary {
      padding: 40px;
    }
    :where(&) .product-summary h2 {
      font-size: 30px;
    }
  }
  @media (max-width:800px) {
    :where(&) .showcase {
      border-radius: 22px;
      height: 520px;
      margin: 0 14px;
    }
    :where(&) .product-window {
      left: 10%;
      right: 5%;
      top: 35px;
      height: 380px;
    }
    :where(&) .window-bar {
      height: 44px;
      padding: 0 14px;
    }
    :where(&) .window-bar>span:not(.airport-chip) {
      display: none;
    }
    :where(&) .airport-chip {
      font-size: 9px;
    }
    :where(&) .product-body {
      height: calc(100% - 44px);
    }
    :where(&) .product-summary {
      display: none;
    }
    :where(&) .demo-visual {
      width: 100%;
    }
    :where(&) .phone-preview {
      width: 125px;
      left: 3%;
      top: 210px;
      border-width: 4px;
      border-radius: 21px;
    }
    :where(&) .demo-caption {
      left: auto;
      right: 12px;
      bottom: 18px;
      font-size: 9px;
      gap: 10px;
    }
    :where(&) .demo-note {
      font-size: 8px;
    }
  }
  @media (min-width:801px) {
    :where(&) .phone-preview {
      left: 4%;
      width: 200px;
    }
  }
  @media (min-width:1600px) {
    :where(&) .phone-preview {
      width: 240px;
    }
  }
  :where(&) .showcase {
    max-width: 1320px;
    height: 700px;
    margin: 0 auto;
    border-radius: 32px;
  }
  :where(&) .product-window {
    top: 80px;
    left: 27%;
    right: 8%;
    height: 560px;
  }
  :where(&) .product-summary {
    width: 36%;
    padding: 27px 20px;
  }
  :where(&) .demo-visual {
    width: 64%;
  }
  :where(&) .phone-preview {
    left: 8%;
    top: 240px;
    width: 235px;
    transform: none;
    border-radius: 37px;
  }
  :where(&) .demo-note {
    bottom: 10px;
  }
  @media (max-width:1400px) {
    :where(&) .showcase {
      margin: 0 40px;
    }
    :where(&) .product-summary h2 {
      font-size: 23px;
    }
    :where(&) .phone-preview {
      width: 210px;
    }
  }
  @media (max-width:1000px) and (min-width:801px) {
    :where(&) .product-summary {
      display: none;
    }
    :where(&) .demo-visual {
      width: 100%;
    }
  }
  @media (max-width:800px) {
    :where(&) .showcase {
      height: 470px;
      margin: 0 20px;
      border-radius: 24px;
    }
    :where(&) .product-window {
      top: 38px;
      left: 19%;
      right: 5%;
      height: 370px;
    }
    :where(&) .product-summary {
      display: none;
    }
    :where(&) .demo-visual {
      width: 100%;
    }
    :where(&) .phone-preview {
      left: 5%;
      top: 200px;
      width: 120px;
      border-radius: 21px;
    }
    :where(&) .demo-caption {
      font-size: 8px;
    }
    :where(&) .demo-note {
      bottom: 9px;
    }
  }
  :where(&).flight-scroll {
    height: 250svh;
    position: relative;
    margin-bottom: 140px;
  }
  :where(&) .flight-stage {
    position: sticky;
    top: 80px;
    height: min(72svh,700px);
    background: #edf5ff;
    isolation: isolate;
    overflow: hidden;
  }
  :where(&) .flight-stage #scene {
    inset: 0;
    transition: none;
  }
  :where(&) .flight-stage-caption {
    position: absolute;
    left: 36px;
    right: 36px;
    bottom: 28px;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    font-size: 12px;
    color: #526b89;
  }
  :where(&) .flight-stage-caption span:last-child {
    font-size: 10px;
    letter-spacing: 1.5px;
  }
  @media (max-width:800px) {
    :where(&).flight-scroll {
      height: 215svh;
      margin-bottom: 80px;
    }
    :where(&) .flight-stage {
      height: 65svh;
      top: 80px;
    }
    :where(&) .flight-stage-caption {
      left: 20px;
      right: 20px;
      bottom: 22px;
      font-size: 10px;
    }
    :where(&) .flight-stage-caption span:last-child {
      font-size: 8px;
    }
  }
  :where(&) .flight-stage {
    --stage-height: min(72svh,700px);
    height: var(--stage-height);
    top: calc(60px + (100svh - 60px - var(--stage-height))/2);
  }
  @media (max-width:800px) {
    :where(&) .flight-stage {
      --stage-height: 65svh;
    }
  }
  :where(&) .flight-stage #scene {
    contain: paint;
    isolation: isolate;
  }
  .hero-poster {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .hero-poster img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    max-width: none;
    height: 100%;
  }
  @media (prefers-reduced-motion: no-preference) {
    :where(&) .flight-stage {
      animation: ${r} 620ms cubic-bezier(.2,.7,.25,1);
    }
    :where(&) #scene > canvas {
      animation: ${i} 160ms ease-out backwards;
    }
  }
`;e.s(["FlightScroll",0,o])},28755,e=>{"use strict";var t=e.i(97053);let i=t.U.footer.withConfig({displayName:"footer__SiteFooter",componentId:"sc-6b749aec-0"})`
  position: relative;
  z-index: 1;
  background: transparent;
  padding: 32px 0 38px;
  color: #63717e;
  font-size: 12px;
  line-height: 1.8;
  .section-shell { display:grid; grid-template-columns:auto 1fr auto; gap:12px 24px; align-items:center; }
  img { display:block; filter:grayscale(1); opacity:.55; }
  .footer-info { display:grid; gap:2px; }
  .contact, nav { display:flex; align-items:center; flex-wrap:wrap; column-gap:8px; }
  nav { column-gap:20px; }
  nav a { display:inline-flex; align-items:center; min-height:36px; }
  a { text-decoration:none; }
  a:hover { text-decoration:underline; text-underline-offset:4px; }
  @media (max-width:760px) {
    padding:24px 0 32px;
    .section-shell { grid-template-columns:auto 1fr; gap:6px 12px; }
    .footer-info { grid-row:2; grid-column:1 / -1; }
    nav { grid-column:2; grid-row:1; justify-self:end; column-gap:12px; }
  }
`;e.s(["SiteFooter",0,i])},52399,e=>{"use strict";var t=e.i(97053);let i=t.U.header.withConfig({displayName:"header__SiteHeader",componentId:"sc-35828182-0"})`
  :where(&).top {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(255,255,255,.92);
    /* 기존 화면과 동일하게 WebKit 선언을 적용한다. */
    -webkit-backdrop-filter: blur(10px);
  }
  :where(&).top .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: 60px;
  }
  :where(&) .brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    white-space: nowrap;
    text-decoration: none;
    color: var(--ink);
    font-weight: 700;
    font-size: 18px;
    line-height: 1;
  }
  :where(&) .brand img {
    display: block;
    width: auto;
    height: 30px;
    object-fit: contain;
    border-radius: 0;
  }
  :where(&).top nav {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 15px;
    white-space: nowrap;
    min-width: 0;
  }
  :where(&).top nav a,
  :where(&).top nav button {
    text-decoration: none;
    font: inherit;
    color: var(--ink2);
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  :where(&).top nav a:hover,
  :where(&).top nav button:hover {
    color: var(--ink);
  }
  :where(&).top nav .app-download {
    padding: 8px 13px;
    border-radius: 12px;
    background: #202124;
    color: #fff;
    font-weight: 500;
    line-height: 20px;
  }
  :where(&).top nav .app-download:hover { background: #35363a; color: #fff; }
  @media (max-width:400px) {
    :where(&).top .wrap, :where(&).top nav { gap: 8px; }
    :where(&) .brand img { height: 24px; }
    :where(&).top nav .app-download { padding-inline: 10px; }
  }
  @media (max-width:800px) {
    :where(&).top nav {
      font-size: 14px;
    }
  }
  :where(&).top .wrap {
    max-width: 1320px;
    width: calc(100% - 80px);
    padding: 0;
  }
  @media (max-width:800px) {
    :where(&).top .wrap {
      width: calc(100% - 48px);
    }
  }
`;e.s(["SiteHeader",0,i])},5108,e=>{"use strict";var t=e.i(97053);let i=t.m`
  font-family: Pretendard,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  font-size: 48px;
  font-weight: 600;
  line-height: 70px;
  letter-spacing: -.02em;
  color: #08090b;

  @media (min-width:801px) and (max-width:1400px) { font-size: 44px; }
  @media (min-width:801px) and (max-width:1150px) { font-size: 36px; line-height: 1.55; }
  @media (max-width:800px) { font-size: 32px; line-height: 1.5; }
`,r=t.U.section.withConfig({displayName:"hero__HeroIntro",componentId:"sc-18f79302-0"})`
  :where(&).hero-intro {
    text-align: center;
    padding: 70px 24px 48px;
  }
  :where(&) .kicker {
    font-size: 15px;
    color: #3182f6;
    font-weight: 600;
    margin: 0 0 18px;
  }
  :where(&).hero-intro h1 {
    font-size: clamp(44px,4.5vw,68px);
    line-height: 1.22;
    letter-spacing: -.025em;
  }
  :where(&) .hero-desc {
    font-size: 19px;
    line-height: 1.7;
    margin: 23px 0 26px;
    color: #687382;
  }
  :where(&) .download {
    display: inline-flex;
    gap: 24px;
    align-items: center;
    border: 0;
    border-radius: 13px;
    background: #3182f6;
    color: #fff;
    padding: 16px 25px;
    font: 600 16px Pretendard,sans-serif;
    cursor: pointer;
  }
  :where(&) .download:hover {
    background: #206fe0;
  }
  :where(&).hero-intro>small {
    display: block;
    font-size: 12px;
    color: #9098a5;
    margin-top: 12px;
  }
  @media (max-width:800px) {
    :where(&).hero-intro {
      padding: 48px 20px 36px;
    }
    :where(&).hero-intro h1 {
      font-size: 43px;
    }
    :where(&) .hero-desc {
      font-size: 15px;
    }
  }
  :where(&).hero-intro {
    max-width: 1320px;
    margin: 0 auto;
    padding: 80px 0 60px;
    display: grid;
    grid-template-columns: 1.55fr 1fr;
    gap: 48px;
    align-items: start;
    text-align: left;
  }
  :where(&).hero-intro h1 {
    font-size: 52px;
    line-height: 1.35;
    letter-spacing: -.035em;
    color: #08090b;
  }
  :where(&) .hero-desc {
    font-size: 17px;
    line-height: 1.7;
    color: #191f28;
    margin: 0 0 26px;
  }
  :where(&) .hero-action .download {
    background: #242427;
    border-radius: 999px;
    font-size: 16px;
    padding: 13px 23px;
    line-height: 1.5;
  }
  :where(&) .hero-action .download:hover {
    background: #414147;
  }
  @media (max-width:1400px) {
    :where(&).hero-intro {
      margin: 0 40px;
      padding-top: 65px;
      padding-bottom: 48px;
      gap: 35px;
    }
    :where(&).hero-intro h1 {
      font-size: 48px;
    }
    :where(&) .hero-desc {
      font-size: 15px;
    }
  }
  @media (max-width:1000px) and (min-width:801px) {
    :where(&).hero-intro {
      grid-template-columns: 1.2fr 1fr;
      gap: 30px;
    }
    :where(&).hero-intro h1 {
      font-size: 39px;
    }
  }
  @media (max-width:800px) {
    :where(&).hero-intro {
      display: block;
      margin: 0;
      padding: 45px 24px 34px;
    }
    :where(&).hero-intro h1 {
      font-size: 38px;
      line-height: 1.35;
    }
    :where(&) .hero-action {
      margin-top: 24px;
    }
    :where(&) .hero-desc {
      font-size: 14px;
      margin-bottom: 20px;
    }
    :where(&) .hero-action .download {
      font-size: 14px;
      padding: 12px 21px;
    }
  }
  :where(&).hero-intro {
    grid-template-columns: minmax(0,1.55fr) minmax(0,1fr);
    gap: 48px;
  }
  :where(&).hero-intro h1 {
    ${i}
  }
  @media (min-width:801px) and (max-width:1400px) {
    :where(&).hero-intro {
      grid-template-columns: minmax(0,1.7fr) minmax(0,1fr);
      gap: 32px;
    }
  }
  @media (max-width:800px) {
    :where(&).hero-intro h1 { max-width: 570px; }
  }
`;e.s(["HeroIntro",0,r,"landingTitle",0,i])},3108,e=>{"use strict";var t=e.i(97053);let i=t.U.div.withConfig({displayName:"landing-ending__LandingEnding",componentId:"sc-ed3474a1-0"})`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: calc(100dvh - 60px);
  background: #fff;

  .closing-panel {
    display: grid;
    place-items: center;
    padding: clamp(20px, 4vh, 48px) 0;
  }
  .closing-content { text-align: center; }
  .closing-content h2 {
    font-weight: 600;
    letter-spacing: -.02em;
    margin: 0;
    font-size: clamp(50px, 7vw, 100px);
    line-height: 1.2;
    color: var(--ink);
  }
  .store-picker { width: fit-content; margin: clamp(24px, 4vh, 40px) auto 0; }
  summary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: fit-content;
    margin: 0 auto;
    min-height: 44px;
    padding: 0 22px;
    border-radius: 999px;
    background: #202124;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    list-style: none;
  }
  summary::-webkit-details-marker { display: none; }
  summary span { font-size: 22px; line-height: 1; }
  details[open] summary span { transform: rotate(90deg); }
  .store-options { display: flex; gap: 8px; justify-content: center; margin-top: 12px; }
  .store-options > * {
    background: #fff; color: #343b45; font: inherit; font-size: 14px;
    border: 1px solid #e3e6e9; border-radius: 12px; padding: 10px 16px;
    text-decoration: none; cursor: pointer;
  }
`;e.s(["LandingEnding",0,i])},71145,e=>{"use strict";var t=e.i(97053),i=e.i(5108);let r=t.U.div.withConfig({displayName:"product-story__ProductStory",componentId:"sc-1e4cfab2-0"})`
 color:#191b20;
 .push-summary { box-sizing:border-box; max-width:1320px; margin:auto; padding:0 clamp(20px,4vw,60px) clamp(72px,9vw,144px);
   display:grid; grid-template-columns:.9fr 1.1fr; align-items:center; gap:clamp(32px,5vw,90px); scroll-margin-top:80px; }
 .ticket-copy h2 { ${i.landingTitle} font-size:clamp(32px,3.6vw,54px); line-height:1.22; letter-spacing:-.055em; margin:12px 0 16px; }
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
`;e.s(["ProductStory",0,r])},95036,e=>{"use strict";var t=e.i(97053);let i=t.U.div.withConfig({displayName:"toast__Toast",componentId:"sc-7c10f9a7-0"})`
  :where(&)#ai-toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    background: #191f28;
    color: #fff;
    padding: 14px 22px;
    border-radius: 12px;
    font-size: 14px;
    box-shadow: 0 8px 24px #191f2826;
    max-width: calc(100% - 40px);
    width: max-content;
    opacity: 0;
    visibility: hidden;
    transition: opacity .2s;
  }
  :where(&)#ai-toast.show {
    opacity: 1;
    visibility: visible;
  }
`;e.s(["Toast",0,i])}]);