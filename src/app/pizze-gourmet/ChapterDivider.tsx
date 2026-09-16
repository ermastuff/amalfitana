"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./gourmet.module.css";

// Il bordo inferiore della fascia è una cupola che, in base allo scroll,
// passa da rivolta in basso (k > 0) a rivolta in alto (k < 0). In unità del
// viewBox (100 × 60): la fascia sovrasta la foto del capitolo seguente da 24
// in giù, la cupola oscilla intorno a 42 con ampiezza 18 (0,75·k, per una
// cubica con questi punti di controllo).
const arc = (k: number) => `M0 0H100V42C80 ${42 + k} 20 ${42 + k} 0 42Z`;
const AMPLITUDE = 24;

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
        gsap.to(state, {
          k: -AMPLITUDE,
          ease: "none",
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
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path d={arc(AMPLITUDE)} />
      </svg>
    </div>
  );
}
