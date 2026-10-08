import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  STAT_STRIP_OBSERVED_ATTRIBUTES,
  parseStatItems,
  resolveStatStripVariant,
} from './stat-strip-constants';
import { statStripStyles } from './stat-strip-styles';

class GobStatStripElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...STAT_STRIP_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = statStripStyles;

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
    const variant = resolveStatStripVariant(this.getAttribute('variant'));
    this.rootEl.dataset.variant = variant;
    const items = parseStatItems(this.getAttribute('items'));
    this.rootEl.replaceChildren(
      ...items.map((item) => {
        const el = document.createElement('article');
        el.className = 'item';
        const label = document.createElement('p');
        label.className = 'label';
        label.textContent = item.label;
        const value = document.createElement('p');
        value.className = 'value';
        value.textContent = item.value;
        const hint = document.createElement('p');
        hint.className = 'hint';
        hint.textContent = item.hint || ' ';
        el.append(label, value, hint);
        return el;
      }),
    );
    this.rootEl.style.gridTemplateColumns = `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`;
  }
}

defineCustomElement('gob-stat-strip', GobStatStripElement);
export {};
