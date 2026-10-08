import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TIMEPICKER_OBSERVED_ATTRIBUTES,
  formatTime,
  hoursList,
  minutesList,
  parseTime,
  resolveStep,
  resolveTimepickerSize,
  resolveTimepickerStatus,
  resolveTimepickerVariant,
} from './timepicker-constants';
import { timepickerStyles } from './timepicker-styles';

const ICONS = {
  clock: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3.2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.5 6.5L15 12l-5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
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

class GobTimepickerElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TIMEPICKER_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly headEl: HTMLElement;
  private readonly labelEl: HTMLLabelElement;
  private readonly pillEl: HTMLSpanElement;
  private readonly triggerEl: HTMLButtonElement;
  private readonly floatLabelEl: HTMLSpanElement;
  private readonly leadEl: HTMLSpanElement;
  private readonly valueEl: HTMLSpanElement;
  private readonly clearBtn: HTMLButtonElement;
  private readonly trailEl: HTMLSpanElement;
  private readonly panelEl: HTMLElement;
  private readonly summaryEl: HTMLElement;
  private readonly hoursListEl: HTMLElement;
  private readonly minutesListEl: HTMLElement;
  private readonly helperEl: HTMLParagraphElement;
  private readonly hiddenInput: HTMLInputElement;

  private open = false;
  private minutes: number | null = null;
  private draftHour = 9;
  private draftMinute = 0;
  private fieldId = `gob-tp-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = timepickerStyles;

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
    this.triggerEl.setAttribute('aria-haspopup', 'dialog');
    this.triggerEl.setAttribute('aria-expanded', 'false');

    this.floatLabelEl = document.createElement('span');
    this.floatLabelEl.className = 'float-label';
    this.floatLabelEl.hidden = true;

    this.leadEl = document.createElement('span');
    this.leadEl.className = 'lead';
    this.leadEl.innerHTML = ICONS.clock;
    this.leadEl.setAttribute('aria-hidden', 'true');

    this.valueEl = document.createElement('span');
    this.valueEl.className = 'value';

    this.clearBtn = document.createElement('button');
    this.clearBtn.type = 'button';
    this.clearBtn.className = 'icon-btn clear';
    this.clearBtn.setAttribute('aria-label', 'Limpiar hora');
    this.clearBtn.innerHTML = ICONS.x;
    this.clearBtn.tabIndex = -1;

    this.trailEl = document.createElement('span');
    this.trailEl.className = 'trail';
    this.trailEl.setAttribute('aria-hidden', 'true');
    this.trailEl.innerHTML = ICONS.chevron;

    this.triggerEl.append(
      this.floatLabelEl,
      this.leadEl,
      this.valueEl,
      this.clearBtn,
      this.trailEl,
    );

    this.panelEl = document.createElement('div');
    this.panelEl.className = 'panel';
    this.panelEl.setAttribute('role', 'dialog');
    this.panelEl.setAttribute('aria-label', 'Selector de hora');

    this.summaryEl = document.createElement('div');
    this.summaryEl.className = 'summary';

    const cols = document.createElement('div');
    cols.className = 'cols';

    const hourCol = document.createElement('div');
    hourCol.className = 'col';
    const hourLabel = document.createElement('p');
    hourLabel.className = 'col-label';
    hourLabel.textContent = 'Hora';
    this.hoursListEl = document.createElement('div');
    this.hoursListEl.className = 'list';
    this.hoursListEl.setAttribute('role', 'listbox');
    this.hoursListEl.setAttribute('aria-label', 'Horas');
    hourCol.append(hourLabel, this.hoursListEl);

    const sep = document.createElement('div');
    sep.className = 'sep';
    sep.textContent = ':';
    sep.setAttribute('aria-hidden', 'true');

    const minCol = document.createElement('div');
    minCol.className = 'col';
    const minLabel = document.createElement('p');
    minLabel.className = 'col-label';
    minLabel.textContent = 'Min';
    this.minutesListEl = document.createElement('div');
    this.minutesListEl.className = 'list';
    this.minutesListEl.setAttribute('role', 'listbox');
    this.minutesListEl.setAttribute('aria-label', 'Minutos');
    minCol.append(minLabel, this.minutesListEl);

    cols.append(hourCol, sep, minCol);

    const foot = document.createElement('div');
    foot.className = 'cal-foot';

    const nowBtn = document.createElement('button');
    nowBtn.type = 'button';
    nowBtn.className = 'foot-btn foot-primary';
    nowBtn.textContent = 'Ahora';
    nowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.pickNow();
    });

    const clearFoot = document.createElement('button');
    clearFoot.type = 'button';
    clearFoot.className = 'foot-btn';
    clearFoot.textContent = 'Limpiar';
    clearFoot.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clearValue();
    });

    foot.append(nowBtn, clearFoot);
    this.panelEl.append(this.summaryEl, cols, foot);

    this.helperEl = document.createElement('p');
    this.helperEl.className = 'helper';
    this.helperEl.hidden = true;

    this.hiddenInput = document.createElement('input');
    this.hiddenInput.type = 'hidden';

    this.rootEl.append(
      this.headEl,
      this.triggerEl,
      this.panelEl,
      this.helperEl,
      this.hiddenInput,
    );
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.triggerEl.addEventListener('click', this.onTriggerClick);
    this.clearBtn.addEventListener('click', this.onClearClick);
    document.addEventListener('pointerdown', this.onDocPointer, true);
    document.addEventListener('keydown', this.onKeyDown);
    this.syncFromAttributes();
  }

  disconnectedCallback() {
    this.triggerEl.removeEventListener('click', this.onTriggerClick);
    this.clearBtn.removeEventListener('click', this.onClearClick);
    document.removeEventListener('pointerdown', this.onDocPointer, true);
    document.removeEventListener('keydown', this.onKeyDown);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;
    this.syncFromAttributes();
  }

  private readonly onTriggerClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.hasAttribute('disabled') || this.hasAttribute('readonly')) return;
    if ((e.target as HTMLElement).closest('.clear')) return;
    this.setOpen(!this.open);
  };

  private readonly onClearClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (this.hasAttribute('disabled') || this.hasAttribute('readonly')) return;
    this.clearValue();
  };

  private readonly onDocPointer = (e: PointerEvent) => {
    if (!this.open) return;
    if (e.composedPath().includes(this)) return;
    this.setOpen(false);
  };

  private readonly onKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      this.setOpen(false);
      this.triggerEl.focus();
    }
  };

  private setOpen(next: boolean) {
    this.open = next;
    this.rootEl.dataset.open = next ? 'true' : 'false';
    this.triggerEl.setAttribute('aria-expanded', next ? 'true' : 'false');
    if (next) {
      if (this.minutes !== null) {
        this.draftHour = Math.floor(this.minutes / 60);
        this.draftMinute = this.minutes % 60;
      }
      this.renderLists();
      this.updateSummary();
      requestAnimationFrame(() => this.scrollSelectedIntoView());
    }
  }

  private pickNow() {
    const now = new Date();
    const step = resolveStep(this.getAttribute('step'));
    let total = now.getHours() * 60 + now.getMinutes();
    total = Math.round(total / step) * step;
    if (total >= 24 * 60) total = 24 * 60 - step;
    this.draftHour = Math.floor(total / 60);
    this.draftMinute = total % 60;
    this.applyValue(total, true);
  }

  private clearValue() {
    this.applyValue(null, true);
  }

  private isDisabledTime(total: number): boolean {
    const min = parseTime(this.getAttribute('min'));
    const max = parseTime(this.getAttribute('max'));
    if (min !== null && total < min) return true;
    if (max !== null && total > max) return true;
    return false;
  }

  private selectHour(hour: number) {
    const total = hour * 60 + this.draftMinute;
    if (this.isDisabledTime(total)) return;
    this.draftHour = hour;
    this.updateSummary();
    this.renderLists();
  }

  private selectMinute(minute: number) {
    const total = this.draftHour * 60 + minute;
    if (this.isDisabledTime(total)) return;
    this.draftMinute = minute;
    this.applyValue(total, true);
  }

  private applyValue(total: number | null, close: boolean) {
    this.minutes = total;
    const serialized = formatTime(total);

    if (serialized) this.setAttribute('value', serialized);
    else this.removeAttribute('value');

    this.hiddenInput.value = serialized;
    this.updateDisplay();
    this.updateSummary();
    this.renderLists();

    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-timepicker', {
        detail: { value: serialized },
        bubbles: true,
        composed: true,
      }),
    );

    if (close) this.setOpen(false);
  }

  private updateDisplay() {
    const text = formatTime(this.minutes);
    const placeholder =
      this.getAttribute('placeholder')?.trim() || 'Selecciona una hora';
    const filled = Boolean(text);
    this.rootEl.dataset.filled = filled ? 'true' : 'false';
    this.valueEl.dataset.placeholder = filled ? 'false' : 'true';
    this.valueEl.textContent = filled ? text : placeholder;
  }

  private updateSummary() {
    const draft = formatTime(this.draftHour * 60 + this.draftMinute);
    if (this.minutes !== null) {
      this.summaryEl.innerHTML = `<strong>${formatTime(this.minutes)}</strong>`;
    } else if (this.open) {
      this.summaryEl.innerHTML = `<strong>${draft}</strong><span>elige minutos</span>`;
    } else {
      this.summaryEl.innerHTML = `<span>Sin hora seleccionada</span>`;
    }
  }

  private scrollSelectedIntoView() {
    const h = this.hoursListEl.querySelector<HTMLElement>('[data-selected="true"]');
    const m = this.minutesListEl.querySelector<HTMLElement>('[data-selected="true"]');
    h?.scrollIntoView({ block: 'center' });
    m?.scrollIntoView({ block: 'center' });
  }

  private renderLists() {
    const step = resolveStep(this.getAttribute('step'));
    this.hoursListEl.replaceChildren();
    this.minutesListEl.replaceChildren();

    for (const hour of hoursList()) {
      const total = hour * 60 + this.draftMinute;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt';
      btn.textContent = String(hour).padStart(2, '0');
      btn.disabled = this.isDisabledTime(total);
      btn.dataset.selected = hour === this.draftHour ? 'true' : 'false';
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', hour === this.draftHour ? 'true' : 'false');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectHour(hour);
      });
      this.hoursListEl.appendChild(btn);
    }

    for (const minute of minutesList(step)) {
      const total = this.draftHour * 60 + minute;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt';
      btn.textContent = String(minute).padStart(2, '0');
      btn.disabled = this.isDisabledTime(total);
      btn.dataset.selected = minute === this.draftMinute ? 'true' : 'false';
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', minute === this.draftMinute ? 'true' : 'false');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectMinute(minute);
      });
      this.minutesListEl.appendChild(btn);
    }
  }

  private syncFromAttributes() {
    const variant = resolveTimepickerVariant(this.getAttribute('variant'));
    const status = resolveTimepickerStatus(this.getAttribute('status'));
    const size = resolveTimepickerSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const required = this.hasAttribute('required');
    const label = this.getAttribute('label')?.trim() || '';
    const helper = this.getAttribute('helper')?.trim() || '';
    const clearable = variant === 'clearable' || variant === 'complete';

    this.minutes = parseTime(this.getAttribute('value'));
    if (this.minutes !== null) {
      this.draftHour = Math.floor(this.minutes / 60);
      this.draftMinute = this.minutes % 60;
    }

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';
    this.rootEl.dataset.readonly = readonly ? 'true' : 'false';
    this.rootEl.dataset.clearable = clearable ? 'true' : 'false';
    this.rootEl.dataset.open = this.open ? 'true' : 'false';

    this.triggerEl.id = this.fieldId;
    this.triggerEl.disabled = disabled;
    this.labelEl.htmlFor = this.fieldId;

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
    this.floatLabelEl.textContent = label || 'Hora';

    const pill = statusPill(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.headEl.hidden = !showLabel && !pill;

    const showHelper =
      Boolean(helper) ||
      variant === 'helper' ||
      variant === 'complete' ||
      status !== 'default';
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent =
      helper ||
      (status === 'error'
        ? 'Selecciona una hora valida'
        : status === 'success'
          ? 'Hora confirmada'
          : status === 'warning'
            ? 'Revisa el horario'
            : '');

    this.hiddenInput.name = this.getAttribute('name') || '';
    this.hiddenInput.value = formatTime(this.minutes);
    this.hiddenInput.required = required;
    this.hiddenInput.disabled = disabled;

    this.updateDisplay();
    this.updateSummary();
    if (this.open) this.renderLists();
  }
}

defineCustomElement('gob-timepicker', GobTimepickerElement);

export {};
