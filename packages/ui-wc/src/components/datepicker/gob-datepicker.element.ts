import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  DATEPICKER_OBSERVED_ATTRIBUTES,
  MONTHS_ES,
  WEEKDAYS_ES,
  formatDisplay,
  isAfterDay,
  isBeforeDay,
  parseISODate,
  parseValueAttr,
  resolveDatepickerMode,
  resolveDatepickerSize,
  resolveDatepickerStatus,
  resolveDatepickerVariant,
  sameDay,
  serializeValue,
  toISODate,
  type DatepickerMode,
} from './datepicker-constants';
import { datepickerStyles } from './datepicker-styles';

const ICONS = {
  calendar: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  chevronL: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 6.5L9 12l5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronR: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.5 6.5L15 12l-5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
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

class GobDatepickerElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...DATEPICKER_OBSERVED_ATTRIBUTES];
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
  private readonly calTitleEl: HTMLElement;
  private readonly calYearEl: HTMLElement;
  private readonly daysEl: HTMLElement;
  private readonly helperEl: HTMLParagraphElement;
  private readonly hiddenInput: HTMLInputElement;

  private open = false;
  private viewYear = new Date().getFullYear();
  private viewMonth = new Date().getMonth();
  private start: Date | null = null;
  private end: Date | null = null;
  private rangePickingEnd = false;
  private fieldId = `gob-dp-${Math.random().toString(36).slice(2, 9)}`;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = datepickerStyles;

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
    this.leadEl.innerHTML = ICONS.calendar;
    this.leadEl.setAttribute('aria-hidden', 'true');

    this.valueEl = document.createElement('span');
    this.valueEl.className = 'value';

    this.clearBtn = document.createElement('button');
    this.clearBtn.type = 'button';
    this.clearBtn.className = 'icon-btn clear';
    this.clearBtn.setAttribute('aria-label', 'Limpiar fecha');
    this.clearBtn.innerHTML = ICONS.x;
    this.clearBtn.tabIndex = -1;

    this.trailEl = document.createElement('span');
    this.trailEl.className = 'trail';
    this.trailEl.setAttribute('aria-hidden', 'true');
    this.trailEl.innerHTML = ICONS.chevronR;

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
    this.panelEl.setAttribute('aria-label', 'Calendario');

    const accent = document.createElement('div');
    accent.className = 'panel-accent';
    accent.setAttribute('aria-hidden', 'true');

    this.summaryEl = document.createElement('div');
    this.summaryEl.className = 'summary';

    const calHead = document.createElement('div');
    calHead.className = 'cal-head';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'nav-btn';
    prevBtn.setAttribute('aria-label', 'Mes anterior');
    prevBtn.innerHTML = ICONS.chevronL;
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.shiftMonth(-1);
    });

    const titleWrap = document.createElement('div');
    titleWrap.className = 'cal-title-wrap';

    this.calTitleEl = document.createElement('p');
    this.calTitleEl.className = 'cal-title';

    this.calYearEl = document.createElement('span');
    this.calYearEl.className = 'cal-year';

    titleWrap.append(this.calTitleEl, this.calYearEl);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'nav-btn';
    nextBtn.setAttribute('aria-label', 'Mes siguiente');
    nextBtn.innerHTML = ICONS.chevronR;
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.shiftMonth(1);
    });

    calHead.append(prevBtn, titleWrap, nextBtn);

    const weekdays = document.createElement('div');
    weekdays.className = 'weekdays';
    for (const day of WEEKDAYS_ES) {
      const el = document.createElement('span');
      el.className = 'weekday';
      el.textContent = day;
      weekdays.appendChild(el);
    }

    this.daysEl = document.createElement('div');
    this.daysEl.className = 'days';

    const foot = document.createElement('div');
    foot.className = 'cal-foot';

    const todayBtn = document.createElement('button');
    todayBtn.type = 'button';
    todayBtn.className = 'foot-btn foot-primary';
    todayBtn.textContent = 'Hoy';
    todayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.pickToday();
    });

    const clearFoot = document.createElement('button');
    clearFoot.type = 'button';
    clearFoot.className = 'foot-btn';
    clearFoot.textContent = 'Limpiar';
    clearFoot.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clearValue();
    });

    foot.append(todayBtn, clearFoot);
    this.panelEl.append(accent, this.summaryEl, calHead, weekdays, this.daysEl, foot);

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

  private get mode(): DatepickerMode {
    const variant = resolveDatepickerVariant(this.getAttribute('variant'));
    return resolveDatepickerMode(this.getAttribute('mode'), variant);
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
    const path = e.composedPath();
    if (path.includes(this)) return;
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
      const anchor = this.start || new Date();
      this.viewYear = anchor.getFullYear();
      this.viewMonth = anchor.getMonth();
      this.renderCalendar();
    }
  }

  private shiftMonth(delta: number) {
    const d = new Date(this.viewYear, this.viewMonth + delta, 1);
    this.viewYear = d.getFullYear();
    this.viewMonth = d.getMonth();
    this.renderCalendar();
  }

  private pickToday() {
    const today = new Date();
    if (this.mode === 'range') {
      this.start = today;
      this.end = today;
      this.rangePickingEnd = false;
    } else {
      this.start = today;
      this.end = null;
    }
    this.commitValue(true);
  }

  private clearValue() {
    this.start = null;
    this.end = null;
    this.rangePickingEnd = false;
    this.commitValue(true);
  }

  private isDisabledDay(date: Date): boolean {
    const min = parseISODate(this.getAttribute('min'));
    const max = parseISODate(this.getAttribute('max'));
    if (min && isBeforeDay(date, min)) return true;
    if (max && isAfterDay(date, max)) return true;
    return false;
  }

  private selectDay(date: Date) {
    if (this.isDisabledDay(date)) return;

    if (this.mode === 'range') {
      if (!this.rangePickingEnd || !this.start) {
        this.start = date;
        this.end = null;
        this.rangePickingEnd = true;
        this.renderCalendar();
        this.updateDisplay();
        return;
      }
      if (isBeforeDay(date, this.start)) {
        this.end = this.start;
        this.start = date;
      } else {
        this.end = date;
      }
      this.rangePickingEnd = false;
      this.commitValue(true);
      return;
    }

    this.start = date;
    this.end = null;
    this.commitValue(true);
  }

  private commitValue(close: boolean) {
    const mode = this.mode;
    const next = serializeValue(this.start, this.end, mode);
    if (this.getAttribute('value') !== next) {
      if (next) this.setAttribute('value', next);
      else this.removeAttribute('value');
    }
    this.hiddenInput.value = next;
    this.updateDisplay();
    this.renderCalendar();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-datepicker', {
        detail: {
          value: next,
          start: this.start ? toISODate(this.start) : null,
          end: this.end ? toISODate(this.end) : null,
          mode,
        },
        bubbles: true,
        composed: true,
      }),
    );
    if (close) this.setOpen(false);
  }

  private updateDisplay() {
    const mode = this.mode;
    let text = '';
    if (mode === 'range') {
      if (this.start && this.end) {
        text = `${formatDisplay(this.start)} – ${formatDisplay(this.end)}`;
      } else if (this.start) {
        text = `${formatDisplay(this.start)} – …`;
      }
    } else {
      text = formatDisplay(this.start);
    }

    const placeholder =
      this.getAttribute('placeholder')?.trim() ||
      (mode === 'range' ? 'Selecciona un rango' : 'Selecciona una fecha');

    const filled = Boolean(text);
    this.rootEl.dataset.filled = filled ? 'true' : 'false';
    this.valueEl.dataset.placeholder = filled ? 'false' : 'true';
    this.valueEl.textContent = filled ? text : placeholder;

    if (mode === 'range') {
      if (this.start && this.end) {
        this.summaryEl.innerHTML = `<strong>${formatDisplay(this.start)}</strong><span>al</span><strong>${formatDisplay(this.end)}</strong>`;
      } else if (this.start) {
        this.summaryEl.innerHTML = `<strong>${formatDisplay(this.start)}</strong><span>elige el fin</span>`;
      } else {
        this.summaryEl.innerHTML = `<span>Selecciona inicio y fin</span>`;
      }
    } else if (this.start) {
      this.summaryEl.innerHTML = `<strong>${formatDisplay(this.start)}</strong>`;
    } else {
      this.summaryEl.innerHTML = `<span>Sin fecha seleccionada</span>`;
    }
  }

  private renderCalendar() {
    this.calTitleEl.textContent = MONTHS_ES[this.viewMonth];
    this.calYearEl.textContent = String(this.viewYear);
    this.daysEl.replaceChildren();

    const first = new Date(this.viewYear, this.viewMonth, 1);
    // Monday-first: JS Sunday=0 → shift
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    const gridStart = new Date(this.viewYear, this.viewMonth, 1 - startOffset);
    const today = new Date();

    for (let i = 0; i < totalCells; i += 1) {
      const date = new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + i,
      );
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day';
      btn.textContent = String(date.getDate());
      btn.disabled = this.isDisabledDay(date);

      const outside = date.getMonth() !== this.viewMonth;
      btn.dataset.outside = outside ? 'true' : 'false';
      btn.dataset.today = sameDay(date, today) ? 'true' : 'false';

      const selected = sameDay(date, this.start) && this.mode === 'single';
      btn.dataset.selected = selected ? 'true' : 'false';

      if (this.mode === 'range' && this.start) {
        const isStart = sameDay(date, this.start);
        const isEnd = sameDay(date, this.end);
        btn.dataset.rangeStart = isStart ? 'true' : 'false';
        btn.dataset.rangeEnd = isEnd ? 'true' : 'false';
        if (this.end) {
          const t = date.getTime();
          const a = this.start.getTime();
          const b = this.end.getTime();
          btn.dataset.inRange = t > a && t < b ? 'true' : 'false';
        }
      }

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectDay(date);
      });

      this.daysEl.appendChild(btn);
    }
  }

  private syncFromAttributes() {
    const variant = resolveDatepickerVariant(this.getAttribute('variant'));
    const status = resolveDatepickerStatus(this.getAttribute('status'));
    const size = resolveDatepickerSize(this.getAttribute('size'));
    const mode = resolveDatepickerMode(this.getAttribute('mode'), variant);
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const required = this.hasAttribute('required');
    const label = this.getAttribute('label')?.trim() || '';
    const helper = this.getAttribute('helper')?.trim() || '';
    const clearable = variant === 'clearable' || variant === 'complete' || variant === 'range';

    const parsed = parseValueAttr(this.getAttribute('value'), mode);
    this.start = parsed.start;
    this.end = parsed.end;
    if (this.start && !this.end) this.rangePickingEnd = mode === 'range';
    else this.rangePickingEnd = false;

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.mode = mode;
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
    this.floatLabelEl.textContent = label || 'Fecha';

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
        ? 'Selecciona una fecha valida'
        : status === 'success'
          ? 'Fecha confirmada'
          : status === 'warning'
            ? 'Revisa el periodo'
            : '');

    this.hiddenInput.name = this.getAttribute('name') || '';
    this.hiddenInput.value = serializeValue(this.start, this.end, mode);
    this.hiddenInput.required = required;
    this.hiddenInput.disabled = disabled;

    this.updateDisplay();
    if (this.open) this.renderCalendar();
  }
}

defineCustomElement('gob-datepicker', GobDatepickerElement);

export {};
