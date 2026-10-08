import type {
  CheckboxSize,
  CheckboxStatus,
  CheckboxVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type CheckboxExample = {
  id: string;
  title: string;
  description: string;
  variant: CheckboxVariant;
  label?: string;
  descriptionText?: string;
  helper?: string;
  status?: CheckboxStatus;
  size?: CheckboxSize;
  checked?: boolean;
  indeterminate?: boolean;
  required?: boolean;
  disabled?: boolean;
  children?: string;
};

export const CHECKBOX_EXAMPLES: CheckboxExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Casilla limpia con label.',
    variant: 'basic',
    children: 'Acepto el aviso de privacidad',
  },
  {
    id: 'labeled',
    title: 'Con descripción',
    description: 'Título + texto de apoyo.',
    variant: 'labeled',
    label: 'Notificaciones por correo',
    descriptionText: 'Recibe alertas del expediente en tu bandeja.',
    checked: true,
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Mensaje debajo del control.',
    variant: 'helper',
    label: 'Compartir con otra dependencia',
    helper: 'Solo personal autorizado vera el folio.',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para listas densas.',
    variant: 'dense',
    size: 'sm',
    children: 'Incluir anexos',
    checked: true,
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Fondo tinte vino. Ideal para grupos.',
    variant: 'soft',
    label: 'Recordatorio automatico',
    descriptionText: 'Envia un aviso 24 h antes del vencimiento.',
  },
  {
    id: 'card',
    title: 'Tarjeta',
    description: 'Fila seleccionable con borde y anillo.',
    variant: 'card',
    label: 'Dictamen favorable',
    descriptionText: 'Marca esta via para continuar el flujo.',
    checked: true,
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Contorno redondeado tipo chip.',
    variant: 'pill',
    children: 'Prioridad alta',
  },
  {
    id: 'tile',
    title: 'Baldosa',
    description: 'Check a la derecha, acento dorado.',
    variant: 'tile',
    label: 'Requiere firma electronica',
    descriptionText: 'El ciudadano firmara en ventanilla digital.',
  },
  {
    id: 'indeterminate',
    title: 'Indeterminado',
    description: 'Estado parcial para seleccionar todo.',
    variant: 'soft',
    label: 'Seleccionar sección',
    descriptionText: 'Algunos elementos ya estan marcados.',
    indeterminate: true,
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Acepto terminos y condiciones',
    required: true,
    status: 'error',
    helper: 'Debes aceptar para enviar la solicitud.',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmación.',
    variant: 'card',
    label: 'Documentacion completa',
    descriptionText: 'Todos los anexos fueron validados.',
    checked: true,
    status: 'success',
    helper: 'Listo para dictamen.',
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'No interactivo.',
    variant: 'basic',
    children: 'Opción bloqueada',
    checked: true,
    disabled: true,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Card + ayuda + required + info.',
    variant: 'complete',
    label: 'Autorizo el uso de mis datos',
    descriptionText: 'Conforme a la ley de proteccion de datos personales.',
    helper: 'Puedes revocar el consentimiento después.',
    required: true,
    status: 'info',
  },
];

export const CHECKBOX_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | soft | card | pill | tile | complete',
  },
  {
    name: 'label / description / helper',
    type: 'string',
    defaultValue: '',
    body: 'Textos del control. El slot también puede ser el label.',
  },
  {
    name: 'checked / indeterminate',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Estado seleccionado o parcial.',
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
    name: 'disabled / required',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Estados nativos del control.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: CheckboxExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.label ? `label="${example.label}"` : null,
    example.descriptionText
      ? `description="${example.descriptionText}"`
      : null,
    example.helper ? `helper="${example.helper}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.checked ? 'checked' : null,
    example.indeterminate ? 'indeterminate' : null,
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

  const body = example.children || '';
  return `${imports}<gob-checkbox ${attrs}>${body}</gob-checkbox>
`;
}
