import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  CONTAINER_OBSERVED_ATTRIBUTES,
  resolveContainerFlag,
  resolveContainerVariant,
} from './container-constants';
import { containerStyles } from './container-styles';

class GobContainerElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...CONTAINER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = containerStyles;

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
    const variant = resolveContainerVariant(this.getAttribute('variant'));
    const radius = resolveContainerFlag(this.getAttribute('radius'));
    const shadow = resolveContainerFlag(this.getAttribute('shadow'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.radius = radius ? 'true' : 'false';
    this.rootEl.dataset.shadow = shadow ? 'true' : 'false';
  }
}

defineCustomElement('gob-container', GobContainerElement);

export {};
