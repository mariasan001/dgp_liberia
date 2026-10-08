import type { CommandPaletteVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type CommandPaletteExample = {
  id: string;
  title: string;
  description: string;
  variant: CommandPaletteVariant;
  placeholder?: string;
  query?: string;
  items?: string;
};

export const COMMAND_PALETTE_EXAMPLES: CommandPaletteExample[] = [
  { id: 'basic', title: 'Basico', description: 'Busqueda de acciones.', variant: 'basic' },
  { id: 'soft', title: 'Suave', description: 'Fondo fill.', variant: 'soft' },
  { id: 'dense', title: 'Denso', description: 'Lista compacta.', variant: 'dense' },
  { id: 'outline', title: 'Contorno', description: 'Borde con acento.', variant: 'outline' },
  { id: 'grouped', title: 'Agrupado', description: 'Secciones visibles.', variant: 'grouped' },
  { id: 'compact', title: 'Compacto', description: 'Sin pie ni hints.', variant: 'compact' },
  { id: 'wide', title: 'Amplio', description: 'Mas altura de resultados.', variant: 'wide' },
  { id: 'spotlight', title: 'Spotlight', description: 'Elevacion fuerte.', variant: 'spotlight', placeholder: 'Que quieres hacer?' },
  { id: 'brand', title: 'Marca', description: 'Panel vino.', variant: 'brand' },
  { id: 'complete', title: 'Completo', description: 'Acento dorado.', variant: 'complete', query: 'tramite' },
];

export const COMMAND_PALETTE_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | dense | outline | grouped | compact | wide | spotlight | brand | complete' },
  { name: 'placeholder', type: 'string', defaultValue: 'Buscar acciones…', body: 'Placeholder del input.' },
  { name: 'query', type: 'string', defaultValue: '', body: 'Consulta inicial.' },
  { name: 'items', type: 'string', defaultValue: 'label~hint~group|…', body: 'Comandos separados por |.' },
] as const;

export function buildSnippet(lang: CodeLang, example: CommandPaletteExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.placeholder ? `placeholder="${example.placeholder}"` : null,
    example.query ? `query="${example.query}"` : null,
    example.items ? `items="${example.items}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-command-palette ${attrs}></gob-command-palette>\n`;
}
