import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import { APP_SHELL_OBSERVED_ATTRIBUTES } from './app-shell-constants';
import { appShellStyles } from './app-shell-styles';

class GobAppShellElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...APP_SHELL_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLDivElement;
  private readonly topbarEl: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = appShellStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';

    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.setAttribute('part', 'sidebar');
    const sidebarSlot = document.createElement('slot');
    sidebarSlot.name = 'sidebar';
    sidebar.appendChild(sidebarSlot);

    const column = document.createElement('div');
    column.className = 'column';

    this.topbarEl = document.createElement('header');
    this.topbarEl.className = 'topbar';
    this.topbarEl.setAttribute('part', 'topbar');
    const topbarSlot = document.createElement('slot');
    topbarSlot.name = 'topbar';
    this.topbarEl.appendChild(topbarSlot);

    const content = document.createElement('main');
    content.className = 'content';
    content.setAttribute('part', 'content');
    content.appendChild(document.createElement('slot'));

    column.append(this.topbarEl, content);
    this.rootEl.append(sidebar, column);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncState();
  }

  attributeChangedCallback() {
    this.syncState();
  }

  private syncState() {
    const collapsed = this.hasAttribute('collapsed');
    const dense = this.hasAttribute('dense');
    const hideTopbar = this.hasAttribute('hide-topbar');
    const sticky = this.getAttribute('sticky-topbar') !== 'false';

    this.rootEl.dataset.collapsed = collapsed ? 'true' : 'false';
    this.rootEl.dataset.dense = dense ? 'true' : 'false';
    this.rootEl.dataset.hideTopbar = hideTopbar ? 'true' : 'false';
    this.topbarEl.dataset.sticky = sticky ? 'true' : 'false';
  }
}

defineCustomElement('gob-app-shell', GobAppShellElement);
