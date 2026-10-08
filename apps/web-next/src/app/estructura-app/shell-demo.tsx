'use client';

import {
  Bell,
  Buildings,
  ChartBar,
  FolderOpen,
  GearSix,
  House,
  MagnifyingGlass,
  SignOut,
  UserCircle,
} from '@phosphor-icons/react';
import { useEffect, useState, type CSSProperties } from 'react';

import type { Tone } from '@mariasan001/ui-wc';

import { SIDEBAR_THEMES, type ShellExample } from './estructura-data';
import local from './estructura.module.css';

const NAV = [
  { label: 'Inicio', Icon: House },
  { label: 'Expedientes', Icon: FolderOpen },
  { label: 'Reportes', Icon: ChartBar },
  { label: 'Dependencias', Icon: Buildings },
  { label: 'Ajustes', Icon: GearSix },
] as const;

function ShellSidebar({
  collapsed,
  active,
  tone,
  onNavigate,
  onSignOut,
}: {
  collapsed?: boolean;
  active: string;
  tone: Tone;
  onNavigate: (label: string) => void;
  onSignOut: () => void;
}) {
  const theme = SIDEBAR_THEMES[tone];

  return (
    <aside
      slot="sidebar"
      className={`${local.sidebar} ${collapsed ? local.sidebarCollapsed : ''}`}
      style={
        {
          '--shell-side-bg': theme.bg,
          '--shell-side-text': theme.text,
          '--shell-side-muted': theme.muted,
          '--shell-side-active-bg': theme.activeBg,
          '--shell-side-active-text': theme.activeText,
          '--shell-side-mark-bg': theme.markBg,
          '--shell-side-mark-text': theme.markText,
          '--shell-side-foot-bg': theme.footBg,
          '--shell-side-foot-border': theme.footBorder,
          background: theme.bg,
          color: theme.text,
        } as CSSProperties
      }
    >
      <div className={local.brandBlock}>
        <span className={local.brandMark} aria-hidden="true">
          G
        </span>
        {!collapsed ? (
          <div>
            <p className={local.brand}>Gob UI</p>
            <p className={local.brandSub}>Sistema institucional</p>
          </div>
        ) : null}
      </div>

      <nav className={local.nav} aria-label="Principal">
        {NAV.map(({ label, Icon }) => {
          const isActive = label === active;
          return (
            <button
              key={label}
              type="button"
              className={`${local.navItem} ${isActive ? local.navActive : ''}`}
              title={label}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate(label)}
            >
              <Icon weight="thin" size={18} aria-hidden="true" />
              {!collapsed ? <em>{label}</em> : null}
            </button>
          );
        })}
      </nav>

      {!collapsed ? (
        <div className={local.sidebarFoot}>
          <span>
            <UserCircle weight="thin" size={18} aria-hidden="true" />
            MG Sandoval
          </span>
          <button type="button" className={local.signOut} onClick={onSignOut}>
            <SignOut weight="thin" size={16} aria-hidden="true" />
            Salir
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={local.sidebarFootCollapsed}
          title="Salir"
          onClick={onSignOut}
        >
          <SignOut weight="thin" size={18} aria-hidden="true" />
        </button>
      )}
    </aside>
  );
}

function ShellTopbar({
  title,
  meta,
  tone,
  query,
  onQuery,
  onSearch,
  onBell,
  onProfile,
  unread,
}: {
  title: string;
  meta?: string;
  tone: Tone;
  query: string;
  onQuery: (v: string) => void;
  onSearch: () => void;
  onBell: () => void;
  onProfile: () => void;
  unread: number;
}) {
  const theme = SIDEBAR_THEMES[tone];

  return (
    <header
      slot="topbar"
      className={local.topbar}
      style={
        {
          '--shell-accent': theme.accent,
          '--shell-accent-soft': theme.accentSoft,
          '--shell-accent-text': theme.accentText,
        } as CSSProperties
      }
    >
      <div className={local.topbarLeft}>
        <strong>{title}</strong>
        {meta ? <p className={local.topMeta}>{meta}</p> : null}
      </div>
      <div className={local.topbarRight}>
        <label className={local.search}>
          <MagnifyingGlass weight="thin" size={16} aria-hidden="true" />
          <input
            value={query}
            placeholder="Buscar expediente"
            aria-label="Buscar expediente"
            onChange={(e) => onQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch();
            }}
          />
        </label>
        <button
          type="button"
          className={local.iconBtn}
          aria-label="Notificaciones"
          onClick={onBell}
        >
          <Bell weight="thin" size={18} />
          {unread > 0 ? <i className={local.dot} /> : null}
        </button>
        <button type="button" className={local.userChip} onClick={onProfile}>
          MG
        </button>
      </div>
    </header>
  );
}

function Status({
  tone,
  children,
}: {
  tone: 'open' | 'review' | 'done';
  children: string;
}) {
  return (
    <em className={`${local.status} ${local[`status_${tone}`]}`}>{children}</em>
  );
}

function BasicContent({ onNew }: { onNew: () => void }) {
  return (
    <section className={local.panel}>
      <div className={local.panelHead}>
        <div>
          <h3>Bienvenida operativa</h3>
          <p>Resumen del dia y accesos frecuentes.</p>
        </div>
        <button type="button" className={local.primaryBtn} onClick={onNew}>
          Nuevo expediente
        </button>
      </div>
      <div className={local.split}>
        <div className={local.listBlock}>
          <div className={local.listRow}>
            <div>
              <strong>EXP-2041</strong>
              <span>Solicitud de constancia</span>
            </div>
            <Status tone="review">En revision</Status>
          </div>
          <div className={local.listRow}>
            <div>
              <strong>EXP-2040</strong>
              <span>Actualizacion de datos</span>
            </div>
            <Status tone="open">Abierto</Status>
          </div>
          <div className={local.listRow}>
            <div>
              <strong>EXP-2038</strong>
              <span>Baja de servicio</span>
            </div>
            <Status tone="done">Cerrado</Status>
          </div>
        </div>
        <aside className={local.sideNote}>
          <p className={local.sideNoteLabel}>Pendientes</p>
          <strong>12</strong>
          <p>Requieren respuesta hoy.</p>
        </aside>
      </div>
    </section>
  );
}

function CollapsedContent() {
  return (
    <section className={local.panel}>
      <div className={local.panelHead}>
        <div>
          <h3>Expedientes</h3>
          <p>Vista ancha con menu colapsado.</p>
        </div>
        <span className={local.metaChip}>248 registros</span>
      </div>
      <div className={local.tableDemo}>
        <div className={local.tableHead}>
          <span>Folio</span>
          <span>Solicitante</span>
          <span>Dependencia</span>
          <span>Estado</span>
        </div>
        {[
          ['EXP-2041', 'Ana Ruiz', 'Salud', 'En revision'],
          ['EXP-2040', 'Luis Mora', 'Educacion', 'Abierto'],
          ['EXP-2039', 'Diana Paz', 'Finanzas', 'Abierto'],
          ['EXP-2038', 'Hector Sol', 'Obras', 'Cerrado'],
        ].map(([folio, name, dep, state]) => (
          <div key={folio} className={local.tableRow}>
            <strong>{folio}</strong>
            <span>{name}</span>
            <span>{dep}</span>
            <Status
              tone={
                state === 'Cerrado' ? 'done' : state === 'Abierto' ? 'open' : 'review'
              }
            >
              {state}
            </Status>
          </div>
        ))}
      </div>
    </section>
  );
}

function FocusContent({
  onCancel,
  onContinue,
}: {
  onCancel: () => void;
  onContinue: () => void;
}) {
  return (
    <section className={local.panel}>
      <div className={local.wizard}>
        <div className={local.steps}>
          <span className={local.stepActive}>1. Datos</span>
          <span>2. Documentos</span>
          <span>3. Revision</span>
        </div>
        <div className={local.formGrid}>
          <label>
            <span>Nombre completo</span>
            <i>Maria Guadalupe Sandoval</i>
          </label>
          <label>
            <span>CURP</span>
            <i>SAGM900101MDFNRR09</i>
          </label>
          <label className={local.formWide}>
            <span>Motivo de la solicitud</span>
            <i>Actualizacion de domicilio fiscal para el ejercicio vigente.</i>
          </label>
        </div>
        <div className={local.formActions}>
          <button type="button" className={local.ghostBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button
            type="button"
            className={local.primaryBtn}
            onClick={onContinue}
          >
            Continuar
          </button>
        </div>
      </div>
    </section>
  );
}

function DenseContent() {
  return (
    <section className={local.panelDense}>
      <div className={local.panelHead}>
        <div>
          <h3>Cola operativa</h3>
          <p>Densidad compacta para revision rapida.</p>
        </div>
      </div>
      <div className={local.denseList}>
        {[
          ['08:14', 'EXP-2041', 'Validar documentos', 'Alta'],
          ['08:22', 'EXP-2040', 'Asignar revisor', 'Media'],
          ['08:31', 'EXP-2039', 'Notificar ciudadano', 'Alta'],
          ['08:45', 'EXP-2037', 'Cerrar expediente', 'Baja'],
          ['09:02', 'EXP-2035', 'Generar oficio', 'Media'],
        ].map(([time, folio, task, prio]) => (
          <div key={`${folio}-${time}`} className={local.denseRow}>
            <time>{time}</time>
            <strong>{folio}</strong>
            <span>{task}</span>
            <em className={local.prio}>{prio}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

function BoardContent() {
  return (
    <section className={local.board}>
      <div className={local.boardHead}>
        <div>
          <h3>Resumen operativo</h3>
          <p>Indicadores del periodo actual.</p>
        </div>
        <span className={local.metaChip}>Ultimos 30 dias</span>
      </div>
      <div className={local.kpiRow}>
        <article className={local.kpi}>
          <span>Abiertos</span>
          <strong>128</strong>
          <small>+12 esta semana</small>
        </article>
        <article className={local.kpi}>
          <span>En revision</span>
          <strong>46</strong>
          <small>8 urgentes</small>
        </article>
        <article className={local.kpi}>
          <span>Cerrados</span>
          <strong>312</strong>
          <small>94% a tiempo</small>
        </article>
      </div>
      <div className={local.panelBlock}>
        <div className={local.panelRow}>
          <div>
            <strong>EXP-2041</strong>
            <span>Constancia · Salud</span>
          </div>
          <Status tone="review">En revision</Status>
        </div>
        <div className={local.panelRow}>
          <div>
            <strong>EXP-2040</strong>
            <span>Actualizacion · Educacion</span>
          </div>
          <Status tone="open">Abierto</Status>
        </div>
        <div className={local.panelRow}>
          <div>
            <strong>EXP-2038</strong>
            <span>Baja · Obras</span>
          </div>
          <Status tone="done">Cerrado</Status>
        </div>
      </div>
    </section>
  );
}

export function ShellDemo({
  example,
  tone = 'primary',
}: {
  example: ShellExample;
  tone?: Tone;
}) {
  const theme = SIDEBAR_THEMES[tone];
  const defaultActive = example.id === 'colapsado' ? 'Expedientes' : 'Inicio';
  const [active, setActive] = useState(defaultActive);
  const [query, setQuery] = useState('');
  const [unread, setUnread] = useState(3);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    setActive(defaultActive);
  }, [defaultActive, example.id]);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(''), 2200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const shellProps = {
    collapsed: example.collapsed || undefined,
    dense: example.dense || undefined,
    'hide-topbar': example.hideTopbar || undefined,
    'sticky-topbar':
      example.stickyTopbar === false ? ('false' as const) : undefined,
  };

  const shellClass = `${local.shell} ${example.dense ? local.shellDense : ''} ${
    example.hideTopbar ? local.shellFocus : ''
  } ${example.variant === 'board' ? local.shellBoard : ''}`;

  const titleFromNav =
    active === 'Inicio'
      ? example.id === 'tablero'
        ? 'Tablero institucional'
        : example.id === 'compacto'
          ? 'Cola operativa'
          : 'Inicio'
      : active;

  let body = <BasicContent onNew={() => setFlash('Nuevo expediente')} />;
  if (example.id === 'colapsado') body = <CollapsedContent />;
  if (example.id === 'sin-topbar') {
    body = (
      <FocusContent
        onCancel={() => setFlash('Formulario cancelado')}
        onContinue={() => setFlash('Paso 2 · Documentos')}
      />
    );
  }
  if (example.id === 'compacto') body = <DenseContent />;
  if (example.id === 'tablero') body = <BoardContent />;

  return (
    <div className={local.demoWrap}>
      <gob-app-shell
        {...shellProps}
        className={shellClass}
        style={
          {
            '--gob-shell-sidebar-bg': theme.bg,
            '--gob-shell-sidebar-border': theme.border,
            '--gob-shell-sidebar-text': theme.text,
          } as CSSProperties
        }
      >
        <ShellSidebar
          collapsed={example.collapsed}
          active={active}
          tone={tone}
          onNavigate={(label) => {
            setActive(label);
            setFlash(`Seccion: ${label}`);
          }}
          onSignOut={() => setFlash('Sesion cerrada')}
        />
        {!example.hideTopbar ? (
          <ShellTopbar
            tone={tone}
            title={flash || titleFromNav}
            meta={
              flash
                ? 'Accion reciente'
                : example.id === 'tablero'
                  ? 'Hoy · 30 jul 2026'
                  : example.id === 'compacto'
                    ? 'Turno matutino'
                    : 'Direccion de Operaciones'
            }
            query={query}
            onQuery={setQuery}
            onSearch={() =>
              setFlash(
                query.trim()
                  ? `Busqueda: “${query.trim()}”`
                  : 'Escribe un folio o CURP',
              )
            }
            onBell={() => {
              if (unread > 0) {
                setUnread(0);
                setFlash('3 avisos leidos');
              } else {
                setUnread(3);
                setFlash('3 avisos nuevos');
              }
            }}
            onProfile={() => setFlash('Perfil · MG Sandoval')}
            unread={unread}
          />
        ) : null}
        {body}
      </gob-app-shell>
      {example.hideTopbar && flash ? (
        <p className={local.flash} role="status">
          {flash}
        </p>
      ) : null}
    </div>
  );
}
