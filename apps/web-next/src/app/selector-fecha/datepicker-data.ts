import type {
  DatepickerSize,
  DatepickerStatus,
  DatepickerVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type DatepickerExample = {
  id: string;
  title: string;
  description: string;
  variant: DatepickerVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: DatepickerStatus;
  size?: DatepickerSize;
  mode?: 'single' | 'range';
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

export const DATEPICKER_EXAMPLES: DatepickerExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Campo de fecha limpio.',
    variant: 'basic',
    placeholder: 'Selecciona una fecha',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional arriba del control.',
    variant: 'labeled',
    label: 'Fecha de solicitud',
    value: '2026-08-04',
    required: true,
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo debajo del campo.',
    variant: 'helper',
    label: 'Fecha de vencimiento',
    helper: 'El plazo se calcula en dias habiles.',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para filtros.',
    variant: 'dense',
    size: 'sm',
    label: 'Desde',
    value: '2026-07-01',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Fondo tinte vino.',
    variant: 'soft',
    label: 'Fecha de audiencia',
    value: '2026-09-15',
  },
  {
    id: 'floating',
    title: 'Flotante',
    description: 'Label dentro del control.',
    variant: 'floating',
    label: 'Fecha de nacimiento',
  },
  {
    id: 'underline',
    title: 'Subrayado',
    description: 'Solo linea inferior.',
    variant: 'underline',
    label: 'Fecha de firma',
    value: '2026-08-01',
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Contorno redondeado tipo chip.',
    variant: 'pill',
    label: 'Periodo',
    placeholder: 'Elige fecha',
  },
  {
    id: 'clearable',
    title: 'Limpiable',
    description: 'Boton para borrar la fecha.',
    variant: 'clearable',
    label: 'Fecha de cita',
    value: '2026-08-20',
  },
  {
    id: 'range',
    title: 'Rango',
    description: 'Seleccion de periodo inicio–fin.',
    variant: 'range',
    label: 'Periodo del reporte',
    value: '2026-08-01/2026-08-15',
    mode: 'range',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Fecha limite',
    required: true,
    status: 'error',
    helper: 'Debes elegir una fecha para continuar.',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmacion.',
    variant: 'labeled',
    label: 'Fecha de resolucion',
    value: '2026-08-04',
    status: 'success',
    helper: 'Fecha confirmada.',
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'No interactivo.',
    variant: 'labeled',
    label: 'Fecha bloqueada',
    value: '2026-01-10',
    disabled: true,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Label + ayuda + required + info + min/max.',
    variant: 'complete',
    label: 'Fecha de ingreso',
    helper: 'Solo dias habiles del mes en curso.',
    required: true,
    status: 'info',
    min: '2026-08-01',
    max: '2026-08-31',
  },
];

export const DATEPICKER_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | soft | floating | underline | pill | clearable | range | complete',
  },
  {
    name: 'mode',
    type: 'string',
    defaultValue: 'single',
    body: 'single | range. La variante range fuerza mode=range.',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: '',
    body: 'ISO YYYY-MM-DD o rango YYYY-MM-DD/YYYY-MM-DD.',
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
    body: 'Limites ISO del calendario.',
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

export function buildSnippet(lang: CodeLang, example: DatepickerExample): string {
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
    example.mode && example.mode !== 'single' ? `mode="${example.mode}"` : null,
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

  return `${imports}<gob-datepicker ${attrs}></gob-datepicker>
`;
}
