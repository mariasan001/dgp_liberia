import type { SkeletonVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type SkeletonExample = {
  id: SkeletonVariant;
  title: string;
  description: string;
  variant: SkeletonVariant;
  rows?: number;
};

export const SKELETON_EXAMPLES: SkeletonExample[] = [
  {
    id: 'text',
    title: 'Texto',
    description: 'Lineas de texto para parrafos y titulos.',
    variant: 'text',
  },
  {
    id: 'avatar',
    title: 'Con avatar',
    description: 'Circulo + lineas para perfiles o actores.',
    variant: 'avatar',
  },
  {
    id: 'card',
    title: 'Tarjeta',
    description: 'Bloque de media con texto debajo.',
    variant: 'card',
  },
  {
    id: 'table',
    title: 'Tabla',
    description: 'Encabezado y filas para listados tabulares.',
    variant: 'table',
    rows: 4,
  },
  {
    id: 'list',
    title: 'Lista',
    description: 'Filas con avatar para feeds y listados.',
    variant: 'list',
    rows: 3,
  },
  {
    id: 'media',
    title: 'Media',
    description: 'Miniatura + texto en layout horizontal.',
    variant: 'media',
  },
  {
    id: 'kpi',
    title: 'KPI',
    description: 'Tres tarjetas compactas de indicadores.',
    variant: 'kpi',
  },
  {
    id: 'form',
    title: 'Formulario',
    description: 'Campos con etiqueta e input placeholder.',
    variant: 'form',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Menor altura para paneles laterales.',
    variant: 'dense',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Avatar, media y tabla juntos.',
    variant: 'complete',
    rows: 3,
  },
];

export const SKELETON_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'text',
    body: 'text | avatar | card | table | list | media | kpi | form | dense | complete',
  },
  {
    name: 'rows',
    type: 'number',
    defaultValue: '3',
    body: 'Filas en table / list / complete (1–12).',
  },
  {
    name: 'animated',
    type: 'boolean',
    defaultValue: 'true',
    body: 'Shimmer en gris clarito. Usa animated="false" para estatico.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: SkeletonExample): string {
  const rowsAttr =
    example.rows != null ? ` rows="${example.rows}"` : '';
  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-skeleton variant="${example.variant}"${rowsAttr}></gob-skeleton>
`;
}
