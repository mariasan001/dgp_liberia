import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  GRID_OBSERVED_ATTRIBUTES,
  resolveGridGap,
  resolveGridVariant,
} from './grid-constants';
import { gridStyles } from './grid-styles';

class GobGridElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...GRID_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = gridStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.appendChild(document.createElement('slot'));

    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const variant = resolveGridVariant(this.getAttribute('variant'));
    const gap = resolveGridGap(this.getAttribute('gap'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.gap = gap;
  }
}

defineCustomElement('gob-grid', GobGridElement);

export {};
