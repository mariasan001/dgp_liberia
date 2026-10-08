import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  SELECT_OBSERVED_ATTRIBUTES,
  flattenOptions,
  isGroup,
  parseSelectOptions,
  resolveSelectSize,
  resolveSelectStatus,
  resolveSelectVariant,
  type SelectOption,
  type SelectOptionsPayload,
  type SelectVariant,
} from './select-constants';
import { selectStyles } from './select-styles';

const ICONS = {
  chevron: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.8 12 21 12 21Z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10.8" r="2.2" stroke="currentColor" stroke-width="1.6"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20.5h15M6.5 20.5V7.5l5-3 5 3v13M10 10.5h1.5M12.5 10.5H14M10 13.5h1.5M12.5 13.5H14M10 16.5h1.5M12.5 16.5H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.6"/><path d="M16.2 16.2L20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5L4.5 9 12 13.5 19.5 9 12 4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4.5 13.5L12 18l7.5-4.5M4.5 16.5L12 21l7.5-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
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

function parseValues(value: string, multiple: boolean): string[] {
  if (!value) return [];
  if (!multiple) return [value];
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function leadIconFor(variant: SelectVariant): string | null {
  if (variant === 'search') return ICONS.search;
  if (variant === 'soft' || variant === 'split') return ICONS.building;
  if (variant === 'icon' || variant === 'complete' || variant === 'group') {
    return ICONS.pin;
  }
  if (variant === 'multiple') return ICONS.layers;
  return null;
}

class GobSelectElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...SELECT_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly headEl: HTMLElement;
  private readonly labelEl: HTMLLabelElement;
  private readonly pillEl: HTMLSpanElement;
  private readonly triggerEl: HTMLButtonElement;
  private readonly floatLabelEl: HTMLSpanElement;
  private readonly leadEl: HTMLSpanElement;
  private readonly valueWrapEl: HTMLElement;
  private readonly valueEl: HTMLSpanElement;
  private readonly metaEl: HTMLSpanElement;
  private readonly chipsEl: HTMLElement;
  private readonly trailEl: HTMLElement;
  private readonly clearBtn: HTMLButtonElement;
  private readonly chevronEl: HTMLSpanElement;
  private readonly panelEl: HTMLElement;
  private readonly searchWrap: HTMLElement;
  private readonly searchInput: HTMLInputElement;
  private readonly listEl: HTMLElement;
  private readonly helperEl: HTMLParagraphElement;
  private readonly nativeEl: HTMLSelectElement;

  private open = false;
  private query = '';
  private activeIndex = -1;
  private selected: string[] = [];
  private optionsPayload: SelectOptionsPayload = [];
  private flatOptions: SelectOption[] = [];
  private optionButtons: HTMLButtonElement[] = [];
  private fieldId = `gob-sel-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = selectStyles;

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

    this.triggerEl = document.createElement('button');
    this.triggerEl.type = 'button';
    this.triggerEl.className = 'trigger';
    this.triggerEl.setAttribute('part', 'trigger');
    this.triggerEl.setAttribute('aria-haspopup', 'listbox');
    this.triggerEl.setAttribute('aria-expanded', 'false');

    this.floatLabelEl = document.createElement('span');
    this.floatLabelEl.className = 'float-label';
    this.floatLabelEl.hidden = true;

    this.leadEl = document.createElement('span');
    this.leadEl.className = 'lead';
    this.leadEl.hidden = true;

    this.valueWrapEl = document.createElement('div');
    this.valueWrapEl.className = 'value-wrap';

    this.valueEl = document.createElement('span');
    this.valueEl.className = 'value';

    this.metaEl = document.createElement('span');
    this.metaEl.className = 'meta';
    this.metaEl.hidden = true;

    this.chipsEl = document.createElement('div');
    this.chipsEl.className = 'chips';
    this.chipsEl.hidden = true;

    this.valueWrapEl.append(this.valueEl, this.metaEl, this.chipsEl);

    this.trailEl = document.createElement('div');
    this.trailEl.className = 'trail';

    this.clearBtn = document.createElement('button');
    this.clearBtn.type = 'button';
    this.clearBtn.className = 'clear';
    this.clearBtn.setAttribute('aria-label', 'Limpiar seleccion');
    this.clearBtn.innerHTML = ICONS.x;
    this.clearBtn.tabIndex = -1;

    this.chevronEl = document.createElement('span');
    this.chevronEl.className = 'chevron';
    this.chevronEl.innerHTML = ICONS.chevron;
    this.chevronEl.setAttribute('aria-hidden', 'true');

    this.trailEl.append(this.clearBtn, this.chevronEl);

    this.triggerEl.append(
      this.floatLabelEl,
      this.leadEl,
      this.valueWrapEl,
      this.trailEl,
    );

    this.panelEl = document.createElement('div');
    this.panelEl.className = 'panel';
    this.panelEl.setAttribute('part', 'panel');
    this.panelEl.hidden = true;

    this.searchWrap = document.createElement('div');
    this.searchWrap.className = 'search-wrap';
    this.searchWrap.hidden = true;
    this.searchWrap.innerHTML = ICONS.search;

    this.searchInput = document.createElement('input');
    this.searchInput.className = 'search';
    this.searchInput.type = 'search';
    this.searchInput.placeholder = 'Buscar…';
    this.searchInput.setAttribute('aria-label', 'Buscar opciones');
    this.searchWrap.appendChild(this.searchInput);

    this.listEl = document.createElement('div');
    this.listEl.className = 'list';
    this.listEl.setAttribute('role', 'listbox');

    this.panelEl.append(this.searchWrap, this.listEl);

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.hidden = true;

    this.nativeEl = document.createElement('select');
    this.nativeEl.className = 'native';
    this.nativeEl.tabIndex = -1;
    this.nativeEl.setAttribute('aria-hidden', 'true');

    this.rootEl.append(
      this.headEl,
      this.triggerEl,
      this.panelEl,
      this.helperEl,
      this.nativeEl,
    );
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.triggerEl.addEventListener('click', this.onTriggerClick);
    this.triggerEl.addEventListener('keydown', this.onTriggerKeydown);
    this.clearBtn.addEventListener('click', this.onClear);
    this.searchInput.addEventListener('input', this.onSearch);
    this.searchInput.addEventListener('keydown', this.onSearchKeydown);
    this.listEl.addEventListener('click', this.onListClick);
    document.addEventListener('pointerdown', this.onDocPointer, true);
    this.sync(true);
  }

  disconnectedCallback() {
    this.triggerEl.removeEventListener('click', this.onTriggerClick);
    this.triggerEl.removeEventListener('keydown', this.onTriggerKeydown);
    this.clearBtn.removeEventListener('click', this.onClear);
    this.searchInput.removeEventListener('input', this.onSearch);
    this.searchInput.removeEventListener('keydown', this.onSearchKeydown);
    this.listEl.removeEventListener('click', this.onListClick);
    document.removeEventListener('pointerdown', this.onDocPointer, true);
  }

  attributeChangedCallback() {
    this.sync(false);
  }

  private readonly onTriggerClick = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('.clear')) return;
    if (this.hasAttribute('disabled')) return;
    this.setOpen(!this.open);
  };

  private readonly onClear = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.hasAttribute('disabled')) return;
    this.selected = [];
    this.emitChange();
    this.renderValue();
    this.renderList();
    this.syncNative();
    this.triggerEl.focus();
  };

  private readonly onSearch = () => {
    this.query = this.searchInput.value.trim().toLowerCase();
    this.activeIndex = 0;
    this.renderList();
  };

  private readonly onSearchKeydown = (event: KeyboardEvent) => {
    this.handleListKeys(event);
  };

  private readonly onTriggerKeydown = (event: KeyboardEvent) => {
    if (this.hasAttribute('disabled')) return;
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      if (!this.open) {
        this.setOpen(true);
        return;
      }
      this.handleListKeys(event);
    } else if (event.key === 'Escape' && this.open) {
      event.preventDefault();
      this.setOpen(false);
    }
  };

  private readonly onListClick = (event: MouseEvent) => {
    const btn = (event.target as HTMLElement).closest(
      'button.option',
    ) as HTMLButtonElement | null;
    if (!btn || btn.dataset.disabled === 'true') return;
    const value = btn.dataset.value || '';
    this.toggleValue(value);
  };

  private readonly onDocPointer = (event: PointerEvent) => {
    if (!this.open) return;
    const path = event.composedPath();
    if (!path.includes(this)) this.setOpen(false);
  };

  private handleListKeys(event: KeyboardEvent) {
    const enabled = this.optionButtons.filter(
      (b) => b.dataset.disabled !== 'true',
    );
    if (!enabled.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = Math.min(this.activeIndex + 1, enabled.length - 1);
      this.paintActive(enabled);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
      this.paintActive(enabled);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const current = enabled[this.activeIndex] || enabled[0];
      if (current) this.toggleValue(current.dataset.value || '');
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.setOpen(false);
      this.triggerEl.focus();
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

  private setOpen(next: boolean) {
    if (this.hasAttribute('disabled')) return;
    this.open = next;
    this.rootEl.dataset.open = next ? 'true' : 'false';
    this.rootEl.dataset.focused = next ? 'true' : 'false';
    this.triggerEl.setAttribute('aria-expanded', next ? 'true' : 'false');
    this.panelEl.hidden = !next;
    this.renderValue();
    if (next) {
      this.query = '';
      this.searchInput.value = '';
      this.activeIndex = 0;
      this.renderList();
      const variant = resolveSelectVariant(this.getAttribute('variant'));
      if (variant === 'search') {
        queueMicrotask(() => this.searchInput.focus());
      }
    }
  }

  private toggleValue(value: string) {
    const variant = resolveSelectVariant(this.getAttribute('variant'));
    const multiple = variant === 'multiple';
    if (multiple) {
      if (this.selected.includes(value)) {
        this.selected = this.selected.filter((v) => v !== value);
      } else {
        this.selected = [...this.selected, value];
      }
      this.emitChange();
      this.renderValue();
      this.renderList();
      this.syncNative();
    } else {
      this.selected = value ? [value] : [];
      this.emitChange();
      this.renderValue();
      this.renderList();
      this.syncNative();
      this.setOpen(false);
      this.triggerEl.focus();
    }
  }

  private emitChange() {
    const variant = resolveSelectVariant(this.getAttribute('variant'));
    const multiple = variant === 'multiple';
    const value = multiple ? this.selected.join(',') : this.selected[0] || '';
    if ((this.getAttribute('value') ?? '') !== value) {
      this.setAttribute('value', value);
    }
    this.rootEl.dataset.filled = value ? 'true' : 'false';
    this.dispatchEvent(
      new CustomEvent('gob-select', {
        detail: { value, values: [...this.selected] },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private sync(fromConnect: boolean) {
    const variant = resolveSelectVariant(this.getAttribute('variant'));
    const status = resolveSelectStatus(this.getAttribute('status'));
    const size = resolveSelectSize(this.getAttribute('size'));
    const label = this.getAttribute('label')?.trim() || '';
    const placeholder = this.resolvePlaceholder(variant);
    const helper = this.getAttribute('helper')?.trim() || '';
    const name = this.getAttribute('name') ?? '';
    const disabled = this.hasAttribute('disabled');
    const required = this.hasAttribute('required');
    const multiple = variant === 'multiple';
    const valueAttr = this.getAttribute('value') ?? '';

    this.optionsPayload = parseSelectOptions(
      this.getAttribute('options'),
      variant,
    );
    this.flatOptions = flattenOptions(this.optionsPayload);
    this.selected = parseValues(valueAttr, multiple);

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
          'group',
          'multiple',
          'search',
          'underline',
          'ghost',
          'split',
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

    this.triggerEl.id = this.fieldId;
    this.labelEl.htmlFor = this.fieldId;
    this.triggerEl.disabled = disabled;
    this.triggerEl.dataset.placeholder = placeholder;

    if (isFloating) {
      this.floatLabelEl.hidden = false;
      this.floatLabelEl.textContent = label || 'Entidad';
    } else {
      this.floatLabelEl.hidden = true;
    }

    const icon = leadIconFor(variant);
    if (icon) {
      this.leadEl.hidden = false;
      this.leadEl.innerHTML = icon;
    } else {
      this.leadEl.hidden = true;
      this.leadEl.innerHTML = '';
    }

    this.searchWrap.hidden = variant !== 'search';
    this.listEl.setAttribute(
      'aria-multiselectable',
      multiple ? 'true' : 'false',
    );

    const showHelper =
      Boolean(helper) ||
      variant === 'helper' ||
      variant === 'complete' ||
      status !== 'default';
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent =
      helper ||
      (status === 'error'
        ? 'Selecciona una opcion valida'
        : status === 'success'
          ? 'Seleccion confirmada'
          : status === 'warning'
            ? 'Requiere revision'
            : '');

    this.nativeEl.name = name;
    this.nativeEl.required = required;
    this.nativeEl.disabled = disabled;
    this.nativeEl.multiple = multiple;

    this.renderValue();
    this.syncNative();
    if (this.open || fromConnect) this.renderList();
  }

  private resolvePlaceholder(variant: SelectVariant): string {
    const raw = this.getAttribute('placeholder');
    if (raw !== null && raw.trim() === '' && variant === 'floating') {
      return 'Elige una opcion';
    }
    const trimmed = raw?.trim() || '';
    if (trimmed) return trimmed;
    if (variant === 'floating') return 'Elige una opcion';
    return 'Selecciona una opcion';
  }

  private renderValue() {
    const variant = resolveSelectVariant(this.getAttribute('variant'));
    const multiple = variant === 'multiple';
    const placeholder = this.resolvePlaceholder(variant);
    const selectedOpts = this.flatOptions.filter((o) =>
      this.selected.includes(o.value),
    );

    this.rootEl.dataset.filled = selectedOpts.length ? 'true' : 'false';
    this.chipsEl.replaceChildren();

    if (multiple) {
      this.valueEl.hidden = selectedOpts.length > 0;
      this.metaEl.hidden = true;
      this.chipsEl.hidden = selectedOpts.length === 0;
      this.valueEl.textContent = placeholder;
      this.valueEl.dataset.placeholder = 'true';

      for (const opt of selectedOpts) {
        const chip = document.createElement('span');
        chip.className = 'chip';
        const text = document.createElement('span');
        text.textContent = opt.label;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', `Quitar ${opt.label}`);
        btn.innerHTML = ICONS.x;
        btn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.toggleValue(opt.value);
        });
        chip.append(text, btn);
        this.chipsEl.appendChild(chip);
      }
      return;
    }

    this.chipsEl.hidden = true;
    this.valueEl.hidden = false;
    const current = selectedOpts[0];
    if (current) {
      this.valueEl.textContent = current.label;
      this.valueEl.dataset.placeholder = 'false';
      if (current.hint && variant !== 'floating') {
        this.metaEl.hidden = false;
        this.metaEl.textContent = current.hint;
      } else {
        this.metaEl.hidden = true;
        this.metaEl.textContent = '';
      }
    } else {
      this.valueEl.textContent = placeholder;
      this.valueEl.dataset.placeholder = 'true';
      this.metaEl.hidden = true;
      this.metaEl.textContent = '';
    }
  }

  private renderList() {
    const variant = resolveSelectVariant(this.getAttribute('variant'));
    this.listEl.replaceChildren();
    this.optionButtons = [];

    let rendered = 0;
    const q = this.query;

    const pushOption = (opt: SelectOption) => {
      if (q) {
        const hay = `${opt.label} ${opt.hint || ''} ${opt.value}`.toLowerCase();
        if (!hay.includes(q)) return;
      }
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option';
      btn.dataset.value = opt.value;
      btn.dataset.selected = this.selected.includes(opt.value)
        ? 'true'
        : 'false';
      btn.dataset.disabled = opt.disabled ? 'true' : 'false';
      btn.dataset.active = 'false';
      btn.setAttribute('role', 'option');
      btn.setAttribute(
        'aria-selected',
        this.selected.includes(opt.value) ? 'true' : 'false',
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
      if (variant === 'group' && opt.hint) {
        const badge = document.createElement('span');
        badge.className = 'option-badge';
        badge.textContent = opt.hint;
        btn.appendChild(badge);
      }

      this.listEl.appendChild(btn);
      this.optionButtons.push(btn);
      rendered += 1;
    };

    for (const item of this.optionsPayload) {
      if (isGroup(item)) {
        const visible = item.options.filter((opt) => {
          if (!q) return true;
          const hay = `${opt.label} ${opt.hint || ''} ${opt.value}`.toLowerCase();
          return hay.includes(q);
        });
        if (!visible.length) continue;
        const group = document.createElement('div');
        group.className = 'group-label';
        group.textContent = item.label;
        this.listEl.appendChild(group);
        for (const opt of item.options) pushOption(opt);
      } else {
        pushOption(item);
      }
    }

    if (!rendered) {
      const empty = document.createElement('p');
      empty.className = 'empty';
      empty.textContent = 'Sin coincidencias';
      this.listEl.appendChild(empty);
      this.activeIndex = -1;
      return;
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

  private syncNative() {
    const multiple = resolveSelectVariant(this.getAttribute('variant')) === 'multiple';
    this.nativeEl.replaceChildren();
    for (const opt of this.flatOptions) {
      const el = document.createElement('option');
      el.value = opt.value;
      el.textContent = opt.label;
      el.selected = this.selected.includes(opt.value);
      this.nativeEl.appendChild(el);
    }
    if (!multiple) {
      this.nativeEl.value = this.selected[0] || '';
    }
  }
}

defineCustomElement('gob-select', GobSelectElement);

export {};
