import type { BannerTone, BannerVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type BannerExample = {
  id: string;
  title: string;
  description: string;
  variant: BannerVariant;
  tone?: BannerTone;
  bannerTitle?: string;
  bannerDescription?: string;
  action?: string;
  dismissible?: boolean;
};

export const BANNER_EXAMPLES: BannerExample[] = [
  { id: 'basic', title: 'Básico', description: 'Aviso de sistema a ancho completo.', variant: 'basic', tone: 'info', bannerTitle: 'Mantenimiento programado', bannerDescription: 'El sabado de 02:00 a 04:00 habra una pausa breve del servicio.', action: 'Ver detalle', dismissible: true },
  { id: 'soft', title: 'Suave', description: 'Fondo tintado institucional.', variant: 'soft', tone: 'success', bannerTitle: 'Servicio restablecido', bannerDescription: 'La bandeja de trámites ya opera con normalidad.', action: 'Continuar' },
  { id: 'solid', title: 'Solido', description: 'Alto contraste para urgencias.', variant: 'solid', tone: 'danger', bannerTitle: 'Interrupcion critica', bannerDescription: 'Algunas consultas estan temporalmente fuera de línea.', action: 'Estado' },
  { id: 'outline', title: 'Contorno', description: 'Sin relleno fuerte.', variant: 'outline', tone: 'warning', bannerTitle: 'Documentos por vencer', bannerDescription: '3 expedientes requieren actualizacion esta semana.', action: 'Revisar' },
  { id: 'dense', title: 'Denso', description: 'Altura compacta.', variant: 'dense', tone: 'neutral', bannerTitle: 'Modo de solo lectura', bannerDescription: 'Tu rol actual no permite editar este catálogo.' },
  { id: 'promo', title: 'Promocional', description: 'Acento dorado para campanas.', variant: 'promo', tone: 'brand', bannerTitle: 'Nueva guía ciudadana', bannerDescription: 'Descarga el manual actualizado de trámites 2026.', action: 'Descargar' },
  { id: 'sticky', title: 'Fijo', description: 'Borde a borde para cabeceras.', variant: 'sticky', tone: 'brand', bannerTitle: 'Sesion institucional activa', bannerDescription: 'Recuerda cerrar sesion al terminar tu jornada.', dismissible: true },
  { id: 'centered', title: 'Centrado', description: 'Contenido alineado al centro.', variant: 'centered', tone: 'info', bannerTitle: 'Encuesta de satisfaccion', bannerDescription: 'Ayudanos a mejorar el portal con 2 minutos de tu tiempo.', action: 'Responder' },
  { id: 'split', title: 'Dividido', description: 'Riel de acento lateral.', variant: 'split', tone: 'info', bannerTitle: 'Actualizacion disponible', bannerDescription: 'Hay una nueva version del catálogo de componentes.', action: 'Actualizar', dismissible: true },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', tone: 'brand', bannerTitle: 'Aviso oficial', bannerDescription: 'Este banner usa el acento dorado del sistema de diseno.', action: 'Entendido', dismissible: true },
];

export const BANNER_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | solid | outline | dense | promo | sticky | centered | split | complete' },
  { name: 'tone', type: 'string', defaultValue: 'info', body: 'info | success | warning | danger | neutral | brand' },
  { name: 'title', type: 'string', defaultValue: 'Aviso del sistema', body: 'Título del banner.' },
  { name: 'description', type: 'string', defaultValue: 'â€”', body: 'Texto de apoyo.' },
  { name: 'action', type: 'string', defaultValue: 'â€”', body: 'Etiqueta del botón.' },
  { name: 'dismissible', type: 'boolean', defaultValue: 'false', body: 'Muestra cierre.' },
] as const;

export function buildSnippet(lang: CodeLang, example: BannerExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.tone ? `tone="${example.tone}"` : null,
    example.bannerTitle ? `title="${example.bannerTitle}"` : null,
    example.bannerDescription ? `description="${example.bannerDescription}"` : null,
    example.action ? `action="${example.action}"` : null,
    example.dismissible ? 'dismissible' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-banner ${attrs}></gob-banner>\n`;
}
