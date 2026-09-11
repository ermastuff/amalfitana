"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Tiene ScrollTrigger allineato alla posizione calcolata da Lenis. */
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

/**
 * Smooth scroll globale (Lenis) pilotato dal ticker di GSAP, così scroll e
 * animazioni ScrollTrigger avanzano nello stesso frame.
 * Con prefers-reduced-motion Lenis disattiva da solo lo smoothing
 * (`respectReducedMotion`, attivo di default) e mantiene lo scroll nativo.
 * Le regole CSS di supporto (`html.lenis`, `.lenis-stopped`, ...) sono in globals.css.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.08,
        // Link "#sezione" (es. indice del menu): scroll animato, rispetta scroll-margin-top.
        anchors: true,
        // Cambio pagina: azzera l'inerzia così Next parte pulito dall'alto.
        stopInertiaOnNavigate: true,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
