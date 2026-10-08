import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SEGMENTED_OBSERVED_ATTRIBUTES,
  parseSegmentedItems,
  resolveSegmentedIcon,
  resolveSegmentedSize,
  resolveSegmentedVariant,
  type SegmentedItem,
} from './segmented-constants';
import { segmentedStyles } from './segmented-styles';

const FALLBACK = ['day', 'week', 'month', 'list', 'grid', 'map'] as const;

class GobSegmentedElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SEGMENTED_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly listEl: HTMLElement;
  private items: SegmentedItem[] = [];
  private selectedId = '';

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = segmentedStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'group');

    this.listEl = document.createElement('div');
    this.listEl.className = 'list';
    this.listEl.setAttribute('part', 'list');

    this.rootEl.appendChild(this.listEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveSegmentedVariant(this.getAttribute('variant'));
    const size = resolveSegmentedSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    this.items = parseSegmentedItems(this.getAttribute('items'));

    const value = this.getAttribute('value')?.trim() || '';
    const first = this.items.find((item) => !item.disabled)?.id || '';
    this.selectedId =
      value && this.items.some((item) => item.id === value)
        ? value
        : this.selectedId && this.items.some((item) => item.id === this.selectedId)
          ? this.selectedId
          : first;

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';
    this.render();
  }

  private render() {
    const variant = this.rootEl.dataset.variant || 'basic';
    const forceIcons = variant === 'icons' || variant === 'complete';

    this.listEl.replaceChildren();
    this.items.forEach((item, index) => {
      const active = item.id === this.selectedId;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'item';
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.disabled = Boolean(item.disabled) || this.hasAttribute('disabled');

      const iconName =
        item.icon || (forceIcons ? FALLBACK[index % FALLBACK.length] : undefined);
      const iconSvg = resolveSegmentedIcon(iconName);
      if (iconSvg) {
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = iconSvg;
        btn.appendChild(icon);
      }

      btn.append(document.createTextNode(item.label));
      btn.addEventListener('click', () => this.selectItem(item.id, item));
      this.listEl.appendChild(btn);
    });
  }

  private selectItem(id: string, item: SegmentedItem) {
    if (item.disabled || this.hasAttribute('disabled')) return;
    if (this.selectedId === id) return;
    this.selectedId = id;
    if (this.getAttribute('value') !== id) this.setAttribute('value', id);
    else this.render();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-segmented', {
        detail: { value: id, item },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

defineCustomElement('gob-segmented', GobSegmentedElement);
export {};
