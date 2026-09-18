"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { waveGroups } from "@/data/home";
import LettersUp from "./LettersUp";
import s from "./MenuWave.module.css";

// Quanto scorre di lato una foto lungo la sezione, e l'ampiezza dell'onda che
// sfasa una foto dall'altra.
const DRIFT = 40;
const WAVE = 22;

/**
 * Il menu raccontato con le foto: una colonna di foto accavallate che scorre
 * ondeggiando da destra verso sinistra, e di fianco — ferme — le due liste,
 * il menu di sempre e le pizze d'autore.
 */
export default function MenuWave() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        for (const group of gsap.utils.toArray<HTMLElement>(
          "[data-group]",
          root,
        )) {
          // Onda: tutte le foto scivolano verso sinistra, ma ognuna è
          // sfasata rispetto alla precedente.
          gsap.utils
            .toArray<HTMLElement>("[data-photo]", group)
            .forEach((photo, i) => {
              const phase = i * 0.8;
              gsap.fromTo(
                photo,
                { x: DRIFT + Math.sin(phase) * WAVE },
                {
                  x: -DRIFT - Math.sin(phase) * WAVE,
                  ease: "none",
                  scrollTrigger: {
                    trigger: group,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8,
                  },
                },
              );
            });

          const head = group.querySelector("[data-head]");
          const scrollTrigger = { trigger: head, start: "top 82%", once: true };
          gsap.fromTo(
            group.querySelectorAll("[data-up]"),
            { yPercent: 115, y: 0 },
            {
              yPercent: 0,
              duration: 1.1,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger,
            },
          );
          gsap.from(group.querySelectorAll("[data-side]"), {
            y: 18,
            opacity: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger,
          });
        }
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={s.wave}>
      {waveGroups.map((group) => (
        <div key={group.title} className={s.group} data-group>
          <div className={s.photos}>
            {group.photos.map((photo, i) => {
              const style = {
                "--w": photo.width,
                "--dx": photo.dx,
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
              <p className={s.eyebrow} data-side>
                {group.eyebrow}
              </p>
              <h2 className={s.title}>
                <span className="visually-hidden">{group.title}</span>
                <span aria-hidden="true">
                  <LettersUp text={group.title} />
                </span>
              </h2>
              <p className={s.text} data-side>
                {group.text}
              </p>
              <ul className={s.items}>
                {group.items.map((item) => (
                  <li key={item} data-side>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={group.link.href} className="text-link" data-side>
                {group.link.label}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
