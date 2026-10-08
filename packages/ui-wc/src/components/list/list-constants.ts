export const LIST_VARIANTS = [
  'basic',
  'avatar',
  'meta',
  'actions',
  'dense',
  'selectable',
  'complete',
  'icon',
  'nav',
  'grouped',
  'status',
  'empty',
] as const;

export type ListVariant = (typeof LIST_VARIANTS)[number];

export const LIST_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type ListTone = (typeof LIST_TONES)[number];

export const LIST_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

export function resolveListVariant(value: string | null): ListVariant {
  if (
    value === 'avatar' ||
    value === 'meta' ||
    value === 'actions' ||
    value === 'dense' ||
    value === 'selectable' ||
    value === 'complete' ||
    value === 'icon' ||
    value === 'nav' ||
    value === 'grouped' ||
    value === 'status' ||
    value === 'empty'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveListTone(value: string | null): ListTone {
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

export const listLightDomStyles = `
gob-list {
  --gob-list-accent: #9f2141;
  --gob-list-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-list-accent-text: #9f2141;
  --gob-list-title: #181511;
  --gob-list-muted: #8a8278;
  --gob-list-text: #6b665f;
  --gob-list-border: rgba(24, 21, 17, 0.08);
  --gob-list-hover: rgba(159, 33, 65, 0.04);
  --gob-list-selected: rgba(159, 33, 65, 0.08);
  --gob-list-pad-y: 14px;
  --gob-list-pad-x: 16px;
  --gob-list-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
}

gob-list[tone='accent'] {
  --gob-list-accent: #bc945a;
  --gob-list-accent-soft: rgba(188, 148, 90, 0.22);
  --gob-list-accent-text: #7a5a2e;
  --gob-list-hover: rgba(188, 148, 90, 0.07);
  --gob-list-selected: rgba(188, 148, 90, 0.14);
}
gob-list[tone='dark'] {
  --gob-list-accent: #ffffff;
  --gob-list-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-list-accent-text: #ffffff;
  --gob-list-title: #ffffff;
  --gob-list-muted: rgba(255, 255, 255, 0.5);
  --gob-list-text: rgba(255, 255, 255, 0.72);
  --gob-list-border: rgba(255, 255, 255, 0.1);
  --gob-list-hover: rgba(255, 255, 255, 0.06);
  --gob-list-selected: rgba(255, 255, 255, 0.1);
}
gob-list[tone='neutral'] {
  --gob-list-accent: #6b655c;
  --gob-list-accent-soft: rgba(24, 21, 17, 0.06);
  --gob-list-accent-text: #181511;
  --gob-list-hover: rgba(24, 21, 17, 0.035);
  --gob-list-selected: rgba(24, 21, 17, 0.06);
}
gob-list[tone='soft'] {
  --gob-list-accent: #a67c52;
  --gob-list-accent-soft: rgba(231, 215, 189, 0.55);
  --gob-list-accent-text: #7a5a2e;
  --gob-list-hover: rgba(166, 124, 82, 0.07);
  --gob-list-selected: rgba(166, 124, 82, 0.12);
}

gob-list[variant='dense'] {
  --gob-list-pad-y: 10px;
  --gob-list-pad-x: 12px;
}

gob-list .gob-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: var(--gob-list-pad-y) var(--gob-list-pad-x);
  border: 0;
  border-bottom: 1px solid var(--gob-list-border);
  background: transparent;
  color: inherit;
  font-family: var(--gob-list-font);
  text-align: left;
  cursor: default;
}
gob-list .gob-list-item:last-child {
  border-bottom: 0;
}
gob-list .gob-list-item[data-interactive='true'],
gob-list button.gob-list-item {
  cursor: pointer;
}
gob-list .gob-list-item:hover,
gob-list .gob-list-item:focus-visible {
  background: var(--gob-list-hover);
  outline: none;
}
gob-list .gob-list-item[aria-selected='true'],
gob-list .gob-list-item[data-selected='true'] {
  background: var(--gob-list-selected);
}

gob-list .gob-list-check {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--gob-list-accent);
}

gob-list .gob-list-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: var(--gob-list-accent-soft);
  color: var(--gob-list-accent-text);
  font-size: 12px;
  font-weight: 700;
  flex: 0 0 auto;
}
gob-list[variant='dense'] .gob-list-avatar {
  width: 30px;
  height: 30px;
  font-size: 11px;
}

gob-list .gob-list-body {
  display: grid;
  gap: 2px;
  min-width: 0;
  flex: 1 1 auto;
}
gob-list .gob-list-primary {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--gob-list-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
gob-list .gob-list-secondary {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-list-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

gob-list .gob-list-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  margin-inline-start: auto;
  font-size: 11px;
  font-weight: 600;
  color: var(--gob-list-muted);
  white-space: nowrap;
}
gob-list .gob-list-pill {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--gob-list-accent-soft);
  color: var(--gob-list-accent-text);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

gob-list .gob-list-action {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--gob-list-muted);
  cursor: pointer;
}
gob-list .gob-list-action:hover {
  background: var(--gob-list-accent-soft);
  color: var(--gob-list-accent-text);
}

gob-list .gob-list-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--gob-list-accent-soft);
  color: var(--gob-list-accent-text);
  flex: 0 0 auto;
}
gob-list[variant='dense'] .gob-list-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
}

gob-list .gob-list-group {
  display: block;
  padding: 10px 16px 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-list-muted);
  background: transparent;
  border-bottom: 1px solid var(--gob-list-border);
}

gob-list .gob-list-empty {
  display: grid;
  gap: 6px;
  place-items: center;
  padding: 36px 20px;
  text-align: center;
}
gob-list .gob-list-empty strong {
  font-size: 14px;
  font-weight: 700;
  color: var(--gob-list-title);
}
gob-list .gob-list-empty p {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-list-muted);
  max-width: 32ch;
}

gob-list .gob-list-item[data-interactive='true'] {
  cursor: pointer;
}
gob-list .gob-list-chevron {
  color: var(--gob-list-muted);
  flex: 0 0 auto;
  margin-inline-start: auto;
}
`;
