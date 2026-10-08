import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  ACCORDION_OBSERVED_ATTRIBUTES,
  parseAccordionItems,
  resolveAccordionVariant,
} from './accordion-constants';
import { accordionStyles } from './accordion-styles';

const CHEVRON = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

class GobAccordionElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...ACCORDION_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private openIndex = 0;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = accordionStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveAccordionVariant(this.getAttribute('variant'));
    const items = parseAccordionItems(this.getAttribute('items'));
    const rawOpen = Number(this.getAttribute('open-index'));
    this.openIndex = Number.isFinite(rawOpen)
      ? Math.max(0, Math.min(items.length - 1, rawOpen))
      : 0;

    const single = variant === 'single';
    this.rootEl.dataset.variant = variant;
    this.rootEl.replaceChildren();

    items.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'item';
      row.dataset.open = index === this.openIndex ? 'true' : 'false';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'trigger';
      trigger.setAttribute('aria-expanded', index === this.openIndex ? 'true' : 'false');

      const title = document.createElement('p');
      title.className = 'title';
      title.textContent = item.title;

      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = CHEVRON;

      trigger.append(title, icon);

      const panel = document.createElement('div');
      panel.className = 'panel';
      const body = document.createElement('p');
      body.className = 'body';
      body.textContent = item.body;
      panel.appendChild(body);

      trigger.addEventListener('click', () => {
        const currentlyOpen = row.dataset.open === 'true';
        if (single || currentlyOpen === false) {
          Array.from(this.rootEl.children).forEach((child, childIndex) => {
            const el = child as HTMLElement;
            const open = childIndex === index && !currentlyOpen;
            el.dataset.open = open ? 'true' : 'false';
            const btn = el.querySelector('.trigger');
            btn?.setAttribute('aria-expanded', open ? 'true' : 'false');
          });
          if (!currentlyOpen) this.openIndex = index;
        } else {
          row.dataset.open = 'false';
          trigger.setAttribute('aria-expanded', 'false');
        }
        this.dispatchEvent(
          new CustomEvent('gob-accordion', {
            detail: { index, open: row.dataset.open === 'true' },
            bubbles: true,
            composed: true,
          }),
        );
      });

      row.append(trigger, panel);
      this.rootEl.appendChild(row);
    });
  }
}

defineCustomElement('gob-accordion', GobAccordionElement);
export {};
