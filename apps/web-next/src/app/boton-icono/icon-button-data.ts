import type { IconButtonSize, IconButtonVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type IconButtonExample = {
  id: string;
  title: string;
  description: string;
  variant: IconButtonVariant;
  size?: IconButtonSize;
  icon?: string;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
};

export const ICON_BUTTON_EXAMPLES: IconButtonExample[] = [
  { id: 'basic', title: 'Basico', description: 'Fondo gris claro plano.', variant: 'basic', icon: 'plus', label: 'Agregar' },
  { id: 'solid', title: 'Solido', description: 'Relleno vino institucional.', variant: 'solid', icon: 'plus', label: 'Agregar' },
  { id: 'soft', title: 'Suave', description: 'Tinta vino sobre fondo claro.', variant: 'soft', icon: 'edit', label: 'Editar' },
  { id: 'outline', title: 'Contorno', description: 'Borde sin relleno fuerte.', variant: 'outline', icon: 'search', label: 'Buscar' },
  { id: 'ghost', title: 'Fantasma', description: 'Sin borde; aparece al hover.', variant: 'ghost', icon: 'more', label: 'Mas opciones' },
  { id: 'danger', title: 'Peligro', description: 'Accion destructiva.', variant: 'danger', icon: 'trash', label: 'Eliminar' },
  { id: 'success', title: 'Exito', description: 'Confirmacion o guardado.', variant: 'success', icon: 'check', label: 'Confirmar' },
  { id: 'tonal', title: 'Tonal', description: 'Acento dorado institucional.', variant: 'tonal', icon: 'bell', label: 'Notificaciones' },
  { id: 'square', title: 'Cuadrado', description: 'Radio mas cerrado.', variant: 'square', icon: 'filter', label: 'Filtrar' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado a la izquierda.', variant: 'complete', icon: 'gear', label: 'Configuracion' },
  { id: 'download', title: 'Descargar', description: 'Accion de descarga.', variant: 'outline', icon: 'download', label: 'Descargar' },
  { id: 'share', title: 'Compartir', description: 'Accion de compartir.', variant: 'soft', icon: 'share', label: 'Compartir' },
  { id: 'sm', title: 'Pequeño', description: 'Compacto para densidades altas.', variant: 'solid', size: 'sm', icon: 'x', label: 'Cerrar' },
  { id: 'lg', title: 'Grande', description: 'Mayor area tactil.', variant: 'solid', size: 'lg', icon: 'search', label: 'Buscar' },
  { id: 'loading', title: 'Cargando', description: 'Spinner en lugar del icono.', variant: 'solid', icon: 'plus', label: 'Procesando', loading: true },
  { id: 'disabled', title: 'Deshabilitado', description: 'Sin interaccion.', variant: 'outline', icon: 'edit', label: 'No disponible', disabled: true },
];

export const ICON_BUTTON_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | solid | soft | outline | ghost | danger | success | tonal | square | complete' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'icon', type: 'string', defaultValue: 'plus', body: 'plus | search | gear | bell | x | check | edit | trash | more | download | filter | share' },
  { name: 'label', type: 'string', defaultValue: 'Accion', body: 'Etiqueta accesible (aria-label).' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Deshabilita el boton.' },
  { name: 'loading', type: 'boolean', defaultValue: 'false', body: 'Muestra spinner y bloquea clics.' },
] as const;

export function buildSnippet(lang: CodeLang, example: IconButtonExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    `icon="${example.icon ?? 'plus'}"`,
    `label="${example.label ?? 'Accion'}"`,
    example.disabled ? 'disabled' : null,
    example.loading ? 'loading' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-icon-button ${attrs}></gob-icon-button>\n`;
}
