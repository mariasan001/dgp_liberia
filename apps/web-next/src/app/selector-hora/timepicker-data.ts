import type {
  TimepickerSize,
  TimepickerStatus,
  TimepickerVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type TimepickerExample = {
  id: string;
  title: string;
  description: string;
  variant: TimepickerVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: TimepickerStatus;
  size?: TimepickerSize;
  step?: number;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

export const TIMEPICKER_EXAMPLES: TimepickerExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Campo de hora limpio.',
    variant: 'basic',
    placeholder: 'Selecciona una hora',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional arriba del control.',
    variant: 'labeled',
    label: 'Hora de cita',
    value: '09:30',
    required: true,
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo debajo del campo.',
    variant: 'helper',
    label: 'Hora de cierre',
    helper: 'Horario en formato 24 h.',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para filtros.',
    variant: 'dense',
    size: 'sm',
    label: 'Desde',
    value: '08:00',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Fondo tinte vino.',
    variant: 'soft',
    label: 'Hora de audiencia',
    value: '11:15',
  },
  {
    id: 'floating',
    title: 'Flotante',
    description: 'Label dentro del control.',
    variant: 'floating',
    label: 'Hora de inicio',
  },
  {
    id: 'underline',
    title: 'Subrayado',
    description: 'Solo linea inferior.',
    variant: 'underline',
    label: 'Hora de firma',
    value: '16:00',
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Contorno redondeado tipo chip.',
    variant: 'pill',
    label: 'Turno',
    placeholder: 'Elige hora',
  },
  {
    id: 'clearable',
    title: 'Limpiable',
    description: 'Boton para borrar la hora.',
    variant: 'clearable',
    label: 'Recordatorio',
    value: '14:45',
  },
  {
    id: 'step',
    title: 'Paso 15 min',
    description: 'Minutos cada 15 con step.',
    variant: 'labeled',
    label: 'Intervalo',
    value: '10:00',
    step: 15,
    helper: 'step=\"15\"',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Hora limite',
    required: true,
    status: 'error',
    helper: 'Debes elegir una hora para continuar.',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmacion.',
    variant: 'labeled',
    label: 'Hora confirmada',
    value: '12:00',
    status: 'success',
    helper: 'Horario guardado.',
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'No interactivo.',
    variant: 'labeled',
    label: 'Hora bloqueada',
    value: '07:00',
    disabled: true,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Label + ayuda + required + info + min/max.',
    variant: 'complete',
    label: 'Ventanilla',
    helper: 'Solo horario laboral.',
    required: true,
    status: 'info',
    min: '08:00',
    max: '18:00',
    step: 30,
  },
];

export const TIMEPICKER_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | soft | floating | underline | pill | clearable | complete',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: '',
    body: 'Hora en formato 24 h: HH:mm.',
  },
  {
    name: 'step',
    type: 'number',
    defaultValue: '5',
    body: 'Intervalo de minutos: 1 | 5 | 10 | 15 | 30.',
  },
  {
    name: 'label / placeholder / helper',
    type: 'string',
    defaultValue: '',
    body: 'Textos del control.',
  },
  {
    name: 'min / max',
    type: 'string',
    defaultValue: '',
    body: 'Limites HH:mm del selector.',
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

export function buildSnippet(lang: CodeLang, example: TimepickerExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.label ? `label="${example.label}"` : null,
    example.placeholder ? `placeholder="${example.placeholder}"` : null,
    example.helper ? `helper="${example.helper}"` : null,
    example.value ? `value="${example.value}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.step && example.step !== 5 ? `step="${example.step}"` : null,
    example.min ? `min="${example.min}"` : null,
    example.max ? `max="${example.max}"` : null,
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

  return `${imports}<gob-timepicker ${attrs}></gob-timepicker>
`;
}
