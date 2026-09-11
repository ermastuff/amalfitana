import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";
import s from "./contatti.module.css";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Prenota un tavolo alla pizzeria Amalfitana. Indirizzo, orari, telefono e mappa per raggiungerci ad Amalfi.",
};

const mapsQuery = encodeURIComponent(site.address.mapsQuery);
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const embedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title={
          <>
            Vieni a <em>trovarci</em>.
          </>
        }
        intro="Siamo sul lungomare di Amalfi. Prenota un tavolo o scrivici: rispondiamo in giornata."
      />

      <section className="section--tight">
        <div className={`container ${s.grid}`}>
          <Reveal className={s.info}>
            <div className={s.block}>
              <p className="eyebrow">Dove</p>
              <address className={s.address}>
                {site.address.street}
                <br />
                {site.address.city}
              </address>
              <a
                href={directionsUrl}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Indicazioni stradali
              </a>
            </div>

            <div className={s.block}>
              <p className="eyebrow">Telefono &amp; email</p>
              <a href={site.phoneHref} className={s.big}>
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="text-link">
                {site.email}
              </a>
            </div>

            <div className={s.block}>
              <p className="eyebrow">Orari</p>
              <table className={s.hours}>
                <tbody>
                  {site.hours.map((h) => (
                    <tr key={h.days}>
                      <th scope="row">{h.days}</th>
                      <td>{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={s.block}>
              <p className="eyebrow">Social</p>
              <ul className={s.social}>
                {site.social.map((so) => (
                  <li key={so.label}>
                    <a
                      href={so.href}
                      className="text-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {so.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className={s.formCol} delay={0.15}>
            <p className="eyebrow">Prenota un tavolo</p>
            <h2 className="h3">Dicci quando, al resto pensiamo noi.</h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className={`section--tight ${s.mapSection}`}>
        <Reveal className="container">
          <div className={s.map}>
            <iframe
              title="Mappa: dove siamo ad Amalfi"
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
