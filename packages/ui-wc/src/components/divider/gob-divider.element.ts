import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  DIVIDER_OBSERVED_ATTRIBUTES,
  resolveDividerTone,
  resolveDividerVariant,
} from './divider-constants';
import { dividerStyles } from './divider-styles';

class GobDividerElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...DIVIDER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly labelEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = dividerStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'separator');

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'label';
    this.labelEl.setAttribute('part', 'label');
    const slot = document.createElement('slot');
    this.labelEl.appendChild(slot);

    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const variant = resolveDividerVariant(this.getAttribute('variant'));
    const tone = resolveDividerTone(this.getAttribute('tone'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.setAttribute(
      'aria-orientation',
      variant === 'vertical' ? 'vertical' : 'horizontal',
    );

    if (variant === 'label') {
      if (!this.labelEl.isConnected) {
        this.rootEl.appendChild(this.labelEl);
      }
    } else if (this.labelEl.isConnected) {
      this.labelEl.remove();
    }
  }
}

defineCustomElement('gob-divider', GobDividerElement);

export {};
