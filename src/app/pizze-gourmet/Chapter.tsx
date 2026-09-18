"use client";

import { useId, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { box, wirePath } from "@/lib/wire";
import type { GourmetPizza } from "@/data/gourmet";
import Letters from "@/components/Letters";
import { PATTERNS } from "./wires";
import s from "./gourmet.module.css";

type Props = { pizza: GourmetPizza; index: number; total: number };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Un capitolo: la foto resta ferma (sticky, con un lieve parallasse) mentre
 * le scorrono sopra il titolo con gli ingredienti, la linea con la frase
 * d'apertura, il racconto a punti collegati da linee che si disegnano, e la
 * linea di chiusura.
 */
export default function Chapter({ pizza, index, total }: Props) {
  const ref = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const pattern = PATTERNS[index % PATTERNS.length];
  const texts = pizza.fragments.slice(0, pattern.texts.length);
  const wireCount = Math.max(texts.length - 1, 0);

  useGSAP(
    () => {
      const root = ref.current;
      const story = storyRef.current;
      if (!root || !story) return;
      const title = root.querySelector<HTMLElement>("[data-title]");
      const quote = root.querySelector<HTMLElement>("[data-quote]");
      const nodeEls = gsap.utils.toArray<HTMLElement>("[data-node]", story);
      // Le linee uniscono solo le frasi, mai le foto
      const textEls = nodeEls.filter((el) => el.dataset.node === "text");

      // Ogni linea ha un tracciato che si disegna (data-draw) e, se
      // tratteggiata, un secondo tracciato visibile mascherato dal primo;
      // entrambi hanno lo stesso percorso (data-wire). Le foto agganciate a
      // una linea si mettono poi sul punto di mezzo del tracciato.
      const layout = () => {
        textEls.slice(0, -1).forEach((from, i) => {
          const d = wirePath(
            box(from),
            box(textEls[i + 1]),
            pattern.wires[i % pattern.wires.length],
          );
          story
            .querySelectorAll<SVGPathElement>(`[data-wire="${i}"]`)
            .forEach((p) => p.setAttribute("d", d));
        });

        story
          .querySelectorAll<HTMLElement>("[data-shot-wire]")
          .forEach((shot) => {
            const path = story.querySelector<SVGPathElement>(
              `[data-draw="${shot.dataset.shotWire}"]`,
            );
            const length = path?.getTotalLength() ?? 0;
            if (!path || !length) return;
            const mid = path.getPointAtLength(length / 2);
            // xPercent/yPercent invece di translate(-50%): così la centratura
            // sopravvive alle animazioni di scala di GSAP
            gsap.set(shot, {
              left: mid.x,
              top: mid.y,
              xPercent: -50,
              yPercent: -50,
            });
          });
      };
      layout();
      document.fonts.ready.then(layout);

      const draws: gsap.core.Tween[] = [];
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Apparizione "in profondità": da lontano (piccolo, sfocato) verso
        // lo schermo. Il filtro va tolto a fine corsa, o resterebbe attivo
        // sul testo.
        const deep = (targets: gsap.TweenTarget, vars: gsap.TweenVars) =>
          gsap.from(targets, {
            opacity: 0,
            scale: 0.7,
            filter: "blur(18px)",
            duration: 1.6,
            ease: "power3.out",
            clearProps: "filter",
            ...vars,
          });

        if (title) {
          const scrollTrigger = { trigger: title, start: "top 72%", once: true };
          // Il titolo intero si avvicina; le lettere compaiono una dopo
          // l'altra, con un piccolo ritardo tra loro
          gsap.from(title, {
            scale: 0.7,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger,
          });
          gsap.from(title.querySelectorAll("[data-letter]"), {
            opacity: 0,
            filter: "blur(14px)",
            duration: 1.1,
            stagger: 0.05,
            ease: "power3.out",
            clearProps: "filter",
            scrollTrigger,
          });
          deep("[data-caption]", {
            scale: 0.88,
            filter: "blur(8px)",
            duration: 1,
            delay: 0.5,
            stagger: 0.07,
            scrollTrigger,
          });
        }
        if (quote) {
          deep(quote, {
            scale: 0.8,
            filter: "blur(12px)",
            scrollTrigger: { trigger: quote, start: "top 78%", once: true },
          });
        }
        nodeEls.forEach((el) =>
          deep(el, {
            scale: 0.85,
            filter: "blur(10px)",
            duration: 1.3,
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }),
        );

        // Parallasse leggero della foto: scende piano mentre il capitolo scorre
        gsap.fromTo(
          "[data-parallax]",
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        // Linee verticali: si disegnano scorrendo
        gsap.utils.toArray<HTMLElement>("[data-vline]", root).forEach((line) => {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top 85%",
                end: "bottom 50%",
                scrub: true,
              },
            },
          );
        });

        // Ogni collegamento si disegna mentre si scorre dalla frase di
        // partenza a quella d'arrivo
        textEls.slice(0, -1).forEach((from, i) => {
          const path = story.querySelector<SVGPathElement>(`[data-draw="${i}"]`);
          if (!path) return;
          draws.push(
            gsap.fromTo(
              path,
              { drawSVG: "0%" },
              {
                drawSVG: "100%",
                ease: "none",
                scrollTrigger: {
                  trigger: from,
                  start: "top 65%",
                  endTrigger: textEls[i + 1],
                  end: "top 60%",
                  scrub: true,
                },
              },
            ),
          );
        });
      });

      // Al resize i nodi si spostano: linee ricalcolate, tween rimisurati
      const ro = new ResizeObserver(() => {
        layout();
        draws.forEach((t) => t.invalidate());
        ScrollTrigger.refresh();
      });
      ro.observe(story);
      return () => ro.disconnect();
    },
    { scope: ref },
  );

  const storyStyle = { "--row-gap": pattern.rowGap } as CSSProperties;

  return (
    <section
      ref={ref}
      id={pizza.slug}
      className={s.chapter}
      aria-labelledby={`${uid}-title`}
    >
      <div className={s.bg} aria-hidden="true">
        {/* Scatola assoluta: next/image la vuole per `fill` (lo sticky non
            basta) ed è più alta dello schermo, per il parallasse. La prima
            foto sta al bordo dello schermo: caricata subito. */}
        <div className={s.photoBox} data-parallax>
          <Image
            src={pizza.image}
            alt=""
            fill
            sizes="100vw"
            loading={index === 0 ? "eager" : "lazy"}
            className={s.photo}
          />
        </div>
        <div className={s.shade} />
      </div>

      <div className={s.flow}>
        <div className={s.beatTitle}>
          <p className={s.chapterNo} data-caption>
            {pad(index + 1)} / {pad(total)}
          </p>
          <h2 id={`${uid}-title`} className={s.title} data-title>
            <span className="visually-hidden">{pizza.name}</span>
            <span aria-hidden="true">
              <Letters text={pizza.name} />
            </span>
          </h2>
          <ul className={s.captions} aria-label="Ingredienti">
            {pizza.ingredients.map((ingredient) => (
              <li key={ingredient} data-caption>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className={s.beatQuote}>
          <span className={s.vline} data-vline aria-hidden="true" />
          <p className={s.quote} data-quote>
            {pizza.quote}
          </p>
        </div>

        <div
          ref={storyRef}
          className={s.story}
          style={storyStyle}
          data-pace="slow"
        >
          {/* Le linee stanno sotto ai nodi: se incrociano una foto, ci passano sotto */}
          <svg className={s.wires} aria-hidden="true" focusable="false">
            {Array.from({ length: wireCount }, (_, i) => {
              const kind = pattern.wires[i % pattern.wires.length];
              if (kind !== "dashed") {
                return (
                  <path
                    key={i}
                    className={s.wire}
                    data-draw={i}
                    data-wire={i}
                    data-kind={kind}
                  />
                );
              }
              const maskId = `${uid}-m${i}`;
              return (
                <g key={i}>
                  <mask
                    id={maskId}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                  >
                    <path
                      className={s.maskPath}
                      data-draw={i}
                      data-wire={i}
                      data-kind={kind}
                    />
                  </mask>
                  <path
                    className={`${s.wire} ${s.wireDashed}`}
                    mask={`url(#${maskId})`}
                    data-wire={i}
                  />
                </g>
              );
            })}
          </svg>

          {texts.map((text, i) => {
            const slot = pattern.texts[i];
            const style = {
              "--col": slot.col,
              "--col-m": slot.colM,
              "--row": slot.row,
              "--row-m": slot.rowM,
            } as CSSProperties;
            return (
              <p
                key={i}
                className={`${s.node} ${s.frag}`}
                style={style}
                data-node="text"
              >
                {text}
              </p>
            );
          })}

          {/* Al massimo due foto per capitolo: di fianco a una frase, sulla
              sua stessa riga e quindi centrate con lei, oppure esattamente
              a metà di una linea (posizionate in layout()). */}
          {pattern.shots.map((shot, i) => {
            const beside = shot.at === "beside";
            const style = beside
              ? ({
                  "--col": shot.col,
                  "--col-m": shot.colM,
                  "--row": shot.row,
                  "--row-m": shot.row,
                  "--shot-ratio": pattern.besideRatio,
                  "--shot-origin": shot.pos,
                } as CSSProperties)
              : ({
                  "--shot-ratio": pattern.wireRatio,
                  "--shot-w": pattern.wireWidth,
                  "--shot-origin": shot.pos,
                } as CSSProperties);
            return (
              <div
                key={`shot-${i}`}
                className={`${s.shot} ${beside ? s.node : s.shotWire}`}
                style={style}
                data-node="shot"
                data-shot-wire={beside ? undefined : shot.wire}
                aria-hidden="true"
              >
                <Image
                  src={pizza.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 60vw, 40vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          })}
        </div>

        <div className={s.beatEnd}>
          <span className={s.vline} data-vline aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
