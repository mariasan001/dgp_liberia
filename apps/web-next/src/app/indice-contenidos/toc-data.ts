import type { TableOfContentsVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type TocExample = {
  id: string;
  title: string;
  description: string;
  variant: TableOfContentsVariant;
  tocTitle?: string;
  items?: string;
  active?: number;
};

export const TOC_EXAMPLES: TocExample[] = [
  { id: 'basic', title: 'Basico', description: 'Indice lateral limpio.', variant: 'basic', active: 1 },
  { id: 'soft', title: 'Suave', description: 'Fondo fill.', variant: 'soft', tocTitle: 'Guia del tramite', active: 0 },
  { id: 'dense', title: 'Denso', description: 'Compacto para paneles.', variant: 'dense', tocTitle: 'Secciones', active: 2 },
  { id: 'outline', title: 'Contorno', description: 'Borde con acento activo.', variant: 'outline', active: 1 },
  { id: 'numbered', title: 'Numerado', description: 'Indices visibles.', variant: 'numbered', items: 'Introduccion|Marco legal|Requisitos|Captura|Firma|Envio', active: 3 },
  { id: 'sticky', title: 'Fijo', description: 'Presencia elevada para scroll.', variant: 'sticky', tocTitle: 'En esta guia', active: 0 },
  { id: 'minimal', title: 'Minimal', description: 'Sin caja, solo lista.', variant: 'minimal', tocTitle: 'Contenido', active: 2 },
  { id: 'rail', title: 'Riel', description: 'Acento lateral dorado.', variant: 'rail', tocTitle: 'Documento', active: 1 },
  { id: 'brand', title: 'Marca', description: 'Panel vino.', variant: 'brand', tocTitle: 'Capitulos', active: 0 },
  { id: 'complete', title: 'Completo', description: 'Cierre con acento dorado.', variant: 'complete', tocTitle: 'Indice oficial', active: 2 },
];

export const TOC_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | dense | outline | numbered | sticky | minimal | rail | brand | complete' },
  { name: 'title', type: 'string', defaultValue: 'Contenido', body: 'Titulo del indice.' },
  { name: 'items', type: 'string', defaultValue: 'Intro|…', body: 'Secciones separadas por |.' },
  { name: 'active', type: 'number', defaultValue: '0', body: 'Indice activo (0-based).' },
] as const;

export function buildSnippet(lang: CodeLang, example: TocExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.tocTitle ? `title="${example.tocTitle}"` : null,
    example.items ? `items="${example.items}"` : null,
    example.active !== undefined ? `active="${example.active}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-table-of-contents ${attrs}></gob-table-of-contents>\n`;
}
