import type { Tone, TopbarVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export const COLOR_OPTIONS: { id: Tone; label: string; swatch: string }[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
  { id: 'dark', label: 'Dark', swatch: '#181511' },
  { id: 'neutral', label: 'Neutral', swatch: '#EBEBEB' },
  { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
];

export type TopbarExample = {
  id: TopbarVariant;
  title: string;
  description: string;
  variant: TopbarVariant;
};

export const TOPBAR_EXAMPLES: TopbarExample[] = [
  {
    id: 'basic',
    title: 'Basica',
    description: 'Titulo de vista y avatar. Punto de partida limpio.',
    variant: 'basic',
  },
  {
    id: 'search',
    title: 'Con busqueda',
    description: 'Campo central para encontrar expedientes o usuarios.',
    variant: 'search',
  },
  {
    id: 'actions',
    title: 'Con acciones',
    description: 'Botones primarios a la derecha para flujos frecuentes.',
    variant: 'actions',
  },
  {
    id: 'notifications',
    title: 'Con notificaciones',
    description: 'Campana con indicador y acceso al perfil.',
    variant: 'notifications',
  },
  {
    id: 'breadcrumb',
    title: 'Con migas',
    description: 'Ruta de navegacion para ubicar la vista actual.',
    variant: 'breadcrumb',
  },
  {
    id: 'dense',
    title: 'Compacta',
    description: 'Menor altura para tableros densos u operativos.',
    variant: 'dense',
  },
  {
    id: 'complete',
    title: 'Completa',
    description: 'Titulo, busqueda, acciones, campana y avatar juntos.',
    variant: 'complete',
  },
];

export const TOPBAR_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | search | actions | notifications | breadcrumb | dense | complete',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'Acento de avatar, campana y botones: primary | accent | dark | neutral | soft',
  },
  {
    name: 'sticky',
    type: 'boolean',
    defaultValue: 'true',
    body: 'Fija la barra al hacer scroll. Usa sticky="false" para desactivar.',
  },
] as const;

function icon(lang: CodeLang, name: string, size = 16): string {
  const kebab = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  if (lang === 'react') return `<${name} weight="thin" size={${size}} aria-hidden="true" />`;
  if (lang === 'vue') return `<Ph${name} weight="thin" :size="${size}" aria-hidden="true" />`;
  if (lang === 'angular') {
    return `<ph-${kebab} weight="thin" size="${size}" aria-hidden="true"></ph-${kebab}>`;
  }
  return `<i class="ph-thin ph-${kebab}" aria-hidden="true"></i>`;
}

function bodyFor(lang: CodeLang, example: TopbarExample): string {
  const i = '  ';
  const start =
    example.variant === 'breadcrumb'
      ? `${i}<div slot="start" class="start">
${i}  <nav class="crumbs" aria-label="Migas">
${i}    <a href="#">Inicio</a>
${i}    <span>/</span>
${i}    <a href="#">Expedientes</a>
${i}    <span>/</span>
${i}    <strong>Detalle</strong>
${i}  </nav>
${i}</div>`
      : `${i}<div slot="start" class="start">
${i}  <div>
${i}    <strong>Inicio</strong>
${i}    <small>Direccion de Operaciones</small>
${i}  </div>
${i}</div>`;

  const showSearch = example.variant === 'search' || example.variant === 'complete';
  const center = showSearch
    ? `${i}<label slot="center" class="search">
${i}  ${icon(lang, 'MagnifyingGlass')}
${i}  <input placeholder="Buscar expediente" />
${i}</label>`
    : `${i}<div slot="center"></div>`;

  const parts: string[] = [];
  if (example.variant === 'actions' || example.variant === 'complete') {
    parts.push(`${i}<button type="button" class="btn-ghost">Exportar</button>`);
    parts.push(`${i}<button type="button" class="btn-primary">Nuevo</button>`);
  }
  if (
    example.variant === 'notifications' ||
    example.variant === 'complete' ||
    example.variant === 'search' ||
    example.variant === 'dense' ||
    example.variant === 'basic' ||
    example.variant === 'breadcrumb'
  ) {
    parts.push(`${i}<button type="button" class="icon-btn" aria-label="Notificaciones">
${i}  ${icon(lang, 'Bell', 18)}
${i}  <i class="dot"></i>
${i}</button>`);
  }
  parts.push(`${i}<span class="avatar">MG</span>`);

  return `${start}
${center}
${parts.join('\n')}`;
}

function iconImports(lang: CodeLang): string {
  if (lang === 'html') {
    return `<!-- Phosphor thin -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/thin/style.css" />

`;
  }
  if (lang === 'react') {
    return `import { Bell, MagnifyingGlass } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

`;
  }
  if (lang === 'vue') {
    return `import { PhBell, PhMagnifyingGlass } from '@phosphor-icons/vue';
import '@mariasan001/ui-wc';

`;
  }
  return `import '@mariasan001/ui-wc';

`;
}

export function buildSnippet(
  lang: CodeLang,
  example: TopbarExample,
  tone: Tone,
): string {
  const attrs = ` variant="${example.variant}" tone="${tone}"`;
  const body = bodyFor(lang, example);
  const showSearch = example.variant === 'search' || example.variant === 'complete';
  const showActions =
    example.variant === 'actions' || example.variant === 'complete';

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<!-- gob-topbar organiza layout; la interaccion la cables tu. -->
<script type="module">import '@mariasan001/ui-wc';</script>
${iconImports(lang)}<gob-topbar${attrs}>
${body}
</gob-topbar>`;
  }

  if (lang === 'react') {
    return `// Interaccion en React; gob-topbar solo organiza slots.
import { useState } from 'react';
import { Bell, MagnifyingGlass } from '@phosphor-icons/react';
import '@mariasan001/ui-wc';

export function BarraSuperior() {
  const [query, setQuery] = useState('');
  const [unread, setUnread] = useState(3);

  return (
    <gob-topbar${attrs}>
      <div slot="start">
        <strong>Inicio</strong>
        <small>Direccion de Operaciones</small>
      </div>
${showSearch ? `      <label slot="center" className="search">
        <MagnifyingGlass weight="thin" size={16} />
        <input
          value={query}
          placeholder="Buscar expediente"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') console.log('Buscar', query);
          }}
        />
      </label>` : `      <div slot="center" />`}
${showActions ? `      <button type="button" onClick={() => console.log('Exportar')}>Exportar</button>
      <button type="button" onClick={() => console.log('Nuevo')}>Nuevo</button>` : ''}
      <button type="button" aria-label="Notificaciones" onClick={() => setUnread(0)}>
        <Bell weight="thin" size={18} />
        {unread > 0 ? <i className="dot" /> : null}
      </button>
      <button type="button" onClick={() => console.log('Perfil')}>MG</button>
    </gob-topbar>
  );
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
import { ref } from 'vue';
${iconImports(lang).trimEnd()}
const query = ref('');
const unread = ref(3);
</script>

<template>
  <gob-topbar${attrs}>
${body}
  </gob-topbar>
</template>`;
  }

  return `// app.component.html — cables busqueda/acciones en el .ts
${iconImports(lang)}<gob-topbar${attrs}>
${body}
</gob-topbar>`;
}
