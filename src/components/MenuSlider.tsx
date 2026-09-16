"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";
import { Arrow } from "./Icons";
import s from "./MenuSlider.module.css";

type Slide = {
  label: string;
  name: string;
  detail: string;
  href: string;
  cta: string;
  /** Foto dall'alto della pizza, mostrata nel disco. */
  image: string;
};

const slides: Slide[] = [
  {
    label: "Menù classico",
    name: "La tradizione",
    detail: "Margherita · Marinara · Diavola · Capricciosa",
    href: "/menu",
    cta: "Vedi il menù completo",
    image: "/assets/Margherita.png",
  },
  {
    label: "Pizze Gourmet",
    name: "Le pizze d’autore",
    detail:
      "Pastorale · Renana · Moonlight · Il canto della terra · La dolce vita",
    href: "/pizze-gourmet",
    cta: "Vedi le pizze gourmet",
    image: "/assets/Bufala Extra.png",
  },
];

const BLURB =
  "Il menù cambia spesso. Quello che resta è la devozione al forno a legna, all’impasto lento e ai produttori che chiamiamo amici.";

// Sul palco ci sono due dischi: quello della slide attiva al centro, in primo
// piano, e l'altro a destra, piccolo e in ombra. Al cambio si scambiano.
const R = slides.length;
// Posto di un disco rispetto alla slide attiva: 0 = centro, 1 = destra.
const offsetOf = (i: number, active: number) => (i - active + R) % R;

// Aspetto dei dischi laterali rispetto a quello centrale.
const SIDE = { scale: 0.45, opacity: 0.55, shade: 0.72 };
const pad = (n: number) => String(n).padStart(2, "0");

export default function MenuSlider() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ringActive = useRef(0);
  const busy = useRef(false);
  const prevActive = useRef(0);
  const pointerX = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const slide = slides[active];

  // Stato di un disco (posizione, scala, ombra) in base al posto nell'anello.
  const stateFor = useCallback((off: number) => {
    const stage = stageRef.current;
    const dx = stage ? Math.min(stage.clientWidth * 0.4, 620) : 0;
    const side = off !== 0;
    const visible = off <= 1;
    return {
      x: off * dx,
      scale: side ? SIDE.scale : 1,
      opacity: visible ? (side ? SIDE.opacity : 1) : 0,
      zIndex: side ? 1 : 2,
      shade: side ? SIDE.shade : 0,
    };
  }, []);

  // Solo la coordinata x dipende dalla larghezza: ricalcolata al resize.
  const placeX = useCallback(() => {
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.set(card, { x: stateFor(offsetOf(i, ringActive.current)).x });
      }
    });
  }, [stateFor]);

  // Cambio slide: i due dischi si scambiano di posto, i testi escono e rientrano.
  const go = useCallback(
    (dir: 1 | -1) => {
      if (busy.current) return;
      const from = ringActive.current;
      const to = (from + dir + R) % R;
      ringActive.current = to;

      const cards = cardsRef.current;
      const shadeOf = (card: HTMLElement) => card.querySelector("[data-shade]");

      if (!window.matchMedia(MOTION_OK).matches) {
        cards.forEach((card, i) => {
          if (!card) return;
          const st = stateFor(offsetOf(i, to));
          gsap.set(card, {
            x: st.x,
            scale: st.scale,
            opacity: st.opacity,
            zIndex: st.zIndex,
          });
          gsap.set(shadeOf(card), { opacity: st.shade });
        });
        setActive(to);
        return;
      }

      busy.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          busy.current = false;
        },
      });
      // Testi correnti via, poi cambia lo stato e i nuovi rientrano (useGSAP)
      tl.to(
        "[data-info]",
        {
          y: -14,
          opacity: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: "power2.in",
        },
        0,
      ).add(() => setActive(to), 0.4);

      cards.forEach((card, i) => {
        if (!card) return;
        const prev = offsetOf(i, from);
        const next = offsetOf(i, to);
        const st = stateFor(next);
        const shade = shadeOf(card);
        if (Math.abs(next - prev) > 1) {
          // Solo con più di due slide: sfuma, si riposiziona, ricompare
          tl.to(card, { opacity: 0, duration: 0.35, ease: "power2.in" }, 0)
            .set(card, { x: st.x, scale: st.scale, zIndex: st.zIndex }, 0.4)
            .set(shade, { opacity: st.shade }, 0.4)
            .to(
              card,
              { opacity: st.opacity, duration: 0.7, ease: "power2.out" },
              0.55,
            );
        } else {
          tl.set(card, { zIndex: st.zIndex }, 0)
            .to(
              card,
              {
                x: st.x,
                scale: st.scale,
                opacity: st.opacity,
                duration: 1.1,
                ease: "power3.inOut",
              },
              0,
            )
            .to(
              shade,
              { opacity: st.shade, duration: 1.1, ease: "power3.inOut" },
              0,
            );
        }
      });
    },
    [stateFor],
  );

  // Posizionamento iniziale + ingresso allo scroll.
  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      cards.forEach((card, i) => {
        const st = stateFor(offsetOf(i, ringActive.current));
        gsap.set(card, {
          x: st.x,
          scale: st.scale,
          opacity: st.opacity,
          zIndex: st.zIndex,
        });
        gsap.set(card.querySelector("[data-shade]"), { opacity: st.shade });
      });
      gsap.set("[data-progress]", { scaleX: 1 / slides.length });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrollTrigger = {
          trigger: ref.current,
          start: "top 60%",
          once: true,
        };
        gsap.from(cards, {
          scale: 0.6,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger,
        });
        gsap.from("[data-info]", {
          y: 18,
          opacity: 0,
          duration: 0.9,
          delay: 0.3,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger,
        });
        gsap.from("[data-bar]", {
          y: 12,
          opacity: 0,
          duration: 0.9,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger,
        });
      });
    },
    { scope: ref },
  );

  // Nuovi testi in ingresso dopo il cambio slide + avanzamento del contatore.
  useGSAP(
    () => {
      if (prevActive.current === active) return;
      prevActive.current = active;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-info]",
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
          },
        );
        gsap.to("[data-progress]", {
          scaleX: (active + 1) / slides.length,
          duration: 0.8,
          ease: "power3.inOut",
        });
      });
    },
    { scope: ref, dependencies: [active] },
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(placeX);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [placeX]);

  // Swipe orizzontale sul palco (lo scroll verticale resta nativo).
  const onPointerDown = (e: React.PointerEvent) => {
    pointerX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerX.current === null) return;
    const delta = e.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  };

  return (
    <section
      ref={ref}
      className={s.section}
      aria-labelledby="menu-slider-title"
    >
      <WordReveal
        as="h2"
        id="menu-slider-title"
        className={s.title}
        text="Un menù scritto dalla"
        accent="terra."
        accentClassName={s.titleAccent}
        start="top 75%"
      />

      {/* Palco + barra: insieme occupano tutta l'altezza del viewport */}
      <div className={s.deck}>
        <div
          ref={stageRef}
          className={s.stage}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            pointerX.current = null;
          }}
        >
          <div className={s.info} aria-live="polite">
            <p className={s.label} data-info>
              {pad(active + 1)} · {slide.label}
            </p>
            <h3 className={s.name} data-info>
              {slide.name}
            </h3>
            <p className={s.detail} data-info>
              {slide.detail}
            </p>
          </div>

          {/* Dischi: la foto dall'alto di ogni pizza, ritagliata a cerchio */}
          <div className={s.cards} aria-hidden="true">
            {slides.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className={s.card}
                data-slide={i}
              >
                <div className={s.disc}>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 300px, 680px"
                    className={s.photo}
                  />
                </div>
                <span className={s.shade} data-shade />
              </div>
            ))}
          </div>

          <Reveal as="p" className={s.blurb} y={20}>
            {BLURB}
          </Reveal>
        </div>

        <div className={s.bar} data-bar>
          <p className={s.counter}>
            <span>{pad(active + 1)}</span>
            <span className={s.progress} aria-hidden="true">
              <span className={s.progressFill} data-progress />
            </span>
            <span className={s.total}>{pad(slides.length)}</span>
          </p>

          <div className={s.nav}>
            <button
              type="button"
              className={s.navBtn}
              onClick={() => go(-1)}
              aria-label="Slide precedente"
            >
              <Arrow className={s.arrowPrev} />
            </button>
            <button
              type="button"
              className={`${s.navBtn} ${s.navBtnPrimary}`}
              onClick={() => go(1)}
              aria-label="Slide successiva"
            >
              <Arrow className={s.arrow} />
            </button>
          </div>

          <Link href={slide.href} className={s.cta} data-info>
            {slide.cta}
            <Arrow className={s.ctaArrow} />
          </Link>
        </div>
      </div>
    </section>
  );
}
