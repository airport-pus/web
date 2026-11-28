'use client';
import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const drift = keyframes`
  from { transform:scale(1.025) translate3d(-.5%,.4%,0); }
  to { transform:scale(1.08) translate3d(.5%,-.4%,0); }
`;
const FlightArtwork = styled.div`
  position:absolute; inset:0; overflow:hidden; background:#b4d5f3;
  .art-frame { position:absolute; inset:-3%; transform:translateY(calc(-9svh * (1 - var(--expand)))); }
  img { width:100%; height:100%; display:block; object-fit:cover; object-position:52% 42%; animation:${drift} 20s ease-in-out infinite alternate; }
  &[data-paused='true'] img { animation-play-state:paused; }
  @media(max-width:800px) { img { object-position:54% 50%; } }
  @media(prefers-reduced-motion:reduce) { img { animation:none; } }
`;

export default function JourneyFilm() {
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const element=root.current;
    if(!element)return;
    let visible=true;
    const sync=()=>{element.dataset.paused=String(!visible||document.hidden);};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});
    observer.observe(element);
    document.addEventListener('visibilitychange',sync);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);};
  },[]);
  return <FlightArtwork ref={root}><div className="art-frame"><img src="/assets/sandeul-flight-art.webp" alt="푸른 비행 궤적 위로 가볍게 떠오르는 흰 종이비행기" loading="eager" fetchPriority="high" /></div></FlightArtwork>;
}
