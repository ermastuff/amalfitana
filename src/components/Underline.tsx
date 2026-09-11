"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./Underline.module.css";

/** Parola con sottolineatura "a mano" disegnata via DrawSVG allo scroll. */
export default function Underline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-draw]",
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.1,
            delay: 0.35,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={s.wrap}>
      {children}
      <svg
        className={s.svg}
        viewBox="0 0 300 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          data-draw
          d="M4 17C60 8 130 5 296 11"
          fill="none"
          stroke="var(--lemon)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
