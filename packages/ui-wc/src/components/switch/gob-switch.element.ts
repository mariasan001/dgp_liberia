import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SWITCH_OBSERVED_ATTRIBUTES,
  resolveSwitchSize,
  resolveSwitchStatus,
  resolveSwitchVariant,
} from './switch-constants';
import { switchStyles } from './switch-styles';

function statusPill(status: string): string {
  switch (status) {
    case 'error':
      return 'Error';
    case 'success':
      return 'Valido';
    case 'warning':
      return 'Revision';
    case 'info':
      return 'Info';
    default:
      return '';
  }
}

class GobSwitchElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SWITCH_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly controlEl: HTMLLabelElement;
  private readonly inputEl: HTMLInputElement;
  private readonly trackEl: HTMLSpanElement;
  private readonly copyEl: HTMLElement;
  private readonly labelEl: HTMLSpanElement;
  private readonly labelTextEl: HTMLSpanElement;
  private readonly descEl: HTMLParagraphElement;
  private readonly helperEl: HTMLParagraphElement;
  private readonly statusEl: HTMLSpanElement;
  private readonly slotEl: HTMLSlotElement;
  private readonly reqEl: HTMLSpanElement;

  private fieldId = `gob-sw-${Math.random().toString(36).slice(2, 9)}`;
  private syncing = false;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = switchStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';

    this.controlEl = document.createElement('label');
    this.controlEl.className = 'control';

    this.inputEl = document.createElement('input');
    this.inputEl.type = 'checkbox';
    this.inputEl.setAttribute('role', 'switch');

    this.trackEl = document.createElement('span');
    this.trackEl.className = 'track';
    this.trackEl.setAttribute('aria-hidden', 'true');
    const thumb = document.createElement('span');
    thumb.className = 'thumb';
    this.trackEl.appendChild(thumb);

    this.copyEl = document.createElement('div');
    this.copyEl.className = 'copy';

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'label';

    this.labelTextEl = document.createElement('span');
    this.labelTextEl.className = 'label-text';

    this.slotEl = document.createElement('slot');

    this.reqEl = document.createElement('span');
    this.reqEl.className = 'req';
    this.reqEl.textContent = '*';
    this.reqEl.hidden = true;

    // Slot stays mounted once — never re-appended (avoids slotchange loops).
    this.labelEl.append(this.labelTextEl, this.slotEl, this.reqEl);

    this.descEl = document.createElement('p');
    this.descEl.className = 'description';
    this.descEl.hidden = true;

    this.statusEl = document.createElement('span');
    this.statusEl.className = 'pill-status';
    this.statusEl.hidden = true;

    this.copyEl.append(this.labelEl, this.descEl, this.statusEl);
    this.controlEl.append(this.inputEl, this.trackEl, this.copyEl);

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.hidden = true;

    this.rootEl.append(this.controlEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.inputEl.addEventListener('change', this.handleChange);
    this.slotEl.addEventListener('slotchange', this.onSlotChange);
    this.syncState();
  }

  disconnectedCallback() {
    this.inputEl.removeEventListener('change', this.handleChange);
    this.slotEl.removeEventListener('slotchange', this.onSlotChange);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.syncState();
  }

  private readonly onSlotChange = () => {
    if (this.syncing) return;
    this.updateLabelVisibility();
  };

  private readonly handleChange = () => {
    const nextChecked = this.inputEl.checked;
    if (nextChecked) {
      if (!this.hasAttribute('checked')) this.setAttribute('checked', '');
    } else if (this.hasAttribute('checked')) {
      this.removeAttribute('checked');
    }
    this.syncState();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-switch', {
        detail: {
          checked: this.inputEl.checked,
          value: this.inputEl.value,
        },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private hasSlotContent(): boolean {
    return this.slotEl.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      return node.nodeType === Node.ELEMENT_NODE;
    });
  }

  private updateLabelVisibility() {
    const attrLabel = this.getAttribute('label')?.trim() || '';
    const hasSlot = this.hasSlotContent();

    if (hasSlot) {
      this.labelTextEl.hidden = true;
      this.labelTextEl.textContent = '';
      this.slotEl.hidden = false;
    } else if (attrLabel) {
      this.labelTextEl.hidden = false;
      this.labelTextEl.textContent = attrLabel;
      this.slotEl.hidden = true;
    } else {
      this.labelTextEl.hidden = true;
      this.labelTextEl.textContent = '';
      this.slotEl.hidden = false;
    }

    this.reqEl.hidden = !this.hasAttribute('required');
  }

  private syncState() {
    if (this.syncing) return;
    this.syncing = true;
    try {
      const variant = resolveSwitchVariant(this.getAttribute('variant'));
      const status = resolveSwitchStatus(this.getAttribute('status'));
      const size = resolveSwitchSize(this.getAttribute('size'));
      const checked = this.hasAttribute('checked');
      const disabled = this.hasAttribute('disabled');
      const required = this.hasAttribute('required');
      const description = this.getAttribute('description')?.trim() || '';
      const helper = this.getAttribute('helper')?.trim() || '';

      this.rootEl.dataset.variant = variant;
      this.rootEl.dataset.status = status;
      this.rootEl.dataset.size = size;
      this.rootEl.dataset.checked = checked ? 'true' : 'false';
      this.rootEl.dataset.disabled = disabled ? 'true' : 'false';

      this.inputEl.id = this.fieldId;
      this.controlEl.htmlFor = this.fieldId;
      this.inputEl.checked = checked;
      this.inputEl.disabled = disabled;
      this.inputEl.required = required;
      this.inputEl.name = this.getAttribute('name') || '';
      this.inputEl.value = this.getAttribute('value') || 'on';
      this.inputEl.setAttribute('aria-checked', checked ? 'true' : 'false');

      const ariaLabel = this.getAttribute('aria-label');
      const ariaLabelledby = this.getAttribute('aria-labelledby');
      if (ariaLabel === null) this.inputEl.removeAttribute('aria-label');
      else this.inputEl.setAttribute('aria-label', ariaLabel);
      if (ariaLabelledby === null) this.inputEl.removeAttribute('aria-labelledby');
      else this.inputEl.setAttribute('aria-labelledby', ariaLabelledby);

      this.updateLabelVisibility();

      const descText =
        description ||
        (variant === 'complete'
          ? 'Incluye detalle de apoyo para la decision.'
          : variant === 'card' || variant === 'tile'
            ? 'Activa o desactiva esta preferencia.'
            : '');
      this.descEl.hidden = !descText;
      this.descEl.textContent = descText;

      const pill = statusPill(status);
      this.statusEl.hidden = !pill;
      this.statusEl.textContent = pill;

      const showHelper =
        Boolean(helper) ||
        variant === 'helper' ||
        variant === 'complete' ||
        status !== 'default';
      this.helperEl.hidden = !showHelper;
      this.helperEl.textContent =
        helper ||
        (status === 'error'
          ? 'Debes activar esta opcion'
          : status === 'success'
            ? 'Preferencia guardada'
            : status === 'warning'
              ? 'Requiere revision'
              : '');
    } finally {
      this.syncing = false;
    }
  }
}

defineCustomElement('gob-switch', GobSwitchElement);

export {};
