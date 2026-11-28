'use client';

import { useEffect } from 'react';

export default function LandingRuntime() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('header.top');
    if (!header) return;
    let previousY = Math.max(0, window.scrollY);
    // 미세한 스크롤에는 반응하지 않아 헤더가 반복해서 떨리는 것을 막습니다.
    const updateHeader = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - previousY;
      if (currentY <= 60) header.dataset.hidden = 'false';
      else if (Math.abs(delta) >= 8) header.dataset.hidden = String(delta > 0);
      else return;
      previousY = currentY;
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => { window.removeEventListener('scroll', updateHeader); delete header.dataset.hidden; };
  }, []);
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    // 브라우저에서 하이드레이션을 마친 뒤 WebGL을 초기화한다.
    import('../src/mount-landing')
      .then(({ mountLanding }) => {
        if (!cancelled) dispose = mountLanding();
      })
      .catch(console.error);
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);
  return null;
}
