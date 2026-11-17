"use client";

import { useEffect } from 'react';

export default function LandingRuntime() {
 useEffect(() => {
  let cancelled = false;
  let dispose;
  // Keep WebGL/browser APIs out of server rendering and load them after hydration.
  import('../src/main.js').then(({mountLanding}) => {
   if (!cancelled) dispose = mountLanding();
  }).catch(console.error);
  return () => { cancelled = true; dispose?.(); };
 }, []);
 return null;
}
