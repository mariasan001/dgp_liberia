import type {
  ComboboxSize,
  ComboboxStatus,
  ComboboxVariant,
} from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type ComboboxExample = {
  id: string;
  title: string;
  description: string;
  variant: ComboboxVariant;
  label?: string;
  placeholder?: string;
  helper?: string;
  value?: string;
  status?: ComboboxStatus;
  size?: ComboboxSize;
  options?: string;
  required?: boolean;
  disabled?: boolean;
};

const CITY_OPTIONS = JSON.stringify([
  { value: 'gdl', label: 'Guadalajara', hint: 'Jalisco' },
  { value: 'mty', label: 'Monterrey', hint: 'Nuevo Leon' },
  { value: 'cdmx', label: 'Ciudad de Mexico', hint: 'CDMX' },
  { value: 'mer', label: 'Merida', hint: 'Yucatan' },
  { value: 'pue', label: 'Puebla', hint: 'Puebla' },
  { value: 'tij', label: 'Tijuana', hint: 'Baja California' },
  { value: 'leo', label: 'Leon', hint: 'Guanajuato' },
  { value: 'qro', label: 'Queretaro', hint: 'Queretaro' },
]);

export const COMBOBOX_EXAMPLES: ComboboxExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Escribe para filtrar; flechas + Enter para elegir.',
    variant: 'basic',
    placeholder: 'Buscar dependencia…',
  },
  {
    id: 'labeled',
    title: 'Con etiqueta',
    description: 'Label institucional y valor preseleccionado.',
    variant: 'labeled',
    label: 'Dependencia',
    placeholder: 'Buscar…',
    required: true,
    value: 'salud',
  },
  {
    id: 'helper',
    title: 'Con ayuda',
    description: 'Texto de apoyo debajo del campo.',
    variant: 'helper',
    label: 'Ciudad',
    placeholder: 'Empieza a escribir…',
    helper: 'Filtra por nombre o entidad.',
    options: CITY_OPTIONS,
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para barras densas.',
    variant: 'dense',
    label: 'Filtro',
    size: 'sm',
    placeholder: 'Buscar…',
    options: CITY_OPTIONS,
  },
  {
    id: 'filled',
    title: 'Relleno',
    description: 'Fondo suave; el borde aparece al enfocar.',
    variant: 'filled',
    label: 'Municipio',
    placeholder: 'Escribe el municipio',
    options: CITY_OPTIONS,
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Tinte vino + icono de institucion.',
    variant: 'soft',
    label: 'Institucion',
    placeholder: 'Buscar institucion…',
  },
  {
    id: 'floating',
    title: 'Flotante',
    description: 'Label dentro que sube al escribir o enfocar.',
    variant: 'floating',
    label: 'Buscar ciudad',
    options: CITY_OPTIONS,
  },
  {
    id: 'pill',
    title: 'Pildora',
    description: 'Bordes redondeados para busquedas rapidas.',
    variant: 'pill',
    label: 'Busqueda rapida',
    placeholder: 'Nombre o clave…',
    options: CITY_OPTIONS,
  },
  {
    id: 'icon',
    title: 'Con icono',
    description: 'Lupa leading + limpia con ×.',
    variant: 'icon',
    label: 'Expediente / area',
    placeholder: 'Escribe para filtrar',
    value: 'hacienda',
  },
  {
    id: 'create',
    title: 'Crear valor',
    description: 'Si no hay match, permite agregar uno nuevo.',
    variant: 'create',
    label: 'Etiqueta personalizada',
    placeholder: 'Escribe una etiqueta…',
    helper: 'Prueba con un texto que no exista.',
    options: CITY_OPTIONS,
  },
  {
    id: 'loading',
    title: 'Cargando',
    description: 'Estado de busqueda asincrona con spinner.',
    variant: 'loading',
    label: 'Consultando catalogo',
    placeholder: 'Buscando…',
    helper: 'Espera mientras se cargan resultados.',
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Semaforo danger con mensaje.',
    variant: 'helper',
    label: 'Area responsable',
    status: 'error',
    helper: 'Debes elegir una opcion de la lista.',
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Semaforo success con confirmacion.',
    variant: 'helper',
    label: 'Ciudad asignada',
    value: 'mty',
    status: 'success',
    helper: 'Ciudad confirmada.',
    options: CITY_OPTIONS,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Icono, ayuda, required e info.',
    variant: 'complete',
    label: 'Unidad administrativa',
    placeholder: 'Buscar unidad…',
    helper: 'Quien recibe el expediente.',
    required: true,
    status: 'info',
  },
];

export const COMBOBOX_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | labeled | helper | dense | filled | soft | floating | pill | icon | create | loading | complete',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    body: 'Etiqueta visible del combobox.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: 'Escribe para buscar…',
    body: 'Texto del input cuando esta vacio.',
  },
  {
    name: 'options',
    type: 'string (JSON)',
    defaultValue: 'dependencias',
    body: 'JSON [{value,label,hint?}].',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: '',
    body: 'Valor seleccionado (value de la opcion).',
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

export function buildSnippet(lang: CodeLang, example: ComboboxExample): string {
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

  return `${imports}<gob-combobox ${attrs}></gob-combobox>
`;
}
