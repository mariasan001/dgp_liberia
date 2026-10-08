import type { InputSize, InputStatus, InputVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type InputExample = {
  id: string;
  title: string;
  description: string;
  variant: InputVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: InputStatus;
  size?: InputSize;
  lead?: string;
  suffix?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  type?: string;
};

export const INPUT_EXAMPLES: InputExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Campo limpio sin etiqueta.',
    variant: 'basic',
    placeholder: 'Escribe aquíâ€¦',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional arriba del control.',
    variant: 'labeled',
    label: 'Nombre completo',
    placeholder: 'Maria Gonzalez',
    required: true,
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo debajo del campo.',
    variant: 'helper',
    label: 'Correo institucional',
    placeholder: 'nombre@gob.mx',
    helper: 'Usa tu correo oficial de la dependencia.',
  },
  {
    id: 'icon',
    title: 'Con icono',
    description: 'Icono leading de usuario.',
    variant: 'icon',
    label: 'Usuario',
    placeholder: 'CURP o usuario',
  },
  {
    id: 'search',
    title: 'Búsqueda',
    description: 'Tipo search con icono de lupa.',
    variant: 'search',
    label: 'Buscar expediente',
    placeholder: 'EXP-2026â€¦',
  },
  {
    id: 'password',
    title: 'Contrasena',
    description: 'Con toggle para mostrar u ocultar.',
    variant: 'password',
    label: 'Contrasena',
    placeholder: 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢',
    value: 'secreto123',
  },
  {
    id: 'prefix',
    title: 'Prefijo',
    description: 'Prefijo dorado (moneda o clave).',
    variant: 'prefix',
    label: 'Monto',
    placeholder: '0.00',
    lead: '$',
  },
  {
    id: 'suffix',
    title: 'Sufijo',
    description: 'Unidad o dominio a la derecha.',
    variant: 'suffix',
    label: 'Superficie',
    placeholder: '120',
    suffix: 'mÂ²',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para filtros densos.',
    variant: 'dense',
    label: 'Folio',
    placeholder: '01482',
    size: 'sm',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'RFC',
    value: 'XAXX',
    status: 'error',
    helper: 'El RFC no es valido.',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmación.',
    variant: 'helper',
    label: 'CURP',
    value: 'GOMC850101HDFRRN09',
    status: 'success',
    helper: 'CURP verificada.',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Label, icono, ayuda y required.',
    variant: 'complete',
    label: 'Responsable',
    placeholder: 'Selecciona o escribe un nombre',
    helper: 'Quien firma el dictamen.',
    required: true,
    status: 'info',
  },
  {
    id: 'floating',
    title: 'Flotante',
    description: 'Label dentro del campo que sube al enfocar o escribir.',
    variant: 'floating',
    label: 'Nombre completo',
    placeholder: ' ',
  },
  {
    id: 'underline',
    title: 'Subrayado',
    description: 'Solo línea inferior; acento vino al foco.',
    variant: 'underline',
    label: 'Institucion',
    placeholder: 'Escribe el nombre',
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Bordes redondeados con lupa. Ideal para filtros.',
    variant: 'pill',
    label: 'Buscar trámite',
    placeholder: 'Folio, CURP o nombreâ€¦',
  },
  {
    id: 'clearable',
    title: 'Borrable',
    description: 'Botón Ã— al escribir. Limpia el valor de un toque.',
    variant: 'clearable',
    label: 'Referencia',
    placeholder: 'Escribe y borraâ€¦',
    value: 'REF-2026-0042',
  },
  {
    id: 'code',
    title: 'Código',
    description: 'OTP monoespaciado, centrado. Max. 6 digitos.',
    variant: 'code',
    label: 'Código de verificacion',
    helper: 'Revisa tu correo institucional',
    placeholder: 'Â·Â·Â·Â·Â·Â·',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Fondo tinte vino, sin borde duro. Aspecto contemporaneo.',
    variant: 'soft',
    label: 'Correo de contacto',
    type: 'email',
    placeholder: 'nombre@dependencia.gob.mx',
  },
];

export const INPUT_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | icon | search | password | prefix | suffix | dense | complete | floating | underline | pill | clearable | code | soft',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    body: 'Etiqueta visible del campo.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '',
    body: 'Texto placeholder del input nativo.',
  },
  {
    name: 'helper',
    type: 'string',
    defaultValue: '',
    body: 'Ayuda o mensaje de validación.',
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
    name: 'lead / suffix',
    type: 'string',
    defaultValue: '',
    body: 'Afiches de texto a izquierda (lead) o derecha (suffix).',
  },
  {
    name: 'disabled / readonly / required',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Estados nativos del control.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: InputExample): string {
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
    example.lead ? `lead="${example.lead}"` : null,
    example.suffix ? `suffix="${example.suffix}"` : null,
    example.required ? 'required' : null,
    example.disabled ? 'disabled' : null,
    example.readonly ? 'readonly' : null,
    example.type ? `type="${example.type}"` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-input ${attrs}></gob-input>
`;
}
