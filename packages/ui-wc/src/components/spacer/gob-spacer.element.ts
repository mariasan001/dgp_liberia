import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SPACER_OBSERVED_ATTRIBUTES,
  resolveSpacerVariant,
} from './spacer-constants';
import { spacerStyles } from './spacer-styles';

class GobSpacerElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SPACER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = spacerStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('aria-hidden', 'true');

    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    this.rootEl.dataset.variant = resolveSpacerVariant(this.getAttribute('variant'));
  }
}

defineCustomElement('gob-spacer', GobSpacerElement);

export {};
