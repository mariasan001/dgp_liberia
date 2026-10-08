import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  CARET_SVG,
  DROPDOWN_MENU_OBSERVED_ATTRIBUTES,
  parseDropdownMenuItems,
  resolveDropdownIcon,
  resolveDropdownMenuSize,
  resolveDropdownMenuVariant,
  type DropdownMenuItem,
} from './dropdown-menu-constants';
import { dropdownMenuStyles } from './dropdown-menu-styles';

class GobDropdownMenuElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...DROPDOWN_MENU_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly triggerEl: HTMLButtonElement;
  private readonly labelEl: HTMLElement;
  private readonly caretEl: HTMLElement;
  private readonly menuEl: HTMLElement;
  private items: DropdownMenuItem[] = [];
  private open = false;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = dropdownMenuStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.triggerEl = document.createElement('button');
    this.triggerEl.type = 'button';
    this.triggerEl.className = 'trigger';
    this.triggerEl.setAttribute('part', 'trigger');
    this.triggerEl.setAttribute('aria-haspopup', 'menu');

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'label';

    this.caretEl = document.createElement('span');
    this.caretEl.className = 'caret';
    this.caretEl.setAttribute('aria-hidden', 'true');
    this.caretEl.innerHTML = CARET_SVG;

    this.triggerEl.append(this.labelEl, this.caretEl);

    this.menuEl = document.createElement('div');
    this.menuEl.className = 'menu';
    this.menuEl.setAttribute('part', 'menu');
    this.menuEl.setAttribute('role', 'menu');

    this.rootEl.append(this.triggerEl, this.menuEl);
    shadow.append(style, this.rootEl);

    this.triggerEl.addEventListener('click', (event) => {
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
    const path = event.composedPath();
    if (!path.includes(this)) this.setOpen(false);
  };

  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) this.setOpen(false);
  };

  private setOpen(next: boolean) {
    this.open = next;
    if (next) this.setAttribute('open', '');
    else this.removeAttribute('open');
    this.triggerEl.setAttribute('aria-expanded', next ? 'true' : 'false');
    this.rootEl.dataset.open = next ? 'true' : 'false';
  }

  private syncFromAttributes() {
    const variant = resolveDropdownMenuVariant(this.getAttribute('variant'));
    const size = resolveDropdownMenuSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    const label =
      this.getAttribute('label')?.trim() ||
      this.textContent?.trim() ||
      'Acciones';
    this.items = parseDropdownMenuItems(this.getAttribute('items'));
    this.open = this.hasAttribute('open');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.open = this.open ? 'true' : 'false';

    this.triggerEl.disabled = disabled;
    this.triggerEl.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    this.labelEl.textContent = label;
    this.renderMenu();
  }

  private renderMenu() {
    const forceIcons =
      this.rootEl.dataset.variant === 'icons' ||
      this.rootEl.dataset.variant === 'complete';

    this.menuEl.replaceChildren();
    this.items.forEach((item) => {
      if (item.divider) {
        const divider = document.createElement('div');
        divider.className = 'divider';
        divider.setAttribute('role', 'separator');
        this.menuEl.appendChild(divider);
        return;
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'item';
      btn.setAttribute('role', 'menuitem');
      btn.disabled = Boolean(item.disabled) || this.hasAttribute('disabled');
      if (item.danger) btn.dataset.danger = 'true';

      const iconSvg = resolveDropdownIcon(item.icon);
      if (iconSvg || forceIcons) {
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = iconSvg || resolveDropdownIcon('more') || '';
        btn.appendChild(icon);
      }

      const text = document.createElement('span');
      text.className = 'label';
      text.textContent = item.label;
      btn.appendChild(text);

      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        this.selectItem(item);
      });
      this.menuEl.appendChild(btn);
    });
  }

  private selectItem(item: DropdownMenuItem) {
    if (item.disabled || item.divider || this.hasAttribute('disabled')) return;
    this.setOpen(false);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-dropdown-menu', {
        detail: { value: item.id, item },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

defineCustomElement('gob-dropdown-menu', GobDropdownMenuElement);
export {};
