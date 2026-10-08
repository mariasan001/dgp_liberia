import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  ICON_BUTTON_OBSERVED_ATTRIBUTES,
  resolveIconButtonIcon,
  resolveIconButtonSize,
  resolveIconButtonVariant,
} from './icon-button-constants';
import { iconButtonStyles } from './icon-button-styles';

class GobIconButtonElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...ICON_BUTTON_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly btnEl: HTMLButtonElement;
  private readonly iconEl: HTMLElement;
  private readonly spinnerEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = iconButtonStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.btnEl = document.createElement('button');
    this.btnEl.type = 'button';
    this.btnEl.className = 'btn';
    this.btnEl.setAttribute('part', 'button');

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'icon';
    this.iconEl.setAttribute('aria-hidden', 'true');

    this.spinnerEl = document.createElement('span');
    this.spinnerEl.className = 'spinner';
    this.spinnerEl.setAttribute('aria-hidden', 'true');

    this.btnEl.append(this.iconEl, this.spinnerEl);
    this.rootEl.appendChild(this.btnEl);
    shadow.append(style, this.rootEl);

    this.btnEl.addEventListener('click', () => {
      if (this.hasAttribute('disabled') || this.hasAttribute('loading')) return;
      this.dispatchEvent(
        new CustomEvent('gob-icon-button', {
          detail: { icon: this.getAttribute('icon') || 'plus' },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveIconButtonVariant(this.getAttribute('variant'));
    const size = resolveIconButtonSize(this.getAttribute('size'));
    const icon = this.getAttribute('icon');
    const label =
      this.getAttribute('label')?.trim() ||
      this.getAttribute('aria-label')?.trim() ||
      'Accion';
    const disabled = this.hasAttribute('disabled');
    const loading = this.hasAttribute('loading');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.loading = loading ? 'true' : 'false';

    this.btnEl.disabled = disabled || loading;
    this.btnEl.setAttribute('aria-label', label);
    if (loading) this.btnEl.setAttribute('aria-busy', 'true');
    else this.btnEl.removeAttribute('aria-busy');

    this.iconEl.innerHTML = resolveIconButtonIcon(icon);
  }
}

defineCustomElement('gob-icon-button', GobIconButtonElement);
export {};
