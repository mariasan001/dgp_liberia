import type { Tone } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

/** Mismos swatches que Botones / Paginacion. Afectan el menu lateral. */
export const COLOR_OPTIONS: { id: Tone; label: string; swatch: string }[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
  { id: 'dark', label: 'Dark', swatch: '#181511' },
  { id: 'neutral', label: 'Neutral', swatch: '#FFFFFF' },
  { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
];

/** Fondo del menu + estado seleccionado + acento de topbar (campana / avatar). */
export const SIDEBAR_THEMES: Record<
  Tone,
  {
    bg: string;
    text: string;
    muted: string;
    activeBg: string;
    activeText: string;
    markBg: string;
    markText: string;
    footBg: string;
    footBorder: string;
    border: string;
    /** Color del punto de notificacion y avatar. */
    accent: string;
    accentSoft: string;
    accentText: string;
  }
> = {
  primary: {
    bg: '#9F2141',
    text: 'rgba(255, 255, 255, 0.82)',
    muted: 'rgba(255, 255, 255, 0.55)',
    activeBg: 'rgba(255, 255, 255, 0.18)',
    activeText: '#FFFFFF',
    markBg: 'rgba(255, 255, 255, 0.18)',
    markText: '#FFFFFF',
    footBg: 'rgba(255, 255, 255, 0.1)',
    footBorder: 'rgba(255, 255, 255, 0.14)',
    border: 'rgba(255, 255, 255, 0.12)',
    accent: '#9F2141',
    accentSoft: 'rgba(159, 33, 65, 0.12)',
    accentText: '#9F2141',
  },
  accent: {
    bg: '#F4EBE0',
    text: '#5C5348',
    muted: '#8A8278',
    activeBg: 'rgba(188, 148, 90, 0.28)',
    activeText: '#7A5A2E',
    markBg: '#BC945A',
    markText: '#FFFFFF',
    footBg: 'rgba(24, 21, 17, 0.05)',
    footBorder: 'rgba(24, 21, 17, 0.08)',
    border: 'rgba(24, 21, 17, 0.08)',
    accent: '#BC945A',
    accentSoft: 'rgba(188, 148, 90, 0.18)',
    accentText: '#8A6A35',
  },
  dark: {
    bg: '#181511',
    text: 'rgba(255, 255, 255, 0.78)',
    muted: 'rgba(255, 255, 255, 0.48)',
    activeBg: 'rgba(255, 255, 255, 0.12)',
    activeText: '#FFFFFF',
    markBg: '#9F2141',
    markText: '#FFFFFF',
    footBg: 'rgba(255, 255, 255, 0.06)',
    footBorder: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.1)',
    accent: '#181511',
    accentSoft: 'rgba(24, 21, 17, 0.1)',
    accentText: '#181511',
  },
  neutral: {
    bg: '#FFFFFF',
    text: '#6B665F',
    muted: '#9A9590',
    activeBg: 'rgba(159, 33, 65, 0.1)',
    activeText: '#9F2141',
    markBg: '#9F2141',
    markText: '#FFFFFF',
    footBg: '#F7F7F7',
    footBorder: '#EFEFEF',
    border: 'rgba(24, 21, 17, 0.1)',
    accent: '#9F2141',
    accentSoft: 'rgba(159, 33, 65, 0.12)',
    accentText: '#9F2141',
  },
  soft: {
    bg: '#E7D7BD',
    text: '#4A4033',
    muted: '#7A6F60',
    activeBg: 'rgba(159, 33, 65, 0.12)',
    activeText: '#9F2141',
    markBg: '#9F2141',
    markText: '#FFFFFF',
    footBg: 'rgba(24, 21, 17, 0.06)',
    footBorder: 'rgba(24, 21, 17, 0.08)',
    border: 'rgba(24, 21, 17, 0.1)',
    accent: '#9F2141',
    accentSoft: 'rgba(159, 33, 65, 0.14)',
    accentText: '#9F2141',
  },
};

export type ShellExampleId =
  | 'basico'
  | 'colapsado'
  | 'sin-topbar'
  | 'compacto'
  | 'tablero';

export type ShellExample = {
  id: ShellExampleId;
  title: string;
  description: string;
  collapsed?: boolean;
  dense?: boolean;
  hideTopbar?: boolean;
  stickyTopbar?: boolean;
  variant: 'simple' | 'board';
  tags: string[];
};

export const SHELL_ATTRS = [
  {
    name: 'collapsed',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Reduce el menu lateral a 72px para dar prioridad al contenido.',
  },
  {
    name: 'dense',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Baja padding del contenido y estrecha un poco el menu.',
  },
  {
    name: 'hide-topbar',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Oculta la barra superior. Util en asistentes o vistas enfocadas.',
  },
  {
    name: 'sticky-topbar',
    type: 'boolean',
    defaultValue: 'true',
    body: 'Fija la barra al hacer scroll. Usa sticky-topbar="false" para desactivar.',
  },
] as const;

export const SHELL_TOKENS = [
  {
    name: '--gob-shell-sidebar-bg',
    value: 'Surface',
    body: 'Fondo del menu lateral. Cambia con el color del sistema.',
  },
  {
    name: '--gob-shell-sidebar-width',
    value: '248px',
    body: 'Ancho del menu lateral expandido.',
  },
  {
    name: '--gob-shell-sidebar-collapsed-width',
    value: '72px',
    body: 'Ancho del menu con collapsed.',
  },
  {
    name: '--gob-shell-content-padding',
    value: '24px',
    body: 'Padding del area de contenido.',
  },
  {
    name: '--gob-shell-frame-height',
    value: '100vh',
    body: 'Alto del marco (sidebar y columna). En demos usa un valor fijo.',
  },
] as const;

export const SHELL_EXAMPLES: ShellExample[] = [
  {
    id: 'basico',
    title: 'Basico',
    description: 'Menu lateral + barra superior + contenido. Punto de partida de cualquier tablero.',
    variant: 'simple',
    tags: ['default', 'tablero'],
  },
  {
    id: 'colapsado',
    title: 'Menu colapsado',
    description: 'Mas espacio horizontal para tablas densas. Activa collapsed.',
    collapsed: true,
    variant: 'simple',
    tags: ['collapsed', 'tablas'],
  },
  {
    id: 'sin-topbar',
    title: 'Sin barra superior',
    description: 'Solo menu y contenido. Ideal para asistentes, login interno o foco total.',
    hideTopbar: true,
    variant: 'simple',
    tags: ['hide-topbar', 'asistente'],
  },
  {
    id: 'compacto',
    title: 'Densidad compacta',
    description: 'Menos padding y menu un poco mas estrecho. Activa dense.',
    dense: true,
    variant: 'simple',
    tags: ['dense', 'operativo'],
  },
  {
    id: 'tablero',
    title: 'Tablero con metricas',
    description: 'Composicion real: cabecera con usuario, KPIs y bloque de listado.',
    variant: 'board',
    tags: ['composicion', 'kpis'],
  },
];

export const SHELL_RULES = [
  {
    id: 'slots',
    index: '01',
    title: 'Respeta los slots',
    body: 'Usa sidebar, topbar y el slot por defecto. No envuelvas el shell con layouts paralelos.',
  },
  {
    id: 'nav',
    index: '02',
    title: 'Navegacion en el menu',
    body: 'El menu lateral concentra la navegacion primaria. Evita duplicar el mismo menu en el topbar.',
  },
  {
    id: 'collapsed',
    index: '03',
    title: 'Colapsa con proposito',
    body: 'collapsed es para tablas y paneles anchos, no un estado estetico permanente.',
  },
  {
    id: 'dense',
    index: '04',
    title: 'Compacto con cuidado',
    body: 'dense baja el aire del contenido. Combinalo con tipografia y espaciado del sistema.',
  },
  {
    id: 'tokens',
    index: '05',
    title: 'Personaliza con tokens',
    body: 'Ajusta anchos y padding con variables CSS. Mantén Canvas (#FAFAFA) y Surface (#FFF).',
  },
  {
    id: 'hide',
    index: '06',
    title: 'Oculta solo si aporta',
    body: 'hide-topbar sirve para flujos enfocados. En tableros operativos conserva la barra.',
  },
] as const;

function shellAttrs(example: ShellExample): string {
  const parts: string[] = [];
  if (example.collapsed) parts.push('collapsed');
  if (example.dense) parts.push('dense');
  if (example.hideTopbar) parts.push('hide-topbar');
  if (example.stickyTopbar === false) parts.push('sticky-topbar="false"');
  return parts.length ? ` ${parts.join(' ')}` : '';
}

function pad(indent: string, lines: string[]): string {
  return lines.map((line) => (line ? `${indent}${line}` : '')).join('\n');
}

function iconKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function icon(lang: CodeLang, name: string, size = 18): string {
  const kebab = iconKebab(name);
  if (lang === 'react') {
    return `<${name} weight="thin" size={${size}} aria-hidden="true" />`;
  }
  if (lang === 'vue') {
    return `<Ph${name} weight="thin" :size="${size}" aria-hidden="true" />`;
  }
  if (lang === 'angular') {
    return `<ph-${kebab} weight="thin" size="${size}" aria-hidden="true"></ph-${kebab}>`;
  }
  return `<i class="ph-thin ph-${kebab}" aria-hidden="true"></i>`;
}

function cls(lang: CodeLang, name: string): string {
  return lang === 'react' ? `className="${name}"` : `class="${name}"`;
}

function sidebarMarkup(lang: CodeLang, example: ShellExample, indent: string): string {
  const active = example.id === 'colapsado' ? 'Expedientes' : 'Inicio';
  const nav = [
    ['House', 'Inicio'],
    ['FolderOpen', 'Expedientes'],
    ['ChartBar', 'Reportes'],
    ['Buildings', 'Dependencias'],
    ['GearSix', 'Ajustes'],
  ] as const;

  const navItems = nav.flatMap(([name, label]) => {
    const activeClass = label === active ? ' nav-item--active' : '';
    if (example.collapsed) {
      return [
        `<a href="#" ${cls(lang, `nav-item${activeClass}`)} title="${label}">`,
        `  ${icon(lang, name)}`,
        `</a>`,
      ];
    }
    return [
      `<a href="#" ${cls(lang, `nav-item${activeClass}`)}>`,
      `  ${icon(lang, name)}`,
      `  <span>${label}</span>`,
      `</a>`,
    ];
  });

  const brand = example.collapsed
    ? [
        `<div ${cls(lang, 'brand')}>`,
        `  <span ${cls(lang, 'brand-mark')} aria-hidden="true">G</span>`,
        `  <!-- titulo oculto en collapsed -->`,
        `  <div ${cls(lang, 'brand-text')}></div>`,
        `</div>`,
      ]
    : [
        `<div ${cls(lang, 'brand')}>`,
        `  <span ${cls(lang, 'brand-mark')} aria-hidden="true">G</span>`,
        `  <div ${cls(lang, 'brand-text')}>`,
        `    <strong>Gob UI</strong>`,
        `    <small>Sistema institucional</small>`,
        `  </div>`,
        `</div>`,
      ];

  const foot = example.collapsed
    ? [
        `<div ${cls(lang, 'sidebar-foot')}>`,
        `  <button type="button" aria-label="Salir">`,
        `    ${icon(lang, 'SignOut')}`,
        `  </button>`,
        `  <!-- usuario vacio en collapsed -->`,
        `  <div ${cls(lang, 'sidebar-user')}></div>`,
        `</div>`,
      ]
    : [
        `<div ${cls(lang, 'sidebar-foot')}>`,
        `  <div ${cls(lang, 'sidebar-user')}>`,
        `    ${icon(lang, 'UserCircle')}`,
        `    <div>`,
        `      <strong>MG Sandoval</strong>`,
        `      <small>Operaciones</small>`,
        `    </div>`,
        `  </div>`,
        `</div>`,
      ];

  return pad(indent, [
    `<aside slot="sidebar" ${cls(lang, example.collapsed ? 'sidebar sidebar--collapsed' : 'sidebar')}>`,
    ...brand.map((l) => `  ${l}`),
    `  <nav ${cls(lang, 'nav')} aria-label="Principal">`,
    ...navItems.map((l) => `    ${l}`),
    `  </nav>`,
    ...foot.map((l) => `  ${l}`),
    `</aside>`,
  ]);
}

function topbarMarkup(
  lang: CodeLang,
  example: ShellExample,
  indent: string,
): string {
  if (example.hideTopbar) {
    return pad(indent, [
      `<header slot="topbar" ${cls(lang, 'topbar')}>`,
      `  <!-- sin contenido: hide-topbar -->`,
      `  <div ${cls(lang, 'topbar-left')}></div>`,
      `  <div ${cls(lang, 'topbar-right')}></div>`,
      `</header>`,
    ]);
  }

  const title =
    example.id === 'tablero'
      ? 'Tablero institucional'
      : example.id === 'colapsado'
        ? 'Expedientes'
        : example.id === 'compacto'
          ? 'Cola operativa'
          : 'Inicio';
  const meta =
    example.id === 'tablero'
      ? 'Hoy · 30 jul 2026'
      : example.id === 'compacto'
        ? 'Turno matutino'
        : 'Direccion de Operaciones';

  return pad(indent, [
    `<header slot="topbar" ${cls(lang, 'topbar')}>`,
    `  <div ${cls(lang, 'topbar-left')}>`,
    `    <strong>${title}</strong>`,
    `    <small>${meta}</small>`,
    `  </div>`,
    `  <div ${cls(lang, 'topbar-right')}>`,
    `    <label ${cls(lang, 'search')}>`,
    `      ${icon(lang, 'MagnifyingGlass', 16)}`,
    `      <span>Buscar expediente</span>`,
    `    </label>`,
    `    <button type="button" ${cls(lang, 'icon-btn')} aria-label="Notificaciones">`,
    `      ${icon(lang, 'Bell')}`,
    `    </button>`,
    `    <span ${cls(lang, 'user-chip')}>MG</span>`,
    `  </div>`,
    `</header>`,
  ]);
}

function contentMarkup(lang: CodeLang, example: ShellExample, indent: string): string {
  if (example.id === 'sin-topbar') {
    return pad(indent, [
      `<section ${cls(lang, 'content')}>`,
      `  <div ${cls(lang, 'content-head')}>`,
      `    <div ${cls(lang, 'steps')}>`,
      `      <span ${cls(lang, 'step step--active')}>1. Datos</span>`,
      `      <span ${cls(lang, 'step')}>2. Documentos</span>`,
      `      <span ${cls(lang, 'step')}>3. Revision</span>`,
      `    </div>`,
      `  </div>`,
      `  <div ${cls(lang, 'form')}>`,
      `    <label>`,
      `      <span>Nombre completo</span>`,
      `      <div>Maria Guadalupe Sandoval</div>`,
      `    </label>`,
      `    <label>`,
      `      <span>CURP</span>`,
      `      <div>SAGM900101MDFNRR09</div>`,
      `    </label>`,
      `    <label ${cls(lang, 'form-wide')}>`,
      `      <span>Motivo de la solicitud</span>`,
      `      <div>Actualizacion de domicilio fiscal para el ejercicio vigente.</div>`,
      `    </label>`,
      `  </div>`,
      `  <div ${cls(lang, 'content-actions')}>`,
      `    <button type="button">Cancelar</button>`,
      `    <button type="button">Continuar</button>`,
      `  </div>`,
      `</section>`,
    ]);
  }

  if (example.id === 'colapsado') {
    return pad(indent, [
      `<section ${cls(lang, 'content')}>`,
      `  <div ${cls(lang, 'content-head')}>`,
      `    <div>`,
      `      <h1>Expedientes</h1>`,
      `      <p>Vista ancha con menu colapsado.</p>`,
      `    </div>`,
      `    <span ${cls(lang, 'meta-chip')}>248 registros</span>`,
      `  </div>`,
      `  <div ${cls(lang, 'table')}>`,
      `    <div ${cls(lang, 'table-head')}>`,
      `      <span>Folio</span>`,
      `      <span>Solicitante</span>`,
      `      <span>Dependencia</span>`,
      `      <span>Estado</span>`,
      `    </div>`,
      `    <div ${cls(lang, 'table-body')}>`,
      `      <div ${cls(lang, 'table-row')}>`,
      `        <strong>EXP-2041</strong>`,
      `        <span>Ana Ruiz</span>`,
      `        <span>Salud</span>`,
      `        <em ${cls(lang, 'status')}>En revision</em>`,
      `      </div>`,
      `      <div ${cls(lang, 'table-row')}>`,
      `        <strong>EXP-2040</strong>`,
      `        <span>Luis Mora</span>`,
      `        <span>Educacion</span>`,
      `        <em ${cls(lang, 'status')}>Abierto</em>`,
      `      </div>`,
      `      <div ${cls(lang, 'table-row')}>`,
      `        <strong>EXP-2039</strong>`,
      `        <span>Diana Paz</span>`,
      `        <span>Finanzas</span>`,
      `        <em ${cls(lang, 'status')}>Abierto</em>`,
      `      </div>`,
      `      <div ${cls(lang, 'table-row')}>`,
      `        <strong>EXP-2038</strong>`,
      `        <span>Hector Sol</span>`,
      `        <span>Obras</span>`,
      `        <em ${cls(lang, 'status')}>Cerrado</em>`,
      `      </div>`,
      `    </div>`,
      `  </div>`,
      `</section>`,
    ]);
  }

  if (example.id === 'compacto') {
    return pad(indent, [
      `<section ${cls(lang, 'content content--dense')}>`,
      `  <div ${cls(lang, 'content-head')}>`,
      `    <div>`,
      `      <h1>Cola operativa</h1>`,
      `      <p>Densidad compacta para revision rapida.</p>`,
      `    </div>`,
      `    <!-- acciones opcionales vacias -->`,
      `    <div ${cls(lang, 'content-head-actions')}></div>`,
      `  </div>`,
      `  <div ${cls(lang, 'dense-list')}>`,
      `    <div ${cls(lang, 'dense-row')}>`,
      `      <time>08:14</time>`,
      `      <strong>EXP-2041</strong>`,
      `      <span>Validar documentos</span>`,
      `      <em>Alta</em>`,
      `    </div>`,
      `    <div ${cls(lang, 'dense-row')}>`,
      `      <time>08:22</time>`,
      `      <strong>EXP-2040</strong>`,
      `      <span>Asignar revisor</span>`,
      `      <em>Media</em>`,
      `    </div>`,
      `    <div ${cls(lang, 'dense-row')}>`,
      `      <time>08:31</time>`,
      `      <strong>EXP-2039</strong>`,
      `      <span>Notificar ciudadano</span>`,
      `      <em>Alta</em>`,
      `    </div>`,
      `    <div ${cls(lang, 'dense-row')}>`,
      `      <time>08:45</time>`,
      `      <strong>EXP-2037</strong>`,
      `      <span>Cerrar expediente</span>`,
      `      <em>Baja</em>`,
      `    </div>`,
      `    <div ${cls(lang, 'dense-row')}>`,
      `      <time>09:02</time>`,
      `      <strong>EXP-2035</strong>`,
      `      <span>Generar oficio</span>`,
      `      <em>Media</em>`,
      `    </div>`,
      `  </div>`,
      `</section>`,
    ]);
  }

  if (example.id === 'tablero') {
    return pad(indent, [
      `<section ${cls(lang, 'content')}>`,
      `  <div ${cls(lang, 'content-head')}>`,
      `    <div>`,
      `      <h1>Resumen operativo</h1>`,
      `      <p>Indicadores del periodo actual.</p>`,
      `    </div>`,
      `    <span ${cls(lang, 'meta-chip')}>Ultimos 30 dias</span>`,
      `  </div>`,
      `  <div ${cls(lang, 'kpi-row')}>`,
      `    <article ${cls(lang, 'kpi')}>`,
      `      <span>Abiertos</span>`,
      `      <strong>128</strong>`,
      `      <small>+12 esta semana</small>`,
      `    </article>`,
      `    <article ${cls(lang, 'kpi')}>`,
      `      <span>En revision</span>`,
      `      <strong>46</strong>`,
      `      <small>8 urgentes</small>`,
      `    </article>`,
      `    <article ${cls(lang, 'kpi')}>`,
      `      <span>Cerrados</span>`,
      `      <strong>312</strong>`,
      `      <small>94% a tiempo</small>`,
      `    </article>`,
      `  </div>`,
      `  <div ${cls(lang, 'list')}>`,
      `    <div ${cls(lang, 'list-row')}>`,
      `      <div>`,
      `        <strong>EXP-2041</strong>`,
      `        <span>Constancia · Salud</span>`,
      `      </div>`,
      `      <em ${cls(lang, 'status')}>En revision</em>`,
      `    </div>`,
      `    <div ${cls(lang, 'list-row')}>`,
      `      <div>`,
      `        <strong>EXP-2040</strong>`,
      `        <span>Actualizacion · Educacion</span>`,
      `      </div>`,
      `      <em ${cls(lang, 'status')}>Abierto</em>`,
      `    </div>`,
      `    <div ${cls(lang, 'list-row')}>`,
      `      <div>`,
      `        <strong>EXP-2038</strong>`,
      `        <span>Baja · Obras</span>`,
      `      </div>`,
      `      <em ${cls(lang, 'status')}>Cerrado</em>`,
      `    </div>`,
      `  </div>`,
      `</section>`,
    ]);
  }

  // basico — misma estructura completa del preview
  return pad(indent, [
    `<section ${cls(lang, 'content')}>`,
    `  <div ${cls(lang, 'content-head')}>`,
    `    <div>`,
    `      <h1>Bienvenida operativa</h1>`,
    `      <p>Resumen del dia y accesos frecuentes.</p>`,
    `    </div>`,
    `    <button type="button">Nuevo expediente</button>`,
    `  </div>`,
    `  <div ${cls(lang, 'content-grid')}>`,
    `    <div ${cls(lang, 'list')}>`,
    `      <div ${cls(lang, 'list-row')}>`,
    `        <div>`,
    `          <strong>EXP-2041</strong>`,
    `          <span>Solicitud de constancia</span>`,
    `        </div>`,
    `        <em ${cls(lang, 'status')}>En revision</em>`,
    `      </div>`,
    `      <div ${cls(lang, 'list-row')}>`,
    `        <div>`,
    `          <strong>EXP-2040</strong>`,
    `          <span>Actualizacion de datos</span>`,
    `        </div>`,
    `        <em ${cls(lang, 'status')}>Abierto</em>`,
    `      </div>`,
    `      <div ${cls(lang, 'list-row')}>`,
    `        <div>`,
    `          <strong>EXP-2038</strong>`,
    `          <span>Baja de servicio</span>`,
    `        </div>`,
    `        <em ${cls(lang, 'status')}>Cerrado</em>`,
    `      </div>`,
    `    </div>`,
    `    <aside ${cls(lang, 'stat')}>`,
    `      <span>Pendientes</span>`,
    `      <strong>12</strong>`,
    `      <p>Requieren respuesta hoy.</p>`,
    `    </aside>`,
    `  </div>`,
    `</section>`,
  ]);
}

function bodyMarkup(lang: CodeLang, example: ShellExample, indent = '  '): string {
  return [
    sidebarMarkup(lang, example, indent),
    topbarMarkup(lang, example, indent),
    contentMarkup(lang, example, indent),
  ].join('\n');
}

function iconImports(lang: CodeLang): string {
  if (lang === 'html') {
    return `<!-- Phosphor thin para iconos del menu y topbar -->
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css"
/>

`;
  }
  if (lang === 'react') {
    return `import {
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
import '@mariasan001/ui-wc';

`;
  }
  if (lang === 'vue') {
    return `import {
  PhBell,
  PhBuildings,
  PhChartBar,
  PhFolderOpen,
  PhGearSix,
  PhHouse,
  PhMagnifyingGlass,
  PhSignOut,
  PhUserCircle,
} from '@phosphor-icons/vue';
import '@mariasan001/ui-wc';

`;
  }
  return `import '@phosphor-icons/webcomponents/PhBell';
import '@phosphor-icons/webcomponents/PhBuildings';
import '@phosphor-icons/webcomponents/PhChartBar';
import '@phosphor-icons/webcomponents/PhFolderOpen';
import '@phosphor-icons/webcomponents/PhGearSix';
import '@phosphor-icons/webcomponents/PhHouse';
import '@phosphor-icons/webcomponents/PhMagnifyingGlass';
import '@phosphor-icons/webcomponents/PhSignOut';
import '@phosphor-icons/webcomponents/PhUserCircle';
import '@mariasan001/ui-wc';

`;
}

function shellStyle(lang: CodeLang, tone: Tone): string {
  const theme = SIDEBAR_THEMES[tone];
  const css = `--gob-shell-sidebar-bg: ${theme.bg}; --gob-shell-sidebar-border: ${theme.border}; --shell-side-active-bg: ${theme.activeBg}; --shell-side-active-text: ${theme.activeText}`;
  if (lang === 'react') {
    return ` style={{ ['--gob-shell-sidebar-bg' as string]: '${theme.bg}', ['--gob-shell-sidebar-border' as string]: '${theme.border}', ['--shell-side-active-bg' as string]: '${theme.activeBg}', ['--shell-side-active-text' as string]: '${theme.activeText}' }}`;
  }
  return ` style="${css}"`;
}

export function buildSnippet(
  lang: CodeLang,
  example: ShellExample,
  tone: Tone = 'primary',
): string {
  const attrs = shellAttrs(example);
  const style = shellStyle(lang, tone);

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<!-- Color del menu: ${tone} -->
<script type="module">
  import '@mariasan001/ui-wc';
</script>
${iconImports(lang)}<gob-app-shell${attrs}${style}>
${bodyMarkup(lang, example)}
</gob-app-shell>`;
  }

  if (lang === 'react') {
    return `// Interaccion en React; gob-app-shell solo organiza sidebar/topbar/content.
import { useState } from 'react';
import '@mariasan001/ui-wc';

export function ShellDemo() {
  const [active, setActive] = useState('Inicio');
  const [query, setQuery] = useState('');

  return (
    <gob-app-shell${attrs}${style}>
${bodyMarkup(lang, example, '      ')}
      {/* Cables: nav onClick -> setActive, input value={query}, Campana/Nuevo/Salir */}
    </gob-app-shell>
  );
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
${iconImports(lang).trimEnd()}
</script>

<template>
  <gob-app-shell${attrs}${style}>
${bodyMarkup(lang, example, '    ')}
  </gob-app-shell>
</template>`;
  }

  return `// app.component.ts
${iconImports(lang)}// app.component.html — color menu: ${tone}
<gob-app-shell${attrs}${style}>
${bodyMarkup(lang, example)}
</gob-app-shell>`;
}
