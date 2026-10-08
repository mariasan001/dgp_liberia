import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  CARD_OBSERVED_ATTRIBUTES,
  resolveCardVariant,
} from './card-constants';
import { cardStyles } from './card-styles';

class GobCardElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...CARD_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly mediaEl: HTMLElement;
  private readonly metaEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly bodyEl: HTMLElement;
  private readonly actionBtn: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = cardStyles;

    this.rootEl = document.createElement('article');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.mediaEl = document.createElement('div');
    this.mediaEl.className = 'media';
    this.mediaEl.setAttribute('aria-hidden', 'true');
    this.mediaEl.setAttribute('part', 'media');

    this.metaEl = document.createElement('p');
    this.metaEl.className = 'meta';

    this.titleEl = document.createElement('h3');
    this.titleEl.className = 'title';
    this.titleEl.setAttribute('part', 'title');

    this.descEl = document.createElement('p');
    this.descEl.className = 'description';

    this.bodyEl = document.createElement('p');
    this.bodyEl.className = 'body';
    this.bodyEl.setAttribute('part', 'body');

    const footer = document.createElement('div');
    footer.className = 'footer';

    this.actionBtn = document.createElement('button');
    this.actionBtn.type = 'button';
    this.actionBtn.className = 'action';
    this.actionBtn.setAttribute('part', 'action');
    footer.appendChild(this.actionBtn);

    this.rootEl.append(
      this.mediaEl,
      this.metaEl,
      this.titleEl,
      this.descEl,
      this.bodyEl,
      footer,
    );
    shadow.append(style, this.rootEl);

    this.actionBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('gob-card', {
          detail: { action: 'action' },
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
    const variant = resolveCardVariant(this.getAttribute('variant'));
    const title = this.getAttribute('title')?.trim() || 'Tarjeta GobMX';
    const description =
      this.getAttribute('description')?.trim() ||
      'Contenedor de contenido y acciones.';
    const body =
      this.getAttribute('body')?.trim() ||
      this.textContent?.trim() ||
      'Resumen breve del expediente o modulo.';
    const meta = this.getAttribute('meta')?.trim() || 'Contenido';
    const action =
      this.getAttribute('action-label')?.trim() || 'Ver detalle';

    this.rootEl.dataset.variant = variant;
    this.metaEl.textContent = meta;
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.bodyEl.textContent = body;
    this.actionBtn.textContent = action;
  }
}

defineCustomElement('gob-card', GobCardElement);
export {};
