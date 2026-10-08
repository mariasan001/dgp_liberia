import type { SliderSize, SliderStatus, SliderVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type SliderExample = {
  id: string;
  title: string;
  description: string;
  variant: SliderVariant;
  label?: string;
  helper?: string;
  status?: SliderStatus;
  size?: SliderSize;
  min?: number;
  max?: number;
  step?: number;
  value?: string;
  unit?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

export const SLIDER_EXAMPLES: SliderExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Control limpio con valor visible.',
    variant: 'basic',
    value: '40',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional y valor.',
    variant: 'labeled',
    label: 'Porcentaje de avance',
    value: '65',
    unit: '%',
    required: true,
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo debajo del control.',
    variant: 'helper',
    label: 'Prioridad',
    helper: '1 = baja, 10 = urgente.',
    min: 1,
    max: 10,
    step: 1,
    value: '6',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para filtros.',
    variant: 'dense',
    size: 'sm',
    label: 'Zoom',
    min: 0,
    max: 100,
    value: '25',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Contenedor con tinte vino.',
    variant: 'soft',
    label: 'Capacidad',
    value: '70',
    unit: '%',
  },
  {
    id: 'marks',
    title: 'Con marcas',
    description: 'Puntos de referencia en la pista.',
    variant: 'marks',
    label: 'Nivel de riesgo',
    min: 0,
    max: 100,
    step: 25,
    value: '50',
  },
  {
    id: 'range',
    title: 'Rango',
    description: 'Dos thumbs para inicio y fin.',
    variant: 'range',
    label: 'Rango de edad',
    min: 18,
    max: 65,
    step: 1,
    value: '25,45',
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Pista gruesa y thumb generoso.',
    variant: 'pill',
    label: 'Volumen',
    value: '55',
    unit: '%',
  },
  {
    id: 'tooltip',
    title: 'Con tooltip',
    description: 'Valor flotante sobre el thumb.',
    variant: 'tooltip',
    label: 'Temperatura',
    min: 0,
    max: 40,
    step: 1,
    value: '22',
    unit: '°',
  },
  {
    id: 'segmented',
    title: 'Segmentado',
    description: 'Pasos visibles en la pista.',
    variant: 'segmented',
    label: 'Calificacion',
    min: 0,
    max: 10,
    step: 1,
    value: '7',
  },
  {
    id: 'vertical',
    title: 'Vertical',
    description: 'Orientacion vertical para paneles.',
    variant: 'vertical',
    label: 'Nivel',
    value: '60',
    unit: '%',
  },
  {
    id: 'duo',
    title: 'Duo',
    description: 'Relleno vino→dorado y thumb cafe.',
    variant: 'duo',
    label: 'Indice compuesto',
    value: '48',
  },
  {
    id: 'inset',
    title: 'Inset',
    description: 'Pista hundida sobre fondo suave.',
    variant: 'inset',
    label: 'Opacidad',
    value: '80',
    unit: '%',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Umbral minimo',
    required: true,
    status: 'error',
    helper: 'Debes definir un umbral valido.',
    value: '10',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmacion.',
    variant: 'labeled',
    label: 'Meta alcanzada',
    value: '100',
    unit: '%',
    status: 'success',
    helper: 'Valor confirmado.',
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'No interactivo.',
    variant: 'labeled',
    label: 'Bloqueado',
    value: '30',
    disabled: true,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Marcas + ayuda + required + info.',
    variant: 'complete',
    label: 'Presupuesto asignado',
    helper: 'En miles de pesos.',
    required: true,
    status: 'info',
    min: 0,
    max: 500,
    step: 50,
    value: '250',
    unit: 'k',
  },
];

export const SLIDER_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | soft | marks | range | complete | pill | tooltip | segmented | vertical | duo | inset',
  },
  {
    name: 'value',
    type: 'string / number',
    defaultValue: 'mitad',
    body: 'Numero o rango "inicio,fin".',
  },
  {
    name: 'min / max / step',
    type: 'number',
    defaultValue: '0 / 100 / 1',
    body: 'Limites y salto del control.',
  },
  {
    name: 'unit',
    type: 'string',
    defaultValue: '',
    body: 'Sufijo visual: %, km, k, etc.',
  },
  {
    name: 'label / helper',
    type: 'string',
    defaultValue: '',
    body: 'Textos del control.',
  },
  {
    name: 'status',
    type: 'string',
    defaultValue: 'default',
    body: 'Semaforo: default | error | success | warning | info.',
  },
  {
    name: 'size',
    type: 'string',
    defaultValue: 'md',
    body: 'sm | md | lg',
  },
  {
    name: 'disabled / readonly / required',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Estados nativos del control.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: SliderExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.label ? `label="${example.label}"` : null,
    example.helper ? `helper="${example.helper}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.min !== undefined ? `min="${example.min}"` : null,
    example.max !== undefined ? `max="${example.max}"` : null,
    example.step !== undefined && example.step !== 1
      ? `step="${example.step}"`
      : null,
    example.value !== undefined ? `value="${example.value}"` : null,
    example.unit ? `unit="${example.unit}"` : null,
    example.required ? 'required' : null,
    example.disabled ? 'disabled' : null,
    example.readonly ? 'readonly' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-slider ${attrs}></gob-slider>
`;
}
