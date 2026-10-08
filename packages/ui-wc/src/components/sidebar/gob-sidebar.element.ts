import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SIDEBAR_OBSERVED_ATTRIBUTES,
  resolveSidebarTone,
  resolveSidebarVariant,
} from './sidebar-constants';
import { sidebarStyles } from './sidebar-styles';

class GobSidebarElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SIDEBAR_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = sidebarStyles;

    this.rootEl = document.createElement('aside');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const brand = document.createElement('div');
    brand.className = 'brand';
    brand.setAttribute('part', 'brand');
    const brandSlot = document.createElement('slot');
    brandSlot.name = 'brand';
    brand.appendChild(brandSlot);

    const nav = document.createElement('nav');
    nav.className = 'nav';
    nav.setAttribute('part', 'nav');
    nav.setAttribute('aria-label', 'Principal');
    nav.appendChild(document.createElement('slot'));

    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.setAttribute('part', 'footer');
    const footerSlot = document.createElement('slot');
    footerSlot.name = 'footer';
    footer.appendChild(footerSlot);

    this.rootEl.append(brand, nav, footer);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const variant = resolveSidebarVariant(this.getAttribute('variant'));
    const tone = resolveSidebarTone(this.getAttribute('tone'));
    const collapsed = this.hasAttribute('collapsed');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.collapsed = collapsed ? 'true' : 'false';
    this.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  }
}

defineCustomElement('gob-sidebar', GobSidebarElement);

export {};
