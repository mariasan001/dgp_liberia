import type { BadgeSize, BadgeTone, BadgeVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type BadgeExample = {
  id: string;
  title: string;
  description: string;
  variant: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  label?: string;
  count?: number;
  max?: number;
};

export const BADGE_EXAMPLES: BadgeExample[] = [
  { id: 'basic', title: 'Basico', description: 'Etiqueta de estado simple.', variant: 'basic', tone: 'primary', label: 'Nuevo' },
  { id: 'soft', title: 'Suave', description: 'Fondo tintado.', variant: 'soft', tone: 'success', label: 'Activo' },
  { id: 'solid', title: 'Solido', description: 'Alto contraste.', variant: 'solid', tone: 'danger', label: 'Urgente' },
  { id: 'outline', title: 'Contorno', description: 'Sin relleno fuerte.', variant: 'outline', tone: 'info', label: 'Revision' },
  { id: 'dot', title: 'Punto', description: 'Indicador minimo.', variant: 'dot', tone: 'danger', label: 'Sin leer' },
  { id: 'count', title: 'Conteo', description: 'Numerico para notificaciones.', variant: 'count', tone: 'primary', count: 8 },
  { id: 'count-max', title: 'Tope', description: 'Muestra 99+ al exceder.', variant: 'count', tone: 'danger', count: 128, max: 99 },
  { id: 'pill', title: 'Pill', description: 'Forma alargada.', variant: 'pill', tone: 'warning', label: 'Pendiente' },
  { id: 'square', title: 'Cuadrada', description: 'Radio cerrado.', variant: 'square', tone: 'neutral', label: 'Borrador' },
  { id: 'status', title: 'Estado', description: 'Con punto de estatus.', variant: 'status', tone: 'success', label: 'En linea' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', tone: 'primary', label: 'Oficial' },
  { id: 'sm', title: 'Pequeño', description: 'Tamano compacto.', variant: 'solid', size: 'sm', tone: 'info', label: 'Beta' },
  { id: 'lg', title: 'Grande', description: 'Mayor presencia.', variant: 'solid', size: 'lg', tone: 'success', label: 'Validado' },
];

export const BADGE_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | solid | outline | dot | count | pill | square | status | complete' },
  { name: 'tone', type: 'string', defaultValue: 'primary', body: 'primary | success | warning | danger | info | neutral' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'label', type: 'string', defaultValue: 'Nuevo', body: 'Texto de la insignia.' },
  { name: 'count', type: 'number', defaultValue: '—', body: 'Valor numerico (count).' },
  { name: 'max', type: 'number', defaultValue: '99', body: 'Tope antes de mostrar N+.' },
] as const;

export function buildSnippet(lang: CodeLang, example: BadgeExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.tone ? `tone="${example.tone}"` : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.label ? `label="${example.label}"` : null,
    example.count != null ? `count="${example.count}"` : null,
    example.max != null ? `max="${example.max}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-badge ${attrs}></gob-badge>\n`;
}
