"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Numero che conta da 0 al valore finale quando entra nel viewport. */
export default function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { value: 0 };
        el.textContent = `${prefix}0${suffix}`;
        gsap.to(state, {
          value: to,
          duration,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
