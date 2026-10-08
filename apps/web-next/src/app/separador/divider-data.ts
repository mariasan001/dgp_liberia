import type { DividerTone, DividerVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export const COLOR_OPTIONS: { id: DividerTone; label: string; swatch: string }[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
];

export type DividerExample = {
  id: DividerVariant;
  title: string;
  description: string;
  variant: DividerVariant;
};

export const DIVIDER_EXAMPLES: DividerExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Línea horizontal continua para separar bloques.',
    variant: 'basic',
  },
  {
    id: 'vertical',
    title: 'Vertical',
    description: 'Línea vertical para separar acciones en una fila.',
    variant: 'vertical',
  },
  {
    id: 'dashed',
    title: 'Discontinuo',
    description: 'Trazo segmentado para divisiones menos enfaticas.',
    variant: 'dashed',
  },
  {
    id: 'dotted',
    title: 'Punteado',
    description: 'Puntos suaves para jerarquias ligeras.',
    variant: 'dotted',
  },
  {
    id: 'thick',
    title: 'Grueso',
    description: 'Mayor grosor para cortes de sección fuertes.',
    variant: 'thick',
  },
  {
    id: 'label',
    title: 'Con etiqueta',
    description: 'Separador con texto centrado, util en formularios.',
    variant: 'label',
  },
  {
    id: 'inset',
    title: 'Inset',
    description: 'Línea con margen interior para alinear con el contenido.',
    variant: 'inset',
  },
];

export const DIVIDER_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | vertical | dashed | dotted | thick | label | inset',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'Color de la línea: primary | accent',
  },
] as const;

function bodyFor(example: DividerExample): string {
  if (example.variant === 'label') {
    return `  O continua con`;
  }
  return '';
}

function iconImports(lang: CodeLang): string {
  if (lang === 'html') return '';
  return `import '@mariasan001/ui-wc';

`;
}

export function buildSnippet(
  lang: CodeLang,
  example: DividerExample,
  tone: DividerTone,
): string {
  const attrs = ` variant="${example.variant}" tone="${tone}"`;
  const body = bodyFor(example);
  const isLabel = example.variant === 'label';

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<script type="module">import '@mariasan001/ui-wc';</script>

${
  isLabel
    ? `<gob-divider${attrs}>
${body}
</gob-divider>`
    : `<gob-divider${attrs}></gob-divider>`
}`;
  }

  if (lang === 'react') {
    if (isLabel) {
      return `${iconImports(lang)}export function Separador() {
  return (
    <gob-divider${attrs}>
      O continua con
    </gob-divider>
  );
}`;
    }
    return `${iconImports(lang)}export function Separador() {
  return <gob-divider${attrs} />;
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
${iconImports(lang).trimEnd()}
</script>

<template>
${
  isLabel
    ? `  <gob-divider${attrs}>
    O continua con
  </gob-divider>`
    : `  <gob-divider${attrs} />`
}
</template>`;
  }

  return `// app.component.html
${iconImports(lang)}${
    isLabel
      ? `<gob-divider${attrs}>
  O continua con
</gob-divider>`
      : `<gob-divider${attrs}></gob-divider>`
  }`;
}
