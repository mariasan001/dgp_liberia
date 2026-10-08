import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  NAV_MENU_OBSERVED_ATTRIBUTES,
  parseNavMenuItems,
  resolveNavIcon,
  resolveNavMenuSize,
  resolveNavMenuVariant,
  type NavMenuItem,
} from './nav-menu-constants';
import { navMenuStyles } from './nav-menu-styles';

const FALLBACK_ICONS = [
  'house',
  'folder',
  'users',
  'chart',
  'gear',
  'bell',
  'file',
  'building',
] as const;

class GobNavMenuElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...NAV_MENU_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly listEl: HTMLElement;
  private items: NavMenuItem[] = [];
  private selectedId = '';

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = navMenuStyles;

    this.rootEl = document.createElement('nav');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('aria-label', 'Menu de navegacion');

    this.listEl = document.createElement('div');
    this.listEl.className = 'list';
    this.listEl.setAttribute('part', 'list');
    this.listEl.setAttribute('role', 'menubar');

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
    const variant = resolveNavMenuVariant(this.getAttribute('variant'));
    const size = resolveNavMenuSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    this.items = parseNavMenuItems(this.getAttribute('items'));

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
    this.listEl.setAttribute(
      'role',
      variant === 'vertical' || variant === 'rail' || variant === 'sidebar'
        ? 'menu'
        : 'menubar',
    );
    this.render();
  }

  private render() {
    const variant = this.rootEl.dataset.variant || 'basic';
    const forceIcons =
      variant === 'icons' ||
      variant === 'vertical' ||
      variant === 'complete' ||
      variant === 'soft' ||
      variant === 'rail' ||
      variant === 'sidebar' ||
      variant === 'dock' ||
      variant === 'floating';
    const showDesc =
      variant === 'vertical' ||
      variant === 'rail' ||
      variant === 'sidebar';

    this.listEl.replaceChildren();
    this.items.forEach((item, index) => {
      const active = item.id === this.selectedId;
      const el = item.href
        ? document.createElement('a')
        : document.createElement('button');
      el.className = 'item';
      el.setAttribute('role', 'menuitem');
      el.dataset.active = active ? 'true' : 'false';
      if (active) el.setAttribute('aria-current', 'page');
      if (item.href) {
        (el as HTMLAnchorElement).href = item.href;
      } else {
        (el as HTMLButtonElement).type = 'button';
      }
      if (item.disabled || this.hasAttribute('disabled')) {
        if (item.href) el.setAttribute('aria-disabled', 'true');
        else (el as HTMLButtonElement).disabled = true;
      }

      const iconName =
        item.icon || (forceIcons ? FALLBACK_ICONS[index % FALLBACK_ICONS.length] : undefined);
      const iconSvg = resolveNavIcon(iconName);
      if (iconSvg) {
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = iconSvg;
        el.appendChild(icon);
      }

      const copy = document.createElement('span');
      copy.className = 'copy';
      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = item.label;
      copy.appendChild(label);
      if (showDesc && item.description) {
        const desc = document.createElement('span');
        desc.className = 'desc';
        desc.textContent = item.description;
        copy.appendChild(desc);
      }
      el.appendChild(copy);

      if (item.badge) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = item.badge;
        el.appendChild(badge);
      }

      el.addEventListener('click', (event) => {
        if (item.disabled || this.hasAttribute('disabled')) {
          event.preventDefault();
          return;
        }
        this.selectItem(item.id, item);
      });

      this.listEl.appendChild(el);
    });
  }

  private selectItem(id: string, item: NavMenuItem) {
    if (this.selectedId === id) return;
    this.selectedId = id;
    if (this.getAttribute('value') !== id) this.setAttribute('value', id);
    else this.render();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-nav-menu', {
        detail: { value: id, item },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

defineCustomElement('gob-nav-menu', GobNavMenuElement);
export {};
