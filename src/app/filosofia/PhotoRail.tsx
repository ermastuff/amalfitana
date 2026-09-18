"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { rail } from "@/data/filosofia";
import s from "./filosofia.module.css";

/**
 * Lo slider delle foto: una sola riga, con i riquadri sfalsati in verticale.
 * Scorre di lato mentre la pagina scorre in giù, fino a mostrare l'ultima
 * foto. Senza animazioni la riga resta trascinabile a mano.
 */
export default function PhotoRail() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const box = ref.current;
      const track = box?.querySelector<HTMLElement>("[data-track]");
      if (!box || !track) return;

      // Quanto esce dallo schermo: si rimisura a ogni refresh, perché
      // dipende dalla larghezza della finestra e dalle foto caricate.
      const travel = () => Math.max(track.scrollWidth - box.clientWidth, 0);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tween = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => -travel(),
            ease: "none",
            // La corsa finisce mentre la fascia è ancora sullo schermo:
            // altrimenti le ultime foto si vedrebbero solo uscendo di sopra.
            scrollTrigger: {
              trigger: box,
              start: "top 92%",
              end: "bottom 8%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
        // Le foto arrivano dopo: senza rimisurare, la corsa resterebbe
        // quella calcolata sui riquadri vuoti.
        const onLoad = () => tween.scrollTrigger?.refresh();
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={s.rail} aria-label="Le materie prime, in foto">
      <div className={s.track} data-track>
        {rail.map((photo) => {
          const style = {
            "--tile-h": photo.height,
            "--tile-ratio": photo.ratio,
            "--tile-shift": photo.shift,
          } as CSSProperties;
          return (
            <figure key={photo.src} className={s.tile} style={style}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 700px) 60vw, 30vw"
                className={s.tileImg}
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
