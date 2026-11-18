import {mountFeatureScenes} from './feature-scenes.js';
import {createExperience} from './scene.js';
export function mountLanding(){
const events=new AbortController();
const listen=(target,type,handler,options={})=>target.addEventListener(type,handler,{...options,signal:events.signal});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const container=document.getElementById('scene');
let experience;
try{experience=createExperience(container);}catch(e){container.innerHTML='<img src="/assets/airport-cinematic.png" alt="출발을 기다리는 비행기" style="width:100%;height:100%;object-fit:cover">';console.error(e);}
const flightSection=document.querySelector('.flight-scroll');
const stage=document.querySelector('.flight-stage');
let target=0,progress=0,raf=0;
function measure(){const rect=flightSection.getBoundingClientRect();const pinTop=parseFloat(getComputedStyle(stage).top)||0;const distance=Math.max(1,flightSection.offsetHeight-stage.offsetHeight);target=Math.max(0,Math.min(1,(pinTop-rect.top)/distance));if(!raf)raf=requestAnimationFrame(frame);}
function frame(){raf=0;progress=reduced.matches?target:progress+(target-progress)*.075;if(Math.abs(target-progress)<.0001)progress=target;experience?.updateFlight(progress,innerWidth<800);if(progress!==target)raf=requestAnimationFrame(frame);}
listen(window,'scroll',measure,{passive:true});listen(window,'resize',measure);listen(reduced,'change',measure);measure();
let toastTimer;function notice(text){const t=document.getElementById('ai-toast');clearTimeout(toastTimer);t.textContent=text;t.classList.add('show');toastTimer=setTimeout(()=>{t.classList.remove('show');t.textContent='';},2200);}
listen(document.getElementById('mcp-button'),'click',()=>notice('AI 연결 기능을 준비하고 있어요.'));
document.querySelectorAll('.app-download').forEach(b=>listen(b,'click',()=>notice('산들 앱은 출시 준비 중이에요.')));

const disposeFeatures=mountFeatureScenes();

// Chapters enter in reading order; ordinary scrolling stays under user control.
const chapters=document.querySelectorAll('.feature-chapter');
const chapterObserver=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('has-entered');chapterObserver.unobserve(entry.target);}});
},{threshold:.12});
chapters.forEach(chapter=>chapterObserver.observe(chapter));

return ()=>{
 events.abort();
 cancelAnimationFrame(raf);
 clearTimeout(toastTimer);
 chapterObserver.disconnect();
 disposeFeatures();
 experience?.dispose();
 const toast=document.getElementById('ai-toast');
 toast?.classList.remove('show');
 if(toast)toast.textContent='';
};
}
