import type { StepsSize, StepsVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type StepsExample = {
  id: string;
  title: string;
  description: string;
  variant: StepsVariant;
  size?: StepsSize;
  value?: string;
  items?: string;
  disabled?: boolean;
};

const ITEMS = JSON.stringify([
  { id: 'datos', label: 'Datos', description: 'Captura inicial', icon: 'user' },
  { id: 'docs', label: 'Documentos', description: 'Anexos', icon: 'file' },
  { id: 'revision', label: 'Revisión', description: 'Validacion', icon: 'shield' },
  { id: 'firma', label: 'Firma', description: 'Cierre', icon: 'pen' },
]);

export const STEPS_EXAMPLES: StepsExample[] = [
  { id: 'basic', title: 'Básico', description: 'Pasos numerados en horizontal.', variant: 'basic', value: 'docs', items: ITEMS },
  { id: 'numbered', title: 'Numerado', description: 'Enfasis en el índice.', variant: 'numbered', value: 'revisión', items: ITEMS },
  { id: 'dots', title: 'Puntos', description: 'Indicador mínimo.', variant: 'dots', value: 'docs', items: ITEMS },
  { id: 'vertical', title: 'Vertical', description: 'Flujo lateral con descripción.', variant: 'vertical', value: 'docs', items: ITEMS },
  { id: 'compact', title: 'Compacto', description: 'Sin descripción secundaria.', variant: 'compact', value: 'datos', items: ITEMS },
  { id: 'soft', title: 'Suave', description: 'Fondo gris claro plano.', variant: 'soft', value: 'docs', items: ITEMS },
  { id: 'outlined', title: 'Contorno', description: 'Marco fino.', variant: 'outlined', value: 'revisión', items: ITEMS },
  { id: 'labeled', title: 'Etiquetado', description: 'Solo titulos de paso.', variant: 'labeled', value: 'firma', items: ITEMS },
  { id: 'progress', title: 'Progreso', description: 'Barra de avance + panel.', variant: 'progress', value: 'revisión', items: ITEMS },
  { id: 'complete', title: 'Completo', description: 'Panel con riel dorado.', variant: 'complete', value: 'docs', items: ITEMS },
  { id: 'disabled', title: 'Deshabilitado', description: 'Flujo bloqueado.', variant: 'basic', value: 'datos', items: ITEMS, disabled: true },
];

export const STEPS_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | numbered | dots | vertical | compact | soft | outlined | labeled | progress | complete' },
  { name: 'items', type: 'JSON string', defaultValue: '[]', body: 'Arreglo [{ id, label, description?, icon? }].' },
  { name: 'value', type: 'string', defaultValue: 'primer paso', body: 'Id del paso actual.' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Deshabilita el control.' },
] as const;

export function buildSnippet(lang: CodeLang, example: StepsExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.items ? `items='${example.items}'` : null,
    example.value ? `value="${example.value}"` : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.disabled ? 'disabled' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-steps ${attrs}></gob-steps>\n`;
}
