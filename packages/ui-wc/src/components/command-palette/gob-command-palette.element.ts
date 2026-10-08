import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  COMMAND_PALETTE_OBSERVED_ATTRIBUTES,
  parseCommandItems,
  resolveCommandPaletteVariant,
} from './command-palette-constants';
import { commandPaletteStyles } from './command-palette-styles';

class GobCommandPaletteElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...COMMAND_PALETTE_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly inputEl: HTMLInputElement;
  private readonly resultsEl: HTMLElement;
  private items: { label: string; hint: string; group: string }[] = [];
  private activeIndex = 0;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = commandPaletteStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'dialog');
    this.rootEl.setAttribute('aria-label', 'Paleta de comandos');

    const search = document.createElement('div');
    search.className = 'search';

    const icon = document.createElement('span');
    icon.className = 'icon';
    icon.setAttribute('aria-hidden', 'true');

    this.inputEl = document.createElement('input');
    this.inputEl.className = 'input';
    this.inputEl.type = 'search';
    this.inputEl.setAttribute('part', 'input');
    this.inputEl.setAttribute('autocomplete', 'off');

    const kbd = document.createElement('span');
    kbd.className = 'kbd';
    kbd.textContent = 'Esc';

    search.append(icon, this.inputEl, kbd);

    this.resultsEl = document.createElement('div');
    this.resultsEl.className = 'results';
    this.resultsEl.setAttribute('part', 'results');

    const foot = document.createElement('div');
    foot.className = 'foot';
    foot.innerHTML = '<span>↑↓ navegar</span><span>↵ seleccionar</span>';

    this.rootEl.append(search, this.resultsEl, foot);
    shadow.append(style, this.rootEl);

    this.inputEl.addEventListener('input', () => {
      this.activeIndex = 0;
      this.renderResults();
      this.dispatchEvent(
        new CustomEvent('gob-command-palette', {
          detail: { action: 'query', query: this.inputEl.value },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback(name: string) {
    if (name === 'query' && this.inputEl.value !== (this.getAttribute('query') ?? '')) {
      this.inputEl.value = this.getAttribute('query') ?? '';
    }
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveCommandPaletteVariant(this.getAttribute('variant'));
    this.rootEl.dataset.variant = variant;
    this.inputEl.placeholder =
      this.getAttribute('placeholder')?.trim() || 'Buscar acciones…';
    if (document.activeElement !== this.inputEl) {
      this.inputEl.value = this.getAttribute('query') ?? '';
    }
    this.items = parseCommandItems(this.getAttribute('items'));
    this.renderResults();
  }

  private renderResults() {
    const q = this.inputEl.value.trim().toLowerCase();
    const filtered = this.items.filter((item) => {
      if (!q) return true;
      return (
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
      );
    });
    if (this.activeIndex >= filtered.length) this.activeIndex = 0;

    const nodes: HTMLElement[] = [];
    let lastGroup = '';
    filtered.forEach((item, index) => {
      if (item.group && item.group !== lastGroup) {
        const group = document.createElement('p');
        group.className = 'group';
        group.textContent = item.group;
        nodes.push(group);
        lastGroup = item.group;
      }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'item';
      btn.dataset.active = String(index === this.activeIndex);
      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = item.label;
      const hint = document.createElement('span');
      hint.className = 'hint';
      hint.textContent = item.hint;
      btn.append(label, hint);
      btn.addEventListener('click', () => {
        this.activeIndex = index;
        this.renderResults();
        this.dispatchEvent(
          new CustomEvent('gob-command-palette', {
            detail: { action: 'select', label: item.label, group: item.group },
            bubbles: true,
            composed: true,
          }),
        );
      });
      nodes.push(btn);
    });
    this.resultsEl.replaceChildren(...nodes);
  }
}

defineCustomElement('gob-command-palette', GobCommandPaletteElement);
export {};
