"use client";

import { useId, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { GourmetPizza } from "@/data/gourmet";
import { SLOTS, WIRE_KINDS, wirePath, type Box } from "./wires";
import s from "./gourmet.module.css";

type Props = { pizza: GourmetPizza; index: number; total: number };

type StoryNode =
  | { kind: "text"; text: string }
  | { kind: "shot"; position: string };

const pad = (n: number) => String(n).padStart(2, "0");

// Le due foto piccole entrano dopo il secondo e il quarto frammento, come i
// ritratti del riferimento. Per ora sono due ritagli della foto di sfondo
// (in alto gli ingredienti, in basso la pizza): da sostituire con foto vere.
function storyNodes(pizza: GourmetPizza): StoryNode[] {
  const nodes: StoryNode[] = [];
  pizza.fragments.forEach((text, i) => {
    nodes.push({ kind: "text", text });
    if (i === 1) nodes.push({ kind: "shot", position: "50% 16%" });
    if (i === 3) nodes.push({ kind: "shot", position: "50% 80%" });
  });
  return nodes;
}

// Posizione e misura di un nodo rispetto al racconto, senza le trasformazioni
// di GSAP (a metà animazione il nodo è scalato): le linee vanno ai posti finali.
const box = (el: HTMLElement): Box => ({
  left: el.offsetLeft,
  top: el.offsetTop,
  width: el.offsetWidth,
  height: el.offsetHeight,
});

/**
 * Un capitolo: la foto resta ferma (sticky) mentre le scorrono sopra il
 * titolo con gli ingredienti, la linea con la frase d'apertura, il racconto a
 * frammenti collegati da linee che si disegnano, e la linea di chiusura.
 */
export default function Chapter({ pizza, index, total }: Props) {
  const ref = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const nodes = storyNodes(pizza);

  useGSAP(
    () => {
      const root = ref.current;
      const story = storyRef.current;
      if (!root || !story) return;
      const title = root.querySelector<HTMLElement>("[data-title]");
      const quote = root.querySelector<HTMLElement>("[data-quote]");
      const nodeEls = gsap.utils.toArray<HTMLElement>("[data-node]", story);

      // Le linee tra nodi consecutivi: ogni linea ha un tracciato che si
      // disegna (data-draw) e, se tratteggiata, un secondo tracciato visibile
      // mascherato dal primo; entrambi hanno lo stesso percorso (data-wire).
      const layout = () => {
        nodeEls.slice(0, -1).forEach((from, i) => {
          const d = wirePath(
            box(from),
            box(nodeEls[i + 1]),
            WIRE_KINDS[i % WIRE_KINDS.length],
          );
          story
            .querySelectorAll<SVGPathElement>(`[data-wire="${i}"]`)
            .forEach((p) => p.setAttribute("d", d));
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
          deep(title, { scrollTrigger });
          deep("[data-caption]", {
            scale: 0.88,
            filter: "blur(8px)",
            duration: 1,
            delay: 0.35,
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

        // Ogni collegamento si disegna mentre si scorre dal nodo di partenza
        // a quello d'arrivo
        nodeEls.slice(0, -1).forEach((from, i) => {
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
                  endTrigger: nodeEls[i + 1],
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

  return (
    <section
      ref={ref}
      id={pizza.slug}
      className={s.chapter}
      aria-labelledby={`${uid}-title`}
    >
      <div className={s.bg} aria-hidden="true">
        {/* Scatola assoluta: next/image la vuole per `fill` (lo sticky non
            basta). La prima foto sta al bordo dello schermo: caricata subito. */}
        <div className={s.photoBox}>
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
            {pizza.name}
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

        <div ref={storyRef} className={s.story}>
          <svg className={s.wires} aria-hidden="true" focusable="false">
            {nodes.slice(0, -1).map((_, i) => {
              const kind = WIRE_KINDS[i % WIRE_KINDS.length];
              if (kind !== "dashed") {
                return (
                  <path key={i} className={s.wire} data-draw={i} data-wire={i} />
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
                    <path className={s.maskPath} data-draw={i} data-wire={i} />
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

          {nodes.map((node, i) => {
            const slot = SLOTS[i];
            const style = {
              "--col": slot.col,
              "--col-m": slot.colM,
              "--row": slot.row,
            } as CSSProperties;
            return node.kind === "text" ? (
              <p key={i} className={`${s.node} ${s.frag}`} style={style} data-node>
                {node.text}
              </p>
            ) : (
              <div
                key={i}
                className={`${s.node} ${s.shot}`}
                style={style}
                data-node
                aria-hidden="true"
              >
                <Image
                  src={pizza.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 34vw, 16vw"
                  style={{ objectFit: "cover", objectPosition: node.position }}
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
