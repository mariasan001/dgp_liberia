import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TABLE_OBSERVED_ATTRIBUTES,
  resolveTableTone,
  resolveTableVariant,
  tableLightDomStyles,
} from './table-constants';
import { tableStyles } from './table-styles';

const LIGHT_STYLE_ID = 'gob-table-light-dom';

function ensureLightDomStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LIGHT_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = LIGHT_STYLE_ID;
  style.textContent = tableLightDomStyles;
  document.head.appendChild(style);
}

class GobTableElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TABLE_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = tableStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    const head = document.createElement('div');
    head.className = 'head';
    head.setAttribute('part', 'head');

    const headText = document.createElement('div');
    headText.className = 'headText';

    const title = document.createElement('div');
    title.className = 'title';
    title.setAttribute('part', 'title');
    const titleSlot = document.createElement('slot');
    titleSlot.name = 'title';
    title.appendChild(titleSlot);

    const subtitle = document.createElement('div');
    subtitle.className = 'subtitle';
    subtitle.setAttribute('part', 'subtitle');
    const subtitleSlot = document.createElement('slot');
    subtitleSlot.name = 'subtitle';
    subtitle.appendChild(subtitleSlot);

    headText.append(title, subtitle);

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.setAttribute('part', 'actions');
    const actionsSlot = document.createElement('slot');
    actionsSlot.name = 'actions';
    actions.appendChild(actionsSlot);

    head.append(headText, actions);

    const scroll = document.createElement('div');
    scroll.className = 'scroll';
    scroll.setAttribute('part', 'scroll');
    const defaultSlot = document.createElement('slot');
    scroll.appendChild(defaultSlot);

    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.setAttribute('part', 'empty');
    const emptySlot = document.createElement('slot');
    emptySlot.name = 'empty';
    empty.appendChild(emptySlot);

    const foot = document.createElement('div');
    foot.className = 'foot';
    foot.setAttribute('part', 'foot');
    const footSlot = document.createElement('slot');
    footSlot.name = 'footer';
    foot.appendChild(footSlot);

    this.rootEl.append(head, scroll, empty, foot);
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
    const variant = resolveTableVariant(this.getAttribute('variant'));
    const tone = resolveTableTone(this.getAttribute('tone'));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
  }
}

defineCustomElement('gob-table', GobTableElement);

export {};
