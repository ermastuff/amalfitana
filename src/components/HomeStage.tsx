"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { box, wirePath } from "@/lib/wire";
import { app, intro, stageShots, verses } from "@/data/home";
import { site } from "@/data/site";
import LettersUp from "./LettersUp";
import s from "./HomeStage.module.css";

// La strofa per intero, per gli screen reader: a schermo è composta pezzo
// per pezzo e quella composizione è decorativa.
const VERSES_LABEL = `${verses.lead} ${verses.rows
  .map((row) => [verses.word, row.tail].filter(Boolean).join(" "))
  .join(", ")}`;

// Misura del riquadro alla fine del racconto, e di quanto va alzato da
// telefono per lasciare spazio al testo sotto. Si alza con una traslazione:
// i margini automatici, che lo tengono centrato, devono restare com'erano.
const target = () => {
  const small = window.matchMedia("(max-width: 860px)").matches;
  const width = small
    ? Math.min(window.innerWidth * 0.56, 260)
    : Math.min(window.innerWidth * 0.26, 400);
  return {
    width,
    height: width * (small ? 1.25 : 1.16),
    lift: small ? window.innerHeight * 0.15 : 0,
  };
};

/**
 * Il racconto a schermo fisso: la foto riempie lo schermo e cambia mentre si
 * scorre, il testo d'apertura arriva in profondità, la strofa si scrive una
 * lettera alla volta e alla fine la foto si rimpicciolisce fino a diventare
 * il riquadro accanto all'invito a scaricare l'app. Tutto dentro a un solo
 * blocco appiccicato (sticky): la visuale resta ferma finché il racconto non
 * è finito.
 */
export default function HomeStage() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const scope = root?.querySelector<HTMLElement>("[data-verses]");
      if (!root || !scope) return;

      // La linea tratteggiata che scende dalla riga d'apertura alla colonna
      // delle parole: stesso disegno delle altre pagine.
      const lead = scope.querySelector<HTMLElement>("[data-lead]");
      const firstWord = scope.querySelector<HTMLElement>("[data-word]");
      const layout = () => {
        if (!lead || !firstWord) return;
        const d = wirePath(box(lead), box(firstWord), "solid");
        scope
          .querySelectorAll<SVGPathElement>("[data-wire]")
          .forEach((p) => p.setAttribute("d", d));
      };
      layout();
      document.fonts.ready.then(layout);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const ups = (el: Element | null) =>
          el ? el.querySelectorAll("[data-up]") : [];

        // Una sola linea del tempo lunga 100, agganciata allo scroll: la
        // sezione è alta più schermi e il blocco dentro resta fermo.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Le foto si sovrappongono una sull'altra: basta accenderle in ordine
        const shots = gsap.utils.toArray<HTMLElement>("[data-shot]", root);
        shots.slice(1).forEach((shot, i) => {
          tl.to(shot, { opacity: 1, duration: 7 }, 16 + i * 18);
        });

        // 1. Il testo d'apertura arriva "in profondità": una riga alla
        //    volta, da lontano verso lo schermo
        tl.fromTo(
          "[data-intro-line]",
          { opacity: 0, scale: 0.9, filter: "blur(10px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 7,
            stagger: 4,
            ease: "power3.out",
          },
          2,
        ).to("[data-intro]", { opacity: 0, y: -26, duration: 6 }, 28);

        // 2. La strofa: apertura, linea tratteggiata, le parole una dopo
        //    l'altra e infine le due code
        tl.fromTo(
          ups(lead),
          { yPercent: 115, y: 0 },
          { yPercent: 0, duration: 7, stagger: 0.16, ease: "power3.out" },
          34,
        ).fromTo(
          "[data-wire-draw]",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 12, ease: "power2.inOut" },
          38,
        );
        gsap.utils
          .toArray<HTMLElement>("[data-word]", scope)
          .forEach((word, i) => {
            tl.fromTo(
              ups(word),
              { yPercent: 115, y: 0 },
              { yPercent: 0, duration: 3, stagger: 0.12, ease: "power3.out" },
              44 + i * 3.4,
            );
          });
        gsap.utils
          .toArray<HTMLElement>("[data-tail]", scope)
          .forEach((tail, i) => {
            tl.fromTo(
              ups(tail),
              { yPercent: 115, y: 0 },
              { yPercent: 0, duration: 5, stagger: 0.08, ease: "power3.out" },
              58 + i * 7,
            );
          });
        tl.fromTo(
          "[data-amp]",
          { opacity: 0 },
          { opacity: 1, duration: 4 },
          66,
        ).to("[data-verses]", { opacity: 0, y: -28, duration: 7 }, 74);

        // 3. La foto si rimpicciolisce fino al riquadro, l'ombra se ne va e
        //    intorno resta la pagina chiara
        tl.to(
          "[data-frame]",
          {
            width: () => target().width,
            height: () => target().height,
            y: () => -target().lift,
            borderRadius: 16,
            duration: 22,
            ease: "power2.inOut",
          },
          78,
        ).to("[data-shade]", { opacity: 0, duration: 14 }, 80);

        // 4. L'app: il titolo sale una lettera alla volta, poi il resto
        tl.fromTo(
          ups(root.querySelector("[data-app-title]")),
          { yPercent: 115, y: 0 },
          { yPercent: 0, duration: 9, stagger: 0.22, ease: "power3.out" },
          94,
        )
          .fromTo(
            "[data-app-item]",
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 7, stagger: 2, ease: "power3.out" },
            100,
          )
          .set({}, {}, 110);
      });

      const ro = new ResizeObserver(layout);
      ro.observe(scope);
      return () => ro.disconnect();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={s.stage} aria-labelledby="stage-title">
      <div className={s.viewport}>
        {/* La foto: riempie lo schermo e alla fine diventa il riquadro */}
        <div className={s.frame} data-frame>
          {stageShots.map((shot, i) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt=""
              fill
              sizes="100vw"
              className={s.shot}
              style={{ opacity: i === 0 ? 1 : 0 }}
              data-shot
            />
          ))}
          <div className={s.shade} data-shade aria-hidden="true" />
        </div>

        {/* 1. Il testo d'apertura */}
        <div className={s.intro} data-intro>
          <h2 id="stage-title" className="visually-hidden">
            Chi siamo
          </h2>
          <div className={s.introBox}>
            <p className={s.introLines}>
              {intro.lines.map((line) => (
                <span key={line} className={s.introLine} data-intro-line>
                  {line}
                </span>
              ))}
            </p>
            <p className={s.introLead} data-intro-line>
              {intro.lead}
            </p>
          </div>
        </div>

        {/* 2. La strofa */}
        <div className={s.verses} data-verses>
          <p className="visually-hidden">{VERSES_LABEL}</p>
          <div className={s.versesBlock} aria-hidden="true">
            <p className={s.versesLead} data-lead>
              <LettersUp text={verses.lead} />
            </p>
            <svg className={s.versesWire} focusable="false">
              <mask
                id="stage-wire-mask"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="100%"
                height="100%"
              >
                <path className={s.maskPath} data-wire data-wire-draw />
              </mask>
              <path
                className={`${s.wire} ${s.wireDashed}`}
                mask="url(#stage-wire-mask)"
                data-wire
              />
            </svg>
            <ul className={s.versesRows}>
              {verses.rows.map((row, i) => (
                <li key={i} className={s.versesRow}>
                  <span className={s.amp}>
                    {row.amp ? <span data-amp>&amp;</span> : null}
                  </span>
                  <span className={s.versesWord} data-word>
                    <LettersUp text={verses.word} />
                  </span>
                  <span className={s.versesTail}>
                    {row.tail ? (
                      <span data-tail>
                        <LettersUp text={row.tail} />
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. L'app, attorno al riquadro */}
        <div className={s.app}>
          <h3 className={s.appTitle} data-app-title>
            <span className="visually-hidden">{app.lines.join(" ")}</span>
            <span aria-hidden="true">
              {app.lines.map((line) => (
                <span key={line} className={s.appLine}>
                  <LettersUp text={line} />
                </span>
              ))}
            </span>
          </h3>

          <div className={s.appSide}>
            <p className={s.appText} data-app-item>
              {app.text}
            </p>
            <div className={s.appActions} data-app-item>
              <a
                href={site.apps.ios}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                App Store
              </a>
              <a
                href={site.apps.android}
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
