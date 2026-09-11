"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { PageFlip } from "page-flip/dist/js/page-flip.module.js";
import s from "./Flipbook.module.css";

type Props = {
  /** URL del PDF (in public). */
  src: string;
  /** Dimensioni di una pagina in punti PDF, servono solo per le proporzioni. */
  pageWidth: number;
  pageHeight: number;
  title?: string;
};

type Status = "loading" | "ready" | "error";

/** Larghezza in px a cui viene rasterizzata ogni pagina del PDF. */
const RENDER_WIDTH = 1000;

/**
 * Libro sfogliabile: rasterizza le pagine del PDF con pdf.js e le passa a
 * StPageFlip. Tutto avviene lato client, dopo il mount.
 */
export default function Flipbook({
  src,
  pageWidth,
  pageHeight,
  title = "Menu",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let flip: PageFlip | null = null;

    (async () => {
      try {
        // Entrambe le librerie subito: se un hot reload sostituisce il modulo
        // durante la rasterizzazione, non restano import in sospeso.
        const [pdfjs, { PageFlip }] = await Promise.all([
          import("pdfjs-dist"),
          import("page-flip/dist/js/page-flip.module.js"),
        ]);
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc = await pdfjs.getDocument({ url: src }).promise;
        const count = doc.numPages;
        if (cancelled) return;
        setTotal(count);

        const images: string[] = [];
        for (let i = 1; i <= count; i++) {
          if (cancelled) return;
          const pdfPage = await doc.getPage(i);
          const base = pdfPage.getViewport({ scale: 1 });
          const viewport = pdfPage.getViewport({
            scale: RENDER_WIDTH / base.width,
          });
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(viewport.width);
          canvas.height = Math.round(viewport.height);
          await pdfPage.render({ canvas, viewport }).promise;
          images.push(canvas.toDataURL("image/jpeg", 0.86));
          pdfPage.cleanup();
          setProgress(i / count);
        }

        const el = bookRef.current;
        if (cancelled || !el) return;
        el.innerHTML = "";

        flip = new PageFlip(el, {
          width: pageWidth,
          height: pageHeight,
          size: "stretch",
          minWidth: 220,
          maxWidth: 640,
          minHeight: 300,
          maxHeight: 820,
          showCover: true,
          usePortrait: true,
          maxShadowOpacity: 0.35,
          flippingTime: 900,
          mobileScrollSupport: false,
        });
        flip.on("flip", (e) => setPage(Number(e.data)));
        flip.loadFromImages(images);
        flipRef.current = flip;
        setStatus("ready");
      } catch (err) {
        console.error("Flipbook:", err);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      flip?.destroy();
      flipRef.current = null;
    };
  }, [src, pageWidth, pageHeight, attempt]);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const prev = () => flipRef.current?.flipPrev();
  const next = () => flipRef.current?.flipNext();

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen?.().catch(() => {});
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const ready = status === "ready";

  return (
    <div
      ref={wrapRef}
      className={s.wrap}
      role="region"
      aria-label={`${title}, libro sfogliabile`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className={s.arrow}
        onClick={prev}
        disabled={!ready}
        aria-label="Pagina precedente"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M16 4 8 12l8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={s.frame}>
        <div ref={bookRef} className={s.book} />
        {status === "loading" && (
          <div className={s.loading} role="status">
            <span>Caricamento del menu…</span>
            <span className={s.bar} aria-hidden="true">
              <span
                className={s.barFill}
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </span>
          </div>
        )}
        {status === "error" && (
          <div className={s.loading} role="alert">
            <p>Non riusciamo a mostrare il menu qui.</p>
            <p className={s.errorActions}>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setStatus("loading");
                  setProgress(0);
                  setAttempt((n) => n + 1);
                }}
              >
                Riprova
              </button>
              <a href={src} className="text-link">
                Scarica il PDF
              </a>
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        className={s.arrow}
        onClick={next}
        disabled={!ready}
        aria-label="Pagina successiva"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m8 4 8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={s.toolbar}>
        <span className={s.counter} aria-live="polite">
          {ready ? `${page + 1}/${total}` : "–/–"}
        </span>
        <button
          type="button"
          className={s.tool}
          onClick={toggleFullscreen}
          aria-label={fullscreen ? "Esci da schermo intero" : "Schermo intero"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {fullscreen ? (
              <path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
        <a
          href={src}
          download
          className={s.tool}
          aria-label="Scarica il menu in PDF"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
