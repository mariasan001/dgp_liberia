import type { TagSize, TagTone, TagVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type TagExample = {
  id: string;
  title: string;
  description: string;
  variant: TagVariant;
  tone?: TagTone;
  size?: TagSize;
  label?: string;
  icon?: string;
  removable?: boolean;
  disabled?: boolean;
};

export const TAG_EXAMPLES: TagExample[] = [
  { id: 'basic', title: 'Básico', description: 'Chip de filtro activo.', variant: 'basic', tone: 'primary', label: 'CDMX' },
  { id: 'soft', title: 'Suave', description: 'Fondo tintado.', variant: 'soft', tone: 'success', label: 'Validado' },
  { id: 'outline', title: 'Contorno', description: 'Borde sin relleno fuerte.', variant: 'outline', tone: 'info', label: '2026' },
  { id: 'solid', title: 'Solido', description: 'Alto contraste.', variant: 'solid', tone: 'danger', label: 'Vencido' },
  { id: 'filter', title: 'Filtro', description: 'Removible con borde punteado.', variant: 'filter', tone: 'neutral', label: 'Estatus: Abierto', icon: 'filter', removable: true },
  { id: 'removable', title: 'Removible', description: 'Con botón de cierre.', variant: 'removable', tone: 'primary', label: 'Prioridad alta', removable: true },
  { id: 'dense', title: 'Denso', description: 'Altura compacta.', variant: 'dense', tone: 'warning', label: 'Urgente' },
  { id: 'icon', title: 'Con icono', description: 'Icono thin a la izquierda.', variant: 'icon', tone: 'info', label: 'Cita agendada', icon: 'calendar' },
  { id: 'brand', title: 'Marca', description: 'Acento dorado institucional.', variant: 'brand', label: 'GobMX', icon: 'pin' },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', tone: 'primary', label: 'Oficial', icon: 'check', removable: true },
  { id: 'sm', title: 'PequeÃ±o', description: 'Tamano compacto.', variant: 'soft', size: 'sm', tone: 'success', label: 'OK' },
  { id: 'lg', title: 'Grande', description: 'Mayor area tactil.', variant: 'outline', size: 'lg', tone: 'primary', label: 'Filtro activo', removable: true },
  { id: 'disabled', title: 'Deshabilitado', description: 'Sin interaccion.', variant: 'removable', tone: 'neutral', label: 'Bloqueado', removable: true, disabled: true },
];

export const TAG_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | outline | solid | filter | removable | dense | icon | brand | complete' },
  { name: 'tone', type: 'string', defaultValue: 'primary', body: 'primary | success | warning | danger | info | neutral' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'label', type: 'string', defaultValue: 'Etiqueta', body: 'Texto visible.' },
  { name: 'icon', type: 'string', defaultValue: 'â€”', body: 'filter | check | pin | tag | calendar' },
  { name: 'removable', type: 'boolean', defaultValue: 'false', body: 'Muestra botón de quitar.' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Deshabilita la etiqueta.' },
] as const;

export function buildSnippet(lang: CodeLang, example: TagExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.tone ? `tone="${example.tone}"` : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    `label="${example.label ?? 'Etiqueta'}"`,
    example.icon ? `icon="${example.icon}"` : null,
    example.removable ? 'removable' : null,
    example.disabled ? 'disabled' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-tag ${attrs}></gob-tag>\n`;
}
