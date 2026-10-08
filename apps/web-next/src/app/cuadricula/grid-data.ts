import type { GridGap, GridVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export const GAP_OPTIONS: { id: GridGap; label: string }[] = [
  { id: 'sm', label: 'Compacto' },
  { id: 'md', label: 'Normal' },
  { id: 'lg', label: 'Amplio' },
];

export type GridExample = {
  id: GridVariant;
  title: string;
  description: string;
  variant: GridVariant;
  cells: number;
};

export const GRID_EXAMPLES: GridExample[] = [
  {
    id: 'basic',
    title: '2 columnas',
    description: 'Cuadricula base de dos columnas iguales.',
    variant: 'basic',
    cells: 4,
  },
  {
    id: 'three',
    title: '3 columnas',
    description: 'Tres columnas para tarjetas o metricas.',
    variant: 'three',
    cells: 6,
  },
  {
    id: 'four',
    title: '4 columnas',
    description: 'Cuatro columnas para mosaicos densos.',
    variant: 'four',
    cells: 8,
  },
  {
    id: 'dense',
    title: 'Densa',
    description: 'Tres columnas con hueco reducido por defecto.',
    variant: 'dense',
    cells: 6,
  },
  {
    id: 'loose',
    title: 'Holgada',
    description: 'Dos columnas con mas aire entre celdas.',
    variant: 'loose',
    cells: 4,
  },
  {
    id: 'split',
    title: 'Asimetrica',
    description: 'Proporcion 1/3 + 2/3 para contenido principal.',
    variant: 'split',
    cells: 2,
  },
  {
    id: 'auto',
    title: 'Auto',
    description: 'Columnas automaticas segun el ancho disponible.',
    variant: 'auto',
    cells: 5,
  },
];

export const GRID_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | three | four | dense | loose | split | auto',
  },
  {
    name: 'gap',
    type: 'string',
    defaultValue: 'md',
    body: 'Espaciado entre celdas: sm | md | lg',
  },
] as const;

function bodyFor(example: GridExample): string {
  const i = '  ';
  return Array.from({ length: example.cells }, (_, index) => {
    return `${i}<div class="cell">Celda ${index + 1}</div>`;
  }).join('\n');
}

function iconImports(lang: CodeLang): string {
  if (lang === 'html') return '';
  return `import '@mariasan001/ui-wc';

`;
}

export function buildSnippet(
  lang: CodeLang,
  example: GridExample,
  gap: GridGap,
): string {
  const attrs = ` variant="${example.variant}" gap="${gap}"`;
  const body = bodyFor(example);

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<script type="module">import '@mariasan001/ui-wc';</script>

<gob-grid${attrs}>
${body}
</gob-grid>`;
  }

  if (lang === 'react') {
    const indented = body
      .split('\n')
      .map((line) => (line ? `      ${line}` : ''))
      .join('\n');
    return `${iconImports(lang)}export function Cuadricula() {
  return (
    <gob-grid${attrs}>
${indented}
    </gob-grid>
  );
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
${iconImports(lang).trimEnd()}
</script>

<template>
  <gob-grid${attrs}>
${body}
  </gob-grid>
</template>`;
  }

  return `// app.component.html
${iconImports(lang)}<gob-grid${attrs}>
${body}
</gob-grid>`;
}
