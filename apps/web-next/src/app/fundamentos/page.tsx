'use client';

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';

import s from './page.module.css';
import local from './fundamentos.module.css';

const FOUNDATIONS = [
  {
    href: '/tipografia',
    name: 'Tipografía',
    description: 'Gotham, escala H1–H6, cuerpo y colores de texto.',
  },
  {
    href: '/colores',
    name: 'Colores',
    description: 'Marca, superficies Canvas y semáforo institucional.',
  },
  {
    href: '/iconografia',
    name: 'Iconografía',
    description: 'Phosphor thin y uso correcto en componentes.',
  },
];

export default function FundamentosPage() {
  return (
    <div className={s.page}>
      <header className={s.hero}>
        <div className={s.heroInner}>
          <Link className={s.back} href="/">
            ← Componentes
          </Link>
          <h1 className={s.title}>Fundamentos</h1>
          <p className={s.hint}>
            La base visual de <strong>Gob UI</strong>: tipografía, color e iconos antes de armar
            pantallas.
          </p>
          <p className={s.version}>Version 1.0 / Libreria Gob_v2</p>
        </div>
      </header>

      <div className={s.panelWrap}>
        <section className={s.panel}>
          <section className={s.section} aria-label="Fundamentos">
            <div className={s.sectionHead}>
              <h2 className={s.sectionTitle}>Tokens base</h2>
              <p className={s.sectionDesc}>
                Empieza por estos tres pilares y luego pasa a componentes.
              </p>
            </div>

            <div className={local.list}>
              {FOUNDATIONS.map((item) => (
                <Link key={item.href} href={item.href} className={local.item}>
                  <div className={local.copy}>
                    <h3 className={local.name}>{item.name}</h3>
                    <p className={local.desc}>{item.description}</p>
                  </div>
                  <span className={local.cta}>
                    Abrir
                    <ArrowRight weight="thin" size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
