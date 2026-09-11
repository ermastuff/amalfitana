"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./Slideshow.module.css";

export type Slide = { src: string; alt: string };

type Props = {
  slides: Slide[];
  /** Millisecondi tra un'immagine e la successiva. */
  interval?: number;
  /** Ridisegna le illustrazioni in chiaro su fondo scuro. */
  tint?: boolean;
  className?: string;
};

/** Immagini che si alternano a stacco netto, senza transizioni. */
export default function Slideshow({
  slides,
  interval = 2800,
  tint = false,
  className,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div
      className={`${s.slideshow} ${tint ? s.tint : ""} ${className ?? ""}`}
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          loading="eager"
          className={`${s.slide} ${i === index ? s.active : ""}`}
        />
      ))}
    </div>
  );
}
