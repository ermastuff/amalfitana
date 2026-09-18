"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

// Quanto vale un colpo di rotella rispetto al normale: più piano mentre si
// legge il racconto, più svelto nelle fasce tra un capitolo e l'altro.
const SLOW = 0.72;
const FAST = 1.18;

type Multipliers = { wheelMultiplier: number; touchMultiplier: number };

/**
 * Lenis copia i moltiplicatori dentro al proprio VirtualScroll quando lo
 * costruisce: è lì che vanno cambiati, non in `lenis.options`. Nei tipi il
 * campo è privato, quindi lo prendiamo con prudenza: se un domani cambia
 * nome, torniamo `null` e la pagina scorre normalmente.
 */
function multipliersOf(lenis: unknown): Multipliers | null {
  const vs = (
    lenis as { virtualScroll?: { options?: Partial<Multipliers> } } | undefined
  )?.virtualScroll;
  const options = vs?.options;
  if (
    !options ||
    typeof options.wheelMultiplier !== "number" ||
    typeof options.touchMultiplier !== "number"
  ) {
    return null;
  }
  return options as Multipliers;
}

/**
 * Ritmo dello scroll lungo la pagina: rallenta sugli elementi
 * `data-pace="slow"` (i racconti) e riaccelera su `data-pace="fast"`
 * (le fasce tra le sezioni). Non disegna nulla.
 */
export default function ScrollPace() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const options = multipliersOf(lenis);
    if (!options) return;

    const base = {
      wheel: options.wheelMultiplier,
      touch: options.touchMultiplier,
    };
    const pace = { value: 1 };
    const apply = () => {
      options.wheelMultiplier = base.wheel * pace.value;
      options.touchMultiplier = base.touch * pace.value;
    };
    // Il passaggio è graduale: niente scatti quando si entra in una zona
    const to = (value: number) =>
      gsap.to(pace, {
        value,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
        onUpdate: apply,
      });

    // Zone attive contate, non un valore per volta: all'uscita da un racconto
    // e all'ingresso in una fascia i due onToggle scattano insieme, e chi
    // arriva secondo vincerebbe sull'altro.
    const open = { slow: 0, fast: 0 };
    const target = () => (open.fast > 0 ? FAST : open.slow > 0 ? SLOW : 1);

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const zones: [keyof typeof open, string, string][] = [
        ["slow", "top 80%", "bottom 20%"],
        ["fast", "top 65%", "bottom 35%"],
      ];
      for (const [kind, start, end] of zones) {
        for (const el of document.querySelectorAll<HTMLElement>(
          `[data-pace="${kind}"]`,
        )) {
          ScrollTrigger.create({
            trigger: el,
            start,
            end,
            onToggle: (self) => {
              open[kind] += self.isActive ? 1 : -1;
              to(target());
            },
          });
        }
      }
    });

    return () => {
      mm.revert();
      gsap.killTweensOf(pace);
      pace.value = 1;
      apply();
    };
  }, [lenis]);

  return null;
}
