export const NOTIFICATION_CENTER_VARIANTS = [
  'basic',
  'soft',
  'dense',
  'outline',
  'unread',
  'compact',
  'panel',
  'feed',
  'brand',
  'complete',
] as const;

export type NotificationCenterVariant =
  (typeof NOTIFICATION_CENTER_VARIANTS)[number];

export const NOTIFICATION_CENTER_OBSERVED_ATTRIBUTES = [
  'variant',
  'title',
  'items',
] as const;

export function resolveNotificationCenterVariant(
  value: string | null,
): NotificationCenterVariant {
  if (
    (NOTIFICATION_CENTER_VARIANTS as readonly string[]).includes(value ?? '')
  ) {
    return value as NotificationCenterVariant;
  }
  return 'basic';
}

/** Formato: title~body~time~unread|... */
export function parseNotificationItems(
  value: string | null,
): { title: string; body: string; time: string; unread: boolean }[] {
  const raw = value?.trim();
  const source =
    raw ||
    'Folio actualizado~Tu solicitud cambio a En revision~hace 2 min~1|Firma pendiente~El expediente 4821 espera tu firma~hace 1 h~1|Mantenimiento~Ventana el sabado 02:00-04:00~ayer~0';
  return source
    .split('|')
    .map((part) => {
      const [title = 'Aviso', body = '', time = 'ahora', unread = '0'] = part
        .split('~')
        .map((chunk) => chunk.trim());
      return {
        title,
        body,
        time,
        unread: unread === '1' || unread.toLowerCase() === 'true',
      };
    })
    .filter((item) => item.title)
    .slice(0, 8);
}
