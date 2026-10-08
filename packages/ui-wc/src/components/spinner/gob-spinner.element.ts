import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SPINNER_OBSERVED_ATTRIBUTES,
  resolveSpinnerSize,
  resolveSpinnerStatus,
  resolveSpinnerVariant,
} from './spinner-constants';
import { renderSpinnerMarkup } from './spinner-render';
import { spinnerStyles } from './spinner-styles';

class GobSpinnerElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SPINNER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = spinnerStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'status');
    this.rootEl.setAttribute('aria-live', 'polite');

    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.sync();
  }

  attributeChangedCallback() {
    this.sync();
  }

  private sync() {
    const variant = resolveSpinnerVariant(this.getAttribute('variant'));
    const size = resolveSpinnerSize(this.getAttribute('size'));
    const status = resolveSpinnerStatus(this.getAttribute('status'));
    const label = this.getAttribute('label')?.trim() || '';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.status = status;
    this.rootEl.setAttribute('aria-label', label || 'Cargando');
    this.rootEl.innerHTML = renderSpinnerMarkup({ variant, label, status });
  }
}

defineCustomElement('gob-spinner', GobSpinnerElement);

export {};
