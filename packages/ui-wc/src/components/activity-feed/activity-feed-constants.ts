export const ACTIVITY_FEED_VARIANTS = [
  'basic',
  'avatar',
  'actions',
  'dense',
  'grouped',
  'unread',
  'complete',
  'status',
  'icon',
  'cards',
  'mentions',
  'files',
  'empty',
] as const;

export type ActivityFeedVariant = (typeof ACTIVITY_FEED_VARIANTS)[number];

export const ACTIVITY_FEED_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type ActivityFeedTone = (typeof ACTIVITY_FEED_TONES)[number];

export const ACTIVITY_FEED_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

export function resolveActivityFeedVariant(
  value: string | null,
): ActivityFeedVariant {
  if (
    value === 'avatar' ||
    value === 'actions' ||
    value === 'dense' ||
    value === 'grouped' ||
    value === 'unread' ||
    value === 'complete' ||
    value === 'status' ||
    value === 'icon' ||
    value === 'cards' ||
    value === 'mentions' ||
    value === 'files' ||
    value === 'empty'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveActivityFeedTone(
  value: string | null,
): ActivityFeedTone {
  if (
    value === 'accent' ||
    value === 'dark' ||
    value === 'neutral' ||
    value === 'soft' ||
    value === 'primary'
  ) {
    return value;
  }
  return 'primary';
}

export const activityFeedLightDomStyles = `
gob-activity-feed {
  /* Marca fija: vino + cafe */
  --gob-af-vino: #9f2141;
  --gob-af-vino-soft: rgba(159, 33, 65, 0.12);
  --gob-af-vino-mid: rgba(159, 33, 65, 0.22);
  --gob-af-cafe: #bc945a;
  --gob-af-cafe-soft: rgba(188, 148, 90, 0.18);
  --gob-af-cafe-mid: rgba(188, 148, 90, 0.38);
  --gob-af-accent: var(--gob-af-vino);
  --gob-af-accent-soft: var(--gob-af-vino-soft);
  --gob-af-accent-text: var(--gob-af-vino);
  --gob-af-title: #181511;
  --gob-af-muted: #8a8278;
  --gob-af-text: #6b665f;
  --gob-af-border: rgba(24, 21, 17, 0.08);
  --gob-af-hover: #ffffff;
  --gob-af-unread: #ffffff;
  --gob-af-surface: #ffffff;
  --gob-af-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-af-pad-y: 14px;
  --gob-af-pad-x: 16px;
}
gob-activity-feed[tone='accent'] {
  --gob-af-accent: var(--gob-af-cafe);
  --gob-af-accent-soft: var(--gob-af-cafe-soft);
  --gob-af-accent-text: #7a5a2e;
}
gob-activity-feed[tone='dark'] {
  --gob-af-vino: #ffffff;
  --gob-af-cafe: #e0c59a;
  --gob-af-vino-soft: rgba(255, 255, 255, 0.12);
  --gob-af-cafe-soft: rgba(224, 197, 154, 0.18);
  --gob-af-accent: #ffffff;
  --gob-af-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-af-accent-text: #ffffff;
  --gob-af-title: #ffffff;
  --gob-af-muted: rgba(255, 255, 255, 0.5);
  --gob-af-text: rgba(255, 255, 255, 0.72);
  --gob-af-border: rgba(255, 255, 255, 0.1);
  --gob-af-hover: rgba(255, 255, 255, 0.06);
  --gob-af-unread: rgba(255, 255, 255, 0.08);
  --gob-af-surface: rgba(255, 255, 255, 0.06);
}
gob-activity-feed[variant='dense'] {
  --gob-af-pad-y: 10px;
  --gob-af-pad-x: 12px;
}

gob-activity-feed .gob-af-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: var(--gob-af-pad-y) var(--gob-af-pad-x);
  border: 0;
  border-bottom: 1px solid var(--gob-af-border);
  background: var(--gob-af-surface);
  color: inherit;
  font-family: var(--gob-af-font);
  text-align: left;
  transition: background 160ms ease, box-shadow 160ms ease;
}
gob-activity-feed .gob-af-item:last-child {
  border-bottom: 0;
}
gob-activity-feed .gob-af-item:hover {
  background: var(--gob-af-hover);
  box-shadow: inset 3px 0 0 var(--gob-af-cafe);
}
gob-activity-feed .gob-af-item[data-unread='true'] {
  background: var(--gob-af-unread);
  box-shadow: inset 3px 0 0 var(--gob-af-vino);
}
gob-activity-feed .gob-af-item[data-unread='true']:hover {
  box-shadow: inset 3px 0 0 var(--gob-af-vino);
}

/* Avatar: alterna vino / cafe */
gob-activity-feed .gob-af-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: var(--gob-af-vino-soft);
  color: var(--gob-af-vino);
  border: 1.5px solid color-mix(in srgb, var(--gob-af-vino) 16%, transparent);
  font-size: 12px;
  font-weight: 700;
  flex: 0 0 auto;
  transition: transform 160ms ease, background 160ms ease, color 160ms ease;
}
gob-activity-feed .gob-af-item:nth-child(even of .gob-af-item) .gob-af-avatar {
  background: var(--gob-af-cafe-soft);
  color: #7a5a2e;
  border-color: color-mix(in srgb, var(--gob-af-cafe) 28%, transparent);
}
gob-activity-feed .gob-af-item:hover .gob-af-avatar {
  transform: scale(1.04);
}
gob-activity-feed[variant='dense'] .gob-af-avatar {
  width: 30px;
  height: 30px;
  font-size: 11px;
}

/* Dot: alterna vino / cafe */
gob-activity-feed .gob-af-dot {
  width: 9px;
  height: 9px;
  margin-top: 8px;
  border-radius: 999px;
  background: var(--gob-af-vino);
  border: 2px solid #fff;
  box-shadow: 0 0 0 3px var(--gob-af-vino-soft);
  flex: 0 0 auto;
}
gob-activity-feed .gob-af-item:nth-child(even of .gob-af-item) .gob-af-dot {
  background: var(--gob-af-cafe);
  box-shadow: 0 0 0 3px var(--gob-af-cafe-soft);
}
gob-activity-feed .gob-af-item[data-unread='true'] .gob-af-dot {
  background: var(--gob-af-vino);
  box-shadow: 0 0 0 3px var(--gob-af-vino-soft);
}

gob-activity-feed .gob-af-body {
  display: grid;
  gap: 4px;
  min-width: 0;
  flex: 1 1 auto;
}
gob-activity-feed .gob-af-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}
gob-activity-feed .gob-af-primary {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--gob-af-title);
}
gob-activity-feed .gob-af-primary strong {
  font-weight: 700;
  color: var(--gob-af-vino);
}
gob-activity-feed .gob-af-item:nth-child(even of .gob-af-item) .gob-af-primary strong {
  color: #7a5a2e;
}
gob-activity-feed[tone='dark'] .gob-af-primary strong,
gob-activity-feed[tone='dark'] .gob-af-item:nth-child(even of .gob-af-item) .gob-af-primary strong {
  color: var(--gob-af-cafe);
}
gob-activity-feed .gob-af-secondary {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-af-text);
}
gob-activity-feed .gob-af-meta {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-af-cafe);
  white-space: nowrap;
  flex: 0 0 auto;
}

/* Semaforo institucional */
gob-activity-feed .gob-af-pill {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  background: var(--gob-af-vino-soft);
  color: var(--gob-af-vino);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
  flex: 0 0 auto;
}
gob-activity-feed .gob-af-pill[data-status='alta'],
gob-activity-feed .gob-af-pill[data-tone='info'] {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
}
gob-activity-feed .gob-af-pill[data-status='revision'],
gob-activity-feed .gob-af-pill[data-tone='warning'] {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
}
gob-activity-feed .gob-af-pill[data-status='cerrado'],
gob-activity-feed .gob-af-pill[data-tone='success'] {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
}
gob-activity-feed .gob-af-pill[data-status='rechazado'],
gob-activity-feed .gob-af-pill[data-tone='danger'] {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
}
gob-activity-feed[tone='dark'] .gob-af-pill[data-status='alta'],
gob-activity-feed[tone='dark'] .gob-af-pill[data-tone='info'] {
  background: rgba(47, 95, 138, 0.28);
  color: #9ec0e0;
}
gob-activity-feed[tone='dark'] .gob-af-pill[data-status='revision'],
gob-activity-feed[tone='dark'] .gob-af-pill[data-tone='warning'] {
  background: rgba(208, 146, 26, 0.28);
  color: #f0c56a;
}
gob-activity-feed[tone='dark'] .gob-af-pill[data-status='cerrado'],
gob-activity-feed[tone='dark'] .gob-af-pill[data-tone='success'] {
  background: rgba(31, 138, 85, 0.28);
  color: #7dcea0;
}
gob-activity-feed[tone='dark'] .gob-af-pill[data-status='rechazado'],
gob-activity-feed[tone='dark'] .gob-af-pill[data-tone='danger'] {
  background: rgba(198, 40, 40, 0.28);
  color: #f0a0a0;
}

gob-activity-feed .gob-af-action {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--gob-af-cafe) 40%, transparent);
  background: #ffffff;
  color: var(--gob-af-title);
  font-family: var(--gob-af-font);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  flex: 0 0 auto;
  transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
}
gob-activity-feed .gob-af-action:hover {
  background: var(--gob-af-vino);
  color: #fff;
  border-color: transparent;
}
gob-activity-feed[tone='dark'] .gob-af-action {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
}
gob-activity-feed[tone='dark'] .gob-af-action:hover {
  background: var(--gob-af-cafe);
  color: #181511;
}

gob-activity-feed .gob-af-group {
  display: block;
  padding: 12px 16px 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--gob-af-cafe);
  background: #ffffff;
  border-bottom: 1px solid var(--gob-af-border);
}
gob-activity-feed[tone='dark'] .gob-af-group {
  background: transparent;
}

gob-activity-feed[variant='status'] .gob-af-head,
gob-activity-feed[variant='complete'] .gob-af-head,
gob-activity-feed[variant='unread'] .gob-af-head {
  margin-bottom: 0;
}

/* Icono de tipo */
gob-activity-feed .gob-af-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: var(--gob-af-vino-soft);
  color: var(--gob-af-vino);
  border: 1.5px solid color-mix(in srgb, var(--gob-af-vino) 16%, transparent);
  flex: 0 0 auto;
  transition: transform 160ms ease, background 160ms ease, color 160ms ease;
}
gob-activity-feed .gob-af-item:nth-child(even of .gob-af-item) .gob-af-icon {
  background: var(--gob-af-cafe-soft);
  color: #7a5a2e;
  border-color: color-mix(in srgb, var(--gob-af-cafe) 28%, transparent);
}
gob-activity-feed .gob-af-item:hover .gob-af-icon {
  transform: scale(1.04);
  background: var(--gob-af-vino);
  color: #fff;
  border-color: transparent;
}
gob-activity-feed .gob-af-item:nth-child(even of .gob-af-item):hover .gob-af-icon {
  background: var(--gob-af-cafe);
  color: #fff;
}
gob-activity-feed[tone='dark'] .gob-af-item:hover .gob-af-icon {
  color: #181511;
}

/* Tarjetas */
gob-activity-feed[variant='cards'] {
  --gob-af-pad-y: 0;
  --gob-af-pad-x: 0;
}
gob-activity-feed[variant='cards'] .root,
gob-activity-feed[variant='cards'] {
  gap: 0;
}
gob-activity-feed[variant='cards'] .gob-af-item {
  margin: 10px 12px;
  padding: 14px 14px;
  border: 1px solid color-mix(in srgb, var(--gob-af-cafe) 28%, transparent);
  border-radius: 14px;
  border-bottom: 1px solid color-mix(in srgb, var(--gob-af-cafe) 28%, transparent);
  background: #ffffff;
  box-shadow: none;
}
gob-activity-feed[variant='cards'] .gob-af-item:last-child {
  margin-bottom: 12px;
}
gob-activity-feed[variant='cards'] .gob-af-item:hover {
  border-color: color-mix(in srgb, var(--gob-af-vino) 22%, var(--gob-af-cafe));
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(24, 21, 17, 0.06);
}
gob-activity-feed[tone='dark'][variant='cards'] .gob-af-item {
  background: rgba(255, 255, 255, 0.06);
}

/* Menciones */
gob-activity-feed .gob-af-mention {
  display: inline;
  padding: 1px 6px;
  border-radius: 6px;
  background: var(--gob-af-cafe-soft);
  color: #7a5a2e;
  font-weight: 700;
}
gob-activity-feed[variant='mentions'] .gob-af-primary strong {
  color: var(--gob-af-vino);
}

/* Archivos / adjuntos */
gob-activity-feed .gob-af-file {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-top: 2px;
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--gob-af-cafe) 32%, transparent);
  background: #ffffff;
  color: var(--gob-af-title);
  font-size: 11px;
  font-weight: 600;
}
gob-activity-feed .gob-af-file svg,
gob-activity-feed .gob-af-file i {
  color: var(--gob-af-vino);
  flex: 0 0 auto;
}
gob-activity-feed .gob-af-item:nth-child(even of .gob-af-item) .gob-af-file svg,
gob-activity-feed .gob-af-item:nth-child(even of .gob-af-item) .gob-af-file i {
  color: #7a5a2e;
}

/* Vacio */
gob-activity-feed .gob-af-empty {
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 36px 24px;
  text-align: center;
  background: #ffffff;
}
gob-activity-feed .gob-af-empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: var(--gob-af-vino-soft);
  color: var(--gob-af-vino);
  border: 1.5px solid color-mix(in srgb, var(--gob-af-vino) 14%, transparent);
}
gob-activity-feed .gob-af-empty-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gob-af-title);
}
gob-activity-feed .gob-af-empty-desc {
  margin: 0;
  max-width: 32ch;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-af-text);
}
`;
