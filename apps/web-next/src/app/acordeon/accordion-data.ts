import type { AccordionVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type AccordionExample = {
  id: string;
  title: string;
  description: string;
  variant: AccordionVariant;
  openIndex?: number;
  items?: Array<{ title: string; body: string }>;
};

const FAQ_ITEMS = [
  { title: 'Que documentos necesito?', body: 'CURP, identificacion oficial y comprobante de domicilio vigentes.' },
  { title: 'Cuanto tarda el trámite?', body: 'El tiempo promedio de resolucion es de 5 a 10 dias habiles.' },
  { title: 'Puedo dar seguimiento en línea?', body: 'Si. Con el folio puedes consultar el estatus en la bandeja ciudadana.' },
];

export const ACCORDION_EXAMPLES: AccordionExample[] = [
  { id: 'basic', title: 'Básico', description: 'Paneles expandibles.', variant: 'basic', items: FAQ_ITEMS, openIndex: 0 },
  { id: 'soft', title: 'Suave', description: 'Fondo fill.', variant: 'soft', items: FAQ_ITEMS, openIndex: 1 },
  { id: 'outline', title: 'Contorno', description: 'Borde con acento vino.', variant: 'outline', items: FAQ_ITEMS, openIndex: 0 },
  { id: 'dense', title: 'Denso', description: 'Padding compacto.', variant: 'dense', items: FAQ_ITEMS, openIndex: 0 },
  { id: 'flush', title: 'Flush', description: 'Sin radios laterales.', variant: 'flush', items: FAQ_ITEMS, openIndex: 0 },
  { id: 'separated', title: 'Separado', description: 'Mayor espacio entre items.', variant: 'separated', items: FAQ_ITEMS, openIndex: 2 },
  { id: 'brand', title: 'Marca', description: 'Acento vino al abrir.', variant: 'brand', items: FAQ_ITEMS, openIndex: 0 },
  { id: 'faq', title: 'FAQ', description: 'Prefijo de pregunta.', variant: 'faq', items: FAQ_ITEMS, openIndex: 0 },
  { id: 'single', title: 'Uno abierto', description: 'Solo un panel a la vez.', variant: 'single', items: FAQ_ITEMS, openIndex: 0 },
  { id: 'complete', title: 'Completo', description: 'Riel dorado al abrir.', variant: 'complete', items: FAQ_ITEMS, openIndex: 0 },
];

export const ACCORDION_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | outline | dense | flush | separated | brand | faq | single | complete' },
  { name: 'items', type: 'json', defaultValue: '[â€¦]', body: 'Arreglo { title, body }.' },
  { name: 'open-index', type: 'number', defaultValue: '0', body: 'Panel abierto inicial.' },
] as const;

export function buildSnippet(lang: CodeLang, example: AccordionExample): string {
  const items = JSON.stringify(example.items ?? FAQ_ITEMS).replace(/"/g, '&quot;');
  const attrs = [
    `variant="${example.variant}"`,
    `items="${items}"`,
    example.openIndex != null ? `open-index="${example.openIndex}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-accordion ${attrs}></gob-accordion>\n`;
}
