import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  STEPS_OBSERVED_ATTRIBUTES,
  parseStepsItems,
  resolveStepsIcon,
  resolveStepsSize,
  resolveStepsVariant,
  type StepsItem,
} from './steps-constants';
import { stepsStyles } from './steps-styles';

class GobStepsElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...STEPS_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly listEl: HTMLElement;
  private readonly barEl: HTMLElement;
  private readonly barFill: HTMLElement;
  private readonly panelEl: HTMLElement;
  private items: StepsItem[] = [];
  private selectedId = '';

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = stepsStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.listEl = document.createElement('div');
    this.listEl.className = 'list';
    this.listEl.setAttribute('role', 'list');
    this.listEl.setAttribute('part', 'list');

    this.barEl = document.createElement('div');
    this.barEl.className = 'bar';
    this.barEl.setAttribute('part', 'bar');
    this.barFill = document.createElement('i');
    this.barEl.appendChild(this.barFill);

    this.panelEl = document.createElement('div');
    this.panelEl.className = 'panel';
    this.panelEl.setAttribute('part', 'panel');

    this.rootEl.append(this.listEl, this.barEl, this.panelEl);
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
    const variant = resolveStepsVariant(this.getAttribute('variant'));
    const size = resolveStepsSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    this.items = parseStepsItems(this.getAttribute('items'));

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

    this.render();
  }

  private render() {
    const currentIndex = Math.max(
      0,
      this.items.findIndex((item) => item.id === this.selectedId),
    );
    const variant = this.rootEl.dataset.variant || 'basic';
    const showNumbers =
      variant !== 'dots' &&
      (variant === 'numbered' ||
        variant === 'basic' ||
        variant === 'compact' ||
        variant === 'soft' ||
        variant === 'outlined' ||
        variant === 'labeled' ||
        variant === 'progress' ||
        variant === 'complete' ||
        variant === 'vertical');

    this.listEl.replaceChildren();
    this.items.forEach((item, index) => {
      const state =
        index < currentIndex ? 'done' : index === currentIndex ? 'current' : 'todo';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'step';
      btn.dataset.state = state;
      btn.setAttribute('role', 'listitem');
      btn.disabled = Boolean(item.disabled) || this.hasAttribute('disabled');

      const markerWrap = document.createElement('div');
      markerWrap.className = 'marker-wrap';
      const marker = document.createElement('span');
      marker.className = 'marker';

      if (state === 'done') {
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.innerHTML = resolveStepsIcon('check') || '';
        marker.appendChild(icon);
      } else if (item.icon && resolveStepsIcon(item.icon) && variant !== 'dots') {
        const icon = document.createElement('span');
        icon.className = 'icon';
        icon.innerHTML = resolveStepsIcon(item.icon) || '';
        marker.appendChild(icon);
      } else if (showNumbers) {
        const num = document.createElement('span');
        num.className = 'num';
        num.textContent = String(index + 1);
        marker.appendChild(num);
      }

      markerWrap.appendChild(marker);

      const copy = document.createElement('div');
      copy.className = 'copy';
      const label = document.createElement('p');
      label.className = 'label';
      label.textContent = item.label;
      const desc = document.createElement('p');
      desc.className = 'desc';
      desc.textContent = item.description || '';
      if (!item.description) desc.hidden = true;
      copy.append(label, desc);

      btn.append(markerWrap, copy);
      btn.addEventListener('click', () => this.selectStep(item.id));
      this.listEl.appendChild(btn);
    });

    const pct =
      this.items.length <= 1
        ? 100
        : Math.round((currentIndex / (this.items.length - 1)) * 100);
    this.barFill.style.width = `${pct}%`;

    const current = this.items[currentIndex];
    this.panelEl.textContent = current
      ? `Paso actual: ${current.label}${
          current.description ? ` — ${current.description}` : ''
        }`
      : 'Sin pasos';
  }

  private selectStep(id: string) {
    const item = this.items.find((row) => row.id === id);
    if (!item || item.disabled || this.hasAttribute('disabled')) return;
    if (this.selectedId === id) return;
    this.selectedId = id;
    if (this.getAttribute('value') !== id) this.setAttribute('value', id);
    else this.render();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-steps', {
        detail: { value: id, item },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

defineCustomElement('gob-steps', GobStepsElement);
export {};
