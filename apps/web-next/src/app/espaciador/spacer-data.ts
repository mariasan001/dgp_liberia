import type { SpacerVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type SpacerExample = {
  id: SpacerVariant;
  title: string;
  description: string;
  variant: SpacerVariant;
};

export const SPACER_EXAMPLES: SpacerExample[] = [
  {
    id: 'xs',
    title: 'Extra pequeno',
    description: '4px entre elementos muy cercanos.',
    variant: 'xs',
  },
  {
    id: 'sm',
    title: 'Pequeno',
    description: '8px para agrupaciones densas.',
    variant: 'sm',
  },
  {
    id: 'md',
    title: 'Medio',
    description: '16px, el ritmo vertical por defecto.',
    variant: 'md',
  },
  {
    id: 'lg',
    title: 'Grande',
    description: '24px para respirar entre bloques.',
    variant: 'lg',
  },
  {
    id: 'xl',
    title: 'Extra grande',
    description: '40px para saltos de seccion ligeros.',
    variant: 'xl',
  },
  {
    id: 'horizontal',
    title: 'Horizontal',
    description: 'Espacio fijo en fila entre acciones o etiquetas.',
    variant: 'horizontal',
  },
  {
    id: 'section',
    title: 'Seccion',
    description: '64px para separar secciones de pagina.',
    variant: 'section',
  },
];

export const SPACER_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'md',
    body: 'xs | sm | md | lg | xl | horizontal | section',
  },
] as const;

function iconImports(lang: CodeLang): string {
  if (lang === 'html') return '';
  return `import '@mariasan001/ui-wc';

`;
}

export function buildSnippet(lang: CodeLang, example: SpacerExample): string {
  const attrs = ` variant="${example.variant}"`;

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<script type="module">import '@mariasan001/ui-wc';</script>

<gob-spacer${attrs}></gob-spacer>`;
  }

  if (lang === 'react') {
    return `${iconImports(lang)}export function Espaciador() {
  return <gob-spacer${attrs} />;
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
${iconImports(lang).trimEnd()}
</script>

<template>
  <gob-spacer${attrs} />
</template>`;
  }

  return `// app.component.html
${iconImports(lang)}<gob-spacer${attrs}></gob-spacer>`;
}
