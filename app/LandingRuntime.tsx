"use client";

import { useEffect } from 'react';

export default function LandingRuntime() {
 useEffect(() => {
  let cancelled = false;
  let dispose: (() => void) | undefined;
  // 브라우저에서 하이드레이션을 마친 뒤 WebGL을 초기화한다.
  import('../src/main').then(({mountLanding}) => {
   if (!cancelled) dispose = mountLanding();
  }).catch(console.error);
  return () => { cancelled = true; dispose?.(); };
 }, []);
 return null;
}
