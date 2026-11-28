'use client';
import { withBasePath } from '../src/site-path';

import { useEffect, useRef, useState } from 'react';

export default function StoryScene({ kind, label }: {kind: string; label: string}) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false, dispose: (() => void) | undefined;
    Promise.all([import('../src/scenes/product-scenes'), document.fonts.ready]).then(([{ mountProductScene }]) => {
      if (cancelled || !host.current) return;
      try { dispose = mountProductScene(host.current, kind); }
      catch { setFailed(true); }
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; dispose?.(); };
  }, [kind]);
  return <div className={`story-scene scene-${kind}`} role="img" aria-label={label}>
    <div className="scene-canvas" ref={host} aria-hidden="true" />
    {failed && <div className="scene-fallback"><img src={withBasePath('/assets/airport-connection.png')} width="70" height="70" alt="" /><span>{label}</span></div>}
  </div>;
}
