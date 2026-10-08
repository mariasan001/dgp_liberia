import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  BUTTON_GROUP_OBSERVED_ATTRIBUTES,
  parseButtonGroupItems,
  resolveButtonGroupIcon,
  resolveButtonGroupSize,
  resolveButtonGroupVariant,
  type ButtonGroupItem,
} from './button-group-constants';
import { buttonGroupStyles } from './button-group-styles';

class GobButtonGroupElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...BUTTON_GROUP_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly listEl: HTMLElement;
  private items: ButtonGroupItem[] = [];

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = buttonGroupStyles;

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

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveButtonGroupVariant(this.getAttribute('variant'));
    const size = resolveButtonGroupSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    this.items = parseButtonGroupItems(this.getAttribute('items'));

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';
    this.render();
  }

  private render() {
    this.listEl.replaceChildren();
    this.items.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'item';
      btn.disabled = Boolean(item.disabled) || this.hasAttribute('disabled');

      const iconSvg = resolveButtonGroupIcon(item.icon);
      if (iconSvg) {
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = iconSvg;
        btn.appendChild(icon);
      }

      btn.append(document.createTextNode(item.label));
      btn.addEventListener('click', () => this.emit(item));
      this.listEl.appendChild(btn);
    });
  }

  private emit(item: ButtonGroupItem) {
    if (item.disabled || this.hasAttribute('disabled')) return;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-button-group', {
        detail: { value: item.id, item },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

defineCustomElement('gob-button-group', GobButtonGroupElement);
export {};
