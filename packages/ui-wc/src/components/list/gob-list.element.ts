import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  LIST_OBSERVED_ATTRIBUTES,
  listLightDomStyles,
  resolveListTone,
  resolveListVariant,
} from './list-constants';
import { listStyles } from './list-styles';

const LIGHT_STYLE_ID = 'gob-list-light-dom';

function ensureLightDomStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LIGHT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = LIGHT_STYLE_ID;
  style.textContent = listLightDomStyles;
  document.head.appendChild(style);
}

class GobListElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...LIST_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = listStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const items = document.createElement('div');
    items.className = 'items';
    items.setAttribute('part', 'items');
    items.setAttribute('role', 'list');
    items.appendChild(document.createElement('slot'));

    this.rootEl.appendChild(items);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    ensureLightDomStyles();
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const variant = resolveListVariant(this.getAttribute('variant'));
    const tone = resolveListTone(this.getAttribute('tone'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
  }
}

defineCustomElement('gob-list', GobListElement);

export {};
