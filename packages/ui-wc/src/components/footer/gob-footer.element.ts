import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  FOOTER_OBSERVED_ATTRIBUTES,
  parseFooterLinks,
  resolveFooterVariant,
} from './footer-constants';
import { footerStyles } from './footer-styles';

class GobFooterElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...FOOTER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly brandEl: HTMLElement;
  private readonly taglineEl: HTMLElement;
  private readonly linksEl: HTMLUListElement;
  private readonly legalEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = footerStyles;

    this.rootEl = document.createElement('footer');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const mark = document.createElement('div');
    mark.className = 'mark';
    mark.setAttribute('aria-hidden', 'true');

    const top = document.createElement('div');
    top.className = 'top';

    const brandBlock = document.createElement('div');
    brandBlock.className = 'brand-block';

    this.brandEl = document.createElement('p');
    this.brandEl.className = 'brand';
    this.brandEl.setAttribute('part', 'brand');

    this.taglineEl = document.createElement('p');
    this.taglineEl.className = 'tagline';

    brandBlock.append(this.brandEl, this.taglineEl);

    this.linksEl = document.createElement('ul');
    this.linksEl.className = 'links';
    this.linksEl.setAttribute('part', 'links');

    top.append(brandBlock, this.linksEl);

    const bottom = document.createElement('div');
    bottom.className = 'bottom';
    this.legalEl = document.createElement('p');
    this.legalEl.className = 'legal';
    this.legalEl.setAttribute('part', 'legal');
    bottom.appendChild(this.legalEl);

    this.rootEl.append(mark, top, bottom);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveFooterVariant(this.getAttribute('variant'));
    this.rootEl.dataset.variant = variant;
    this.brandEl.textContent =
      this.getAttribute('brand')?.trim() || 'Gobierno de Mexico';
    this.taglineEl.textContent =
      this.getAttribute('tagline')?.trim() ||
      'Informacion oficial y tramites digitales.';
    this.legalEl.textContent =
      this.getAttribute('legal')?.trim() ||
      '© Gobierno de Mexico. Todos los derechos reservados.';

    const links = parseFooterLinks(this.getAttribute('links'));
    this.linksEl.replaceChildren(
      ...links.map((label) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'link';
        btn.textContent = label;
        btn.addEventListener('click', () => {
          this.dispatchEvent(
            new CustomEvent('gob-footer', {
              detail: { action: 'link', label },
              bubbles: true,
              composed: true,
            }),
          );
        });
        li.appendChild(btn);
        return li;
      }),
    );
  }
}

defineCustomElement('gob-footer', GobFooterElement);
export {};
