import Link from 'next/link';

import s from './site-nav.module.css';

const LINKS = [
  { href: '/#componentes', label: 'Componentes' },
  { href: '/fundamentos', label: 'Fundamentos' },
  { href: '/instalacion', label: 'Instalacion' },
  { href: '/playground', label: 'Playground' },
];

export function SiteNav({ active }: { active?: 'componentes' | 'fundamentos' | 'instalacion' | 'playground' }) {
  return (
    <header className={s.nav}>
      <div className={s.inner}>
        <Link className={s.brand} href="/">
          Gob UI
        </Link>
        <nav className={s.links} aria-label="Principal">
          {LINKS.map((link) => {
            const id = link.href.replace('/#', '').replace('/', '') as typeof active;
            const isActive = active === id || (active === 'componentes' && link.href === '/#componentes');
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
