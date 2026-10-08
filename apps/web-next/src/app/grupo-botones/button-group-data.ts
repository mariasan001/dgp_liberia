import type { ButtonGroupSize, ButtonGroupVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type ButtonGroupExample = {
  id: string;
  title: string;
  description: string;
  variant: ButtonGroupVariant;
  size?: ButtonGroupSize;
  items?: string;
  disabled?: boolean;
};

const ACTIONS = JSON.stringify([
  { id: 'guardar', label: 'Guardar', icon: 'check' },
  { id: 'editar', label: 'Editar', icon: 'edit' },
  { id: 'eliminar', label: 'Eliminar', icon: 'trash' },
]);

const EXPORT = JSON.stringify([
  { id: 'pdf', label: 'PDF', icon: 'download' },
  { id: 'excel', label: 'Excel', icon: 'download' },
  { id: 'imprimir', label: 'Imprimir', icon: 'print' },
]);

const SHARE = JSON.stringify([
  { id: 'compartir', label: 'Compartir', icon: 'share' },
  { id: 'filtrar', label: 'Filtrar', icon: 'filter' },
  { id: 'nuevo', label: 'Nuevo', icon: 'plus' },
]);

export const BUTTON_GROUP_EXAMPLES: ButtonGroupExample[] = [
  { id: 'basic', title: 'Básico', description: 'Grupo de acciones relacionadas.', variant: 'basic', items: ACTIONS },
  { id: 'solid', title: 'Solido', description: 'Relleno vino institucional.', variant: 'solid', items: ACTIONS },
  { id: 'outline', title: 'Contorno', description: 'Bordes sin relleno fuerte.', variant: 'outline', items: EXPORT },
  { id: 'soft', title: 'Suave', description: 'Tinta vino sobre fondo claro.', variant: 'soft', items: SHARE },
  { id: 'ghost', title: 'Fantasma', description: 'Sin fondo; aparece al hover.', variant: 'ghost', items: ACTIONS },
  { id: 'split', title: 'Unido', description: 'Botones pegados sin gap.', variant: 'split', items: EXPORT },
  { id: 'vertical', title: 'Vertical', description: 'Apilado para sidebars.', variant: 'vertical', items: ACTIONS },
  { id: 'dense', title: 'Denso', description: 'Altura compacta para toolbars.', variant: 'dense', items: SHARE },
  { id: 'bordered', title: 'Con borde', description: 'Marco continuo alrededor.', variant: 'bordered', items: ACTIONS },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', items: EXPORT },
  { id: 'sm', title: 'PequeÃ±o', description: 'TamaÃ±o compacto.', variant: 'outline', size: 'sm', items: SHARE },
  { id: 'lg', title: 'Grande', description: 'Mayor area tactil.', variant: 'solid', size: 'lg', items: ACTIONS },
  { id: 'disabled', title: 'Deshabilitado', description: 'Sin interaccion.', variant: 'basic', items: ACTIONS, disabled: true },
];

export const BUTTON_GROUP_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | solid | outline | soft | ghost | split | vertical | dense | bordered | complete' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'items', type: 'string (JSON)', defaultValue: 'Guardar/Editar/Eliminar', body: 'Array JSON con id, label, icon?, disabled?.' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Deshabilita todo el grupo.' },
] as const;

export function buildSnippet(lang: CodeLang, example: ButtonGroupExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.items ? `items='${example.items}'` : null,
    example.disabled ? 'disabled' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-button-group ${attrs}></gob-button-group>\n`;
}
