import type { NavMenuSize, NavMenuVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type NavMenuExample = {
  id: string;
  title: string;
  description: string;
  variant: NavMenuVariant;
  size?: NavMenuSize;
  value?: string;
  items?: string;
  disabled?: boolean;
};

const ITEMS = JSON.stringify([
  { id: 'inicio', label: 'Inicio', icon: 'house', description: 'Panel principal' },
  { id: 'tramites', label: 'Tramites', icon: 'folder', description: 'Gestiones activas' },
  { id: 'ciudadanos', label: 'Ciudadanos', icon: 'users', description: 'Padron' },
  { id: 'reportes', label: 'Reportes', icon: 'chart', description: 'Indicadores' },
]);

const ITEMS_BADGE = JSON.stringify([
  { id: 'inicio', label: 'Inicio', icon: 'house' },
  { id: 'avisos', label: 'Avisos', icon: 'bell', badge: '4' },
  { id: 'ajustes', label: 'Ajustes', icon: 'gear' },
  { id: 'archivo', label: 'Archivo', icon: 'file', badge: '12' },
]);

const ITEMS_DOCK = JSON.stringify([
  { id: 'inicio', label: 'Inicio', icon: 'house' },
  { id: 'tramites', label: 'Tramites', icon: 'folder', badge: '3' },
  { id: 'ciudadanos', label: 'Ciudadanos', icon: 'users' },
  { id: 'mas', label: 'Mas', icon: 'squares' },
]);

export const NAV_MENU_EXAMPLES: NavMenuExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Navegacion limpia con tipografia precisa.',
    variant: 'basic',
    value: 'inicio',
    items: ITEMS,
  },
  {
    id: 'horizontal',
    title: 'Horizontal',
    description: 'Barra de seccion con indicador inferior.',
    variant: 'horizontal',
    value: 'tramites',
    items: ITEMS,
  },
  {
    id: 'vertical',
    title: 'Vertical',
    description: 'Menu lateral con descripcion e iconos.',
    variant: 'vertical',
    value: 'ciudadanos',
    items: ITEMS,
  },
  {
    id: 'rail',
    title: 'Riel',
    description: 'Acento vino a la izquierda, estilo app.',
    variant: 'rail',
    value: 'tramites',
    items: ITEMS,
  },
  {
    id: 'sidebar',
    title: 'Sidebar',
    description: 'Panel contenido para consolas.',
    variant: 'sidebar',
    value: 'reportes',
    items: ITEMS,
  },
  {
    id: 'pills',
    title: 'Pildoras',
    description: 'Grupo sobre gris claro plano.',
    variant: 'pills',
    value: 'inicio',
    items: ITEMS,
  },
  {
    id: 'floating',
    title: 'Flotante',
    description: 'Contenedor elevado con items activos.',
    variant: 'floating',
    value: 'ciudadanos',
    items: ITEMS,
  },
  {
    id: 'underline',
    title: 'Subrayado',
    description: 'Indicador inferior vino editorial.',
    variant: 'underline',
    value: 'reportes',
    items: ITEMS,
  },
  {
    id: 'soft',
    title: 'Suave',
    description: 'Tinte vino en el item activo.',
    variant: 'soft',
    value: 'tramites',
    items: ITEMS,
  },
  {
    id: 'ghost',
    title: 'Fantasma',
    description: 'Minimo chrome, tipografia protagonista.',
    variant: 'ghost',
    value: 'inicio',
    items: ITEMS,
  },
  {
    id: 'dense',
    title: 'Compacto',
    description: 'Altura reducida para toolbars.',
    variant: 'dense',
    size: 'sm',
    value: 'inicio',
    items: ITEMS,
  },
  {
    id: 'icons',
    title: 'Con iconos',
    description: 'Iconografia Phosphor thin protagonista.',
    variant: 'icons',
    value: 'ciudadanos',
    items: ITEMS,
  },
  {
    id: 'dock',
    title: 'Dock',
    description: 'Barra tipo app con icono + label.',
    variant: 'dock',
    value: 'tramites',
    items: ITEMS_DOCK,
  },
  {
    id: 'bordered',
    title: 'Con borde',
    description: 'Bloque tabular institucional.',
    variant: 'bordered',
    value: 'inicio',
    items: ITEMS,
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Riel dorado + badges + underline.',
    variant: 'complete',
    value: 'avisos',
    items: ITEMS_BADGE,
  },
  {
    id: 'disabled',
    title: 'Deshabilitado',
    description: 'Menu bloqueado.',
    variant: 'floating',
    value: 'inicio',
    items: ITEMS,
    disabled: true,
  },
];

export const NAV_MENU_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | horizontal | vertical | pills | underline | soft | dense | icons | bordered | complete | rail | ghost | dock | sidebar | floating',
  },
  {
    name: 'items',
    type: 'JSON string',
    defaultValue: '[]',
    body: 'Arreglo [{ id, label, icon?, href?, badge?, description? }].',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: 'primer item',
    body: 'Id del item activo.',
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
    body: 'Deshabilita el menu.',
  },
] as const;

export function buildSnippet(lang: CodeLang, example: NavMenuExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.items ? `items='${example.items}'` : null,
    example.value ? `value="${example.value}"` : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.disabled ? 'disabled' : null,
  ]
    .filter(Boolean)
    .join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-nav-menu ${attrs}></gob-nav-menu>\n`;
}
