"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Props = {
  /** Il tag da usare: il componente serve solo ad animare il contenuto. */
  as?: "p" | "li" | "div";
  className?: string;
  children: ReactNode;
  /** Ritardo tra un figlio `[data-deep]` e il successivo. Senza, si anima
      l'elemento intero. */
  stagger?: number;
};

/**
 * Apparizione "in profondità", la stessa delle pizze gourmet: il contenuto
 * arriva da lontano — piccolo e sfocato — e si avvicina allo schermo. Il
 * filtro va tolto a fine corsa, o resterebbe attivo sul testo.
 */
export default function Deep({
  as = "div",
  className,
  children,
  stagger,
}: Props) {
  // Il tag cambia, il ref no: tutti e tre sono HTMLElement.
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const kids = el.querySelectorAll("[data-deep]");
      const targets = stagger && kids.length ? kids : el;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(targets, {
          opacity: 0,
          scale: 0.88,
          filter: "blur(12px)",
          duration: 1.3,
          ease: "power3.out",
          stagger: stagger ?? 0,
          clearProps: "filter",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
