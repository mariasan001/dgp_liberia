import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  PAGINATION_BAR_ICONS,
  PAGINATION_BAR_OBSERVED_ATTRIBUTES,
  resolvePaginationBarSize,
  resolvePaginationBarVariant,
  toPositiveInt,
} from './pagination-bar-constants';
import { paginationBarStyles } from './pagination-bar-styles';

class GobPaginationBarElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...PAGINATION_BAR_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly summaryEl: HTMLElement;
  private readonly titleEl: HTMLElement;
  private readonly metaEl: HTMLElement;
  private readonly controlsEl: HTMLElement;
  private readonly pagesEl: HTMLElement;
  private readonly prevBtn: HTMLButtonElement;
  private readonly nextBtn: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = paginationBarStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.summaryEl = document.createElement('div');
    this.summaryEl.className = 'summary';
    this.summaryEl.setAttribute('part', 'summary');

    this.titleEl = document.createElement('p');
    this.titleEl.className = 'title';
    this.metaEl = document.createElement('p');
    this.metaEl.className = 'meta';
    this.summaryEl.append(this.titleEl, this.metaEl);

    this.controlsEl = document.createElement('div');
    this.controlsEl.className = 'controls';
    this.controlsEl.setAttribute('part', 'controls');

    this.prevBtn = document.createElement('button');
    this.prevBtn.type = 'button';
    this.prevBtn.className = 'btn';
    this.prevBtn.setAttribute('aria-label', 'Pagina anterior');
    this.prevBtn.innerHTML = `<span class="icon">${PAGINATION_BAR_ICONS.prev}</span>`;

    this.nextBtn = document.createElement('button');
    this.nextBtn.type = 'button';
    this.nextBtn.className = 'btn';
    this.nextBtn.setAttribute('aria-label', 'Pagina siguiente');
    this.nextBtn.innerHTML = `<span class="icon">${PAGINATION_BAR_ICONS.next}</span>`;

    this.pagesEl = document.createElement('div');
    this.pagesEl.className = 'pages';

    this.controlsEl.append(this.prevBtn, this.pagesEl, this.nextBtn);
    this.rootEl.append(this.summaryEl, this.controlsEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.prevBtn.addEventListener('click', this.onPrev);
    this.nextBtn.addEventListener('click', this.onNext);
    this.syncFromAttributes();
  }

  disconnectedCallback() {
    this.prevBtn.removeEventListener('click', this.onPrev);
    this.nextBtn.removeEventListener('click', this.onNext);
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private readonly onPrev = () => {
    const page = toPositiveInt(this.getAttribute('page'), 1);
    if (page <= 1) return;
    this.setPage(page - 1);
  };

  private readonly onNext = () => {
    const page = toPositiveInt(this.getAttribute('page'), 1);
    const total = toPositiveInt(this.getAttribute('total'), 1);
    const pageSize = toPositiveInt(this.getAttribute('page-size'), 10);
    const pages = Math.max(1, Math.ceil(total / pageSize));
    if (page >= pages) return;
    this.setPage(page + 1);
  };

  private setPage(page: number) {
    this.setAttribute('page', String(page));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('gob-pagination-bar', {
        detail: { page },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private syncFromAttributes() {
    const variant = resolvePaginationBarVariant(this.getAttribute('variant'));
    const size = resolvePaginationBarSize(this.getAttribute('size'));
    const disabled = this.hasAttribute('disabled');
    const page = toPositiveInt(this.getAttribute('page'), 1);
    const total = toPositiveInt(this.getAttribute('total'), 48);
    const pageSize = toPositiveInt(this.getAttribute('page-size'), 10);
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const current = Math.min(page, pages);
    const start = (current - 1) * pageSize + 1;
    const end = Math.min(current * pageSize, total);
    const summary =
      this.getAttribute('summary')?.trim() || 'Resultados de la consulta';

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? 'true' : 'false';

    this.titleEl.textContent = summary;
    this.metaEl.textContent = `Mostrando ${start}-${end} de ${total} · Pagina ${current} de ${pages}`;

    this.prevBtn.disabled = disabled || current <= 1;
    this.nextBtn.disabled = disabled || current >= pages;

    this.pagesEl.replaceChildren();
    const maxButtons =
      variant === 'compact' || variant === 'dense' ? 3 : variant === 'detailed' ? 7 : 5;
    let from = Math.max(1, current - Math.floor(maxButtons / 2));
    let to = Math.min(pages, from + maxButtons - 1);
    from = Math.max(1, to - maxButtons + 1);

    for (let i = from; i <= to; i += 1) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn';
      btn.textContent = String(i);
      btn.dataset.active = i === current ? 'true' : 'false';
      btn.disabled = disabled;
      btn.addEventListener('click', () => {
        if (i !== current) this.setPage(i);
      });
      this.pagesEl.appendChild(btn);
    }
  }
}

defineCustomElement('gob-pagination-bar', GobPaginationBarElement);
export {};
