import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TOPBAR_OBSERVED_ATTRIBUTES,
  resolveTopbarTone,
  resolveTopbarVariant,
} from './topbar-constants';
import { topbarStyles } from './topbar-styles';

class GobTopbarElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TOPBAR_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = topbarStyles;

    this.rootEl = document.createElement('header');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const start = document.createElement('div');
    start.className = 'start';
    start.setAttribute('part', 'start');
    const startSlot = document.createElement('slot');
    startSlot.name = 'start';
    start.appendChild(startSlot);

    const center = document.createElement('div');
    center.className = 'center';
    center.setAttribute('part', 'center');
    const centerSlot = document.createElement('slot');
    centerSlot.name = 'center';
    center.appendChild(centerSlot);

    const end = document.createElement('div');
    end.className = 'end';
    end.setAttribute('part', 'end');
    end.appendChild(document.createElement('slot'));

    this.rootEl.append(start, center, end);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const variant = resolveTopbarVariant(this.getAttribute('variant'));
    const tone = resolveTopbarTone(this.getAttribute('tone'));
    const sticky = this.getAttribute('sticky') !== 'false';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.sticky = sticky ? 'true' : 'false';
  }
}

defineCustomElement('gob-topbar', GobTopbarElement);

export {};
