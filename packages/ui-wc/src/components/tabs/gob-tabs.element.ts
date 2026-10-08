import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TABS_OBSERVED_ATTRIBUTES,
  parseTabsItems,
  resolveTabsIcon,
  resolveTabsSize,
  resolveTabsVariant,
  type TabsItem,
} from './tabs-constants';
import { tabsStyles } from './tabs-styles';

const DEFAULT_ICONS = ['house', 'file', 'history', 'gear', 'user', 'folder'] as const;

class GobTabsElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TABS_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly listEl: HTMLElement;
  private readonly panelEl: HTMLElement;
  private items: TabsItem[] = [];
  private selectedId = '';

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = tabsStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.listEl = document.createElement('div');
    this.listEl.className = 'list';
    this.listEl.setAttribute('part', 'list');
    this.listEl.setAttribute('role', 'tablist');

    this.panelEl = document.createElement('div');
    this.panelEl.className = 'panel';
    this.panelEl.setAttribute('part', 'panel');
    this.panelEl.setAttribute('role', 'tabpanel');

    this.rootEl.append(this.listEl, this.panelEl);
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
    const variant = resolveTabsVariant(this.getAttribute('variant'));
    const size = resolveTabsSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    this.items = parseTabsItems(this.getAttribute('items'));

    const value = this.getAttribute('value')?.trim() || '';
    const firstEnabled = this.items.find((item) => !item.disabled)?.id || '';
    this.selectedId =
      value && this.items.some((item) => item.id === value)
        ? value
        : this.selectedId && this.items.some((item) => item.id === this.selectedId)
          ? this.selectedId
          : firstEnabled;

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';

    this.renderTabs();
    this.renderPanel();
  }

  private renderTabs() {
    this.listEl.replaceChildren();
    const variant = this.rootEl.dataset.variant || 'basic';
    const forceIcons =
      variant === 'icons' ||
      variant === 'complete' ||
      variant === 'rail' ||
      variant === 'card' ||
      variant === 'vertical';

    this.items.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tab';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('part', 'tab');
      btn.id = `tab-${item.id}`;
      btn.dataset.id = item.id;
      btn.setAttribute('aria-selected', item.id === this.selectedId ? 'true' : 'false');
      btn.disabled = Boolean(item.disabled) || this.hasAttribute('disabled');

      const iconName =
        item.icon || (forceIcons ? DEFAULT_ICONS[index % DEFAULT_ICONS.length] : undefined);
      const iconSvg = resolveTabsIcon(iconName);
      if (iconSvg) {
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = iconSvg;
        btn.appendChild(icon);
      }

      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = item.label;
      btn.appendChild(label);

      if (item.badge) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = item.badge;
        btn.appendChild(badge);
      }

      btn.addEventListener('click', () => this.selectTab(item.id));
      this.listEl.appendChild(btn);
    });
  }

  private renderPanel() {
    const current = this.items.find((item) => item.id === this.selectedId);
    this.panelEl.setAttribute('aria-labelledby', current ? `tab-${current.id}` : '');
    this.panelEl.textContent = current
      ? `Contenido de ${current.label}`
      : 'Selecciona una pestaña';
  }

  private selectTab(id: string) {
    const item = this.items.find((row) => row.id === id);
    if (!item || item.disabled || this.hasAttribute('disabled')) return;
    if (this.selectedId === id) return;

    this.selectedId = id;
    if (this.getAttribute('value') !== id) {
      this.setAttribute('value', id);
    } else {
      this.renderTabs();
      this.renderPanel();
    }

    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-tabs', {
        detail: { value: id, item },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

defineCustomElement('gob-tabs', GobTabsElement);

export {};
