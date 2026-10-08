import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SPLIT_BUTTON_OBSERVED_ATTRIBUTES,
  SPLIT_CARET,
  parseSplitButtonItems,
  resolveSplitButtonSize,
  resolveSplitButtonVariant,
  resolveSplitIcon,
  type SplitButtonItem,
} from './split-button-constants';
import { splitButtonStyles } from './split-button-styles';

class GobSplitButtonElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SPLIT_BUTTON_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly groupEl: HTMLElement;
  private readonly mainEl: HTMLButtonElement;
  private readonly caretBtnEl: HTMLButtonElement;
  private readonly caretEl: HTMLElement;
  private readonly menuEl: HTMLElement;
  private items: SplitButtonItem[] = [];
  private open = false;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = splitButtonStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.groupEl = document.createElement('div');
    this.groupEl.className = 'group';
    this.groupEl.setAttribute('part', 'group');

    this.mainEl = document.createElement('button');
    this.mainEl.type = 'button';
    this.mainEl.className = 'main';
    this.mainEl.setAttribute('part', 'main');

    this.caretBtnEl = document.createElement('button');
    this.caretBtnEl.type = 'button';
    this.caretBtnEl.className = 'caretBtn';
    this.caretBtnEl.setAttribute('part', 'caret');
    this.caretBtnEl.setAttribute('aria-haspopup', 'menu');
    this.caretBtnEl.setAttribute('aria-label', 'Mas opciones');

    this.caretEl = document.createElement('span');
    this.caretEl.className = 'caret';
    this.caretEl.setAttribute('aria-hidden', 'true');
    this.caretEl.innerHTML = SPLIT_CARET;
    this.caretBtnEl.appendChild(this.caretEl);

    this.menuEl = document.createElement('div');
    this.menuEl.className = 'menu';
    this.menuEl.setAttribute('part', 'menu');
    this.menuEl.setAttribute('role', 'menu');

    this.groupEl.append(this.mainEl, this.caretBtnEl);
    this.rootEl.append(this.groupEl, this.menuEl);
    shadow.append(style, this.rootEl);

    this.mainEl.addEventListener('click', (event) => {
      event.stopPropagation();
      if (this.hasAttribute('disabled')) return;
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      this.dispatchEvent(
        new CustomEvent('gob-split-button', {
          detail: { action: 'primary', value: 'primary' },
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.caretBtnEl.addEventListener('click', (event) => {
      event.stopPropagation();
      if (this.hasAttribute('disabled')) return;
      this.setOpen(!this.open);
    });
  }

  connectedCallback() {
    document.addEventListener('click', this.onDocClick);
    document.addEventListener('keydown', this.onKeyDown);
    this.syncFromAttributes();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.onDocClick);
    document.removeEventListener('keydown', this.onKeyDown);
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private readonly onDocClick = (event: MouseEvent) => {
    if (!this.open) return;
    if (!event.composedPath().includes(this)) this.setOpen(false);
  };

  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) this.setOpen(false);
  };

  private setOpen(next: boolean) {
    this.open = next;
    if (next) this.setAttribute('open', '');
    else this.removeAttribute('open');
    this.caretBtnEl.setAttribute('aria-expanded', next ? 'true' : 'false');
    this.rootEl.dataset.open = next ? 'true' : 'false';
  }

  private syncFromAttributes() {
    const variant = resolveSplitButtonVariant(this.getAttribute('variant'));
    const size = resolveSplitButtonSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    const label =
      this.getAttribute('label')?.trim() ||
      this.textContent?.trim() ||
      'Guardar';
    this.items = parseSplitButtonItems(this.getAttribute('items'));
    this.open = this.hasAttribute('open');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.open = this.open ? 'true' : 'false';

    this.mainEl.disabled = disabled;
    this.caretBtnEl.disabled = disabled;
    this.caretBtnEl.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    this.mainEl.textContent = label;
    this.renderMenu();
  }

  private renderMenu() {
    this.menuEl.replaceChildren();
    this.items.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'item';
      btn.setAttribute('role', 'menuitem');
      btn.disabled = Boolean(item.disabled) || this.hasAttribute('disabled');

      const iconSvg = resolveSplitIcon(item.icon);
      if (iconSvg) {
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = iconSvg;
        btn.appendChild(icon);
      }

      btn.append(document.createTextNode(item.label));
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        this.selectItem(item);
      });
      this.menuEl.appendChild(btn);
    });
  }

  private selectItem(item: SplitButtonItem) {
    if (item.disabled || this.hasAttribute('disabled')) return;
    this.setOpen(false);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-split-button', {
        detail: { action: 'menu', value: item.id, item },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

defineCustomElement('gob-split-button', GobSplitButtonElement);
export {};
