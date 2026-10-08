export const TABLE_VARIANTS = [
  'basic',
  'striped',
  'bordered',
  'dense',
  'selectable',
  'sortable',
  'sticky',
  'status',
  'actions',
  'empty',
] as const;

export type TableVariant = (typeof TABLE_VARIANTS)[number];

export const TABLE_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type TableTone = (typeof TABLE_TONES)[number];

export const TABLE_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

const VARIANT_SET = new Set<string>(TABLE_VARIANTS);

export function resolveTableVariant(value: string | null): TableVariant {
  if (value && VARIANT_SET.has(value)) return value as TableVariant;
  return 'basic';
}

export function resolveTableTone(value: string | null): TableTone {
  if (
    value === 'accent' ||
    value === 'dark' ||
    value === 'neutral' ||
    value === 'soft'
  ) {
    return value;
  }
  return 'primary';
}

/** Estilos light-DOM: tabla SaaS institucional. */
export const tableLightDomStyles = `
gob-table {
  --gob-tb-accent: #9f2141;
  --gob-tb-accent-soft: rgba(159, 33, 65, 0.1);
  --gob-tb-title: #181511;
  --gob-tb-muted: #8a8278;
  --gob-tb-border: rgba(24, 21, 17, 0.08);
  --gob-tb-zebra: rgba(24, 21, 17, 0.03);
  --gob-tb-hover: rgba(159, 33, 65, 0.04);
  --gob-tb-pad-y: 14px;
  --gob-tb-pad-x: 16px;
  --gob-tb-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
}

gob-table[tone='accent'] {
  --gob-tb-accent: #bc945a;
  --gob-tb-accent-soft: rgba(188, 148, 90, 0.16);
  --gob-tb-hover: rgba(188, 148, 90, 0.07);
}
gob-table[tone='dark'] {
  --gob-tb-accent: #181511;
  --gob-tb-accent-soft: rgba(24, 21, 17, 0.08);
  --gob-tb-hover: rgba(24, 21, 17, 0.04);
}
gob-table[tone='neutral'] {
  --gob-tb-accent: #6b655c;
  --gob-tb-accent-soft: rgba(24, 21, 17, 0.06);
  --gob-tb-hover: rgba(24, 21, 17, 0.035);
}
gob-table[tone='soft'] {
  --gob-tb-accent: #a67c52;
  --gob-tb-accent-soft: rgba(231, 215, 189, 0.55);
  --gob-tb-hover: rgba(166, 124, 82, 0.07);
}

gob-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: var(--gob-tb-font);
  font-size: 13px;
  color: var(--gob-tb-title);
}

gob-table thead th {
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-tb-muted);
  background: #fafafa;
  border-bottom: 1px solid var(--gob-tb-border);
  padding: 12px var(--gob-tb-pad-x);
  white-space: nowrap;
}

gob-table tbody td {
  padding: var(--gob-tb-pad-y) var(--gob-tb-pad-x);
  border-bottom: 1px solid rgba(24, 21, 17, 0.05);
  vertical-align: middle;
  line-height: 1.4;
}

gob-table tbody tr:last-child td {
  border-bottom: 0;
}

gob-table tbody tr:hover td {
  background: var(--gob-tb-hover);
}

gob-table td.num,
gob-table th.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

gob-table[variant='striped'] tbody tr:nth-child(even) td {
  background: var(--gob-tb-zebra);
}

gob-table[variant='bordered'] table {
  border: 1px solid var(--gob-tb-border);
  border-radius: 12px;
  overflow: hidden;
}
gob-table[variant='bordered'] thead th,
gob-table[variant='bordered'] tbody td {
  border-right: 1px solid rgba(24, 21, 17, 0.06);
}
gob-table[variant='bordered'] thead th:last-child,
gob-table[variant='bordered'] tbody td:last-child {
  border-right: 0;
}

gob-table[variant='dense'] {
  --gob-tb-pad-y: 8px;
  --gob-tb-pad-x: 12px;
}
gob-table[variant='dense'] table {
  font-size: 12px;
}

gob-table[variant='sticky'] thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  box-shadow: 0 1px 0 var(--gob-tb-border);
}

gob-table .gob-tb-check {
  width: 16px;
  height: 16px;
  accent-color: var(--gob-tb-accent);
  cursor: pointer;
}

gob-table .gob-tb-sort {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  font-weight: inherit;
}
gob-table .gob-tb-sort::after {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-top: 4px solid currentColor;
  opacity: 0.35;
  margin-top: 1px;
}
gob-table .gob-tb-sort[data-dir='asc']::after {
  border-top: 0;
  border-bottom: 4px solid var(--gob-tb-accent);
  opacity: 1;
}
gob-table .gob-tb-sort[data-dir='desc']::after {
  border-top: 4px solid var(--gob-tb-accent);
  opacity: 1;
}
gob-table .gob-tb-sort i {
  display: none;
}

gob-table .gob-tb-cell {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
gob-table .gob-tb-stack {
  display: grid;
  gap: 2px;
  min-width: 0;
}
gob-table .gob-tb-primary {
  font-size: 13px;
  font-weight: 650;
  color: var(--gob-tb-title);
  line-height: 1.3;
}
gob-table .gob-tb-secondary {
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-tb-muted);
  line-height: 1.3;
}
gob-table .gob-tb-avatar {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: var(--gob-tb-accent);
}
gob-table .gob-tb-avatar[data-hue='0'] { background: #9f2141; }
gob-table .gob-tb-avatar[data-hue='1'] { background: #3d6b8a; }
gob-table .gob-tb-avatar[data-hue='2'] { background: #5a7a4a; }
gob-table .gob-tb-avatar[data-hue='3'] { background: #8a5a3c; }
gob-table .gob-tb-avatar[data-hue='4'] { background: #6b5a8a; }
gob-table .gob-tb-avatar[data-hue='5'] { background: #2f6b5c; }

gob-table .gob-tb-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.01em;
  background: var(--gob-tb-accent-soft);
  color: var(--gob-tb-accent);
  white-space: nowrap;
}
gob-table .gob-tb-status[data-tone='ok'] {
  background: rgba(31, 138, 85, 0.12);
  color: #187a4a;
}
gob-table .gob-tb-status[data-tone='warn'] {
  background: rgba(208, 146, 26, 0.14);
  color: #9a6a10;
}
gob-table .gob-tb-status[data-tone='err'] {
  background: rgba(192, 57, 43, 0.12);
  color: #b03328;
}
gob-table .gob-tb-status[data-tone='info'] {
  background: rgba(61, 107, 138, 0.12);
  color: #2f5a78;
}
gob-table .gob-tb-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  flex: 0 0 auto;
}

gob-table .gob-tb-actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
gob-table .gob-tb-actions button,
gob-table .gob-tb-kebab {
  appearance: none;
  border: 0;
  background: transparent;
  color: #6b655c;
  border-radius: 8px;
  min-width: 32px;
  min-height: 32px;
  padding: 0;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  letter-spacing: 0.05em;
}
gob-table .gob-tb-actions button:hover,
gob-table .gob-tb-kebab:hover {
  background: rgba(24, 21, 17, 0.05);
  color: var(--gob-tb-accent);
}
gob-table .gob-tb-actions .gob-tb-btn {
  min-width: auto;
  padding: 0 10px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  font-size: 11px;
  font-weight: 700;
  color: #4a453e;
}
gob-table .gob-tb-actions .gob-tb-btn:hover {
  border-color: var(--gob-tb-accent);
  color: var(--gob-tb-accent);
  background: #fff;
}

gob-table[variant='empty'] table {
  display: none;
}
`;
