'use client';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const HomeFilm = styled.div`
  position:absolute; inset:0; overflow:hidden; background:#5386b9;
  .home-poster,.home-world { position:absolute; inset:0; width:100%; height:100%; }
  .home-poster img { display:block; width:100%; height:100%; object-fit:cover; }
  .home-poster { transition:opacity 700ms ease; }
  .home-world { opacity:0; transition:opacity 700ms ease; }
  &[data-ready='true'] .home-poster { opacity:0; }
  &[data-ready='true'] .home-world { opacity:1; }
  canvas { display:block; width:100%; height:100%; }
`;

export default function JourneyFilm() {
  const root=useRef<HTMLDivElement>(null);
  const world=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let disposed=false,frame=0,lastProgress=-1,lastMobile=false;
    let visible=true,elapsed=0,previous=0,lastRender=0;
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});
    if(root.current)observer.observe(root.current);
    let scene:ReturnType<typeof import('../src/scenes/hero-scene')['createExperience']>|undefined;
    // 외곽 프레임과 카메라가 같은 보간값을 사용해 함께 확대됩니다.
    const followScroll=(now=performance.now())=>{
      if(disposed)return;
      const delta=previous ? Math.max(0,Math.min((now-previous)/1000,.05)) : 0;
      previous=now;
      const active=visible&&!document.hidden;
      // 구름의 움직임은 자동 재생하고, 화면 밖에서는 시간을 멈춥니다.
      if(active)elapsed+=delta;
      if(root.current&&scene&&active){
        const progress=parseFloat(getComputedStyle(root.current).getPropertyValue('--journey-progress'))||0;
        const mobile=window.innerWidth<800;
        if(Math.abs(progress-lastProgress)>.0001||mobile!==lastMobile||now-lastRender>=1000/30){
          scene.updateFlight(progress,mobile,elapsed);
          lastRender=now;
          lastProgress=progress;lastMobile=mobile;
        }
      }
      frame=requestAnimationFrame(followScroll);
    };
    void import('../src/scenes/hero-scene').then(({createExperience})=>{
      if(disposed||!world.current)return;
      scene=createExperience(world.current);
      followScroll();
      root.current?.setAttribute('data-ready','true');
    }).catch(()=>{ /* 3D 사용이 불가능한 환경에서는 기존 장면의 포스터를 유지합니다. */ });
    return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();scene?.dispose();};
  },[]);
  return <HomeFilm ref={root} role="img" aria-label="공항 터미널의 큰 창 너머 비행기를 따라가는 연속된 3D 장면">
    <div className="home-poster" aria-hidden="true" />
    <div className="home-world" ref={world} aria-hidden="true"/>
  </HomeFilm>;
}
