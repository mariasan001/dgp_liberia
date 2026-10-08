import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  COMBOBOX_OBSERVED_ATTRIBUTES,
  parseComboboxOptions,
  resolveComboboxSize,
  resolveComboboxStatus,
  resolveComboboxVariant,
  type ComboboxOption,
  type ComboboxVariant,
} from './combobox-constants';
import { comboboxStyles } from './combobox-styles';

const ICONS = {
  chevron: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.6"/><path d="M16.2 16.2L20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20.5h15M6.5 20.5V7.5l5-3 5 3v13M10 10.5h1.5M12.5 10.5H14M10 13.5h1.5M12.5 13.5H14M10 16.5h1.5M12.5 16.5H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
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

function leadFor(variant: ComboboxVariant): string | null {
  if (variant === 'floating') return null;
  if (variant === 'soft' || variant === 'complete') return ICONS.building;
  return ICONS.search;
}

class GobComboboxElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...COMBOBOX_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly headEl: HTMLElement;
  private readonly labelEl: HTMLLabelElement;
  private readonly pillEl: HTMLSpanElement;
  private readonly controlEl: HTMLElement;
  private readonly floatLabelEl: HTMLSpanElement;
  private readonly leadEl: HTMLSpanElement;
  private readonly fieldWrap: HTMLElement;
  private readonly field: HTMLInputElement;
  private readonly metaEl: HTMLSpanElement;
  private readonly trailEl: HTMLElement;
  private readonly clearBtn: HTMLButtonElement;
  private readonly chevronBtn: HTMLButtonElement;
  private readonly spinnerEl: HTMLSpanElement;
  private readonly panelEl: HTMLElement;
  private readonly listEl: HTMLElement;
  private readonly helperEl: HTMLParagraphElement;
  private readonly nativeEl: HTMLInputElement;

  private open = false;
  private query = '';
  private activeIndex = -1;
  private selectedValue = '';
  private options: ComboboxOption[] = [];
  private optionButtons: HTMLButtonElement[] = [];
  private fieldId = `gob-cb-${Math.random().toString(36).slice(2, 9)}`;
  private syncingField = false;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = comboboxStyles;

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
    this.controlEl.setAttribute('part', 'control');

    this.floatLabelEl = document.createElement('span');
    this.floatLabelEl.className = 'float-label';
    this.floatLabelEl.hidden = true;

    this.leadEl = document.createElement('span');
    this.leadEl.className = 'lead';
    this.leadEl.hidden = true;

    this.fieldWrap = document.createElement('div');
    this.fieldWrap.className = 'field-wrap';

    this.field = document.createElement('input');
    this.field.className = 'field';
    this.field.type = 'text';
    this.field.setAttribute('role', 'combobox');
    this.field.setAttribute('aria-autocomplete', 'list');
    this.field.setAttribute('aria-expanded', 'false');
    this.field.setAttribute('autocomplete', 'off');
    this.field.setAttribute('part', 'input');

    this.metaEl = document.createElement('span');
    this.metaEl.className = 'meta';
    this.metaEl.hidden = true;

    this.fieldWrap.append(this.field, this.metaEl);

    this.trailEl = document.createElement('div');
    this.trailEl.className = 'trail';

    this.clearBtn = document.createElement('button');
    this.clearBtn.type = 'button';
    this.clearBtn.className = 'clear';
    this.clearBtn.setAttribute('aria-label', 'Limpiar');
    this.clearBtn.innerHTML = ICONS.x;
    this.clearBtn.tabIndex = -1;

    this.spinnerEl = document.createElement('span');
    this.spinnerEl.className = 'spinner';
    this.spinnerEl.hidden = true;
    this.spinnerEl.setAttribute('aria-hidden', 'true');

    this.chevronBtn = document.createElement('button');
    this.chevronBtn.type = 'button';
    this.chevronBtn.className = 'chevron-btn';
    this.chevronBtn.setAttribute('aria-label', 'Abrir lista');
    this.chevronBtn.innerHTML = ICONS.chevron;
    this.chevronBtn.tabIndex = -1;

    this.trailEl.append(this.clearBtn, this.spinnerEl, this.chevronBtn);

    this.controlEl.append(
      this.floatLabelEl,
      this.leadEl,
      this.fieldWrap,
      this.trailEl,
    );

    this.panelEl = document.createElement('div');
    this.panelEl.className = 'panel';
    this.panelEl.setAttribute('part', 'panel');
    this.panelEl.hidden = true;

    this.listEl = document.createElement('div');
    this.listEl.className = 'list';
    this.listEl.setAttribute('role', 'listbox');
    this.panelEl.appendChild(this.listEl);

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.hidden = true;

    this.nativeEl = document.createElement('input');
    this.nativeEl.className = 'native';
    this.nativeEl.type = 'hidden';

    this.rootEl.append(
      this.headEl,
      this.controlEl,
      this.panelEl,
      this.helperEl,
      this.nativeEl,
    );
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.field.addEventListener('focus', this.onFocus);
    this.field.addEventListener('blur', this.onBlur);
    this.field.addEventListener('input', this.onInput);
    this.field.addEventListener('keydown', this.onKeydown);
    this.clearBtn.addEventListener('click', this.onClear);
    this.chevronBtn.addEventListener('click', this.onChevron);
    this.listEl.addEventListener('mousedown', this.onListMouseDown);
    this.listEl.addEventListener('click', this.onListClick);
    document.addEventListener('pointerdown', this.onDocPointer, true);
    this.sync();
  }

  disconnectedCallback() {
    this.field.removeEventListener('focus', this.onFocus);
    this.field.removeEventListener('blur', this.onBlur);
    this.field.removeEventListener('input', this.onInput);
    this.field.removeEventListener('keydown', this.onKeydown);
    this.clearBtn.removeEventListener('click', this.onClear);
    this.chevronBtn.removeEventListener('click', this.onChevron);
    this.listEl.removeEventListener('mousedown', this.onListMouseDown);
    this.listEl.removeEventListener('click', this.onListClick);
    document.removeEventListener('pointerdown', this.onDocPointer, true);
  }

  attributeChangedCallback() {
    this.sync();
  }

  private readonly onFocus = () => {
    this.rootEl.dataset.focused = 'true';
    this.setOpen(true);
  };

  private readonly onBlur = () => {
    // delay to allow option click
    window.setTimeout(() => {
      if (!this.open) this.rootEl.dataset.focused = 'false';
    }, 0);
  };

  private readonly onInput = () => {
    if (this.syncingField) return;
    this.query = this.field.value;
    this.field.dataset.empty = this.field.value ? 'false' : 'true';
    this.rootEl.dataset.filled = this.field.value ? 'true' : 'false';
    this.metaEl.hidden = true;
    this.selectedValue = '';
    this.nativeEl.value = '';
    this.activeIndex = 0;
    this.setOpen(true);
    this.renderList();
    this.dispatchEvent(
      new CustomEvent('gob-combobox', {
        detail: { value: '', query: this.query, label: this.query },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private readonly onKeydown = (event: KeyboardEvent) => {
    if (this.hasAttribute('disabled')) return;
    const enabled = this.optionButtons.filter(
      (b) => b.dataset.disabled !== 'true',
    );

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.open) this.setOpen(true);
      this.activeIndex = Math.min(this.activeIndex + 1, enabled.length - 1);
      this.paintActive(enabled);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.open) this.setOpen(true);
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
      this.paintActive(enabled);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const current = enabled[this.activeIndex];
      if (current) {
        this.selectOption(current.dataset.value || '', current.dataset.label || '');
      } else if (
        resolveComboboxVariant(this.getAttribute('variant')) === 'create' &&
        this.query.trim()
      ) {
        this.selectOption(this.query.trim(), this.query.trim(), true);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.setOpen(false);
      this.field.blur();
    }
  };

  private readonly onClear = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.hasAttribute('disabled')) return;
    this.selectedValue = '';
    this.query = '';
    this.syncingField = true;
    this.field.value = '';
    this.syncingField = false;
    this.field.dataset.empty = 'true';
    this.rootEl.dataset.filled = 'false';
    this.metaEl.hidden = true;
    this.nativeEl.value = '';
    if ((this.getAttribute('value') ?? '') !== '') {
      this.setAttribute('value', '');
    }
    this.activeIndex = 0;
    this.setOpen(true);
    this.renderList();
    this.field.focus();
    this.dispatchEvent(
      new CustomEvent('gob-combobox', {
        detail: { value: '', query: '', label: '' },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private readonly onChevron = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.hasAttribute('disabled')) return;
    this.setOpen(!this.open);
    this.field.focus();
  };

  private readonly onListMouseDown = (event: MouseEvent) => {
    // keep input focus
    event.preventDefault();
  };

  private readonly onListClick = (event: MouseEvent) => {
    const create = (event.target as HTMLElement).closest(
      'button.create',
    ) as HTMLButtonElement | null;
    if (create) {
      this.selectOption(this.query.trim(), this.query.trim(), true);
      return;
    }
    const btn = (event.target as HTMLElement).closest(
      'button.option',
    ) as HTMLButtonElement | null;
    if (!btn || btn.dataset.disabled === 'true') return;
    this.selectOption(btn.dataset.value || '', btn.dataset.label || '');
  };

  private readonly onDocPointer = (event: PointerEvent) => {
    if (!this.open) return;
    if (!event.composedPath().includes(this)) {
      this.setOpen(false);
      this.rootEl.dataset.focused = 'false';
    }
  };

  private setOpen(next: boolean) {
    if (this.hasAttribute('disabled')) return;
    this.open = next;
    this.rootEl.dataset.open = next ? 'true' : 'false';
    this.field.setAttribute('aria-expanded', next ? 'true' : 'false');
    this.panelEl.hidden = !next;
    if (next) {
      this.activeIndex = 0;
      this.renderList();
    }
  }

  private paintActive(enabled: HTMLButtonElement[]) {
    for (const btn of this.optionButtons) btn.dataset.active = 'false';
    const current = enabled[this.activeIndex];
    if (current) {
      current.dataset.active = 'true';
      current.scrollIntoView({ block: 'nearest' });
    }
  }

  private selectOption(value: string, label: string, created = false) {
    this.selectedValue = value;
    this.query = label;
    this.syncingField = true;
    this.field.value = label;
    this.syncingField = false;
    this.field.dataset.empty = label ? 'false' : 'true';
    this.rootEl.dataset.filled = value || label ? 'true' : 'false';
    this.nativeEl.value = value;

    const opt = this.options.find((o) => o.value === value);
    if (opt?.hint && !created) {
      this.metaEl.hidden = false;
      this.metaEl.textContent = opt.hint;
    } else {
      this.metaEl.hidden = true;
      this.metaEl.textContent = '';
    }

    if ((this.getAttribute('value') ?? '') !== value) {
      this.setAttribute('value', value);
    }

    this.setOpen(false);
    this.rootEl.dataset.focused = 'true';
    this.dispatchEvent(
      new CustomEvent('gob-combobox', {
        detail: { value, query: label, label, created },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private filtered(): ComboboxOption[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.options;
    return this.options.filter((opt) => {
      const hay = `${opt.label} ${opt.hint || ''} ${opt.value}`.toLowerCase();
      return hay.includes(q);
    });
  }

  private renderList() {
    const variant = resolveComboboxVariant(this.getAttribute('variant'));
    this.listEl.replaceChildren();
    this.optionButtons = [];

    if (variant === 'loading') {
      const msg = document.createElement('p');
      msg.className = 'loading-msg';
      msg.textContent = 'Buscando coincidencias…';
      this.listEl.appendChild(msg);
      return;
    }

    const items = this.filtered();
    for (const opt of items) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option';
      btn.dataset.value = opt.value;
      btn.dataset.label = opt.label;
      btn.dataset.selected = this.selectedValue === opt.value ? 'true' : 'false';
      btn.dataset.disabled = opt.disabled ? 'true' : 'false';
      btn.dataset.active = 'false';
      btn.setAttribute('role', 'option');
      btn.setAttribute(
        'aria-selected',
        this.selectedValue === opt.value ? 'true' : 'false',
      );
      if (opt.disabled) btn.disabled = true;

      const check = document.createElement('span');
      check.className = 'check';
      check.innerHTML = ICONS.check;

      const text = document.createElement('span');
      text.className = 'option-text';
      const label = document.createElement('span');
      label.className = 'option-label';
      label.textContent = opt.label;
      text.appendChild(label);
      if (opt.hint) {
        const hint = document.createElement('span');
        hint.className = 'option-hint';
        hint.textContent = opt.hint;
        text.appendChild(hint);
      }

      btn.append(check, text);
      if (opt.hint) {
        const badge = document.createElement('span');
        badge.className = 'option-badge';
        badge.textContent = opt.hint;
        btn.appendChild(badge);
      }

      this.listEl.appendChild(btn);
      this.optionButtons.push(btn);
    }

    if (!items.length) {
      if (variant === 'create' && this.query.trim()) {
        const create = document.createElement('button');
        create.type = 'button';
        create.className = 'create';
        create.innerHTML = `${ICONS.plus}<span>Agregar “${this.query.trim()}”</span>`;
        this.listEl.appendChild(create);
      } else {
        const empty = document.createElement('p');
        empty.className = 'empty';
        empty.textContent = 'Sin coincidencias';
        this.listEl.appendChild(empty);
      }
      this.activeIndex = -1;
      return;
    }

    if (
      variant === 'create' &&
      this.query.trim() &&
      !items.some(
        (o) => o.label.toLowerCase() === this.query.trim().toLowerCase(),
      )
    ) {
      const create = document.createElement('button');
      create.type = 'button';
      create.className = 'create';
      create.innerHTML = `${ICONS.plus}<span>Agregar “${this.query.trim()}”</span>`;
      this.listEl.appendChild(create);
    }

    const enabled = this.optionButtons.filter(
      (b) => b.dataset.disabled !== 'true',
    );
    this.activeIndex = Math.min(
      Math.max(this.activeIndex, 0),
      Math.max(enabled.length - 1, 0),
    );
    this.paintActive(enabled);
  }

  private sync() {
    const variant = resolveComboboxVariant(this.getAttribute('variant'));
    const status = resolveComboboxStatus(this.getAttribute('status'));
    const size = resolveComboboxSize(this.getAttribute('size'));
    const label = this.getAttribute('label')?.trim() || '';
    const placeholder =
      this.getAttribute('placeholder')?.trim() || 'Escribe para buscar…';
    const helper = this.getAttribute('helper')?.trim() || '';
    const name = this.getAttribute('name') ?? '';
    const disabled = this.hasAttribute('disabled');
    const required = this.hasAttribute('required');
    const valueAttr = this.getAttribute('value') ?? '';

    this.options = parseComboboxOptions(this.getAttribute('options'));
    this.selectedValue = valueAttr;

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';
    this.rootEl.dataset.open = this.open ? 'true' : 'false';

    const isFloating = variant === 'floating';
    const showLabel =
      !isFloating &&
      (Boolean(label) ||
        [
          'labeled',
          'helper',
          'dense',
          'filled',
          'soft',
          'pill',
          'icon',
          'create',
          'loading',
          'complete',
        ].includes(variant));

    this.headEl.hidden = !showLabel && status === 'default';
    this.labelEl.hidden = !showLabel;
    this.labelEl.replaceChildren();
    this.labelEl.append(document.createTextNode(label || 'Selector'));
    if (required) {
      const req = document.createElement('span');
      req.className = 'req';
      req.textContent = '*';
      this.labelEl.appendChild(req);
    }

    const pill = statusPill(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;

    this.field.id = this.fieldId;
    this.labelEl.htmlFor = this.fieldId;
    this.field.disabled = disabled;
    this.field.required = required;
    this.field.placeholder = isFloating ? 'Buscar…' : placeholder;
    this.field.setAttribute('aria-controls', `${this.fieldId}-list`);
    this.listEl.id = `${this.fieldId}-list`;

    if (isFloating) {
      this.floatLabelEl.hidden = false;
      this.floatLabelEl.textContent = label || 'Buscar';
    } else {
      this.floatLabelEl.hidden = true;
    }

    const icon = leadFor(variant);
    if (icon) {
      this.leadEl.hidden = false;
      this.leadEl.innerHTML = icon;
    } else {
      this.leadEl.hidden = true;
      this.leadEl.innerHTML = '';
    }

    this.spinnerEl.hidden = variant !== 'loading';
    this.chevronBtn.hidden = variant === 'loading';

    const selected = this.options.find((o) => o.value === valueAttr);
    if (selected) {
      this.query = selected.label;
      if (!this.syncingField && document.activeElement !== this.field) {
        this.syncingField = true;
        this.field.value = selected.label;
        this.syncingField = false;
      }
      if (selected.hint) {
        this.metaEl.hidden = false;
        this.metaEl.textContent = selected.hint;
      } else {
        this.metaEl.hidden = true;
      }
    } else if (!this.open && document.activeElement !== this.field) {
      // keep typed query while interacting; reset display from attr if closed
      if (!valueAttr && !this.query) {
        this.syncingField = true;
        this.field.value = '';
        this.syncingField = false;
        this.metaEl.hidden = true;
      }
    }

    this.field.dataset.empty = this.field.value ? 'false' : 'true';
    this.rootEl.dataset.filled =
      this.field.value || this.selectedValue ? 'true' : 'false';

    const showHelper =
      Boolean(helper) ||
      variant === 'helper' ||
      variant === 'complete' ||
      variant === 'create' ||
      status !== 'default';
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent =
      helper ||
      (status === 'error'
        ? 'Elige una opcion de la lista'
        : status === 'success'
          ? 'Seleccion confirmada'
          : status === 'warning'
            ? 'Requiere revision'
            : variant === 'create'
              ? 'Puedes elegir o agregar un valor nuevo.'
              : '');

    this.nativeEl.name = name;
    this.nativeEl.value = this.selectedValue;
    this.nativeEl.required = required;
    this.nativeEl.disabled = disabled;

    if (this.open) this.renderList();
  }
}

defineCustomElement('gob-combobox', GobComboboxElement);

export {};
