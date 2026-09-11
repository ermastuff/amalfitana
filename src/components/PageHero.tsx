"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import s from "./PageHero.module.css";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  tone?: "cream" | "sea";
  children?: ReactNode;
};

/** Intestazione delle pagine interne con entrata animata. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  tone = "cream",
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-hero-eyebrow]", { y: 16, opacity: 0, duration: 0.7 })
          .from("[data-hero-title]", { y: 44, opacity: 0, duration: 1 }, "-=0.45");
        if (intro) {
          tl.from("[data-hero-intro]", { y: 24, opacity: 0, duration: 0.8 }, "-=0.6");
        }
        tl.from(
          "[data-hero-rule]",
          { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "expo.out" },
          "-=0.6",
        );
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={`${s.hero} ${tone === "sea" ? `band--sea ${s.sea}` : ""}`}
    >
      <div className="container">
        <p className="eyebrow" data-hero-eyebrow>
          {eyebrow}
        </p>
        <h1 className={`display-lg ${s.title}`} data-hero-title>
          {title}
        </h1>
        {intro && (
          <p className={`lead ${s.intro}`} data-hero-intro>
            {intro}
          </p>
        )}
        {children}
        <div className={s.rule} data-hero-rule aria-hidden="true" />
      </div>
    </section>
  );
}
