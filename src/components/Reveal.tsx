"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  /** Tag HTML da renderizzare (default: div). */
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
  /** Spostamento verticale iniziale in px. */
  y?: number;
  /** Se true anima in sequenza i figli marcati con data-reveal-item. */
  stagger?: boolean;
};

/**
 * Wrapper che fa entrare il contenuto quando arriva nel viewport.
 * Usa ScrollTrigger e rispetta prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  id,
  delay = 0,
  y = 36,
  stagger = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger
          ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]"))
          : [el];
        if (targets.length === 0) return;

        gsap.from(targets, {
          y,
          opacity: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
