'use client';
import { useEffect, useRef } from 'react';
import type { FeatureKind } from './features';
export function playbackAsset(kind: FeatureKind, format: 'webp' | 'mp4', zone = 1) {
  const name = kind === 'crowd' && zone !== 1 ? `crowd-${zone + 1}` : kind;
  return `/assets/feature-playback/${name}.${format}?v=${name.startsWith('crowd') ? 12 : name === 'parking' ? 5 : 2}`;
}

export default function ScenePlayback({ kind, zone }: { kind: FeatureKind; zone: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const clip = playbackAsset(kind, 'mp4', zone);
  useEffect(() => {
    const video = ref.current!;
    let visible = false;
    function sync() {
      if (visible && !document.hidden)
        video.play().catch(() => {
          video.controls = true;
        });
      else video.pause();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, [clip]);
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      poster={playbackAsset(kind, 'webp', zone)}
      src={clip}
    />
  );
}
