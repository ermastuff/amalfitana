"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { wavePhotos, waveText } from "@/data/home";
import LettersUp from "./LettersUp";
import s from "./MenuWave.module.css";

// L'onda: quanto si sposta di lato una foto (in parte della colonna), quanto
// è lunga l'onda (in schermate) e di quanti gradi le foto si inclinano
// seguendone la curva.
const SWAY = 0.2;
const SWAY_MAX = 150;
const WAVELENGTH = 1.5;
const TILT = 2.4;

// La foto che passa in mezzo allo schermo è la principale: si allarga, le
// altre restano strette. La differenza tra le due scale dà la "tensione".
const REACH = 0.7;
const SCALE_X = [0.9, 1.1] as const;
const SCALE_Y = [0.93, 1.07] as const;

/**
 * Il menu raccontato con le foto: un'unica colonna che scorrendo ondeggia a
 * destra e a sinistra come un serpente — le foto si inclinano seguendo la
 * curva e quella al centro dello schermo si allarga, mentre le altre si
 * stringono. Di fianco, fermo, il blocco con i due link.
 */
export default function MenuWave() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const photos = gsap.utils.toArray<HTMLElement>("[data-photo]", root);
      const column = photos[0]?.parentElement;
      if (!photos.length || !column) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Posizioni prese dal flusso (offsetTop), non dai rettangoli: quelli
        // risentono delle trasformazioni già applicate.
        let centers: number[] = [];
        let sway = 0;
        let wave = 0;
        let reach = 0;

        const measure = () => {
          const top = column.getBoundingClientRect().top + window.scrollY;
          centers = photos.map((p) => top + p.offsetTop + p.offsetHeight / 2);
          sway = Math.min(column.clientWidth * SWAY, SWAY_MAX);
          wave = window.innerHeight * WAVELENGTH;
          reach = window.innerHeight * REACH;
        };

        const apply = () => {
          const scroll = window.scrollY;
          const middle = scroll + window.innerHeight / 2;
          photos.forEach((photo, i) => {
            const phase = ((centers[i] - scroll) / wave) * Math.PI * 2;
            // Vicinanza al centro dello schermo, addolcita agli estremi
            const near = Math.max(0, 1 - Math.abs(centers[i] - middle) / reach);
            const k = near * near * (3 - 2 * near);
            gsap.set(photo, {
              x: sway * Math.sin(phase),
              rotation: TILT * Math.cos(phase),
              scaleX: SCALE_X[0] + (SCALE_X[1] - SCALE_X[0]) * k,
              scaleY: SCALE_Y[0] + (SCALE_Y[1] - SCALE_Y[0]) * k,
            });
          });
        };

        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onRefresh: () => {
            measure();
            apply();
          },
          onUpdate: apply,
        });

        const head = root.querySelector("[data-head]");
        const scrollTrigger = { trigger: head, start: "top 82%", once: true };
        gsap.fromTo(
          root.querySelectorAll("[data-up]"),
          { yPercent: 115, y: 0 },
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger,
          },
        );
        gsap.from(root.querySelectorAll("[data-side]"), {
          y: 18,
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger,
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={s.wave}>
      <div className={s.inner}>
        <div className={s.photos}>
          {wavePhotos.map((photo, i) => {
            const style = {
              "--w": photo.width,
              "--ratio": photo.ratio,
              "--overlap": photo.overlap,
              "--pos": photo.pos,
              "--z": i,
            } as CSSProperties;
            return (
              <figure
                key={photo.src}
                className={s.photo}
                style={style}
                data-photo
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 900px) 70vw, 34vw"
                  className={s.img}
                />
              </figure>
            );
          })}
        </div>

        <div className={s.side}>
          <div className={s.card} data-head>
            <h2 className={s.title}>
              <span className="visually-hidden">{waveText.lines.join(" ")}</span>
              <span aria-hidden="true">
                {waveText.lines.map((line) => (
                  <span key={line} className={s.titleLine}>
                    <LettersUp text={line} />
                  </span>
                ))}
              </span>
            </h2>
            <p className={s.text} data-side>
              {waveText.text}
            </p>
            <div className={s.actions}>
              {waveText.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="soft-btn"
                  data-side
                >
                  {`${link.lead} `}
                  <span className="soft-btn__rule" aria-hidden="true" />
                  {` ${link.label}`}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
