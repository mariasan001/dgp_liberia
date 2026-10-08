import type { ProgressStatus, ProgressVariant } from './progress-constants';

function pct(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.round((value / max) * 1000) / 10;
}

function statusLabel(status: ProgressStatus): string {
  switch (status) {
    case 'info':
      return 'En curso';
    case 'warning':
      return 'Revision';
    case 'success':
      return 'Completado';
    case 'danger':
      return 'Retrasado';
    default:
      return 'Avance';
  }
}

function head(
  label: string,
  valueText: string,
  status: ProgressStatus,
  showPill: boolean,
  compactValue = false,
): string {
  const valueHtml = compactValue
    ? `<p class="value" style="font-size:15px;letter-spacing:-0.02em">${valueText}</p>`
    : `<p class="value">${valueText.replace('%', '')}<small>%</small></p>`;

  return `<div class="head">
  <div class="head-main">
    <div class="meta">
      ${showPill ? `<span class="pill">${statusLabel(status)}</span>` : ''}
    </div>
    <p class="label">${label}</p>
  </div>
  ${valueHtml}
</div>`;
}

function barTrack(percent: number, stacked = false): string {
  return `<div class="track" part="track">
  <span class="fill" part="fill" style="width:${percent}%">
    ${stacked ? '<span class="fill-accent" aria-hidden="true"></span>' : ''}
  </span>
</div>`;
}

function ringMarkup(percent: number, showCaption = true): string {
  const size = 118;
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const haloR = 50;
  return `<div class="ring-wrap">
  <div class="ring" part="ring">
    <svg viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle class="ring-halo" cx="59" cy="59" r="${haloR}"></circle>
      <circle class="ring-track" cx="59" cy="59" r="${r}"></circle>
      <circle class="ring-fill" cx="59" cy="59" r="${r}"
        stroke-dasharray="${c.toFixed(2)}"
        stroke-dashoffset="${offset.toFixed(2)}"></circle>
    </svg>
    <div class="ring-center">
      ${Math.round(percent)}%
      ${showCaption ? '<span>avance</span>' : ''}
    </div>
  </div>
</div>`;
}

function ringMarkupCompact(percent: number): string {
  const size = 92;
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return `<div class="ring" part="ring">
  <svg viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle class="ring-track" cx="46" cy="46" r="${r}" stroke-width="8"></circle>
    <circle class="ring-fill" cx="46" cy="46" r="${r}" stroke-width="8"
      stroke-dasharray="${c.toFixed(2)}"
      stroke-dashoffset="${offset.toFixed(2)}"></circle>
  </svg>
  <div class="ring-center" style="font-size:18px">
    ${Math.round(percent)}%
  </div>
</div>`;
}

function stepsMarkup(value: number, steps: number): string {
  const active = Math.min(
    steps,
    Math.max(1, Math.round((value / 100) * steps) || 1),
  );
  const parts: string[] = ['<div class="steps" part="steps">'];
  for (let i = 1; i <= steps; i += 1) {
    const done = i < active;
    const isActive = i === active;
    parts.push(`<div class="step" data-done="${done ? 'true' : 'false'}" data-active="${isActive ? 'true' : 'false'}">
  <span class="step-dot">${i}</span>
  ${i < steps ? '<span class="step-line"></span>' : ''}
</div>`);
  }
  parts.push('</div>');
  return parts.join('');
}

function segmentedMarkup(percent: number, segments: number): string {
  const onCount = Math.round((percent / 100) * segments);
  const parts: string[] = [
    `<div class="segments" style="--gob-pg-segments:${segments}" part="segments">`,
  ];
  for (let i = 0; i < segments; i += 1) {
    parts.push(
      `<span class="segment" data-on="${i < onCount ? 'true' : 'false'}"></span>`,
    );
  }
  parts.push('</div>');
  return parts.join('');
}

export function renderProgressMarkup(options: {
  variant: ProgressVariant;
  value: number;
  max: number;
  label: string;
  status: ProgressStatus;
  steps: number;
}): string {
  const { variant, value, max, label, status, steps } = options;
  const percent = pct(value, max);
  const rounded = Math.round(percent);
  const valueText =
    variant === 'indeterminate' ? '…' : `${rounded}%`;
  const showHead =
    variant === 'labeled' ||
    variant === 'complete' ||
    variant === 'stacked' ||
    variant === 'steps' ||
    variant === 'segmented' ||
    variant === 'ring' ||
    variant === 'thick';
  const showPill = variant === 'complete' || status !== 'default';

  const parts: string[] = [];

  if (showHead) {
    parts.push(
      head(
        label,
        valueText,
        status,
        showPill,
        variant === 'steps' || variant === 'indeterminate',
      ),
    );
  }

  switch (variant) {
    case 'ring':
      parts.push(ringMarkup(percent));
      break;
    case 'steps': {
      const stepNow = Math.max(1, Math.round((percent / 100) * steps) || 1);
      parts.push(stepsMarkup(percent, steps));
      parts.push(`<p class="hint">Paso ${stepNow} de ${steps}</p>`);
      break;
    }
    case 'segmented':
      parts.push(segmentedMarkup(percent, steps));
      break;
    case 'indeterminate':
      if (!showHead) {
        parts.push(`<p class="label">${label || 'Procesando…'}</p>`);
      }
      parts.push(barTrack(36));
      parts.push(`<p class="hint">Proceso en curso</p>`);
      break;
    case 'complete':
      parts.push(`<div class="complete-row">
  ${ringMarkupCompact(percent)}
  <div class="complete-side">
    ${barTrack(percent)}
    <p class="hint">${label}</p>
  </div>
</div>`);
      break;
    case 'stacked':
      parts.push(barTrack(percent, true));
      break;
    case 'labeled':
    case 'thin':
    case 'thick':
    case 'bar':
    default:
      parts.push(barTrack(percent));
      break;
  }

  return parts.join('');
}
