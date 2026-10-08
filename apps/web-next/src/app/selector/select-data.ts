import type { SelectSize, SelectStatus, SelectVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type SelectExample = {
  id: string;
  title: string;
  description: string;
  variant: SelectVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: SelectStatus;
  size?: SelectSize;
  options?: string;
  required?: boolean;
  disabled?: boolean;
};

const DEPT_OPTIONS = JSON.stringify([
  { value: 'salud', label: 'Secretaria de Salud', hint: 'SSA' },
  { value: 'educacion', label: 'Educacion Publica', hint: 'SEP' },
  { value: 'seguridad', label: 'Seguridad Publica', hint: 'SSP' },
  { value: 'hacienda', label: 'Hacienda y Credito', hint: 'SHCP' },
  { value: 'bienestar', label: 'Bienestar', hint: 'BIEN' },
]);

const STATUS_OPTIONS = JSON.stringify([
  { value: 'abierto', label: 'Abierto', hint: 'En captura' },
  { value: 'revision', label: 'En revision', hint: 'Validando' },
  { value: 'aprobado', label: 'Aprobado', hint: 'Listo' },
  { value: 'cerrado', label: 'Cerrado', hint: 'Archivado' },
]);

const PRIORITY_OPTIONS = JSON.stringify([
  { value: 'alta', label: 'Alta', hint: '24 h' },
  { value: 'media', label: 'Media', hint: '72 h' },
  { value: 'baja', label: 'Baja', hint: '5 dias' },
]);

export const SELECT_EXAMPLES: SelectExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Panel custom con check, hint y chevron animado.',
    variant: 'basic',
    placeholder: 'Elige una entidad…',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional + required. Meta debajo del valor.',
    variant: 'labeled',
    label: 'Entidad federativa',
    placeholder: 'Selecciona…',
    required: true,
    value: 'cdmx',
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo y opciones con clave corta.',
    variant: 'helper',
    label: 'Dependencia',
    placeholder: 'Elige dependencia',
    helper: 'Define quien atiende el expediente.',
    options: DEPT_OPTIONS,
  },
  {
    id: 'search',
    title: 'Con busqueda',
    description: 'Filtra opciones en vivo dentro del panel.',
    variant: 'search',
    label: 'Buscar dependencia',
    placeholder: 'Escribe para filtrar…',
    helper: 'Prueba con “salud” o “hacienda”.',
    options: DEPT_OPTIONS,
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para barras de filtros.',
    variant: 'dense',
    label: 'Estatus',
    size: 'sm',
    options: STATUS_OPTIONS,
    value: 'revision',
  },
  {
    id: 'filled',
    title: 'Relleno',
    description: 'Fondo suave; el borde aparece al abrir.',
    variant: 'filled',
    label: 'Municipio',
    placeholder: 'Selecciona municipio',
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Tinte vino + icono en pastilla.',
    variant: 'soft',
    label: 'Institucion',
    placeholder: 'Elige institucion',
    options: DEPT_OPTIONS,
  },
  {
    id: 'split',
    title: 'Split',
    description: 'Icono en bloque vino/dorado. Look de producto moderno.',
    variant: 'split',
    label: 'Area operativa',
    placeholder: 'Selecciona area',
    options: DEPT_OPTIONS,
    value: 'seguridad',
  },
  {
    id: 'floating',
    title: 'Flotante',
    description: 'Label dentro del control que sube al abrir o elegir.',
    variant: 'floating',
    label: 'Region',
  },
  {
    id: 'underline',
    title: 'Subrayado',
    description: 'Solo linea inferior; acento vino al foco.',
    variant: 'underline',
    label: 'Prioridad',
    placeholder: 'Elige prioridad',
    options: PRIORITY_OPTIONS,
  },
  {
    id: 'ghost',
    title: 'Ghost',
    description: 'Sin borde en reposo. Ideal para toolbars.',
    variant: 'ghost',
    label: 'Vista',
    placeholder: 'Cambiar vista',
    options: STATUS_OPTIONS,
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Bordes redondeados para filtros rapidos.',
    variant: 'pill',
    label: 'Filtro rapido',
    placeholder: 'Filtrar por…',
    options: STATUS_OPTIONS,
  },
  {
    id: 'icon',
    title: 'Con icono',
    description: 'Leading pin + limpia con × al tener valor.',
    variant: 'icon',
    label: 'Ubicacion',
    placeholder: 'Selecciona estado',
    value: 'jal',
  },
  {
    id: 'group',
    title: 'Agrupado',
    description: 'Secciones por region dentro del panel.',
    variant: 'group',
    label: 'Region / entidad',
    placeholder: 'Elige una entidad',
  },
  {
    id: 'multiple',
    title: 'Multiple + chips',
    description: 'Seleccion multiple con chips removibles en el trigger.',
    variant: 'multiple',
    label: 'Dependencias involucradas',
    helper: 'Toca una opcion para marcar o quitar.',
    options: DEPT_OPTIONS,
    value: 'salud,educacion',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Tipo de tramite',
    status: 'error',
    helper: 'Debes seleccionar un tipo.',
    options: STATUS_OPTIONS,
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmacion.',
    variant: 'helper',
    label: 'Prioridad',
    value: 'aprobado',
    status: 'success',
    helper: 'Prioridad confirmada.',
    options: STATUS_OPTIONS,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Icono, ayuda, required e info.',
    variant: 'complete',
    label: 'Area responsable',
    placeholder: 'Selecciona area',
    helper: 'Quien firma el dictamen.',
    required: true,
    status: 'info',
    options: DEPT_OPTIONS,
  },
];

export const SELECT_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | filled | soft | floating | pill | icon | group | multiple | search | underline | ghost | split | complete',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    body: 'Etiqueta visible del selector.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'Selecciona una opcion',
    body: 'Texto cuando no hay valor.',
  },
  {
    name: 'options',
    type: 'string (JSON)',
    defaultValue: 'entidades MX',
    body: 'JSON [{value,label,hint?}] o grupos [{label,options:[…]}].',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: '',
    body: 'Valor seleccionado. En multiple: valores separados por coma.',
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

export function buildSnippet(lang: CodeLang, example: SelectExample): string {
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
    example.options ? `options='${example.options}'` : null,
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

  return `${imports}<gob-select ${attrs}></gob-select>
`;
}
