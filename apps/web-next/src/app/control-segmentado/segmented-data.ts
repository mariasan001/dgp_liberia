import type { SegmentedSize, SegmentedVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type SegmentedExample = {
  id: string;
  title: string;
  description: string;
  variant: SegmentedVariant;
  size?: SegmentedSize;
  value?: string;
  items?: string;
  disabled?: boolean;
};

const PERIOD_ITEMS = JSON.stringify([
  { id: 'dia', label: 'Dia', icon: 'day' },
  { id: 'semana', label: 'Semana', icon: 'week' },
  { id: 'mes', label: 'Mes', icon: 'month' },
]);

const VIEW_ITEMS = JSON.stringify([
  { id: 'lista', label: 'Lista', icon: 'list' },
  { id: 'tablero', label: 'Tablero', icon: 'grid' },
  { id: 'mapa', label: 'Mapa', icon: 'map' },
]);

const LANG_ITEMS = JSON.stringify([
  { id: 'es', label: 'Español' },
  { id: 'en', label: 'English' },
]);

export const SEGMENTED_EXAMPLES: SegmentedExample[] = [
  { id: 'basic', title: 'Basico', description: 'Selector de periodo compacto.', variant: 'basic', value: 'semana', items: PERIOD_ITEMS },
  { id: 'pills', title: 'Pills', description: 'Segmentos redondeados.', variant: 'pills', value: 'lista', items: VIEW_ITEMS },
  { id: 'soft', title: 'Suave', description: 'Fondo gris claro plano.', variant: 'soft', value: 'mes', items: PERIOD_ITEMS },
  { id: 'underline', title: 'Subrayado', description: 'Indicador inferior activo.', variant: 'underline', value: 'lista', items: VIEW_ITEMS },
  { id: 'dense', title: 'Denso', description: 'Altura compacta para toolbars.', variant: 'dense', value: 'dia', items: PERIOD_ITEMS },
  { id: 'icons', title: 'Con iconos', description: 'Iconos thin en cada segmento.', variant: 'icons', value: 'tablero', items: VIEW_ITEMS },
  { id: 'bordered', title: 'Con borde', description: 'Grupo con marco continuo.', variant: 'bordered', value: 'es', items: LANG_ITEMS },
  { id: 'ghost', title: 'Fantasma', description: 'Sin relleno de pista.', variant: 'ghost', value: 'semana', items: PERIOD_ITEMS },
  { id: 'block', title: 'Bloque', description: 'Anchos iguales a todo el contenedor.', variant: 'block', value: 'lista', items: VIEW_ITEMS },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', value: 'mes', items: PERIOD_ITEMS },
  { id: 'sm', title: 'Pequeño', description: 'Tamaño compacto.', variant: 'basic', size: 'sm', value: 'es', items: LANG_ITEMS },
  { id: 'lg', title: 'Grande', description: 'Mayor area tactil.', variant: 'pills', size: 'lg', value: 'lista', items: VIEW_ITEMS },
  { id: 'disabled', title: 'Deshabilitado', description: 'Sin interaccion.', variant: 'basic', value: 'dia', items: PERIOD_ITEMS, disabled: true },
];

export const SEGMENTED_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | pills | soft | underline | dense | icons | bordered | ghost | block | complete' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'value', type: 'string', defaultValue: '—', body: 'Id del segmento activo.' },
  { name: 'items', type: 'string (JSON)', defaultValue: 'Dia/Semana/Mes', body: 'Array JSON con id, label, icon?, disabled?.' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Deshabilita todos los segmentos.' },
] as const;

export function buildSnippet(lang: CodeLang, example: SegmentedExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.value ? `value="${example.value}"` : null,
    example.items ? `items='${example.items}'` : null,
    example.disabled ? 'disabled' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-segmented ${attrs}></gob-segmented>\n`;
}
