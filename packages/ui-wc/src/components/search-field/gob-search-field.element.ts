import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SEARCH_FIELD_OBSERVED_ATTRIBUTES,
  resolveSearchFieldSize,
  resolveSearchFieldStatus,
  resolveSearchFieldVariant,
} from './search-field-constants';
import { searchFieldStyles } from './search-field-styles';

const ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.6"/><path d="M16.2 16.2L20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};

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

class GobSearchFieldElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SEARCH_FIELD_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly headEl: HTMLElement;
  private readonly labelEl: HTMLLabelElement;
  private readonly pillEl: HTMLSpanElement;
  private readonly controlEl: HTMLElement;
  private readonly floatLabelEl: HTMLSpanElement;
  private readonly leadEl: HTMLSpanElement;
  private readonly field: HTMLInputElement;
  private readonly actionsEl: HTMLElement;
  private readonly clearBtn: HTMLButtonElement;
  private readonly kbdEl: HTMLSpanElement;
  private readonly spinnerEl: HTMLSpanElement;
  private readonly helperEl: HTMLParagraphElement;

  private fieldId = `gob-sf-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = searchFieldStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';

    this.headEl = document.createElement('div');
    this.headEl.className = 'head';

    this.labelEl = document.createElement('label');
    this.labelEl.className = 'label';

    this.pillEl = document.createElement('span');
    this.pillEl.className = 'pill';
    this.pillEl.hidden = true;

    this.headEl.append(this.labelEl, this.pillEl);

    this.controlEl = document.createElement('div');
    this.controlEl.className = 'control';

    this.floatLabelEl = document.createElement('span');
    this.floatLabelEl.className = 'float-label';
    this.floatLabelEl.hidden = true;

    this.leadEl = document.createElement('span');
    this.leadEl.className = 'lead';
    this.leadEl.innerHTML = ICONS.search;
    this.leadEl.setAttribute('aria-hidden', 'true');

    this.field = document.createElement('input');
    this.field.className = 'field';
    this.field.type = 'search';
    this.field.autocomplete = 'off';
    this.field.setAttribute('enterkeyhint', 'search');

    this.actionsEl = document.createElement('div');
    this.actionsEl.className = 'actions';

    this.clearBtn = document.createElement('button');
    this.clearBtn.type = 'button';
    this.clearBtn.className = 'icon-btn clear';
    this.clearBtn.setAttribute('aria-label', 'Limpiar busqueda');
    this.clearBtn.innerHTML = ICONS.x;
    this.clearBtn.tabIndex = -1;

    this.kbdEl = document.createElement('span');
    this.kbdEl.className = 'kbd';
    this.kbdEl.setAttribute('aria-hidden', 'true');

    this.spinnerEl = document.createElement('span');
    this.spinnerEl.className = 'spinner';
    this.spinnerEl.setAttribute('aria-hidden', 'true');

    this.actionsEl.append(this.spinnerEl, this.clearBtn, this.kbdEl);
    this.controlEl.append(
      this.floatLabelEl,
      this.leadEl,
      this.field,
      this.actionsEl,
    );

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.hidden = true;

    this.rootEl.append(this.headEl, this.controlEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.field.addEventListener('input', this.onInput);
    this.field.addEventListener('change', this.onChange);
    this.field.addEventListener('focus', this.onFocus);
    this.field.addEventListener('blur', this.onBlur);
    this.field.addEventListener('keydown', this.onKeyDown);
    this.clearBtn.addEventListener('click', this.onClear);
    this.syncFromAttributes();
  }

  disconnectedCallback() {
    this.field.removeEventListener('input', this.onInput);
    this.field.removeEventListener('change', this.onChange);
    this.field.removeEventListener('focus', this.onFocus);
    this.field.removeEventListener('blur', this.onBlur);
    this.field.removeEventListener('keydown', this.onKeyDown);
    this.clearBtn.removeEventListener('click', this.onClear);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    if (name === 'value' && this.field.value === (newValue || '')) {
      this.rootEl.dataset.filled = this.field.value ? 'true' : 'false';
      return;
    }
    this.syncFromAttributes();
  }

  private readonly onInput = () => {
    const value = this.field.value;
    if (this.getAttribute('value') !== value) {
      if (value) this.setAttribute('value', value);
      else this.removeAttribute('value');
    }
    this.rootEl.dataset.filled = value ? 'true' : 'false';
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-search', {
        detail: { value, reason: 'input' },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private readonly onChange = () => {
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  };

  private readonly onFocus = () => {
    this.rootEl.dataset.focused = 'true';
  };

  private readonly onBlur = () => {
    this.rootEl.dataset.focused = 'false';
  };

  private readonly onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.field.value) {
      e.preventDefault();
      this.clearValue();
      return;
    }
    if (e.key === 'Enter') {
      this.dispatchEvent(
        new CustomEvent('gob-search', {
          detail: { value: this.field.value, reason: 'submit' },
          bubbles: true,
          composed: true,
        }),
      );
    }
  };

  private readonly onClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.clearValue();
    this.field.focus();
  };

  private clearValue() {
    this.field.value = '';
    this.removeAttribute('value');
    this.rootEl.dataset.filled = 'false';
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-search', {
        detail: { value: '', reason: 'clear' },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncFromAttributes() {
    const variant = resolveSearchFieldVariant(this.getAttribute('variant'));
    const status = resolveSearchFieldStatus(this.getAttribute('status'));
    const size = resolveSearchFieldSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const required = this.hasAttribute('required');
    const loading =
      this.hasAttribute('loading') || variant === 'loading';
    const label = this.getAttribute('label')?.trim() || '';
    const helper = this.getAttribute('helper')?.trim() || '';
    const placeholder =
      this.getAttribute('placeholder')?.trim() || 'Buscar…';
    const shortcut = this.getAttribute('shortcut')?.trim() || '⌘K';
    const value = this.getAttribute('value') ?? '';
    const clearable =
      variant === 'clearable' ||
      variant === 'complete' ||
      variant === 'shortcut' ||
      variant === 'loading' ||
      variant === 'pill' ||
      variant === 'soft';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';
    this.rootEl.dataset.clearable = clearable ? 'true' : 'false';
    this.rootEl.dataset.loading = loading ? 'true' : 'false';
    this.rootEl.dataset.filled = value ? 'true' : 'false';
    if (this.rootEl.dataset.focused !== 'true') {
      this.rootEl.dataset.focused = 'false';
    }

    this.field.id = this.fieldId;
    this.labelEl.htmlFor = this.fieldId;
    this.field.value = value;
    this.field.placeholder = placeholder;
    this.field.disabled = disabled;
    this.field.readOnly = readonly;
    this.field.required = required;
    this.field.name = this.getAttribute('name') || '';

    const showLabel = Boolean(label) && variant !== 'basic' && variant !== 'floating';
    this.labelEl.hidden = !showLabel;
    this.labelEl.innerHTML = '';
    if (showLabel) {
      this.labelEl.append(document.createTextNode(label));
      if (required) {
        const req = document.createElement('span');
        req.className = 'req';
        req.textContent = '*';
        this.labelEl.append(req);
      }
    }

    const floating = variant === 'floating';
    this.floatLabelEl.hidden = !floating;
    this.floatLabelEl.textContent = label || 'Buscar';

    const pill = statusPill(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.headEl.hidden = !showLabel && !pill;

    this.kbdEl.textContent = shortcut;

    const showHelper =
      Boolean(helper) ||
      variant === 'helper' ||
      variant === 'complete' ||
      status !== 'default';
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent =
      helper ||
      (status === 'error'
        ? 'No se encontraron resultados'
        : status === 'success'
          ? 'Busqueda lista'
          : status === 'warning'
            ? 'Afina tu busqueda'
            : '');
  }
}

defineCustomElement('gob-search-field', GobSearchFieldElement);

export {};
