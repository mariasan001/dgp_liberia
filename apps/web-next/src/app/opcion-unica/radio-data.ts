import type { RadioSize, RadioStatus, RadioVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type RadioExample = {
  id: string;
  title: string;
  description: string;
  variant: RadioVariant;
  items: Array<{
    label?: string;
    description?: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    children?: string;
  }>;
  name: string;
  helper?: string;
  status?: RadioStatus;
  size?: RadioSize;
  required?: boolean;
};

export const RADIO_EXAMPLES: RadioExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Grupo simple con name compartido.',
    variant: 'basic',
    name: 'canal-basic',
    items: [
      { value: 'web', children: 'Portal ciudadano', checked: true },
      { value: 'app', children: 'App movil' },
      { value: 'ventanilla', children: 'Ventanilla' },
    ],
  },
  {
    id: 'labeled',
    title: 'Con descripción',
    description: 'Título + texto de apoyo por opción.',
    variant: 'labeled',
    name: 'prioridad-labeled',
    items: [
      {
        value: 'alta',
        label: 'Alta',
        description: 'Atencion en menos de 24 h.',
        checked: true,
      },
      {
        value: 'media',
        label: 'Media',
        description: 'Atencion en 72 h.',
      },
      {
        value: 'baja',
        label: 'Baja',
        description: 'Atencion en 5 dias habiles.',
      },
    ],
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Mensaje debajo del grupo.',
    variant: 'helper',
    name: 'envio-helper',
    helper: 'Define como se notifica al ciudadano.',
    items: [
      { value: 'correo', label: 'Correo institucional' },
      { value: 'sms', label: 'SMS', checked: true },
      { value: 'ambos', label: 'Ambos canales' },
    ],
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para filtros.',
    variant: 'dense',
    size: 'sm',
    name: 'vista-dense',
    items: [
      { value: 'lista', children: 'Lista', checked: true },
      { value: 'tabla', children: 'Tabla' },
      { value: 'mapa', children: 'Mapa' },
    ],
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Fondo tinte vino por opción.',
    variant: 'soft',
    name: 'dictamen-soft',
    items: [
      {
        value: 'favorable',
        label: 'Favorable',
        description: 'Continua el flujo de firma.',
        checked: true,
      },
      {
        value: 'observado',
        label: 'Con observaciones',
        description: 'Regresa a revisión documental.',
      },
    ],
  },
  {
    id: 'card',
    title: 'Tarjeta',
    description: 'Opciones en cards con anillo al elegir.',
    variant: 'card',
    name: 'pago-card',
    items: [
      {
        value: 'línea',
        label: 'Pago en línea',
        description: 'Tarjeta o transferencia SPEI.',
        checked: true,
      },
      {
        value: 'caja',
        label: 'Pago en caja',
        description: 'Referencia bancaria imprimible.',
      },
    ],
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Contorno redondeado tipo chip.',
    variant: 'pill',
    name: 'turno-pill',
    items: [
      { value: 'matutino', children: 'Matutino', checked: true },
      { value: 'vespertino', children: 'Vespertino' },
    ],
  },
  {
    id: 'tile',
    title: 'Baldosa',
    description: 'Radio a la derecha, acento dorado.',
    variant: 'tile',
    name: 'firma-tile',
    items: [
      {
        value: 'electronica',
        label: 'Firma electronica',
        description: 'FIEL o e.firma vigente.',
        checked: true,
      },
      {
        value: 'presencial',
        label: 'Firma presencial',
        description: 'Cita en oficina regional.',
      },
    ],
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger si falta selección.',
    variant: 'helper',
    name: 'acepta-error',
    status: 'error',
    helper: 'Debes elegir una opción para continuar.',
    required: true,
    items: [
      { value: 'si', label: 'Si, autorizo' },
      { value: 'no', label: 'No autorizo' },
    ],
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmación.',
    variant: 'card',
    name: 'modalidad-success',
    status: 'success',
    helper: 'Modalidad confirmada.',
    items: [
      {
        value: 'express',
        label: 'Express',
        description: 'Resolucion en 48 h.',
        checked: true,
      },
      {
        value: 'ordinario',
        label: 'Ordinario',
        description: 'Resolucion en 10 dias.',
      },
    ],
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'Opción no disponible en el grupo.',
    variant: 'basic',
    name: 'canal-disabled',
    items: [
      { value: 'activo', children: 'Canal activo', checked: true },
      { value: 'bloqueado', children: 'Canal bloqueado', disabled: true },
    ],
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Card + ayuda + required + info.',
    variant: 'complete',
    name: 'responsable-complete',
    helper: 'Quien firma el dictamen final.',
    required: true,
    status: 'info',
    items: [
      {
        value: 'titular',
        label: 'Titular del area',
        description: 'Firma con e.firma institucional.',
        checked: true,
      },
      {
        value: 'suplente',
        label: 'Suplente autorizado',
        description: 'Requiere oficio de comision.',
      },
    ],
  },
];

export const RADIO_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | soft | card | pill | tile | complete',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: '',
    body: 'Agrupa radios: solo uno checked por name.',
  },
  {
    name: 'label / description / helper',
    type: 'string',
    defaultValue: '',
    body: 'Textos del control. El slot también puede ser el label.',
  },
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Opción seleccionada del grupo.',
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

export function buildSnippet(lang: CodeLang, example: RadioExample): string {
  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  const groupAttrs = [
    example.helper ? `helper="${example.helper}"` : null,
    example.status && example.status !== 'default'
      ? `status="${example.status}"`
      : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.required ? 'required' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const radios = example.items
    .map((item) => {
      const attrs = [
        `variant="${example.variant}"`,
        `name="${example.name}"`,
        `value="${item.value}"`,
        item.label ? `label="${item.label}"` : null,
        item.description ? `description="${item.description}"` : null,
        item.checked ? 'checked' : null,
        item.disabled ? 'disabled' : null,
        groupAttrs || null,
      ]
        .filter(Boolean)
        .join(' ');
      const body = item.children || '';
      return `<gob-radio ${attrs}>${body}</gob-radio>`;
    })
    .join('\n');

  return `${imports}${radios}
`;
}
