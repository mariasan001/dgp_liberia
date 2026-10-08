import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  BANNER_OBSERVED_ATTRIBUTES,
  resolveBannerTone,
  resolveBannerVariant,
} from './banner-constants';
import { bannerStyles } from './banner-styles';

const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;

class GobBannerElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...BANNER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly bodyEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly actionsEl: HTMLElement;
  private readonly actionBtn: HTMLButtonElement;
  private readonly dismissBtn: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = bannerStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'region');

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'body';

    this.titleEl = document.createElement('p');
    this.titleEl.className = 'title';

    this.descEl = document.createElement('p');
    this.descEl.className = 'description';

    this.bodyEl.append(this.titleEl, this.descEl);

    this.actionsEl = document.createElement('div');
    this.actionsEl.className = 'actions';

    this.actionBtn = document.createElement('button');
    this.actionBtn.type = 'button';
    this.actionBtn.className = 'action';

    this.dismissBtn = document.createElement('button');
    this.dismissBtn.type = 'button';
    this.dismissBtn.className = 'dismiss';
    this.dismissBtn.setAttribute('aria-label', 'Cerrar');
    this.dismissBtn.innerHTML = CLOSE_SVG;

    this.actionsEl.append(this.actionBtn, this.dismissBtn);
    this.rootEl.append(this.bodyEl, this.actionsEl);
    shadow.append(style, this.rootEl);

    this.actionBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('gob-banner', {
          detail: { action: 'action' },
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.dismissBtn.addEventListener('click', () => {
      this.setAttribute('hidden', '');
      this.dispatchEvent(
        new CustomEvent('gob-banner', {
          detail: { action: 'dismiss' },
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
    const variant = resolveBannerVariant(this.getAttribute('variant'));
    const tone = resolveBannerTone(this.getAttribute('tone'));
    const title = this.getAttribute('title')?.trim() || 'Aviso del sistema';
    const description =
      this.getAttribute('description')?.trim() ||
      'Hay informacion importante para tu sesion.';
    const action = this.getAttribute('action')?.trim() || '';
    const dismissible = this.hasAttribute('dismissible');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.hidden = this.hasAttribute('hidden');
    this.rootEl.setAttribute('aria-label', title);

    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.descEl.hidden = !description;

    if (action) {
      this.actionBtn.hidden = false;
      this.actionBtn.textContent = action;
    } else {
      this.actionBtn.hidden = true;
    }

    this.dismissBtn.hidden = !dismissible;
    this.actionsEl.hidden = this.actionBtn.hidden && this.dismissBtn.hidden;
  }
}

defineCustomElement('gob-banner', GobBannerElement);
export {};
