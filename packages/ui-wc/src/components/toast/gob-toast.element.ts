import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  TOAST_ICONS,
  TOAST_OBSERVED_ATTRIBUTES,
  resolveToastTone,
  resolveToastVariant,
} from './toast-constants';
import { toastStyles } from './toast-styles';

const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;

class GobToastElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...TOAST_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly iconEl: HTMLElement;
  private readonly bodyEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly descEl: HTMLElement;
  private readonly actionsEl: HTMLElement;
  private readonly actionBtn: HTMLButtonElement;
  private readonly dismissBtn: HTMLButtonElement;
  private readonly progressEl: HTMLElement;
  private readonly progressBar: HTMLElement;
  private timer: number | null = null;
  private closed = false;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = toastStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');
    this.rootEl.setAttribute('role', 'status');

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'icon';
    this.iconEl.setAttribute('aria-hidden', 'true');

    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'body';

    this.titleEl = document.createElement('p');
    this.titleEl.className = 'title';

    this.descEl = document.createElement('p');
    this.descEl.className = 'description';

    this.bodyEl.append(this.titleEl, this.descEl);

    this.actionsEl = document.createElement('div');
    this.actionsEl.className = 'actions';

    this.actionBtn = document.createElement('button');
    this.actionBtn.type = 'button';
    this.actionBtn.className = 'action';

    this.dismissBtn = document.createElement('button');
    this.dismissBtn.type = 'button';
    this.dismissBtn.className = 'dismiss';
    this.dismissBtn.setAttribute('aria-label', 'Cerrar');
    this.dismissBtn.innerHTML = CLOSE_SVG;

    this.actionsEl.append(this.actionBtn, this.dismissBtn);

    this.progressEl = document.createElement('div');
    this.progressEl.className = 'progress';
    this.progressEl.setAttribute('aria-hidden', 'true');
    this.progressBar = document.createElement('i');
    this.progressEl.appendChild(this.progressBar);

    this.rootEl.append(this.iconEl, this.bodyEl, this.actionsEl, this.progressEl);
    shadow.append(style, this.rootEl);

    this.actionBtn.addEventListener('click', () => this.emit('action'));
    this.dismissBtn.addEventListener('click', () => {
      this.close();
      this.emit('dismiss');
    });
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  disconnectedCallback() {
    this.clearTimer();
  }

  attributeChangedCallback(name: string) {
    if (name === 'open' && this.hasAttribute('open')) {
      this.closed = false;
    }
    this.syncFromAttributes();
  }

  private emit(action: string) {
    this.dispatchEvent(
      new CustomEvent('gob-toast', {
        detail: { action },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private close() {
    this.closed = true;
    this.removeAttribute('open');
    this.rootEl.dataset.open = 'false';
    this.clearTimer();
  }

  private clearTimer() {
    if (this.timer != null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private syncFromAttributes() {
    const variant = resolveToastVariant(this.getAttribute('variant'));
    const tone = resolveToastTone(this.getAttribute('tone'));
    const title = this.getAttribute('title')?.trim() || 'Aviso';
    const description = this.getAttribute('description')?.trim() || '';
    const action = this.getAttribute('action')?.trim() || '';
    const dismissible =
      this.hasAttribute('dismissible') ||
      variant === 'action' ||
      variant === 'basic' ||
      variant === 'complete' ||
      variant === 'progress';
    const durationRaw = Number(this.getAttribute('duration') || '0');
    const duration = Number.isFinite(durationRaw) ? Math.max(0, durationRaw) : 0;
    const isOpen = !this.closed;

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.open = isOpen ? 'true' : 'false';

    this.iconEl.innerHTML = TOAST_ICONS[tone];
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.descEl.hidden = !description;

    const showAction = Boolean(action) || variant === 'action';
    this.actionBtn.hidden = !showAction;
    this.actionBtn.textContent = action || 'Deshacer';
    this.dismissBtn.hidden = !dismissible;

    this.clearTimer();
    const barMs = duration > 0 ? duration : 4000;
    this.progressBar.style.animationDuration = `${barMs}ms`;

    if (
      isOpen &&
      duration > 0 &&
      (variant === 'progress' || variant === 'complete') &&
      this.isConnected
    ) {
      this.timer = window.setTimeout(() => {
        this.close();
        this.emit('timeout');
      }, duration);
    }
  }
}

defineCustomElement('gob-toast', GobToastElement);
export {};
