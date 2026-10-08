export const SKELETON_VARIANTS = [
  'text',
  'avatar',
  'card',
  'table',
  'list',
  'media',
  'kpi',
  'form',
  'dense',
  'complete',
] as const;

export type SkeletonVariant = (typeof SKELETON_VARIANTS)[number];

export const SKELETON_OBSERVED_ATTRIBUTES = [
  'variant',
  'rows',
  'animated',
] as const;

export function resolveSkeletonVariant(value: string | null): SkeletonVariant {
  if (
    value === 'avatar' ||
    value === 'card' ||
    value === 'table' ||
    value === 'list' ||
    value === 'media' ||
    value === 'kpi' ||
    value === 'form' ||
    value === 'dense' ||
    value === 'complete' ||
    value === 'text'
  ) {
    return value;
  }
  return 'text';
}

export function resolveSkeletonRows(value: string | null, fallback = 3): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(Math.floor(n), 12);
}

export function resolveSkeletonAnimated(value: string | null): boolean {
  if (value === null) return true;
  return value !== 'false' && value !== '0';
}

export const skeletonStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  /* Presentacion unica: gris clarito */
  --gob-sk-base: #e8e8e8;
  --gob-sk-shine: #f5f5f5;
  --gob-sk-mid: rgba(255, 255, 255, 0.55);
  --gob-sk-radius: 10px;
  --gob-sk-bg: #ffffff;
  --gob-sk-border: rgba(24, 21, 17, 0.08);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  gap: 12px;
  min-width: 0;
  padding: 18px;
  border: 1px solid var(--gob-sk-border);
  border-radius: 16px;
  background: var(--gob-sk-bg);
}

.root[data-variant='dense'] {
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
}

.root[data-variant='kpi'] {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.bone {
  display: block;
  background: var(--gob-sk-base);
  border-radius: var(--gob-sk-radius);
  position: relative;
  overflow: hidden;
}

.root[data-animated='true'] .bone::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 0%,
    var(--gob-sk-mid) 42%,
    var(--gob-sk-shine) 50%,
    var(--gob-sk-mid) 58%,
    transparent 100%
  );
  transform: translateX(-120%);
  animation: gob-sk-shimmer 1.45s ease-in-out infinite;
}

@keyframes gob-sk-shimmer {
  100% {
    transform: translateX(120%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .root[data-animated='true'] .bone::after {
    animation: none;
    opacity: 0;
  }
}

.line {
  height: 12px;
  width: 100%;
  border-radius: 8px;
}
.line.w-90 { width: 90%; }
.line.w-75 { width: 75%; }
.line.w-60 { width: 60%; }
.line.w-45 { width: 45%; }
.line.w-35 { width: 35%; }
.line.sm { height: 10px; }
.line.lg { height: 16px; }

.circle {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.circle.lg {
  width: 52px;
  height: 52px;
}

.block {
  width: 100%;
  height: 120px;
  border-radius: 12px;
}
.block.sm {
  height: 72px;
}
.block.tall {
  height: 160px;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.col {
  display: grid;
  gap: 8px;
  min-width: 0;
  flex: 1 1 auto;
}
.stack {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.table {
  display: grid;
  gap: 10px;
}
.table-head,
.table-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr 0.8fr 0.7fr;
  gap: 10px;
  align-items: center;
}
.table-head .bone {
  height: 10px;
  opacity: 0.85;
}

.kpi-card {
  display: grid;
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--gob-sk-border);
  border-radius: 14px;
  background: #ffffff;
}

.form-field {
  display: grid;
  gap: 8px;
}
.form-label {
  height: 10px;
  width: 28%;
}
.form-input {
  height: 36px;
  border-radius: 10px;
}

.media {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 0;
}
`;
