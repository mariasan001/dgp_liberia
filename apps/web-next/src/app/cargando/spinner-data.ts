import type {
  SpinnerSize,
  SpinnerStatus,
  SpinnerVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type SpinnerExample = {
  id: string;
  title: string;
  description: string;
  variant: SpinnerVariant;
  label?: string;
  size?: SpinnerSize;
  status?: SpinnerStatus;
};

export const SPINNER_EXAMPLES: SpinnerExample[] = [
  {
    id: 'ring',
    title: 'Anillo',
    description: 'Spinner circular clasico de marca.',
    variant: 'ring',
  },
  {
    id: 'dual',
    title: 'Doble anillo',
    description: 'Vino y dorado girando en sentidos opuestos.',
    variant: 'dual',
    size: 'lg',
  },
  {
    id: 'dots',
    title: 'Puntos',
    description: 'Tres puntos con rebote suave.',
    variant: 'dots',
  },
  {
    id: 'pulse',
    title: 'Pulso',
    description: 'Circulo con latido y halo dorado.',
    variant: 'pulse',
  },
  {
    id: 'bars',
    title: 'Barras',
    description: 'Ecualizador corto para procesos activos.',
    variant: 'bars',
  },
  {
    id: 'button',
    title: 'Botón',
    description: 'Tamano compacto para CTAs en carga.',
    variant: 'button',
    size: 'sm',
  },
  {
    id: 'inline',
    title: 'Inline',
    description: 'Spinner + texto en una sola línea.',
    variant: 'inline',
    label: 'Guardando cambiosâ€¦',
    size: 'sm',
  },
  {
    id: 'page',
    title: 'Página',
    description: 'Espera de página completa con mensaje.',
    variant: 'page',
    label: 'Cargando expediente',
    size: 'lg',
  },
  {
    id: 'overlay',
    title: 'Overlay',
    description: 'Bloqueo suave de panel con pill de estatus.',
    variant: 'overlay',
    label: 'Actualizando listado',
    status: 'info',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Doble anillo, pill y copy de espera.',
    variant: 'complete',
    label: 'Preparando dictamen',
    size: 'lg',
    status: 'warning',
  },
  {
    id: 'orbit',
    title: 'Orbita',
    description: 'Núcleo vino con satelite dorado en orbita.',
    variant: 'orbit',
    size: 'lg',
  },
  {
    id: 'arc',
    title: 'Arco',
    description: 'Trazo SVG moderno con pista suave.',
    variant: 'arc',
    size: 'lg',
  },
  {
    id: 'dash',
    title: 'Guiones',
    description: 'Anillo punteado en rotacion continua.',
    variant: 'dash',
  },
  {
    id: 'comet',
    title: 'Cometa',
    description: 'Cola de marca con cabeza dorada.',
    variant: 'comet',
    size: 'lg',
  },
  {
    id: 'petals',
    title: 'Petalos',
    description: 'Flor minimal rotando en vino y dorado.',
    variant: 'petals',
    size: 'lg',
  },
  {
    id: 'metro',
    title: 'Metro',
    description: 'Cuatro bloques con pulso escalonado.',
    variant: 'metro',
  },
  {
    id: 'wave',
    title: 'Ola',
    description: 'Cinco puntos en onda sincronizada.',
    variant: 'wave',
  },
  {
    id: 'radar',
    title: 'Radar',
    description: 'Barrido conico con punto de marca.',
    variant: 'radar',
    size: 'lg',
  },
  {
    id: 'infinity',
    title: 'Infinito',
    description: 'Dos nodos que se cruzan en loop.',
    variant: 'infinity',
    size: 'lg',
  },
  {
    id: 'morph',
    title: 'Morph',
    description: 'Blob que muta entre vino y dorado.',
    variant: 'morph',
    size: 'lg',
  },
];

export const SPINNER_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'ring',
    body: 'ring | dual | dots | pulse | bars | button | inline | page | overlay | complete | orbit | arc | dash | comet | petals | metro | wave | radar | infinity | morph',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    body: 'Texto visible / aria-label de espera.',
  },
  {
    name: 'size',
    type: 'string',
    defaultValue: 'md',
    body: 'sm | md | lg',
  },
  {
    name: 'status',
    type: 'string',
    defaultValue: 'default',
    body: 'Semaforo: default | info | warning | success | danger. Default = vino.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: SpinnerExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.label ? `label="${example.label}"` : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
  ]
    .filter(Boolean)
    .join(' ');

  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-spinner ${attrs}></gob-spinner>
`;
}
