"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./gourmet.module.css";

// Il bordo inferiore della fascia è una cupola che, in base allo scroll,
// passa da rivolta in basso (k > 0) a rivolta in alto (k < 0). In unità del
// viewBox (100 × 66): la fascia sovrasta la foto del capitolo seguente da 22
// in giù, la cupola oscilla intorno a 44 con ampiezza 22 (0,75·k, per una
// cubica con questi punti di controllo): tocca il fondo della fascia e,
// rivoltata, il bordo della foto.
const arc = (k: number) => `M0 0H100V44C82 ${44 + k} 18 ${44 + k} 0 44Z`;
const AMPLITUDE = 29.3;

/** Fascia neutra tra un capitolo e l'altro, col semicerchio che si rivolta. */
export default function ChapterDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const path = ref.current?.querySelector("path");
      if (!path) return;
      const state = { k: AMPLITUDE };
      const apply = () => path.setAttribute("d", arc(state.k));
      apply();

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // L'easing concentra il ribaltamento a metà corsa, quando la fascia
        // è al centro dello schermo
        gsap.to(state, {
          k: -AMPLITUDE,
          ease: "power2.inOut",
          onUpdate: apply,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={s.divider} aria-hidden="true">
      <svg
        className={s.arc}
        viewBox="0 0 100 66"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path d={arc(AMPLITUDE)} />
      </svg>
    </div>
  );
}
