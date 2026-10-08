import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import { CHIP_OBSERVED_ATTRIBUTES, type ChipTone } from './chip-constants';
import { chipStyles } from './chip-styles';

function resolveTone(value: string | null): ChipTone {
  if (
    value === 'success' ||
    value === 'error' ||
    value === 'warning' ||
    value === 'neutral' ||
    value === 'primary'
  ) {
    return value;
  }
  return 'primary';
}

class GobChipElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...CHIP_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLSpanElement;
  private readonly dismissBtn: HTMLButtonElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = chipStyles;

    this.rootEl = document.createElement('span');
    this.rootEl.className = 'root';

    const label = document.createElement('span');
    label.className = 'label';
    label.appendChild(document.createElement('slot'));

    this.dismissBtn = document.createElement('button');
    this.dismissBtn.type = 'button';
    this.dismissBtn.className = 'dismiss';
    this.dismissBtn.setAttribute('aria-label', 'Quitar');
    this.dismissBtn.innerHTML =
      '<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2L8 8M8 2L2 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

    this.rootEl.append(label, this.dismissBtn);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.dismissBtn.addEventListener('click', this.handleDismiss);
    this.syncState();
  }

  disconnectedCallback() {
    this.dismissBtn.removeEventListener('click', this.handleDismiss);
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private readonly handleDismiss = (event: MouseEvent) => {
    event.stopPropagation();
    if (this.hasAttribute('disabled')) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('gob-dismiss', {
        bubbles: true,
        composed: true,
      }),
    );
  };

  private syncState() {
    const disabled = this.hasAttribute('disabled');
    const dismissible = this.hasAttribute('dismissible');
    const tone = resolveTone(this.getAttribute('tone'));

    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';
    this.dismissBtn.hidden = !dismissible;
    this.dismissBtn.disabled = disabled;

    const ariaLabel = this.getAttribute('aria-label');
    if (ariaLabel === null) this.rootEl.removeAttribute('aria-label');
    else this.rootEl.setAttribute('aria-label', ariaLabel);
  }
}

defineCustomElement('gob-chip', GobChipElement);

export {};
