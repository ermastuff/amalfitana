import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";
import s from "./contatti.module.css";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Scrivici o chiamaci: L’Amalfitana, pizzeria d’asporto a Flero. Indirizzo, orari, telefono e il modulo per lavorare con noi.",
};

const mapsQuery = encodeURIComponent(site.address.mapsQuery);
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

export default function ContattiPage() {
  return (
    <section className={s.page}>
      <div className={s.inner}>
        {/* Di lato, i recapiti: restano fermi mentre si compila il modulo */}
        <aside className={s.info}>
          <div className={s.block}>
            <p className={s.label}>Contatti</p>
            <a href={`mailto:${site.email}`} className="text-link">
              {site.email}
            </a>
          </div>

          <div className={s.block}>
            <p className={s.label}>Telefono</p>
            <a href={site.orderPhoneHref}>{site.orderPhone}</a>
            <a href={site.phoneHref}>{site.phone}</a>
          </div>

          <div className={s.block}>
            <p className={s.label}>Indirizzo</p>
            <address className={s.address}>
              {site.legalName}
              <br />
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
            <p className={s.label}>Orari</p>
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
        </aside>

        <div className={s.main}>
          <h1 className={s.lead}>
            Scrivici per un ordine grande, per una serata in compagnia o per
            lavorare con noi. Ci fa piacere sentirti.
          </h1>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
