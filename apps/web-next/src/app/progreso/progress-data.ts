import type { ProgressStatus, ProgressVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type ProgressExample = {
  id: string;
  title: string;
  description: string;
  variant: ProgressVariant;
  value?: number;
  label?: string;
  status?: ProgressStatus;
  steps?: number;
};

export const PROGRESS_EXAMPLES: ProgressExample[] = [
  {
    id: 'bar',
    title: 'Barra',
    description: 'Barra basica de avance.',
    variant: 'bar',
    value: 42,
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Titulo y porcentaje visibles.',
    variant: 'labeled',
    value: 68,
    label: 'Expedientes revisados',
  },
  {
    id: 'thin',
    title: 'Delgada',
    description: 'Barra fina para espacios compactos.',
    variant: 'thin',
    value: 55,
  },
  {
    id: 'thick',
    title: 'Gruesa',
    description: 'Barra mas alta para paneles principales.',
    variant: 'thick',
    value: 72,
  },
  {
    id: 'ring',
    title: 'Anillo',
    description: 'Indicador circular con porcentaje.',
    variant: 'ring',
    value: 64,
    label: 'Cumplimiento',
  },
  {
    id: 'steps',
    title: 'Pasos',
    description: 'Flujo por etapas numeradas.',
    variant: 'steps',
    value: 50,
    steps: 4,
    label: 'Tramite',
  },
  {
    id: 'segmented',
    title: 'Segmentada',
    description: 'Bloques discretos de avance.',
    variant: 'segmented',
    value: 75,
    steps: 4,
    label: 'Carga de documentos',
  },
  {
    id: 'indeterminate',
    title: 'Indeterminada',
    description: 'Proceso en curso sin porcentaje fijo.',
    variant: 'indeterminate',
    label: 'Generando dictamen…',
  },
  {
    id: 'stacked',
    title: 'Vino + dorado',
    description: 'Barra con acento dorado de marca.',
    variant: 'stacked',
    value: 58,
    label: 'Meta mensual',
  },
  {
    id: 'success',
    title: 'Semaforo success',
    description: 'Estado completado (verde institucional).',
    variant: 'labeled',
    value: 100,
    label: 'Dictamen emitido',
    status: 'success',
  },
  {
    id: 'warning',
    title: 'Semaforo warning',
    description: 'Estado en revision (amarillo institucional).',
    variant: 'labeled',
    value: 40,
    label: 'En revision',
    status: 'warning',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Barra + anillo con pill de estatus.',
    variant: 'complete',
    value: 82,
    label: 'Avance del expediente',
    status: 'info',
  },
];

export const PROGRESS_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'bar',
    body: 'bar | labeled | thin | thick | ring | steps | segmented | indeterminate | stacked | complete',
  },
  {
    name: 'value',
    type: 'number',
    defaultValue: '0',
    body: 'Valor actual del progreso.',
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: '100',
    body: 'Valor maximo (porcentaje relativo).',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Progreso',
    body: 'Texto accesible / etiqueta visible segun variante.',
  },
  {
    name: 'status',
    type: 'string',
    defaultValue: 'default',
    body: 'Semaforo: default | info | warning | success | danger. Default = vino.',
  },
  {
    name: 'steps',
    type: 'number',
    defaultValue: '4',
    body: 'Cantidad de pasos/segmentos (2–8) en steps y segmented.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: ProgressExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.value != null ? `value="${example.value}"` : null,
    example.label ? `label="${example.label}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
    example.steps != null ? `steps="${example.steps}"` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-progress ${attrs}></gob-progress>
`;
}
