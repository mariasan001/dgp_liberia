import type { PageHeaderSurface, PageHeaderVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export const SURFACE_OPTIONS: { id: PageHeaderSurface; label: string }[] = [
  { id: 'plain', label: 'Sin fondo' },
  { id: 'panel', label: 'Con fondo' },
];

export type HeaderExample = {
  id: PageHeaderVariant;
  title: string;
  description: string;
  variant: PageHeaderVariant;
};

export const HEADER_EXAMPLES: HeaderExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Solo el titulo de la vista. Punto de partida limpio.',
    variant: 'basic',
  },
  {
    id: 'description',
    title: 'Con descripcion',
    description: 'Titulo y texto de apoyo para contextualizar la pantalla.',
    variant: 'description',
  },
  {
    id: 'breadcrumb',
    title: 'Con migas',
    description: 'Ruta jerarquica encima del titulo para orientarse.',
    variant: 'breadcrumb',
  },
  {
    id: 'actions',
    title: 'Con acciones',
    description: 'Botones primarios a la derecha para flujos frecuentes.',
    variant: 'actions',
  },
  {
    id: 'status',
    title: 'Con estado',
    description: 'Chip de estado junto al titulo para lectura rapida.',
    variant: 'status',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Menor altura tipografica para tableros densos.',
    variant: 'dense',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Migas, titulo, estado, descripcion y acciones juntos.',
    variant: 'complete',
  },
];

export const HEADER_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | description | breadcrumb | actions | status | dense | complete',
  },
  {
    name: 'surface',
    type: 'string',
    defaultValue: 'plain',
    body: 'plain (sin fondo) | panel (con fondo y degradado)',
  },
] as const;

function bodyFor(example: HeaderExample): string {
  const i = '  ';
  const parts: string[] = [];

  const showCrumb =
    example.variant === 'breadcrumb' || example.variant === 'complete';
  const showDesc =
    example.variant === 'description' ||
    example.variant === 'complete' ||
    example.variant === 'dense';
  const showStatus =
    example.variant === 'status' || example.variant === 'complete';
  const showActions =
    example.variant === 'actions' || example.variant === 'complete';

  if (showCrumb) {
    parts.push(`${i}<nav slot="breadcrumb" class="crumbs" aria-label="Migas">
${i}  <a href="#">Inicio</a>
${i}  <span>/</span>
${i}  <a href="#">Expedientes</a>
${i}  <span>/</span>
${i}  <strong>Detalle</strong>
${i}</nav>`);
  }

  parts.push(
    `${i}<h1 slot="title">${example.variant === 'dense' ? 'Cola operativa' : 'Expedientes'}</h1>`,
  );

  if (showStatus) {
    parts.push(`${i}<span slot="meta" class="status">En revision</span>`);
  }

  if (showDesc) {
    parts.push(
      `${i}<p slot="description">${
        example.variant === 'dense'
          ? 'Turno matutino · 24 pendientes'
          : 'Consulta y da seguimiento a los expedientes abiertos de la direccion.'
      }</p>`,
    );
  }

  if (showActions) {
    parts.push(`${i}<button type="button" class="btn-ghost">Exportar</button>`);
    parts.push(`${i}<button type="button" class="btn-primary">Nuevo</button>`);
  }

  return parts.join('\n');
}

function iconImports(lang: CodeLang): string {
  if (lang === 'html') return '';
  if (lang === 'react') {
    return `import '@mariasan001/ui-wc';

`;
  }
  if (lang === 'vue') {
    return `import '@mariasan001/ui-wc';

`;
  }
  return `import '@mariasan001/ui-wc';

`;
}

export function buildSnippet(
  lang: CodeLang,
  example: HeaderExample,
  surface: PageHeaderSurface,
): string {
  const attrs = ` variant="${example.variant}" surface="${surface}"`;
  const body = bodyFor(example);
  const showActions =
    example.variant === 'actions' || example.variant === 'complete';
  const showStatus =
    example.variant === 'status' || example.variant === 'complete';
  const showCrumb =
    example.variant === 'breadcrumb' || example.variant === 'complete';

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<!-- gob-page-header es el cascaron; acciones/migas las cables tu. -->
<script type="module">import '@mariasan001/ui-wc';</script>

<gob-page-header${attrs}>
${body}
</gob-page-header>`;
  }

  if (lang === 'react') {
    return `// Interaccion en React; gob-page-header solo aporta layout/slots.
import { useState } from 'react';
import '@mariasan001/ui-wc';

export function EncabezadoPagina() {
  const [status, setStatus] = useState('En revision');
  const [flash, setFlash] = useState('');

  return (
    <gob-page-header${attrs}>
${showCrumb ? `      <nav slot="breadcrumb" aria-label="Migas">
        <button type="button" onClick={() => setFlash('Inicio')}>Inicio</button>
        <span>/</span>
        <button type="button" onClick={() => setFlash('Expedientes')}>Expedientes</button>
        <span>/</span>
        <strong>Detalle</strong>
      </nav>` : ''}
      <h1 slot="title">Expedientes</h1>
${showStatus ? `      <button type="button" slot="meta" onClick={() => setStatus((s) => (s === 'En revision' ? 'Aprobado' : 'En revision'))}>
        {status}
      </button>` : ''}
      <p slot="description">{flash || 'Consulta y da seguimiento a los expedientes abiertos.'}</p>
${showActions ? `      <button type="button" onClick={() => setFlash('Listado exportado')}>Exportar</button>
      <button type="button" onClick={() => setFlash('Alta de expediente')}>Nuevo</button>` : ''}
    </gob-page-header>
  );
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
import { ref } from 'vue';
import '@mariasan001/ui-wc';
const flash = ref('');
</script>

<template>
  <gob-page-header${attrs}>
${body}
  </gob-page-header>
</template>`;
  }

  return `// app.component.html
import '@mariasan001/ui-wc';

<gob-page-header${attrs}>
${body}
</gob-page-header>`;
}
