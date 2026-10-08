export const TIMELINE_VARIANTS = [
  'basic',
  'icons',
  'status',
  'dense',
  'alternating',
  'cards',
  'complete',
  'numbered',
  'dates',
  'milestones',
  'horizontal',
  'grouped',
] as const;

export type TimelineVariant = (typeof TIMELINE_VARIANTS)[number];

export const TIMELINE_TONES = [
  'primary',
  'accent',
  'dark',
  'neutral',
  'soft',
] as const;

export type TimelineTone = (typeof TIMELINE_TONES)[number];

export const TIMELINE_OBSERVED_ATTRIBUTES = ['variant', 'tone'] as const;

export function resolveTimelineVariant(value: string | null): TimelineVariant {
  if (
    value === 'icons' ||
    value === 'status' ||
    value === 'dense' ||
    value === 'alternating' ||
    value === 'cards' ||
    value === 'complete' ||
    value === 'numbered' ||
    value === 'dates' ||
    value === 'milestones' ||
    value === 'horizontal' ||
    value === 'grouped'
  ) {
    return value;
  }
  return 'basic';
}

export function resolveTimelineTone(value: string | null): TimelineTone {
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

export const timelineLightDomStyles = `
gob-timeline {
  /* Marca fija: vino + cafe */
  --gob-tl-vino: #9f2141;
  --gob-tl-vino-soft: rgba(159, 33, 65, 0.12);
  --gob-tl-vino-mid: rgba(159, 33, 65, 0.22);
  --gob-tl-cafe: #bc945a;
  --gob-tl-cafe-soft: rgba(188, 148, 90, 0.18);
  --gob-tl-cafe-mid: rgba(188, 148, 90, 0.38);
  /* Linea: UN solo color (cafe suave), sin degradado */
  --gob-tl-line: #d2bf9e;
  --gob-tl-accent: var(--gob-tl-vino);
  --gob-tl-accent-soft: var(--gob-tl-vino-soft);
  --gob-tl-accent-mid: var(--gob-tl-vino-mid);
  --gob-tl-accent-text: var(--gob-tl-vino);
  --gob-tl-title: #181511;
  --gob-tl-muted: #8a8278;
  --gob-tl-text: #6b665f;
  --gob-tl-border: rgba(24, 21, 17, 0.08);
  --gob-tl-surface: #ffffff;
  --gob-tl-hover: #ffffff;
  --gob-tl-active-bg: #ffffff;
  --gob-tl-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-tl-rail: 28px;
  --gob-tl-gap: 20px;
  --gob-tl-line-width: 2px;
}
gob-timeline[tone='accent'] {
  --gob-tl-accent: var(--gob-tl-cafe);
  --gob-tl-accent-soft: var(--gob-tl-cafe-soft);
  --gob-tl-accent-mid: var(--gob-tl-cafe-mid);
  --gob-tl-accent-text: #7a5a2e;
  --gob-tl-hover: #ffffff;
  --gob-tl-active-bg: #ffffff;
  --gob-tl-line: #c9b089;
}
gob-timeline[tone='dark'] {
  --gob-tl-vino: #ffffff;
  --gob-tl-cafe: #e0c59a;
  --gob-tl-vino-soft: rgba(255, 255, 255, 0.12);
  --gob-tl-vino-mid: rgba(255, 255, 255, 0.22);
  --gob-tl-cafe-soft: rgba(224, 197, 154, 0.18);
  --gob-tl-cafe-mid: rgba(224, 197, 154, 0.35);
  --gob-tl-line: rgba(224, 197, 154, 0.45);
  --gob-tl-accent: #ffffff;
  --gob-tl-accent-soft: rgba(255, 255, 255, 0.12);
  --gob-tl-accent-mid: rgba(255, 255, 255, 0.22);
  --gob-tl-accent-text: #ffffff;
  --gob-tl-title: #ffffff;
  --gob-tl-muted: rgba(255, 255, 255, 0.5);
  --gob-tl-text: rgba(255, 255, 255, 0.72);
  --gob-tl-border: rgba(255, 255, 255, 0.1);
  --gob-tl-surface: rgba(255, 255, 255, 0.06);
  --gob-tl-hover: rgba(255, 255, 255, 0.08);
  --gob-tl-active-bg: rgba(255, 255, 255, 0.08);
}
gob-timeline[tone='neutral'] {
  --gob-tl-line: #cfc4b4;
}
gob-timeline[tone='soft'] {
  --gob-tl-line: #c4a878;
  --gob-tl-active-bg: #ffffff;
}

gob-timeline .gob-tl-item {
  position: relative;
  display: grid;
  grid-template-columns: var(--gob-tl-rail) minmax(0, 1fr);
  column-gap: 16px;
  padding: 0 0 var(--gob-tl-gap);
  font-family: var(--gob-tl-font);
  outline: none;
}
gob-timeline .gob-tl-item:last-child {
  padding-bottom: 0;
}

gob-timeline .gob-tl-rail {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: var(--gob-tl-rail);
}

/* Linea solida de UN color (cafe) — look moderno */
gob-timeline .gob-tl-rail::before {
  content: '';
  position: absolute;
  top: 16px;
  bottom: calc(-1 * var(--gob-tl-gap));
  left: 50%;
  width: var(--gob-tl-line-width);
  transform: translateX(-50%);
  background: var(--gob-tl-line);
  border-radius: 999px;
}
gob-timeline .gob-tl-item:last-child .gob-tl-rail::before {
  display: none;
}

/* Nodos: juegan vino / cafe en alternancia */
gob-timeline .gob-tl-dot {
  position: relative;
  z-index: 1;
  width: 11px;
  height: 11px;
  margin-top: 6px;
  border-radius: 999px;
  background: var(--gob-tl-vino);
  border: 2px solid #fff;
  box-shadow: 0 0 0 3px var(--gob-tl-vino-soft);
  flex: 0 0 auto;
  transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
}
gob-timeline .gob-tl-item:nth-child(even) .gob-tl-dot {
  background: var(--gob-tl-cafe);
  box-shadow: 0 0 0 3px var(--gob-tl-cafe-soft);
}
gob-timeline .gob-tl-item[data-active='true'] .gob-tl-dot,
gob-timeline .gob-tl-item:hover .gob-tl-dot {
  transform: scale(1.15);
  background: var(--gob-tl-vino);
  box-shadow:
    0 0 0 3px #fff,
    0 0 0 6px var(--gob-tl-cafe-mid);
}

gob-timeline .gob-tl-icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: var(--gob-tl-vino-soft);
  color: var(--gob-tl-vino);
  border: 1.5px solid color-mix(in srgb, var(--gob-tl-vino) 16%, transparent);
  box-shadow: 0 4px 12px rgba(159, 33, 65, 0.08);
  flex: 0 0 auto;
  transition: transform 180ms ease, background 180ms ease, color 180ms ease, box-shadow 180ms ease;
}
gob-timeline .gob-tl-item:nth-child(even) .gob-tl-icon {
  background: var(--gob-tl-cafe-soft);
  color: #7a5a2e;
  border-color: color-mix(in srgb, var(--gob-tl-cafe) 28%, transparent);
  box-shadow: 0 4px 12px rgba(188, 148, 90, 0.12);
}
gob-timeline .gob-tl-item:hover .gob-tl-icon,
gob-timeline .gob-tl-item[data-active='true'] .gob-tl-icon {
  transform: translateY(-1px) scale(1.05);
  background: var(--gob-tl-vino);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 8px 20px rgba(159, 33, 65, 0.28);
}
gob-timeline .gob-tl-item:nth-child(even):hover .gob-tl-icon,
gob-timeline .gob-tl-item:nth-child(even)[data-active='true'] .gob-tl-icon {
  background: var(--gob-tl-cafe);
  color: #fff;
  box-shadow: 0 8px 20px rgba(188, 148, 90, 0.32);
}
gob-timeline[tone='dark'] .gob-tl-item:hover .gob-tl-icon,
gob-timeline[tone='dark'] .gob-tl-item[data-active='true'] .gob-tl-icon {
  color: #181511;
}

gob-timeline .gob-tl-body {
  display: grid;
  gap: 4px;
  min-width: 0;
  padding: 4px 4px 6px;
  border-radius: 14px;
  transition: background 180ms ease, box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease;
}
gob-timeline .gob-tl-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}
gob-timeline .gob-tl-time {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--gob-tl-cafe);
}
gob-timeline .gob-tl-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.25;
  color: var(--gob-tl-title);
}
gob-timeline .gob-tl-desc {
  margin: 0;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-tl-text);
}
gob-timeline .gob-tl-pill {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  background: var(--gob-tl-accent-soft);
  color: var(--gob-tl-accent-text);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
  flex: 0 0 auto;
}

/* Semaforo institucional */
gob-timeline .gob-tl-pill[data-status='alta'],
gob-timeline .gob-tl-pill[data-tone='info'] {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
}
gob-timeline .gob-tl-pill[data-status='revision'],
gob-timeline .gob-tl-pill[data-tone='warning'] {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
}
gob-timeline .gob-tl-pill[data-status='cerrado'],
gob-timeline .gob-tl-pill[data-tone='success'] {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
}
gob-timeline .gob-tl-pill[data-status='rechazado'],
gob-timeline .gob-tl-pill[data-tone='danger'] {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
}
gob-timeline[tone='dark'] .gob-tl-pill[data-status='alta'],
gob-timeline[tone='dark'] .gob-tl-pill[data-tone='info'] {
  background: rgba(47, 95, 138, 0.28);
  color: #9ec0e0;
}
gob-timeline[tone='dark'] .gob-tl-pill[data-status='revision'],
gob-timeline[tone='dark'] .gob-tl-pill[data-tone='warning'] {
  background: rgba(208, 146, 26, 0.28);
  color: #f0c56a;
}
gob-timeline[tone='dark'] .gob-tl-pill[data-status='cerrado'],
gob-timeline[tone='dark'] .gob-tl-pill[data-tone='success'] {
  background: rgba(31, 138, 85, 0.28);
  color: #7dcea0;
}
gob-timeline[tone='dark'] .gob-tl-pill[data-status='rechazado'],
gob-timeline[tone='dark'] .gob-tl-pill[data-tone='danger'] {
  background: rgba(198, 40, 40, 0.28);
  color: #f0a0a0;
}

/* Activo: lavado cafe + borde vino suave */
gob-timeline .gob-tl-item:hover .gob-tl-body,
gob-timeline .gob-tl-item:focus-visible .gob-tl-body,
gob-timeline .gob-tl-item[data-active='true'] .gob-tl-body {
  background: var(--gob-tl-active-bg);
}

gob-timeline[variant='icons'] .gob-tl-body,
gob-timeline[variant='cards'] .gob-tl-body,
gob-timeline[variant='complete'] .gob-tl-body,
gob-timeline[variant='status'] .gob-tl-body,
gob-timeline[variant='basic'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[variant='alternating'] .gob-tl-item[data-active='true'] .gob-tl-body {
  padding: 12px 14px 13px;
  border: 1px solid color-mix(in srgb, var(--gob-tl-cafe) 28%, transparent);
  background: var(--gob-tl-surface);
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.03);
}
gob-timeline[variant='basic'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[variant='alternating'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[variant='icons'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[variant='icons'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[variant='cards'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[variant='cards'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[variant='complete'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[variant='complete'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[variant='status'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[variant='status'] .gob-tl-item[data-active='true'] .gob-tl-body {
  border-color: color-mix(in srgb, var(--gob-tl-vino) 22%, var(--gob-tl-cafe));
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.06);
}
gob-timeline[tone='dark'][variant='basic'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[tone='dark'][variant='alternating'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[tone='dark'][variant='icons'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[tone='dark'][variant='icons'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[tone='dark'][variant='cards'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[tone='dark'][variant='cards'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[tone='dark'][variant='complete'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[tone='dark'][variant='complete'] .gob-tl-item[data-active='true'] .gob-tl-body,
gob-timeline[tone='dark'][variant='status'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[tone='dark'][variant='status'] .gob-tl-item[data-active='true'] .gob-tl-body {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

gob-timeline[variant='icons'],
gob-timeline[variant='complete'] {
  --gob-tl-rail: 34px;
  --gob-tl-gap: 18px;
}
gob-timeline[variant='icons'] .gob-tl-rail::before,
gob-timeline[variant='complete'] .gob-tl-rail::before {
  top: 34px;
}

gob-timeline[variant='icons'] .gob-tl-body,
gob-timeline[variant='cards'] .gob-tl-body,
gob-timeline[variant='complete'] .gob-tl-body,
gob-timeline[variant='status'] .gob-tl-body {
  padding: 12px 14px 13px;
  border: 1px solid var(--gob-tl-border);
  background: var(--gob-tl-surface);
}

gob-timeline[variant='alternating'] .gob-tl-item:nth-child(even) .gob-tl-body {
  text-align: right;
}
gob-timeline[variant='alternating'] .gob-tl-item:nth-child(even) .gob-tl-head {
  flex-direction: row-reverse;
}

gob-timeline[variant='dense'] {
  --gob-tl-rail: 22px;
  --gob-tl-gap: 12px;
}
gob-timeline[variant='dense'] .gob-tl-dot {
  width: 9px;
  height: 9px;
  margin-top: 5px;
}
gob-timeline[variant='dense'] .gob-tl-icon {
  width: 26px;
  height: 26px;
}
gob-timeline[variant='dense'] .gob-tl-body {
  padding: 2px 0 4px;
  gap: 2px;
}
gob-timeline[variant='dense'] .gob-tl-title {
  font-size: 13px;
}
gob-timeline[variant='dense'] .gob-tl-desc {
  font-size: 12px;
}

/* Numerada */
gob-timeline .gob-tl-num {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  margin-top: 2px;
  border-radius: 999px;
  background: var(--gob-tl-vino);
  color: #fff;
  border: 2px solid #fff;
  box-shadow: 0 0 0 3px var(--gob-tl-vino-soft);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.02em;
  flex: 0 0 auto;
  transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
}
gob-timeline .gob-tl-item:nth-child(even) .gob-tl-num {
  background: var(--gob-tl-cafe);
  box-shadow: 0 0 0 3px var(--gob-tl-cafe-soft);
}
gob-timeline .gob-tl-item:hover .gob-tl-num,
gob-timeline .gob-tl-item[data-active='true'] .gob-tl-num {
  transform: scale(1.08);
  box-shadow:
    0 0 0 3px #fff,
    0 0 0 6px var(--gob-tl-cafe-mid);
}
gob-timeline[variant='numbered'] {
  --gob-tl-rail: 28px;
  --gob-tl-gap: 18px;
}
gob-timeline[variant='numbered'] .gob-tl-rail::before {
  top: 28px;
}
gob-timeline[variant='numbered'] .gob-tl-item[data-active='true'] .gob-tl-body {
  padding: 12px 14px 13px;
  border: 1px solid color-mix(in srgb, var(--gob-tl-vino) 22%, var(--gob-tl-cafe));
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.06);
}
gob-timeline[tone='dark'][variant='numbered'] .gob-tl-item[data-active='true'] .gob-tl-body {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

/* Fechas */
gob-timeline .gob-tl-date {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-tl-vino);
}
gob-timeline .gob-tl-when {
  display: grid;
  gap: 2px;
  min-width: 0;
}
gob-timeline[variant='dates'] .gob-tl-body {
  padding: 12px 14px 13px;
  border: 1px solid var(--gob-tl-border);
  background: #ffffff;
}
gob-timeline[variant='dates'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[variant='dates'] .gob-tl-item[data-active='true'] .gob-tl-body {
  border-color: color-mix(in srgb, var(--gob-tl-vino) 22%, var(--gob-tl-cafe));
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.06);
}
gob-timeline[tone='dark'][variant='dates'] .gob-tl-body,
gob-timeline[tone='dark'][variant='dates'] .gob-tl-item:hover .gob-tl-body,
gob-timeline[tone='dark'][variant='dates'] .gob-tl-item[data-active='true'] .gob-tl-body {
  background: rgba(255, 255, 255, 0.06);
  box-shadow: none;
}

/* Hitos */
gob-timeline[variant='milestones'] {
  --gob-tl-rail: 32px;
  --gob-tl-gap: 28px;
  --gob-tl-line-width: 2px;
}
gob-timeline[variant='milestones'] .gob-tl-dot {
  width: 14px;
  height: 14px;
  margin-top: 4px;
  box-shadow: 0 0 0 4px var(--gob-tl-vino-soft);
}
gob-timeline[variant='milestones'] .gob-tl-item:nth-child(even) .gob-tl-dot {
  box-shadow: 0 0 0 4px var(--gob-tl-cafe-soft);
}
gob-timeline[variant='milestones'] .gob-tl-rail::before {
  top: 18px;
}
gob-timeline[variant='milestones'] .gob-tl-title {
  font-size: 16px;
  letter-spacing: -0.02em;
}
gob-timeline[variant='milestones'] .gob-tl-item[data-active='true'] .gob-tl-body {
  padding: 12px 14px 13px;
  border: 1px solid color-mix(in srgb, var(--gob-tl-vino) 22%, var(--gob-tl-cafe));
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.06);
}
gob-timeline[tone='dark'][variant='milestones'] .gob-tl-item[data-active='true'] .gob-tl-body {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

/* Horizontal */
gob-timeline[variant='horizontal'] .gob-tl-item {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  row-gap: 12px;
  min-width: 168px;
  max-width: 200px;
  flex: 0 0 auto;
  padding: 0 20px 0 0;
  column-gap: 0;
}
gob-timeline[variant='horizontal'] .gob-tl-rail {
  width: 100%;
  height: 28px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0;
}
gob-timeline[variant='horizontal'] .gob-tl-rail::before {
  top: 50%;
  left: 11px;
  right: -20px;
  bottom: auto;
  width: auto;
  height: var(--gob-tl-line-width);
  transform: translateY(-50%);
  border-radius: 999px;
}
gob-timeline[variant='horizontal'] .gob-tl-item:last-child .gob-tl-rail::before {
  display: none;
}
gob-timeline[variant='horizontal'] .gob-tl-dot {
  margin-top: 0;
}
gob-timeline[variant='horizontal'] .gob-tl-body {
  padding: 0;
}
gob-timeline[variant='horizontal'] .gob-tl-item[data-active='true'] .gob-tl-body {
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, var(--gob-tl-vino) 22%, var(--gob-tl-cafe));
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.06);
}
gob-timeline[tone='dark'][variant='horizontal'] .gob-tl-item[data-active='true'] .gob-tl-body {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

/* Agrupada */
gob-timeline .gob-tl-group {
  display: block;
  width: 100%;
  margin: 8px 0 10px;
  padding: 0 0 0 calc(var(--gob-tl-rail) + 16px);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--gob-tl-cafe);
}
gob-timeline .gob-tl-group:first-child {
  margin-top: 0;
}
gob-timeline[variant='grouped'] {
  --gob-tl-gap: 16px;
}
gob-timeline[variant='grouped'] .gob-tl-item[data-active='true'] .gob-tl-body {
  padding: 12px 14px 13px;
  border: 1px solid color-mix(in srgb, var(--gob-tl-vino) 22%, var(--gob-tl-cafe));
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.06);
}
gob-timeline[tone='dark'][variant='grouped'] .gob-tl-item[data-active='true'] .gob-tl-body {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: none;
}
`;
