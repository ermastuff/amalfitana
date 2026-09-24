import Link from "next/link";
import { booking, heroNavSides, site, type NavLink } from "@/data/site";
import s from "./HeroNav.module.css";

type Props = {
  /** Percorso della pagina corrente, per aria-current. */
  current?: string;
  className?: string;
};

const [NAV_LEFT, NAV_RIGHT] = heroNavSides;

/**
 * Menu delle hero: le voci del sito ai due lati del simbolo del logo, che
 * riporta alla home. In fondo a destra, al posto dei contatti, il numero da
 * chiamare per prenotare. Le pagine ancora da fare restano nel menu, spente e
 * senza link. Voci e simbolo portano `data-hero-nav`, che le hero usano per
 * l'animazione d'ingresso.
 */
export default function HeroNav({ current, className }: Props) {
  const item = (link: NavLink) => (
    <li key={link.href} data-hero-nav>
      {link.disabled ? (
        <span className={`${s.link} ${s.off}`}>{link.label}</span>
      ) : (
        <Link
          href={link.href}
          className={s.link}
          aria-current={link.href === current ? "page" : undefined}
        >
          {link.label}
        </Link>
      )}
    </li>
  );

  return (
    <nav
      className={`${s.nav} ${className ?? ""}`}
      aria-label="Sezioni del sito"
    >
      <ul>{NAV_LEFT.map(item)}</ul>
      <Link
        href="/"
        className={s.logo}
        aria-label={`${site.name}, home`}
        data-hero-nav
      >
        <span className={s.symbol} aria-hidden="true" />
      </Link>
      <ul>
        {NAV_RIGHT.map(item)}
        <li data-hero-nav>
          {/* Da schermo stretto resta solo la parola: il numero non ci sta */}
          <a href={booking.href} className={`${s.link} ${s.book}`}>
            {`${booking.label} `}
            <span className={s.bookNumber}>{booking.phone}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
