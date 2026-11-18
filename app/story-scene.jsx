'use client';
import { useEffect, useRef, useState } from 'react';

export default function StoryScene({ kind, label }) {
  const host = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false, dispose;
    Promise.all([import('../src/product-scenes'), document.fonts.ready]).then(([{ mountProductScene }]) => {
      if (cancelled) return;
      try { dispose = mountProductScene(host.current, kind); }
      catch { setFailed(true); }
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; dispose?.(); };
  }, [kind]);
  return <div className={`story-scene scene-${kind}`} role="img" aria-label={label}>
    <div className="scene-canvas" ref={host} aria-hidden="true" />
    {failed && <div className="scene-fallback"><img src="/assets/airport-connection.png" width="70" height="70" alt="" /><span>{label}</span></div>}
  </div>;
}
