import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TOC_OBSERVED_ATTRIBUTES,
  parseTocItems,
  resolveTocVariant,
} from './table-of-contents-constants';
import { tableOfContentsStyles } from './table-of-contents-styles';

class GobTableOfContentsElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TOC_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly listEl: HTMLUListElement;
  private activeIndex = 0;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = tableOfContentsStyles;

    this.rootEl = document.createElement('nav');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('aria-label', 'Indice de contenidos');

    const head = document.createElement('div');
    head.className = 'head';

    const kicker = document.createElement('p');
    kicker.className = 'kicker';
    kicker.textContent = 'En esta pagina';

    this.titleEl = document.createElement('p');
    this.titleEl.className = 'title';
    this.titleEl.setAttribute('part', 'title');

    head.append(kicker, this.titleEl);

    this.listEl = document.createElement('ul');
    this.listEl.className = 'list';
    this.listEl.setAttribute('part', 'list');

    this.rootEl.append(head, this.listEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveTocVariant(this.getAttribute('variant'));
    this.rootEl.dataset.variant = variant;
    this.titleEl.textContent =
      this.getAttribute('title')?.trim() || 'Contenido';

    const activeRaw = this.getAttribute('active');
    const parsed = Number(activeRaw);
    this.activeIndex =
      Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0;

    const items = parseTocItems(this.getAttribute('items'));
    this.listEl.replaceChildren(
      ...items.map((label, index) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'item';
        btn.dataset.active = String(index === this.activeIndex);

        const num = document.createElement('span');
        num.className = 'num';
        num.textContent = String(index + 1).padStart(2, '0');

        const text = document.createElement('span');
        text.className = 'label';
        text.textContent = label;

        btn.append(num, text);
        btn.addEventListener('click', () => {
          this.activeIndex = index;
          this.setAttribute('active', String(index));
          this.dispatchEvent(
            new CustomEvent('gob-table-of-contents', {
              detail: { action: 'select', index, label },
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

defineCustomElement('gob-table-of-contents', GobTableOfContentsElement);
export {};
