import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  LABELS,
  buildPageItems,
  parsePositiveInt,
  resolveLang,
  resolveSize,
  resolveTone,
  resolveVariant,
  type PageItem,
  type PaginationLang,
  PAGINATION_OBSERVED_ATTRIBUTES,
} from './pagination-constants';
import { paginationStyles } from './pagination-styles';

const CHEVRON_LEFT = `<svg class="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3.5L5.5 8L10 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHEVRON_RIGHT = `<svg class="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHEVRONS_LEFT = `<svg class="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8.5 3.5L4 8L8.5 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 3.5L7.5 8L12 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHEVRONS_RIGHT = `<svg class="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M7.5 3.5L12 8L7.5 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 3.5L8.5 8L4 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

class GobPaginationElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...PAGINATION_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly navEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = paginationStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';

    this.navEl = document.createElement('nav');
    this.rootEl.appendChild(this.navEl);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.navEl.addEventListener('click', this.handleClick);
    this.navEl.addEventListener('keydown', this.handleKeydown);
    this.render();
  }

  disconnectedCallback() {
    this.navEl.removeEventListener('click', this.handleClick);
    this.navEl.removeEventListener('keydown', this.handleKeydown);
  }

  attributeChangedCallback() {
    this.render();
  }

  get page(): number {
    return Math.min(parsePositiveInt(this.getAttribute('page'), 1), this.total);
  }

  set page(value: number | string) {
    const next = String(value);
    if (this.getAttribute('page') === next) {
      return;
    }
    this.setAttribute('page', next);
  }

  get total(): number {
    return parsePositiveInt(this.getAttribute('total'), 1);
  }

  set total(value: number | string) {
    const next = String(value);
    if (this.getAttribute('total') === next) {
      return;
    }
    this.setAttribute('total', next);
  }

  get variant(): string {
    return resolveVariant(this.getAttribute('variant'));
  }

  set variant(value: string) {
    const next = String(value);
    if (this.getAttribute('variant') === next) {
      return;
    }
    this.setAttribute('variant', next);
  }

  get tone(): string {
    return resolveTone(this.getAttribute('tone'));
  }

  set tone(value: string) {
    const next = String(value);
    if (this.getAttribute('tone') === next) {
      return;
    }
    this.setAttribute('tone', next);
  }

  get lang(): PaginationLang {
    return resolveLang(this.getAttribute('lang'));
  }

  set lang(value: string) {
    const next = String(value);
    if (this.getAttribute('lang') === next) {
      return;
    }
    this.setAttribute('lang', next);
  }

  private get currentLang(): PaginationLang {
    return this.lang;
  }

  private readonly handleClick = (event: Event) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest('[data-page]') as HTMLElement | null;
    if (!button || button.hasAttribute('disabled') || this.hasAttribute('disabled')) {
      return;
    }

    const next = Number.parseInt(button.dataset.page || '', 10);
    if (!Number.isFinite(next) || next < 1 || next > this.total || next === this.page) {
      return;
    }

    this.setAttribute('page', String(next));
    this.dispatchEvent(
      new CustomEvent('gob-page-change', {
        bubbles: true,
        composed: true,
        detail: { page: next },
      }),
    );
  };

  private readonly handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }

    const input = event.target as HTMLInputElement | null;
    if (!input || input.tagName !== 'INPUT') {
      return;
    }

    event.preventDefault();
    const next = Number.parseInt(input.value || '', 10);
    if (!Number.isFinite(next) || next < 1 || next > this.total || next === this.page) {
      input.value = String(this.page);
      return;
    }

    this.setAttribute('page', String(next));
    this.dispatchEvent(
      new CustomEvent('gob-page-change', {
        bubbles: true,
        composed: true,
        detail: { page: next },
      }),
    );
  };

  private createNavButton(opts: {
    page: number;
    label: string;
    icon?: string;
    disabled?: boolean;
    iconOnly?: boolean;
  }) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'navBtn';
    button.dataset.page = String(opts.page);
    button.setAttribute('aria-label', opts.label);
    if (opts.disabled) {
      button.disabled = true;
    }

    if (opts.icon) {
      button.innerHTML = opts.icon;
      if (!opts.iconOnly) {
        const text = document.createElement('span');
        text.textContent = opts.label;
        button.appendChild(text);
      }
    } else {
      button.textContent = opts.label;
    }

    return button;
  }

  private createPageButton(page: number, current: number) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'item';
    button.dataset.page = String(page);
    button.textContent = String(page);
    button.setAttribute('aria-label', `${LABELS[this.currentLang].goTo} ${page}`);
    if (page === current) {
      button.setAttribute('aria-current', 'page');
    }
    return button;
  }

  private createEllipsis() {
    const span = document.createElement('span');
    span.className = 'ellipsis';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = '…';
    return span;
  }

  private createMeta(text: string) {
    const span = document.createElement('span');
    span.className = 'meta';
    span.textContent = text;
    return span;
  }

  private appendPageItems(items: PageItem[], current: number, into: HTMLElement = this.navEl) {
    for (const item of items) {
      if (item === 'ellipsis') {
        into.appendChild(this.createEllipsis());
      } else {
        into.appendChild(this.createPageButton(item, current));
      }
    }
  }

  private render() {
    const page = this.page;
    const total = this.total;
    const variant = resolveVariant(this.getAttribute('variant'));
    const tone = resolveTone(this.getAttribute('tone'));
    const size = resolveSize(this.getAttribute('size'));
    const lang = this.currentLang;
    const labels = LABELS[lang];
    const siblingCount = parsePositiveInt(this.getAttribute('sibling-count'), 1);
    const boundaryCount = parsePositiveInt(this.getAttribute('boundary-count'), 1);
    const disabled = this.hasAttribute('disabled');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.size = size;

    const ariaLabel = this.getAttribute('aria-label') || labels.nav;
    this.navEl.setAttribute('aria-label', ariaLabel);
    this.navEl.replaceChildren();

    const atStart = page <= 1;
    const atEnd = page >= total;

    if (variant === 'icons') {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled,
        }),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled,
        }),
      );
      return;
    }

    if (variant === 'simple') {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          disabled: atStart || disabled,
        }),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          disabled: atEnd || disabled,
        }),
      );
      return;
    }

    if (variant === 'summary') {
      const pageSize = parsePositiveInt(this.getAttribute('page-size'), 10);
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled,
        }),
        this.createMeta(labels.summary(page, total, pageSize)),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled,
        }),
      );
      return;
    }

    if (variant === 'compact') {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled,
        }),
        this.createMeta(labels.pageOf(page, total)),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled,
        }),
      );
      return;
    }

    if (variant === 'text') {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          disabled: atStart || disabled,
        }),
        this.createMeta(`${page} / ${total}`),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          disabled: atEnd || disabled,
        }),
      );
      return;
    }

    if (variant === 'jump') {
      const input = document.createElement('input');
      input.className = 'jumpInput';
      input.type = 'number';
      input.min = '1';
      input.max = String(total);
      input.value = String(page);
      input.setAttribute('aria-label', labels.goTo);
      if (disabled) {
        input.disabled = true;
      }

      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled,
        }),
        input,
        this.createMeta(`${labels.of} ${total}`),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled,
        }),
      );
      return;
    }

    if (variant === 'edges') {
      this.navEl.append(
        this.createNavButton({
          page: 1,
          label: labels.first,
          icon: CHEVRONS_LEFT,
          iconOnly: true,
          disabled: atStart || disabled,
        }),
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled,
        }),
      );
      this.appendPageItems(buildPageItems(page, total, siblingCount, boundaryCount, true), page);
      this.navEl.append(
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled,
        }),
        this.createNavButton({
          page: total,
          label: labels.last,
          icon: CHEVRONS_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled,
        }),
      );
      return;
    }

    if (variant === 'arrows' || variant === 'ellipsis' || variant === 'outline' || variant === 'pills' || variant === 'group') {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled,
        }),
      );

      if (variant === 'group') {
        const track = document.createElement('span');
        track.className = 'groupTrack';
        this.appendPageItems(
          buildPageItems(page, total, siblingCount, boundaryCount, true),
          page,
          track,
        );
        this.navEl.appendChild(track);
      } else {
        this.appendPageItems(
          buildPageItems(page, total, siblingCount, boundaryCount, variant === 'ellipsis' || total > 7),
          page,
        );
      }

      this.navEl.append(
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled,
        }),
      );
      return;
    }

    // basic — numbers only
    this.appendPageItems(buildPageItems(page, total, siblingCount, boundaryCount, false), page);
  }
}

defineCustomElement('gob-pagination', GobPaginationElement);

export {};
