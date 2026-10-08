import type { FooterVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type FooterExample = {
  id: string;
  title: string;
  description: string;
  variant: FooterVariant;
  brand?: string;
  tagline?: string;
  links?: string;
  legal?: string;
};

export const FOOTER_EXAMPLES: FooterExample[] = [
  { id: 'basic', title: 'Basico', description: 'Pie institucional estandar.', variant: 'basic' },
  { id: 'soft', title: 'Suave', description: 'Fondo fill.', variant: 'soft', brand: 'GobMX', tagline: 'Servicios digitales para la ciudadania.' },
  { id: 'dense', title: 'Denso', description: 'Compacto para apps.', variant: 'dense', brand: 'Portal interno', tagline: 'Operacion diaria del area.' },
  { id: 'outline', title: 'Contorno', description: 'Acento vino lateral.', variant: 'outline' },
  { id: 'columns', title: 'Columnas', description: 'Enlaces en rejilla.', variant: 'columns', links: 'Tramites|Normativa|Datos abiertos|Contacto|Privacidad|Accesibilidad' },
  { id: 'legal', title: 'Legal', description: 'Enfasis en aviso legal.', variant: 'legal', legal: 'Este sitio es oficial. La informacion personal se trata conforme al aviso de privacidad vigente.' },
  { id: 'compact', title: 'Compacto', description: 'Solo marca y enlaces.', variant: 'compact', brand: 'GobMX', links: 'Inicio|Tramites|Ayuda' },
  { id: 'wide', title: 'Amplio', description: 'Mas aire y tipografia mayor.', variant: 'wide' },
  { id: 'brand', title: 'Marca', description: 'Panel vino institucional.', variant: 'brand', brand: 'Gobierno de Mexico', tagline: 'Informacion oficial al alcance de todos.' },
  { id: 'complete', title: 'Completo', description: 'Cierre con acento dorado.', variant: 'complete', brand: 'GobMX Oficial', tagline: 'Pie de cierre para landings y campanas.' },
];

export const FOOTER_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | dense | outline | columns | legal | compact | wide | brand | complete' },
  { name: 'brand', type: 'string', defaultValue: 'Gobierno de Mexico', body: 'Nombre de marca.' },
  { name: 'tagline', type: 'string', defaultValue: '—', body: 'Texto de apoyo.' },
  { name: 'links', type: 'string', defaultValue: 'Tramites|…', body: 'Enlaces separados por |.' },
  { name: 'legal', type: 'string', defaultValue: '© …', body: 'Linea legal inferior.' },
] as const;

export function buildSnippet(lang: CodeLang, example: FooterExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.brand ? `brand="${example.brand}"` : null,
    example.tagline ? `tagline="${example.tagline}"` : null,
    example.links ? `links="${example.links}"` : null,
    example.legal ? `legal="${example.legal}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-footer ${attrs}></gob-footer>\n`;
}
