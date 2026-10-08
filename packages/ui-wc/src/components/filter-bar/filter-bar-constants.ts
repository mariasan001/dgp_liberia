export const FILTER_BAR_VARIANTS = [
  'basic',
  'search',
  'chips',
  'dense',
  'with-actions',
  'complete',
  'dates',
  'tags',
  'count',
  'region',
  'advanced',
] as const;

export type FilterBarVariant = (typeof FILTER_BAR_VARIANTS)[number];

export const FILTER_BAR_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type FilterBarTone = (typeof FILTER_BAR_TONES)[number];

export const FILTER_BAR_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

export function resolveFilterBarVariant(
  value: string | null,
): FilterBarVariant {
  if (
    value === 'search' ||
    value === 'chips' ||
    value === 'dense' ||
    value === 'with-actions' ||
    value === 'complete' ||
    value === 'dates' ||
    value === 'tags' ||
    value === 'count' ||
    value === 'region' ||
    value === 'advanced'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveFilterBarTone(value: string | null): FilterBarTone {
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

export const filterBarLightDomStyles = `
gob-filter-bar {
  --gob-fb-accent: #9f2141;
  --gob-fb-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-fb-accent-text: #9f2141;
  --gob-fb-title: #181511;
  --gob-fb-muted: #8a8278;
  --gob-fb-text: #6b665f;
  --gob-fb-surface: #fafafa;
  --gob-fb-surface-border: #ebebeb;
  --gob-fb-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
}

gob-filter-bar[tone='accent'] {
  --gob-fb-accent: #bc945a;
  --gob-fb-accent-soft: rgba(188, 148, 90, 0.22);
  --gob-fb-accent-text: #7a5a2e;
}
gob-filter-bar[tone='dark'] {
  --gob-fb-accent: #ffffff;
  --gob-fb-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-fb-accent-text: #181511;
  --gob-fb-title: #ffffff;
  --gob-fb-muted: rgba(255, 255, 255, 0.5);
  --gob-fb-text: rgba(255, 255, 255, 0.72);
  --gob-fb-surface: rgba(255, 255, 255, 0.08);
  --gob-fb-surface-border: rgba(255, 255, 255, 0.12);
}
gob-filter-bar[tone='neutral'] {
  --gob-fb-accent: #9f2141;
  --gob-fb-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-fb-accent-text: #9f2141;
  --gob-fb-surface: #f5f5f5;
  --gob-fb-surface-border: #d0d0d0;
}
gob-filter-bar[tone='soft'] {
  --gob-fb-accent: #9f2141;
  --gob-fb-accent-soft: rgba(159, 33, 65, 0.16);
  --gob-fb-accent-text: #9f2141;
  --gob-fb-surface: rgba(255, 255, 255, 0.42);
  --gob-fb-surface-border: rgba(24, 21, 17, 0.12);
}

gob-filter-bar .gob-fb-search {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1 1 200px;
  max-width: 280px;
  height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--gob-fb-surface-border);
  background: var(--gob-fb-surface);
  color: var(--gob-fb-text);
  font-family: var(--gob-fb-font);
}
gob-filter-bar[variant='dense'] .gob-fb-search {
  height: 30px;
  border-radius: 8px;
  padding: 0 10px;
}
gob-filter-bar .gob-fb-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--gob-fb-title);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
}
gob-filter-bar .gob-fb-search input::placeholder {
  color: var(--gob-fb-muted);
}

gob-filter-bar .gob-fb-select {
  appearance: none;
  height: 36px;
  padding: 0 28px 0 12px;
  border-radius: 10px;
  border: 1px solid var(--gob-fb-surface-border);
  background:
    linear-gradient(45deg, transparent 50%, var(--gob-fb-muted) 50%) calc(100% - 14px) calc(50% - 2px) / 5px 5px no-repeat,
    linear-gradient(135deg, var(--gob-fb-muted) 50%, transparent 50%) calc(100% - 9px) calc(50% - 2px) / 5px 5px no-repeat,
    var(--gob-fb-surface);
  color: var(--gob-fb-title);
  font-family: var(--gob-fb-font);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
gob-filter-bar[variant='dense'] .gob-fb-select {
  height: 30px;
  border-radius: 8px;
  font-size: 11px;
}

gob-filter-bar .gob-fb-chip {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid var(--gob-fb-surface-border);
  background: var(--gob-fb-surface);
  color: var(--gob-fb-text);
  font-family: var(--gob-fb-font);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
gob-filter-bar .gob-fb-chip[data-active='true'],
gob-filter-bar .gob-fb-chip[aria-pressed='true'] {
  border-color: transparent;
  background: var(--gob-fb-accent-soft);
  color: var(--gob-fb-accent-text);
}
gob-filter-bar[variant='dense'] .gob-fb-chip {
  height: 26px;
  padding: 0 10px;
  font-size: 11px;
}

gob-filter-bar .gob-fb-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid var(--gob-fb-surface-border);
  background: var(--gob-fb-surface);
  color: var(--gob-fb-title);
  font-family: var(--gob-fb-font);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}
gob-filter-bar .gob-fb-btn-primary {
  border-color: transparent;
  background: var(--gob-fb-accent);
  color: #fff;
}
gob-filter-bar[tone='dark'] .gob-fb-btn-primary {
  color: #181511;
}
gob-filter-bar[variant='dense'] .gob-fb-btn {
  height: 30px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: 11px;
}

gob-filter-bar .gob-fb-tag {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 8px 0 12px;
  border-radius: 999px;
  border: 0;
  background: var(--gob-fb-accent-soft);
  color: var(--gob-fb-accent-text);
  font-family: var(--gob-fb-font);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
gob-filter-bar .gob-fb-tag i,
gob-filter-bar .gob-fb-tag svg {
  opacity: 0.7;
}
gob-filter-bar .gob-fb-count {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--gob-fb-accent-soft);
  color: var(--gob-fb-accent-text);
  font-family: var(--gob-fb-font);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}
gob-filter-bar .gob-fb-field {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
gob-filter-bar .gob-fb-field span {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-fb-muted);
}
`;
