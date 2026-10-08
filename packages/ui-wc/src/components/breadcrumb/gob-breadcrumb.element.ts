import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  BREADCRUMB_OBSERVED_ATTRIBUTES,
  resolveBreadcrumbTone,
  resolveBreadcrumbVariant,
} from './breadcrumb-constants';
import { breadcrumbStyles } from './breadcrumb-styles';

class GobBreadcrumbElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...BREADCRUMB_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = breadcrumbStyles;

    this.rootEl = document.createElement('nav');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('aria-label', 'Migas de pan');
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
    const variant = resolveBreadcrumbVariant(this.getAttribute('variant'));
    const tone = resolveBreadcrumbTone(this.getAttribute('tone'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
  }
}

defineCustomElement('gob-breadcrumb', GobBreadcrumbElement);

export {};
