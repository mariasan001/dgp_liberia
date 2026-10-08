import { defineCustomElement } from '../../lib/define-custom-element';
import { SafeHTMLElement } from '../../lib/safe-html-element';
import {
  AVATAR_OBSERVED_ATTRIBUTES,
  buildInitials,
  resolveAvatarSize,
  resolveAvatarTone,
  resolveAvatarVariant,
} from './avatar-constants';
import { avatarStyles } from './avatar-styles';

class GobAvatarElement extends SafeHTMLElement {
  static get observedAttributes() {
    return [...AVATAR_OBSERVED_ATTRIBUTES];
  }

  private readonly rootEl: HTMLElement;
  private readonly faceEl: HTMLElement;
  private readonly stackEl: HTMLElement;
  private readonly nameEl: HTMLElement;
  private readonly roleEl: HTMLElement;
  private readonly dotEl: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = avatarStyles;

    this.rootEl = document.createElement('div');
    this.rootEl.className = 'root';
    this.rootEl.setAttribute('part', 'root');

    this.faceEl = document.createElement('span');
    this.faceEl.className = 'face';
    this.faceEl.setAttribute('part', 'face');

    this.dotEl = document.createElement('i');
    this.dotEl.className = 'dot';
    this.dotEl.setAttribute('aria-hidden', 'true');
    this.faceEl.appendChild(this.dotEl);

    this.stackEl = document.createElement('div');
    this.stackEl.className = 'stack';
    this.stackEl.setAttribute('aria-hidden', 'true');
    for (const text of ['AM', 'LR', 'JG']) {
      const face = document.createElement('span');
      face.className = 'face';
      face.textContent = text;
      this.stackEl.appendChild(face);
    }

    const label = document.createElement('div');
    label.className = 'label';

    this.nameEl = document.createElement('p');
    this.nameEl.className = 'name';

    this.roleEl = document.createElement('p');
    this.roleEl.className = 'role';
    this.roleEl.textContent = 'Operador';

    label.append(this.nameEl, this.roleEl);
    this.rootEl.append(this.faceEl, this.stackEl, label);
    shadow.append(style, this.rootEl);
  }

  connectedCallback() {
    this.syncFromAttributes();
  }

  attributeChangedCallback() {
    this.syncFromAttributes();
  }

  private syncFromAttributes() {
    const variant = resolveAvatarVariant(this.getAttribute('variant'));
    const size = resolveAvatarSize(this.getAttribute('size'));
    const tone = resolveAvatarTone(this.getAttribute('tone'));
    const name = this.getAttribute('name')?.trim() || 'Ana Morales';
    const initials = buildInitials(name, this.getAttribute('initials'));
    const status = this.getAttribute('status')?.trim() || 'online';
    const showLabel = Boolean(this.getAttribute('name')?.trim());

    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.hasLabel = showLabel ? 'true' : 'false';

    // Keep only initials text; preserve status dot child.
    const textNode = Array.from(this.faceEl.childNodes).find(
      (node) => node.nodeType === Node.TEXT_NODE,
    );
    if (textNode) textNode.textContent = initials;
    else this.faceEl.insertBefore(document.createTextNode(initials), this.dotEl);

    this.faceEl.setAttribute('aria-label', name);
    this.nameEl.textContent = name;
  }
}

defineCustomElement('gob-avatar', GobAvatarElement);
export {};
