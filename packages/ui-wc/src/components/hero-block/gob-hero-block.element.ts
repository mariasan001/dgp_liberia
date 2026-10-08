import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  HERO_BLOCK_OBSERVED_ATTRIBUTES,
  resolveHeroBlockVariant,
} from './hero-block-constants';
import { heroBlockStyles } from './hero-block-styles';

class GobHeroBlockElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...HERO_BLOCK_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly eyebrowEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly primaryBtn: HTMLButtonElement;
  private readonly secondaryBtn: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = heroBlockStyles;

    this.rootEl = document.createElement('section');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const copy = document.createElement('div');
    copy.className = 'copy';

    this.eyebrowEl = document.createElement('p');
    this.eyebrowEl.className = 'eyebrow';

    this.titleEl = document.createElement('h1');
    this.titleEl.className = 'title';
    this.titleEl.setAttribute('part', 'title');

    this.descEl = document.createElement('p');
    this.descEl.className = 'description';

    const actions = document.createElement('div');
    actions.className = 'actions';

    this.primaryBtn = document.createElement('button');
    this.primaryBtn.type = 'button';
    this.primaryBtn.className = 'btn btn-primary';
    this.primaryBtn.setAttribute('part', 'primary');

    this.secondaryBtn = document.createElement('button');
    this.secondaryBtn.type = 'button';
    this.secondaryBtn.className = 'btn btn-secondary';
    this.secondaryBtn.setAttribute('part', 'secondary');

    actions.append(this.primaryBtn, this.secondaryBtn);
    copy.append(this.eyebrowEl, this.titleEl, this.descEl, actions);

    const media = document.createElement('div');
    media.className = 'media';
    media.setAttribute('aria-hidden', 'true');
    media.setAttribute('part', 'media');
    media.innerHTML = `
      <span class="media-grid"></span>
      <span class="media-orb media-orb-a"></span>
      <span class="media-orb media-orb-b"></span>
      <span class="media-card"></span>
    `;

    this.rootEl.append(copy, media);
    shadow.append(style, this.rootEl);

    this.primaryBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('gob-hero-block', {
          detail: { action: 'primary' },
          bubbles: true,
          composed: true,
        }),
      );
    });
    this.secondaryBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('gob-hero-block', {
          detail: { action: 'secondary' },
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
    const variant = resolveHeroBlockVariant(this.getAttribute('variant'));
    this.rootEl.dataset.variant = variant;
    this.eyebrowEl.textContent =
      this.getAttribute('eyebrow')?.trim() || 'GobMX';
    this.titleEl.textContent =
      this.getAttribute('title')?.trim() || 'Servicios digitales claros';
    this.descEl.textContent =
      this.getAttribute('description')?.trim() ||
      'Un bloque heroe para landings publicas con jerarquia institucional.';
    this.primaryBtn.textContent =
      this.getAttribute('primary-label')?.trim() || 'Iniciar tramite';
    this.secondaryBtn.textContent =
      this.getAttribute('secondary-label')?.trim() || 'Ver requisitos';
  }
}

defineCustomElement('gob-hero-block', GobHeroBlockElement);
export {};
