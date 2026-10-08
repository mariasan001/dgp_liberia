import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  USER_MENU_OBSERVED_ATTRIBUTES,
  buildUserInitials,
  resolveUserMenuVariant,
} from './user-menu-constants';
import { userMenuStyles } from './user-menu-styles';

const CARET = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const MENU_ITEMS: Array<{ label: string; danger?: boolean; dividerBefore?: boolean }> = [
  { label: 'Mi perfil' },
  { label: 'Preferencias' },
  { label: 'Notificaciones' },
  { label: 'Cerrar sesion', danger: true, dividerBefore: true },
];

class GobUserMenuElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...USER_MENU_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly triggerEl: HTMLButtonElement;
  private readonly avatarEl: HTMLElement;
  private readonly nameEl: HTMLElement;
  private readonly roleEl: HTMLElement;
  private readonly profileNameEl: HTMLElement;
  private readonly profileEmailEl: HTMLElement;
  private readonly menuEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = userMenuStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.triggerEl = document.createElement('button');
    this.triggerEl.type = 'button';
    this.triggerEl.className = 'trigger';
    this.triggerEl.setAttribute('part', 'trigger');
    this.triggerEl.setAttribute('aria-haspopup', 'menu');

    this.avatarEl = document.createElement('span');
    this.avatarEl.className = 'avatar';
    this.avatarEl.setAttribute('aria-hidden', 'true');

    const copy = document.createElement('span');
    copy.className = 'copy';
    this.nameEl = document.createElement('span');
    this.nameEl.className = 'name';
    this.roleEl = document.createElement('span');
    this.roleEl.className = 'role';
    copy.append(this.nameEl, this.roleEl);

    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.innerHTML = CARET;

    this.triggerEl.append(this.avatarEl, copy, caret);

    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.setAttribute('part', 'panel');
    panel.setAttribute('role', 'menu');

    const profile = document.createElement('div');
    profile.className = 'profile';
    this.profileNameEl = document.createElement('p');
    this.profileNameEl.className = 'profile-name';
    this.profileEmailEl = document.createElement('p');
    this.profileEmailEl.className = 'profile-email';
    profile.append(this.profileNameEl, this.profileEmailEl);

    this.menuEl = document.createElement('div');
    this.menuEl.className = 'menu';
    for (const item of MENU_ITEMS) {
      if (item.dividerBefore) {
        const divider = document.createElement('div');
        divider.className = 'divider';
        this.menuEl.appendChild(divider);
      }
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'item';
      row.setAttribute('role', 'menuitem');
      if (item.danger) row.dataset.danger = 'true';
      row.textContent = item.label;
      row.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('gob-user-menu', {
            detail: { action: item.label },
            bubbles: true,
            composed: true,
          }),
        );
        this.removeAttribute('open');
      });
      this.menuEl.appendChild(row);
    }

    panel.append(profile, this.menuEl);
    this.rootEl.append(this.triggerEl, panel);
    shadow.append(style, this.rootEl);

    this.triggerEl.addEventListener('click', () => {
      if (this.hasAttribute('open')) this.removeAttribute('open');
      else this.setAttribute('open', '');
      this.dispatchEvent(
        new CustomEvent('gob-user-menu', {
          detail: { open: this.hasAttribute('open') },
          bubbles: true,
          composed: true,
        }),
      );
    });
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveUserMenuVariant(this.getAttribute('variant'));
    const name = this.getAttribute('name')?.trim() || 'Ana Morales';
    const role = this.getAttribute('role')?.trim() || 'Operadora';
    const email =
      this.getAttribute('email')?.trim() || 'ana.morales@gob.mx';
    const initials = buildUserInitials(name, this.getAttribute('initials'));
    const open = this.hasAttribute('open');

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.open = open ? 'true' : 'false';
    this.triggerEl.setAttribute('aria-expanded', open ? 'true' : 'false');
    this.avatarEl.textContent = initials;
    this.nameEl.textContent = name;
    this.roleEl.textContent = role;
    this.profileNameEl.textContent = name;
    this.profileEmailEl.textContent = email;
  }
}

defineCustomElement('gob-user-menu', GobUserMenuElement);
export {};
