import Link from 'next/link';

import s from './site-nav.module.css';

const LINKS = [
  { href: '/#componentes', label: 'Componentes', id: 'componentes' as const },
  { href: '/instalacion', label: 'Instalación', id: 'instalacion' as const },
];

export function SiteNav({ active }: { active?: 'componentes' | 'instalacion' }) {
  return (
    <header className={s.nav}>
      <div className={s.inner}>
        <Link className={s.brand} href="/">
          Gob UI
        </Link>
        <nav className={s.links} aria-label="Principal">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${s.link} ${isActive ? s.linkActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
