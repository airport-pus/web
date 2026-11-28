(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72041,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(97053);let a=r.U.div.withConfig({displayName:"JourneyFilm__HomeFilm",componentId:"sc-1f0d1ba5-0"})`
  position:absolute; inset:0; overflow:hidden; background:#5386b9;
  .home-poster,.home-world { position:absolute; inset:0; width:100%; height:100%; }
  .home-poster img { display:block; width:100%; height:100%; object-fit:cover; }
  .home-poster { transition:opacity 700ms ease; }
  .home-world { opacity:0; transition:opacity 700ms ease; }
  &[data-ready='true'] .home-poster { opacity:0; }
  &[data-ready='true'] .home-world { opacity:1; }
  canvas { display:block; width:100%; height:100%; }
`;function n(){let r=(0,i.useRef)(null),n=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t,i=!1,a=0,o=-1,s=!1,d=!0,p=0,l=0,c=0,h=new IntersectionObserver(([e])=>{d=e.isIntersecting});r.current&&h.observe(r.current);let m=(e=performance.now())=>{if(i)return;let n=l?Math.max(0,Math.min((e-l)/1e3,.05)):0;l=e;let h=d&&!document.hidden;if(h&&(p+=n),r.current&&t&&h){let i=parseFloat(getComputedStyle(r.current).getPropertyValue("--journey-progress"))||0,a=window.innerWidth<800;(Math.abs(i-o)>1e-4||a!==s||e-c>=1e3/30)&&(t.updateFlight(i,a,p),c=e,o=i,s=a)}a=requestAnimationFrame(m)};return e.A(6413).then(({createExperience:e})=>{!i&&n.current&&(t=e(n.current),m(),r.current?.setAttribute("data-ready","true"))}).catch(()=>{}),()=>{i=!0,cancelAnimationFrame(a),h.disconnect(),t?.dispose()}},[]),(0,t.jsxs)(a,{ref:r,role:"img","aria-label":"공항 터미널의 큰 창 너머 비행기를 따라가는 연속된 3D 장면",children:[(0,t.jsx)("div",{className:"home-poster","aria-hidden":"true"}),(0,t.jsx)("div",{className:"home-world",ref:n,"aria-hidden":"true"})]})}let o=r.q`
  from { background-position:0% 50%; }
  to { background-position:100% 50%; }
`,s=r.q`
  from { opacity:0; transform:translateY(16px); }
  to { opacity:1; transform:translateY(0); }
`,d=r.q`
  from { opacity:0; transform:translateY(44px); }
  to { opacity:1; transform:translateY(0); }
`,p=r.U.section.withConfig({displayName:"journey-hero__JourneyHeroLayout",componentId:"sc-2bd8bc6f-0"})`
  height:360svh; position:relative; background:#fff;
  .journey-stage { position:sticky; top:0; height:100svh; overflow:hidden; isolation:isolate; --expand:0; --aperture:0; --product:0; --screen:0; --title-opacity:1; }
  .journey-stage::before {
    content:''; position:absolute; inset:0; z-index:-1; pointer-events:none;
    background-image:linear-gradient(rgba(83,134,185,.075) 1px,transparent 1px),linear-gradient(90deg,rgba(83,134,185,.075) 1px,transparent 1px);
    background-size:128px 128px;
    mask-image:linear-gradient(transparent,#000 20%,#000 80%,transparent);
  }
  .journey-title { position:absolute; top:calc(51svh - 60px); width:100%; padding:0 30px; text-align:center; opacity:var(--title-opacity); transform:translateY(calc(-50% - var(--expand) * 100px)); }
  h1 { font-family:Outfit,sans-serif; font-size:clamp(40px,5.625vw,108px); font-weight:500; letter-spacing:-.025em; line-height:1; color:#171c23; word-break:normal; }
  .title-break { display:none; }
  .journey-brand {
    display:inline-block; white-space:nowrap;
    color:transparent; -webkit-text-fill-color:transparent;
    background:linear-gradient(110deg,#2563b9 0%,#3182f6 25%,#8bd2f5 50%,#3182f6 75%,#2563b9 100%);
    background-size:250% 100%; background-position:0% 50%;
    background-clip:text; -webkit-background-clip:text;
    animation:${o} 3.5s ease-in-out infinite alternate;
  }
  .journey-scene { position:absolute; top:calc((73.3svh - 60px) * (1 - var(--expand))); left:calc(11.85% * (1 - var(--expand))); width:calc(76.3% + 23.7% * var(--expand)); height:100svh; border-radius:calc(170px * (1 - var(--expand))) calc(170px * (1 - var(--expand))) 0 0; background:#5386b9; overflow:hidden; isolation:isolate; }
  h1 { animation:${s} 1200ms cubic-bezier(.22,.7,.3,1) both paused; }
  .journey-scene { animation:${d} 2700ms cubic-bezier(.22,.7,.3,1) 550ms both paused; }
  &[data-intro='playing'] {
    h1,.journey-scene { animation-play-state:running; }
  }
  @media(max-width:800px) {
    height:330svh;
    .journey-title { top:calc(38svh - 60px); padding:0 20px; }
    h1 { font-size:8vw; }
    .brand-phrase, .title-break { display:block; }
    .journey-scene { top:calc((55svh - 60px) * (1 - var(--expand))); left:calc(5% * (1 - var(--expand))); width:calc(90% + 10% * var(--expand)); border-radius:calc(80px * (1 - var(--expand))) calc(80px * (1 - var(--expand))) 0 0; }
  }
`;e.s(["default",0,function(){let e=(0,i.useRef)(null),r=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t=!1,i=0,r=0;return Promise.race([document.fonts.load("500 81px Outfit").catch(()=>{}),new Promise(e=>{r=window.setTimeout(e,300)})]).then(()=>{clearTimeout(r),t||(i=requestAnimationFrame(()=>{i=requestAnimationFrame(()=>{t||e.current?.setAttribute("data-intro","playing")})}))}),()=>{t=!0,clearTimeout(r),cancelAnimationFrame(i)}},[]),(0,i.useEffect)(()=>{let t=0,i=0,a=matchMedia("(prefers-reduced-motion: reduce)");function n(){if(t=0,!e.current||!r.current)return;let a=Math.max(1,e.current.offsetHeight-r.current.offsetHeight),o=Math.max(0,Math.min(1,-e.current.getBoundingClientRect().top/a));i+=(o-i)*.075,5e-4>Math.abs(o-i)&&(i=o),r.current.style.setProperty("--journey-progress",String(i)),r.current.style.setProperty("--expand",String(Math.min(1,i/.392))),r.current.style.setProperty("--title-opacity",String(Math.max(0,1-4*i))),i!==o&&(t=requestAnimationFrame(n))}let o=()=>{t||(t=requestAnimationFrame(n))};return window.addEventListener("scroll",o,{passive:!0}),window.addEventListener("resize",o),a.addEventListener("change",o),n(),()=>{cancelAnimationFrame(t),window.removeEventListener("scroll",o),window.removeEventListener("resize",o),a.removeEventListener("change",o)}},[]),(0,t.jsx)(p,{ref:e,"aria-labelledby":"journey-title",children:(0,t.jsxs)("div",{className:"journey-stage",ref:r,children:[(0,t.jsx)("div",{className:"journey-title",children:(0,t.jsxs)("h1",{id:"journey-title","aria-label":"Fly light, Sandeul.",children:[(0,t.jsx)("span",{"aria-hidden":"true",children:"Fly light, "}),(0,t.jsx)("span",{className:"journey-brand","aria-hidden":"true",children:"Sandeul."})]})}),(0,t.jsx)("div",{className:"journey-scene",children:(0,t.jsx)(n,{})})]})})}],72041)},22229,e=>{"use strict";var t=e.i(71645);e.s(["default",0,function(){return(0,t.useEffect)(()=>{let e=document.querySelector("header.top");if(!e)return;let t=Math.max(0,window.scrollY),i=()=>{let i=Math.max(0,window.scrollY),r=i-t;if(i<=60)e.dataset.hidden="false";else{if(!(Math.abs(r)>=8))return;e.dataset.hidden=String(r>0)}t=i};return window.addEventListener("scroll",i,{passive:!0}),()=>{window.removeEventListener("scroll",i),delete e.dataset.hidden}},[]),(0,t.useEffect)(()=>{let t,i=!1;return e.A(23050).then(({mountLanding:e})=>{i||(t=e())}).catch(console.error),()=>{i=!0,t?.()}},[]),null}])},8223,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(97053);let a=r.U.div.withConfig({displayName:"PhoneMockup__Frame",componentId:"sc-5ea90d80-0"})`
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
`,n=r.U.div.withConfig({displayName:"PhoneMockup__Screen",componentId:"sc-5ea90d80-1"})`
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
`;function o({screenSrc:e,alt:i=""}){return(0,t.jsx)(a,{"aria-hidden":!e||void 0,children:(0,t.jsx)(n,{children:e&&(0,t.jsx)("img",{src:e,alt:i,loading:"lazy"})})})}var s=e.i(5108);let d=[{label:"운항정보",description:"내 항공편을 찾아 출발 시각과 탑승구를 확인하세요. 일정이 바뀌면 변경된 시각도 함께 볼 수 있어요."},{label:"공항 혼잡도",description:"어느 구간이 붐비는지 미리 살펴보고, 공항으로 출발할 시간을 정하세요."},{label:"주차 현황",description:"주차장마다 남은 자리를 비교하고 어디에 차를 세울지 골라보세요."},{label:"주차 요금",description:"차를 세워 둘 시간과 할인 조건을 선택해 예상 주차 요금을 확인하세요."},{label:"내 항공권",description:"여행 당일 다시 찾게 되는 내 항공편 정보를 한곳에서 살펴보세요."}],p=r.U.section.withConfig({displayName:"PhoneStory__Story",componentId:"sc-af551e33-0"})`
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
    ${s.f}
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
`;e.s(["default",0,function(){let e=(0,i.useRef)(null),r=(0,i.useRef)(null),[a,n]=(0,i.useState)(0);function s(){return e.current.offsetHeight-r.current.offsetHeight}return(0,i.useEffect)(()=>{let e=r.current,t=Array.from(e.querySelectorAll(".detail p"));function i(){let i=Math.max(...t.map(e=>e.offsetHeight));e.style.setProperty("--detail-height",`${i}px`)}i();let a=new ResizeObserver(i);t.forEach(e=>a.observe(e));let o=Array.from(e.querySelectorAll(".step")),d=o.map(()=>0),p=-1,l=0;function c(){o.forEach((e,t)=>{let i=d[t];e.style.setProperty("--open",String(i)),e.style.setProperty("--slide",`${(1-i)*8}px`)})}function h(){let t=Math.min(o.length-1,Math.max(0,Math.round(e.offsetTop/s()*(o.length-1))));if(t===p)return;cancelAnimationFrame(l);let i=-1===p;if(p=t,n(t),i){d[t]=1,c(),e.dataset.animated="";return}let r=d.slice(),a=performance.now();l=requestAnimationFrame(function e(i){let n=Math.min(1,(i-a)/520),s=n*n*(3-2*n);o.forEach((e,i)=>{d[i]=r[i]+((i===t)-r[i])*s}),c(),n<1&&(l=requestAnimationFrame(e))})}return h(),window.addEventListener("scroll",h,{passive:!0}),window.addEventListener("resize",h),()=>{cancelAnimationFrame(l),a.disconnect(),window.removeEventListener("scroll",h),window.removeEventListener("resize",h)}},[]),(0,t.jsx)(p,{id:"phone-story",ref:e,"aria-label":"산들 앱 기능",children:(0,t.jsxs)("div",{className:"stage",ref:r,children:[(0,t.jsxs)("div",{className:"copy",children:[(0,t.jsxs)("h2",{children:["공항 가기 전,",(0,t.jsx)("br",{}),"산들로 한눈에"]}),d.map(({label:i,description:o},p)=>(0,t.jsxs)("div",{className:"step",children:[(0,t.jsx)("button",{type:"button","aria-expanded":a===p,"aria-controls":`phone-detail-${p}`,onClick:()=>{let t;return t=window.scrollY+e.current.getBoundingClientRect().top-parseFloat(getComputedStyle(r.current).top),void(window.scrollTo({top:t+s()*p/(d.length-1),behavior:"instant"}),n(p))},children:i}),(0,t.jsx)("div",{className:"detail",id:`phone-detail-${p}`,"aria-hidden":a!==p,children:(0,t.jsx)("div",{children:(0,t.jsx)("p",{children:o})})})]},i))]}),(0,t.jsx)("div",{className:"device",children:(0,t.jsx)(o,{})})]})})}],8223)},78923,e=>{"use strict";var t=e.i(43476),i=e.i(88058),r=e.i(71645);let a=[{kind:"flight",slot:"flights",label:"김해공항 출발 항공편 검색 예시",title:"내 항공편을 바로 찾아보세요.",description:"항공편 번호나 항공사, 도시로 검색하고 출발·도착 시각과 탑승구를 확인하세요."},{kind:"crowd",slot:"crowd",label:"수속 구간별 혼잡도",title:"공항에 가기 전에, 혼잡도부터.",description:"체크인부터 비행기에 타기까지, 어느 구간이 붐비는지 출발 전에 확인하세요."},{kind:"parking",slot:"parking",label:"국내선 주차장",value:"빈자리에 주차 후 예상 요금 계산",detail:"예시 요율로 90분 이용 시 3,000원",title:"주차 자리와 예상 요금을 함께.",description:"빈자리가 있는 주차장을 찾고, 차를 세워둘 시간과 할인 조건으로 예상 요금을 확인하세요."}],n=[{route:"체크인 → 신분확인",level:"원활"},{route:"신분확인 → 보안검색",level:"혼잡"},{route:"보안검색 → 항공기 탑승",level:"보통"}];function o(e,t,r=1){let a="crowd"===e&&1!==r?`crowd-${r+1}`:e;return(0,i.f)(`/assets/feature-playback/${a}.${t}?v=${a.startsWith("crowd")?12:"parking"===a?5:2}`)}function s({kind:e,zone:i}){let a=(0,r.useRef)(null),n=o(e,"mp4",i);return(0,r.useEffect)(()=>{let e=a.current,t=!1;function i(){t&&!document.hidden?e.play().catch(()=>{e.controls=!0}):e.pause()}let r=new IntersectionObserver(([e])=>{t=e.isIntersecting,i()});return r.observe(e),document.addEventListener("visibilitychange",i),()=>{r.disconnect(),document.removeEventListener("visibilitychange",i),e.pause()}},[n]),(0,t.jsx)("video",{ref:a,muted:!0,loop:!0,playsInline:!0,preload:"none","aria-hidden":"true",poster:o(e,"webp",i),src:n})}var d=e.i(97053),p=e.i(5108);let l=d.U.section.withConfig({displayName:"TravelShowcase.styles__Showcase",componentId:"sc-89ccf034-0"})`
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
    ${p.f} margin:0;
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
    background: #d3e8fa url("${(0,i.f)("/assets/feature-sky.webp")}") center/cover;
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
`;e.s(["default",0,function(){let d=(0,r.useRef)(null),[p,c]=(0,r.useState)("flight"),[h,m]=(0,r.useState)([]),[f,u]=(0,r.useState)(0),g=h.includes(p)?p:h[0],[x,b]=(0,r.useState)({}),[w,v]=(0,r.useState)(0),[y,k]=(0,r.useState)(90),j=n[w];function z(e){c(e),u(e=>e+1)}return(0,r.useEffect)(()=>{let e=d.current.querySelectorAll("[data-feature-scene]"),t=new Set;function i(){m(document.hidden?[]:Array.from(e).filter(e=>t.has(e)).map(e=>e.dataset.featureScene))}let r=new IntersectionObserver(e=>{for(let i of e)i.isIntersecting?t.add(i.target):t.delete(i.target);i()});return e.forEach(e=>r.observe(e)),document.addEventListener("visibilitychange",i),()=>{r.disconnect(),document.removeEventListener("visibilitychange",i)}},[]),(0,r.useEffect)(()=>{if(document.dispatchEvent(new Event("feature-activate")),!g)return;let e="flight"===g?6e3:"parking"===g?18e3:5e3,t=window.setTimeout(()=>{"crowd"===g&&w<n.length-1?v(w+1):("crowd"===g&&v(0),c(h[(h.indexOf(g)+1)%h.length]))},e);return()=>window.clearTimeout(t)},[g,h,f,w]),(0,r.useEffect)(()=>{let t,i=!0;return e.A(54829).then(({mountFeatureScenes:e})=>{i&&d.current&&(t=e(d.current,e=>{i&&b(t=>({...t,[e]:!0}))}))}).catch(()=>{i&&b({flight:!0,crowd:!0,parking:!0})}),()=>{i=!1,t?.()}},[]),(0,t.jsxs)(l,{ref:d,id:"app-features","aria-labelledby":"app-features-title",children:[(0,t.jsxs)("header",{className:"feature-intro",children:[(0,t.jsxs)("h2",{id:"app-features-title",children:["공항 가기 전 ",(0,t.jsx)("img",{className:"home-icon",src:(0,i.f)("/brand/home.svg"),alt:""}),"집에서도 ",(0,t.jsx)("img",{src:(0,i.f)("/brand/symbol.svg"),alt:""}),(0,t.jsx)("span",{className:"brand-name",children:"산들로"})]}),(0,t.jsxs)("p",{children:["공항 가기 전"," ",(0,t.jsx)("span",{className:"keyword-group",role:"group","aria-label":"산들 기능",children:["항공편","혼잡도","주차"].map((e,i)=>(0,t.jsx)("button",{type:"button","aria-pressed":g===a[i].kind,onClick:()=>z(a[i].kind),children:e},e))})," ","산들에서 확인하세요."]})]}),(0,t.jsx)("div",{className:"feature-grid",children:a.map(e=>(0,t.jsxs)("article",{children:[(0,t.jsxs)("div",{className:"feature-visual","data-media-slot":e.slot,children:[(0,t.jsx)("img",{className:"scene-fallback",alt:"",loading:"lazy",src:o(e.kind,"webp",w)}),(0,t.jsx)("div",{className:"feature-model","data-editorial":"true","data-playing":g===e.kind,"data-zone":"crowd"===e.slot?w:void 0,"data-feature-scene":e.kind,role:"img","aria-label":e.label}),x[e.kind]&&g===e.kind&&(0,t.jsx)(s,{kind:e.kind,zone:w}),"crowd"===e.slot&&(0,t.jsxs)("output",{className:"scene-reading segment-reading",children:[(0,t.jsxs)("small",{children:[w+1,"구간"]}),(0,t.jsxs)("span",{children:[j.route," ",(0,t.jsx)("b",{"data-level":j.level,children:j.level})]})]}),"parking"===e.slot&&(0,t.jsxs)("output",{className:"scene-reading parking-estimate",children:[y,"분 예상 요금 ",(0,t.jsxs)("b",{children:[(1e3*Math.ceil(y/30)).toLocaleString("ko-KR"),"원"]})]})]}),(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("p",{children:e.description}),"flights"===e.slot&&(0,t.jsxs)("button",{className:"replay-search",type:"button",onClick:()=>(function(e){z(e);let t=d.current?.querySelector(`[data-media-slot="${"flight"===e?"flights":e}"] video`);if(t){t.currentTime=0,t.play().catch(()=>{t.controls=!0});return}d.current?.querySelector(`[data-feature-scene="${e}"]`)?.dispatchEvent(new Event("replay-scene"))})("flight"),children:["편명 검색 다시 보기 ",(0,t.jsx)("span",{"aria-hidden":"true",children:"↻"})]}),"crowd"===e.slot&&(0,t.jsx)("div",{className:"demo-choices",role:"group","aria-label":"국내선 수속 구간",children:n.map(({route:e},i)=>(0,t.jsxs)("button",{type:"button","aria-label":`${i+1}구간 \xb7 ${e}`,"aria-pressed":w===i,onClick:()=>{v(i),z("crowd")},children:[i+1,"구간"]},e))}),"parking"===e.slot&&(0,t.jsx)("div",{className:"demo-choices",role:"group","aria-label":"주차 시간",children:[30,60,90].map(e=>(0,t.jsxs)("button",{type:"button","aria-pressed":y===e,onClick:()=>{k(e),z("parking")},children:[e,"분"]},e))})]},e.slot))})]})}],78923)},23050,e=>{e.v(t=>Promise.all(["static/chunks/0zfbfnjgpc3uj.js","static/chunks/2hbdd05dbhgtn.js"].map(t=>e.l(t))).then(()=>t(99200)))},54829,e=>{e.v(t=>Promise.all(["static/chunks/2jws7p51ye3xu.js","static/chunks/2hbdd05dbhgtn.js"].map(t=>e.l(t))).then(()=>t(40331)))},6413,e=>{e.v(t=>Promise.all(["static/chunks/37su0jiut4ml8.js","static/chunks/2hbdd05dbhgtn.js"].map(t=>e.l(t))).then(()=>t(15288)))},28755,e=>{"use strict";var t=e.i(97053);let i=t.U.footer.withConfig({displayName:"footer__SiteFooter",componentId:"sc-6b749aec-0"})`
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
    background: rgba(255,255,255,.68);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: transform 280ms cubic-bezier(.22,.7,.3,1);
  }
  :where(&).top[data-hidden='true'] {
    transform: translateY(-100%);
    pointer-events: none;
  }
  :where(&).top:focus-within {
    transform: translateY(0);
    pointer-events: auto;
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
`;t.U.section.withConfig({displayName:"hero__HeroIntro",componentId:"sc-18f79302-0"})`
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
`,e.s(["f",0,i])},3108,e=>{"use strict";var t=e.i(97053);let i=t.U.div.withConfig({displayName:"landing-ending__LandingEnding",componentId:"sc-ed3474a1-0"})`
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
 .ticket-copy h2 { ${i.f} font-size:clamp(32px,3.6vw,54px); line-height:1.22; letter-spacing:-.055em; margin:12px 0 16px; }
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