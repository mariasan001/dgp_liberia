import type { StatStripVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type StatStripExample = {
  id: string;
  title: string;
  description: string;
  variant: StatStripVariant;
  items?: string;
};

export const STAT_STRIP_EXAMPLES: StatStripExample[] = [
  { id: 'basic', title: 'Basico', description: 'Fila de 4 metricas.', variant: 'basic' },
  { id: 'soft', title: 'Suave', description: 'Fondo fill.', variant: 'soft' },
  { id: 'dense', title: 'Denso', description: 'Compacto para resumenes.', variant: 'dense' },
  { id: 'outline', title: 'Contorno', description: 'Acento vino.', variant: 'outline' },
  { id: 'cards', title: 'Tarjetas', description: 'Metricas separadas.', variant: 'cards' },
  { id: 'inline', title: 'Inline', description: 'Lectura horizontal corta.', variant: 'inline', items: 'Tramites:128k:|Tiempo:4.2m:|NPS:72:|Sedes:32:' },
  { id: 'centered', title: 'Centrado', description: 'Alineacion centrada.', variant: 'centered' },
  { id: 'wide', title: 'Amplio', description: 'Tipografia mayor.', variant: 'wide' },
  { id: 'brand', title: 'Marca', description: 'Panel vino.', variant: 'brand' },
  { id: 'complete', title: 'Completo', description: 'Acento dorado.', variant: 'complete' },
];

export const STAT_STRIP_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | dense | outline | cards | inline | centered | wide | brand | complete' },
  { name: 'items', type: 'string', defaultValue: 'label:value:hint|…', body: 'Metricas separadas por | (label:value:hint).' },
] as const;

export function buildSnippet(lang: CodeLang, example: StatStripExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.items ? `items="${example.items}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-stat-strip ${attrs}></gob-stat-strip>\n`;
}
