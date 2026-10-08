import type { SidebarVariant, Tone } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export const COLOR_OPTIONS: { id: Tone; label: string; swatch: string }[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
  { id: 'dark', label: 'Dark', swatch: '#181511' },
  { id: 'neutral', label: 'Neutral', swatch: '#FFFFFF' },
  { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
];

export type MenuExample = {
  id: SidebarVariant;
  title: string;
  description: string;
  variant: SidebarVariant;
};

export const MENU_EXAMPLES: MenuExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Icono + etiqueta. Usa el botón para colapsar o expandir.',
    variant: 'basic',
  },
  {
    id: 'collapsed',
    title: 'Colapsado',
    description: 'Carril de iconos con botón para expandir. Ideal junto a tablas.',
    variant: 'collapsed',
  },
  {
    id: 'brand',
    title: 'Con marca',
    description: 'Bloque de marca más presente arriba del menú.',
    variant: 'brand',
  },
  {
    id: 'grouped',
    title: 'Con grupos',
    description: 'Secciones etiquetadas para menus largos.',
    variant: 'grouped',
  },
  {
    id: 'user',
    title: 'Con usuario',
    description: 'Pie con nombre y area. Ideal en tableros operativos.',
    variant: 'user',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Menos aire y ancho reducido para vistas densas.',
    variant: 'dense',
  },
  {
    id: 'badges',
    title: 'Con indicadores',
    description: 'Contadores en items para pendientes o alertas.',
    variant: 'badges',
  },
];

export const MENU_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | collapsed | brand | grouped | user | dense | badges',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'primary | accent | dark | neutral | soft',
  },
  {
    name: 'collapsed',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Activa el carril compacto de iconos. Combinalo con un botón para alternar.',
  },
] as const;

function icon(lang: CodeLang, name: string): string {
  const kebab = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  if (lang === 'react') return `<${name} weight="thin" size={18} aria-hidden="true" />`;
  if (lang === 'vue') return `<Ph${name} weight="thin" :size="18" aria-hidden="true" />`;
  if (lang === 'angular') {
    return `<ph-${kebab} weight="thin" size="18" aria-hidden="true"></ph-${kebab}>`;
  }
  return `<i class="ph-thin ph-${kebab}" aria-hidden="true"></i>`;
}

function bodyFor(lang: CodeLang, example: MenuExample): string {
  const i = '  ';
  const collapsed = example.variant === 'collapsed';
  const brand = collapsed
    ? `${i}<div slot="brand" class="brand">
${i}  <span class="mark">G</span>
${i}  <button type="button" aria-label="Expandir menú">${icon(lang, 'CaretDoubleRight')}</button>
${i}</div>`
    : `${i}<div slot="brand" class="brand">
${i}  <span class="mark">G</span>
${i}  <div>
${i}    <strong>Gob UI</strong>
${i}    <small>Sistema institucional</small>
${i}  </div>
${i}  <button type="button" aria-label="Colapsar menú">${icon(lang, 'CaretDoubleLeft')}</button>
${i}</div>`;

  const navBasic = `${i}<a href="#" class="nav-item is-active" data-active="true">
${i}  ${icon(lang, 'House')}
${i}  <span>Inicio</span>
${i}</a>
${i}<a href="#" class="nav-item">
${i}  ${icon(lang, 'FolderOpen')}
${i}  <span>Expedientes</span>
${i}</a>
${i}<a href="#" class="nav-item">
${i}  ${icon(lang, 'ChartBar')}
${i}  <span>Reportes</span>
${i}</a>
${i}<a href="#" class="nav-item">
${i}  ${icon(lang, 'GearSix')}
${i}  <span>Ajustes</span>
${i}</a>`;

  const navCollapsed = `${i}<a href="#" class="nav-item is-active" data-active="true" title="Inicio">
${i}  ${icon(lang, 'House')}
${i}</a>
${i}<a href="#" class="nav-item" title="Expedientes">
${i}  ${icon(lang, 'FolderOpen')}
${i}</a>
${i}<a href="#" class="nav-item" title="Reportes">
${i}  ${icon(lang, 'ChartBar')}
${i}</a>
${i}<a href="#" class="nav-item" title="Ajustes">
${i}  ${icon(lang, 'GearSix')}
${i}</a>`;

  const navGrouped = `${i}<p class="nav-group">Operacion</p>
${i}<a href="#" class="nav-item is-active" data-active="true">
${i}  ${icon(lang, 'House')}
${i}  <span>Inicio</span>
${i}</a>
${i}<a href="#" class="nav-item">
${i}  ${icon(lang, 'FolderOpen')}
${i}  <span>Expedientes</span>
${i}</a>
${i}<p class="nav-group">Sistema</p>
${i}<a href="#" class="nav-item">
${i}  ${icon(lang, 'Buildings')}
${i}  <span>Dependencias</span>
${i}</a>
${i}<a href="#" class="nav-item">
${i}  ${icon(lang, 'GearSix')}
${i}  <span>Ajustes</span>
${i}</a>`;

  const navBadges = `${i}<a href="#" class="nav-item is-active" data-active="true">
${i}  ${icon(lang, 'House')}
${i}  <span>Inicio</span>
${i}</a>
${i}<a href="#" class="nav-item">
${i}  ${icon(lang, 'FolderOpen')}
${i}  <span>Expedientes</span>
${i}  <em class="badge">12</em>
${i}</a>
${i}<a href="#" class="nav-item">
${i}  ${icon(lang, 'ChartBar')}
${i}  <span>Reportes</span>
${i}  <em class="badge">3</em>
${i}</a>
${i}<a href="#" class="nav-item">
${i}  ${icon(lang, 'GearSix')}
${i}  <span>Ajustes</span>
${i}</a>`;

  let nav = navBasic;
  if (example.variant === 'collapsed') nav = navCollapsed;
  if (example.variant === 'grouped') nav = navGrouped;
  if (example.variant === 'badges') nav = navBadges;

  const footer =
    example.variant === 'user' || example.variant === 'basic' || example.variant === 'dense'
      ? `${i}<div slot="footer" class="foot">
${i}  ${icon(lang, 'UserCircle')}
${i}  <div>
${i}    <strong>MG Sandoval</strong>
${i}    <small>Operaciones</small>
${i}  </div>
${i}</div>`
      : example.variant === 'collapsed'
        ? `${i}<div slot="footer" class="foot foot--icon">
${i}  ${icon(lang, 'SignOut')}
${i}</div>`
        : example.variant === 'brand' || example.variant === 'grouped' || example.variant === 'badges'
          ? `${i}<div slot="footer" class="foot">
${i}  ${icon(lang, 'UserCircle')}
${i}  <div>
${i}    <strong>MG Sandoval</strong>
${i}    <small>Operaciones</small>
${i}  </div>
${i}</div>`
          : `${i}<div slot="footer"></div>`;

  return `${brand}
${nav}
${footer}`;
}

function iconImports(lang: CodeLang): string {
  if (lang === 'html') {
    return `<!-- Phosphor thin -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css" />

`;
  }
  if (lang === 'react') {
    return `import {
  Buildings,
  CaretDoubleLeft,
  CaretDoubleRight,
  ChartBar,
  FolderOpen,
  GearSix,
  House,
  SignOut,
  UserCircle,
} from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

`;
  }
  if (lang === 'vue') {
    return `import {
  PhBuildings,
  PhCaretDoubleLeft,
  PhCaretDoubleRight,
  PhChartBar,
  PhFolderOpen,
  PhGearSix,
  PhHouse,
  PhSignOut,
  PhUserCircle,
} from '@phosphor-icons/vue';
import '@mariasan001/ui-wc';

`;
  }
  return `import '@mariasan001/ui-wc';

`;
}

export function buildSnippet(
  lang: CodeLang,
  example: MenuExample,
  tone: Tone,
): string {
  const variant = example.variant === 'collapsed' ? 'basic' : example.variant;
  const collapsedAttr = example.variant === 'collapsed' ? ' collapsed' : '';
  const attrs = ` variant="${variant}" tone="${tone}"${collapsedAttr}`;
  const body = bodyFor(lang, example);

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<script type="module">import '@mariasan001/ui-wc';</script>
${iconImports(lang)}<gob-sidebar${attrs}>
${body}
</gob-sidebar>`;
  }

  if (lang === 'react') {
    const indented = body
      .split('\n')
      .map((line) => (line ? `      ${line}` : ''))
      .join('\n');
    return `${iconImports(lang)}export function MenuLateral() {
  return (
    <gob-sidebar${attrs}>
${indented}
    </gob-sidebar>
  );
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
${iconImports(lang).trimEnd()}
</script>

<template>
  <gob-sidebar${attrs}>
${body}
  </gob-sidebar>
</template>`;
  }

  return `// app.component.html
${iconImports(lang)}<gob-sidebar${attrs}>
${body}
</gob-sidebar>`;
}
