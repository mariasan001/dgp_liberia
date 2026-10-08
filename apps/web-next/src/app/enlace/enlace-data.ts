import type { LinkSize, LinkTone, LinkVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export type EnlaceExample = {
  id: string;
  title: string;
  description: string;
  variant: LinkVariant;
  tone?: LinkTone;
  size?: LinkSize;
  href?: string;
  label?: string;
  external?: boolean;
  disabled?: boolean;
};

export const ENLACE_EXAMPLES: EnlaceExample[] = [
  { id: 'basic', title: 'Básico', description: 'Enlace tipografico institucional.', variant: 'basic', label: 'Consultar trámite' },
  { id: 'inline', title: 'En línea', description: 'Subrayado fijo para pÃ¡rrafos.', variant: 'inline', label: 'aviso de privacidad' },
  { id: 'underline', title: 'Subrayado', description: 'Subrayado suave que se refuerza al hover.', variant: 'underline', label: 'Ver requisitos' },
  { id: 'subtle', title: 'Sutil', description: 'Menos contraste para contexto secundario.', variant: 'subtle', label: 'Mas información' },
  { id: 'strong', title: 'Fuerte', description: 'Peso tipografico alto.', variant: 'strong', label: 'Continuar al portal' },
  { id: 'soft', title: 'Suave', description: 'Pill con fondo vino suave.', variant: 'soft', label: 'Ir al catálogo' },
  { id: 'external', title: 'Externo', description: 'Abre en pestaÃ±a nueva con icono.', variant: 'external', href: 'https://www.gob.mx', label: 'Ir a gob.mx', external: true },
  { id: 'nav', title: 'Navegación', description: 'Con flecha para flujos internos.', variant: 'nav', label: 'Siguiente sección' },
  { id: 'muted', title: 'Atenuado', description: 'Tono neutro para pies o metadatos.', variant: 'muted', label: 'Politica de uso' },
  { id: 'complete', title: 'Completo', description: 'Marco con riel dorado institucional.', variant: 'complete', label: 'Descargar guía PDF', external: true },
  { id: 'danger', title: 'Tono peligro', description: 'Acento de alerta en el enlace.', variant: 'basic', tone: 'danger', label: 'Reportar incidencia' },
  { id: 'sm', title: 'PequeÃ±o', description: 'TamaÃ±o compacto.', variant: 'basic', size: 'sm', label: 'Detalle' },
  { id: 'lg', title: 'Grande', description: 'Mayor presencia tipografica.', variant: 'nav', size: 'lg', label: 'Explorar servicios' },
  { id: 'disabled', title: 'Deshabilitado', description: 'Sin interaccion.', variant: 'basic', label: 'No disponible', disabled: true },
];

export const ENLACE_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | inline | subtle | underline | strong | soft | external | nav | muted | complete' },
  { name: 'tone', type: 'string', defaultValue: 'primary', body: 'primary | neutral | success | warning | danger' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'href', type: 'string', defaultValue: '#', body: 'URL de destino.' },
  { name: 'label', type: 'string', defaultValue: 'Enlace', body: 'Texto visible del enlace.' },
  { name: 'external', type: 'boolean', defaultValue: 'false', body: 'Abre en pestaÃ±a nueva con rel seguro.' },
  { name: 'disabled', type: 'boolean', defaultValue: 'false', body: 'Bloquea la interaccion.' },
] as const;

export function buildSnippet(lang: CodeLang, example: EnlaceExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.tone && example.tone !== 'primary' ? `tone="${example.tone}"` : null,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    `href="${example.href ?? '#'}"`,
    `label="${example.label ?? 'Enlace'}"`,
    example.external ? 'external' : null,
    example.disabled ? 'disabled' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-link ${attrs}></gob-link>\n`;
}
