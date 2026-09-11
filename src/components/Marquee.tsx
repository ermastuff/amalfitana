"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./Marquee.module.css";

type Props = {
  items: string[];
  /** Secondi per un giro completo. */
  duration?: number;
};

/** Nastro di testo che scorre in continuo. */
export default function Marquee({ items, duration = 28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(track, { xPercent: -50, duration, ease: "none", repeat: -1 });
      });
    },
    { scope: ref },
  );

  const list = (hidden: boolean) => (
    <ul className={s.list} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className={s.item}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={ref} className={s.marquee}>
      <div className={s.track} data-track>
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
