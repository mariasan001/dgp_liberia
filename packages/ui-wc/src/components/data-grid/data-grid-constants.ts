export const DATA_GRID_VARIANTS = [
  'filters',
  'frozen-left',
  'frozen-right',
  'bulk',
  'paginated',
  'expandable',
  'column-filter',
  'wide',
  'toolbar',
  'grouped',
  'card-rows',
  'assignees',
  'progress',
  'tags',
  'live',
  'financial',
  'alert',
  'skeleton',
] as const;

export type DataGridVariant = (typeof DATA_GRID_VARIANTS)[number];

export const DATA_GRID_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type DataGridTone = (typeof DATA_GRID_TONES)[number];

export const DATA_GRID_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

const VARIANT_SET = new Set<string>(DATA_GRID_VARIANTS);

export function resolveDataGridVariant(
  value: string | null,
): DataGridVariant {
  if (value && VARIANT_SET.has(value)) return value as DataGridVariant;
  return 'filters';
}

export function resolveDataGridTone(value: string | null): DataGridTone {
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

/** Estilos light-DOM: tabla SaaS (aire, dual-line, avatares, pills). */
export const dataGridLightDomStyles = `
gob-data-grid {
  --gob-dg-accent: #9f2141;
  --gob-dg-accent-soft: rgba(159, 33, 65, 0.1);
  --gob-dg-title: #181511;
  --gob-dg-muted: #8a8278;
  --gob-dg-border: rgba(24, 21, 17, 0.08);
  --gob-dg-zebra: rgba(24, 21, 17, 0.03);
  --gob-dg-hover: rgba(159, 33, 65, 0.04);
  --gob-dg-pad-y: 14px;
  --gob-dg-pad-x: 16px;
  --gob-dg-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-dg-freeze-bg: #fff;
}

gob-data-grid[tone='accent'] {
  --gob-dg-accent: #bc945a;
  --gob-dg-accent-soft: rgba(188, 148, 90, 0.16);
  --gob-dg-hover: rgba(188, 148, 90, 0.07);
}
gob-data-grid[tone='dark'] {
  --gob-dg-accent: #181511;
  --gob-dg-accent-soft: rgba(24, 21, 17, 0.08);
  --gob-dg-hover: rgba(24, 21, 17, 0.04);
}
gob-data-grid[tone='neutral'] {
  --gob-dg-accent: #6b655c;
  --gob-dg-accent-soft: rgba(24, 21, 17, 0.06);
  --gob-dg-hover: rgba(24, 21, 17, 0.035);
}
gob-data-grid[tone='soft'] {
  --gob-dg-accent: #a67c52;
  --gob-dg-accent-soft: rgba(231, 215, 189, 0.55);
  --gob-dg-hover: rgba(166, 124, 82, 0.07);
}

gob-data-grid table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: var(--gob-dg-font);
  font-size: 13px;
  color: var(--gob-dg-title);
}

gob-data-grid thead th {
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-dg-muted);
  background: #fafafa;
  border-bottom: 1px solid var(--gob-dg-border);
  padding: 12px var(--gob-dg-pad-x);
  white-space: nowrap;
  vertical-align: middle;
}

gob-data-grid tbody td {
  padding: var(--gob-dg-pad-y) var(--gob-dg-pad-x);
  border-bottom: 1px solid rgba(24, 21, 17, 0.05);
  vertical-align: middle;
  background: #fff;
  line-height: 1.4;
}

gob-data-grid tbody tr:last-child td {
  border-bottom: 0;
}

gob-data-grid tbody tr:hover td {
  background: var(--gob-dg-hover);
}

gob-data-grid td.num,
gob-data-grid th.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

gob-data-grid[variant='wide'] {
  --gob-dg-pad-y: 12px;
  --gob-dg-pad-x: 12px;
}
gob-data-grid[variant='wide'] table {
  font-size: 12.5px;
  min-width: 960px;
}

gob-data-grid[variant='frozen-left'] th:first-child,
gob-data-grid[variant='frozen-left'] td:first-child,
gob-data-grid[variant='bulk'] th:nth-child(2),
gob-data-grid[variant='bulk'] td:nth-child(2),
gob-data-grid[variant='frozen-left'] th.freeze,
gob-data-grid[variant='frozen-left'] td.freeze {
  position: sticky;
  left: 0;
  z-index: 3;
  background: var(--gob-dg-freeze-bg);
  box-shadow: 4px 0 10px rgba(24, 21, 17, 0.05);
}

gob-data-grid[variant='frozen-left'] thead th:first-child,
gob-data-grid[variant='bulk'] thead th:nth-child(2) {
  z-index: 4;
  background: #fafafa;
}

gob-data-grid[variant='frozen-right'] th:last-child,
gob-data-grid[variant='frozen-right'] td:last-child {
  position: sticky;
  right: 0;
  z-index: 3;
  background: var(--gob-dg-freeze-bg);
  box-shadow: -4px 0 10px rgba(24, 21, 17, 0.05);
}
gob-data-grid[variant='frozen-right'] thead th:last-child {
  z-index: 4;
  background: #fafafa;
}

gob-data-grid .gob-dg-check {
  width: 16px;
  height: 16px;
  accent-color: var(--gob-dg-accent);
  cursor: pointer;
}

gob-data-grid .gob-dg-sort {
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
gob-data-grid .gob-dg-sort::after {
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
gob-data-grid .gob-dg-sort[data-dir='asc']::after {
  border-top: 0;
  border-bottom: 4px solid var(--gob-dg-accent);
  opacity: 1;
}
gob-data-grid .gob-dg-sort[data-dir='desc']::after {
  border-top: 4px solid var(--gob-dg-accent);
  opacity: 1;
}

gob-data-grid .gob-dg-cell {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
gob-data-grid .gob-dg-stack {
  display: grid;
  gap: 2px;
  min-width: 0;
}
gob-data-grid .gob-dg-primary {
  font-size: 13px;
  font-weight: 650;
  color: var(--gob-dg-title);
  line-height: 1.3;
}
gob-data-grid .gob-dg-secondary {
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-dg-muted);
  line-height: 1.3;
}
gob-data-grid .gob-dg-link {
  color: var(--gob-dg-accent);
  font-weight: 650;
  text-decoration: none;
}
gob-data-grid .gob-dg-link:hover {
  text-decoration: underline;
}

gob-data-grid .gob-dg-avatar {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fff;
  background: var(--gob-dg-accent);
}
gob-data-grid .gob-dg-avatar[data-hue='0'] { background: #9f2141; }
gob-data-grid .gob-dg-avatar[data-hue='1'] { background: #3d6b8a; }
gob-data-grid .gob-dg-avatar[data-hue='2'] { background: #5a7a4a; }
gob-data-grid .gob-dg-avatar[data-hue='3'] { background: #8a5a3c; }
gob-data-grid .gob-dg-avatar[data-hue='4'] { background: #6b5a8a; }
gob-data-grid .gob-dg-avatar[data-hue='5'] { background: #2f6b5c; }

gob-data-grid .gob-dg-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.01em;
  background: var(--gob-dg-accent-soft);
  color: var(--gob-dg-accent);
  white-space: nowrap;
}
gob-data-grid .gob-dg-status[data-tone='ok'] {
  background: rgba(31, 138, 85, 0.12);
  color: #187a4a;
}
gob-data-grid .gob-dg-status[data-tone='warn'] {
  background: rgba(208, 146, 26, 0.14);
  color: #9a6a10;
}
gob-data-grid .gob-dg-status[data-tone='err'] {
  background: rgba(192, 57, 43, 0.12);
  color: #b03328;
}
gob-data-grid .gob-dg-status[data-tone='info'] {
  background: rgba(61, 107, 138, 0.12);
  color: #2f5a78;
}
gob-data-grid .gob-dg-status[data-tone='muted'] {
  background: rgba(24, 21, 17, 0.06);
  color: #6b655c;
}

gob-data-grid .gob-dg-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  flex: 0 0 auto;
}

gob-data-grid .gob-dg-tag {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(24, 21, 17, 0.05);
  color: #4a453e;
}

gob-data-grid .gob-dg-amount-pos {
  color: #187a4a;
  font-weight: 700;
}
gob-data-grid .gob-dg-amount-neg {
  color: #b03328;
  font-weight: 700;
}

gob-data-grid .gob-dg-actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
gob-data-grid .gob-dg-actions button,
gob-data-grid .gob-dg-kebab {
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
gob-data-grid .gob-dg-actions button:hover,
gob-data-grid .gob-dg-kebab:hover {
  background: rgba(24, 21, 17, 0.05);
  color: var(--gob-dg-accent);
}
gob-data-grid .gob-dg-actions .gob-dg-btn {
  min-width: auto;
  padding: 0 10px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  font-size: 11px;
  font-weight: 700;
  color: #4a453e;
}
gob-data-grid .gob-dg-actions .gob-dg-btn:hover {
  border-color: var(--gob-dg-accent);
  color: var(--gob-dg-accent);
  background: #fff;
}

gob-data-grid .gob-dg-expand {
  appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  color: var(--gob-dg-accent);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1;
}
gob-data-grid .gob-dg-expand:hover {
  background: var(--gob-dg-accent-soft);
}

gob-data-grid tr.gob-dg-detail td {
  background: #fafafa;
  color: var(--gob-dg-muted);
  font-size: 12px;
  padding: 14px 16px 16px 56px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.05);
}
gob-data-grid tr.gob-dg-detail .gob-dg-detail-card {
  display: grid;
  gap: 10px;
  max-width: 720px;
}
gob-data-grid tr.gob-dg-detail .gob-dg-detail-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(24, 21, 17, 0.08);
  background: #fff;
}
gob-data-grid tr.gob-dg-group td {
  background: #f7f5f3;
  color: var(--gob-dg-title);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.01em;
  padding-top: 10px;
  padding-bottom: 10px;
}

gob-data-grid .gob-dg-col-filter {
  display: block;
  width: 100%;
  margin-top: 6px;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-dg-title);
  text-transform: none;
  letter-spacing: 0;
}
gob-data-grid .gob-dg-col-filter:focus {
  outline: 2px solid color-mix(in srgb, var(--gob-dg-accent) 35%, transparent);
  outline-offset: 0;
}

gob-data-grid .gob-dg-badge-new {
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
  min-height: 18px;
  padding: 0 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  background: color-mix(in srgb, var(--gob-dg-accent) 12%, #fff);
  color: var(--gob-dg-accent);
}

/* —— Filas tarjeta —— */
gob-data-grid[variant='card-rows'] .scroll {
  background: #f4f3f1;
  padding: 10px 12px 14px;
  max-height: 460px;
}
gob-data-grid[variant='card-rows'] table {
  border-collapse: separate;
  border-spacing: 0 8px;
}
gob-data-grid[variant='card-rows'] thead th {
  background: transparent;
  border-bottom: 0;
  padding-top: 4px;
  padding-bottom: 4px;
}
gob-data-grid[variant='card-rows'] tbody td {
  border-bottom: 0;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.03);
}
gob-data-grid[variant='card-rows'] tbody td:first-child {
  border-left: 1px solid rgba(24, 21, 17, 0.06);
  border-radius: 12px 0 0 12px;
}
gob-data-grid[variant='card-rows'] tbody td:last-child {
  border-right: 1px solid rgba(24, 21, 17, 0.06);
  border-radius: 0 12px 12px 0;
}
gob-data-grid[variant='card-rows'] tbody tr:hover td {
  background: #fff;
}

/* —— Stack de avatares —— */
gob-data-grid .gob-dg-avatars {
  display: inline-flex;
  align-items: center;
}
gob-data-grid .gob-dg-avatars .gob-dg-avatar {
  width: 28px;
  height: 28px;
  font-size: 10px;
  border: 2px solid #fff;
  margin-left: -8px;
}
gob-data-grid .gob-dg-avatars .gob-dg-avatar:first-child {
  margin-left: 0;
}
gob-data-grid .gob-dg-avatars .gob-dg-more {
  display: inline-grid;
  place-items: center;
  margin-left: -6px;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 2px solid #fff;
  background: rgba(24, 21, 17, 0.06);
  color: #4a453e;
  font-size: 10px;
  font-weight: 700;
}

/* —— Progreso / anillo —— */
gob-data-grid .gob-dg-progress {
  display: grid;
  gap: 4px;
  min-width: 88px;
}
gob-data-grid .gob-dg-progress-track {
  display: block;
  height: 6px;
  border-radius: 999px;
  background: rgba(24, 21, 17, 0.08);
  overflow: hidden;
}
gob-data-grid .gob-dg-progress-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--gob-dg-accent);
}
gob-data-grid .gob-dg-progress-fill[data-tone='ok'] { background: #187a4a; }
gob-data-grid .gob-dg-progress-fill[data-tone='warn'] { background: #c48a12; }
gob-data-grid .gob-dg-progress-fill[data-tone='err'] { background: #b03328; }
gob-data-grid .gob-dg-ring {
  --p: 50;
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background:
    conic-gradient(var(--gob-dg-accent) calc(var(--p) * 1%), rgba(24, 21, 17, 0.08) 0);
  font-size: 11px;
  font-weight: 800;
  color: var(--gob-dg-title);
}
gob-data-grid .gob-dg-ring::before {
  content: '';
  grid-area: 1 / 1;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #fff;
}
gob-data-grid .gob-dg-ring > span {
  grid-area: 1 / 1;
  position: relative;
  z-index: 1;
}
gob-data-grid .gob-dg-ring[data-tone='ok'] {
  background: conic-gradient(#187a4a calc(var(--p) * 1%), rgba(24, 21, 17, 0.08) 0);
}
gob-data-grid .gob-dg-ring[data-tone='warn'] {
  background: conic-gradient(#c48a12 calc(var(--p) * 1%), rgba(24, 21, 17, 0.08) 0);
}
gob-data-grid .gob-dg-ring[data-tone='err'] {
  background: conic-gradient(#b03328 calc(var(--p) * 1%), rgba(24, 21, 17, 0.08) 0);
}

/* —— Tags —— */
gob-data-grid .gob-dg-tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
}

/* —— Live —— */
gob-data-grid .gob-dg-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #187a4a;
}
gob-data-grid .gob-dg-live .gob-dg-dot {
  background: #187a4a;
  box-shadow: 0 0 0 3px rgba(24, 122, 74, 0.18);
}

/* —— Alerta / prioridad —— */
gob-data-grid tr.gob-dg-alert td {
  background: rgba(192, 57, 43, 0.04);
}
gob-data-grid tr.gob-dg-alert td:first-child {
  box-shadow: inset 3px 0 0 #b03328;
}
gob-data-grid tr.gob-dg-alert:hover td {
  background: rgba(192, 57, 43, 0.07);
}
gob-data-grid .gob-dg-priority {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #b03328;
}

/* —— Skeleton —— */
gob-data-grid[variant='skeleton'] tbody td {
  pointer-events: none;
}
gob-data-grid .gob-dg-skel {
  display: block;
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(24, 21, 17, 0.06) 0%,
    rgba(24, 21, 17, 0.12) 45%,
    rgba(24, 21, 17, 0.06) 90%
  );
  background-size: 200% 100%;
  animation: gob-dg-shimmer 1.2s ease-in-out infinite;
}
gob-data-grid .gob-dg-skel[data-size='lg'] {
  height: 28px;
  width: 28px;
  border-radius: 999px;
}
gob-data-grid .gob-dg-skel[data-size='pill'] {
  height: 22px;
  width: 72px;
  border-radius: 999px;
}
@keyframes gob-dg-shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

/* —— Financiero —— */
gob-data-grid[variant='financial'] .gob-dg-primary {
  font-variant-numeric: tabular-nums;
}
`;
