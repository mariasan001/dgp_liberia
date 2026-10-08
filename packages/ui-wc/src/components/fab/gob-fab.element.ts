import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  FAB_OBSERVED_ATTRIBUTES,
  parseFabActions,
  resolveFabIcon,
  resolveFabSize,
  resolveFabVariant,
  type FabAction,
} from './fab-constants';
import { fabStyles } from './fab-styles';

class GobFabElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...FAB_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly actionsEl: HTMLElement;
  private readonly btnEl: HTMLButtonElement;
  private readonly iconEl: HTMLElement;
  private readonly labelEl: HTMLElement;
  private actions: FabAction[] = [];
  private open = false;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = fabStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.actionsEl = document.createElement('div');
    this.actionsEl.className = 'actions';
    this.actionsEl.setAttribute('part', 'actions');

    this.btnEl = document.createElement('button');
    this.btnEl.type = 'button';
    this.btnEl.className = 'btn';
    this.btnEl.setAttribute('part', 'button');

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'icon';
    this.iconEl.setAttribute('aria-hidden', 'true');

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'label';
    this.labelEl.setAttribute('part', 'label');

    this.btnEl.append(this.iconEl, this.labelEl);
    this.rootEl.append(this.actionsEl, this.btnEl);
    shadow.append(style, this.rootEl);

    this.btnEl.addEventListener('click', (event) => {
      event.stopPropagation();
      if (this.hasAttribute('disabled')) return;
      const variant = resolveFabVariant(this.getAttribute('variant'));
      if (variant === 'actions') {
        this.setOpen(!this.open);
        return;
      }
      this.emitPrimary();
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
    this.rootEl.dataset.open = next ? 'true' : 'false';
    this.btnEl.setAttribute('aria-expanded', next ? 'true' : 'false');
    this.iconEl.innerHTML = resolveFabIcon(next ? 'x' : this.getAttribute('icon') || 'plus');
  }

  private emitPrimary() {
    this.dispatchEvent(
      new CustomEvent('gob-fab', {
        detail: {
          action: 'primary',
          icon: this.getAttribute('icon') || 'plus',
          label: this.getAttribute('label') || '',
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private emitAction(item: FabAction) {
    this.setOpen(false);
    this.dispatchEvent(
      new CustomEvent('gob-fab', {
        detail: {
          action: 'menu',
          value: item.id,
          item,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncFromAttributes() {
    const variant = resolveFabVariant(this.getAttribute('variant'));
    const size = resolveFabSize(this.getAttribute('size'));
    const icon = this.getAttribute('icon');
    const label =
      this.getAttribute('label')?.trim() ||
      this.textContent?.trim() ||
      'Accion';
    const disabled = this.hasAttribute('disabled');
    const extended = variant === 'extended';
    const isActions = variant === 'actions';
    this.actions = parseFabActions(this.getAttribute('actions'));
    this.open = this.hasAttribute('open');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.open = this.open ? 'true' : 'false';

    this.btnEl.disabled = disabled;
    this.btnEl.setAttribute('aria-label', label);
    if (isActions) {
      this.btnEl.setAttribute('aria-haspopup', 'menu');
      this.btnEl.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    } else {
      this.btnEl.removeAttribute('aria-haspopup');
      this.btnEl.removeAttribute('aria-expanded');
    }

    this.labelEl.textContent = label;
    this.labelEl.hidden = !extended;
    this.iconEl.innerHTML = resolveFabIcon(
      isActions && this.open ? 'x' : icon,
    );
    this.renderActions(isActions);
  }

  private renderActions(enabled: boolean) {
    this.actionsEl.replaceChildren();
    if (!enabled) return;

    this.actions.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'actionRow';
      row.style.animationDelay = `${index * 40}ms`;

      const label = document.createElement('span');
      label.className = 'actionLabel';
      label.textContent = item.label;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'actionBtn';
      btn.setAttribute('aria-label', item.label);
      btn.disabled = Boolean(item.disabled) || this.hasAttribute('disabled');

      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = resolveFabIcon(item.icon || 'plus');
      btn.appendChild(icon);

      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        if (btn.disabled) return;
        this.emitAction(item);
      });

      row.append(label, btn);
      this.actionsEl.appendChild(row);
    });
  }
}

defineCustomElement('gob-fab', GobFabElement);
export {};
