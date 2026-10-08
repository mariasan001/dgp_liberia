export function App() {
  return (
    <main className="gob-container gob-stack">
      <h1>Smoke test Vite + React</h1>
      <p className="gob-muted">Consumidor externo usando tarballs reales.</p>
      <div className="gob-row">
        <gob-button tone="primary" appearance="solid">
          Guardar
        </gob-button>
        <gob-button tone="dark" appearance="ghost">
          Consultar
        </gob-button>
      </div>
    </main>
  );
}
