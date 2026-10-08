import type { ContainerVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export const RADIUS_OPTIONS: { id: boolean; label: string }[] = [
  { id: false, label: 'Sin radio' },
  { id: true, label: 'Con radio' },
];

export const SHADOW_OPTIONS: { id: boolean; label: string }[] = [
  { id: false, label: 'Sin sombra' },
  { id: true, label: 'Con sombra' },
];

export type ContainerExample = {
  id: ContainerVariant;
  title: string;
  description: string;
  variant: ContainerVariant;
  widthLabel: string;
};

export const CONTAINER_EXAMPLES: ContainerExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Ancho estandar de pagina para consolas y listados.',
    variant: 'basic',
    widthLabel: '960px',
  },
  {
    id: 'narrow',
    title: 'Estrecho',
    description: 'Menor ancho para formularios o focos de lectura.',
    variant: 'narrow',
    widthLabel: '720px',
  },
  {
    id: 'wide',
    title: 'Amplio',
    description: 'Mas espacio horizontal para tableros densos.',
    variant: 'wide',
    widthLabel: '1200px',
  },
  {
    id: 'full',
    title: 'Completo',
    description: 'Ocupa todo el ancho disponible del padre.',
    variant: 'full',
    widthLabel: '100%',
  },
  {
    id: 'flush',
    title: 'Sin margen',
    description: 'Mismo ancho basico, sin padding horizontal.',
    variant: 'flush',
    widthLabel: '960px · 0 pad',
  },
  {
    id: 'padded',
    title: 'Con relleno',
    description: 'Panel con padding generoso y borde suave.',
    variant: 'padded',
    widthLabel: '960px · pad',
  },
  {
    id: 'prose',
    title: 'Prosa',
    description: 'Ancho tipografico (~65ch) para textos largos.',
    variant: 'prose',
    widthLabel: '65ch',
  },
];

export const CONTAINER_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | narrow | wide | full | flush | padded | prose',
  },
  {
    name: 'radius',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Esquinas redondeadas. Usa radius="true" para activarlo.',
  },
  {
    name: 'shadow',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Muestra sombra. Usa shadow="true" para activarla.',
  },
] as const;

function bodyFor(example: ContainerExample): string {
  const i = '  ';
  if (example.variant === 'prose') {
    return `${i}<h2>Lineamientos de operacion</h2>
${i}<p>
${i}  El contenedor limita el ancho de lectura para que el texto se mantenga
${i}  comodo en pantallas amplias sin romper la jerarquia de la pagina.
${i}</p>`;
  }

  return `${i}<div class="demo-block">
${i}  <strong>${example.title}</strong>
${i}  <span>${example.widthLabel}</span>
${i}  <p>${example.description}</p>
${i}</div>`;
}

function iconImports(lang: CodeLang): string {
  if (lang === 'html') return '';
  return `import '@mariasan001/ui-wc';

`;
}

export function buildSnippet(
  lang: CodeLang,
  example: ContainerExample,
  radius: boolean,
  shadow: boolean,
): string {
  const attrs = ` variant="${example.variant}" radius="${radius}" shadow="${shadow}"`;
  const body = bodyFor(example);

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<script type="module">import '@mariasan001/ui-wc';</script>

<gob-container${attrs}>
${body}
</gob-container>`;
  }

  if (lang === 'react') {
    const indented = body
      .split('\n')
      .map((line) => (line ? `      ${line}` : ''))
      .join('\n');
    return `${iconImports(lang)}export function Contenedor() {
  return (
    <gob-container${attrs}>
${indented}
    </gob-container>
  );
}`;
  }

  if (lang === 'vue') {
    return `<script setup>
${iconImports(lang).trimEnd()}
</script>

<template>
  <gob-container${attrs}>
${body}
  </gob-container>
</template>`;
  }

  return `// app.component.html
${iconImports(lang)}<gob-container${attrs}>
${body}
</gob-container>`;
}
