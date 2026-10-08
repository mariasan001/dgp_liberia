import type {
  SpinnerStatus,
  SpinnerVariant,
} from './spinner-constants';

function statusLabel(status: SpinnerStatus): string {
  switch (status) {
    case 'info':
      return 'En curso';
    case 'warning':
      return 'Espera';
    case 'success':
      return 'Listo';
    case 'danger':
      return 'Error';
    default:
      return 'Cargando';
  }
}

function visualFor(variant: SpinnerVariant): string {
  switch (variant) {
    case 'dual':
    case 'complete':
    case 'page':
    case 'overlay':
      return `<div class="visual" aria-hidden="true">
  <div class="dual">
    <span class="dual-outer"></span>
    <span class="dual-inner"></span>
  </div>
</div>`;
    case 'dots':
      return `<div class="dots" aria-hidden="true">
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>`;
    case 'pulse':
      return `<div class="visual" aria-hidden="true"><span class="pulse"></span></div>`;
    case 'bars':
      return `<div class="bars" aria-hidden="true">
  <span class="bar"></span>
  <span class="bar"></span>
  <span class="bar"></span>
  <span class="bar"></span>
</div>`;
    case 'orbit':
      return `<div class="visual" aria-hidden="true">
  <div class="orbit">
    <span class="orbit-core"></span>
    <span class="orbit-sat"></span>
  </div>
</div>`;
    case 'arc':
      return `<div class="visual" aria-hidden="true">
  <svg class="arc" viewBox="0 0 48 48">
    <circle class="arc-track" cx="24" cy="24" r="18"></circle>
    <circle class="arc-stroke" cx="24" cy="24" r="18"></circle>
  </svg>
</div>`;
    case 'dash':
      return `<div class="visual" aria-hidden="true"><span class="dash"></span></div>`;
    case 'comet':
      return `<div class="visual" aria-hidden="true">
  <div class="comet">
    <span class="comet-tail"></span>
    <span class="comet-head"></span>
  </div>
</div>`;
    case 'petals':
      return `<div class="visual" aria-hidden="true">
  <div class="petals">
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
  </div>
</div>`;
    case 'metro':
      return `<div class="visual" aria-hidden="true">
  <div class="metro">
    <span></span><span></span><span></span><span></span>
  </div>
</div>`;
    case 'wave':
      return `<div class="wave" aria-hidden="true">
  <i></i><i></i><i></i><i></i><i></i>
</div>`;
    case 'radar':
      return `<div class="visual" aria-hidden="true">
  <div class="radar">
    <span class="radar-sweep"></span>
    <span class="radar-dot"></span>
  </div>
</div>`;
    case 'infinity':
      return `<div class="visual" aria-hidden="true">
  <div class="infinity">
    <span class="infinity-path"></span>
    <span class="infinity-a"></span>
    <span class="infinity-b"></span>
  </div>
</div>`;
    case 'morph':
      return `<div class="visual" aria-hidden="true"><span class="morph"></span></div>`;
    case 'button':
    case 'inline':
    case 'ring':
    default:
      return `<div class="visual" aria-hidden="true"><span class="ring"></span></div>`;
  }
}

export function renderSpinnerMarkup(options: {
  variant: SpinnerVariant;
  label: string;
  status: SpinnerStatus;
}): string {
  const { variant, label, status } = options;
  const visual = visualFor(variant);
  const showPill =
    status !== 'default' || variant === 'complete' || variant === 'overlay';
  const showLabel =
    variant === 'inline' ||
    variant === 'page' ||
    variant === 'overlay' ||
    variant === 'complete' ||
    Boolean(label && variant !== 'ring' && variant !== 'button');

  if (variant === 'button') {
    return `${visual}`;
  }

  if (variant === 'inline') {
    return `${visual}<p class="label" style="font-size:13px">${label || 'Cargando…'}</p>`;
  }

  if (variant === 'complete' || variant === 'page' || variant === 'overlay') {
    return `${showPill ? `<span class="pill">${statusLabel(status)}</span>` : ''}
${visual}
<div class="copy">
  <p class="label">${label || 'Cargando contenido'}</p>
  <p class="hint">Esto puede tomar unos segundos</p>
</div>`;
  }

  const parts = [visual];
  if (showPill && status !== 'default') {
    parts.unshift(`<span class="pill">${statusLabel(status)}</span>`);
  }
  if (showLabel && label) {
    parts.push(`<p class="label">${label}</p>`);
  }
  return parts.join('');
}
