import type { ToastTone, ToastVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type ToastExample = {
  id: string;
  title: string;
  description: string;
  variant: ToastVariant;
  tone?: ToastTone;
  toastTitle?: string;
  toastDescription?: string;
  action?: string;
  dismissible?: boolean;
  duration?: number;
};

export const TOAST_EXAMPLES: ToastExample[] = [
  {
    id: 'basic',
    title: 'Basico',
    description: 'Mensaje breve de sistema.',
    variant: 'basic',
    tone: 'info',
    toastTitle: 'Cambios guardados',
    toastDescription: 'La ficha se actualizo correctamente.',
    dismissible: true,
  },
  {
    id: 'success',
    title: 'Exito',
    description: 'Confirmacion positiva.',
    variant: 'soft',
    tone: 'success',
    toastTitle: 'Envio completado',
    toastDescription: 'El ciudadano recibira un correo.',
  },
  {
    id: 'warning',
    title: 'Advertencia',
    description: 'Aviso de atencion.',
    variant: 'outline',
    tone: 'warning',
    toastTitle: 'Sesion por expirar',
    toastDescription: 'Quedan 5 minutos de actividad.',
  },
  {
    id: 'danger',
    title: 'Error',
    description: 'Fallo de operacion.',
    variant: 'solid',
    tone: 'danger',
    toastTitle: 'No se pudo subir',
    toastDescription: 'El archivo supera 10 MB.',
    action: 'Reintentar',
  },
  {
    id: 'dense',
    title: 'Denso',
    description: 'Compacto para stacks.',
    variant: 'dense',
    tone: 'neutral',
    toastTitle: 'Filtros aplicados',
    toastDescription: '12 resultados visibles.',
  },
  {
    id: 'action',
    title: 'Con accion',
    description: 'Incluye CTA secundaria.',
    variant: 'action',
    tone: 'info',
    toastTitle: 'Elemento eliminado',
    toastDescription: 'Puedes deshacer durante unos segundos.',
    action: 'Deshacer',
  },
  {
    id: 'progress',
    title: 'Con progreso',
    description: 'Barra de tiempo visible.',
    variant: 'progress',
    tone: 'success',
    toastTitle: 'Publicado',
    toastDescription: 'El aviso se cerra solo.',
    duration: 0,
    dismissible: true,
  },
  {
    id: 'stacked',
    title: 'Apilado',
    description: 'Sugerencia visual de cola.',
    variant: 'stacked',
    tone: 'info',
    toastTitle: '3 avisos pendientes',
    toastDescription: 'Revisa la bandeja de notificaciones.',
  },
  {
    id: 'compact',
    title: 'Compacto',
    description: 'Solo titulo.',
    variant: 'compact',
    tone: 'success',
    toastTitle: 'Copiado al portapapeles',
  },
  {
    id: 'complete',
    title: 'Completo',
    description: 'Riel dorado + progreso.',
    variant: 'complete',
    tone: 'info',
    toastTitle: 'Revision lista',
    toastDescription: 'Acento institucional con barra temporal.',
    dismissible: true,
    duration: 0,
  },
];

export const TOAST_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | solid | outline | dense | action | progress | stacked | compact | complete' },
  { name: 'tone', type: 'string', defaultValue: 'info', body: 'info | success | warning | danger | neutral' },
  { name: 'title', type: 'string', defaultValue: 'Aviso', body: 'Titulo del toast.' },
  { name: 'description', type: 'string', defaultValue: '—', body: 'Texto de apoyo.' },
  { name: 'action', type: 'string', defaultValue: '—', body: 'Etiqueta de accion.' },
  { name: 'dismissible', type: 'boolean', defaultValue: 'false', body: 'Muestra cierre.' },
  { name: 'duration', type: 'number', defaultValue: '0', body: 'Autocierre en ms (progress/complete).' },
  { name: 'open', type: 'boolean', defaultValue: 'true', body: 'Controla visibilidad.' },
] as const;

export function buildSnippet(lang: CodeLang, example: ToastExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.tone ? `tone="${example.tone}"` : null,
    example.toastTitle ? `title="${example.toastTitle}"` : null,
    example.toastDescription ? `description="${example.toastDescription}"` : null,
    example.action ? `action="${example.action}"` : null,
    example.dismissible ? 'dismissible' : null,
    example.duration ? `duration="${example.duration}"` : null,
    'open',
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-toast ${attrs}></gob-toast>\n`;
}
