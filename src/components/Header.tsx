"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useLenis } from "lenis/react";
import { site } from "@/data/site";
import s from "./Header.module.css";

// Pagine che aprono con una hero scura a tutta pagina: lì la navigazione sta
// dentro alla hero stessa, quindi l'header resta nascosto finché non la si supera.
const HERO_ROUTES = ["/", "/menu", "/pizze-gourmet"];

export default function Header() {
  const pathname = usePathname();
  const onHero = HERO_ROUTES.includes(pathname);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const close = () => setOpen(false);

  // Blocca lo scroll della pagina (lenis.stop → overflow: clip su <html>)
  // e gestisce ESC quando il menu è aperto.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, lenis]);

  // Stato "scrolled": sopra una hero scura l'header è trasparente e diventa
  // chiaro quando la hero è finita; nelle altre pagine dopo pochi pixel.
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      ScrollTrigger.create({
        start: () => {
          if (!onHero) return 24;
          const hero = document.querySelector<HTMLElement>("[data-hero]");
          return (hero?.offsetHeight ?? window.innerHeight) - 80;
        },
        end: 999999,
        toggleClass: { targets: header, className: s.scrolled },
      });
    },
    { scope: headerRef, dependencies: [onHero], revertOnUpdate: true },
  );

  // Sparisce scorrendo verso il basso, ricompare appena si scorre verso l'alto
  // (o si è vicini alla cima della pagina).
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 120;
          header.classList.toggle(s.hidden, hide);
        },
      });
    },
    { scope: headerRef },
  );

  // Apertura / chiusura del menu mobile.
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const items = overlay.querySelectorAll("[data-menu-item]");

      if (open) {
        gsap
          .timeline()
          .to(overlay, { autoAlpha: 1, duration: 0.35, ease: "power2.out" })
          .fromTo(
            items,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
            },
            "-=0.15",
          );
      } else {
        gsap.to(overlay, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      }
    },
    { dependencies: [open] },
  );

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        ref={headerRef}
        className={`${s.header} ${onHero ? s.onHero : ""}`}
      >
        <div className={s.inner}>
          <Link href="/" className={s.brand} aria-label={`${site.name}, home`}>
            <span className={s.logo} aria-hidden="true" />
          </Link>

          <nav className={s.nav} aria-label="Navigazione principale">
            <ul className={s.navList}>
              {site.nav.map((link) => (
                <li key={link.href}>
                  {link.disabled ? (
                    <span className={`${s.navLink} ${s.off}`}>
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className={s.navLink}
                      aria-current={isActive(link.href) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Pizzeria d'asporto: si ordina al telefono (Contatti è da fare) */}
          <a href={site.orderPhoneHref} className={`btn ${s.cta}`}>
            Ordina ora
          </a>

          <button
            type="button"
            className={s.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={s.burgerLine} />
            <span className={s.burgerLine} />
          </button>
        </div>
      </header>

      {/* Fuori dall'header: backdrop-filter creerebbe un containing block per position: fixed */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        className={s.overlay}
        aria-hidden={!open}
      >
        <ul className={s.overlayList}>
          {site.nav.map((link) => (
            <li key={link.href} data-menu-item>
              {link.disabled ? (
                <span className={`${s.overlayLink} ${s.off}`}>
                  {link.label}
                </span>
              ) : (
                <Link
                  href={link.href}
                  className={s.overlayLink}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  tabIndex={open ? 0 : -1}
                  onClick={close}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className={s.overlayMeta} data-menu-item>
          <span>
            {site.address.street}, {site.address.city}
          </span>
          <a href={site.phoneHref} tabIndex={open ? 0 : -1} onClick={close}>
            {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}
