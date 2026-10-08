import type { HeroBlockVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type HeroBlockExample = {
  id: string;
  title: string;
  description: string;
  variant: HeroBlockVariant;
  eyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export const HERO_BLOCK_EXAMPLES: HeroBlockExample[] = [
  { id: 'basic', title: 'Basico', description: 'Hero editorial con media compuesto.', variant: 'basic', eyebrow: 'GobMX', heroTitle: 'Tramites sin filas', heroDescription: 'Inicia, sigue y concluye servicios digitales con claridad institucional.', primaryLabel: 'Iniciar tramite', secondaryLabel: 'Ver requisitos' },
  { id: 'soft', title: 'Suave', description: 'Fondo fill para contrastar sobre blanco.', variant: 'soft', eyebrow: 'Ciudadania', heroTitle: 'Tu folio, a la vista', heroDescription: 'Consulta estatus y notificaciones sin perder el hilo del expediente.' },
  { id: 'split', title: 'Dividido', description: 'Copy y media a ancho completo.', variant: 'split', eyebrow: 'Landing', heroTitle: 'Una puerta clara', heroDescription: 'El bloque principal de una pagina publica con jerarquia fuerte.' },
  { id: 'centered', title: 'Centrado', description: 'Mensaje unico al centro.', variant: 'centered', eyebrow: 'Campana', heroTitle: 'Gobierno que se entiende', heroDescription: 'Una promesa, dos acciones, cero ruido visual.' },
  { id: 'dense', title: 'Denso', description: 'Hero compacto para interiores.', variant: 'dense', eyebrow: 'Modulo', heroTitle: 'Bandeja operativa', heroDescription: 'Acceso rapido al flujo del dia.' },
  { id: 'outline', title: 'Contorno', description: 'Marco con acento vino.', variant: 'outline', eyebrow: 'Oficial', heroTitle: 'Informacion verificada', heroDescription: 'Contenido institucional con borde de confianza.' },
  { id: 'compact', title: 'Compacto', description: 'Sin media, solo mensaje y CTA.', variant: 'compact', eyebrow: 'Aviso', heroTitle: 'Actualiza tu perfil', heroDescription: 'Manten tus datos al dia para agilizar firmas y notificaciones.' },
  { id: 'feature', title: 'Feature', description: 'CTA con mas presencia.', variant: 'feature', eyebrow: 'Beneficio', heroTitle: 'Seguimiento en vivo', heroDescription: 'Recibe alertas al cambiar el estatus del tramite.', primaryLabel: 'Consultar folio', secondaryLabel: 'Como funciona' },
  { id: 'brand', title: 'Marca', description: 'Panel vino institucional.', variant: 'brand', eyebrow: 'Marca', heroTitle: 'Identidad GobMX', heroDescription: 'Hero de marca con contraste alto y CTAs claros.', primaryLabel: 'Explorar', secondaryLabel: 'Fundamentos' },
  { id: 'complete', title: 'Completo', description: 'Cierre premium con acento dorado.', variant: 'complete', eyebrow: 'Oficial', heroTitle: 'Listo para publicar', heroDescription: 'Hero de campana con remate dorado y CTA oscuro.', primaryLabel: 'Continuar', secondaryLabel: 'Mas tarde' },
];

export const HERO_BLOCK_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | split | centered | dense | outline | compact | feature | brand | complete' },
  { name: 'eyebrow', type: 'string', defaultValue: 'GobMX', body: 'Etiqueta superior.' },
  { name: 'title', type: 'string', defaultValue: 'Servicios…', body: 'Titulo principal.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Texto de apoyo.' },
  { name: 'primary-label', type: 'string', defaultValue: 'Iniciar tramite', body: 'CTA principal.' },
  { name: 'secondary-label', type: 'string', defaultValue: 'Ver requisitos', body: 'CTA secundario.' },
] as const;

export function buildSnippet(lang: CodeLang, example: HeroBlockExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.eyebrow ? `eyebrow="${example.eyebrow}"` : null,
    `title="${example.heroTitle ?? 'Hero'}"`,
    `description="${example.heroDescription ?? 'Descripcion'}"`,
    example.primaryLabel ? `primary-label="${example.primaryLabel}"` : null,
    example.secondaryLabel ? `secondary-label="${example.secondaryLabel}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-hero-block ${attrs}></gob-hero-block>\n`;
}
