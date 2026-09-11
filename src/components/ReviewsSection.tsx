"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import Reveal from "./Reveal";
import { GoogleG, Star } from "./Icons";
import { rating, reviews } from "@/data/reviews";
import s from "./ReviewsSection.module.css";

const LINES = ["Cosa dicono", "i nostri ospiti"];

function Stars({ count }: { count: number }) {
  return (
    <span className={s.stars} role="img" aria-label={`${count} stelle su 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={i < count ? s.star : `${s.star} ${s.starOff}`}
        />
      ))}
    </span>
  );
}

/** Recensioni Google: titolo, riquadro con il punteggio e striscia di card scorrevole. */
export default function ReviewsSection() {
  const ref = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-line]", {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        });
        gsap.from("[data-card]", {
          x: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stripRef.current,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: ref },
  );

  // Trascinamento con il mouse: la striscia scorre come su touch.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (!el || !drag.current) return;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const endDrag = () => {
    drag.current = null;
  };

  return (
    <section ref={ref} className={s.section} aria-labelledby="reviews-title">
      <div className={s.head}>
        <h2 id="reviews-title" className={s.title}>
          {LINES.map((line) => (
            <span key={line} className={s.line}>
              <span data-line>{line}</span>
            </span>
          ))}
        </h2>

        <Reveal className={s.rating} y={20}>
          <div className={s.ratingTop}>
            <Stars count={5} />
            <GoogleG className={s.google} />
          </div>
          <div className={s.ratingBottom}>
            <p className={s.score}>
              {rating.score}
              <sup>/5</sup>
            </p>
            <p className={s.ratingText}>
              <strong>{rating.label}</strong>
              <br />
              Basato su {rating.count} recensioni
            </p>
          </div>
        </Reveal>
      </div>

      <div
        ref={stripRef}
        className={s.strip}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {reviews.map((review) => (
          <article key={review.author} className={s.card} data-card>
            <header className={s.cardHead}>
              <Stars count={review.stars} />
              <span className={s.source}>{review.source}</span>
            </header>
            <blockquote className={s.quote}>{review.text}</blockquote>
            <footer className={s.author}>
              <span className={s.authorLabel}>Autore</span>
              {review.author}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
