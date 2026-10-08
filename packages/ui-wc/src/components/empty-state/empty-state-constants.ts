export const EMPTY_STATE_VARIANTS = [
  'basic',
  'icon',
  'actions',
  'search',
  'error',
  'dense',
  'complete',
  'filter',
  'permission',
  'success',
  'upload',
  'inline',
] as const;

export type EmptyStateVariant = (typeof EMPTY_STATE_VARIANTS)[number];

export const EMPTY_STATE_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type EmptyStateTone = (typeof EMPTY_STATE_TONES)[number];

export const EMPTY_STATE_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

export function resolveEmptyStateVariant(
  value: string | null,
): EmptyStateVariant {
  if (
    value === 'icon' ||
    value === 'actions' ||
    value === 'search' ||
    value === 'error' ||
    value === 'dense' ||
    value === 'complete' ||
    value === 'filter' ||
    value === 'permission' ||
    value === 'success' ||
    value === 'upload' ||
    value === 'inline'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveEmptyStateTone(value: string | null): EmptyStateTone {
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

export const emptyStateLightDomStyles = `
gob-empty-state {
  /* Marca fija: vino + dorado (cafe) */
  --gob-es-vino: #9f2141;
  --gob-es-vino-soft: rgba(159, 33, 65, 0.12);
  --gob-es-dorado: #bc945a;
  --gob-es-dorado-soft: rgba(188, 148, 90, 0.18);
  --gob-es-accent: var(--gob-es-vino);
  --gob-es-accent-soft: var(--gob-es-vino-soft);
  --gob-es-accent-text: var(--gob-es-vino);
  --gob-es-title: #181511;
  --gob-es-muted: #8a8278;
  --gob-es-text: #6b665f;
  --gob-es-border: rgba(24, 21, 17, 0.08);
  --gob-es-surface: #ffffff;
  --gob-es-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
}
gob-empty-state[tone='accent'] {
  --gob-es-accent: var(--gob-es-dorado);
  --gob-es-accent-soft: var(--gob-es-dorado-soft);
  --gob-es-accent-text: #7a5a2e;
}
gob-empty-state[tone='dark'] {
  --gob-es-vino: #ffffff;
  --gob-es-dorado: #e0c59a;
  --gob-es-vino-soft: rgba(255, 255, 255, 0.12);
  --gob-es-dorado-soft: rgba(224, 197, 154, 0.18);
  --gob-es-accent: #ffffff;
  --gob-es-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-es-accent-text: #ffffff;
  --gob-es-title: #ffffff;
  --gob-es-muted: rgba(255, 255, 255, 0.5);
  --gob-es-text: rgba(255, 255, 255, 0.72);
  --gob-es-border: rgba(255, 255, 255, 0.12);
  --gob-es-surface: transparent;
}

gob-empty-state .gob-es-inner {
  display: grid;
  gap: 12px;
  place-items: center;
  text-align: center;
  font-family: var(--gob-es-font);
  max-width: 38ch;
  margin: 0 auto;
}
gob-empty-state .gob-es-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: var(--gob-es-vino-soft);
  color: var(--gob-es-vino);
  border: 1.5px solid color-mix(in srgb, var(--gob-es-vino) 16%, transparent);
  box-shadow: 0 0 0 6px var(--gob-es-dorado-soft);
  transition: transform 180ms ease, background 180ms ease, color 180ms ease;
}
gob-empty-state .gob-es-icon:hover {
  transform: scale(1.04);
  background: var(--gob-es-vino);
  color: #fff;
  border-color: transparent;
}
gob-empty-state[variant='dense'] .gob-es-icon {
  width: 40px;
  height: 40px;
  box-shadow: 0 0 0 4px var(--gob-es-dorado-soft);
}
gob-empty-state .gob-es-eyebrow {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gob-es-dorado);
}
gob-empty-state .gob-es-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--gob-es-title);
}
gob-empty-state[variant='dense'] .gob-es-title {
  font-size: 14px;
}
gob-empty-state .gob-es-desc {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--gob-es-text);
}

/* Semaforo institucional en pills */
gob-empty-state .gob-es-pill {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--gob-es-vino-soft);
  color: var(--gob-es-vino);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
}
gob-empty-state .gob-es-pill[data-status='alta'],
gob-empty-state .gob-es-pill[data-tone='info'] {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
}
gob-empty-state .gob-es-pill[data-status='revision'],
gob-empty-state .gob-es-pill[data-tone='warning'] {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
}
gob-empty-state .gob-es-pill[data-status='cerrado'],
gob-empty-state .gob-es-pill[data-tone='success'] {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
}
gob-empty-state .gob-es-pill[data-status='rechazado'],
gob-empty-state .gob-es-pill[data-tone='danger'] {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
}

gob-empty-state .gob-es-actions {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 6px;
}
gob-empty-state .gob-es-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--gob-es-dorado) 42%, transparent);
  background: #ffffff;
  color: var(--gob-es-title);
  font-family: var(--gob-es-font);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
}
gob-empty-state .gob-es-btn:hover {
  border-color: var(--gob-es-dorado);
  color: #7a5a2e;
}
gob-empty-state .gob-es-btn-primary {
  border-color: transparent;
  background: var(--gob-es-vino);
  color: #fff;
}
gob-empty-state .gob-es-btn-primary:hover {
  background: #861a36;
  color: #fff;
}
gob-empty-state[tone='dark'] .gob-es-btn {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.22);
}
gob-empty-state[tone='dark'] .gob-es-btn-primary {
  background: var(--gob-es-dorado);
  color: #181511;
}

gob-empty-state .gob-es-hints {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-top: 2px;
}
gob-empty-state .gob-es-hint {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--gob-es-dorado-soft);
  color: #7a5a2e;
  font-size: 11px;
  font-weight: 600;
}

/* Variantes de semaforo / tipo */
gob-empty-state[variant='error'] .gob-es-icon {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
  border-color: rgba(198, 40, 40, 0.18);
  box-shadow: 0 0 0 6px rgba(198, 40, 40, 0.08);
}
gob-empty-state[variant='search'] .gob-es-icon,
gob-empty-state[variant='filter'] .gob-es-icon {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
  border-color: rgba(47, 95, 138, 0.16);
  box-shadow: 0 0 0 6px rgba(47, 95, 138, 0.08);
}
gob-empty-state[variant='permission'] .gob-es-icon {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
  border-color: rgba(208, 146, 26, 0.22);
  box-shadow: 0 0 0 6px rgba(208, 146, 26, 0.1);
}
gob-empty-state[variant='success'] .gob-es-icon {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
  border-color: rgba(31, 138, 85, 0.18);
  box-shadow: 0 0 0 6px rgba(31, 138, 85, 0.08);
}
gob-empty-state[variant='upload'] .gob-es-icon {
  background: var(--gob-es-dorado-soft);
  color: #7a5a2e;
  border-color: color-mix(in srgb, var(--gob-es-dorado) 28%, transparent);
  box-shadow: 0 0 0 6px var(--gob-es-vino-soft);
}

/* Inline: layout horizontal */
gob-empty-state[variant='inline'] .gob-es-inner {
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 14px;
  row-gap: 4px;
  text-align: left;
  place-items: start;
  max-width: 52ch;
}
gob-empty-state[variant='inline'] .gob-es-icon {
  grid-row: 1 / span 2;
  width: 44px;
  height: 44px;
  box-shadow: 0 0 0 4px var(--gob-es-dorado-soft);
  align-self: center;
}
gob-empty-state[variant='inline'] .gob-es-title {
  font-size: 14px;
}
gob-empty-state[variant='inline'] .gob-es-desc {
  font-size: 12px;
}
gob-empty-state[variant='inline'] .gob-es-actions {
  grid-column: 1 / -1;
  justify-content: flex-start;
  margin-top: 8px;
}

gob-empty-state[tone='dark'][variant='error'] .gob-es-icon,
gob-empty-state[tone='dark'][variant='search'] .gob-es-icon,
gob-empty-state[tone='dark'][variant='filter'] .gob-es-icon,
gob-empty-state[tone='dark'][variant='permission'] .gob-es-icon,
gob-empty-state[tone='dark'][variant='success'] .gob-es-icon {
  color: #fff;
}
`;
