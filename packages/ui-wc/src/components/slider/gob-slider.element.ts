import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SLIDER_OBSERVED_ATTRIBUTES,
  buildMarks,
  clamp,
  formatValue,
  parseSliderValue,
  percent,
  resolveSliderSize,
  resolveSliderStatus,
  resolveSliderVariant,
  serializeSliderValue,
  snap,
  toNumber,
} from './slider-constants';
import { sliderStyles } from './slider-styles';

function statusPill(status: string): string {
  switch (status) {
    case 'error':
      return 'Error';
    case 'success':
      return 'Valido';
    case 'warning':
      return 'Revision';
    case 'info':
      return 'Info';
    default:
      return '';
  }
}

class GobSliderElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SLIDER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly headEl: HTMLElement;
  private readonly labelWrap: HTMLElement;
  private readonly labelEl: HTMLLabelElement;
  private readonly statusEl: HTMLSpanElement;
  private readonly valuePillEl: HTMLSpanElement;
  private readonly shellEl: HTMLElement;
  private readonly controlEl: HTMLElement;
  private readonly trackEl: HTMLElement;
  private readonly fillEl: HTMLElement;
  private readonly segmentsEl: HTMLElement;
  private readonly thumbA: HTMLButtonElement;
  private readonly thumbB: HTMLButtonElement;
  private readonly tooltipEl: HTMLElement;
  private readonly marksEl: HTMLElement;
  private readonly boundsEl: HTMLElement;
  private readonly helperEl: HTMLParagraphElement;
  private readonly hiddenA: HTMLInputElement;
  private readonly hiddenB: HTMLInputElement;

  private min = 0;
  private max = 100;
  private step = 1;
  private a = 50;
  private b = 50;
  private isRange = false;
  private isVertical = false;
  private activeThumb: 'a' | 'b' | null = null;
  private fieldId = `gob-sl-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = sliderStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';

    this.headEl = document.createElement('div');
    this.headEl.className = 'head';

    this.labelWrap = document.createElement('div');
    this.labelWrap.style.display = 'flex';
    this.labelWrap.style.alignItems = 'center';
    this.labelWrap.style.gap = '8px';
    this.labelWrap.style.minWidth = '0';

    this.labelEl = document.createElement('label');
    this.labelEl.className = 'label';

    this.statusEl = document.createElement('span');
    this.statusEl.className = 'pill';
    this.statusEl.hidden = true;

    this.labelWrap.append(this.labelEl, this.statusEl);

    this.valuePillEl = document.createElement('span');
    this.valuePillEl.className = 'value-pill';

    this.headEl.append(this.labelWrap, this.valuePillEl);

    this.shellEl = document.createElement('div');
    this.shellEl.className = 'shell';

    this.controlEl = document.createElement('div');
    this.controlEl.className = 'control';

    this.trackEl = document.createElement('div');
    this.trackEl.className = 'track';

    this.fillEl = document.createElement('div');
    this.fillEl.className = 'fill';

    this.segmentsEl = document.createElement('div');
    this.segmentsEl.className = 'segments';
    this.segmentsEl.setAttribute('aria-hidden', 'true');

    this.thumbA = document.createElement('button');
    this.thumbA.type = 'button';
    this.thumbA.className = 'thumb';
    this.thumbA.dataset.thumb = 'a';

    this.tooltipEl = document.createElement('span');
    this.tooltipEl.className = 'tooltip';
    this.thumbA.appendChild(this.tooltipEl);

    this.thumbB = document.createElement('button');
    this.thumbB.type = 'button';
    this.thumbB.className = 'thumb';
    this.thumbB.dataset.thumb = 'b';
    this.thumbB.hidden = true;

    this.controlEl.append(
      this.trackEl,
      this.fillEl,
      this.segmentsEl,
      this.thumbA,
      this.thumbB,
    );

    this.marksEl = document.createElement('div');
    this.marksEl.className = 'marks';
    this.marksEl.hidden = true;

    this.boundsEl = document.createElement('div');
    this.boundsEl.className = 'bounds';

    this.shellEl.append(this.controlEl, this.marksEl, this.boundsEl);

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.hidden = true;

    const hiddenWrap = document.createElement('div');
    hiddenWrap.className = 'hidden-inputs';
    this.hiddenA = document.createElement('input');
    this.hiddenA.type = 'hidden';
    this.hiddenB = document.createElement('input');
    this.hiddenB.type = 'hidden';
    hiddenWrap.append(this.hiddenA, this.hiddenB);

    this.rootEl.append(this.headEl, this.shellEl, this.helperEl, hiddenWrap);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.controlEl.addEventListener('pointerdown', this.onControlPointerDown);
    this.thumbA.addEventListener('keydown', this.onThumbKey);
    this.thumbB.addEventListener('keydown', this.onThumbKey);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    window.addEventListener('pointercancel', this.onPointerUp);
    this.syncFromAttributes();
  }

  disconnectedCallback() {
    this.controlEl.removeEventListener('pointerdown', this.onControlPointerDown);
    this.thumbA.removeEventListener('keydown', this.onThumbKey);
    this.thumbB.removeEventListener('keydown', this.onThumbKey);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (this.activeThumb) return;
    this.syncFromAttributes();
  }

  private get unit(): string {
    return this.getAttribute('unit')?.trim() || '';
  }

  private readonly onControlPointerDown = (e: PointerEvent) => {
    if (this.hasAttribute('disabled') || this.hasAttribute('readonly')) return;
    if (e.button !== 0) return;
    e.preventDefault();

    const target = (e.target as HTMLElement).closest('.thumb') as HTMLElement | null;
    if (target?.dataset.thumb === 'a' || target?.dataset.thumb === 'b') {
      this.activeThumb = target.dataset.thumb as 'a' | 'b';
    } else {
      const value = this.valueFromPointer(e);
      if (this.isRange) {
        const distA = Math.abs(value - this.a);
        const distB = Math.abs(value - this.b);
        this.activeThumb = distA <= distB ? 'a' : 'b';
      } else {
        this.activeThumb = 'a';
      }
      this.setThumbValue(this.activeThumb, value, false);
    }
    this.controlEl.setPointerCapture?.(e.pointerId);
  };

  private readonly onPointerMove = (e: PointerEvent) => {
    if (!this.activeThumb) return;
    this.setThumbValue(this.activeThumb, this.valueFromPointer(e), false);
  };

  private readonly onPointerUp = () => {
    if (!this.activeThumb) return;
    this.activeThumb = null;
    this.commit(true);
  };

  private readonly onThumbKey = (e: KeyboardEvent) => {
    if (this.hasAttribute('disabled') || this.hasAttribute('readonly')) return;
    const thumb = ((e.currentTarget as HTMLElement).dataset.thumb || 'a') as 'a' | 'b';
    const dir =
      e.key === 'ArrowRight' || e.key === 'ArrowUp'
        ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowDown'
          ? -1
          : 0;
    if (!dir) return;
    e.preventDefault();
    const current = thumb === 'a' ? this.a : this.b;
    this.setThumbValue(thumb, current + dir * this.step, true);
  };

  private valueFromPointer(e: PointerEvent): number {
    const rect = this.trackEl.getBoundingClientRect();
    if (this.isVertical) {
      const ratio = rect.height
        ? clamp((rect.bottom - e.clientY) / rect.height, 0, 1)
        : 0;
      return snap(this.min + ratio * (this.max - this.min), this.min, this.max, this.step);
    }
    const ratio = rect.width ? clamp((e.clientX - rect.left) / rect.width, 0, 1) : 0;
    return snap(this.min + ratio * (this.max - this.min), this.min, this.max, this.step);
  }

  private setThumbValue(thumb: 'a' | 'b', value: number, emitChange: boolean) {
    const next = snap(value, this.min, this.max, this.step);
    if (this.isRange) {
      if (thumb === 'a') {
        this.a = Math.min(next, this.b);
      } else {
        this.b = Math.max(next, this.a);
      }
    } else {
      this.a = next;
      this.b = next;
    }
    this.renderVisual();
    this.emitInput();
    if (emitChange) this.commit(true);
  }

  private commit(emitChangeEvent: boolean) {
    const serialized = serializeSliderValue(this.a, this.b, this.isRange);
    if (this.getAttribute('value') !== serialized) {
      this.setAttribute('value', serialized);
    }
    this.hiddenA.value = String(this.a);
    this.hiddenB.value = this.isRange ? String(this.b) : '';
    this.renderVisual();
    if (emitChangeEvent) {
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      this.dispatchEvent(
        new CustomEvent('gob-slider', {
          detail: {
            value: serialized,
            start: this.a,
            end: this.isRange ? this.b : this.a,
            range: this.isRange,
          },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  private emitInput() {
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private renderVisual() {
    const unit = this.unit;
    const pa = percent(this.a, this.min, this.max);
    const pb = percent(this.b, this.min, this.max);
    const label = this.isRange
      ? `${formatValue(this.a, unit)} – ${formatValue(this.b, unit)}`
      : formatValue(this.a, unit);

    if (this.isVertical) {
      if (this.isRange) {
        this.fillEl.style.bottom = `${pa}%`;
        this.fillEl.style.height = `${Math.max(0, pb - pa)}%`;
        this.fillEl.style.top = 'auto';
        this.fillEl.style.width = '';
        this.fillEl.style.left = '';
        this.thumbB.hidden = false;
        this.thumbB.style.bottom = `${pb}%`;
        this.thumbB.style.top = 'auto';
        this.thumbB.style.left = '50%';
      } else {
        this.fillEl.style.bottom = '0%';
        this.fillEl.style.height = `${pa}%`;
        this.fillEl.style.top = 'auto';
        this.fillEl.style.width = '';
        this.fillEl.style.left = '';
        this.thumbB.hidden = true;
      }
      this.thumbA.style.bottom = `${pa}%`;
      this.thumbA.style.top = 'auto';
      this.thumbA.style.left = '50%';
    } else if (this.isRange) {
      this.fillEl.style.left = `${pa}%`;
      this.fillEl.style.width = `${Math.max(0, pb - pa)}%`;
      this.fillEl.style.bottom = '';
      this.fillEl.style.height = '';
      this.fillEl.style.top = '';
      this.thumbB.hidden = false;
      this.thumbB.style.left = `${pb}%`;
      this.thumbB.style.bottom = '';
      this.thumbB.style.top = '';
      this.thumbA.style.left = `${pa}%`;
      this.thumbA.style.bottom = '';
      this.thumbA.style.top = '';
    } else {
      this.fillEl.style.left = '0%';
      this.fillEl.style.width = `${pa}%`;
      this.fillEl.style.bottom = '';
      this.fillEl.style.height = '';
      this.fillEl.style.top = '';
      this.thumbB.hidden = true;
      this.thumbA.style.left = `${pa}%`;
      this.thumbA.style.bottom = '';
      this.thumbA.style.top = '';
    }

    this.valuePillEl.textContent = label;
    this.tooltipEl.textContent = label;
    this.tooltipEl.style.left = this.isVertical ? '' : '50%';

    this.thumbA.setAttribute('aria-valuenow', String(this.a));
    this.thumbB.setAttribute('aria-valuenow', String(this.b));

    this.boundsEl.innerHTML = `<span>${formatValue(this.min, unit)}</span><span>${formatValue(this.max, unit)}</span>`;
  }

  private renderSegments() {
    const variant = resolveSliderVariant(this.getAttribute('variant'));
    this.segmentsEl.replaceChildren();
    if (variant !== 'segmented') return;

    const count = Math.min(
      24,
      Math.max(2, Math.round((this.max - this.min) / this.step) + 1),
    );
    for (let i = 1; i < count - 1; i += 1) {
      const el = document.createElement('span');
      el.className = 'segment';
      el.style.left = `${(i / (count - 1)) * 100}%`;
      this.segmentsEl.appendChild(el);
    }
  }

  private renderMarks() {
    const variant = resolveSliderVariant(this.getAttribute('variant'));
    const show = variant === 'marks' || variant === 'complete' || variant === 'segmented';
    this.marksEl.hidden = !show || this.isVertical;
    this.marksEl.replaceChildren();
    if (!show || this.isVertical) return;

    for (const mark of buildMarks(this.min, this.max, this.step)) {
      const el = document.createElement('div');
      el.className = 'mark';
      el.style.left = `${percent(mark, this.min, this.max)}%`;
      el.innerHTML = `<i></i><span>${formatValue(mark, this.unit)}</span>`;
      this.marksEl.appendChild(el);
    }
  }

  private syncFromAttributes() {
    const variant = resolveSliderVariant(this.getAttribute('variant'));
    const status = resolveSliderStatus(this.getAttribute('status'));
    const size = resolveSliderSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const required = this.hasAttribute('required');
    const label = this.getAttribute('label')?.trim() || '';
    const helper = this.getAttribute('helper')?.trim() || '';

    this.min = toNumber(this.getAttribute('min'), 0);
    this.max = toNumber(this.getAttribute('max'), 100);
    if (this.max < this.min) {
      const swap = this.min;
      this.min = this.max;
      this.max = swap;
    }
    this.step = Math.max(0.0001, toNumber(this.getAttribute('step'), 1));
    this.isRange = variant === 'range';
    this.isVertical = variant === 'vertical';

    const parsed = parseSliderValue(
      this.getAttribute('value'),
      this.isRange,
      this.min,
      this.max,
    );
    this.a = snap(parsed.a, this.min, this.max, this.step);
    this.b = snap(parsed.b, this.min, this.max, this.step);
    if (this.a > this.b) {
      const swap = this.a;
      this.a = this.b;
      this.b = swap;
    }

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';
    this.rootEl.dataset.readonly = readonly ? 'true' : 'false';
    this.rootEl.dataset.range = this.isRange ? 'true' : 'false';
    this.rootEl.dataset.orientation = this.isVertical ? 'vertical' : 'horizontal';

    this.labelEl.htmlFor = this.fieldId;
    this.thumbA.id = this.fieldId;

    const showLabel =
      Boolean(label) && variant !== 'basic' && variant !== 'pill';
    this.labelEl.hidden = !showLabel;
    this.labelEl.innerHTML = '';
    if (showLabel) {
      this.labelEl.append(document.createTextNode(label));
      if (required) {
        const req = document.createElement('span');
        req.className = 'req';
        req.textContent = '*';
        this.labelEl.append(req);
      }
    }

    const pill = statusPill(status);
    this.statusEl.hidden = !pill;
    this.statusEl.textContent = pill;
    this.headEl.hidden = !showLabel && !pill;
    // Always show value pill even if head would be empty for basic
    if (!showLabel && !pill) {
      this.headEl.hidden = false;
      this.labelWrap.hidden = true;
    } else {
      this.labelWrap.hidden = false;
    }

    this.thumbA.disabled = disabled;
    this.thumbB.disabled = disabled;
    this.thumbA.setAttribute('role', 'slider');
    this.thumbB.setAttribute('role', 'slider');
    this.thumbA.setAttribute('aria-valuemin', String(this.min));
    this.thumbA.setAttribute('aria-valuemax', String(this.isRange ? this.b : this.max));
    this.thumbB.setAttribute('aria-valuemin', String(this.a));
    this.thumbB.setAttribute('aria-valuemax', String(this.max));
    this.thumbA.setAttribute('aria-label', label || 'Valor');
    this.thumbB.setAttribute('aria-label', label ? `${label} fin` : 'Valor fin');
    this.thumbA.tabIndex = disabled ? -1 : 0;
    this.thumbB.tabIndex = disabled ? -1 : 0;

    const name = this.getAttribute('name') || '';
    this.hiddenA.name = name;
    this.hiddenB.name = name ? `${name}-end` : '';
    this.hiddenA.value = String(this.a);
    this.hiddenB.value = this.isRange ? String(this.b) : '';

    const showHelper =
      Boolean(helper) ||
      variant === 'helper' ||
      variant === 'complete' ||
      status !== 'default';
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent =
      helper ||
      (status === 'error'
        ? 'Ajusta el valor requerido'
        : status === 'success'
          ? 'Valor confirmado'
          : status === 'warning'
            ? 'Revisa el rango'
            : '');

    this.renderMarks();
    this.renderSegments();
    this.renderVisual();
  }
}

defineCustomElement('gob-slider', GobSliderElement);

export {};
