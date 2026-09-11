import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div
        className="container"
        style={{
          display: "grid",
          gap: "1.5rem",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        <p className="eyebrow">Errore 404</p>
        <h1 className="display-lg">
          Questa pagina <em>non c&apos;è</em>.
        </h1>
        <p className="lead">
          Forse è finita nel forno. Torna alla home o dai un&apos;occhiata al
          menu.
        </p>
        <Link href="/" className="btn btn--primary">
          Torna alla home
        </Link>
      </div>
    </section>
  );
}
