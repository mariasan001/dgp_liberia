export const TOOLBAR_VARIANTS = [
  'basic',
  'actions',
  'density',
  'refresh',
  'complete',
  'search',
  'views',
  'print',
  'bulk',
  'icons',
] as const;

export type ToolbarVariant = (typeof TOOLBAR_VARIANTS)[number];

export const TOOLBAR_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type ToolbarTone = (typeof TOOLBAR_TONES)[number];

export const TOOLBAR_OBSERVED_ATTRIBUTES = ['variant', 'tone', 'dense'] as const;

export function resolveToolbarVariant(value: string | null): ToolbarVariant {
  if (
    value === 'actions' ||
    value === 'density' ||
    value === 'refresh' ||
    value === 'complete' ||
    value === 'search' ||
    value === 'views' ||
    value === 'print' ||
    value === 'bulk' ||
    value === 'icons'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveToolbarTone(value: string | null): ToolbarTone {
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

export const toolbarLightDomStyles = `
gob-toolbar {
  --gob-tbx-accent: #9f2141;
  --gob-tbx-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-tbx-accent-text: #9f2141;
  --gob-tbx-title: #181511;
  --gob-tbx-muted: #8a8278;
  --gob-tbx-text: #6b665f;
  --gob-tbx-surface: #fafafa;
  --gob-tbx-surface-border: #ebebeb;
  --gob-tbx-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
}

gob-toolbar[tone='accent'] {
  --gob-tbx-accent: #bc945a;
  --gob-tbx-accent-soft: rgba(188, 148, 90, 0.22);
  --gob-tbx-accent-text: #7a5a2e;
}
gob-toolbar[tone='dark'] {
  --gob-tbx-accent: #ffffff;
  --gob-tbx-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-tbx-accent-text: #181511;
  --gob-tbx-title: #ffffff;
  --gob-tbx-muted: rgba(255, 255, 255, 0.5);
  --gob-tbx-text: rgba(255, 255, 255, 0.72);
  --gob-tbx-surface: rgba(255, 255, 255, 0.08);
  --gob-tbx-surface-border: rgba(255, 255, 255, 0.12);
}
gob-toolbar[tone='neutral'] {
  --gob-tbx-surface: #f5f5f5;
  --gob-tbx-surface-border: #d0d0d0;
}
gob-toolbar[tone='soft'] {
  --gob-tbx-accent-soft: rgba(159, 33, 65, 0.16);
  --gob-tbx-surface: rgba(255, 255, 255, 0.42);
  --gob-tbx-surface-border: rgba(24, 21, 17, 0.12);
}

gob-toolbar .gob-tbx-title {
  display: grid;
  gap: 2px;
  min-width: 0;
}
gob-toolbar .gob-tbx-title strong {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--gob-tbx-title);
  white-space: nowrap;
}
gob-toolbar .gob-tbx-title small {
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-tbx-muted);
  white-space: nowrap;
}

gob-toolbar .gob-tbx-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--gob-tbx-surface-border);
  background: var(--gob-tbx-surface);
  color: var(--gob-tbx-title);
  font-family: var(--gob-tbx-font);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}
gob-toolbar .gob-tbx-btn-primary {
  border-color: transparent;
  background: var(--gob-tbx-accent);
  color: #fff;
}
gob-toolbar[tone='dark'] .gob-tbx-btn-primary {
  color: #181511;
}
gob-toolbar .gob-tbx-btn-ghost {
  background: transparent;
}
gob-toolbar .gob-tbx-icon-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border-radius: 10px;
  border: 1px solid var(--gob-tbx-surface-border);
  background: var(--gob-tbx-surface);
  color: var(--gob-tbx-title);
  cursor: pointer;
}
gob-toolbar .gob-tbx-icon-btn[data-active='true'],
gob-toolbar .gob-tbx-icon-btn[aria-pressed='true'] {
  border-color: transparent;
  background: var(--gob-tbx-accent-soft);
  color: var(--gob-tbx-accent-text);
}
gob-toolbar .gob-tbx-seg {
  display: inline-flex;
  align-items: center;
  padding: 3px;
  border-radius: 10px;
  border: 1px solid var(--gob-tbx-surface-border);
  background: var(--gob-tbx-surface);
  gap: 2px;
}
gob-toolbar .gob-tbx-seg button {
  appearance: none;
  height: 28px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--gob-tbx-muted);
  font-family: var(--gob-tbx-font);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}
gob-toolbar .gob-tbx-seg button[aria-pressed='true'] {
  background: #fff;
  color: var(--gob-tbx-accent-text);
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.08);
}
gob-toolbar[tone='dark'] .gob-tbx-seg button[aria-pressed='true'] {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  box-shadow: none;
}
gob-toolbar[dense],
gob-toolbar[dense='true'] {
  /* densificar controles en light DOM */
}
gob-toolbar[dense] .gob-tbx-btn,
gob-toolbar[dense='true'] .gob-tbx-btn,
gob-toolbar[dense] .gob-tbx-icon-btn,
gob-toolbar[dense='true'] .gob-tbx-icon-btn {
  height: 30px;
  border-radius: 8px;
}
gob-toolbar[dense] .gob-tbx-icon-btn,
gob-toolbar[dense='true'] .gob-tbx-icon-btn {
  width: 30px;
}
gob-toolbar[dense] .gob-tbx-btn,
gob-toolbar[dense='true'] .gob-tbx-btn {
  padding: 0 10px;
  font-size: 11px;
}

gob-toolbar .gob-tbx-search {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  width: min(240px, 100%);
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--gob-tbx-surface-border);
  background: var(--gob-tbx-surface);
  color: var(--gob-tbx-text);
  font-family: var(--gob-tbx-font);
}
gob-toolbar .gob-tbx-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--gob-tbx-title);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
}
gob-toolbar .gob-tbx-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--gob-tbx-accent);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
}
gob-toolbar[tone='dark'] .gob-tbx-badge {
  color: #181511;
}
`;
