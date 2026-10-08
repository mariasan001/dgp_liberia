import type { DropdownMenuSize, DropdownMenuVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type DropdownMenuExample = {
  id: string;
  title: string;
  description: string;
  variant: DropdownMenuVariant;
  size?: DropdownMenuSize;
  label?: string;
  items?: string;
  disabled?: boolean;
  open?: boolean;
};

const DEFAULT_ITEMS = JSON.stringify([
  { id: 'ver', label: 'Ver detalle', icon: 'eye' },
  { id: 'editar', label: 'Editar', icon: 'edit' },
  { id: 'copiar', label: 'Duplicar', icon: 'copy' },
  { id: 'div', divider: true },
  { id: 'eliminar', label: 'Eliminar', icon: 'trash', danger: true },
]);

const EXPORT_ITEMS = JSON.stringify([
  { id: 'pdf', label: 'Descargar PDF', icon: 'download' },
  { id: 'excel', label: 'Exportar Excel', icon: 'download' },
  { id: 'compartir', label: 'Compartir', icon: 'share' },
]);

const SETTINGS_ITEMS = JSON.stringify([
  { id: 'prefs', label: 'Preferencias', icon: 'gear' },
  { id: 'ver', label: 'Vista previa', icon: 'eye' },
  { id: 'div', divider: true },
  { id: 'salir', label: 'Cerrar sesion', icon: 'trash', danger: true },
]);

export const DROPDOWN_MENU_EXAMPLES: DropdownMenuExample[] = [
  { id: 'basic', title: 'Básico', description: 'Menú contextual de acciones.', variant: 'basic', label: 'Acciones', items: DEFAULT_ITEMS },
  { id: 'solid', title: 'Solido', description: 'Trigger con relleno vino.', variant: 'solid', label: 'Opciones', items: EXPORT_ITEMS },
  { id: 'soft', title: 'Suave', description: 'Trigger con tinta vino suave.', variant: 'soft', label: 'Mas', items: DEFAULT_ITEMS },
  { id: 'outline', title: 'Contorno', description: 'Borde institucional.', variant: 'outline', label: 'Exportar', items: EXPORT_ITEMS },
  { id: 'ghost', title: 'Fantasma', description: 'Trigger sin fondo.', variant: 'ghost', label: 'Menú', items: SETTINGS_ITEMS },
  { id: 'dense', title: 'Denso', description: 'Altura compacta.', variant: 'dense', label: 'Acciones', items: DEFAULT_ITEMS },
  { id: 'icons', title: 'Con iconos', description: 'Iconos en cada item.', variant: 'icons', label: 'Gestionar', items: DEFAULT_ITEMS },
  { id: 'danger', title: 'Peligro', description: 'Trigger de alerta.', variant: 'danger', label: 'Eliminarâ€¦', items: DEFAULT_ITEMS },
  { id: 'bordered', title: 'Con borde', description: 'Marco en el trigger.', variant: 'bordered', label: 'Configurar', items: SETTINGS_ITEMS },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', label: 'Acciones', items: DEFAULT_ITEMS },
  { id: 'sm', title: 'PequeÃ±o', description: 'TamaÃ±o compacto.', variant: 'outline', size: 'sm', label: 'Mas', items: EXPORT_ITEMS },
  { id: 'lg', title: 'Grande', description: 'Mayor area tactil.', variant: 'solid', size: 'lg', label: 'Acciones', items: DEFAULT_ITEMS },
  { id: 'open', title: 'Abierto', description: 'Menú visible por defecto.', variant: 'outline', label: 'Vista previa', items: EXPORT_ITEMS, open: true },
  { id: 'disabled', title: 'Deshabilitado', description: 'Sin interaccion.', variant: 'basic', label: 'Acciones', items: DEFAULT_ITEMS, disabled: true },
];

export const DROPDOWN_MENU_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | solid | soft | outline | ghost | dense | icons | danger | bordered | complete' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'label', type: 'string', defaultValue: 'Acciones', body: 'Texto del botón disparador.' },
  { name: 'items', type: 'string (JSON)', defaultValue: 'Ver/Editar/â€¦', body: 'Array JSON con id, label, icon?, danger?, disabled?, divider?.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Fuerza el menú abierto.' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Deshabilita el menú.' },
] as const;

export function buildSnippet(lang: CodeLang, example: DropdownMenuExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    `label="${example.label ?? 'Acciones'}"`,
    example.items ? `items='${example.items}'` : null,
    example.open ? 'open' : null,
    example.disabled ? 'disabled' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-dropdown-menu ${attrs}></gob-dropdown-menu>\n`;
}
