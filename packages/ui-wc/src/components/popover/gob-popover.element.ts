import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  POPOVER_OBSERVED_ATTRIBUTES,
  resolvePopoverPlacement,
  resolvePopoverVariant,
} from './popover-constants';
import { popoverStyles } from './popover-styles';

const CARET = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

class GobPopoverElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...POPOVER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly triggerEl: HTMLButtonElement;
  private readonly triggerLabelEl: HTMLElement;
  private readonly panelEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly menuEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = popoverStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.triggerEl = document.createElement('button');
    this.triggerEl.type = 'button';
    this.triggerEl.className = 'trigger';
    this.triggerEl.setAttribute('part', 'trigger');
    this.triggerEl.setAttribute('aria-haspopup', 'dialog');

    this.triggerLabelEl = document.createElement('span');
    const caret = document.createElement('span');
    caret.className = 'trigger-caret';
    caret.innerHTML = CARET;
    this.triggerEl.append(this.triggerLabelEl, caret);

    this.panelEl = document.createElement('div');
    this.panelEl.className = 'panel';
    this.panelEl.setAttribute('part', 'panel');
    this.panelEl.setAttribute('role', 'dialog');

    this.titleEl = document.createElement('p');
    this.titleEl.className = 'panel-title';

    this.descEl = document.createElement('p');
    this.descEl.className = 'panel-desc';

    this.menuEl = document.createElement('div');
    this.menuEl.className = 'menu';
    for (const label of ['Ver detalle', 'Descargar', 'Archivar']) {
      const item = document.createElement('div');
      item.className = 'menu-item';
      item.textContent = label;
      this.menuEl.appendChild(item);
    }

    this.panelEl.append(this.titleEl, this.descEl, this.menuEl);
    this.rootEl.append(this.triggerEl, this.panelEl);
    shadow.append(style, this.rootEl);

    this.triggerEl.addEventListener('click', () => {
      if (this.hasAttribute('open')) this.removeAttribute('open');
      else this.setAttribute('open', '');
      this.dispatchEvent(
        new CustomEvent('gob-popover', {
          detail: { open: this.hasAttribute('open') },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolvePopoverVariant(this.getAttribute('variant'));
    const placement = resolvePopoverPlacement(this.getAttribute('placement'));
    const title =
      this.getAttribute('title')?.trim() || 'Acciones del expediente';
    const description =
      this.getAttribute('description')?.trim() ||
      'Opciones contextuales ancladas al control.';
    const trigger =
      this.getAttribute('trigger')?.trim() ||
      this.textContent?.trim() ||
      'Abrir';
    const open = this.hasAttribute('open');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.placement = placement;
    this.rootEl.dataset.open = open ? 'true' : 'false';

    this.triggerLabelEl.textContent = trigger;
    this.triggerEl.setAttribute('aria-expanded', open ? 'true' : 'false');
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
  }
}

defineCustomElement('gob-popover', GobPopoverElement);
export {};
