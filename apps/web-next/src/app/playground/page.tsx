'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { PlaygroundButtonBoard } from './playground-board';
import s from './page.module.css';

type ThemeMode = 'light' | 'dark';

function applyTheme(mode: ThemeMode) {
  if (mode === 'dark') {
    document.documentElement.setAttribute('data-gob-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-gob-theme');
  }
}

export default function PlaygroundPage() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <div className={`${s.root} gob-page-bg`}>
      <div className={s.shell}>
        <header className={s.topbar}>
          <div className={s.brand}>
            <span className={s.brandMark} aria-hidden="true" />
            <div>
              <span className={s.brandName}>Gob UI</span>
              <span className={s.brandTag}>Guia visual de acciones</span>
            </div>
          </div>

          <nav className={s.topnav} aria-label="Playground">
            <Link className={s.topLink} href="/">
              Inicio
            </Link>
            <Link className={s.topLink} href="/botones">
              Botones
            </Link>
            <Link className={s.topLink} href="/paginacion">
              Paginacion
            </Link>
            <button type="button" className={s.themeToggle} onClick={toggleTheme}>
              <span className={s.themeIcon} aria-hidden="true" />
              {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            </button>
          </nav>
        </header>

        <section className={s.hero}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>
              <span className={s.eyebrowDot} aria-hidden="true" />
              Acciones del sistema
            </p>

            <h1 className={s.heroTitle}>Botones listos para operaciones diarias, revisiones y seguimiento.</h1>

            <p className={s.heroLead}>
              Esta vista resume las combinaciones recomendadas para acciones principales,
              secundarias y contextuales dentro de modulos administrativos y mesas de control.
            </p>

            <div className={s.heroActions}>
              <gob-button tone="primary" appearance="solid" size="lg">
                Registrar solicitud
              </gob-button>
              <gob-button tone="neutral" appearance="outline" size="lg">
                Revisar pendientes
              </gob-button>
            </div>
          </div>

          <div className={s.heroStats}>
            <div>
              <dt>Uso principal</dt>
              <dd>Formularios y bandejas</dd>
            </div>
            <div>
              <dt>Estados</dt>
              <dd>Activo, carga y bloqueo</dd>
            </div>
            <div>
              <dt>Implementacion</dt>
              <dd>WC + variables CSS</dd>
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.sectionIntro}>
            <h2 className={s.sectionTitle}>Referencias de uso</h2>
            <p className={s.sectionDesc}>
              Cada fila sugiere una familia de acciones para flujos reales de captura, validacion y consulta.
            </p>
          </div>

          <PlaygroundButtonBoard />
        </section>

        <footer className={s.footer}>
          <p>Gob UI · referencia de acciones · {theme === 'light' ? 'Tema claro' : 'Tema oscuro'}</p>
          <Link className={s.footerLink} href="/playground/button">
            Abrir configuracion detallada
          </Link>
        </footer>
      </div>
    </div>
  );
}
