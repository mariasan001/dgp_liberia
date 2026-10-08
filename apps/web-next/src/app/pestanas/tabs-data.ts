import type { TabsSize, TabsVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type TabsExample = {
  id: string;
  title: string;
  description: string;
  variant: TabsVariant;
  size?: TabsSize;
  value?: string;
  items: string;
  disabled?: boolean;
};

const ITEMS_BASIC = JSON.stringify([
  { id: 'general', label: 'General', icon: 'house' },
  { id: 'detalle', label: 'Detalle', icon: 'file' },
  { id: 'historial', label: 'Historial', icon: 'history' },
]);

const ITEMS_BADGE = JSON.stringify([
  { id: 'inbox', label: 'Bandeja', icon: 'tray', badge: '12' },
  { id: 'sent', label: 'Enviados', icon: 'envelope' },
  { id: 'archive', label: 'Archivo', icon: 'archive', badge: '3' },
]);

const ITEMS_DISABLED = JSON.stringify([
  { id: 'datos', label: 'Datos', icon: 'user' },
  { id: 'anexos', label: 'Anexos', icon: 'folder', disabled: true },
  { id: 'firma', label: 'Firma', icon: 'pen' },
]);

const ITEMS_VIEWS = JSON.stringify([
  { id: 'resumen', label: 'Resumen', icon: 'chart' },
  { id: 'tabla', label: 'Tabla', icon: 'table' },
  { id: 'mapa', label: 'Mapa', icon: 'map' },
  { id: 'export', label: 'Exportar', icon: 'export' },
]);

const ITEMS_SETTINGS = JSON.stringify([
  { id: 'perfil', label: 'Perfil', icon: 'user' },
  { id: 'seguridad', label: 'Seguridad', icon: 'shield' },
  { id: 'avisos', label: 'Avisos', icon: 'bell' },
  { id: 'ajustes', label: 'Ajustes', icon: 'gear' },
]);

export const TABS_EXAMPLES: TabsExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Pestañas con iconos Phosphor thin.',
    variant: 'basic',
    items: ITEMS_BASIC,
  },
  {
    id: 'underline',
    title: 'Subrayado',
    description: 'Indicador inferior vino + iconos.',
    variant: 'underline',
    value: 'detalle',
    items: ITEMS_BASIC,
  },
  {
    id: 'pills',
    title: 'Pildoras',
    description: 'Grupo suave con iconografia.',
    variant: 'pills',
    items: ITEMS_BASIC,
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Tinte vino e iconos.',
    variant: 'soft',
    items: ITEMS_SETTINGS,
  },
  {
    id: 'vertical',
    title: 'Vertical',
    description: 'Lista lateral con iconos.',
    variant: 'vertical',
    items: ITEMS_SETTINGS,
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida e iconos 14px.',
    variant: 'dense',
    size: 'sm',
    items: ITEMS_BASIC,
  },
  {
    id: 'icons',
    title: 'Con iconos',
    description: 'Iconografia protagonista (stroke thin).',
    variant: 'icons',
    items: ITEMS_BASIC,
  },
  {
    id: 'segmented',
    title: 'Segmentado',
    description: 'Dia / semana / mes con iconos.',
    variant: 'segmented',
    items: JSON.stringify([
      { id: 'dia', label: 'Dia', icon: 'day' },
      { id: 'semana', label: 'Semana', icon: 'week' },
      { id: 'mes', label: 'Mes', icon: 'month' },
    ]),
  },
  {
    id: 'bordered',
    title: 'Con borde',
    description: 'Bloque tabular + iconos.',
    variant: 'bordered',
    items: ITEMS_BASIC,
  },
  {
    id: 'badges',
    title: 'Con conteo',
    description: 'Icono + badge de conteo.',
    variant: 'pills',
    items: ITEMS_BADGE,
  },
  {
    id: 'item-disabled',
    title: 'Item deshabilitado',
    description: 'Anexos bloqueado con candado visual.',
    variant: 'underline',
    items: ITEMS_DISABLED,
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'Todo el control bloqueado.',
    variant: 'basic',
    items: ITEMS_BASIC,
    disabled: true,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Iconos + badges + riel dorado.',
    variant: 'complete',
    items: ITEMS_BADGE,
    value: 'inbox',
  },
  {
    id: 'line',
    title: 'Linea',
    description: 'Indicador dorado e iconos.',
    variant: 'line',
    value: 'detalle',
    items: ITEMS_BASIC,
  },
  {
    id: 'ghost',
    title: 'Fantasma',
    description: 'Tipografia + iconos sin chrome.',
    variant: 'ghost',
    items: ITEMS_BASIC,
  },
  {
    id: 'card',
    title: 'Tarjeta',
    description: 'Superficies bordadas con iconos.',
    variant: 'card',
    items: ITEMS_SETTINGS,
  },
  {
    id: 'rail',
    title: 'Riel',
    description: 'Vertical con iconos de vista.',
    variant: 'rail',
    items: ITEMS_VIEWS,
    value: 'tabla',
  },
  {
    id: 'flush',
    title: 'A borde',
    description: 'Ancho completo con iconos.',
    variant: 'flush',
    items: ITEMS_BASIC,
  },
  {
    id: 'editorial',
    title: 'Editorial',
    description: 'Uppercase + iconos institucionales.',
    variant: 'editorial',
    items: JSON.stringify([
      { id: 'resumen', label: 'Resumen', icon: 'paper' },
      { id: 'anexos', label: 'Anexos', icon: 'files' },
      { id: 'bitacora', label: 'Bitacora', icon: 'list' },
    ]),
  },
];

export const TABS_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | underline | pills | soft | vertical | dense | icons | segmented | bordered | complete | line | ghost | card | rail | flush | editorial',
  },
  {
    name: 'items',
    type: 'JSON string',
    defaultValue: '[]',
    body: 'Arreglo [{ id, label, icon?, badge?, disabled? }]. icon: house | user | file | folder | gear | bell | tray | …',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: 'primer item',
    body: 'Id de la pestaña activa.',
  },
  {
    name: 'size',
    type: 'string',
    defaultValue: 'md',
    body: 'sm | md | lg',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    body: 'Deshabilita todo el control.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: TabsExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    `items='${example.items}'`,
    example.value ? `value="${example.value}"` : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.disabled ? 'disabled' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const imports =
    lang === 'html'
      ? ''
      : `import '@mariasan001/ui-wc';

`;

  return `${imports}<gob-tabs ${attrs}></gob-tabs>
`;
}
