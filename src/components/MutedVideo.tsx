"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

type Props = VideoHTMLAttributes<HTMLVideoElement> & {
  /** Secondo da cui far partire il video (per differenziare più copie). */
  startAt?: number;
};

/**
 * Video decorativo muto in loop. Forza `muted` via proprietà (l'attributo
 * renderizzato lato server non basta ad alcuni browser) e va in pausa quando
 * esce dal viewport per non tenere attivi decoder inutili.
 */
export default function MutedVideo({ startAt = 0, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;

    const seek = () => {
      if (startAt > 0 && video.duration && startAt < video.duration) {
        video.currentTime = startAt;
      }
    };
    if (video.readyState >= 1) seek();
    else video.addEventListener("loadedmetadata", seek, { once: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playing = video.play();
          if (playing) playing.catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadedmetadata", seek);
      observer.disconnect();
    };
  }, [startAt]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      {...rest}
    />
  );
}
