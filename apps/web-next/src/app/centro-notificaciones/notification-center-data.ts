import type { NotificationCenterVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type NotificationCenterExample = {
  id: string;
  title: string;
  description: string;
  variant: NotificationCenterVariant;
  centerTitle?: string;
  items?: string;
};

export const NOTIFICATION_CENTER_EXAMPLES: NotificationCenterExample[] = [
  { id: 'basic', title: 'Basico', description: 'Panel de avisos estandar.', variant: 'basic' },
  { id: 'soft', title: 'Suave', description: 'Fondo fill.', variant: 'soft', centerTitle: 'Avisos' },
  { id: 'dense', title: 'Denso', description: 'Compacto para topbar.', variant: 'dense' },
  { id: 'outline', title: 'Contorno', description: 'Borde con acento.', variant: 'outline' },
  { id: 'unread', title: 'No leidos', description: 'Enfasis en unread.', variant: 'unread' },
  { id: 'compact', title: 'Compacto', description: 'Solo titulo y hora.', variant: 'compact' },
  { id: 'panel', title: 'Panel', description: 'Elevacion fuerte.', variant: 'panel', centerTitle: 'Centro de avisos' },
  { id: 'feed', title: 'Feed', description: 'Lista sin marco.', variant: 'feed' },
  { id: 'brand', title: 'Marca', description: 'Panel vino.', variant: 'brand' },
  { id: 'complete', title: 'Completo', description: 'Acento dorado.', variant: 'complete' },
];

export const NOTIFICATION_CENTER_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | dense | outline | unread | compact | panel | feed | brand | complete' },
  { name: 'title', type: 'string', defaultValue: 'Notificaciones', body: 'Titulo del panel.' },
  { name: 'items', type: 'string', defaultValue: 'title~body~time~unread|…', body: 'Avisos separados por |.' },
] as const;

export function buildSnippet(lang: CodeLang, example: NotificationCenterExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.centerTitle ? `title="${example.centerTitle}"` : null,
    example.items ? `items="${example.items}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-notification-center ${attrs}></gob-notification-center>\n`;
}
