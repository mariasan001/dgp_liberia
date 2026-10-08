import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  PROGRESS_OBSERVED_ATTRIBUTES,
  resolveProgressNumber,
  resolveProgressStatus,
  resolveProgressVariant,
} from './progress-constants';
import { renderProgressMarkup } from './progress-render';
import { progressStyles } from './progress-styles';

class GobProgressElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...PROGRESS_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = progressStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'progressbar');

    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.sync();
  }

  attributeChangedCallback() {
    this.sync();
  }

  private sync() {
    const variant = resolveProgressVariant(this.getAttribute('variant'));
    const max = resolveProgressNumber(this.getAttribute('max'), 100, 1, 1000);
    const value = resolveProgressNumber(this.getAttribute('value'), 0, 0, max);
    const status = resolveProgressStatus(this.getAttribute('status'));
    const steps = resolveProgressNumber(this.getAttribute('steps'), 4, 2, 8);
    const label = this.getAttribute('label')?.trim() || 'Progreso';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;

    const percent = max > 0 ? Math.round((value / max) * 100) : 0;
    this.rootEl.setAttribute('aria-valuemin', '0');
    this.rootEl.setAttribute('aria-valuemax', String(max));
    if (variant === 'indeterminate') {
      this.rootEl.removeAttribute('aria-valuenow');
      this.rootEl.setAttribute('aria-label', label);
    } else {
      this.rootEl.setAttribute('aria-valuenow', String(value));
      this.rootEl.setAttribute('aria-valuetext', `${percent}%`);
      this.rootEl.setAttribute('aria-label', `${label}: ${percent}%`);
    }

    this.rootEl.innerHTML = renderProgressMarkup({
      variant,
      value,
      max,
      label,
      status,
      steps,
    });
  }
}

defineCustomElement('gob-progress', GobProgressElement);

export {};
