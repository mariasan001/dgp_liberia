import type { SplitButtonSize, SplitButtonVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type SplitButtonExample = {
  id: string;
  title: string;
  description: string;
  variant: SplitButtonVariant;
  size?: SplitButtonSize;
  label?: string;
  items?: string;
  disabled?: boolean;
  open?: boolean;
};

const SAVE_ITEMS = JSON.stringify([
  { id: 'borrador', label: 'Guardar borrador', icon: 'draft' },
  { id: 'programar', label: 'Programar envio', icon: 'schedule' },
  { id: 'duplicar', label: 'Duplicar', icon: 'copy' },
]);

const SEND_ITEMS = JSON.stringify([
  { id: 'ahora', label: 'Enviar ahora', icon: 'send' },
  { id: 'programar', label: 'Programar', icon: 'schedule' },
  { id: 'borrador', label: 'Guardar borrador', icon: 'draft' },
]);

const EXPORT_ITEMS = JSON.stringify([
  { id: 'pdf', label: 'Descargar PDF', icon: 'download' },
  { id: 'imprimir', label: 'Imprimir', icon: 'print' },
  { id: 'copiar', label: 'Copiar enlace', icon: 'copy' },
]);

export const SPLIT_BUTTON_EXAMPLES: SplitButtonExample[] = [
  { id: 'basic', title: 'Basico', description: 'Accion principal + menu.', variant: 'basic', label: 'Guardar', items: SAVE_ITEMS },
  { id: 'solid', title: 'Solido', description: 'Relleno vino institucional.', variant: 'solid', label: 'Enviar', items: SEND_ITEMS },
  { id: 'soft', title: 'Suave', description: 'Tinta vino sobre fondo claro.', variant: 'soft', label: 'Guardar', items: SAVE_ITEMS },
  { id: 'outline', title: 'Contorno', description: 'Borde sin relleno fuerte.', variant: 'outline', label: 'Exportar', items: EXPORT_ITEMS },
  { id: 'ghost', title: 'Fantasma', description: 'Sin fondo en el grupo.', variant: 'ghost', label: 'Opciones', items: SAVE_ITEMS },
  { id: 'dense', title: 'Denso', description: 'Altura compacta.', variant: 'dense', label: 'Guardar', items: SAVE_ITEMS },
  { id: 'tonal', title: 'Tonal', description: 'Acento dorado institucional.', variant: 'tonal', label: 'Publicar', items: SEND_ITEMS },
  { id: 'danger', title: 'Peligro', description: 'Accion destructiva con variantes.', variant: 'danger', label: 'Eliminar', items: SAVE_ITEMS },
  { id: 'bordered', title: 'Con borde', description: 'Marco continuo.', variant: 'bordered', label: 'Descargar', items: EXPORT_ITEMS },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', label: 'Guardar', items: SAVE_ITEMS },
  { id: 'sm', title: 'Pequeño', description: 'Tamaño compacto.', variant: 'solid', size: 'sm', label: 'Enviar', items: SEND_ITEMS },
  { id: 'lg', title: 'Grande', description: 'Mayor area tactil.', variant: 'solid', size: 'lg', label: 'Guardar', items: SAVE_ITEMS },
  { id: 'open', title: 'Abierto', description: 'Menu visible por defecto.', variant: 'outline', label: 'Exportar', items: EXPORT_ITEMS, open: true },
  { id: 'disabled', title: 'Deshabilitado', description: 'Sin interaccion.', variant: 'basic', label: 'Guardar', items: SAVE_ITEMS, disabled: true },
];

export const SPLIT_BUTTON_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | solid | soft | outline | ghost | dense | tonal | danger | bordered | complete' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'label', type: 'string', defaultValue: 'Guardar', body: 'Texto de la accion principal.' },
  { name: 'items', type: 'string (JSON)', defaultValue: 'Borrador/Programar/…', body: 'Array JSON con id, label, icon?, disabled?.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Fuerza el menu abierto.' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Deshabilita el control.' },
] as const;

export function buildSnippet(lang: CodeLang, example: SplitButtonExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    `label="${example.label ?? 'Guardar'}"`,
    example.items ? `items='${example.items}'` : null,
    example.open ? 'open' : null,
    example.disabled ? 'disabled' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-split-button ${attrs}></gob-split-button>\n`;
}
