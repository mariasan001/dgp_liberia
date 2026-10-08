import type {
  SearchFieldSize,
  SearchFieldStatus,
  SearchFieldVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type SearchExample = {
  id: string;
  title: string;
  description: string;
  variant: SearchFieldVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: SearchFieldStatus;
  size?: SearchFieldSize;
  shortcut?: string;
  loading?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

export const SEARCH_EXAMPLES: SearchExample[] = [
  {
    id: 'basic',
    title: 'Básico',
    description: 'Búsqueda limpia con icono.',
    variant: 'basic',
    placeholder: 'Buscar expedienteâ€¦',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional arriba.',
    variant: 'labeled',
    label: 'Buscar ciudadano',
    placeholder: 'Nombre, CURP o folio',
    required: true,
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo debajo.',
    variant: 'helper',
    label: 'Consulta global',
    helper: 'Prueba con folio EXP-2026.',
    placeholder: 'Escribe para filtrar',
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para toolbars.',
    variant: 'dense',
    size: 'sm',
    placeholder: 'Filtrar lista',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Fondo tinte vino.',
    variant: 'soft',
    label: 'Buscar en el tablero',
    placeholder: 'KPI, reporte o vista',
  },
  {
    id: 'floating',
    title: 'Flotante',
    description: 'Label dentro del control.',
    variant: 'floating',
    label: 'Búsqueda avanzada',
  },
  {
    id: 'underline',
    title: 'Subrayado',
    description: 'Solo línea inferior.',
    variant: 'underline',
    label: 'Filtrar tabla',
    value: 'dictamen',
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Contorno redondeado tipo chip.',
    variant: 'pill',
    placeholder: 'Buscar en el menúâ€¦',
  },
  {
    id: 'clearable',
    title: 'Limpiable',
    description: 'Botón para borrar el texto.',
    variant: 'clearable',
    label: 'Buscar oficio',
    value: 'OF-8842',
  },
  {
    id: 'shortcut',
    title: 'Con atajo',
    description: 'Badge de teclado (âŒ˜K).',
    variant: 'shortcut',
    label: 'Paleta de comandos',
    placeholder: 'Buscar acciónâ€¦',
    shortcut: 'âŒ˜K',
  },
  {
    id: 'loading',
    title: 'Cargando',
    description: 'Spinner mientras consulta.',
    variant: 'loading',
    label: 'Buscando resultados',
    value: 'Maria',
    loading: true,
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Búsqueda',
    status: 'error',
    helper: 'No se encontraron resultados.',
    value: 'xyz-999',
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'No interactivo.',
    variant: 'labeled',
    label: 'Búsqueda bloqueada',
    value: 'inactivo',
    disabled: true,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Atajo + limpiar + ayuda + info.',
    variant: 'complete',
    label: 'Búsqueda institucional',
    helper: 'Enter para buscar. Esc para limpiar.',
    required: true,
    status: 'info',
    shortcut: 'Ctrl K',
    placeholder: 'Expediente, persona o trámite',
  },
];

export const SEARCH_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | soft | floating | underline | pill | clearable | shortcut | loading | complete',
  },
  {
    name: 'value / placeholder',
    type: 'string',
    defaultValue: '',
    body: 'Texto del campo y placeholder.',
  },
  {
    name: 'shortcut',
    type: 'string',
    defaultValue: 'âŒ˜K',
    body: 'Texto del badge de atajo (variantes shortcut/complete).',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Muestra spinner de consulta.',
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

export function buildSnippet(lang: CodeLang, example: SearchExample): string {
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
    example.shortcut ? `shortcut="${example.shortcut}"` : null,
    example.loading ? 'loading' : null,
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

  return `${imports}<gob-search-field ${attrs}></gob-search-field>
`;
}
