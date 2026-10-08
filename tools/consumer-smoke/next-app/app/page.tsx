export default function HomePage() {
  return (
    <main className="gob-container gob-stack">
      <h1>Smoke test Next</h1>
      <p className="gob-muted">Consumo real del paquete publicado como tarball.</p>
      <div className="gob-row">
        <gob-button tone="primary" appearance="solid">
          Guardar
        </gob-button>
        <gob-button tone="accent" appearance="outline">
          Enviar
        </gob-button>
      </div>
    </main>
  );
}
