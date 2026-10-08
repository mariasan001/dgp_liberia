import type {
  FormFieldSize,
  FormFieldStatus,
  FormFieldVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type FormFieldExample = {
  id: string;
  title: string;
  description: string;
  variant: FormFieldVariant;
  label?: string;
  helper?: string;
  hint?: string;
  status?: FormFieldStatus;
  size?: FormFieldSize;
  required?: boolean;
  disabled?: boolean;
  controlPlaceholder?: string;
  controlValue?: string;
};

export const FORM_FIELD_EXAMPLES: FormFieldExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Envoltorio mínimo del control.',
    variant: 'basic',
    controlPlaceholder: 'Escribe aquíâ€¦',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional arriba.',
    variant: 'labeled',
    label: 'Nombre completo',
    required: true,
    controlPlaceholder: 'Maria Sanchez',
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo debajo.',
    variant: 'helper',
    label: 'CURP',
    helper: '18 caracteres alfanumericos.',
    controlPlaceholder: 'GASM850101HDFNRR09',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Espaciado reducido.',
    variant: 'dense',
    size: 'sm',
    label: 'Folio',
    controlPlaceholder: 'EXP-2026',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Tinte vino en el control.',
    variant: 'soft',
    label: 'Dependencia',
    controlPlaceholder: 'Secretaria de Salud',
  },
  {
    id: 'horizontal',
    title: 'Horizontal',
    description: 'Label a la izquierda del control.',
    variant: 'horizontal',
    label: 'Municipio',
    helper: 'Selecciona el municipio de residencia.',
    controlPlaceholder: 'Guadalajara',
  },
  {
    id: 'stacked',
    title: 'Apilado',
    description: 'Bloque con fondo suave.',
    variant: 'stacked',
    label: 'Observaciones',
    helper: 'Visible para el revisor.',
    controlPlaceholder: 'Notas del trámite',
  },
  {
    id: 'inline',
    title: 'En línea',
    description: 'Control + acción en la misma fila.',
    variant: 'inline',
    label: 'Código postal',
    controlPlaceholder: '44100',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Correo',
    status: 'error',
    helper: 'Formato de correo invalido.',
    controlPlaceholder: 'usuario@',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Campo validado.',
    variant: 'labeled',
    label: 'RFC',
    status: 'success',
    helper: 'RFC verificado.',
    controlPlaceholder: 'XAXX010101000',
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'No interactivo.',
    variant: 'labeled',
    label: 'Clave interna',
    disabled: true,
    controlPlaceholder: 'bloqueado',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Label, required, ayuda y semáforo.',
    variant: 'complete',
    label: 'Expediente',
    helper: 'Usa el folio del oficio de origen.',
    required: true,
    status: 'info',
    controlPlaceholder: 'OF-8842',
    controlValue: 'OF-8842',
  },
];

export const FORM_FIELD_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | soft | horizontal | stacked | inline | complete',
  },
  {
    name: 'label / helper / hint',
    type: 'string',
    defaultValue: '',
    body: 'Textos del envoltorio.',
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
    name: 'required / disabled',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Estados del campo.',
  },
  {
    name: 'slot (default)',
    type: 'node',
    defaultValue: 'â€”',
    body: 'Control hijo (input, select, etc.).',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: FormFieldExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.label ? `label="${example.label}"` : null,
    example.helper ? `helper="${example.helper}"` : null,
    example.hint ? `hint="${example.hint}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.required ? 'required' : null,
    example.disabled ? 'disabled' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  const placeholder = example.controlPlaceholder || 'â€¦';
  const valueAttr = example.controlValue
    ? ` value="${example.controlValue}"`
    : '';
  return `${imports}<gob-form-field ${attrs}>
  <gob-input variant="basic" placeholder="${placeholder}"${valueAttr}></gob-input>
</gob-form-field>
`;
}
