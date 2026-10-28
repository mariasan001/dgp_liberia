var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/lib/define-custom-element.ts
function defineCustomElement(tagName, elementClass) {
  const canUseDom = typeof window !== "undefined" && typeof customElements !== "undefined" && typeof HTMLElement !== "undefined";
  if (!canUseDom || customElements.get(tagName)) {
    return;
  }
  customElements.define(tagName, elementClass);
}

// src/lib/safe-html-element.ts
var SafeHTMLElement = typeof HTMLElement !== "undefined" ? HTMLElement : class {
  // Placeholder for SSR module evaluation only.
};

// src/components/button/button-constants.ts
var BUTTON_ARIA_ATTRIBUTES = ["aria-label", "aria-labelledby"];
var BUTTON_OBSERVED_ATTRIBUTES = [
  "tone",
  "appearance",
  "size",
  "loading",
  "disabled",
  "type",
  "name",
  "value",
  "icon-only",
  "icon-position",
  "demo-state",
  ...BUTTON_ARIA_ATTRIBUTES
];
function resolveButtonType(type) {
  return type === "submit" || type === "reset" || type === "button" ? type : "button";
}

// src/components/button/button-styles.ts
var buttonStyles = `
:host{
  display:inline-block;
  flex-shrink:0;
  vertical-align:middle;
}

button.main{
  appearance:none;
  box-sizing:border-box;
  border:1.5px solid transparent;
  border-radius:10px;
  height:40px;
  min-height:40px;
  padding:0 36px;
  font-family:var(--gob-font-sans, Raleway, sans-serif);
  font-size:14px;
  font-weight:600;
  letter-spacing:0;
  line-height:1;
  cursor:pointer;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:0;
  width:max-content;
  max-width:none;
  flex-shrink:0;
  transition: background .12s ease, border-color .12s ease, color .12s ease;
  user-select:none;
  background:var(--btn-bg, transparent);
  color:var(--btn-fg, #181511);
  border-color:var(--btn-border, transparent);
  overflow:visible;
}

button.main:focus-visible{outline:none; box-shadow:var(--gob-focus)}
button.main:disabled{cursor:not-allowed}

.content{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:6px;
  min-width:0;
  height:100%;
}

.icon{
  display:none;
  align-items:center;
  justify-content:center;
  line-height:0;
  width:16px;
  height:16px;
  flex:0 0 auto;
  overflow:hidden;
}

button.main[data-has-icon="true"] .icon{display:inline-flex}
button.main[aria-busy="true"] .icon{display:none !important}

.label{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  height:16px;
  line-height:16px;
  font-size:inherit;
  font-weight:inherit;
}

slot[name="icon"]::slotted(*){
  display:block;
  width:16px;
  height:16px;
  max-width:16px;
  max-height:16px;
  flex:0 0 auto;
}

button.main[data-has-icon="true"]{padding:0 28px}
button.main[data-icon-pos="right"] .content{flex-direction:row-reverse}

button.main[data-icon-only="true"]{
  padding:0;
  width:40px;
  min-width:40px;
}
button.main[data-icon-only="true"] .label{display:none}
button.main[data-icon-only="true"] .icon{display:inline-flex}

button.main[data-size="sm"]{height:34px; min-height:34px; padding:0 28px; font-size:13px}
button.main[data-size="md"]{height:40px; min-height:40px; padding:0 36px; font-size:14px}
button.main[data-size="lg"]{height:46px; min-height:46px; padding:0 40px; font-size:15px}
button.main[data-size="sm"][data-has-icon="true"]{padding:0 22px}
button.main[data-size="md"][data-has-icon="true"]{padding:0 28px}
button.main[data-size="lg"][data-has-icon="true"]{padding:0 32px}
button.main[data-size="sm"][data-icon-only="true"]{width:34px; min-width:34px; padding:0}
button.main[data-size="md"][data-icon-only="true"]{width:40px; min-width:40px; padding:0}
button.main[data-size="lg"][data-icon-only="true"]{width:46px; min-width:46px; padding:0}

/* Dividido \u2014 mismo ritmo que B\xE1sico; con icono no se comprime ni se estrecha */
button.main[data-appearance="divided"]{
  padding-right:0;
  width:max-content;
}
button.main[data-appearance="divided"] .content{
  padding-right:18px;
  padding-left:0;
  align-items:center;
  flex-shrink:0;
}
button.main[data-appearance="divided"][data-has-icon="true"]:not([data-icon-only="true"]){
  /* Igual que Relleno con icono a la izquierda; derecha la lleva el caret */
  padding:0 0 0 28px;
}
button.main[data-appearance="divided"][data-has-icon="true"]:not([data-icon-only="true"]) .content{
  gap:6px;
  padding-right:18px;
}
button.main[data-appearance="divided"]:not([data-has-icon="true"]):not([data-icon-only="true"]){
  padding:0 0 0 36px;
}
button.main[data-appearance="divided"][data-icon-only="true"]{
  width:auto;
  min-width:0;
  padding:0;
}
button.main[data-appearance="divided"][data-icon-only="true"] .content{
  padding:0 12px;
  min-width:40px;
}

.caret{
  display:none;
  align-items:center;
  justify-content:center;
  align-self:stretch;
  width:36px;
  border-left:1px solid color-mix(in srgb, #fff 35%, transparent);
  flex:0 0 auto;
}
button.main[data-appearance="divided"] .caret{display:inline-flex}
button.main[data-appearance="divided"][data-tone="neutral"] .caret,
button.main[data-appearance="divided"]:disabled .caret{
  border-left-color: color-mix(in srgb, currentColor 25%, transparent);
}
.caret svg{width:12px; height:12px}

/* Solo icono + procesando: solo spinner centrado, sin caret */
button.main[aria-busy="true"][data-icon-only="true"]{
  width:40px;
  min-width:40px;
  padding:0;
}
button.main[aria-busy="true"][data-icon-only="true"] .content{
  padding:0;
  width:100%;
  justify-content:center;
}
button.main[aria-busy="true"][data-icon-only="true"][data-appearance="divided"] .caret{
  display:none;
}
button.main[aria-busy="true"][data-icon-only="true"][data-appearance="divided"]{
  width:40px;
  min-width:40px;
}

/* Relleno + Dividido */
button.main[data-appearance="solid"][data-tone="primary"],
button.main[data-appearance="divided"][data-tone="primary"]{
  --btn-bg:#9f2141;
  --btn-fg:#fff;
  --btn-border:transparent;
  --btn-hover-bg:#c42d52;
  --btn-pressed-bg:#6a1630;
}
button.main[data-appearance="solid"][data-tone="accent"],
button.main[data-appearance="divided"][data-tone="accent"]{
  --btn-bg:#bc945a;
  --btn-fg:#fff;
  --btn-border:transparent;
  --btn-hover-bg:#c9a36a;
  --btn-pressed-bg:#9a7540;
}
button.main[data-appearance="solid"][data-tone="dark"],
button.main[data-appearance="divided"][data-tone="dark"]{
  --btn-bg:#181511;
  --btn-fg:#fff;
  --btn-border:transparent;
  --btn-hover-bg:#2a2621;
  --btn-pressed-bg:#0c0b09;
}
button.main[data-appearance="solid"][data-tone="neutral"],
button.main[data-appearance="divided"][data-tone="neutral"]{
  --btn-bg:#fff;
  --btn-fg:#181511;
  --btn-border:#d8d1c6;
  --btn-hover-bg:#f5f5f5;
  --btn-pressed-bg:#ebebeb;
}
button.main[data-appearance="solid"][data-tone="soft"],
button.main[data-appearance="divided"][data-tone="soft"]{
  --btn-bg:#c4a574;
  --btn-fg:#fff;
  --btn-border:transparent;
  --btn-hover-bg:#cfae82;
  --btn-pressed-bg:#a88755;
}

/* Contorno */
button.main[data-appearance="outline"]{
  --btn-bg:#fff;
  --btn-fg:#9f2141;
  --btn-border:#9f2141;
  --btn-hover-bg:#f8eef1;
  --btn-pressed-bg:#f0dde3;
}
button.main[data-appearance="outline"][data-tone="accent"]{
  --btn-fg:#bc945a; --btn-border:#bc945a;
  --btn-hover-bg:#f7f1e6; --btn-pressed-bg:#f0e6d4;
}
button.main[data-appearance="outline"][data-tone="dark"]{
  --btn-fg:#181511; --btn-border:#181511;
  --btn-hover-bg:#f3f3f3; --btn-pressed-bg:#e9e9e9;
}
button.main[data-appearance="outline"][data-tone="neutral"]{
  --btn-fg:#181511; --btn-border:#d8d1c6;
  --btn-hover-bg:#f5f5f5; --btn-pressed-bg:#ebebeb;
}
button.main[data-appearance="outline"][data-tone="soft"]{
  --btn-fg:#8a6b3d; --btn-border:#c4a574;
  --btn-hover-bg:#f7f1e6; --btn-pressed-bg:#f0e6d4;
}

/* Texto */
button.main[data-appearance="ghost"]{
  --btn-bg:transparent;
  --btn-fg:#9f2141;
  --btn-border:transparent;
  --btn-hover-bg:#f8eef1;
  --btn-pressed-bg:#f0dde3;
}
button.main[data-appearance="ghost"][data-tone="accent"]{
  --btn-fg:#bc945a; --btn-hover-bg:#f7f1e6; --btn-pressed-bg:#f0e6d4;
}
button.main[data-appearance="ghost"][data-tone="dark"],
button.main[data-appearance="ghost"][data-tone="neutral"]{
  --btn-fg:#181511; --btn-hover-bg:#f3f3f3; --btn-pressed-bg:#e9e9e9;
}
button.main[data-appearance="ghost"][data-tone="soft"]{
  --btn-fg:#8a6b3d; --btn-hover-bg:#f7f1e6; --btn-pressed-bg:#f0e6d4;
}

button.main:not(:disabled):hover{background:var(--btn-hover-bg)}
button.main:not(:disabled):active{background:var(--btn-pressed-bg)}
button.main[data-demo="hover"]:not(:disabled){background:var(--btn-hover-bg)}
button.main[data-demo="pressed"]:not(:disabled){background:var(--btn-pressed-bg)}

button.main[data-appearance="divided"][data-demo="hover"]:not(:disabled) .caret,
button.main[data-appearance="divided"]:not(:disabled):hover .caret{
  background:color-mix(in srgb, #000 12%, transparent);
}
button.main[data-appearance="divided"][data-demo="pressed"]:not(:disabled) .caret,
button.main[data-appearance="divided"]:not(:disabled):active .caret{
  background:color-mix(in srgb, #000 18%, transparent);
}

/* Disabled */
button.main[data-appearance="solid"]:disabled,
button.main[data-appearance="divided"]:disabled{
  --btn-bg:#e8e8e8;
  --btn-fg:#8a8a8a;
  --btn-border:transparent;
}
button.main[data-appearance="outline"]:disabled{
  --btn-bg:#fff;
  --btn-fg:#9a9a9a;
  --btn-border:#d0d0d0;
}
button.main[data-appearance="ghost"]:disabled{
  --btn-bg:transparent;
  --btn-fg:#9a9a9a;
  --btn-border:transparent;
}

/* Procesando Contorno: mantiene borde, fondo blanco (no caja gris rara) */
button.main[data-appearance="outline"][aria-busy="true"]{
  --btn-bg:#fff;
  --btn-fg:#9f2141;
  --btn-border:#9f2141;
}
button.main[data-appearance="ghost"][aria-busy="true"]{
  --btn-bg:transparent;
  --btn-fg:#9f2141;
  --btn-border:transparent;
}

/* Procesando Relleno/Dividido = color activo + spinner; Dividido conserva caret */
button.main[data-appearance="solid"][aria-busy="true"][data-tone="primary"],
button.main[data-appearance="divided"][aria-busy="true"][data-tone="primary"]{
  --btn-bg:#9f2141;
  --btn-fg:#fff;
  --btn-border:transparent;
}

.spinner{
  box-sizing:border-box;
  width:16px;
  height:16px;
  border-radius:999px;
  border:2px solid currentColor;
  border-right-color:transparent;
  animation:spin .8s linear infinite;
  flex:0 0 auto;
  display:inline-flex;
  align-self:center;
}

@keyframes spin{to{transform:rotate(360deg)}}
`;

// src/components/button/gob-button.element.ts
var CARET_SVG = `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
var GobButtonElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "internalsHandle");
    __publicField(this, "buttonEl");
    __publicField(this, "caretEl");
    __publicField(this, "spinnerSelector", ".spinner");
    __publicField(this, "fieldsetDisabled", false);
    __publicField(this, "handleClick", (event) => {
      if (this.buttonEl.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const form = this.internalsHandle?.form ?? this.closest("form");
      if (!form) {
        return;
      }
      if (this.buttonEl.type === "submit") {
        event.preventDefault();
        form.requestSubmit();
        return;
      }
      if (this.buttonEl.type === "reset") {
        event.preventDefault();
        form.reset();
      }
    });
    const shadow = this.attachShadow({ mode: "open", delegatesFocus: true });
    this.internalsHandle = typeof this.attachInternals === "function" ? this.attachInternals() : null;
    const style = document.createElement("style");
    style.textContent = buttonStyles;
    this.buttonEl = document.createElement("button");
    this.buttonEl.className = "main";
    const content = document.createElement("span");
    content.className = "content";
    const iconWrap = document.createElement("span");
    iconWrap.className = "icon";
    const iconSlot = document.createElement("slot");
    iconSlot.name = "icon";
    iconWrap.appendChild(iconSlot);
    const labelWrap = document.createElement("span");
    labelWrap.className = "label";
    labelWrap.appendChild(document.createElement("slot"));
    content.append(iconWrap, labelWrap);
    this.caretEl = document.createElement("span");
    this.caretEl.className = "caret";
    this.caretEl.setAttribute("aria-hidden", "true");
    this.caretEl.innerHTML = CARET_SVG;
    this.buttonEl.append(content, this.caretEl);
    shadow.append(style, this.buttonEl);
  }
  static get observedAttributes() {
    return [...BUTTON_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.buttonEl.addEventListener("click", this.handleClick);
    this.syncButtonState();
  }
  disconnectedCallback() {
    this.buttonEl.removeEventListener("click", this.handleClick);
  }
  attributeChangedCallback() {
    this.syncButtonState();
  }
  formDisabledCallback(disabled) {
    this.fieldsetDisabled = disabled;
    this.syncButtonState();
  }
  formResetCallback() {
    this.removeAttribute("loading");
  }
  syncButtonState() {
    const loading = this.hasAttribute("loading");
    const disabled = this.hasAttribute("disabled") || this.fieldsetDisabled || loading;
    const iconOnly = this.hasAttribute("icon-only");
    const iconPosition = this.getAttribute("icon-position");
    const appearance = this.getAttribute("appearance") || "solid";
    const demo = this.getAttribute("demo-state");
    const hasIcon = iconOnly || iconPosition === "left" || iconPosition === "right";
    this.buttonEl.dataset.tone = this.getAttribute("tone") || "primary";
    this.buttonEl.dataset.appearance = appearance;
    this.buttonEl.dataset.size = this.getAttribute("size") || "md";
    this.buttonEl.dataset.iconOnly = iconOnly ? "true" : "false";
    this.buttonEl.dataset.hasIcon = hasIcon ? "true" : "false";
    this.buttonEl.dataset.iconPos = iconPosition === "right" ? "right" : "left";
    this.buttonEl.dataset.disabled = disabled ? "true" : "false";
    if (demo === "hover" || demo === "pressed") {
      this.buttonEl.dataset.demo = demo;
    } else {
      delete this.buttonEl.dataset.demo;
    }
    this.buttonEl.type = resolveButtonType(this.getAttribute("type"));
    this.buttonEl.disabled = disabled;
    this.buttonEl.setAttribute("aria-busy", loading ? "true" : "false");
    this.buttonEl.name = this.getAttribute("name") || "";
    this.buttonEl.value = this.getAttribute("value") || "";
    for (const attribute of BUTTON_ARIA_ATTRIBUTES) {
      const value = this.getAttribute(attribute);
      if (value === null) {
        this.buttonEl.removeAttribute(attribute);
      } else {
        this.buttonEl.setAttribute(attribute, value);
      }
    }
    const spinner = this.buttonEl.querySelector(this.spinnerSelector);
    const content = this.buttonEl.querySelector(".content");
    if (loading && !spinner) {
      const spinnerEl = document.createElement("span");
      spinnerEl.className = "spinner";
      spinnerEl.setAttribute("aria-hidden", "true");
      if (content) {
        content.insertBefore(spinnerEl, content.firstChild);
      } else {
        this.buttonEl.insertBefore(spinnerEl, this.buttonEl.firstChild);
      }
    }
    if (!loading && spinner) {
      spinner.remove();
    }
  }
};
__publicField(GobButtonElement, "formAssociated", true);
defineCustomElement("gob-button", GobButtonElement);

// src/components/checkbox/checkbox-constants.ts
var CHECKBOX_VARIANTS = [
  "basic",
  "labeled",
  "helper",
  "dense",
  "soft",
  "card",
  "pill",
  "tile",
  "complete"
];
var CHECKBOX_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info"
];
var CHECKBOX_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "description",
  "helper",
  "status",
  "size",
  "checked",
  "indeterminate",
  "disabled",
  "required",
  "name",
  "value",
  "aria-label",
  "aria-labelledby"
];
function resolveCheckboxVariant(value) {
  if (CHECKBOX_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveCheckboxStatus(value) {
  if (CHECKBOX_STATUSES.includes(value ?? "")) {
    return value;
  }
  return "default";
}
function resolveCheckboxSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}

// src/components/checkbox/checkbox-styles.ts
var checkboxStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ck-vino: #9f2141;
  --gob-ck-dorado: #bc945a;
  --gob-ck-title: #181511;
  --gob-ck-muted: #8a8278;
  --gob-ck-text: #3d3a35;
  --gob-ck-border: rgba(24, 21, 17, 0.14);
  --gob-ck-focus: var(--gob-ck-vino);
  --gob-ck-ring: rgba(159, 33, 65, 0.18);
  --gob-ck-box: 20px;
  --gob-ck-radius: 7px;
  --gob-ck-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] { --gob-ck-box: 18px; --gob-ck-radius: 6px; }
.root[data-size='lg'] { --gob-ck-box: 24px; --gob-ck-radius: 8px; }

.root[data-status='error'] { --gob-ck-focus: #c62828; --gob-ck-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-ck-focus: #1f8a55; --gob-ck-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-ck-focus: #d0921a; --gob-ck-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-ck-focus: #2f5f8a; --gob-ck-ring: rgba(47,95,138,.16); }

.control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  color: var(--gob-ck-text);
}

.root[data-disabled='true'] .control {
  cursor: not-allowed;
  opacity: 0.72;
}

input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: 0;
  pointer-events: none;
}

.box {
  flex: 0 0 auto;
  width: var(--gob-ck-box);
  height: var(--gob-ck-box);
  margin-top: 1px;
  border-radius: var(--gob-ck-radius);
  border: 1.5px solid var(--gob-ck-border);
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition:
    background-color 160ms var(--gob-ck-ease),
    border-color 160ms var(--gob-ck-ease),
    box-shadow 160ms var(--gob-ck-ease),
    transform 160ms var(--gob-ck-ease);
}

.control:hover .box {
  border-color: color-mix(in srgb, var(--gob-ck-focus) 55%, var(--gob-ck-border));
}

.mark {
  display: none;
  width: 12px;
  height: 12px;
}

.root[data-checked='true'] .box,
.root[data-indeterminate='true'] .box {
  background: var(--gob-ck-focus);
  border-color: var(--gob-ck-focus);
  transform: scale(1.04);
}

.root[data-checked='true'] .mark-check,
.root[data-indeterminate='true'] .mark-line {
  display: block;
}

input:focus-visible + .box {
  box-shadow: 0 0 0 4px var(--gob-ck-ring);
  border-color: var(--gob-ck-focus);
}

.copy {
  min-width: 0;
  display: grid;
  gap: 2px;
  padding-top: 1px;
}

.label {
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--gob-ck-title);
  line-height: 1.3;
}

.label .req {
  color: var(--gob-ck-vino);
  margin-left: 2px;
}

.description {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-ck-muted);
  line-height: 1.4;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-ck-muted);
  line-height: 1.35;
  padding-left: calc(var(--gob-ck-box) + 12px);
}

.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.pill-status {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-ck-vino);
}
.root[data-status='error'] .pill-status { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill-status { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill-status { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill-status { background: rgba(47,95,138,.12); color: #2f5f8a; }

.root[data-variant='dense'] {
  gap: 6px;
}
.root[data-variant='dense'] .control { gap: 8px; }
.root[data-variant='dense'] .label { font-size: 13px; }

.root[data-variant='soft'] .control,
.root[data-variant='card'] .control,
.root[data-variant='tile'] .control,
.root[data-variant='pill'] .control,
.root[data-variant='complete'] .control {
  padding: 12px 14px;
  border-radius: 14px;
  border: 1.5px solid transparent;
  transition:
    background 160ms var(--gob-ck-ease),
    border-color 160ms var(--gob-ck-ease),
    box-shadow 160ms var(--gob-ck-ease);
}

.root[data-variant='soft'] .control {
  background: color-mix(in srgb, var(--gob-ck-vino) 6%, #fff);
}
.root[data-variant='soft'] .control:hover {
  background: color-mix(in srgb, var(--gob-ck-vino) 10%, #fff);
}
.root[data-variant='soft'][data-checked='true'] .control,
.root[data-variant='soft'][data-indeterminate='true'] .control {
  background: color-mix(in srgb, var(--gob-ck-vino) 12%, #fff);
  border-color: color-mix(in srgb, var(--gob-ck-vino) 28%, transparent);
}

.root[data-variant='card'] .control {
  background: #fff;
  border-color: rgba(24, 21, 17, 0.1);
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.03);
}
.root[data-variant='card'] .control:hover {
  border-color: color-mix(in srgb, var(--gob-ck-vino) 35%, rgba(24,21,17,.1));
}
.root[data-variant='card'][data-checked='true'] .control,
.root[data-variant='card'][data-indeterminate='true'] .control {
  border-color: var(--gob-ck-focus);
  box-shadow: 0 0 0 4px var(--gob-ck-ring);
}

.root[data-variant='pill'] .control {
  border-radius: 999px;
  background: #faf9f7;
  align-items: center;
}
.root[data-variant='pill'] .box { margin-top: 0; }
.root[data-variant='pill'][data-checked='true'] .control {
  background: color-mix(in srgb, var(--gob-ck-vino) 10%, #fff);
  border-color: color-mix(in srgb, var(--gob-ck-vino) 24%, transparent);
}

.root[data-variant='tile'] .control {
  grid-template-columns: 1fr auto;
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(188,148,90,.12), transparent 50%),
    #fff;
  border-color: rgba(24, 21, 17, 0.1);
}
.root[data-variant='tile'] .box { order: 2; margin-top: 0; align-self: center; }
.root[data-variant='tile'] .copy { order: 1; }
.root[data-variant='tile'][data-checked='true'] .control {
  border-color: var(--gob-ck-dorado);
  box-shadow: 0 0 0 4px rgba(188, 148, 90, 0.18);
}

.root[data-variant='complete'] .control {
  background: #fff;
  border-color: rgba(24, 21, 17, 0.1);
}
.root[data-variant='complete'][data-checked='true'] .control {
  border-color: var(--gob-ck-focus);
  box-shadow: 0 0 0 4px var(--gob-ck-ring);
}

.root[data-variant='soft'] .helper,
.root[data-variant='card'] .helper,
.root[data-variant='pill'] .helper,
.root[data-variant='tile'] .helper,
.root[data-variant='complete'] .helper {
  padding-left: 14px;
}

.root[data-disabled='true'][data-checked='true'] .box,
.root[data-disabled='true'][data-indeterminate='true'] .box {
  background: color-mix(in srgb, var(--gob-ck-focus) 35%, #ebe6df);
  border-color: transparent;
}
`;

// src/components/checkbox/gob-checkbox.element.ts
function statusPill(status) {
  switch (status) {
    case "error":
      return "Error";
    case "success":
      return "Valido";
    case "warning":
      return "Revision";
    case "info":
      return "Info";
    default:
      return "";
  }
}
var GobCheckboxElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "controlEl");
    __publicField(this, "inputEl");
    __publicField(this, "boxEl");
    __publicField(this, "copyEl");
    __publicField(this, "labelEl");
    __publicField(this, "labelTextEl");
    __publicField(this, "descEl");
    __publicField(this, "helperEl");
    __publicField(this, "statusEl");
    __publicField(this, "slotEl");
    __publicField(this, "reqEl");
    __publicField(this, "fieldId", `gob-ck-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "syncing", false);
    __publicField(this, "onSlotChange", () => {
      if (this.syncing) return;
      this.updateLabelVisibility();
    });
    __publicField(this, "handleChange", () => {
      const nextChecked = this.inputEl.checked;
      if (nextChecked) {
        if (!this.hasAttribute("checked")) this.setAttribute("checked", "");
      } else if (this.hasAttribute("checked")) {
        this.removeAttribute("checked");
      }
      if (this.hasAttribute("indeterminate")) {
        this.removeAttribute("indeterminate");
      }
      this.syncState();
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      this.dispatchEvent(
        new CustomEvent("gob-checkbox", {
          detail: {
            checked: this.inputEl.checked,
            value: this.inputEl.value
          },
          bubbles: true,
          composed: true
        })
      );
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = checkboxStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.controlEl = document.createElement("label");
    this.controlEl.className = "control";
    this.inputEl = document.createElement("input");
    this.inputEl.type = "checkbox";
    this.boxEl = document.createElement("span");
    this.boxEl.className = "box";
    this.boxEl.setAttribute("aria-hidden", "true");
    this.boxEl.innerHTML = `
      <svg class="mark mark-check" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="mark mark-line" viewBox="0 0 12 12" fill="none">
        <path d="M3 6H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `;
    this.copyEl = document.createElement("div");
    this.copyEl.className = "copy";
    this.labelEl = document.createElement("span");
    this.labelEl.className = "label";
    this.labelTextEl = document.createElement("span");
    this.labelTextEl.className = "label-text";
    this.slotEl = document.createElement("slot");
    this.reqEl = document.createElement("span");
    this.reqEl.className = "req";
    this.reqEl.textContent = "*";
    this.reqEl.hidden = true;
    this.labelEl.append(this.labelTextEl, this.slotEl, this.reqEl);
    this.descEl = document.createElement("p");
    this.descEl.className = "description";
    this.descEl.hidden = true;
    this.statusEl = document.createElement("span");
    this.statusEl.className = "pill-status";
    this.statusEl.hidden = true;
    this.copyEl.append(this.labelEl, this.descEl, this.statusEl);
    this.controlEl.append(this.inputEl, this.boxEl, this.copyEl);
    this.helperEl = document.createElement("p");
    this.helperEl.className = "helper";
    this.helperEl.hidden = true;
    this.rootEl.append(this.controlEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...CHECKBOX_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.inputEl.addEventListener("change", this.handleChange);
    this.slotEl.addEventListener("slotchange", this.onSlotChange);
    this.syncState();
  }
  disconnectedCallback() {
    this.inputEl.removeEventListener("change", this.handleChange);
    this.slotEl.removeEventListener("slotchange", this.onSlotChange);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.syncState();
  }
  hasSlotContent() {
    return this.slotEl.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      return node.nodeType === Node.ELEMENT_NODE;
    });
  }
  updateLabelVisibility() {
    const attrLabel = this.getAttribute("label")?.trim() || "";
    const hasSlot = this.hasSlotContent();
    if (hasSlot) {
      this.labelTextEl.hidden = true;
      this.labelTextEl.textContent = "";
      this.slotEl.hidden = false;
    } else if (attrLabel) {
      this.labelTextEl.hidden = false;
      this.labelTextEl.textContent = attrLabel;
      this.slotEl.hidden = true;
    } else {
      this.labelTextEl.hidden = true;
      this.labelTextEl.textContent = "";
      this.slotEl.hidden = false;
    }
    this.reqEl.hidden = !this.hasAttribute("required");
  }
  syncState() {
    if (this.syncing) return;
    this.syncing = true;
    try {
      const variant = resolveCheckboxVariant(this.getAttribute("variant"));
      const status = resolveCheckboxStatus(this.getAttribute("status"));
      const size = resolveCheckboxSize(this.getAttribute("size"));
      const checked = this.hasAttribute("checked");
      const indeterminate = this.hasAttribute("indeterminate");
      const disabled = this.hasAttribute("disabled");
      const required = this.hasAttribute("required");
      const description = this.getAttribute("description")?.trim() || "";
      const helper = this.getAttribute("helper")?.trim() || "";
      this.rootEl.dataset.variant = variant;
      this.rootEl.dataset.status = status;
      this.rootEl.dataset.size = size;
      this.rootEl.dataset.checked = checked && !indeterminate ? "true" : "false";
      this.rootEl.dataset.indeterminate = indeterminate ? "true" : "false";
      this.rootEl.dataset.disabled = disabled ? "true" : "false";
      this.inputEl.id = this.fieldId;
      this.controlEl.htmlFor = this.fieldId;
      this.inputEl.checked = checked && !indeterminate;
      this.inputEl.indeterminate = indeterminate;
      this.inputEl.disabled = disabled;
      this.inputEl.required = required;
      this.inputEl.name = this.getAttribute("name") || "";
      this.inputEl.value = this.getAttribute("value") || "on";
      const ariaLabel = this.getAttribute("aria-label");
      const ariaLabelledby = this.getAttribute("aria-labelledby");
      if (ariaLabel === null) this.inputEl.removeAttribute("aria-label");
      else this.inputEl.setAttribute("aria-label", ariaLabel);
      if (ariaLabelledby === null) this.inputEl.removeAttribute("aria-labelledby");
      else this.inputEl.setAttribute("aria-labelledby", ariaLabelledby);
      this.updateLabelVisibility();
      const descText = description || (variant === "complete" ? "Incluye detalle de apoyo para la decision." : variant === "card" || variant === "tile" ? "Toca para seleccionar esta opcion." : "");
      this.descEl.hidden = !descText;
      this.descEl.textContent = descText;
      const pill = statusPill(status);
      this.statusEl.hidden = !pill;
      this.statusEl.textContent = pill;
      const showHelper = Boolean(helper) || variant === "helper" || variant === "complete" || status !== "default";
      this.helperEl.hidden = !showHelper;
      this.helperEl.textContent = helper || (status === "error" ? "Debes aceptar para continuar" : status === "success" ? "Seleccion confirmada" : status === "warning" ? "Requiere revision" : "");
    } finally {
      this.syncing = false;
    }
  }
};
defineCustomElement("gob-checkbox", GobCheckboxElement);

// src/components/radio/radio-constants.ts
var RADIO_VARIANTS = [
  "basic",
  "labeled",
  "helper",
  "dense",
  "soft",
  "card",
  "pill",
  "tile",
  "complete"
];
var RADIO_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info"
];
var RADIO_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "description",
  "helper",
  "status",
  "size",
  "checked",
  "disabled",
  "required",
  "name",
  "value",
  "aria-label",
  "aria-labelledby"
];
function resolveRadioVariant(value) {
  if (RADIO_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveRadioStatus(value) {
  if (RADIO_STATUSES.includes(value ?? "")) {
    return value;
  }
  return "default";
}
function resolveRadioSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}

// src/components/radio/radio-styles.ts
var radioStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-rd-vino: #9f2141;
  --gob-rd-dorado: #bc945a;
  --gob-rd-title: #181511;
  --gob-rd-muted: #8a8278;
  --gob-rd-text: #3d3a35;
  --gob-rd-border: rgba(24, 21, 17, 0.14);
  --gob-rd-focus: var(--gob-rd-vino);
  --gob-rd-ring: rgba(159, 33, 65, 0.18);
  --gob-rd-dot: 20px;
  --gob-rd-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] { --gob-rd-dot: 18px; }
.root[data-size='lg'] { --gob-rd-dot: 24px; }

.root[data-status='error'] { --gob-rd-focus: #c62828; --gob-rd-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-rd-focus: #1f8a55; --gob-rd-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-rd-focus: #d0921a; --gob-rd-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-rd-focus: #2f5f8a; --gob-rd-ring: rgba(47,95,138,.16); }

.control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  color: var(--gob-rd-text);
}

.root[data-disabled='true'] .control {
  cursor: not-allowed;
  opacity: 0.72;
}

input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: 0;
  pointer-events: none;
}

.dot {
  flex: 0 0 auto;
  width: var(--gob-rd-dot);
  height: var(--gob-rd-dot);
  margin-top: 1px;
  border-radius: 999px;
  border: 1.5px solid var(--gob-rd-border);
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 160ms var(--gob-rd-ease),
    box-shadow 160ms var(--gob-rd-ease),
    transform 160ms var(--gob-rd-ease);
}

.dot::after {
  content: "";
  width: calc(var(--gob-rd-dot) * 0.45);
  height: calc(var(--gob-rd-dot) * 0.45);
  border-radius: 999px;
  background: var(--gob-rd-focus);
  transform: scale(0);
  transition: transform 160ms var(--gob-rd-ease);
}

.control:hover .dot {
  border-color: color-mix(in srgb, var(--gob-rd-focus) 55%, var(--gob-rd-border));
}

.root[data-checked='true'] .dot {
  border-color: var(--gob-rd-focus);
  transform: scale(1.04);
}

.root[data-checked='true'] .dot::after {
  transform: scale(1);
}

input:focus-visible + .dot {
  box-shadow: 0 0 0 4px var(--gob-rd-ring);
  border-color: var(--gob-rd-focus);
}

.copy {
  min-width: 0;
  display: grid;
  gap: 2px;
  padding-top: 1px;
}

.label {
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--gob-rd-title);
  line-height: 1.3;
}

.label .req {
  color: var(--gob-rd-vino);
  margin-left: 2px;
}

.description {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-rd-muted);
  line-height: 1.4;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-rd-muted);
  line-height: 1.35;
  padding-left: calc(var(--gob-rd-dot) + 12px);
}

.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.pill-status {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-rd-vino);
}
.root[data-status='error'] .pill-status { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill-status { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill-status { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill-status { background: rgba(47,95,138,.12); color: #2f5f8a; }

.root[data-variant='dense'] { gap: 6px; }
.root[data-variant='dense'] .control { gap: 8px; }
.root[data-variant='dense'] .label { font-size: 13px; }

.root[data-variant='soft'] .control,
.root[data-variant='card'] .control,
.root[data-variant='pill'] .control,
.root[data-variant='tile'] .control,
.root[data-variant='complete'] .control {
  padding: 12px 14px;
  border-radius: 14px;
  border: 1.5px solid transparent;
  transition:
    background 160ms var(--gob-rd-ease),
    border-color 160ms var(--gob-rd-ease),
    box-shadow 160ms var(--gob-rd-ease);
}

.root[data-variant='soft'] .control {
  background: color-mix(in srgb, var(--gob-rd-vino) 6%, #fff);
}
.root[data-variant='soft'] .control:hover {
  background: color-mix(in srgb, var(--gob-rd-vino) 10%, #fff);
}
.root[data-variant='soft'][data-checked='true'] .control {
  background: color-mix(in srgb, var(--gob-rd-vino) 12%, #fff);
  border-color: color-mix(in srgb, var(--gob-rd-vino) 28%, transparent);
}

.root[data-variant='card'] .control {
  background: #fff;
  border-color: rgba(24, 21, 17, 0.1);
}
.root[data-variant='card'] .control:hover {
  border-color: color-mix(in srgb, var(--gob-rd-vino) 35%, rgba(24,21,17,.1));
}
.root[data-variant='card'][data-checked='true'] .control {
  border-color: var(--gob-rd-focus);
  box-shadow: 0 0 0 4px var(--gob-rd-ring);
}

.root[data-variant='pill'] .control {
  border-radius: 999px;
  background: #faf9f7;
  align-items: center;
}
.root[data-variant='pill'] .dot { margin-top: 0; }
.root[data-variant='pill'][data-checked='true'] .control {
  background: color-mix(in srgb, var(--gob-rd-vino) 10%, #fff);
  border-color: color-mix(in srgb, var(--gob-rd-vino) 24%, transparent);
}

.root[data-variant='tile'] .control {
  grid-template-columns: 1fr auto;
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(188,148,90,.12), transparent 50%),
    #fff;
  border-color: rgba(24, 21, 17, 0.1);
}
.root[data-variant='tile'] .dot { order: 2; margin-top: 0; align-self: center; }
.root[data-variant='tile'] .copy { order: 1; }
.root[data-variant='tile'][data-checked='true'] .control {
  border-color: var(--gob-rd-dorado);
  box-shadow: 0 0 0 4px rgba(188, 148, 90, 0.18);
}

.root[data-variant='complete'] .control {
  background: #fff;
  border-color: rgba(24, 21, 17, 0.1);
}
.root[data-variant='complete'][data-checked='true'] .control {
  border-color: var(--gob-rd-focus);
  box-shadow: 0 0 0 4px var(--gob-rd-ring);
}

.root[data-variant='soft'] .helper,
.root[data-variant='card'] .helper,
.root[data-variant='pill'] .helper,
.root[data-variant='tile'] .helper,
.root[data-variant='complete'] .helper {
  padding-left: 14px;
}

.root[data-disabled='true'][data-checked='true'] .dot {
  border-color: color-mix(in srgb, var(--gob-rd-focus) 35%, #ebe6df);
}
.root[data-disabled='true'][data-checked='true'] .dot::after {
  background: color-mix(in srgb, var(--gob-rd-focus) 40%, #ebe6df);
}
`;

// src/components/radio/gob-radio.element.ts
function statusPill2(status) {
  switch (status) {
    case "error":
      return "Error";
    case "success":
      return "Valido";
    case "warning":
      return "Revision";
    case "info":
      return "Info";
    default:
      return "";
  }
}
var GobRadioElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "controlEl");
    __publicField(this, "inputEl");
    __publicField(this, "dotEl");
    __publicField(this, "copyEl");
    __publicField(this, "labelEl");
    __publicField(this, "labelTextEl");
    __publicField(this, "descEl");
    __publicField(this, "helperEl");
    __publicField(this, "statusEl");
    __publicField(this, "slotEl");
    __publicField(this, "reqEl");
    __publicField(this, "fieldId", `gob-rd-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "syncing", false);
    __publicField(this, "onSlotChange", () => {
      if (this.syncing) return;
      this.updateLabelVisibility();
    });
    __publicField(this, "handleChange", () => {
      if (!this.inputEl.checked) return;
      const groupName = this.inputEl.name;
      if (groupName) {
        document.querySelectorAll(`gob-radio[name="${CSS.escape(groupName)}"]`).forEach((node) => {
          if (node !== this && node.hasAttribute("checked")) {
            node.removeAttribute("checked");
          }
        });
      }
      if (!this.hasAttribute("checked")) this.setAttribute("checked", "");
      this.syncState();
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      this.dispatchEvent(
        new CustomEvent("gob-radio", {
          detail: {
            checked: true,
            value: this.inputEl.value,
            name: this.inputEl.name
          },
          bubbles: true,
          composed: true
        })
      );
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = radioStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.controlEl = document.createElement("label");
    this.controlEl.className = "control";
    this.inputEl = document.createElement("input");
    this.inputEl.type = "radio";
    this.dotEl = document.createElement("span");
    this.dotEl.className = "dot";
    this.dotEl.setAttribute("aria-hidden", "true");
    this.copyEl = document.createElement("div");
    this.copyEl.className = "copy";
    this.labelEl = document.createElement("span");
    this.labelEl.className = "label";
    this.labelTextEl = document.createElement("span");
    this.labelTextEl.className = "label-text";
    this.slotEl = document.createElement("slot");
    this.reqEl = document.createElement("span");
    this.reqEl.className = "req";
    this.reqEl.textContent = "*";
    this.reqEl.hidden = true;
    this.labelEl.append(this.labelTextEl, this.slotEl, this.reqEl);
    this.descEl = document.createElement("p");
    this.descEl.className = "description";
    this.descEl.hidden = true;
    this.statusEl = document.createElement("span");
    this.statusEl.className = "pill-status";
    this.statusEl.hidden = true;
    this.copyEl.append(this.labelEl, this.descEl, this.statusEl);
    this.controlEl.append(this.inputEl, this.dotEl, this.copyEl);
    this.helperEl = document.createElement("p");
    this.helperEl.className = "helper";
    this.helperEl.hidden = true;
    this.rootEl.append(this.controlEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...RADIO_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.inputEl.addEventListener("change", this.handleChange);
    this.slotEl.addEventListener("slotchange", this.onSlotChange);
    this.syncState();
  }
  disconnectedCallback() {
    this.inputEl.removeEventListener("change", this.handleChange);
    this.slotEl.removeEventListener("slotchange", this.onSlotChange);
  }
  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.syncState();
  }
  hasSlotContent() {
    return this.slotEl.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      return node.nodeType === Node.ELEMENT_NODE;
    });
  }
  updateLabelVisibility() {
    const attrLabel = this.getAttribute("label")?.trim() || "";
    const hasSlot = this.hasSlotContent();
    if (hasSlot) {
      this.labelTextEl.hidden = true;
      this.labelTextEl.textContent = "";
      this.slotEl.hidden = false;
    } else if (attrLabel) {
      this.labelTextEl.hidden = false;
      this.labelTextEl.textContent = attrLabel;
      this.slotEl.hidden = true;
    } else {
      this.labelTextEl.hidden = true;
      this.labelTextEl.textContent = "";
      this.slotEl.hidden = false;
    }
    this.reqEl.hidden = !this.hasAttribute("required");
  }
  syncState() {
    if (this.syncing) return;
    this.syncing = true;
    try {
      const variant = resolveRadioVariant(this.getAttribute("variant"));
      const status = resolveRadioStatus(this.getAttribute("status"));
      const size = resolveRadioSize(this.getAttribute("size"));
      const checked = this.hasAttribute("checked");
      const disabled = this.hasAttribute("disabled");
      const required = this.hasAttribute("required");
      const description = this.getAttribute("description")?.trim() || "";
      const helper = this.getAttribute("helper")?.trim() || "";
      this.rootEl.dataset.variant = variant;
      this.rootEl.dataset.status = status;
      this.rootEl.dataset.size = size;
      this.rootEl.dataset.checked = checked ? "true" : "false";
      this.rootEl.dataset.disabled = disabled ? "true" : "false";
      this.inputEl.id = this.fieldId;
      this.controlEl.htmlFor = this.fieldId;
      this.inputEl.checked = checked;
      this.inputEl.disabled = disabled;
      this.inputEl.required = required;
      this.inputEl.name = this.getAttribute("name") || "";
      this.inputEl.value = this.getAttribute("value") || "on";
      const ariaLabel = this.getAttribute("aria-label");
      const ariaLabelledby = this.getAttribute("aria-labelledby");
      if (ariaLabel === null) this.inputEl.removeAttribute("aria-label");
      else this.inputEl.setAttribute("aria-label", ariaLabel);
      if (ariaLabelledby === null) this.inputEl.removeAttribute("aria-labelledby");
      else this.inputEl.setAttribute("aria-labelledby", ariaLabelledby);
      this.updateLabelVisibility();
      const descText = description || (variant === "complete" ? "Elige una sola opcion del grupo." : variant === "card" || variant === "tile" ? "Selecciona esta via para continuar." : "");
      this.descEl.hidden = !descText;
      this.descEl.textContent = descText;
      const pill = statusPill2(status);
      this.statusEl.hidden = !pill;
      this.statusEl.textContent = pill;
      const showHelper = Boolean(helper) || variant === "helper" || variant === "complete" || status !== "default";
      this.helperEl.hidden = !showHelper;
      this.helperEl.textContent = helper || (status === "error" ? "Debes elegir una opcion" : status === "success" ? "Opcion confirmada" : status === "warning" ? "Requiere revision" : "");
    } finally {
      this.syncing = false;
    }
  }
};
defineCustomElement("gob-radio", GobRadioElement);

// src/components/switch/switch-constants.ts
var SWITCH_VARIANTS = [
  "basic",
  "labeled",
  "helper",
  "dense",
  "soft",
  "card",
  "pill",
  "tile",
  "complete"
];
var SWITCH_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info"
];
var SWITCH_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "description",
  "helper",
  "status",
  "size",
  "checked",
  "disabled",
  "required",
  "name",
  "value",
  "aria-label",
  "aria-labelledby"
];
function resolveSwitchVariant(value) {
  if (SWITCH_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveSwitchStatus(value) {
  if (SWITCH_STATUSES.includes(value ?? "")) {
    return value;
  }
  return "default";
}
function resolveSwitchSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}

// src/components/switch/switch-styles.ts
var switchStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sw-vino: #9f2141;
  --gob-sw-dorado: #bc945a;
  --gob-sw-title: #181511;
  --gob-sw-muted: #8a8278;
  --gob-sw-text: #3d3a35;
  --gob-sw-border: rgba(24, 21, 17, 0.14);
  --gob-sw-focus: var(--gob-sw-vino);
  --gob-sw-ring: rgba(159, 33, 65, 0.18);
  --gob-sw-track-w: 44px;
  --gob-sw-track-h: 24px;
  --gob-sw-thumb: 16px;
  --gob-sw-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-sw-track-w: 38px;
  --gob-sw-track-h: 20px;
  --gob-sw-thumb: 14px;
}
.root[data-size='lg'] {
  --gob-sw-track-w: 52px;
  --gob-sw-track-h: 28px;
  --gob-sw-thumb: 20px;
}

.root[data-status='error'] { --gob-sw-focus: #c62828; --gob-sw-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-sw-focus: #1f8a55; --gob-sw-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-sw-focus: #d0921a; --gob-sw-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-sw-focus: #2f5f8a; --gob-sw-ring: rgba(47,95,138,.16); }

.control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  color: var(--gob-sw-text);
}

.root[data-disabled='true'] .control {
  cursor: not-allowed;
  opacity: 0.72;
}

input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: 0;
  pointer-events: none;
}

.track {
  position: relative;
  flex: 0 0 auto;
  width: var(--gob-sw-track-w);
  height: var(--gob-sw-track-h);
  margin-top: 1px;
  border-radius: 999px;
  border: 1.5px solid var(--gob-sw-border);
  background: #f4f1ec;
  display: inline-flex;
  align-items: center;
  transition:
    background-color 160ms var(--gob-sw-ease),
    border-color 160ms var(--gob-sw-ease),
    box-shadow 160ms var(--gob-sw-ease);
}

.thumb {
  position: absolute;
  top: 50%;
  left: 3px;
  width: var(--gob-sw-thumb);
  height: var(--gob-sw-thumb);
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(24, 21, 17, 0.18);
  transform: translateY(-50%);
  transition:
    left 160ms var(--gob-sw-ease),
    background-color 160ms var(--gob-sw-ease),
    box-shadow 160ms var(--gob-sw-ease);
}

.control:hover .track {
  border-color: color-mix(in srgb, var(--gob-sw-focus) 45%, var(--gob-sw-border));
}

.root[data-checked='true'] .track {
  background: var(--gob-sw-focus);
  border-color: var(--gob-sw-focus);
}

.root[data-checked='true'] .thumb {
  left: calc(var(--gob-sw-track-w) - var(--gob-sw-thumb) - 5px);
  box-shadow: 0 1px 4px rgba(24, 21, 17, 0.22);
}

input:focus-visible + .track {
  box-shadow: 0 0 0 4px var(--gob-sw-ring);
  border-color: var(--gob-sw-focus);
}

.copy {
  min-width: 0;
  display: grid;
  gap: 2px;
  padding-top: 1px;
}

.label {
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--gob-sw-title);
  line-height: 1.3;
}

.label .req {
  color: var(--gob-sw-vino);
  margin-left: 2px;
}

.description {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sw-muted);
  line-height: 1.4;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sw-muted);
  line-height: 1.35;
  padding-left: calc(var(--gob-sw-track-w) + 12px);
}

.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.pill-status {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-sw-vino);
}
.root[data-status='error'] .pill-status { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill-status { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill-status { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill-status { background: rgba(47,95,138,.12); color: #2f5f8a; }

.root[data-variant='dense'] { gap: 6px; }
.root[data-variant='dense'] .control { gap: 8px; }
.root[data-variant='dense'] .label { font-size: 13px; }

.root[data-variant='soft'] .control,
.root[data-variant='card'] .control,
.root[data-variant='pill'] .control,
.root[data-variant='tile'] .control,
.root[data-variant='complete'] .control {
  padding: 12px 14px;
  border-radius: 14px;
  border: 1.5px solid transparent;
  transition:
    background 160ms var(--gob-sw-ease),
    border-color 160ms var(--gob-sw-ease),
    box-shadow 160ms var(--gob-sw-ease);
}

.root[data-variant='soft'] .control {
  background: color-mix(in srgb, var(--gob-sw-vino) 6%, #fff);
}
.root[data-variant='soft'] .control:hover {
  background: color-mix(in srgb, var(--gob-sw-vino) 10%, #fff);
}
.root[data-variant='soft'][data-checked='true'] .control {
  background: color-mix(in srgb, var(--gob-sw-vino) 12%, #fff);
  border-color: color-mix(in srgb, var(--gob-sw-vino) 28%, transparent);
}

.root[data-variant='card'] .control {
  background: #fff;
  border-color: rgba(24, 21, 17, 0.1);
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.03);
}
.root[data-variant='card'] .control:hover {
  border-color: color-mix(in srgb, var(--gob-sw-vino) 35%, rgba(24,21,17,.1));
}
.root[data-variant='card'][data-checked='true'] .control {
  border-color: var(--gob-sw-focus);
  box-shadow: 0 0 0 4px var(--gob-sw-ring);
}

.root[data-variant='pill'] .control {
  border-radius: 999px;
  background: #faf9f7;
  align-items: center;
}
.root[data-variant='pill'] .track { margin-top: 0; }
.root[data-variant='pill'][data-checked='true'] .control {
  background: color-mix(in srgb, var(--gob-sw-vino) 10%, #fff);
  border-color: color-mix(in srgb, var(--gob-sw-vino) 24%, transparent);
}

.root[data-variant='tile'] .control {
  grid-template-columns: 1fr auto;
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(188,148,90,.12), transparent 50%),
    #fff;
  border-color: rgba(24, 21, 17, 0.1);
}
.root[data-variant='tile'] .track { order: 2; margin-top: 0; align-self: center; }
.root[data-variant='tile'] .copy { order: 1; }
.root[data-variant='tile'][data-checked='true'] .control {
  border-color: var(--gob-sw-dorado);
  box-shadow: 0 0 0 4px rgba(188, 148, 90, 0.18);
}
.root[data-variant='tile'][data-checked='true'] .track {
  background: var(--gob-sw-dorado);
  border-color: var(--gob-sw-dorado);
}

.root[data-variant='complete'] .control {
  background: #fff;
  border-color: rgba(24, 21, 17, 0.1);
}
.root[data-variant='complete'][data-checked='true'] .control {
  border-color: var(--gob-sw-focus);
  box-shadow: 0 0 0 4px var(--gob-sw-ring);
}

.root[data-variant='soft'] .helper,
.root[data-variant='card'] .helper,
.root[data-variant='pill'] .helper,
.root[data-variant='tile'] .helper,
.root[data-variant='complete'] .helper {
  padding-left: 14px;
}

.root[data-disabled='true'] .track {
  border-color: #ebe6df;
  background: #f0ebe4;
}
.root[data-disabled='true'][data-checked='true'] .track {
  background: color-mix(in srgb, var(--gob-sw-focus) 40%, #ebe6df);
  border-color: transparent;
}
`;

// src/components/switch/gob-switch.element.ts
function statusPill3(status) {
  switch (status) {
    case "error":
      return "Error";
    case "success":
      return "Valido";
    case "warning":
      return "Revision";
    case "info":
      return "Info";
    default:
      return "";
  }
}
var GobSwitchElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "controlEl");
    __publicField(this, "inputEl");
    __publicField(this, "trackEl");
    __publicField(this, "copyEl");
    __publicField(this, "labelEl");
    __publicField(this, "labelTextEl");
    __publicField(this, "descEl");
    __publicField(this, "helperEl");
    __publicField(this, "statusEl");
    __publicField(this, "slotEl");
    __publicField(this, "reqEl");
    __publicField(this, "fieldId", `gob-sw-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "syncing", false);
    __publicField(this, "onSlotChange", () => {
      if (this.syncing) return;
      this.updateLabelVisibility();
    });
    __publicField(this, "handleChange", () => {
      const nextChecked = this.inputEl.checked;
      if (nextChecked) {
        if (!this.hasAttribute("checked")) this.setAttribute("checked", "");
      } else if (this.hasAttribute("checked")) {
        this.removeAttribute("checked");
      }
      this.syncState();
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      this.dispatchEvent(
        new CustomEvent("gob-switch", {
          detail: {
            checked: this.inputEl.checked,
            value: this.inputEl.value
          },
          bubbles: true,
          composed: true
        })
      );
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = switchStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.controlEl = document.createElement("label");
    this.controlEl.className = "control";
    this.inputEl = document.createElement("input");
    this.inputEl.type = "checkbox";
    this.inputEl.setAttribute("role", "switch");
    this.trackEl = document.createElement("span");
    this.trackEl.className = "track";
    this.trackEl.setAttribute("aria-hidden", "true");
    const thumb = document.createElement("span");
    thumb.className = "thumb";
    this.trackEl.appendChild(thumb);
    this.copyEl = document.createElement("div");
    this.copyEl.className = "copy";
    this.labelEl = document.createElement("span");
    this.labelEl.className = "label";
    this.labelTextEl = document.createElement("span");
    this.labelTextEl.className = "label-text";
    this.slotEl = document.createElement("slot");
    this.reqEl = document.createElement("span");
    this.reqEl.className = "req";
    this.reqEl.textContent = "*";
    this.reqEl.hidden = true;
    this.labelEl.append(this.labelTextEl, this.slotEl, this.reqEl);
    this.descEl = document.createElement("p");
    this.descEl.className = "description";
    this.descEl.hidden = true;
    this.statusEl = document.createElement("span");
    this.statusEl.className = "pill-status";
    this.statusEl.hidden = true;
    this.copyEl.append(this.labelEl, this.descEl, this.statusEl);
    this.controlEl.append(this.inputEl, this.trackEl, this.copyEl);
    this.helperEl = document.createElement("p");
    this.helperEl.className = "helper";
    this.helperEl.hidden = true;
    this.rootEl.append(this.controlEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...SWITCH_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.inputEl.addEventListener("change", this.handleChange);
    this.slotEl.addEventListener("slotchange", this.onSlotChange);
    this.syncState();
  }
  disconnectedCallback() {
    this.inputEl.removeEventListener("change", this.handleChange);
    this.slotEl.removeEventListener("slotchange", this.onSlotChange);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.syncState();
  }
  hasSlotContent() {
    return this.slotEl.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      return node.nodeType === Node.ELEMENT_NODE;
    });
  }
  updateLabelVisibility() {
    const attrLabel = this.getAttribute("label")?.trim() || "";
    const hasSlot = this.hasSlotContent();
    if (hasSlot) {
      this.labelTextEl.hidden = true;
      this.labelTextEl.textContent = "";
      this.slotEl.hidden = false;
    } else if (attrLabel) {
      this.labelTextEl.hidden = false;
      this.labelTextEl.textContent = attrLabel;
      this.slotEl.hidden = true;
    } else {
      this.labelTextEl.hidden = true;
      this.labelTextEl.textContent = "";
      this.slotEl.hidden = false;
    }
    this.reqEl.hidden = !this.hasAttribute("required");
  }
  syncState() {
    if (this.syncing) return;
    this.syncing = true;
    try {
      const variant = resolveSwitchVariant(this.getAttribute("variant"));
      const status = resolveSwitchStatus(this.getAttribute("status"));
      const size = resolveSwitchSize(this.getAttribute("size"));
      const checked = this.hasAttribute("checked");
      const disabled = this.hasAttribute("disabled");
      const required = this.hasAttribute("required");
      const description = this.getAttribute("description")?.trim() || "";
      const helper = this.getAttribute("helper")?.trim() || "";
      this.rootEl.dataset.variant = variant;
      this.rootEl.dataset.status = status;
      this.rootEl.dataset.size = size;
      this.rootEl.dataset.checked = checked ? "true" : "false";
      this.rootEl.dataset.disabled = disabled ? "true" : "false";
      this.inputEl.id = this.fieldId;
      this.controlEl.htmlFor = this.fieldId;
      this.inputEl.checked = checked;
      this.inputEl.disabled = disabled;
      this.inputEl.required = required;
      this.inputEl.name = this.getAttribute("name") || "";
      this.inputEl.value = this.getAttribute("value") || "on";
      this.inputEl.setAttribute("aria-checked", checked ? "true" : "false");
      const ariaLabel = this.getAttribute("aria-label");
      const ariaLabelledby = this.getAttribute("aria-labelledby");
      if (ariaLabel === null) this.inputEl.removeAttribute("aria-label");
      else this.inputEl.setAttribute("aria-label", ariaLabel);
      if (ariaLabelledby === null) this.inputEl.removeAttribute("aria-labelledby");
      else this.inputEl.setAttribute("aria-labelledby", ariaLabelledby);
      this.updateLabelVisibility();
      const descText = description || (variant === "complete" ? "Incluye detalle de apoyo para la decision." : variant === "card" || variant === "tile" ? "Activa o desactiva esta preferencia." : "");
      this.descEl.hidden = !descText;
      this.descEl.textContent = descText;
      const pill = statusPill3(status);
      this.statusEl.hidden = !pill;
      this.statusEl.textContent = pill;
      const showHelper = Boolean(helper) || variant === "helper" || variant === "complete" || status !== "default";
      this.helperEl.hidden = !showHelper;
      this.helperEl.textContent = helper || (status === "error" ? "Debes activar esta opcion" : status === "success" ? "Preferencia guardada" : status === "warning" ? "Requiere revision" : "");
    } finally {
      this.syncing = false;
    }
  }
};
defineCustomElement("gob-switch", GobSwitchElement);

// src/components/chip/chip-constants.ts
var CHIP_OBSERVED_ATTRIBUTES = [
  "tone",
  "disabled",
  "dismissible",
  "aria-label"
];

// src/components/chip/chip-styles.ts
var chipStyles = `
:host {
  display: inline-flex;
  vertical-align: middle;
  max-width: 100%;
}

.root {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 0;
  font-family: var(--gob-font-sans, inherit);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  max-width: 100%;
}

.root[data-tone="primary"] {
  background: var(--gob-primary-soft);
  color: var(--gob-primary);
}

.root[data-tone="success"] {
  background: var(--gob-success-bg);
  color: var(--gob-success);
}

.root[data-tone="error"] {
  background: var(--gob-danger-bg);
  color: var(--gob-danger);
}

.root[data-tone="warning"] {
  background: var(--gob-warning-bg);
  color: var(--gob-warning);
}

.root[data-tone="neutral"] {
  background: var(--gob-surface-muted, #f8f5ef);
  color: var(--gob-text-muted);
}

.root[data-disabled="true"] {
  background: #ebe6df;
  color: #9a9288;
}

.label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dismiss {
  appearance: none;
  border: 0;
  background: transparent;
  color: currentColor;
  width: 18px;
  height: 18px;
  padding: 0;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 0 0 auto;
  opacity: 0.85;
}

.dismiss:hover {
  opacity: 1;
  background: color-mix(in srgb, currentColor 12%, transparent);
}

.root[data-disabled="true"] .dismiss {
  cursor: not-allowed;
  opacity: 0.5;
}

.dismiss:focus-visible {
  outline: none;
  box-shadow: var(--gob-focus-ring, var(--gob-focus));
}
`;

// src/components/chip/gob-chip.element.ts
function resolveTone(value) {
  if (value === "success" || value === "error" || value === "warning" || value === "neutral" || value === "primary") {
    return value;
  }
  return "primary";
}
var GobChipElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "dismissBtn");
    __publicField(this, "handleDismiss", (event) => {
      event.stopPropagation();
      if (this.hasAttribute("disabled")) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("gob-dismiss", {
          bubbles: true,
          composed: true
        })
      );
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = chipStyles;
    this.rootEl = document.createElement("span");
    this.rootEl.className = "root";
    const label = document.createElement("span");
    label.className = "label";
    label.appendChild(document.createElement("slot"));
    this.dismissBtn = document.createElement("button");
    this.dismissBtn.type = "button";
    this.dismissBtn.className = "dismiss";
    this.dismissBtn.setAttribute("aria-label", "Quitar");
    this.dismissBtn.innerHTML = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2L8 8M8 2L2 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    this.rootEl.append(label, this.dismissBtn);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...CHIP_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.dismissBtn.addEventListener("click", this.handleDismiss);
    this.syncState();
  }
  disconnectedCallback() {
    this.dismissBtn.removeEventListener("click", this.handleDismiss);
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const disabled = this.hasAttribute("disabled");
    const dismissible = this.hasAttribute("dismissible");
    const tone = resolveTone(this.getAttribute("tone"));
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.dismissBtn.hidden = !dismissible;
    this.dismissBtn.disabled = disabled;
    const ariaLabel = this.getAttribute("aria-label");
    if (ariaLabel === null) this.rootEl.removeAttribute("aria-label");
    else this.rootEl.setAttribute("aria-label", ariaLabel);
  }
};
defineCustomElement("gob-chip", GobChipElement);

// src/components/pagination/pagination-constants.ts
var PAGINATION_VARIANTS = [
  "basic",
  "arrows",
  "ellipsis",
  "edges",
  "compact",
  "icons",
  "outline",
  "pills",
  "text",
  "jump",
  "simple",
  "group",
  "summary"
];
var PAGINATION_OBSERVED_ATTRIBUTES = [
  "page",
  "total",
  "variant",
  "tone",
  "size",
  "lang",
  "disabled",
  "sibling-count",
  "boundary-count",
  "page-size",
  "aria-label"
];
function resolveVariant(value) {
  if (PAGINATION_VARIANTS.includes(value || "")) {
    return value;
  }
  return "arrows";
}
function resolveTone2(value) {
  if (value === "accent" || value === "dark" || value === "neutral" || value === "soft" || value === "primary") {
    return value;
  }
  return "primary";
}
function resolveSize(value) {
  if (value === "sm" || value === "lg" || value === "md") {
    return value;
  }
  return "md";
}
function resolveLang(value) {
  return value === "en" ? "en" : "es";
}
function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value || "", 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
}
function buildPageItems(page, total, siblingCount, boundaryCount, useEllipsis) {
  if (total <= 1) {
    return [1];
  }
  if (!useEllipsis || total <= siblingCount * 2 + boundaryCount * 2 + 3) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  const items = [];
  const startPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
  const endPages = Array.from({ length: boundaryCount }, (_, i) => total - boundaryCount + 1 + i);
  const siblingsStart = Math.max(page - siblingCount, boundaryCount + 1);
  const siblingsEnd = Math.min(page + siblingCount, total - boundaryCount);
  items.push(...startPages);
  if (siblingsStart > boundaryCount + 1) {
    items.push("ellipsis");
  } else {
    for (let i = boundaryCount + 1; i < siblingsStart; i += 1) {
      items.push(i);
    }
  }
  for (let i = siblingsStart; i <= siblingsEnd; i += 1) {
    items.push(i);
  }
  if (siblingsEnd < total - boundaryCount) {
    items.push("ellipsis");
  } else {
    for (let i = siblingsEnd + 1; i <= total - boundaryCount; i += 1) {
      items.push(i);
    }
  }
  items.push(...endPages);
  return items;
}
var LABELS = {
  es: {
    previous: "Anterior",
    next: "Siguiente",
    first: "Primera",
    last: "Ultima",
    pageOf: (page, total) => `Pagina ${page} de ${total}`,
    summary: (page, total, pageSize) => {
      const from = (page - 1) * pageSize + 1;
      const to = Math.min(page * pageSize, total * pageSize);
      const items = total * pageSize;
      return `Mostrando ${from}-${to} de ${items}`;
    },
    of: "de",
    goTo: "Ir a pagina",
    nav: "Paginacion"
  },
  en: {
    previous: "Previous",
    next: "Next",
    first: "First",
    last: "Last",
    pageOf: (page, total) => `Page ${page} of ${total}`,
    summary: (page, total, pageSize) => {
      const from = (page - 1) * pageSize + 1;
      const to = Math.min(page * pageSize, total * pageSize);
      const items = total * pageSize;
      return `Showing ${from}-${to} of ${items}`;
    },
    of: "of",
    goTo: "Go to page",
    nav: "Pagination"
  }
};

// src/components/pagination/pagination-styles.ts
var paginationStyles = `
:host {
  display: inline-flex;
  max-width: 100%;
  vertical-align: middle;
  font-family: var(--gob-font-sans, inherit);
  color: var(--gob-text);
}

:host([disabled]) {
  opacity: 0.55;
  pointer-events: none;
}

nav {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  max-width: 100%;
}

.item,
.navBtn,
.ellipsis,
.meta,
.jumpInput {
  box-sizing: border-box;
  font: inherit;
  font-weight: 700;
  line-height: 1;
  border-radius: var(--gob-radius-md, 10px);
  border: 1px solid transparent;
  background: transparent;
  color: var(--gob-text);
  min-height: var(--pag-size, 40px);
  min-width: var(--pag-size, 40px);
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease,
    box-shadow 140ms ease;
}

.ellipsis,
.meta {
  cursor: default;
  min-width: auto;
  font-weight: 600;
  color: var(--gob-text-muted, #6b655c);
}

.item:hover,
.navBtn:hover {
  background: color-mix(in srgb, var(--pag-tone, var(--gob-primary)) 10%, transparent);
}

.item:focus-visible,
.navBtn:focus-visible,
.jumpInput:focus-visible {
  outline: none;
  box-shadow: var(--gob-focus-ring, var(--gob-focus));
}

.item[aria-current="page"] {
  background: var(--pag-tone, var(--gob-primary));
  color: var(--gob-primary-contrast, #fff);
  border-color: var(--pag-tone, var(--gob-primary));
}

.item:disabled,
.navBtn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.navBtn {
  color: var(--pag-tone, var(--gob-primary));
}

.icon {
  width: 16px;
  height: 16px;
  display: inline-block;
}

.root[data-size="sm"] {
  --pag-size: 34px;
  font-size: 13px;
}

.root[data-size="md"] {
  --pag-size: 40px;
  font-size: 14px;
}

.root[data-size="lg"] {
  --pag-size: 46px;
  font-size: 15px;
}

.root[data-tone="primary"] { --pag-tone: var(--gob-primary, #9f2141); }
.root[data-tone="accent"] { --pag-tone: var(--gob-accent, #bc945a); }
.root[data-tone="dark"] { --pag-tone: #181511; }
.root[data-tone="neutral"] { --pag-tone: #8a8278; }
.root[data-tone="soft"] { --pag-tone: #c4a574; }

.root[data-variant="outline"] .item,
.root[data-variant="outline"] .navBtn,
.root[data-variant="arrows"] .item,
.root[data-variant="ellipsis"] .item,
.root[data-variant="edges"] .item,
.root[data-variant="basic"] .item {
  border-color: var(--gob-border, #e2ddd4);
  background: rgba(255, 255, 255, 0.72);
}

.root[data-variant="outline"] .item[aria-current="page"],
.root[data-variant="arrows"] .item[aria-current="page"],
.root[data-variant="ellipsis"] .item[aria-current="page"],
.root[data-variant="edges"] .item[aria-current="page"],
.root[data-variant="basic"] .item[aria-current="page"] {
  background: var(--pag-tone, var(--gob-primary));
  border-color: var(--pag-tone, var(--gob-primary));
  color: #fff;
}

.root[data-variant="pills"] .item,
.root[data-variant="pills"] .navBtn {
  border-radius: 999px;
  border-color: var(--gob-border, #e2ddd4);
  background: rgba(255, 255, 255, 0.8);
}

.root[data-variant="pills"] .item[aria-current="page"] {
  background: var(--pag-tone, var(--gob-primary));
  border-color: transparent;
  color: #fff;
}

.root[data-variant="compact"] .meta,
.root[data-variant="text"] .meta,
.root[data-variant="jump"] .meta {
  min-height: var(--pag-size, 40px);
  padding: 0 10px;
}

.root[data-variant="icons"] .navBtn {
  border-color: var(--gob-border, #e2ddd4);
  background: rgba(255, 255, 255, 0.8);
  color: var(--gob-text);
}

.root[data-variant="icons"] .navBtn:hover {
  border-color: var(--pag-tone, var(--gob-primary));
  color: var(--pag-tone, var(--gob-primary));
}

.root[data-variant="text"] .navBtn {
  min-width: auto;
  padding: 0 14px;
  border-color: transparent;
  background: transparent;
  color: var(--pag-tone, var(--gob-primary));
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Simple: Anterior / Siguiente relleno */
.root[data-variant="simple"] {
  gap: 10px;
}

.root[data-variant="simple"] .navBtn {
  min-width: auto;
  padding: 0 18px;
  background: var(--pag-tone, var(--gob-primary));
  border-color: var(--pag-tone, var(--gob-primary));
  color: #fff;
}

.root[data-variant="simple"] .navBtn:hover:not(:disabled) {
  filter: brightness(1.08);
  background: var(--pag-tone, var(--gob-primary));
}

.root[data-variant="simple"] .navBtn:disabled {
  opacity: 0.4;
  filter: none;
}

/* Group: numeros unidos tipo segmented */
.root[data-variant="group"] {
  gap: 8px;
}

.root[data-variant="group"] .groupTrack {
  display: inline-flex;
  align-items: stretch;
  gap: 0;
}

.root[data-variant="group"] .groupTrack .item,
.root[data-variant="group"] .groupTrack .ellipsis {
  border-radius: 0;
  border-color: var(--gob-border, #e2ddd4);
  background: #fff;
  margin-left: -1px;
  min-width: var(--pag-size, 40px);
}

.root[data-variant="group"] .groupTrack > :first-child {
  border-radius: 10px 0 0 10px;
  margin-left: 0;
}

.root[data-variant="group"] .groupTrack > :last-child {
  border-radius: 0 10px 10px 0;
}

.root[data-variant="group"] .groupTrack > :only-child {
  border-radius: 10px;
}

.root[data-variant="group"] .item[aria-current="page"] {
  background: var(--pag-tone, var(--gob-primary));
  border-color: var(--pag-tone, var(--gob-primary));
  color: #fff;
  z-index: 1;
  position: relative;
}

.root[data-variant="group"] .navBtn {
  border-color: var(--gob-border, #e2ddd4);
  background: #fff;
  color: var(--gob-text);
}

.root[data-variant="group"] .navBtn:hover:not(:disabled) {
  border-color: var(--pag-tone, var(--gob-primary));
  color: var(--pag-tone, var(--gob-primary));
}

/* Summary: rango de resultados + flechas */
.root[data-variant="summary"] .meta {
  min-height: var(--pag-size, 40px);
  padding: 0 14px;
  font-weight: 600;
  color: var(--gob-text-muted, #6b655c);
}

.root[data-variant="summary"] .navBtn {
  border-color: var(--gob-border, #e2ddd4);
  background: #fff;
  color: var(--gob-text);
}

.root[data-variant="summary"] .navBtn:hover:not(:disabled) {
  border-color: var(--pag-tone, var(--gob-primary));
  color: var(--pag-tone, var(--gob-primary));
  background: color-mix(in srgb, var(--pag-tone, var(--gob-primary)) 8%, #fff);
}

.jumpInput {
  width: 64px;
  min-width: 64px;
  text-align: center;
  border-color: var(--gob-border, #e2ddd4);
  background: #fff;
  cursor: text;
  font-weight: 700;
  color: var(--gob-text);
}

.jumpInput::-webkit-outer-spin-button,
.jumpInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.jumpInput[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
`;

// src/components/pagination/gob-pagination.element.ts
var CHEVRON_LEFT = `<svg class="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3.5L5.5 8L10 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
var CHEVRON_RIGHT = `<svg class="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
var CHEVRONS_LEFT = `<svg class="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8.5 3.5L4 8L8.5 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 3.5L7.5 8L12 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
var CHEVRONS_RIGHT = `<svg class="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M7.5 3.5L12 8L7.5 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 3.5L8.5 8L4 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
var GobPaginationElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "navEl");
    __publicField(this, "handleClick", (event) => {
      const target = event.target;
      const button = target?.closest("[data-page]");
      if (!button || button.hasAttribute("disabled") || this.hasAttribute("disabled")) {
        return;
      }
      const next = Number.parseInt(button.dataset.page || "", 10);
      if (!Number.isFinite(next) || next < 1 || next > this.total || next === this.page) {
        return;
      }
      this.setAttribute("page", String(next));
      this.dispatchEvent(
        new CustomEvent("gob-page-change", {
          bubbles: true,
          composed: true,
          detail: { page: next }
        })
      );
    });
    __publicField(this, "handleKeydown", (event) => {
      if (event.key !== "Enter") {
        return;
      }
      const input = event.target;
      if (!input || input.tagName !== "INPUT") {
        return;
      }
      event.preventDefault();
      const next = Number.parseInt(input.value || "", 10);
      if (!Number.isFinite(next) || next < 1 || next > this.total || next === this.page) {
        input.value = String(this.page);
        return;
      }
      this.setAttribute("page", String(next));
      this.dispatchEvent(
        new CustomEvent("gob-page-change", {
          bubbles: true,
          composed: true,
          detail: { page: next }
        })
      );
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = paginationStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.navEl = document.createElement("nav");
    this.rootEl.appendChild(this.navEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...PAGINATION_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.navEl.addEventListener("click", this.handleClick);
    this.navEl.addEventListener("keydown", this.handleKeydown);
    this.render();
  }
  disconnectedCallback() {
    this.navEl.removeEventListener("click", this.handleClick);
    this.navEl.removeEventListener("keydown", this.handleKeydown);
  }
  attributeChangedCallback() {
    this.render();
  }
  get page() {
    return Math.min(parsePositiveInt(this.getAttribute("page"), 1), this.total);
  }
  set page(value) {
    const next = String(value);
    if (this.getAttribute("page") === next) {
      return;
    }
    this.setAttribute("page", next);
  }
  get total() {
    return parsePositiveInt(this.getAttribute("total"), 1);
  }
  set total(value) {
    const next = String(value);
    if (this.getAttribute("total") === next) {
      return;
    }
    this.setAttribute("total", next);
  }
  get variant() {
    return resolveVariant(this.getAttribute("variant"));
  }
  set variant(value) {
    const next = String(value);
    if (this.getAttribute("variant") === next) {
      return;
    }
    this.setAttribute("variant", next);
  }
  get tone() {
    return resolveTone2(this.getAttribute("tone"));
  }
  set tone(value) {
    const next = String(value);
    if (this.getAttribute("tone") === next) {
      return;
    }
    this.setAttribute("tone", next);
  }
  get lang() {
    return resolveLang(this.getAttribute("lang"));
  }
  set lang(value) {
    const next = String(value);
    if (this.getAttribute("lang") === next) {
      return;
    }
    this.setAttribute("lang", next);
  }
  get currentLang() {
    return this.lang;
  }
  createNavButton(opts) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "navBtn";
    button.dataset.page = String(opts.page);
    button.setAttribute("aria-label", opts.label);
    if (opts.disabled) {
      button.disabled = true;
    }
    if (opts.icon) {
      button.innerHTML = opts.icon;
      if (!opts.iconOnly) {
        const text = document.createElement("span");
        text.textContent = opts.label;
        button.appendChild(text);
      }
    } else {
      button.textContent = opts.label;
    }
    return button;
  }
  createPageButton(page, current) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "item";
    button.dataset.page = String(page);
    button.textContent = String(page);
    button.setAttribute("aria-label", `${LABELS[this.currentLang].goTo} ${page}`);
    if (page === current) {
      button.setAttribute("aria-current", "page");
    }
    return button;
  }
  createEllipsis() {
    const span = document.createElement("span");
    span.className = "ellipsis";
    span.setAttribute("aria-hidden", "true");
    span.textContent = "\u2026";
    return span;
  }
  createMeta(text) {
    const span = document.createElement("span");
    span.className = "meta";
    span.textContent = text;
    return span;
  }
  appendPageItems(items, current, into = this.navEl) {
    for (const item of items) {
      if (item === "ellipsis") {
        into.appendChild(this.createEllipsis());
      } else {
        into.appendChild(this.createPageButton(item, current));
      }
    }
  }
  render() {
    const page = this.page;
    const total = this.total;
    const variant = resolveVariant(this.getAttribute("variant"));
    const tone = resolveTone2(this.getAttribute("tone"));
    const size = resolveSize(this.getAttribute("size"));
    const lang = this.currentLang;
    const labels = LABELS[lang];
    const siblingCount = parsePositiveInt(this.getAttribute("sibling-count"), 1);
    const boundaryCount = parsePositiveInt(this.getAttribute("boundary-count"), 1);
    const disabled = this.hasAttribute("disabled");
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.size = size;
    const ariaLabel = this.getAttribute("aria-label") || labels.nav;
    this.navEl.setAttribute("aria-label", ariaLabel);
    this.navEl.replaceChildren();
    const atStart = page <= 1;
    const atEnd = page >= total;
    if (variant === "icons") {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled
        }),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled
        })
      );
      return;
    }
    if (variant === "simple") {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          disabled: atStart || disabled
        }),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          disabled: atEnd || disabled
        })
      );
      return;
    }
    if (variant === "summary") {
      const pageSize = parsePositiveInt(this.getAttribute("page-size"), 10);
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled
        }),
        this.createMeta(labels.summary(page, total, pageSize)),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled
        })
      );
      return;
    }
    if (variant === "compact") {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled
        }),
        this.createMeta(labels.pageOf(page, total)),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled
        })
      );
      return;
    }
    if (variant === "text") {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          disabled: atStart || disabled
        }),
        this.createMeta(`${page} / ${total}`),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          disabled: atEnd || disabled
        })
      );
      return;
    }
    if (variant === "jump") {
      const input = document.createElement("input");
      input.className = "jumpInput";
      input.type = "number";
      input.min = "1";
      input.max = String(total);
      input.value = String(page);
      input.setAttribute("aria-label", labels.goTo);
      if (disabled) {
        input.disabled = true;
      }
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled
        }),
        input,
        this.createMeta(`${labels.of} ${total}`),
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled
        })
      );
      return;
    }
    if (variant === "edges") {
      this.navEl.append(
        this.createNavButton({
          page: 1,
          label: labels.first,
          icon: CHEVRONS_LEFT,
          iconOnly: true,
          disabled: atStart || disabled
        }),
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled
        })
      );
      this.appendPageItems(buildPageItems(page, total, siblingCount, boundaryCount, true), page);
      this.navEl.append(
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled
        }),
        this.createNavButton({
          page: total,
          label: labels.last,
          icon: CHEVRONS_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled
        })
      );
      return;
    }
    if (variant === "arrows" || variant === "ellipsis" || variant === "outline" || variant === "pills" || variant === "group") {
      this.navEl.append(
        this.createNavButton({
          page: page - 1,
          label: labels.previous,
          icon: CHEVRON_LEFT,
          iconOnly: true,
          disabled: atStart || disabled
        })
      );
      if (variant === "group") {
        const track = document.createElement("span");
        track.className = "groupTrack";
        this.appendPageItems(
          buildPageItems(page, total, siblingCount, boundaryCount, true),
          page,
          track
        );
        this.navEl.appendChild(track);
      } else {
        this.appendPageItems(
          buildPageItems(page, total, siblingCount, boundaryCount, variant === "ellipsis" || total > 7),
          page
        );
      }
      this.navEl.append(
        this.createNavButton({
          page: page + 1,
          label: labels.next,
          icon: CHEVRON_RIGHT,
          iconOnly: true,
          disabled: atEnd || disabled
        })
      );
      return;
    }
    this.appendPageItems(buildPageItems(page, total, siblingCount, boundaryCount, false), page);
  }
};
defineCustomElement("gob-pagination", GobPaginationElement);

// src/components/app-shell/app-shell-constants.ts
var APP_SHELL_OBSERVED_ATTRIBUTES = [
  "collapsed",
  "sticky-topbar",
  "dense",
  "hide-topbar"
];

// src/components/app-shell/app-shell-styles.ts
var appShellStyles = `
:host {
  display: block;
  width: 100%;
  min-height: 100%;
  color: var(--gob-text, #181511);
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  grid-template-columns: var(--gob-shell-sidebar-width, 248px) minmax(0, 1fr);
  min-height: inherit;
  background: var(--gob-bg, #fafafa);
}

.root[data-collapsed="true"] {
  grid-template-columns: var(--gob-shell-sidebar-collapsed-width, 72px) minmax(0, 1fr);
}

.sidebar {
  position: sticky;
  top: 0;
  align-self: start;
  height: var(--gob-shell-frame-height, 100vh);
  overflow: auto;
  border-right: 1px solid var(--gob-shell-sidebar-border, var(--gob-border, rgba(24, 21, 17, 0.1)));
  background: var(--gob-shell-sidebar-bg, var(--gob-surface, #fff));
  color: var(--gob-shell-sidebar-text, var(--gob-text, #181511));
}

.column {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-width: 0;
  min-height: var(--gob-shell-frame-height, 100vh);
}

.root[data-hide-topbar="true"] .column {
  grid-template-rows: minmax(0, 1fr);
}

.topbar {
  z-index: 2;
  border-bottom: 1px solid var(--gob-border, rgba(24, 21, 17, 0.1));
  background: var(--gob-surface, #fff);
}

.topbar[data-sticky="true"] {
  position: sticky;
  top: 0;
}

.root[data-hide-topbar="true"] .topbar {
  display: none;
}

.content {
  min-width: 0;
  padding: var(--gob-shell-content-padding, 24px);
}

.root[data-dense="true"] {
  --gob-shell-sidebar-width: 220px;
  --gob-shell-content-padding: 16px;
}

@media (max-width: 900px) {
  .root,
  .root[data-collapsed="true"] {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: relative;
    height: auto;
    max-height: none;
    border-right: 0;
    border-bottom: 1px solid var(--gob-border, rgba(24, 21, 17, 0.1));
  }

  .column {
    min-height: 0;
  }
}
`;

// src/components/app-shell/gob-app-shell.element.ts
var GobAppShellElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "topbarEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = appShellStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    sidebar.setAttribute("part", "sidebar");
    const sidebarSlot = document.createElement("slot");
    sidebarSlot.name = "sidebar";
    sidebar.appendChild(sidebarSlot);
    const column = document.createElement("div");
    column.className = "column";
    this.topbarEl = document.createElement("header");
    this.topbarEl.className = "topbar";
    this.topbarEl.setAttribute("part", "topbar");
    const topbarSlot = document.createElement("slot");
    topbarSlot.name = "topbar";
    this.topbarEl.appendChild(topbarSlot);
    const content = document.createElement("main");
    content.className = "content";
    content.setAttribute("part", "content");
    content.appendChild(document.createElement("slot"));
    column.append(this.topbarEl, content);
    this.rootEl.append(sidebar, column);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...APP_SHELL_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const collapsed = this.hasAttribute("collapsed");
    const dense = this.hasAttribute("dense");
    const hideTopbar = this.hasAttribute("hide-topbar");
    const sticky = this.getAttribute("sticky-topbar") !== "false";
    this.rootEl.dataset.collapsed = collapsed ? "true" : "false";
    this.rootEl.dataset.dense = dense ? "true" : "false";
    this.rootEl.dataset.hideTopbar = hideTopbar ? "true" : "false";
    this.topbarEl.dataset.sticky = sticky ? "true" : "false";
  }
};
defineCustomElement("gob-app-shell", GobAppShellElement);

// src/components/sidebar/sidebar-constants.ts
var SIDEBAR_OBSERVED_ATTRIBUTES = ["variant", "tone", "collapsed"];
function resolveSidebarVariant(value) {
  if (value === "collapsed" || value === "brand" || value === "grouped" || value === "user" || value === "dense" || value === "badges") {
    return value;
  }
  return "basic";
}
function resolveSidebarTone(value) {
  if (value === "accent" || value === "dark" || value === "neutral" || value === "soft" || value === "primary") {
    return value;
  }
  return "primary";
}

// src/components/sidebar/sidebar-styles.ts
var sidebarStyles = `
:host {
  display: block;
  width: var(--gob-sidebar-width, 248px);
  height: 100%;
  min-height: inherit;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-sidebar-text, #6b665f);
  transition: width 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  position: relative;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 14px;
  width: 100%;
  height: 100%;
  min-height: inherit;
  padding: 16px 12px 12px;
  border-right: 1px solid var(--gob-sidebar-border, rgba(24, 21, 17, 0.1));
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, #fff 7%, transparent) 0%,
      transparent 42%
    ),
    var(--gob-sidebar-bg, #fff);
  color: var(--gob-sidebar-text, #6b665f);
  transition: padding 240ms ease, gap 240ms ease;
}

:host([collapsed]) {
  width: var(--gob-sidebar-collapsed-width, 80px);
}

.root[data-collapsed="true"] {
  padding: 14px 10px 12px;
  gap: 12px;
  justify-items: stretch;
}

.root[data-variant="dense"] {
  gap: 8px;
  padding: 12px 8px 10px;
  --gob-sidebar-width: 212px;
}

:host([variant="dense"]:not([collapsed])) {
  width: var(--gob-sidebar-width, 212px);
}

.root[data-variant="brand"] {
  gap: 16px;
  padding-top: 18px;
}

.brand {
  min-width: 0;
}

.nav {
  display: grid;
  gap: 3px;
  align-content: start;
  min-height: 0;
  overflow: auto;
  padding-right: 2px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.nav::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

.footer {
  min-width: 0;
}

.root[data-collapsed="true"] .brand,
.root[data-collapsed="true"] .footer {
  width: 100%;
  display: grid;
  justify-items: center;
}

.root[data-collapsed="true"] .nav {
  justify-items: center;
  gap: 6px;
}

/* Tones */
:host([tone='primary']),
:host(:not([tone])) {
  --gob-sidebar-bg: #9f2141;
  --gob-sidebar-text: rgba(255, 255, 255, 0.86);
  --gob-sidebar-muted: rgba(255, 255, 255, 0.58);
  --gob-sidebar-active-bg: rgba(255, 255, 255, 0.16);
  --gob-sidebar-active-text: #fff;
  --gob-sidebar-border: rgba(255, 255, 255, 0.14);
  --gob-sidebar-accent: #9f2141;
  --gob-sidebar-hover: rgba(255, 255, 255, 0.08);
}

:host([tone='accent']) {
  --gob-sidebar-bg: #f3ebe0;
  --gob-sidebar-text: #53493e;
  --gob-sidebar-muted: #8a8278;
  --gob-sidebar-active-bg: rgba(188, 148, 90, 0.26);
  --gob-sidebar-active-text: #6f5128;
  --gob-sidebar-border: rgba(24, 21, 17, 0.08);
  --gob-sidebar-accent: #bc945a;
  --gob-sidebar-hover: rgba(24, 21, 17, 0.05);
}

:host([tone='dark']) {
  --gob-sidebar-bg: #181511;
  --gob-sidebar-text: rgba(255, 255, 255, 0.82);
  --gob-sidebar-muted: rgba(255, 255, 255, 0.48);
  --gob-sidebar-active-bg: rgba(255, 255, 255, 0.12);
  --gob-sidebar-active-text: #fff;
  --gob-sidebar-border: rgba(255, 255, 255, 0.1);
  --gob-sidebar-accent: #181511;
  --gob-sidebar-hover: rgba(255, 255, 255, 0.06);
}

:host([tone='neutral']) {
  --gob-sidebar-bg: #fff;
  --gob-sidebar-text: #5f5952;
  --gob-sidebar-muted: #9a9590;
  --gob-sidebar-active-bg: rgba(159, 33, 65, 0.1);
  --gob-sidebar-active-text: #9f2141;
  --gob-sidebar-border: rgba(24, 21, 17, 0.08);
  --gob-sidebar-accent: #9f2141;
  --gob-sidebar-hover: rgba(24, 21, 17, 0.04);
}

:host([tone='soft']) {
  --gob-sidebar-bg: #e7d7bd;
  --gob-sidebar-text: #463d31;
  --gob-sidebar-muted: #7a6f60;
  --gob-sidebar-active-bg: rgba(159, 33, 65, 0.12);
  --gob-sidebar-active-text: #9f2141;
  --gob-sidebar-border: rgba(24, 21, 17, 0.08);
  --gob-sidebar-accent: #9f2141;
  --gob-sidebar-hover: rgba(24, 21, 17, 0.05);
}

::slotted([data-active="true"]),
::slotted(.is-active) {
  background: var(--gob-sidebar-active-bg, rgba(159, 33, 65, 0.1)) !important;
  color: var(--gob-sidebar-active-text, #9f2141) !important;
}

::slotted(a),
::slotted(button),
::slotted([data-nav]) {
  color: inherit;
}
`;

// src/components/sidebar/gob-sidebar.element.ts
var GobSidebarElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = sidebarStyles;
    this.rootEl = document.createElement("aside");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    const brand = document.createElement("div");
    brand.className = "brand";
    brand.setAttribute("part", "brand");
    const brandSlot = document.createElement("slot");
    brandSlot.name = "brand";
    brand.appendChild(brandSlot);
    const nav = document.createElement("nav");
    nav.className = "nav";
    nav.setAttribute("part", "nav");
    nav.setAttribute("aria-label", "Principal");
    nav.appendChild(document.createElement("slot"));
    const footer = document.createElement("div");
    footer.className = "footer";
    footer.setAttribute("part", "footer");
    const footerSlot = document.createElement("slot");
    footerSlot.name = "footer";
    footer.appendChild(footerSlot);
    this.rootEl.append(brand, nav, footer);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...SIDEBAR_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const variant = resolveSidebarVariant(this.getAttribute("variant"));
    const tone = resolveSidebarTone(this.getAttribute("tone"));
    const collapsed = this.hasAttribute("collapsed");
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.collapsed = collapsed ? "true" : "false";
    this.setAttribute("aria-expanded", collapsed ? "false" : "true");
  }
};
defineCustomElement("gob-sidebar", GobSidebarElement);

// src/components/topbar/topbar-constants.ts
var TOPBAR_OBSERVED_ATTRIBUTES = ["variant", "tone", "sticky"];
function resolveTopbarVariant(value) {
  if (value === "search" || value === "actions" || value === "notifications" || value === "breadcrumb" || value === "dense" || value === "complete") {
    return value;
  }
  return "basic";
}
function resolveTopbarTone(value) {
  if (value === "accent" || value === "dark" || value === "neutral" || value === "soft" || value === "primary") {
    return value;
  }
  return "primary";
}

// src/components/topbar/topbar-styles.ts
var topbarStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-topbar-text, #6b665f);
  --gob-topbar-bg: #ffffff;
  --gob-topbar-bg-2: #fbfbfb;
  --gob-topbar-text: #6b665f;
  --gob-topbar-muted: #8a8278;
  --gob-topbar-title: #181511;
  --gob-topbar-border: rgba(24, 21, 17, 0.08);
  --gob-topbar-accent: #9f2141;
  --gob-topbar-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-topbar-accent-text: #9f2141;
  --gob-topbar-surface: #fafafa;
  --gob-topbar-surface-border: #ebebeb;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  min-height: var(--gob-topbar-height, 60px);
  padding: 0 18px;
  border-bottom: 1px solid var(--gob-topbar-border);
  background: linear-gradient(180deg, var(--gob-topbar-bg) 0%, var(--gob-topbar-bg-2) 100%);
  color: var(--gob-topbar-text);
}

.root[data-sticky="true"] {
  position: sticky;
  top: 0;
  z-index: 3;
}

.root[data-variant="dense"] {
  --gob-topbar-height: 48px;
  padding: 0 14px;
  gap: 10px;
}

.root[data-variant="complete"],
.root[data-variant="search"] {
  grid-template-columns: minmax(0, 1.1fr) minmax(160px, 1.4fr) minmax(0, 1.1fr);
}

.start,
.center,
.end {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 10px;
}

.start {
  justify-content: flex-start;
}

.center {
  justify-content: center;
}

.end {
  justify-content: flex-end;
}

/* Tones on :host (light DOM inherits) and .root[data-tone] (shadow bg) */
:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-topbar-bg: #ffffff;
  --gob-topbar-bg-2: #fbfbfb;
  --gob-topbar-text: #6b665f;
  --gob-topbar-muted: #8a8278;
  --gob-topbar-title: #181511;
  --gob-topbar-border: rgba(24, 21, 17, 0.08);
  --gob-topbar-accent: #9f2141;
  --gob-topbar-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-topbar-accent-text: #9f2141;
  --gob-topbar-surface: #fafafa;
  --gob-topbar-surface-border: #ebebeb;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-topbar-bg: #f7f1e8;
  --gob-topbar-bg-2: #f3ebe0;
  --gob-topbar-text: #5c5348;
  --gob-topbar-muted: #8a8278;
  --gob-topbar-title: #3f372e;
  --gob-topbar-border: rgba(24, 21, 17, 0.08);
  --gob-topbar-accent: #bc945a;
  --gob-topbar-accent-soft: rgba(188, 148, 90, 0.22);
  --gob-topbar-accent-text: #7a5a2e;
  --gob-topbar-surface: rgba(255, 255, 255, 0.65);
  --gob-topbar-surface-border: rgba(24, 21, 17, 0.1);
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-topbar-bg: #181511;
  --gob-topbar-bg-2: #221e19;
  --gob-topbar-text: rgba(255, 255, 255, 0.72);
  --gob-topbar-muted: rgba(255, 255, 255, 0.5);
  --gob-topbar-title: #ffffff;
  --gob-topbar-border: rgba(255, 255, 255, 0.1);
  --gob-topbar-accent: #ffffff;
  --gob-topbar-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-topbar-accent-text: #181511;
  --gob-topbar-surface: rgba(255, 255, 255, 0.08);
  --gob-topbar-surface-border: rgba(255, 255, 255, 0.12);
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-topbar-bg: #ebebeb;
  --gob-topbar-bg-2: #e4e4e4;
  --gob-topbar-text: #5f5952;
  --gob-topbar-muted: #8a8278;
  --gob-topbar-title: #181511;
  --gob-topbar-border: rgba(24, 21, 17, 0.12);
  --gob-topbar-accent: #9f2141;
  --gob-topbar-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-topbar-accent-text: #9f2141;
  --gob-topbar-surface: #f5f5f5;
  --gob-topbar-surface-border: #d0d0d0;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-topbar-bg: #e7d7bd;
  --gob-topbar-bg-2: #dfc9a8;
  --gob-topbar-text: #5a4f42;
  --gob-topbar-muted: #7a6f60;
  --gob-topbar-title: #2f2922;
  --gob-topbar-border: rgba(24, 21, 17, 0.12);
  --gob-topbar-accent: #9f2141;
  --gob-topbar-accent-soft: rgba(159, 33, 65, 0.16);
  --gob-topbar-accent-text: #9f2141;
  --gob-topbar-surface: rgba(255, 255, 255, 0.42);
  --gob-topbar-surface-border: rgba(24, 21, 17, 0.12);
}

@media (max-width: 720px) {
  .root,
  .root[data-variant="complete"],
  .root[data-variant="search"] {
    grid-template-columns: minmax(0, 1fr) auto;
    min-height: 56px;
  }

  .center {
    display: none;
  }
}
`;

// src/components/topbar/gob-topbar.element.ts
var GobTopbarElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = topbarStyles;
    this.rootEl = document.createElement("header");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    const start = document.createElement("div");
    start.className = "start";
    start.setAttribute("part", "start");
    const startSlot = document.createElement("slot");
    startSlot.name = "start";
    start.appendChild(startSlot);
    const center = document.createElement("div");
    center.className = "center";
    center.setAttribute("part", "center");
    const centerSlot = document.createElement("slot");
    centerSlot.name = "center";
    center.appendChild(centerSlot);
    const end = document.createElement("div");
    end.className = "end";
    end.setAttribute("part", "end");
    end.appendChild(document.createElement("slot"));
    this.rootEl.append(start, center, end);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...TOPBAR_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const variant = resolveTopbarVariant(this.getAttribute("variant"));
    const tone = resolveTopbarTone(this.getAttribute("tone"));
    const sticky = this.getAttribute("sticky") !== "false";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.sticky = sticky ? "true" : "false";
  }
};
defineCustomElement("gob-topbar", GobTopbarElement);

// src/components/page-header/page-header-constants.ts
var PAGE_HEADER_OBSERVED_ATTRIBUTES = ["variant", "surface"];
function resolvePageHeaderVariant(value) {
  if (value === "description" || value === "breadcrumb" || value === "actions" || value === "status" || value === "dense" || value === "complete") {
    return value;
  }
  return "basic";
}
function resolvePageHeaderSurface(value) {
  if (value === "panel") return "panel";
  return "plain";
}

// src/components/page-header/page-header-styles.ts
var pageHeaderStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-ph-text, #6b665f);
  background: transparent;
  border: 0;
  border-radius: 0;
  --gob-ph-bg: #ffffff;
  --gob-ph-bg-2: #fbfbfb;
  --gob-ph-text: #6b665f;
  --gob-ph-muted: #8a8278;
  --gob-ph-title: #181511;
  --gob-ph-border: rgba(24, 21, 17, 0.1);
  --gob-ph-accent: #9f2141;
  --gob-ph-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-ph-accent-text: #9f2141;
  --gob-ph-surface: #f5f5f5;
  --gob-ph-surface-border: #e5e5e5;
  --gob-ph-gap: 14px;
  --gob-ph-title-size: 1.65rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  gap: var(--gob-ph-gap);
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--gob-ph-text);
}

/* Solo con surface=panel aparece el contenedor */
:host([surface='panel']) .root,
.root[data-surface='panel'] {
  padding: 18px 18px 16px;
  border-radius: 16px;
  border: 1px solid var(--gob-ph-border);
  background: linear-gradient(180deg, var(--gob-ph-bg) 0%, var(--gob-ph-bg-2) 100%);
}

.top {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px 20px;
}

.main {
  display: grid;
  gap: 8px;
  min-width: 0;
  flex: 1 1 220px;
}

.breadcrumb {
  min-width: 0;
}

.titleRow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  min-width: 0;
}

.title {
  min-width: 0;
  margin: 0;
  font-size: var(--gob-ph-title-size);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--gob-ph-title);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.description {
  min-width: 0;
  max-width: 62ch;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.55;
  color: var(--gob-ph-muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex: 0 1 auto;
}

::slotted(h1),
::slotted(h2),
::slotted([slot='title']) {
  margin: 0;
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
}

::slotted(p),
::slotted([slot='description']) {
  margin: 0;
  font: inherit;
  color: inherit;
  line-height: inherit;
}

.root[data-variant='dense'] {
  --gob-ph-gap: 8px;
  --gob-ph-title-size: 1.25rem;
}

.root[data-variant='dense'] .description {
  font-size: 13px;
}

.root[data-variant='actions'] .top,
.root[data-variant='complete'] .top {
  align-items: center;
}

@media (max-width: 720px) {
  .top {
    flex-direction: column;
    align-items: stretch;
  }

  .actions {
    justify-content: flex-start;
  }

  :host {
    --gob-ph-title-size: 1.4rem;
  }

  .root[data-variant='dense'] {
    --gob-ph-title-size: 1.15rem;
  }
}
`;

// src/components/page-header/gob-page-header.element.ts
var GobPageHeaderElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = pageHeaderStyles;
    this.rootEl = document.createElement("header");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    const breadcrumb = document.createElement("div");
    breadcrumb.className = "breadcrumb";
    breadcrumb.setAttribute("part", "breadcrumb");
    const breadcrumbSlot = document.createElement("slot");
    breadcrumbSlot.name = "breadcrumb";
    breadcrumb.appendChild(breadcrumbSlot);
    const top = document.createElement("div");
    top.className = "top";
    top.setAttribute("part", "top");
    const main = document.createElement("div");
    main.className = "main";
    main.setAttribute("part", "main");
    const titleRow = document.createElement("div");
    titleRow.className = "titleRow";
    titleRow.setAttribute("part", "title-row");
    const title = document.createElement("div");
    title.className = "title";
    title.setAttribute("part", "title");
    const titleSlot = document.createElement("slot");
    titleSlot.name = "title";
    title.appendChild(titleSlot);
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.setAttribute("part", "meta");
    const metaSlot = document.createElement("slot");
    metaSlot.name = "meta";
    meta.appendChild(metaSlot);
    titleRow.append(title, meta);
    const description = document.createElement("div");
    description.className = "description";
    description.setAttribute("part", "description");
    const descriptionSlot = document.createElement("slot");
    descriptionSlot.name = "description";
    description.appendChild(descriptionSlot);
    main.append(titleRow, description);
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.setAttribute("part", "actions");
    actions.appendChild(document.createElement("slot"));
    top.append(main, actions);
    this.rootEl.append(breadcrumb, top);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...PAGE_HEADER_OBSERVED_ATTRIBUTES];
  }
  get surface() {
    return resolvePageHeaderSurface(this.getAttribute("surface"));
  }
  set surface(value) {
    const next = resolvePageHeaderSurface(value == null ? null : String(value));
    if (next === "plain") {
      this.setAttribute("surface", "plain");
    } else {
      this.setAttribute("surface", next);
    }
  }
  connectedCallback() {
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const variant = resolvePageHeaderVariant(this.getAttribute("variant"));
    const surface = resolvePageHeaderSurface(this.getAttribute("surface"));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.surface = surface;
  }
};
defineCustomElement("gob-page-header", GobPageHeaderElement);

// src/components/breadcrumb/breadcrumb-constants.ts
var BREADCRUMB_OBSERVED_ATTRIBUTES = ["variant", "tone"];
function resolveBreadcrumbVariant(value) {
  if (value === "chevron" || value === "icons" || value === "collapsed" || value === "underline" || value === "dense" || value === "complete" || value === "dot" || value === "arrow" || value === "back") {
    return value;
  }
  return "basic";
}
function resolveBreadcrumbTone(value) {
  if (value === "accent" || value === "dark" || value === "neutral" || value === "soft" || value === "primary") {
    return value;
  }
  return "primary";
}

// src/components/breadcrumb/breadcrumb-styles.ts
var breadcrumbStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-bc-text, #6b665f);
  --gob-bc-text: #6b665f;
  --gob-bc-muted: #8a8278;
  --gob-bc-current: #181511;
  --gob-bc-accent: #9f2141;
  --gob-bc-sep: '/';
  --gob-bc-gap: 8px;
  --gob-bc-size: 13px;
  --gob-bc-weight: 500;
  --gob-bc-bg: transparent;
  --gob-bc-pad-y: 0;
  --gob-bc-pad-x: 0;
  --gob-bc-radius: 0;
  --gob-bc-border: transparent;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gob-bc-gap);
  min-height: 28px;
  padding: var(--gob-bc-pad-y) var(--gob-bc-pad-x);
  border-radius: var(--gob-bc-radius);
  border: 1px solid var(--gob-bc-border);
  background: var(--gob-bc-bg);
  color: var(--gob-bc-text);
  font-size: var(--gob-bc-size);
  font-weight: var(--gob-bc-weight);
  line-height: 1.3;
}

::slotted(a),
::slotted(button),
::slotted([data-crumb]) {
  color: var(--gob-bc-text);
  text-decoration: none;
  font: inherit;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}

::slotted(a:hover),
::slotted(button:hover),
::slotted([data-crumb]:hover) {
  color: var(--gob-bc-accent);
}

::slotted([aria-current='page']),
::slotted(strong),
::slotted([data-current]) {
  color: var(--gob-bc-current);
  font-weight: 700;
  pointer-events: none;
  cursor: default;
}

::slotted([data-sep]) {
  color: var(--gob-bc-muted);
  font-weight: 500;
  user-select: none;
  pointer-events: none;
}

.root[data-variant='basic'],
.root[data-variant='icons'],
.root[data-variant='collapsed'],
.root[data-variant='complete'],
.root[data-variant='back'] {
  --gob-bc-sep: '/';
}

.root[data-variant='chevron'] {
  --gob-bc-sep: '\u203A';
  --gob-bc-gap: 6px;
}

.root[data-variant='dot'] {
  --gob-bc-sep: '\xB7';
  --gob-bc-gap: 10px;
}

.root[data-variant='arrow'] {
  --gob-bc-sep: '\u2192';
  --gob-bc-gap: 8px;
}

.root[data-variant='underline'] {
  --gob-bc-sep: '/';
}

.root[data-variant='dense'] {
  --gob-bc-size: 12px;
  --gob-bc-gap: 6px;
}

.root[data-variant='complete'] {
  --gob-bc-pad-y: 10px;
  --gob-bc-pad-x: 14px;
  --gob-bc-radius: 12px;
  --gob-bc-bg: color-mix(in srgb, var(--gob-bc-accent) 6%, #fff);
  --gob-bc-border: color-mix(in srgb, var(--gob-bc-accent) 14%, transparent);
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-bc-text: #6b665f;
  --gob-bc-muted: #8a8278;
  --gob-bc-current: #181511;
  --gob-bc-accent: #9f2141;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-bc-text: #5c5348;
  --gob-bc-muted: #8a8278;
  --gob-bc-current: #3f372e;
  --gob-bc-accent: #bc945a;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-bc-text: rgba(255, 255, 255, 0.72);
  --gob-bc-muted: rgba(255, 255, 255, 0.45);
  --gob-bc-current: #ffffff;
  --gob-bc-accent: #ffffff;
  --gob-bc-bg: #181511;
  --gob-bc-border: rgba(255, 255, 255, 0.1);
  --gob-bc-pad-y: 10px;
  --gob-bc-pad-x: 14px;
  --gob-bc-radius: 12px;
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-bc-text: #5f5952;
  --gob-bc-muted: #8a8278;
  --gob-bc-current: #181511;
  --gob-bc-accent: #9f2141;
  --gob-bc-bg: #ebebeb;
  --gob-bc-border: rgba(24, 21, 17, 0.1);
  --gob-bc-pad-y: 10px;
  --gob-bc-pad-x: 14px;
  --gob-bc-radius: 12px;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-bc-text: #5a4f42;
  --gob-bc-muted: #7a6f60;
  --gob-bc-current: #2f2922;
  --gob-bc-accent: #9f2141;
  --gob-bc-bg: #e7d7bd;
  --gob-bc-border: rgba(24, 21, 17, 0.1);
  --gob-bc-pad-y: 10px;
  --gob-bc-pad-x: 14px;
  --gob-bc-radius: 12px;
}
`;

// src/components/breadcrumb/gob-breadcrumb.element.ts
var GobBreadcrumbElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = breadcrumbStyles;
    this.rootEl = document.createElement("nav");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("aria-label", "Migas de pan");
    this.rootEl.appendChild(document.createElement("slot"));
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...BREADCRUMB_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const variant = resolveBreadcrumbVariant(this.getAttribute("variant"));
    const tone = resolveBreadcrumbTone(this.getAttribute("tone"));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
  }
};
defineCustomElement("gob-breadcrumb", GobBreadcrumbElement);

// src/components/container/container-constants.ts
var CONTAINER_OBSERVED_ATTRIBUTES = ["variant", "radius", "shadow"];
function resolveContainerVariant(value) {
  if (value === "narrow" || value === "wide" || value === "full" || value === "flush" || value === "padded" || value === "prose") {
    return value;
  }
  return "basic";
}
function resolveContainerFlag(value) {
  return value === "true" || value === "";
}

// src/components/container/container-styles.ts
var containerStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-ct-text, #6b665f);
  --gob-ct-max: 960px;
  --gob-ct-pad-x: 20px;
  --gob-ct-pad-y: 16px;
  --gob-ct-text: #6b665f;
  --gob-ct-title: #181511;
  --gob-ct-muted: #8a8278;
  --gob-ct-border: rgba(24, 21, 17, 0.12);
  --gob-ct-bg: #ffffff;
  --gob-ct-radius: 0;
  --gob-ct-shadow: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  width: min(100%, var(--gob-ct-max));
  margin-inline: auto;
  padding: var(--gob-ct-pad-y) var(--gob-ct-pad-x);
  background: var(--gob-ct-bg);
  border: 1px solid var(--gob-ct-border);
  border-radius: var(--gob-ct-radius);
  box-shadow: var(--gob-ct-shadow);
  color: var(--gob-ct-text);
}

.root[data-variant='basic'] {
  --gob-ct-max: 960px;
  --gob-ct-pad-x: 20px;
}

.root[data-variant='narrow'] {
  --gob-ct-max: 720px;
  --gob-ct-pad-x: 20px;
}

.root[data-variant='wide'] {
  --gob-ct-max: 1200px;
  --gob-ct-pad-x: 24px;
}

.root[data-variant='full'] {
  --gob-ct-max: 100%;
  --gob-ct-pad-x: 20px;
  width: 100%;
}

.root[data-variant='flush'] {
  --gob-ct-max: 960px;
  --gob-ct-pad-x: 0;
  --gob-ct-pad-y: 16px;
}

.root[data-variant='padded'] {
  --gob-ct-max: 960px;
  --gob-ct-pad-x: 36px;
  --gob-ct-pad-y: 28px;
}

.root[data-variant='prose'] {
  --gob-ct-max: 65ch;
  --gob-ct-pad-x: 20px;
}

/* Solo radio: esquinas cuadradas o redondeadas */
:host([radius='true']) {
  --gob-ct-radius: 16px;
}

:host([radius='false']),
:host(:not([radius])) {
  --gob-ct-radius: 0;
}

.root[data-radius='true'] {
  --gob-ct-radius: 16px;
}

.root[data-radius='false'] {
  --gob-ct-radius: 0;
}

/* Solo sombra */
:host([shadow='true']) {
  --gob-ct-shadow: 0 14px 32px rgba(24, 21, 17, 0.12);
}

:host([shadow='false']),
:host(:not([shadow])) {
  --gob-ct-shadow: none;
}

.root[data-shadow='true'] {
  --gob-ct-shadow: 0 14px 32px rgba(24, 21, 17, 0.12);
}

.root[data-shadow='false'] {
  --gob-ct-shadow: none;
}
`;

// src/components/container/gob-container.element.ts
var GobContainerElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = containerStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.appendChild(document.createElement("slot"));
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...CONTAINER_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const variant = resolveContainerVariant(this.getAttribute("variant"));
    const radius = resolveContainerFlag(this.getAttribute("radius"));
    const shadow = resolveContainerFlag(this.getAttribute("shadow"));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.radius = radius ? "true" : "false";
    this.rootEl.dataset.shadow = shadow ? "true" : "false";
  }
};
defineCustomElement("gob-container", GobContainerElement);

// src/components/grid/grid-constants.ts
var GRID_OBSERVED_ATTRIBUTES = ["variant", "gap"];
function resolveGridVariant(value) {
  if (value === "three" || value === "four" || value === "dense" || value === "loose" || value === "split" || value === "auto") {
    return value;
  }
  return "basic";
}
function resolveGridGap(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}

// src/components/grid/grid-styles.ts
var gridStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-grid-gap: 16px;
  --gob-grid-cols: 2;
  --gob-grid-template: repeat(2, minmax(0, 1fr));
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  grid-template-columns: var(--gob-grid-template);
  gap: var(--gob-grid-gap);
  width: 100%;
  min-width: 0;
}

.root[data-variant='basic'] {
  --gob-grid-template: repeat(2, minmax(0, 1fr));
}

.root[data-variant='three'] {
  --gob-grid-template: repeat(3, minmax(0, 1fr));
}

.root[data-variant='four'] {
  --gob-grid-template: repeat(4, minmax(0, 1fr));
}

.root[data-variant='dense'] {
  --gob-grid-template: repeat(3, minmax(0, 1fr));
}

.root[data-variant='loose'] {
  --gob-grid-template: repeat(2, minmax(0, 1fr));
}

.root[data-variant='split'] {
  --gob-grid-template: minmax(0, 1fr) minmax(0, 2fr);
}

.root[data-variant='auto'] {
  --gob-grid-template: repeat(auto-fit, minmax(120px, 1fr));
}

.root[data-gap='sm'],
:host([gap='sm']) .root {
  --gob-grid-gap: 8px;
}

.root[data-gap='md'],
:host([gap='md']) .root,
:host(:not([gap])) .root {
  --gob-grid-gap: 16px;
}

.root[data-gap='lg'],
:host([gap='lg']) .root {
  --gob-grid-gap: 28px;
}

.root[data-variant='dense'][data-gap='md'],
:host([variant='dense']:not([gap])) .root {
  --gob-grid-gap: 8px;
}

.root[data-variant='loose'][data-gap='md'],
:host([variant='loose']:not([gap])) .root {
  --gob-grid-gap: 28px;
}

@media (max-width: 720px) {
  .root[data-variant='three'],
  .root[data-variant='four'],
  .root[data-variant='dense'] {
    --gob-grid-template: repeat(2, minmax(0, 1fr));
  }

  .root[data-variant='split'] {
    --gob-grid-template: minmax(0, 1fr);
  }
}
`;

// src/components/grid/gob-grid.element.ts
var GobGridElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = gridStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.appendChild(document.createElement("slot"));
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...GRID_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const variant = resolveGridVariant(this.getAttribute("variant"));
    const gap = resolveGridGap(this.getAttribute("gap"));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.gap = gap;
  }
};
defineCustomElement("gob-grid", GobGridElement);

// src/components/divider/divider-constants.ts
var DIVIDER_OBSERVED_ATTRIBUTES = ["variant", "tone"];
function resolveDividerVariant(value) {
  if (value === "vertical" || value === "dashed" || value === "dotted" || value === "thick" || value === "label" || value === "inset") {
    return value;
  }
  return "basic";
}
function resolveDividerTone(value) {
  if (value === "accent") return "accent";
  return "primary";
}

// src/components/divider/divider-styles.ts
var dividerStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-dv-color: rgba(24, 21, 17, 0.14);
  --gob-dv-accent: #9f2141;
  --gob-dv-thickness: 1px;
  --gob-dv-style: solid;
  --gob-dv-inset: 0;
  color: var(--gob-dv-muted, #8a8278);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: block;
  width: 100%;
  margin: 0;
  border: 0;
  height: 0;
  border-top: var(--gob-dv-thickness) var(--gob-dv-style) var(--gob-dv-color);
  margin-inline: var(--gob-dv-inset);
  width: calc(100% - (var(--gob-dv-inset) * 2));
}

.root[data-variant='vertical'] {
  display: inline-block;
  width: 0;
  height: 72px;
  margin: 0;
  border-top: 0;
  border-left: var(--gob-dv-thickness) var(--gob-dv-style) var(--gob-dv-color);
}

.root[data-variant='dashed'] {
  --gob-dv-style: dashed;
}

.root[data-variant='dotted'] {
  --gob-dv-style: dotted;
  --gob-dv-thickness: 2px;
}

.root[data-variant='thick'] {
  --gob-dv-thickness: 3px;
}

.root[data-variant='inset'] {
  --gob-dv-inset: 24px;
  --gob-dv-color: rgba(24, 21, 17, 0.1);
}

.root[data-variant='label'] {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  height: auto;
  border: 0;
  width: 100%;
  margin-inline: 0;
}

.root[data-variant='label']::before,
.root[data-variant='label']::after {
  content: '';
  height: 0;
  border-top: var(--gob-dv-thickness) var(--gob-dv-style) var(--gob-dv-color);
}

.label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-dv-label, #8a8278);
  white-space: nowrap;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-dv-color: rgba(159, 33, 65, 0.22);
  --gob-dv-accent: #9f2141;
  --gob-dv-label: #9f2141;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-dv-color: rgba(188, 148, 90, 0.45);
  --gob-dv-accent: #bc945a;
  --gob-dv-label: #7a5a2e;
}
`;

// src/components/divider/gob-divider.element.ts
var GobDividerElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "labelEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = dividerStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("role", "separator");
    this.labelEl = document.createElement("span");
    this.labelEl.className = "label";
    this.labelEl.setAttribute("part", "label");
    const slot = document.createElement("slot");
    this.labelEl.appendChild(slot);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...DIVIDER_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const variant = resolveDividerVariant(this.getAttribute("variant"));
    const tone = resolveDividerTone(this.getAttribute("tone"));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.setAttribute(
      "aria-orientation",
      variant === "vertical" ? "vertical" : "horizontal"
    );
    if (variant === "label") {
      if (!this.labelEl.isConnected) {
        this.rootEl.appendChild(this.labelEl);
      }
    } else if (this.labelEl.isConnected) {
      this.labelEl.remove();
    }
  }
};
defineCustomElement("gob-divider", GobDividerElement);

// src/components/spacer/spacer-constants.ts
var SPACER_OBSERVED_ATTRIBUTES = ["variant"];
function resolveSpacerVariant(value) {
  if (value === "xs" || value === "sm" || value === "lg" || value === "xl" || value === "horizontal" || value === "section") {
    return value;
  }
  return "md";
}

// src/components/spacer/spacer-styles.ts
var spacerStyles = `
:host {
  display: block;
  box-sizing: border-box;
  --gob-sp-size: 16px;
}

:host([variant='horizontal']) {
  display: inline-block;
  vertical-align: middle;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: block;
  width: 100%;
  height: var(--gob-sp-size);
  flex: 0 0 auto;
  pointer-events: none;
}

.root[data-variant='xs'] { --gob-sp-size: 4px; }
.root[data-variant='sm'] { --gob-sp-size: 8px; }
.root[data-variant='md'] { --gob-sp-size: 16px; }
.root[data-variant='lg'] { --gob-sp-size: 24px; }
.root[data-variant='xl'] { --gob-sp-size: 40px; }
.root[data-variant='section'] { --gob-sp-size: 64px; }

.root[data-variant='horizontal'] {
  display: block;
  width: var(--gob-sp-size);
  height: 2rem;
  --gob-sp-size: 24px;
}
`;

// src/components/spacer/gob-spacer.element.ts
var GobSpacerElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = spacerStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("aria-hidden", "true");
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...SPACER_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    this.rootEl.dataset.variant = resolveSpacerVariant(this.getAttribute("variant"));
  }
};
defineCustomElement("gob-spacer", GobSpacerElement);

// src/components/table/table-constants.ts
var TABLE_VARIANTS = [
  "basic",
  "striped",
  "bordered",
  "dense",
  "selectable",
  "sortable",
  "sticky",
  "status",
  "actions",
  "empty"
];
var TABLE_OBSERVED_ATTRIBUTES = ["variant", "tone"];
var VARIANT_SET = new Set(TABLE_VARIANTS);
function resolveTableVariant(value) {
  if (value && VARIANT_SET.has(value)) return value;
  return "basic";
}
function resolveTableTone(value) {
  if (value === "accent" || value === "dark" || value === "neutral" || value === "soft") {
    return value;
  }
  return "primary";
}
var tableLightDomStyles = `
gob-table {
  --gob-tb-accent: #9f2141;
  --gob-tb-accent-soft: rgba(159, 33, 65, 0.1);
  --gob-tb-title: #181511;
  --gob-tb-muted: #8a8278;
  --gob-tb-border: rgba(24, 21, 17, 0.08);
  --gob-tb-zebra: rgba(24, 21, 17, 0.03);
  --gob-tb-hover: rgba(159, 33, 65, 0.04);
  --gob-tb-pad-y: 14px;
  --gob-tb-pad-x: 16px;
  --gob-tb-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
}

gob-table[tone='accent'] {
  --gob-tb-accent: #bc945a;
  --gob-tb-accent-soft: rgba(188, 148, 90, 0.16);
  --gob-tb-hover: rgba(188, 148, 90, 0.07);
}
gob-table[tone='dark'] {
  --gob-tb-accent: #181511;
  --gob-tb-accent-soft: rgba(24, 21, 17, 0.08);
  --gob-tb-hover: rgba(24, 21, 17, 0.04);
}
gob-table[tone='neutral'] {
  --gob-tb-accent: #6b655c;
  --gob-tb-accent-soft: rgba(24, 21, 17, 0.06);
  --gob-tb-hover: rgba(24, 21, 17, 0.035);
}
gob-table[tone='soft'] {
  --gob-tb-accent: #a67c52;
  --gob-tb-accent-soft: rgba(231, 215, 189, 0.55);
  --gob-tb-hover: rgba(166, 124, 82, 0.07);
}

gob-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: var(--gob-tb-font);
  font-size: 13px;
  color: var(--gob-tb-title);
}

gob-table thead th {
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-tb-muted);
  background: #fafafa;
  border-bottom: 1px solid var(--gob-tb-border);
  padding: 12px var(--gob-tb-pad-x);
  white-space: nowrap;
}

gob-table tbody td {
  padding: var(--gob-tb-pad-y) var(--gob-tb-pad-x);
  border-bottom: 1px solid rgba(24, 21, 17, 0.05);
  vertical-align: middle;
  line-height: 1.4;
}

gob-table tbody tr:last-child td {
  border-bottom: 0;
}

gob-table tbody tr:hover td {
  background: var(--gob-tb-hover);
}

gob-table td.num,
gob-table th.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

gob-table[variant='striped'] tbody tr:nth-child(even) td {
  background: var(--gob-tb-zebra);
}

gob-table[variant='bordered'] table {
  border: 1px solid var(--gob-tb-border);
  border-radius: 12px;
  overflow: hidden;
}
gob-table[variant='bordered'] thead th,
gob-table[variant='bordered'] tbody td {
  border-right: 1px solid rgba(24, 21, 17, 0.06);
}
gob-table[variant='bordered'] thead th:last-child,
gob-table[variant='bordered'] tbody td:last-child {
  border-right: 0;
}

gob-table[variant='dense'] {
  --gob-tb-pad-y: 8px;
  --gob-tb-pad-x: 12px;
}
gob-table[variant='dense'] table {
  font-size: 12px;
}

gob-table[variant='sticky'] thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  box-shadow: 0 1px 0 var(--gob-tb-border);
}

gob-table .gob-tb-check {
  width: 16px;
  height: 16px;
  accent-color: var(--gob-tb-accent);
  cursor: pointer;
}

gob-table .gob-tb-sort {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  color: inherit;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  font-weight: inherit;
}
gob-table .gob-tb-sort::after {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 3.5px solid transparent;
  border-right: 3.5px solid transparent;
  border-top: 4px solid currentColor;
  opacity: 0.35;
  margin-top: 1px;
}
gob-table .gob-tb-sort[data-dir='asc']::after {
  border-top: 0;
  border-bottom: 4px solid var(--gob-tb-accent);
  opacity: 1;
}
gob-table .gob-tb-sort[data-dir='desc']::after {
  border-top: 4px solid var(--gob-tb-accent);
  opacity: 1;
}
gob-table .gob-tb-sort i {
  display: none;
}

gob-table .gob-tb-cell {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
gob-table .gob-tb-stack {
  display: grid;
  gap: 2px;
  min-width: 0;
}
gob-table .gob-tb-primary {
  font-size: 13px;
  font-weight: 650;
  color: var(--gob-tb-title);
  line-height: 1.3;
}
gob-table .gob-tb-secondary {
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-tb-muted);
  line-height: 1.3;
}
gob-table .gob-tb-avatar {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: var(--gob-tb-accent);
}
gob-table .gob-tb-avatar[data-hue='0'] { background: #9f2141; }
gob-table .gob-tb-avatar[data-hue='1'] { background: #3d6b8a; }
gob-table .gob-tb-avatar[data-hue='2'] { background: #5a7a4a; }
gob-table .gob-tb-avatar[data-hue='3'] { background: #8a5a3c; }
gob-table .gob-tb-avatar[data-hue='4'] { background: #6b5a8a; }
gob-table .gob-tb-avatar[data-hue='5'] { background: #2f6b5c; }

gob-table .gob-tb-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.01em;
  background: var(--gob-tb-accent-soft);
  color: var(--gob-tb-accent);
  white-space: nowrap;
}
gob-table .gob-tb-status[data-tone='ok'] {
  background: rgba(31, 138, 85, 0.12);
  color: #187a4a;
}
gob-table .gob-tb-status[data-tone='warn'] {
  background: rgba(208, 146, 26, 0.14);
  color: #9a6a10;
}
gob-table .gob-tb-status[data-tone='err'] {
  background: rgba(192, 57, 43, 0.12);
  color: #b03328;
}
gob-table .gob-tb-status[data-tone='info'] {
  background: rgba(61, 107, 138, 0.12);
  color: #2f5a78;
}
gob-table .gob-tb-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  flex: 0 0 auto;
}

gob-table .gob-tb-actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
gob-table .gob-tb-actions button,
gob-table .gob-tb-kebab {
  appearance: none;
  border: 0;
  background: transparent;
  color: #6b655c;
  border-radius: 8px;
  min-width: 32px;
  min-height: 32px;
  padding: 0;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  letter-spacing: 0.05em;
}
gob-table .gob-tb-actions button:hover,
gob-table .gob-tb-kebab:hover {
  background: rgba(24, 21, 17, 0.05);
  color: var(--gob-tb-accent);
}
gob-table .gob-tb-actions .gob-tb-btn {
  min-width: auto;
  padding: 0 10px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  font-size: 11px;
  font-weight: 700;
  color: #4a453e;
}
gob-table .gob-tb-actions .gob-tb-btn:hover {
  border-color: var(--gob-tb-accent);
  color: var(--gob-tb-accent);
  background: #fff;
}

gob-table[variant='empty'] table {
  display: none;
}
`;

// src/components/table/table-styles.ts
var tableStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-tb-bg: #ffffff;
  --gob-tb-border: rgba(24, 21, 17, 0.08);
  --gob-tb-title: #181511;
  --gob-tb-muted: #8a8278;
  --gob-tb-accent: #9f2141;
  --gob-tb-radius: 14px;
  --gob-tb-shadow: 0 1px 2px rgba(24, 21, 17, 0.04), 0 8px 24px rgba(24, 21, 17, 0.04);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  gap: 0;
  min-width: 0;
  border: 1px solid var(--gob-tb-border);
  border-radius: var(--gob-tb-radius);
  background: var(--gob-tb-bg);
  box-shadow: var(--gob-tb-shadow);
  overflow: hidden;
}

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px 14px;
}

.headText {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--gob-tb-title);
}

.subtitle {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--gob-tb-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.scroll {
  overflow: auto;
  max-width: 100%;
}

.root[data-variant='sticky'] .scroll {
  max-height: 280px;
}

.empty {
  display: none;
  place-items: center;
  gap: 8px;
  padding: 56px 20px;
  text-align: center;
  color: var(--gob-tb-muted);
}

.root[data-variant='empty'] .empty {
  display: grid;
}

.root[data-variant='empty'] .scroll {
  display: none;
}

.emptyTitle {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--gob-tb-title);
}

.emptyDesc {
  margin: 0;
  max-width: 36ch;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
  font-size: 13px;
  font-weight: 500;
  color: var(--gob-tb-muted);
  background: #fff;
}

.root[data-variant='dense'] .head {
  padding: 12px 14px;
}

.root[data-variant='basic'] .subtitle,
.root[data-variant='striped'] .subtitle,
.root[data-variant='bordered'] .actions,
.root[data-variant='dense'] .subtitle,
.root[data-variant='dense'] .actions,
.root[data-variant='empty'] .actions,
.root[data-variant='empty'] .foot {
  display: none;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-tb-accent: #9f2141;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-tb-accent: #bc945a;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-tb-accent: #181511;
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-tb-accent: #6b655c;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-tb-accent: #a67c52;
}
`;

// src/components/table/gob-table.element.ts
var LIGHT_STYLE_ID = "gob-table-light-dom";
function ensureLightDomStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(LIGHT_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = LIGHT_STYLE_ID;
  style.textContent = tableLightDomStyles;
  document.head.appendChild(style);
}
var GobTableElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = tableStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    const head2 = document.createElement("div");
    head2.className = "head";
    head2.setAttribute("part", "head");
    const headText = document.createElement("div");
    headText.className = "headText";
    const title = document.createElement("div");
    title.className = "title";
    title.setAttribute("part", "title");
    const titleSlot = document.createElement("slot");
    titleSlot.name = "title";
    title.appendChild(titleSlot);
    const subtitle = document.createElement("div");
    subtitle.className = "subtitle";
    subtitle.setAttribute("part", "subtitle");
    const subtitleSlot = document.createElement("slot");
    subtitleSlot.name = "subtitle";
    subtitle.appendChild(subtitleSlot);
    headText.append(title, subtitle);
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.setAttribute("part", "actions");
    const actionsSlot = document.createElement("slot");
    actionsSlot.name = "actions";
    actions.appendChild(actionsSlot);
    head2.append(headText, actions);
    const scroll = document.createElement("div");
    scroll.className = "scroll";
    scroll.setAttribute("part", "scroll");
    const defaultSlot = document.createElement("slot");
    scroll.appendChild(defaultSlot);
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.setAttribute("part", "empty");
    const emptySlot = document.createElement("slot");
    emptySlot.name = "empty";
    empty.appendChild(emptySlot);
    const foot = document.createElement("div");
    foot.className = "foot";
    foot.setAttribute("part", "foot");
    const footSlot = document.createElement("slot");
    footSlot.name = "footer";
    foot.appendChild(footSlot);
    this.rootEl.append(head2, scroll, empty, foot);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...TABLE_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    ensureLightDomStyles();
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const variant = resolveTableVariant(this.getAttribute("variant"));
    const tone = resolveTableTone(this.getAttribute("tone"));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
  }
};
defineCustomElement("gob-table", GobTableElement);

// src/components/list/list-constants.ts
var LIST_OBSERVED_ATTRIBUTES = ["variant", "tone"];
function resolveListVariant(value) {
  if (value === "avatar" || value === "meta" || value === "actions" || value === "dense" || value === "selectable" || value === "complete" || value === "icon" || value === "nav" || value === "grouped" || value === "status" || value === "empty") {
    return value;
  }
  return "basic";
}
function resolveListTone(value) {
  if (value === "accent" || value === "dark" || value === "neutral" || value === "soft" || value === "primary") {
    return value;
  }
  return "primary";
}
var listLightDomStyles = `
gob-list {
  --gob-list-accent: #9f2141;
  --gob-list-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-list-accent-text: #9f2141;
  --gob-list-title: #181511;
  --gob-list-muted: #8a8278;
  --gob-list-text: #6b665f;
  --gob-list-border: rgba(24, 21, 17, 0.08);
  --gob-list-hover: rgba(159, 33, 65, 0.04);
  --gob-list-selected: rgba(159, 33, 65, 0.08);
  --gob-list-pad-y: 14px;
  --gob-list-pad-x: 16px;
  --gob-list-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
}

gob-list[tone='accent'] {
  --gob-list-accent: #bc945a;
  --gob-list-accent-soft: rgba(188, 148, 90, 0.22);
  --gob-list-accent-text: #7a5a2e;
  --gob-list-hover: rgba(188, 148, 90, 0.07);
  --gob-list-selected: rgba(188, 148, 90, 0.14);
}
gob-list[tone='dark'] {
  --gob-list-accent: #ffffff;
  --gob-list-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-list-accent-text: #ffffff;
  --gob-list-title: #ffffff;
  --gob-list-muted: rgba(255, 255, 255, 0.5);
  --gob-list-text: rgba(255, 255, 255, 0.72);
  --gob-list-border: rgba(255, 255, 255, 0.1);
  --gob-list-hover: rgba(255, 255, 255, 0.06);
  --gob-list-selected: rgba(255, 255, 255, 0.1);
}
gob-list[tone='neutral'] {
  --gob-list-accent: #6b655c;
  --gob-list-accent-soft: rgba(24, 21, 17, 0.06);
  --gob-list-accent-text: #181511;
  --gob-list-hover: rgba(24, 21, 17, 0.035);
  --gob-list-selected: rgba(24, 21, 17, 0.06);
}
gob-list[tone='soft'] {
  --gob-list-accent: #a67c52;
  --gob-list-accent-soft: rgba(231, 215, 189, 0.55);
  --gob-list-accent-text: #7a5a2e;
  --gob-list-hover: rgba(166, 124, 82, 0.07);
  --gob-list-selected: rgba(166, 124, 82, 0.12);
}

gob-list[variant='dense'] {
  --gob-list-pad-y: 10px;
  --gob-list-pad-x: 12px;
}

gob-list .gob-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: var(--gob-list-pad-y) var(--gob-list-pad-x);
  border: 0;
  border-bottom: 1px solid var(--gob-list-border);
  background: transparent;
  color: inherit;
  font-family: var(--gob-list-font);
  text-align: left;
  cursor: default;
}
gob-list .gob-list-item:last-child {
  border-bottom: 0;
}
gob-list .gob-list-item[data-interactive='true'],
gob-list button.gob-list-item {
  cursor: pointer;
}
gob-list .gob-list-item:hover,
gob-list .gob-list-item:focus-visible {
  background: var(--gob-list-hover);
  outline: none;
}
gob-list .gob-list-item[aria-selected='true'],
gob-list .gob-list-item[data-selected='true'] {
  background: var(--gob-list-selected);
}

gob-list .gob-list-check {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--gob-list-accent);
}

gob-list .gob-list-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: var(--gob-list-accent-soft);
  color: var(--gob-list-accent-text);
  font-size: 12px;
  font-weight: 700;
  flex: 0 0 auto;
}
gob-list[variant='dense'] .gob-list-avatar {
  width: 30px;
  height: 30px;
  font-size: 11px;
}

gob-list .gob-list-body {
  display: grid;
  gap: 2px;
  min-width: 0;
  flex: 1 1 auto;
}
gob-list .gob-list-primary {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--gob-list-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
gob-list .gob-list-secondary {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-list-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

gob-list .gob-list-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  margin-inline-start: auto;
  font-size: 11px;
  font-weight: 600;
  color: var(--gob-list-muted);
  white-space: nowrap;
}
gob-list .gob-list-pill {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--gob-list-accent-soft);
  color: var(--gob-list-accent-text);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

gob-list .gob-list-action {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--gob-list-muted);
  cursor: pointer;
}
gob-list .gob-list-action:hover {
  background: var(--gob-list-accent-soft);
  color: var(--gob-list-accent-text);
}

gob-list .gob-list-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--gob-list-accent-soft);
  color: var(--gob-list-accent-text);
  flex: 0 0 auto;
}
gob-list[variant='dense'] .gob-list-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
}

gob-list .gob-list-group {
  display: block;
  padding: 10px 16px 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-list-muted);
  background: transparent;
  border-bottom: 1px solid var(--gob-list-border);
}

gob-list .gob-list-empty {
  display: grid;
  gap: 6px;
  place-items: center;
  padding: 36px 20px;
  text-align: center;
}
gob-list .gob-list-empty strong {
  font-size: 14px;
  font-weight: 700;
  color: var(--gob-list-title);
}
gob-list .gob-list-empty p {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-list-muted);
  max-width: 32ch;
}

gob-list .gob-list-item[data-interactive='true'] {
  cursor: pointer;
}
gob-list .gob-list-chevron {
  color: var(--gob-list-muted);
  flex: 0 0 auto;
  margin-inline-start: auto;
}
`;

// src/components/list/list-styles.ts
var listStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-list-text, #6b665f);
  --gob-list-bg: #ffffff;
  --gob-list-border: rgba(24, 21, 17, 0.08);
  --gob-list-accent: #9f2141;
  --gob-list-radius: 14px;
  --gob-list-shadow: 0 1px 2px rgba(24, 21, 17, 0.04), 0 8px 24px rgba(24, 21, 17, 0.04);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  min-width: 0;
  border: 1px solid var(--gob-list-border);
  border-radius: var(--gob-list-radius);
  background: var(--gob-list-bg);
  box-shadow: var(--gob-list-shadow);
  overflow: hidden;
}

.root[data-variant='dense'] {
  --gob-list-radius: 12px;
}

.items {
  display: grid;
  min-width: 0;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-list-bg: #ffffff;
  --gob-list-border: rgba(24, 21, 17, 0.08);
  --gob-list-accent: #9f2141;
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-list-bg: #fbf7f1;
  --gob-list-border: rgba(24, 21, 17, 0.08);
  --gob-list-accent: #bc945a;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-list-bg: #181511;
  --gob-list-border: rgba(255, 255, 255, 0.1);
  --gob-list-accent: #ffffff;
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-list-bg: #f5f5f5;
  --gob-list-border: rgba(24, 21, 17, 0.12);
  --gob-list-accent: #6b655c;
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-list-bg: #f3ebe0;
  --gob-list-border: rgba(24, 21, 17, 0.1);
  --gob-list-accent: #a67c52;
}
`;

// src/components/list/gob-list.element.ts
var LIGHT_STYLE_ID2 = "gob-list-light-dom";
function ensureLightDomStyles2() {
  if (typeof document === "undefined") return;
  if (document.getElementById(LIGHT_STYLE_ID2)) return;
  const style = document.createElement("style");
  style.id = LIGHT_STYLE_ID2;
  style.textContent = listLightDomStyles;
  document.head.appendChild(style);
}
var GobListElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = listStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    const items = document.createElement("div");
    items.className = "items";
    items.setAttribute("part", "items");
    items.setAttribute("role", "list");
    items.appendChild(document.createElement("slot"));
    this.rootEl.appendChild(items);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...LIST_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    ensureLightDomStyles2();
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    const variant = resolveListVariant(this.getAttribute("variant"));
    const tone = resolveListTone(this.getAttribute("tone"));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
  }
};
defineCustomElement("gob-list", GobListElement);

// src/components/empty-state/empty-state-constants.ts
var EMPTY_STATE_OBSERVED_ATTRIBUTES = ["variant", "tone"];
function resolveEmptyStateVariant(value) {
  if (value === "icon" || value === "actions" || value === "search" || value === "error" || value === "dense" || value === "complete" || value === "filter" || value === "permission" || value === "success" || value === "upload" || value === "inline") {
    return value;
  }
  return "basic";
}
function resolveEmptyStateTone(value) {
  if (value === "accent" || value === "dark" || value === "neutral" || value === "soft" || value === "primary") {
    return value;
  }
  return "primary";
}
var emptyStateLightDomStyles = `
gob-empty-state {
  /* Marca fija: vino + dorado (cafe) */
  --gob-es-vino: #9f2141;
  --gob-es-vino-soft: rgba(159, 33, 65, 0.12);
  --gob-es-dorado: #bc945a;
  --gob-es-dorado-soft: rgba(188, 148, 90, 0.18);
  --gob-es-accent: var(--gob-es-vino);
  --gob-es-accent-soft: var(--gob-es-vino-soft);
  --gob-es-accent-text: var(--gob-es-vino);
  --gob-es-title: #181511;
  --gob-es-muted: #8a8278;
  --gob-es-text: #6b665f;
  --gob-es-border: rgba(24, 21, 17, 0.08);
  --gob-es-surface: #ffffff;
  --gob-es-font: var(--gob-font-sans, Gotham, Raleway, sans-serif);
}
gob-empty-state[tone='accent'] {
  --gob-es-accent: var(--gob-es-dorado);
  --gob-es-accent-soft: var(--gob-es-dorado-soft);
  --gob-es-accent-text: #7a5a2e;
}
gob-empty-state[tone='dark'] {
  --gob-es-vino: #ffffff;
  --gob-es-dorado: #e0c59a;
  --gob-es-vino-soft: rgba(255, 255, 255, 0.12);
  --gob-es-dorado-soft: rgba(224, 197, 154, 0.18);
  --gob-es-accent: #ffffff;
  --gob-es-accent-soft: rgba(255, 255, 255, 0.14);
  --gob-es-accent-text: #ffffff;
  --gob-es-title: #ffffff;
  --gob-es-muted: rgba(255, 255, 255, 0.5);
  --gob-es-text: rgba(255, 255, 255, 0.72);
  --gob-es-border: rgba(255, 255, 255, 0.12);
  --gob-es-surface: transparent;
}

gob-empty-state .gob-es-inner {
  display: grid;
  gap: 12px;
  place-items: center;
  text-align: center;
  font-family: var(--gob-es-font);
  max-width: 38ch;
  margin: 0 auto;
}
gob-empty-state .gob-es-icon {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: var(--gob-es-vino-soft);
  color: var(--gob-es-vino);
  border: 1.5px solid color-mix(in srgb, var(--gob-es-vino) 16%, transparent);
  box-shadow: 0 0 0 6px var(--gob-es-dorado-soft);
  transition: transform 180ms ease, background 180ms ease, color 180ms ease;
}
gob-empty-state .gob-es-icon:hover {
  transform: scale(1.04);
  background: var(--gob-es-vino);
  color: #fff;
  border-color: transparent;
}
gob-empty-state[variant='dense'] .gob-es-icon {
  width: 40px;
  height: 40px;
  box-shadow: 0 0 0 4px var(--gob-es-dorado-soft);
}
gob-empty-state .gob-es-eyebrow {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gob-es-dorado);
}
gob-empty-state .gob-es-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--gob-es-title);
}
gob-empty-state[variant='dense'] .gob-es-title {
  font-size: 14px;
}
gob-empty-state .gob-es-desc {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--gob-es-text);
}

/* Semaforo institucional en pills */
gob-empty-state .gob-es-pill {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--gob-es-vino-soft);
  color: var(--gob-es-vino);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
}
gob-empty-state .gob-es-pill[data-status='alta'],
gob-empty-state .gob-es-pill[data-tone='info'] {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
}
gob-empty-state .gob-es-pill[data-status='revision'],
gob-empty-state .gob-es-pill[data-tone='warning'] {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
}
gob-empty-state .gob-es-pill[data-status='cerrado'],
gob-empty-state .gob-es-pill[data-tone='success'] {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
}
gob-empty-state .gob-es-pill[data-status='rechazado'],
gob-empty-state .gob-es-pill[data-tone='danger'] {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
}

gob-empty-state .gob-es-actions {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 6px;
}
gob-empty-state .gob-es-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--gob-es-dorado) 42%, transparent);
  background: #ffffff;
  color: var(--gob-es-title);
  font-family: var(--gob-es-font);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, border-color 160ms ease;
}
gob-empty-state .gob-es-btn:hover {
  border-color: var(--gob-es-dorado);
  color: #7a5a2e;
}
gob-empty-state .gob-es-btn-primary {
  border-color: transparent;
  background: var(--gob-es-vino);
  color: #fff;
}
gob-empty-state .gob-es-btn-primary:hover {
  background: #861a36;
  color: #fff;
}
gob-empty-state[tone='dark'] .gob-es-btn {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.22);
}
gob-empty-state[tone='dark'] .gob-es-btn-primary {
  background: var(--gob-es-dorado);
  color: #181511;
}

gob-empty-state .gob-es-hints {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-top: 2px;
}
gob-empty-state .gob-es-hint {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: var(--gob-es-dorado-soft);
  color: #7a5a2e;
  font-size: 11px;
  font-weight: 600;
}

/* Variantes de semaforo / tipo */
gob-empty-state[variant='error'] .gob-es-icon {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
  border-color: rgba(198, 40, 40, 0.18);
  box-shadow: 0 0 0 6px rgba(198, 40, 40, 0.08);
}
gob-empty-state[variant='search'] .gob-es-icon,
gob-empty-state[variant='filter'] .gob-es-icon {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
  border-color: rgba(47, 95, 138, 0.16);
  box-shadow: 0 0 0 6px rgba(47, 95, 138, 0.08);
}
gob-empty-state[variant='permission'] .gob-es-icon {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
  border-color: rgba(208, 146, 26, 0.22);
  box-shadow: 0 0 0 6px rgba(208, 146, 26, 0.1);
}
gob-empty-state[variant='success'] .gob-es-icon {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
  border-color: rgba(31, 138, 85, 0.18);
  box-shadow: 0 0 0 6px rgba(31, 138, 85, 0.08);
}
gob-empty-state[variant='upload'] .gob-es-icon {
  background: var(--gob-es-dorado-soft);
  color: #7a5a2e;
  border-color: color-mix(in srgb, var(--gob-es-dorado) 28%, transparent);
  box-shadow: 0 0 0 6px var(--gob-es-vino-soft);
}

/* Inline: layout horizontal */
gob-empty-state[variant='inline'] .gob-es-inner {
  grid-template-columns: auto minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 14px;
  row-gap: 4px;
  text-align: left;
  place-items: start;
  max-width: 52ch;
}
gob-empty-state[variant='inline'] .gob-es-icon {
  grid-row: 1 / span 2;
  width: 44px;
  height: 44px;
  box-shadow: 0 0 0 4px var(--gob-es-dorado-soft);
  align-self: center;
}
gob-empty-state[variant='inline'] .gob-es-title {
  font-size: 14px;
}
gob-empty-state[variant='inline'] .gob-es-desc {
  font-size: 12px;
}
gob-empty-state[variant='inline'] .gob-es-actions {
  grid-column: 1 / -1;
  justify-content: flex-start;
  margin-top: 8px;
}

gob-empty-state[tone='dark'][variant='error'] .gob-es-icon,
gob-empty-state[tone='dark'][variant='search'] .gob-es-icon,
gob-empty-state[tone='dark'][variant='filter'] .gob-es-icon,
gob-empty-state[tone='dark'][variant='permission'] .gob-es-icon,
gob-empty-state[tone='dark'][variant='success'] .gob-es-icon {
  color: #fff;
}
`;

// src/components/empty-state/empty-state-styles.ts
var emptyStateStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-es-text, #6b665f);
  --gob-es-bg: #ffffff;
  --gob-es-border: color-mix(in srgb, #bc945a 28%, rgba(24, 21, 17, 0.08));
  --gob-es-radius: 16px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 240px;
  padding: 40px 28px;
  border: 1px solid var(--gob-es-border);
  border-radius: var(--gob-es-radius);
  background: var(--gob-es-bg);
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.03), 0 10px 28px rgba(24, 21, 17, 0.04);
}

.root[data-variant='dense'],
.root[data-variant='inline'] {
  min-height: 140px;
  padding: 22px 18px;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'],
:host([tone='accent']),
.root[data-tone='accent'],
:host([tone='neutral']),
.root[data-tone='neutral'],
:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-es-bg: #ffffff;
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-es-bg: #181511;
  --gob-es-border: rgba(255, 255, 255, 0.12);
  box-shadow: none;
}
`;

// src/components/empty-state/gob-empty-state.element.ts
var LIGHT_STYLE_ID3 = "gob-empty-state-light-dom-v2";
function ensureLightDomStyles3() {
  if (typeof document === "undefined") return;
  const existing = document.getElementById(LIGHT_STYLE_ID3);
  if (existing) {
    existing.textContent = emptyStateLightDomStyles;
    return;
  }
  const style = document.createElement("style");
  style.id = LIGHT_STYLE_ID3;
  style.textContent = emptyStateLightDomStyles;
  document.head.appendChild(style);
}
var GobEmptyStateElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = emptyStateStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.appendChild(document.createElement("slot"));
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...EMPTY_STATE_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    ensureLightDomStyles3();
    this.syncState();
  }
  attributeChangedCallback() {
    this.syncState();
  }
  syncState() {
    this.rootEl.dataset.variant = resolveEmptyStateVariant(
      this.getAttribute("variant")
    );
    this.rootEl.dataset.tone = resolveEmptyStateTone(this.getAttribute("tone"));
  }
};
defineCustomElement("gob-empty-state", GobEmptyStateElement);

// src/components/skeleton/skeleton-constants.ts
var SKELETON_OBSERVED_ATTRIBUTES = [
  "variant",
  "rows",
  "animated"
];
function resolveSkeletonVariant(value) {
  if (value === "avatar" || value === "card" || value === "table" || value === "list" || value === "media" || value === "kpi" || value === "form" || value === "dense" || value === "complete" || value === "text") {
    return value;
  }
  return "text";
}
function resolveSkeletonRows(value, fallback = 3) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(Math.floor(n), 12);
}
function resolveSkeletonAnimated(value) {
  if (value === null) return true;
  return value !== "false" && value !== "0";
}

// src/components/skeleton/skeleton-render.ts
function bone(cls) {
  return `<span class="bone ${cls}" aria-hidden="true"></span>`;
}
function textLines(dense = false) {
  const sm = dense ? " sm" : "";
  return `<div class="stack">
  ${bone(`line lg${sm} w-75`)}
  ${bone(`line${sm} w-90`)}
  ${bone(`line${sm} w-60`)}
</div>`;
}
function avatarBlock(dense = false) {
  const size = dense ? "" : " lg";
  return `<div class="row">
  ${bone(`circle${size}`)}
  <div class="col">
    ${bone("line lg w-45")}
    ${bone("line w-75")}
    ${bone("line sm w-35")}
  </div>
</div>`;
}
function cardBlock() {
  return `<div class="stack">
  ${bone("block")}
  ${bone("line lg w-60")}
  ${bone("line w-90")}
  ${bone("line w-45")}
</div>`;
}
function mediaBlock() {
  return `<div class="media">
  ${bone("block sm")}
  <div class="col">
    ${bone("line lg w-75")}
    ${bone("line w-90")}
    ${bone("line w-60")}
    ${bone("line sm w-35")}
  </div>
</div>`;
}
function listBlock(rows) {
  const items = Array.from({ length: rows }, () => {
    return `<div class="list-item">
  ${bone("circle")}
  <div class="col">
    ${bone("line lg w-60")}
    ${bone("line sm w-45")}
  </div>
</div>`;
  }).join("");
  return `<div class="stack">${items}</div>`;
}
function tableBlock(rows) {
  const head2 = `<div class="table-head">
  ${bone("line sm")}
  ${bone("line sm")}
  ${bone("line sm")}
  ${bone("line sm")}
</div>`;
  const body = Array.from({ length: rows }, () => {
    return `<div class="table-row">
  ${bone("line")}
  ${bone("line")}
  ${bone("line")}
  ${bone("line w-60")}
</div>`;
  }).join("");
  return `<div class="table">${head2}${body}</div>`;
}
function kpiBlock() {
  return Array.from({ length: 3 }, () => {
    return `<div class="kpi-card">
  ${bone("line sm w-45")}
  ${bone("line lg w-60")}
  ${bone("line sm w-35")}
</div>`;
  }).join("");
}
function formBlock() {
  return `<div class="stack">
  <div class="form-field">
    ${bone("form-label")}
    ${bone("form-input")}
  </div>
  <div class="form-field">
    ${bone("form-label")}
    ${bone("form-input")}
  </div>
  <div class="form-field">
    ${bone("form-label")}
    ${bone("form-input")}
  </div>
</div>`;
}
function completeBlock(rows) {
  return `${avatarBlock()}
${bone("block sm")}
${tableBlock(Math.min(rows, 3))}`;
}
function renderSkeletonMarkup(variant, rows) {
  switch (variant) {
    case "avatar":
      return avatarBlock();
    case "card":
      return cardBlock();
    case "table":
      return tableBlock(rows);
    case "list":
      return listBlock(rows);
    case "media":
      return mediaBlock();
    case "kpi":
      return kpiBlock();
    case "form":
      return formBlock();
    case "dense":
      return textLines(true);
    case "complete":
      return completeBlock(rows);
    case "text":
    default:
      return textLines(false);
  }
}

// src/components/skeleton/skeleton-styles.ts
var skeletonStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  /* Presentacion unica: gris clarito */
  --gob-sk-base: #e8e8e8;
  --gob-sk-shine: #f5f5f5;
  --gob-sk-mid: rgba(255, 255, 255, 0.55);
  --gob-sk-radius: 10px;
  --gob-sk-bg: #ffffff;
  --gob-sk-border: rgba(24, 21, 17, 0.08);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  gap: 12px;
  min-width: 0;
  padding: 18px;
  border: 1px solid var(--gob-sk-border);
  border-radius: 16px;
  background: var(--gob-sk-bg);
}

.root[data-variant='dense'] {
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
}

.root[data-variant='kpi'] {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.bone {
  display: block;
  background: var(--gob-sk-base);
  border-radius: var(--gob-sk-radius);
  position: relative;
  overflow: hidden;
}

.root[data-animated='true'] .bone::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 0%,
    var(--gob-sk-mid) 42%,
    var(--gob-sk-shine) 50%,
    var(--gob-sk-mid) 58%,
    transparent 100%
  );
  transform: translateX(-120%);
  animation: gob-sk-shimmer 1.45s ease-in-out infinite;
}

@keyframes gob-sk-shimmer {
  100% {
    transform: translateX(120%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .root[data-animated='true'] .bone::after {
    animation: none;
    opacity: 0;
  }
}

.line {
  height: 12px;
  width: 100%;
  border-radius: 8px;
}
.line.w-90 { width: 90%; }
.line.w-75 { width: 75%; }
.line.w-60 { width: 60%; }
.line.w-45 { width: 45%; }
.line.w-35 { width: 35%; }
.line.sm { height: 10px; }
.line.lg { height: 16px; }

.circle {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.circle.lg {
  width: 52px;
  height: 52px;
}

.block {
  width: 100%;
  height: 120px;
  border-radius: 12px;
}
.block.sm {
  height: 72px;
}
.block.tall {
  height: 160px;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.col {
  display: grid;
  gap: 8px;
  min-width: 0;
  flex: 1 1 auto;
}
.stack {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.table {
  display: grid;
  gap: 10px;
}
.table-head,
.table-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr 0.8fr 0.7fr;
  gap: 10px;
  align-items: center;
}
.table-head .bone {
  height: 10px;
  opacity: 0.85;
}

.kpi-card {
  display: grid;
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--gob-sk-border);
  border-radius: 14px;
  background: #ffffff;
}

.form-field {
  display: grid;
  gap: 8px;
}
.form-label {
  height: 10px;
  width: 28%;
}
.form-input {
  height: 36px;
  border-radius: 10px;
}

.media {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 0;
}
`;

// src/components/skeleton/gob-skeleton.element.ts
var GobSkeletonElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = skeletonStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("role", "status");
    this.rootEl.setAttribute("aria-live", "polite");
    this.rootEl.setAttribute("aria-busy", "true");
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...SKELETON_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.sync();
  }
  attributeChangedCallback() {
    this.sync();
  }
  sync() {
    const variant = resolveSkeletonVariant(this.getAttribute("variant"));
    const rows = resolveSkeletonRows(this.getAttribute("rows"));
    const animated = resolveSkeletonAnimated(this.getAttribute("animated"));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.animated = animated ? "true" : "false";
    this.rootEl.setAttribute("aria-label", "Cargando contenido");
    this.rootEl.innerHTML = renderSkeletonMarkup(variant, rows);
  }
};
defineCustomElement("gob-skeleton", GobSkeletonElement);

// src/components/progress/progress-constants.ts
var PROGRESS_OBSERVED_ATTRIBUTES = [
  "variant",
  "value",
  "max",
  "label",
  "status",
  "steps"
];
function resolveProgressVariant(value) {
  if (value === "labeled" || value === "thin" || value === "thick" || value === "ring" || value === "steps" || value === "segmented" || value === "indeterminate" || value === "stacked" || value === "complete" || value === "bar") {
    return value;
  }
  return "bar";
}
function resolveProgressStatus(value) {
  if (value === "info" || value === "warning" || value === "success" || value === "danger" || value === "default") {
    return value;
  }
  return "default";
}
function resolveProgressNumber(value, fallback, min = 0, max = 100) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// src/components/progress/progress-render.ts
function pct(value, max) {
  if (max <= 0) return 0;
  return Math.round(value / max * 1e3) / 10;
}
function statusLabel(status) {
  switch (status) {
    case "info":
      return "En curso";
    case "warning":
      return "Revision";
    case "success":
      return "Completado";
    case "danger":
      return "Retrasado";
    default:
      return "Avance";
  }
}
function head(label, valueText, status, showPill, compactValue = false) {
  const valueHtml = compactValue ? `<p class="value" style="font-size:15px;letter-spacing:-0.02em">${valueText}</p>` : `<p class="value">${valueText.replace("%", "")}<small>%</small></p>`;
  return `<div class="head">
  <div class="head-main">
    <div class="meta">
      ${showPill ? `<span class="pill">${statusLabel(status)}</span>` : ""}
    </div>
    <p class="label">${label}</p>
  </div>
  ${valueHtml}
</div>`;
}
function barTrack(percent, stacked = false) {
  return `<div class="track" part="track">
  <span class="fill" part="fill" style="width:${percent}%">
    ${stacked ? '<span class="fill-accent" aria-hidden="true"></span>' : ""}
  </span>
</div>`;
}
function ringMarkup(percent, showCaption = true) {
  const size = 118;
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c - percent / 100 * c;
  const haloR = 50;
  return `<div class="ring-wrap">
  <div class="ring" part="ring">
    <svg viewBox="0 0 ${size} ${size}" aria-hidden="true">
      <circle class="ring-halo" cx="59" cy="59" r="${haloR}"></circle>
      <circle class="ring-track" cx="59" cy="59" r="${r}"></circle>
      <circle class="ring-fill" cx="59" cy="59" r="${r}"
        stroke-dasharray="${c.toFixed(2)}"
        stroke-dashoffset="${offset.toFixed(2)}"></circle>
    </svg>
    <div class="ring-center">
      ${Math.round(percent)}%
      ${showCaption ? "<span>avance</span>" : ""}
    </div>
  </div>
</div>`;
}
function ringMarkupCompact(percent) {
  const size = 92;
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - percent / 100 * c;
  return `<div class="ring" part="ring">
  <svg viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle class="ring-track" cx="46" cy="46" r="${r}" stroke-width="8"></circle>
    <circle class="ring-fill" cx="46" cy="46" r="${r}" stroke-width="8"
      stroke-dasharray="${c.toFixed(2)}"
      stroke-dashoffset="${offset.toFixed(2)}"></circle>
  </svg>
  <div class="ring-center" style="font-size:18px">
    ${Math.round(percent)}%
  </div>
</div>`;
}
function stepsMarkup(value, steps) {
  const active = Math.min(
    steps,
    Math.max(1, Math.round(value / 100 * steps) || 1)
  );
  const parts = ['<div class="steps" part="steps">'];
  for (let i = 1; i <= steps; i += 1) {
    const done = i < active;
    const isActive = i === active;
    parts.push(`<div class="step" data-done="${done ? "true" : "false"}" data-active="${isActive ? "true" : "false"}">
  <span class="step-dot">${i}</span>
  ${i < steps ? '<span class="step-line"></span>' : ""}
</div>`);
  }
  parts.push("</div>");
  return parts.join("");
}
function segmentedMarkup(percent, segments) {
  const onCount = Math.round(percent / 100 * segments);
  const parts = [
    `<div class="segments" style="--gob-pg-segments:${segments}" part="segments">`
  ];
  for (let i = 0; i < segments; i += 1) {
    parts.push(
      `<span class="segment" data-on="${i < onCount ? "true" : "false"}"></span>`
    );
  }
  parts.push("</div>");
  return parts.join("");
}
function renderProgressMarkup(options) {
  const { variant, value, max, label, status, steps } = options;
  const percent = pct(value, max);
  const rounded = Math.round(percent);
  const valueText = variant === "indeterminate" ? "\u2026" : `${rounded}%`;
  const showHead = variant === "labeled" || variant === "complete" || variant === "stacked" || variant === "steps" || variant === "segmented" || variant === "ring" || variant === "thick";
  const showPill = variant === "complete" || status !== "default";
  const parts = [];
  if (showHead) {
    parts.push(
      head(
        label,
        valueText,
        status,
        showPill,
        variant === "steps" || variant === "indeterminate"
      )
    );
  }
  switch (variant) {
    case "ring":
      parts.push(ringMarkup(percent));
      break;
    case "steps": {
      const stepNow = Math.max(1, Math.round(percent / 100 * steps) || 1);
      parts.push(stepsMarkup(percent, steps));
      parts.push(`<p class="hint">Paso ${stepNow} de ${steps}</p>`);
      break;
    }
    case "segmented":
      parts.push(segmentedMarkup(percent, steps));
      break;
    case "indeterminate":
      if (!showHead) {
        parts.push(`<p class="label">${label || "Procesando\u2026"}</p>`);
      }
      parts.push(barTrack(36));
      parts.push(`<p class="hint">Proceso en curso</p>`);
      break;
    case "complete":
      parts.push(`<div class="complete-row">
  ${ringMarkupCompact(percent)}
  <div class="complete-side">
    ${barTrack(percent)}
    <p class="hint">${label}</p>
  </div>
</div>`);
      break;
    case "stacked":
      parts.push(barTrack(percent, true));
      break;
    case "labeled":
    case "thin":
    case "thick":
    case "bar":
    default:
      parts.push(barTrack(percent));
      break;
  }
  return parts.join("");
}

// src/components/progress/progress-styles.ts
var progressStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-pg-vino: #9f2141;
  --gob-pg-dorado: #bc945a;
  --gob-pg-track: #f0eeeb;
  --gob-pg-fill: var(--gob-pg-vino);
  --gob-pg-fill-2: var(--gob-pg-dorado);
  --gob-pg-title: #181511;
  --gob-pg-muted: #8a8278;
  --gob-pg-bg: #ffffff;
  --gob-pg-border: rgba(24, 21, 17, 0.07);
  --gob-pg-radius: 20px;
  --gob-pg-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  gap: 14px;
  min-width: 0;
  padding: 22px 22px 20px;
  border: 1px solid var(--gob-pg-border);
  border-radius: var(--gob-pg-radius);
  background: var(--gob-pg-bg);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.7) inset,
    0 12px 28px rgba(24, 21, 17, 0.045);
}

.root[data-variant='thin'],
.root[data-variant='bar'] {
  padding: 16px 18px;
  gap: 0;
  box-shadow: none;
}

.root[data-status='info'] { --gob-pg-fill: #2f5f8a; --gob-pg-fill-2: #5a86ad; }
.root[data-status='warning'] { --gob-pg-fill: #d0921a; --gob-pg-fill-2: #bc945a; }
.root[data-status='success'] { --gob-pg-fill: #1f8a55; --gob-pg-fill-2: #4aa879; }
.root[data-status='danger'] { --gob-pg-fill: #c62828; --gob-pg-fill-2: #9f2141; }

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
}

.head-main {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.label {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--gob-pg-title);
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.value {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--gob-pg-title);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.value small {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--gob-pg-dorado);
  margin-left: 2px;
}

.track {
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: var(--gob-pg-track);
  overflow: hidden;
}

.root[data-variant='thin'] .track { height: 4px; }
.root[data-variant='thick'] .track,
.root[data-variant='labeled'] .track,
.root[data-variant='stacked'] .track,
.root[data-variant='complete'] .track {
  height: 12px;
}

.fill {
  position: relative;
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--gob-pg-fill);
  transition: width 520ms var(--gob-pg-ease);
}

.fill::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 100%;
  border-radius: 999px;
  background: color-mix(in srgb, #fff 28%, transparent);
  opacity: 0.9;
}

.root[data-variant='stacked'] .fill {
  background: var(--gob-pg-vino);
}
.root[data-variant='stacked'] .fill-accent {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 18%;
  min-width: 18px;
  max-width: 48px;
  background: var(--gob-pg-dorado);
  border-radius: 0 999px 999px 0;
}

/* Indeterminate */
.root[data-variant='indeterminate'] .track {
  height: 8px;
}
.root[data-variant='indeterminate'] .fill {
  width: 32% !important;
  background: var(--gob-pg-vino);
  animation: gob-pg-indeterminate 1.5s var(--gob-pg-ease) infinite;
}
.root[data-variant='indeterminate'] .fill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gob-pg-dorado);
  opacity: 0.35;
  mix-blend-mode: soft-light;
}

@keyframes gob-pg-indeterminate {
  0% { transform: translateX(-130%); }
  100% { transform: translateX(360%); }
}

@media (prefers-reduced-motion: reduce) {
  .root[data-variant='indeterminate'] .fill {
    animation: none;
    width: 48% !important;
    transform: none;
  }
  .fill { transition: none; }
  .ring-fill { transition: none; }
  .step-dot { transition: none; }
}

/* Segmented */
.segments {
  display: grid;
  grid-template-columns: repeat(var(--gob-pg-segments, 4), minmax(0, 1fr));
  gap: 8px;
}
.segment {
  height: 12px;
  border-radius: 999px;
  background: var(--gob-pg-track);
  overflow: hidden;
  transition: background 280ms var(--gob-pg-ease), transform 280ms var(--gob-pg-ease);
}
.segment[data-on='true'] {
  background: var(--gob-pg-fill);
  transform: scaleY(1.08);
}
.segment:nth-child(even)[data-on='true'] {
  background: var(--gob-pg-fill-2);
}

/* Steps */
.steps {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 0 2px;
}
.step {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
}
.step:last-child {
  flex: 0 0 auto;
}
.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #fff;
  color: var(--gob-pg-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex: 0 0 auto;
  border: 2px solid #e6e2dc;
  box-shadow: 0 0 0 4px rgba(188, 148, 90, 0.08);
  transition:
    background 280ms var(--gob-pg-ease),
    color 280ms var(--gob-pg-ease),
    border-color 280ms var(--gob-pg-ease),
    box-shadow 280ms var(--gob-pg-ease),
    transform 280ms var(--gob-pg-ease);
}
.step[data-done='true'] .step-dot,
.step[data-active='true'] .step-dot {
  background: var(--gob-pg-fill);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--gob-pg-fill) 16%, transparent);
}
.step[data-active='true'] .step-dot {
  transform: scale(1.08);
}
.step:nth-child(even)[data-done='true'] .step-dot,
.step:nth-child(even)[data-active='true'] .step-dot {
  background: var(--gob-pg-fill-2);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--gob-pg-fill-2) 18%, transparent);
}
.step-line {
  height: 2px;
  flex: 1 1 auto;
  margin: 0 8px;
  border-radius: 999px;
  background: #e8e4de;
  position: relative;
  overflow: hidden;
}
.step[data-done='true'] .step-line {
  background: var(--gob-pg-fill);
}

/* Ring */
.ring-wrap {
  display: grid;
  justify-items: center;
  gap: 10px;
}
.ring {
  position: relative;
  width: 118px;
  height: 118px;
}
.root[data-variant='complete'] .ring {
  width: 92px;
  height: 92px;
}
.ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.ring-track {
  fill: none;
  stroke: var(--gob-pg-track);
  stroke-width: 9;
}
.ring-halo {
  fill: none;
  stroke: color-mix(in srgb, var(--gob-pg-dorado) 35%, transparent);
  stroke-width: 2;
}
.ring-fill {
  fill: none;
  stroke: var(--gob-pg-fill);
  stroke-width: 9;
  stroke-linecap: round;
  transition: stroke-dashoffset 620ms var(--gob-pg-ease);
}
.ring-center {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--gob-pg-title);
  font-variant-numeric: tabular-nums;
}
.ring-center span {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-pg-dorado);
}

.complete-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 18px;
  align-items: center;
}
.complete-side {
  display: grid;
  gap: 12px;
  min-width: 0;
}

.hint {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-pg-muted);
  letter-spacing: -0.01em;
}

.pill {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: #9f2141;
}
.root[data-status='info'] .pill {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
}
.root[data-status='warning'] .pill {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
}
.root[data-status='success'] .pill {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
}
.root[data-status='danger'] .pill {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
}
`;

// src/components/progress/gob-progress.element.ts
var GobProgressElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = progressStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("role", "progressbar");
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...PROGRESS_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.sync();
  }
  attributeChangedCallback() {
    this.sync();
  }
  sync() {
    const variant = resolveProgressVariant(this.getAttribute("variant"));
    const max = resolveProgressNumber(this.getAttribute("max"), 100, 1, 1e3);
    const value = resolveProgressNumber(this.getAttribute("value"), 0, 0, max);
    const status = resolveProgressStatus(this.getAttribute("status"));
    const steps = resolveProgressNumber(this.getAttribute("steps"), 4, 2, 8);
    const label = this.getAttribute("label")?.trim() || "Progreso";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    const percent = max > 0 ? Math.round(value / max * 100) : 0;
    this.rootEl.setAttribute("aria-valuemin", "0");
    this.rootEl.setAttribute("aria-valuemax", String(max));
    if (variant === "indeterminate") {
      this.rootEl.removeAttribute("aria-valuenow");
      this.rootEl.setAttribute("aria-label", label);
    } else {
      this.rootEl.setAttribute("aria-valuenow", String(value));
      this.rootEl.setAttribute("aria-valuetext", `${percent}%`);
      this.rootEl.setAttribute("aria-label", `${label}: ${percent}%`);
    }
    this.rootEl.innerHTML = renderProgressMarkup({
      variant,
      value,
      max,
      label,
      status,
      steps
    });
  }
};
defineCustomElement("gob-progress", GobProgressElement);

// src/components/spinner/spinner-constants.ts
var SPINNER_VARIANTS = [
  "ring",
  "dual",
  "dots",
  "pulse",
  "bars",
  "button",
  "inline",
  "page",
  "overlay",
  "complete",
  "orbit",
  "arc",
  "dash",
  "comet",
  "petals",
  "metro",
  "wave",
  "radar",
  "infinity",
  "morph"
];
var SPINNER_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "size",
  "status"
];
function resolveSpinnerVariant(value) {
  if (SPINNER_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "ring";
}
function resolveSpinnerSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}
function resolveSpinnerStatus(value) {
  if (value === "info" || value === "warning" || value === "success" || value === "danger" || value === "default") {
    return value;
  }
  return "default";
}

// src/components/spinner/spinner-render.ts
function statusLabel2(status) {
  switch (status) {
    case "info":
      return "En curso";
    case "warning":
      return "Espera";
    case "success":
      return "Listo";
    case "danger":
      return "Error";
    default:
      return "Cargando";
  }
}
function visualFor(variant) {
  switch (variant) {
    case "dual":
    case "complete":
    case "page":
    case "overlay":
      return `<div class="visual" aria-hidden="true">
  <div class="dual">
    <span class="dual-outer"></span>
    <span class="dual-inner"></span>
  </div>
</div>`;
    case "dots":
      return `<div class="dots" aria-hidden="true">
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>`;
    case "pulse":
      return `<div class="visual" aria-hidden="true"><span class="pulse"></span></div>`;
    case "bars":
      return `<div class="bars" aria-hidden="true">
  <span class="bar"></span>
  <span class="bar"></span>
  <span class="bar"></span>
  <span class="bar"></span>
</div>`;
    case "orbit":
      return `<div class="visual" aria-hidden="true">
  <div class="orbit">
    <span class="orbit-core"></span>
    <span class="orbit-sat"></span>
  </div>
</div>`;
    case "arc":
      return `<div class="visual" aria-hidden="true">
  <svg class="arc" viewBox="0 0 48 48">
    <circle class="arc-track" cx="24" cy="24" r="18"></circle>
    <circle class="arc-stroke" cx="24" cy="24" r="18"></circle>
  </svg>
</div>`;
    case "dash":
      return `<div class="visual" aria-hidden="true"><span class="dash"></span></div>`;
    case "comet":
      return `<div class="visual" aria-hidden="true">
  <div class="comet">
    <span class="comet-tail"></span>
    <span class="comet-head"></span>
  </div>
</div>`;
    case "petals":
      return `<div class="visual" aria-hidden="true">
  <div class="petals">
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
    <span class="petal"></span>
  </div>
</div>`;
    case "metro":
      return `<div class="visual" aria-hidden="true">
  <div class="metro">
    <span></span><span></span><span></span><span></span>
  </div>
</div>`;
    case "wave":
      return `<div class="wave" aria-hidden="true">
  <i></i><i></i><i></i><i></i><i></i>
</div>`;
    case "radar":
      return `<div class="visual" aria-hidden="true">
  <div class="radar">
    <span class="radar-sweep"></span>
    <span class="radar-dot"></span>
  </div>
</div>`;
    case "infinity":
      return `<div class="visual" aria-hidden="true">
  <div class="infinity">
    <span class="infinity-path"></span>
    <span class="infinity-a"></span>
    <span class="infinity-b"></span>
  </div>
</div>`;
    case "morph":
      return `<div class="visual" aria-hidden="true"><span class="morph"></span></div>`;
    case "button":
    case "inline":
    case "ring":
    default:
      return `<div class="visual" aria-hidden="true"><span class="ring"></span></div>`;
  }
}
function renderSpinnerMarkup(options) {
  const { variant, label, status } = options;
  const visual = visualFor(variant);
  const showPill = status !== "default" || variant === "complete" || variant === "overlay";
  const showLabel = variant === "inline" || variant === "page" || variant === "overlay" || variant === "complete" || Boolean(label && variant !== "ring" && variant !== "button");
  if (variant === "button") {
    return `${visual}`;
  }
  if (variant === "inline") {
    return `${visual}<p class="label" style="font-size:13px">${label || "Cargando\u2026"}</p>`;
  }
  if (variant === "complete" || variant === "page" || variant === "overlay") {
    return `${showPill ? `<span class="pill">${statusLabel2(status)}</span>` : ""}
${visual}
<div class="copy">
  <p class="label">${label || "Cargando contenido"}</p>
  <p class="hint">Esto puede tomar unos segundos</p>
</div>`;
  }
  const parts = [visual];
  if (showPill && status !== "default") {
    parts.unshift(`<span class="pill">${statusLabel2(status)}</span>`);
  }
  if (showLabel && label) {
    parts.push(`<p class="label">${label}</p>`);
  }
  return parts.join("");
}

// src/components/spinner/spinner-styles.ts
var spinnerStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sp-vino: #9f2141;
  --gob-sp-dorado: #bc945a;
  --gob-sp-accent: var(--gob-sp-vino);
  --gob-sp-accent-2: var(--gob-sp-dorado);
  --gob-sp-track: #efece7;
  --gob-sp-title: #181511;
  --gob-sp-muted: #8a8278;
  --gob-sp-bg: #ffffff;
  --gob-sp-border: rgba(24, 21, 17, 0.07);
  --gob-sp-size: 36px;
  --gob-sp-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  place-items: center;
  gap: 14px;
  min-width: 0;
  padding: 28px 22px;
  border: 1px solid var(--gob-sp-border);
  border-radius: 20px;
  background: var(--gob-sp-bg);
  box-shadow: 0 12px 28px rgba(24, 21, 17, 0.045);
}

.root[data-size='sm'] { --gob-sp-size: 24px; }
.root[data-size='md'] { --gob-sp-size: 36px; }
.root[data-size='lg'] { --gob-sp-size: 52px; }

.root[data-status='info'] { --gob-sp-accent: #2f5f8a; --gob-sp-accent-2: #5a86ad; }
.root[data-status='warning'] { --gob-sp-accent: #d0921a; --gob-sp-accent-2: #bc945a; }
.root[data-status='success'] { --gob-sp-accent: #1f8a55; --gob-sp-accent-2: #4aa879; }
.root[data-status='danger'] { --gob-sp-accent: #c62828; --gob-sp-accent-2: #9f2141; }

.root[data-variant='button'],
.root[data-variant='inline'] {
  display: inline-flex;
  width: auto;
  place-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  box-shadow: none;
}

.root[data-variant='page'] {
  min-height: 220px;
  gap: 16px;
}

.root[data-variant='overlay'] {
  min-height: 180px;
  background: #ffffff;
}

.visual {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--gob-sp-size);
  height: var(--gob-sp-size);
}

.label {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--gob-sp-title);
  text-align: center;
}

.hint {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sp-muted);
  text-align: center;
}

.pill {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: color-mix(in srgb, var(--gob-sp-accent) 12%, transparent);
  color: var(--gob-sp-accent);
}

/* Ring */
.ring {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  border: 3px solid var(--gob-sp-track);
  border-top-color: var(--gob-sp-accent);
  animation: gob-sp-spin 0.85s linear infinite;
}

.root[data-size='sm'] .ring { border-width: 2px; }
.root[data-size='lg'] .ring { border-width: 4px; }

/* Dual */
.dual {
  position: relative;
  width: 100%;
  height: 100%;
}
.dual-outer,
.dual-inner {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 3px solid transparent;
}
.dual-outer {
  border-top-color: var(--gob-sp-accent);
  border-right-color: color-mix(in srgb, var(--gob-sp-accent) 35%, transparent);
  animation: gob-sp-spin 0.95s linear infinite;
}
.dual-inner {
  inset: 22%;
  border-bottom-color: var(--gob-sp-accent-2);
  border-left-color: color-mix(in srgb, var(--gob-sp-accent-2) 40%, transparent);
  animation: gob-sp-spin-rev 0.7s linear infinite;
}

/* Dots */
.dots {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: var(--gob-sp-size);
}
.dot {
  width: calc(var(--gob-sp-size) * 0.22);
  height: calc(var(--gob-sp-size) * 0.22);
  border-radius: 999px;
  background: var(--gob-sp-accent);
  animation: gob-sp-bounce 0.9s var(--gob-sp-ease) infinite;
}
.dot:nth-child(2) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.12s;
}
.dot:nth-child(3) {
  animation-delay: 0.24s;
}

/* Pulse */
.pulse {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--gob-sp-accent);
  animation: gob-sp-pulse 1.15s var(--gob-sp-ease) infinite;
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--gob-sp-accent-2) 35%, transparent);
}

/* Bars */
.bars {
  display: inline-flex;
  align-items: flex-end;
  gap: 5px;
  height: var(--gob-sp-size);
}
.bar {
  width: calc(var(--gob-sp-size) * 0.16);
  height: 35%;
  border-radius: 999px;
  background: var(--gob-sp-accent);
  animation: gob-sp-bars 0.85s ease-in-out infinite;
}
.bar:nth-child(2) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.1s;
}
.bar:nth-child(3) {
  animation-delay: 0.2s;
}
.bar:nth-child(4) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.3s;
}

.root[data-variant='complete'] {
  gap: 12px;
}
.root[data-variant='complete'] .copy {
  display: grid;
  gap: 6px;
  justify-items: center;
}

/* \u2014\u2014 10 variantes modernas \u2014\u2014 */

/* Orbit */
.orbit {
  position: relative;
  width: 100%;
  height: 100%;
  animation: gob-sp-spin 1.15s linear infinite;
}
.orbit-core {
  position: absolute;
  inset: 36%;
  border-radius: 999px;
  background: var(--gob-sp-accent);
}
.orbit-sat {
  position: absolute;
  top: 4%;
  left: 50%;
  width: 22%;
  height: 22%;
  margin-left: -11%;
  border-radius: 999px;
  background: var(--gob-sp-accent-2);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gob-sp-accent-2) 18%, transparent);
}

/* Arc SVG */
.arc {
  width: 100%;
  height: 100%;
  animation: gob-sp-spin 0.9s linear infinite;
}
.arc-track {
  fill: none;
  stroke: var(--gob-sp-track);
  stroke-width: 3.5;
}
.arc-stroke {
  fill: none;
  stroke: var(--gob-sp-accent);
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-dasharray: 52 120;
}

/* Dash ring */
.dash {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  border: 3px dashed color-mix(in srgb, var(--gob-sp-accent) 55%, var(--gob-sp-track));
  border-top-color: var(--gob-sp-accent);
  border-right-color: var(--gob-sp-accent-2);
  animation: gob-sp-spin 1.2s linear infinite;
}

/* Comet */
.comet {
  position: relative;
  width: 100%;
  height: 100%;
  animation: gob-sp-spin 0.85s linear infinite;
}
.comet-tail {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 3px solid transparent;
  border-top-color: var(--gob-sp-accent);
  border-right-color: color-mix(in srgb, var(--gob-sp-accent) 25%, transparent);
  filter: drop-shadow(0 0 4px color-mix(in srgb, var(--gob-sp-accent) 35%, transparent));
}
.comet-head {
  position: absolute;
  top: 0;
  left: 50%;
  width: 18%;
  height: 18%;
  margin-left: -9%;
  border-radius: 999px;
  background: var(--gob-sp-accent-2);
}

/* Petals */
.petals {
  position: relative;
  width: 100%;
  height: 100%;
  animation: gob-sp-spin 1.35s linear infinite;
}
.petal {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28%;
  height: 28%;
  margin: -14% 0 0 -14%;
  border-radius: 999px;
  background: var(--gob-sp-accent);
  transform-origin: center center;
  opacity: 0.9;
}
.petal:nth-child(1) { transform: rotate(0deg) translateY(-120%); background: var(--gob-sp-accent); }
.petal:nth-child(2) { transform: rotate(72deg) translateY(-120%); background: var(--gob-sp-accent-2); opacity: 0.75; }
.petal:nth-child(3) { transform: rotate(144deg) translateY(-120%); background: var(--gob-sp-accent); opacity: 0.6; }
.petal:nth-child(4) { transform: rotate(216deg) translateY(-120%); background: var(--gob-sp-accent-2); opacity: 0.75; }
.petal:nth-child(5) { transform: rotate(288deg) translateY(-120%); background: var(--gob-sp-accent); opacity: 0.5; }

/* Metro squares */
.metro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  width: 72%;
  height: 72%;
}
.metro span {
  border-radius: 5px;
  background: var(--gob-sp-accent);
  animation: gob-sp-metro 1.1s var(--gob-sp-ease) infinite;
}
.metro span:nth-child(2) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.12s;
}
.metro span:nth-child(3) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.24s;
}
.metro span:nth-child(4) {
  animation-delay: 0.36s;
}

/* Wave */
.wave {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: var(--gob-sp-size);
}
.wave i {
  width: calc(var(--gob-sp-size) * 0.18);
  height: calc(var(--gob-sp-size) * 0.18);
  border-radius: 999px;
  background: var(--gob-sp-accent);
  animation: gob-sp-wave 1s var(--gob-sp-ease) infinite;
}
.wave i:nth-child(even) { background: var(--gob-sp-accent-2); }
.wave i:nth-child(2) { animation-delay: 0.08s; }
.wave i:nth-child(3) { animation-delay: 0.16s; }
.wave i:nth-child(4) { animation-delay: 0.24s; }
.wave i:nth-child(5) { animation-delay: 0.32s; }

/* Radar */
.radar {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--gob-sp-track);
  overflow: hidden;
}
.radar::before {
  content: '';
  position: absolute;
  inset: 18%;
  border-radius: 999px;
  border: 1.5px solid color-mix(in srgb, var(--gob-sp-accent-2) 45%, transparent);
}
.radar-sweep {
  position: absolute;
  inset: 0;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    color-mix(in srgb, var(--gob-sp-accent) 55%, transparent) 55deg,
    transparent 90deg
  );
  animation: gob-sp-spin 1.25s linear infinite;
}
.radar-dot {
  position: absolute;
  top: 12%;
  left: 50%;
  width: 10%;
  height: 10%;
  margin-left: -5%;
  border-radius: 999px;
  background: var(--gob-sp-accent-2);
  animation: gob-sp-spin 1.25s linear infinite;
  transform-origin: 50% 380%;
}

/* Infinity */
.infinity {
  position: relative;
  width: 100%;
  height: 100%;
}
.infinity-path {
  position: absolute;
  inset: 18% 8%;
  border: 3px solid var(--gob-sp-track);
  border-radius: 999px 999px 999px 999px / 999px 999px 999px 999px;
  clip-path: none;
}
.infinity-a,
.infinity-b {
  position: absolute;
  top: 50%;
  width: 18%;
  height: 18%;
  margin-top: -9%;
  border-radius: 999px;
  animation: gob-sp-infinity 1.4s var(--gob-sp-ease) infinite;
}
.infinity-a {
  left: 12%;
  background: var(--gob-sp-accent);
}
.infinity-b {
  right: 12%;
  background: var(--gob-sp-accent-2);
  animation-delay: 0.7s;
}

/* Morph */
.morph {
  width: 72%;
  height: 72%;
  background: var(--gob-sp-accent);
  border-radius: 42% 58% 60% 40% / 40% 42% 58% 60%;
  animation: gob-sp-morph 1.4s var(--gob-sp-ease) infinite;
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--gob-sp-accent-2) 18%, transparent);
}

@keyframes gob-sp-spin {
  to { transform: rotate(360deg); }
}
@keyframes gob-sp-spin-rev {
  to { transform: rotate(-360deg); }
}
@keyframes gob-sp-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.55; }
  40% { transform: translateY(-38%); opacity: 1; }
}
@keyframes gob-sp-pulse {
  0% { transform: scale(0.82); opacity: 0.75; box-shadow: 0 0 0 0 color-mix(in srgb, var(--gob-sp-accent-2) 40%, transparent); }
  70% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 12px transparent; }
  100% { transform: scale(0.82); opacity: 0.75; box-shadow: 0 0 0 0 transparent; }
}
@keyframes gob-sp-bars {
  0%, 100% { height: 32%; }
  50% { height: 100%; }
}
@keyframes gob-sp-metro {
  0%, 100% { transform: scale(0.72); opacity: 0.45; }
  40% { transform: scale(1); opacity: 1; }
}
@keyframes gob-sp-wave {
  0%, 100% { transform: translateY(0) scale(0.85); opacity: 0.5; }
  50% { transform: translateY(-55%) scale(1); opacity: 1; }
}
@keyframes gob-sp-infinity {
  0%, 100% { transform: translateX(0) scale(0.9); opacity: 0.65; }
  50% { transform: translateX(55%) scale(1.08); opacity: 1; }
}
@keyframes gob-sp-morph {
  0% { border-radius: 42% 58% 60% 40% / 40% 42% 58% 60%; transform: rotate(0deg) scale(0.92); background: var(--gob-sp-accent); }
  50% { border-radius: 60% 40% 42% 58% / 58% 60% 40% 42%; transform: rotate(180deg) scale(1); background: var(--gob-sp-accent-2); }
  100% { border-radius: 42% 58% 60% 40% / 40% 42% 58% 60%; transform: rotate(360deg) scale(0.92); background: var(--gob-sp-accent); }
}

@media (prefers-reduced-motion: reduce) {
  .ring,
  .dual-outer,
  .dual-inner,
  .dot,
  .pulse,
  .bar,
  .orbit,
  .arc,
  .dash,
  .comet,
  .petals,
  .metro span,
  .wave i,
  .radar-sweep,
  .radar-dot,
  .infinity-a,
  .infinity-b,
  .morph {
    animation: none;
  }
  .ring {
    border-top-color: var(--gob-sp-accent);
    border-right-color: var(--gob-sp-accent-2);
  }
  .pulse { opacity: 0.85; }
  .bar:nth-child(1) { height: 45%; }
  .bar:nth-child(2) { height: 80%; }
  .bar:nth-child(3) { height: 55%; }
  .bar:nth-child(4) { height: 70%; }
  .morph { border-radius: 28%; }
}
`;

// src/components/spinner/gob-spinner.element.ts
var GobSpinnerElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = spinnerStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("role", "status");
    this.rootEl.setAttribute("aria-live", "polite");
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...SPINNER_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.sync();
  }
  attributeChangedCallback() {
    this.sync();
  }
  sync() {
    const variant = resolveSpinnerVariant(this.getAttribute("variant"));
    const size = resolveSpinnerSize(this.getAttribute("size"));
    const status = resolveSpinnerStatus(this.getAttribute("status"));
    const label = this.getAttribute("label")?.trim() || "";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.status = status;
    this.rootEl.setAttribute("aria-label", label || "Cargando");
    this.rootEl.innerHTML = renderSpinnerMarkup({ variant, label, status });
  }
};
defineCustomElement("gob-spinner", GobSpinnerElement);

// src/components/input/input-constants.ts
var INPUT_VARIANTS = [
  "basic",
  "labeled",
  "helper",
  "icon",
  "search",
  "password",
  "prefix",
  "suffix",
  "dense",
  "complete",
  "floating",
  "underline",
  "pill",
  "clearable",
  "code",
  "soft"
];
var INPUT_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info"
];
var INPUT_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "placeholder",
  "helper",
  "value",
  "type",
  "status",
  "size",
  "name",
  "disabled",
  "readonly",
  "required",
  "lead",
  "suffix"
];
function resolveInputVariant(value) {
  if (INPUT_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveInputStatus(value) {
  if (INPUT_STATUSES.includes(value ?? "")) {
    return value;
  }
  return "default";
}
function resolveInputSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}

// src/components/input/input-styles.ts
var inputStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-in-vino: #9f2141;
  --gob-in-dorado: #bc945a;
  --gob-in-title: #181511;
  --gob-in-muted: #8a8278;
  --gob-in-text: #3d3a35;
  --gob-in-border: rgba(24, 21, 17, 0.12);
  --gob-in-border-hover: rgba(24, 21, 17, 0.22);
  --gob-in-focus: var(--gob-in-vino);
  --gob-in-ring: rgba(159, 33, 65, 0.16);
  --gob-in-bg: #ffffff;
  --gob-in-fill: #faf9f7;
  --gob-in-radius: 14px;
  --gob-in-height: 48px;
  --gob-in-pad-x: 14px;
  --gob-in-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

[hidden] {
  display: none !important;
}

.root {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-in-height: 40px;
  --gob-in-radius: 12px;
  --gob-in-pad-x: 12px;
}
.root[data-size='lg'] {
  --gob-in-height: 56px;
  --gob-in-radius: 16px;
  --gob-in-pad-x: 16px;
}
.root[data-variant='dense'] {
  --gob-in-height: 38px;
  --gob-in-radius: 10px;
  gap: 6px;
}

.root[data-status='error'] {
  --gob-in-focus: #c62828;
  --gob-in-ring: rgba(198, 40, 40, 0.16);
}
.root[data-status='success'] {
  --gob-in-focus: #1f8a55;
  --gob-in-ring: rgba(31, 138, 85, 0.16);
}
.root[data-status='warning'] {
  --gob-in-focus: #d0921a;
  --gob-in-ring: rgba(208, 146, 26, 0.18);
}
.root[data-status='info'] {
  --gob-in-focus: #2f5f8a;
  --gob-in-ring: rgba(47, 95, 138, 0.16);
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-in-title);
}

.label .req {
  color: var(--gob-in-vino);
  margin-left: 2px;
}

.control {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  min-height: var(--gob-in-height);
  padding: 0 var(--gob-in-pad-x);
  border: 1.5px solid var(--gob-in-border);
  border-radius: var(--gob-in-radius);
  background: var(--gob-in-bg);
  transition:
    border-color 180ms var(--gob-in-ease),
    box-shadow 180ms var(--gob-in-ease),
    background 180ms var(--gob-in-ease);
}

.control:hover {
  border-color: var(--gob-in-border-hover);
}

.root[data-focused='true'] .control {
  border-color: var(--gob-in-focus);
  box-shadow: 0 0 0 4px var(--gob-in-ring);
  background: #ffffff;
}

.root[data-status='error'] .control {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-in-border));
}
.root[data-status='success'] .control {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-in-border));
}
.root[data-status='warning'] .control {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-in-border));
}

.root[data-disabled='true'] .control {
  background: var(--gob-in-fill);
  opacity: 0.72;
  cursor: not-allowed;
}
.root[data-readonly='true'] .control {
  background: var(--gob-in-fill);
}

.affix {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gob-in-dorado);
  font-size: 13px;
  font-weight: 700;
}

.affix svg {
  width: 18px;
  height: 18px;
  display: block;
}

.root[data-size='sm'] .affix svg {
  width: 16px;
  height: 16px;
}

.field {
  appearance: none;
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  height: calc(var(--gob-in-height) - 4px);
  border: 0;
  outline: none;
  background: transparent;
  color: var(--gob-in-text);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.field::placeholder {
  color: #b0aaa1;
  font-weight: 500;
}

.field:disabled {
  cursor: not-allowed;
  color: var(--gob-in-muted);
}

.toggle {
  appearance: none;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gob-in-muted);
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
}
.toggle:hover {
  background: rgba(188, 148, 90, 0.12);
  color: #7a5a2e;
}
.toggle:focus-visible {
  outline: 2px solid var(--gob-in-ring);
  outline-offset: 1px;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-in-muted);
  line-height: 1.35;
}

.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.pill {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-in-vino);
}
.root[data-status='error'] .pill {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
}
.root[data-status='success'] .pill {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
}
.root[data-status='warning'] .pill {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
}
.root[data-status='info'] .pill {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

/* Floating */
.root[data-variant='floating'] {
  gap: 6px;
}
.root[data-variant='floating'] .control {
  align-items: flex-end;
  min-height: 58px;
  padding: 18px 14px 10px;
}
.root[data-variant='floating'] .float-label {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  transition:
    top 180ms var(--gob-in-ease),
    transform 180ms var(--gob-in-ease),
    font-size 180ms var(--gob-in-ease),
    color 180ms var(--gob-in-ease);
}
.root[data-variant='floating'][data-focused='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  transform: none;
  font-size: 11px;
  font-weight: 700;
  color: var(--gob-in-dorado);
}
.root[data-variant='floating'] .field {
  height: 24px;
}

/* Underline */
.root[data-variant='underline'] .control {
  border: 0;
  border-bottom: 2px solid #e5e1da;
  border-radius: 0;
  padding-left: 2px;
  padding-right: 2px;
  background: transparent;
  box-shadow: none;
}
.root[data-variant='underline'] .control:hover {
  border-bottom-color: color-mix(in srgb, var(--gob-in-dorado) 55%, #e5e1da);
}
.root[data-variant='underline'][data-focused='true'] .control {
  border-bottom-color: var(--gob-in-focus);
  box-shadow: none;
  background: transparent;
}

/* Pill */
.root[data-variant='pill'] .control {
  border-radius: 999px;
  padding-left: 18px;
  padding-right: 18px;
  background: #fff;
}

/* Soft filled \u2014 tinte vino ligero */
.root[data-variant='soft'] .control {
  border-color: transparent;
  background: color-mix(in srgb, var(--gob-in-vino) 7%, #ffffff);
}
.root[data-variant='soft'] .control:hover {
  background: color-mix(in srgb, var(--gob-in-vino) 11%, #ffffff);
  border-color: transparent;
}
.root[data-variant='soft'][data-focused='true'] .control {
  background: #ffffff;
  border-color: var(--gob-in-focus);
}
.root[data-variant='soft'] .affix {
  color: var(--gob-in-vino);
}

/* Code / OTP */
.root[data-variant='code'] .control {
  justify-content: center;
  border-radius: 16px;
  letter-spacing: 0.28em;
}
.root[data-variant='code'] .field {
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.28em;
}
.root[data-variant='code'] .field::placeholder {
  letter-spacing: 0.2em;
  font-weight: 600;
}

/* Clearable */
.clear {
  appearance: none;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-in-muted);
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
}
.clear:hover {
  background: rgba(159, 33, 65, 0.12);
  color: var(--gob-in-vino);
}
`;

// src/components/input/gob-input.element.ts
var ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.6"/><path d="M16.2 16.2L20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.25" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 18.5c1.6-2.6 3.8-3.9 6.5-3.9s4.9 1.3 6.5 3.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.8 12s3.4-6 9.2-6 9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6Z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2.4" stroke="currentColor" stroke-width="1.6"/></svg>`,
  eyeOff: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4l16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9.5 9.6A3 3 0 0 0 14.4 14.5M7.1 7.3C4.7 8.7 3 12 3 12s3.4 6 9 6c1.7 0 3.2-.5 4.5-1.2M10.2 6.3C10.8 6.1 11.4 6 12 6c5.6 0 9 6 9 6a14.7 14.7 0 0 1-1.8 2.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.6"/><path d="M12 8v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="16.2" r="1" fill="currentColor"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M4.5 7.5L12 13l7.5-5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.2 4.8h2.3l1.1 3.2-1.5 1.1a11.5 11.5 0 0 0 5.3 5.3l1.1-1.5 3.2 1.1v2.3c0 .7-.5 1.3-1.2 1.4A14.7 14.7 0 0 1 6.8 6c.1-.7.7-1.2 1.4-1.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
};
function statusPill4(status) {
  switch (status) {
    case "error":
      return "Error";
    case "success":
      return "Valido";
    case "warning":
      return "Revision";
    case "info":
      return "Info";
    default:
      return "";
  }
}
var GobInputElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "field");
    __publicField(this, "labelEl");
    __publicField(this, "helperEl");
    __publicField(this, "headEl");
    __publicField(this, "pillEl");
    __publicField(this, "controlEl");
    __publicField(this, "leadEl");
    __publicField(this, "trailEl");
    __publicField(this, "toggleBtn");
    __publicField(this, "clearBtn");
    __publicField(this, "floatLabelEl");
    __publicField(this, "showPassword", false);
    __publicField(this, "fieldId", `gob-in-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "onFocus", () => {
      this.rootEl.dataset.focused = "true";
    });
    __publicField(this, "onBlur", () => {
      this.rootEl.dataset.focused = "false";
    });
    __publicField(this, "onInput", () => {
      this.rootEl.dataset.filled = this.field.value ? "true" : "false";
      this.updateClearButton();
      this.dispatchEvent(
        new CustomEvent("gob-input", {
          detail: { value: this.field.value },
          bubbles: true,
          composed: true
        })
      );
    });
    __publicField(this, "onToggle", () => {
      this.showPassword = !this.showPassword;
      this.sync();
    });
    __publicField(this, "onClear", () => {
      this.field.value = "";
      this.rootEl.dataset.filled = "false";
      this.updateClearButton();
      this.field.focus();
      this.dispatchEvent(
        new CustomEvent("gob-input", {
          detail: { value: "" },
          bubbles: true,
          composed: true
        })
      );
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = inputStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.headEl = document.createElement("div");
    this.headEl.className = "head";
    this.labelEl = document.createElement("label");
    this.labelEl.className = "label";
    this.pillEl = document.createElement("span");
    this.pillEl.className = "pill";
    this.pillEl.hidden = true;
    this.headEl.append(this.labelEl, this.pillEl);
    this.controlEl = document.createElement("div");
    this.controlEl.className = "control";
    this.controlEl.setAttribute("part", "control");
    this.floatLabelEl = document.createElement("span");
    this.floatLabelEl.className = "float-label";
    this.floatLabelEl.hidden = true;
    this.leadEl = document.createElement("span");
    this.leadEl.className = "affix";
    this.leadEl.hidden = true;
    this.field = document.createElement("input");
    this.field.className = "field";
    this.field.setAttribute("part", "input");
    this.trailEl = document.createElement("span");
    this.trailEl.className = "affix";
    this.trailEl.hidden = true;
    this.toggleBtn = document.createElement("button");
    this.toggleBtn.type = "button";
    this.toggleBtn.className = "toggle";
    this.toggleBtn.hidden = true;
    this.toggleBtn.setAttribute("aria-label", "Mostrar contrasena");
    this.clearBtn = document.createElement("button");
    this.clearBtn.type = "button";
    this.clearBtn.className = "clear";
    this.clearBtn.hidden = true;
    this.clearBtn.setAttribute("aria-label", "Limpiar");
    this.clearBtn.innerHTML = ICONS.x;
    this.controlEl.append(
      this.floatLabelEl,
      this.leadEl,
      this.field,
      this.trailEl,
      this.clearBtn,
      this.toggleBtn
    );
    this.helperEl = document.createElement("p");
    this.helperEl.className = "helper";
    this.helperEl.hidden = true;
    this.rootEl.append(this.headEl, this.controlEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...INPUT_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.field.addEventListener("focus", this.onFocus);
    this.field.addEventListener("blur", this.onBlur);
    this.field.addEventListener("input", this.onInput);
    this.toggleBtn.addEventListener("click", this.onToggle);
    this.clearBtn.addEventListener("click", this.onClear);
    this.sync();
  }
  disconnectedCallback() {
    this.field.removeEventListener("focus", this.onFocus);
    this.field.removeEventListener("blur", this.onBlur);
    this.field.removeEventListener("input", this.onInput);
    this.toggleBtn.removeEventListener("click", this.onToggle);
    this.clearBtn.removeEventListener("click", this.onClear);
  }
  attributeChangedCallback() {
    this.sync();
  }
  updateClearButton() {
    const variant = resolveInputVariant(this.getAttribute("variant"));
    const show = variant === "clearable" && Boolean(this.field.value) && !this.hasAttribute("disabled") && !this.hasAttribute("readonly");
    this.clearBtn.hidden = !show;
  }
  leadingFor(variant) {
    if (variant === "search" || variant === "pill") return ICONS.search;
    if (variant === "icon" || variant === "complete") return ICONS.user;
    if (variant === "soft") return ICONS.mail;
    return null;
  }
  sync() {
    const variant = resolveInputVariant(this.getAttribute("variant"));
    const status = resolveInputStatus(this.getAttribute("status"));
    const size = resolveInputSize(this.getAttribute("size"));
    const label = this.getAttribute("label")?.trim() || "";
    const placeholder = this.getAttribute("placeholder") ?? "";
    const helper = this.getAttribute("helper")?.trim() || "";
    const lead = this.getAttribute("lead")?.trim() || "";
    const suffix = this.getAttribute("suffix")?.trim() || "";
    const name = this.getAttribute("name") ?? "";
    const rawType = this.getAttribute("type") || "text";
    const disabled = this.hasAttribute("disabled");
    const readonly = this.hasAttribute("readonly");
    const required = this.hasAttribute("required");
    const value = this.getAttribute("value") ?? "";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.rootEl.dataset.readonly = readonly ? "true" : "false";
    const isFloating = variant === "floating";
    const showLabel = !isFloating && (Boolean(label) || variant === "labeled" || variant === "helper" || variant === "complete" || variant === "underline" || variant === "pill" || variant === "clearable" || variant === "code" || variant === "soft");
    this.headEl.hidden = !showLabel && status === "default";
    this.labelEl.hidden = !showLabel;
    this.labelEl.replaceChildren();
    this.labelEl.append(document.createTextNode(label || "Campo"));
    if (required) {
      const req = document.createElement("span");
      req.className = "req";
      req.textContent = "*";
      this.labelEl.appendChild(req);
    }
    const pill = statusPill4(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.field.id = this.fieldId;
    this.labelEl.htmlFor = this.fieldId;
    const isPassword = variant === "password" || rawType === "password";
    this.field.type = isPassword ? this.showPassword ? "text" : "password" : variant === "search" ? "search" : variant === "soft" ? "email" : rawType;
    this.field.placeholder = isFloating ? " " : placeholder;
    this.field.name = name;
    this.field.disabled = disabled;
    this.field.readOnly = readonly;
    this.field.required = required;
    if (variant === "code") {
      this.field.maxLength = 6;
      this.field.autocomplete = "one-time-code";
      this.field.inputMode = "numeric";
    } else {
      this.field.removeAttribute("maxlength");
      this.field.autocomplete = "on";
      this.field.inputMode = "text";
    }
    if (this.field.value !== value) this.field.value = value;
    this.rootEl.dataset.filled = this.field.value ? "true" : "false";
    if (isFloating) {
      this.floatLabelEl.hidden = false;
      this.floatLabelEl.textContent = label || "Etiqueta";
    } else {
      this.floatLabelEl.hidden = true;
      this.floatLabelEl.textContent = "";
    }
    const leadIcon = this.leadingFor(variant);
    const showPrefix = variant === "prefix" || Boolean(lead) || variant === "soft";
    const showSuffix = variant === "suffix" || Boolean(suffix);
    const showStatusIcon = status === "error" || status === "success" || status === "warning";
    if (showPrefix && lead) {
      this.leadEl.hidden = false;
      this.leadEl.textContent = lead;
      this.leadEl.innerHTML = "";
      this.leadEl.style.color = "var(--gob-in-dorado)";
    } else if (leadIcon) {
      this.leadEl.hidden = false;
      this.leadEl.innerHTML = leadIcon;
      this.leadEl.style.color = "";
    } else {
      this.leadEl.hidden = true;
      this.leadEl.textContent = "";
      this.leadEl.innerHTML = "";
    }
    if (isPassword) {
      this.toggleBtn.hidden = false;
      this.toggleBtn.innerHTML = this.showPassword ? ICONS.eyeOff : ICONS.eye;
      this.toggleBtn.setAttribute(
        "aria-label",
        this.showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
      );
      this.trailEl.hidden = true;
      this.clearBtn.hidden = true;
    } else {
      this.toggleBtn.hidden = true;
      if (showSuffix && suffix) {
        this.trailEl.hidden = false;
        this.trailEl.textContent = suffix;
        this.trailEl.innerHTML = "";
      } else if (showStatusIcon) {
        this.trailEl.hidden = false;
        this.trailEl.innerHTML = status === "success" ? ICONS.check : ICONS.alert;
        this.trailEl.textContent = "";
      } else {
        this.trailEl.hidden = true;
        this.trailEl.textContent = "";
        this.trailEl.innerHTML = "";
      }
      this.updateClearButton();
    }
    const showHelper = Boolean(helper) || variant === "helper" || variant === "complete" || status !== "default";
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent = helper || (status === "error" ? "Revisa este campo" : status === "success" ? "Se ve correcto" : status === "warning" ? "Requiere revision" : "");
  }
};
defineCustomElement("gob-input", GobInputElement);

// src/components/textarea/textarea-constants.ts
var TEXTAREA_VARIANTS = [
  "basic",
  "labeled",
  "helper",
  "counter",
  "auto",
  "dense",
  "filled",
  "soft",
  "floating",
  "resize",
  "code",
  "complete"
];
var TEXTAREA_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info"
];
var TEXTAREA_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "placeholder",
  "helper",
  "value",
  "status",
  "size",
  "name",
  "rows",
  "maxlength",
  "disabled",
  "readonly",
  "required"
];
function resolveTextareaVariant(value) {
  if (TEXTAREA_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveTextareaStatus(value) {
  if (TEXTAREA_STATUSES.includes(value ?? "")) {
    return value;
  }
  return "default";
}
function resolveTextareaSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}

// src/components/textarea/textarea-styles.ts
var textareaStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ta-vino: #9f2141;
  --gob-ta-dorado: #bc945a;
  --gob-ta-title: #181511;
  --gob-ta-muted: #8a8278;
  --gob-ta-text: #3d3a35;
  --gob-ta-border: rgba(24, 21, 17, 0.12);
  --gob-ta-border-hover: rgba(24, 21, 17, 0.22);
  --gob-ta-focus: var(--gob-ta-vino);
  --gob-ta-ring: rgba(159, 33, 65, 0.16);
  --gob-ta-bg: #ffffff;
  --gob-ta-fill: #faf9f7;
  --gob-ta-radius: 14px;
  --gob-ta-pad-x: 14px;
  --gob-ta-pad-y: 12px;
  --gob-ta-min-h: 112px;
  --gob-ta-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

[hidden] {
  display: none !important;
}

.root {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-ta-radius: 12px;
  --gob-ta-pad-x: 12px;
  --gob-ta-pad-y: 10px;
  --gob-ta-min-h: 88px;
}
.root[data-size='lg'] {
  --gob-ta-radius: 16px;
  --gob-ta-pad-x: 16px;
  --gob-ta-pad-y: 14px;
  --gob-ta-min-h: 148px;
}
.root[data-variant='dense'] {
  --gob-ta-radius: 10px;
  --gob-ta-pad-x: 10px;
  --gob-ta-pad-y: 8px;
  --gob-ta-min-h: 72px;
  gap: 6px;
}

.root[data-status='error'] {
  --gob-ta-focus: #c62828;
  --gob-ta-ring: rgba(198, 40, 40, 0.16);
}
.root[data-status='success'] {
  --gob-ta-focus: #1f8a55;
  --gob-ta-ring: rgba(31, 138, 85, 0.16);
}
.root[data-status='warning'] {
  --gob-ta-focus: #d0921a;
  --gob-ta-ring: rgba(208, 146, 26, 0.18);
}
.root[data-status='info'] {
  --gob-ta-focus: #2f5f8a;
  --gob-ta-ring: rgba(47, 95, 138, 0.16);
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-ta-title);
}

.label .req {
  color: var(--gob-ta-vino);
  margin-left: 2px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.pill {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-ta-vino);
}
.root[data-status='error'] .pill {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
}
.root[data-status='success'] .pill {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
}
.root[data-status='warning'] .pill {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
}
.root[data-status='info'] .pill {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
}

.control {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: var(--gob-ta-min-h);
  padding: var(--gob-ta-pad-y) var(--gob-ta-pad-x);
  border: 1.5px solid var(--gob-ta-border);
  border-radius: var(--gob-ta-radius);
  background: var(--gob-ta-bg);
  transition:
    border-color 180ms var(--gob-ta-ease),
    box-shadow 180ms var(--gob-ta-ease),
    background 180ms var(--gob-ta-ease);
}

.control:hover {
  border-color: var(--gob-ta-border-hover);
}

.root[data-focused='true'] .control {
  border-color: var(--gob-ta-focus);
  box-shadow: 0 0 0 4px var(--gob-ta-ring);
  background: #ffffff;
}

.root[data-status='error'] .control {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-ta-border));
}
.root[data-status='success'] .control {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-ta-border));
}
.root[data-status='warning'] .control {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-ta-border));
}

.root[data-disabled='true'] .control {
  background: var(--gob-ta-fill);
  opacity: 0.72;
  cursor: not-allowed;
}
.root[data-readonly='true'] .control {
  background: var(--gob-ta-fill);
}

.field {
  appearance: none;
  display: block;
  width: 100%;
  min-height: calc(var(--gob-ta-min-h) - (var(--gob-ta-pad-y) * 2));
  border: 0;
  outline: none;
  resize: none;
  background: transparent;
  color: var(--gob-ta-text);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.5;
}

.field::placeholder {
  color: #b0aaa1;
  font-weight: 500;
}

.field:disabled {
  cursor: not-allowed;
  color: var(--gob-ta-muted);
}

.foot {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.helper {
  margin: 0;
  flex: 1 1 auto;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-ta-muted);
  line-height: 1.35;
}

.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.counter {
  flex: 0 0 auto;
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-ta-muted);
  font-variant-numeric: tabular-nums;
}

.counter[data-warn='true'] {
  color: #a87412;
}
.counter[data-over='true'] {
  color: #c62828;
}

.float-label {
  position: absolute;
  left: var(--gob-ta-pad-x);
  top: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  transition:
    top 180ms var(--gob-ta-ease),
    font-size 180ms var(--gob-ta-ease),
    color 180ms var(--gob-ta-ease);
}

.root[data-variant='floating'] .control {
  padding-top: 26px;
  min-height: 128px;
}
.root[data-variant='floating'][data-focused='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  font-size: 11px;
  font-weight: 700;
  color: var(--gob-ta-dorado);
}

.root[data-variant='filled'] .control {
  background: var(--gob-ta-fill);
  border-color: transparent;
}
.root[data-variant='filled'] .control:hover {
  background: #f3f1ec;
  border-color: transparent;
}
.root[data-variant='filled'][data-focused='true'] .control {
  background: #ffffff;
  border-color: var(--gob-ta-focus);
}

.root[data-variant='soft'] .control {
  border-color: transparent;
  background: color-mix(in srgb, var(--gob-ta-vino) 7%, #ffffff);
}
.root[data-variant='soft'] .control:hover {
  background: color-mix(in srgb, var(--gob-ta-vino) 11%, #ffffff);
  border-color: transparent;
}
.root[data-variant='soft'][data-focused='true'] .control {
  background: #ffffff;
  border-color: var(--gob-ta-focus);
}

.root[data-variant='resize'] .field {
  resize: vertical;
  min-height: 96px;
}

.root[data-variant='code'] .control {
  border-radius: 16px;
  background: #181511;
  border-color: #181511;
}
.root[data-variant='code'] .field {
  color: #f4f1ec;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0;
}
.root[data-variant='code'] .field::placeholder {
  color: rgba(244, 241, 236, 0.45);
}
.root[data-variant='code'][data-focused='true'] .control {
  box-shadow: 0 0 0 4px rgba(188, 148, 90, 0.28);
  border-color: var(--gob-ta-dorado);
}
.root[data-variant='code'] .helper,
.root[data-variant='code'] .counter {
  color: var(--gob-ta-muted);
}

.root[data-variant='auto'] .field {
  overflow: hidden;
}
`;

// src/components/textarea/gob-textarea.element.ts
function statusPill5(status) {
  switch (status) {
    case "error":
      return "Error";
    case "success":
      return "Valido";
    case "warning":
      return "Revision";
    case "info":
      return "Info";
    default:
      return "";
  }
}
var GobTextareaElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "field");
    __publicField(this, "labelEl");
    __publicField(this, "helperEl");
    __publicField(this, "counterEl");
    __publicField(this, "headEl");
    __publicField(this, "footEl");
    __publicField(this, "pillEl");
    __publicField(this, "controlEl");
    __publicField(this, "floatLabelEl");
    __publicField(this, "fieldId", `gob-ta-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "onFocus", () => {
      this.rootEl.dataset.focused = "true";
    });
    __publicField(this, "onBlur", () => {
      this.rootEl.dataset.focused = "false";
    });
    __publicField(this, "onInput", () => {
      this.rootEl.dataset.filled = this.field.value ? "true" : "false";
      this.updateCounter();
      this.autoGrow();
      this.dispatchEvent(
        new CustomEvent("gob-textarea", {
          detail: { value: this.field.value },
          bubbles: true,
          composed: true
        })
      );
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = textareaStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.headEl = document.createElement("div");
    this.headEl.className = "head";
    this.labelEl = document.createElement("label");
    this.labelEl.className = "label";
    this.pillEl = document.createElement("span");
    this.pillEl.className = "pill";
    this.pillEl.hidden = true;
    this.headEl.append(this.labelEl, this.pillEl);
    this.controlEl = document.createElement("div");
    this.controlEl.className = "control";
    this.controlEl.setAttribute("part", "control");
    this.floatLabelEl = document.createElement("span");
    this.floatLabelEl.className = "float-label";
    this.floatLabelEl.hidden = true;
    this.field = document.createElement("textarea");
    this.field.className = "field";
    this.field.setAttribute("part", "textarea");
    this.controlEl.append(this.floatLabelEl, this.field);
    this.footEl = document.createElement("div");
    this.footEl.className = "foot";
    this.helperEl = document.createElement("p");
    this.helperEl.className = "helper";
    this.helperEl.hidden = true;
    this.counterEl = document.createElement("p");
    this.counterEl.className = "counter";
    this.counterEl.hidden = true;
    this.footEl.append(this.helperEl, this.counterEl);
    this.rootEl.append(this.headEl, this.controlEl, this.footEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...TEXTAREA_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.field.addEventListener("focus", this.onFocus);
    this.field.addEventListener("blur", this.onBlur);
    this.field.addEventListener("input", this.onInput);
    this.sync();
  }
  disconnectedCallback() {
    this.field.removeEventListener("focus", this.onFocus);
    this.field.removeEventListener("blur", this.onBlur);
    this.field.removeEventListener("input", this.onInput);
  }
  attributeChangedCallback() {
    this.sync();
  }
  updateCounter() {
    const variant = resolveTextareaVariant(this.getAttribute("variant"));
    const maxAttr = this.getAttribute("maxlength");
    const max = maxAttr && !Number.isNaN(Number(maxAttr)) ? Number(maxAttr) : variant === "counter" ? 280 : 0;
    const show = variant === "counter" || max > 0;
    this.counterEl.hidden = !show;
    if (!show) return;
    const len = this.field.value.length;
    const limit = max > 0 ? max : 280;
    this.counterEl.textContent = `${len}/${limit}`;
    this.counterEl.dataset.warn = len >= limit * 0.85 ? "true" : "false";
    this.counterEl.dataset.over = len >= limit ? "true" : "false";
  }
  autoGrow() {
    const variant = resolveTextareaVariant(this.getAttribute("variant"));
    if (variant !== "auto") {
      this.field.style.height = "";
      return;
    }
    this.field.style.height = "auto";
    this.field.style.height = `${Math.max(this.field.scrollHeight, 72)}px`;
  }
  sync() {
    const variant = resolveTextareaVariant(this.getAttribute("variant"));
    const status = resolveTextareaStatus(this.getAttribute("status"));
    const size = resolveTextareaSize(this.getAttribute("size"));
    const label = this.getAttribute("label")?.trim() || "";
    const placeholder = this.getAttribute("placeholder") ?? "";
    const helper = this.getAttribute("helper")?.trim() || "";
    const name = this.getAttribute("name") ?? "";
    const rowsAttr = this.getAttribute("rows");
    const maxAttr = this.getAttribute("maxlength");
    const disabled = this.hasAttribute("disabled");
    const readonly = this.hasAttribute("readonly");
    const required = this.hasAttribute("required");
    const value = this.getAttribute("value") ?? "";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.rootEl.dataset.readonly = readonly ? "true" : "false";
    const isFloating = variant === "floating";
    const showLabel = !isFloating && (Boolean(label) || variant === "labeled" || variant === "helper" || variant === "counter" || variant === "auto" || variant === "dense" || variant === "filled" || variant === "soft" || variant === "resize" || variant === "code" || variant === "complete");
    this.headEl.hidden = !showLabel && status === "default";
    this.labelEl.hidden = !showLabel;
    this.labelEl.replaceChildren();
    this.labelEl.append(document.createTextNode(label || "Area de texto"));
    if (required) {
      const req = document.createElement("span");
      req.className = "req";
      req.textContent = "*";
      this.labelEl.appendChild(req);
    }
    const pill = statusPill5(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.field.id = this.fieldId;
    this.labelEl.htmlFor = this.fieldId;
    this.field.placeholder = isFloating ? " " : placeholder;
    this.field.name = name;
    this.field.disabled = disabled;
    this.field.readOnly = readonly;
    this.field.required = required;
    const rows = rowsAttr && !Number.isNaN(Number(rowsAttr)) ? Number(rowsAttr) : variant === "dense" ? 2 : variant === "auto" ? 2 : 4;
    this.field.rows = rows;
    if (maxAttr && !Number.isNaN(Number(maxAttr))) {
      this.field.maxLength = Number(maxAttr);
    } else if (variant === "counter") {
      this.field.maxLength = 280;
    } else {
      this.field.removeAttribute("maxlength");
    }
    if (this.field.value !== value) this.field.value = value;
    this.rootEl.dataset.filled = this.field.value ? "true" : "false";
    if (isFloating) {
      this.floatLabelEl.hidden = false;
      this.floatLabelEl.textContent = label || "Observaciones";
    } else {
      this.floatLabelEl.hidden = true;
      this.floatLabelEl.textContent = "";
    }
    const showHelper = Boolean(helper) || variant === "helper" || variant === "complete" || status !== "default";
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent = helper || (status === "error" ? "Revisa este campo" : status === "success" ? "Se ve correcto" : status === "warning" ? "Requiere revision" : "");
    this.updateCounter();
    this.autoGrow();
    this.footEl.hidden = this.helperEl.hidden && this.counterEl.hidden;
  }
};
defineCustomElement("gob-textarea", GobTextareaElement);

// src/components/select/select-constants.ts
var SELECT_VARIANTS = [
  "basic",
  "labeled",
  "helper",
  "dense",
  "filled",
  "soft",
  "floating",
  "pill",
  "icon",
  "group",
  "multiple",
  "search",
  "underline",
  "ghost",
  "split",
  "complete"
];
var SELECT_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info"
];
var SELECT_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "placeholder",
  "helper",
  "value",
  "status",
  "size",
  "name",
  "options",
  "disabled",
  "required"
];
var DEFAULT_SELECT_OPTIONS = [
  { value: "jal", label: "Jalisco", hint: "Occidente" },
  { value: "cdmx", label: "Ciudad de Mexico", hint: "Capital" },
  { value: "nl", label: "Nuevo Leon", hint: "Norte" },
  { value: "yuc", label: "Yucatan", hint: "Sureste" },
  { value: "sin", label: "Sinaloa", hint: "Pacifico" },
  { value: "qroo", label: "Quintana Roo", hint: "Caribe" }
];
var DEFAULT_GROUP_OPTIONS = [
  {
    label: "Norte",
    options: [
      { value: "bc", label: "Baja California" },
      { value: "nl", label: "Nuevo Leon" },
      { value: "chih", label: "Chihuahua" }
    ]
  },
  {
    label: "Centro",
    options: [
      { value: "cdmx", label: "Ciudad de Mexico" },
      { value: "mex", label: "Estado de Mexico" },
      { value: "qro", label: "Queretaro" }
    ]
  },
  {
    label: "Sur",
    options: [
      { value: "yuc", label: "Yucatan" },
      { value: "oax", label: "Oaxaca" },
      { value: "chis", label: "Chiapas" }
    ]
  }
];
function resolveSelectVariant(value) {
  if (SELECT_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveSelectStatus(value) {
  if (SELECT_STATUSES.includes(value ?? "")) {
    return value;
  }
  return "default";
}
function resolveSelectSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}
function isGroup(item) {
  return Array.isArray(item.options);
}
function parseSelectOptions(raw, variant) {
  if (raw?.trim()) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
    }
  }
  if (variant === "group") return DEFAULT_GROUP_OPTIONS;
  return DEFAULT_SELECT_OPTIONS;
}
function flattenOptions(payload) {
  const out = [];
  for (const item of payload) {
    if (isGroup(item)) out.push(...item.options);
    else out.push(item);
  }
  return out;
}

// src/components/select/select-styles.ts
var selectStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sel-vino: #9f2141;
  --gob-sel-dorado: #bc945a;
  --gob-sel-title: #181511;
  --gob-sel-muted: #8a8278;
  --gob-sel-text: #3d3a35;
  --gob-sel-border: rgba(24, 21, 17, 0.12);
  --gob-sel-border-hover: rgba(24, 21, 17, 0.22);
  --gob-sel-focus: var(--gob-sel-vino);
  --gob-sel-ring: rgba(159, 33, 65, 0.18);
  --gob-sel-bg: #ffffff;
  --gob-sel-fill: #faf9f7;
  --gob-sel-radius: 14px;
  --gob-sel-height: 50px;
  --gob-sel-pad-x: 14px;
  --gob-sel-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --gob-sel-panel-shadow:
    0 18px 40px rgba(24, 21, 17, 0.14),
    0 2px 8px rgba(24, 21, 17, 0.06);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

[hidden] {
  display: none !important;
}

.root {
  position: relative;
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-sel-height: 40px;
  --gob-sel-radius: 12px;
  --gob-sel-pad-x: 12px;
}
.root[data-size='lg'] {
  --gob-sel-height: 58px;
  --gob-sel-radius: 16px;
  --gob-sel-pad-x: 16px;
}
.root[data-variant='dense'] {
  --gob-sel-height: 38px;
  --gob-sel-radius: 10px;
  gap: 6px;
}

.root[data-status='error'] {
  --gob-sel-focus: #c62828;
  --gob-sel-ring: rgba(198, 40, 40, 0.16);
}
.root[data-status='success'] {
  --gob-sel-focus: #1f8a55;
  --gob-sel-ring: rgba(31, 138, 85, 0.16);
}
.root[data-status='warning'] {
  --gob-sel-focus: #d0921a;
  --gob-sel-ring: rgba(208, 146, 26, 0.18);
}
.root[data-status='info'] {
  --gob-sel-focus: #2f5f8a;
  --gob-sel-ring: rgba(47, 95, 138, 0.16);
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-sel-title);
}
.label .req {
  color: var(--gob-sel-vino);
  margin-left: 2px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.pill {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-sel-vino);
}
.root[data-status='error'] .pill { background: rgba(198, 40, 40, 0.12); color: #c62828; }
.root[data-status='success'] .pill { background: rgba(31, 138, 85, 0.14); color: #1f8a55; }
.root[data-status='warning'] .pill { background: rgba(208, 146, 26, 0.16); color: #a87412; }
.root[data-status='info'] .pill { background: rgba(47, 95, 138, 0.12); color: #2f5f8a; }

.trigger {
  appearance: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  min-height: var(--gob-sel-height);
  margin: 0;
  padding: 0 calc(var(--gob-sel-pad-x) + 34px) 0 var(--gob-sel-pad-x);
  border: 1.5px solid var(--gob-sel-border);
  border-radius: var(--gob-sel-radius);
  background: var(--gob-sel-bg);
  color: var(--gob-sel-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 180ms var(--gob-sel-ease),
    box-shadow 180ms var(--gob-sel-ease),
    background 180ms var(--gob-sel-ease),
    transform 180ms var(--gob-sel-ease);
}
.trigger:hover {
  border-color: var(--gob-sel-border-hover);
}
.trigger:focus-visible {
  outline: none;
}
.root[data-open='true'] .trigger,
.root[data-focused='true'] .trigger {
  border-color: var(--gob-sel-focus);
  box-shadow: 0 0 0 4px var(--gob-sel-ring);
  background: #ffffff;
}
.root[data-open='true'] .trigger {
  transform: translateY(-1px);
}
.root[data-status='error'] .trigger {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-sel-border));
}
.root[data-status='success'] .trigger {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-sel-border));
}
.root[data-status='warning'] .trigger {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-sel-border));
}
.root[data-disabled='true'] .trigger {
  background: var(--gob-sel-fill);
  opacity: 0.72;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.lead {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: var(--gob-sel-dorado);
  background: color-mix(in srgb, var(--gob-sel-dorado) 14%, transparent);
  transition: background 180ms var(--gob-sel-ease), color 180ms var(--gob-sel-ease);
}
.lead svg {
  width: 16px;
  height: 16px;
  display: block;
}
.root[data-open='true'] .lead,
.root[data-focused='true'] .lead {
  color: var(--gob-sel-vino);
  background: color-mix(in srgb, var(--gob-sel-vino) 12%, transparent);
}

.value-wrap {
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  gap: 2px;
}
.value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--gob-sel-title);
  line-height: 1.25;
}
.value[data-placeholder='true'] {
  color: #b0aaa1;
  font-weight: 500;
}
.meta {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-sel-muted);
  line-height: 1.2;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 2px 0;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
  height: 26px;
  padding: 0 8px 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--gob-sel-vino) 10%, #fff);
  color: var(--gob-sel-vino);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.chip span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chip button {
  appearance: none;
  display: inline-grid;
  place-items: center;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(159, 33, 65, 0.12);
  color: var(--gob-sel-vino);
  cursor: pointer;
}
.chip button svg {
  width: 10px;
  height: 10px;
}

.trail {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.clear {
  appearance: none;
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-sel-muted);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 140ms ease, background 140ms ease, color 140ms ease;
}
.root[data-filled='true']:not([data-disabled='true']) .trigger:hover .clear,
.root[data-open='true'][data-filled='true'] .clear,
.root[data-focused='true'][data-filled='true'] .clear {
  opacity: 1;
  pointer-events: auto;
}
.clear:hover {
  background: rgba(159, 33, 65, 0.12);
  color: var(--gob-sel-vino);
}
.clear svg {
  width: 12px;
  height: 12px;
}

.chevron {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  color: var(--gob-sel-muted);
  background: transparent;
  transition:
    transform 220ms var(--gob-sel-ease),
    color 180ms var(--gob-sel-ease),
    background 180ms var(--gob-sel-ease);
}
.chevron svg {
  width: 16px;
  height: 16px;
}
.root[data-open='true'] .chevron {
  transform: rotate(180deg);
  color: var(--gob-sel-vino);
  background: color-mix(in srgb, var(--gob-sel-vino) 10%, transparent);
}

.float-label {
  position: absolute;
  left: var(--gob-sel-pad-x);
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  transition:
    top 180ms var(--gob-sel-ease),
    transform 180ms var(--gob-sel-ease),
    font-size 180ms var(--gob-sel-ease),
    color 180ms var(--gob-sel-ease);
}
.root[data-variant='floating'] .trigger {
  align-items: flex-end;
  min-height: 60px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.root[data-variant='floating'] .float-label {
  left: var(--gob-sel-pad-x);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
.root[data-variant='floating'] .value-wrap {
  width: 100%;
  min-height: 22px;
}
.root[data-variant='floating'] .value[data-placeholder='true'] {
  opacity: 0;
  pointer-events: none;
}
.root[data-variant='floating'][data-open='true'] .value[data-placeholder='true'],
.root[data-variant='floating'][data-focused='true'] .value[data-placeholder='true'] {
  opacity: 1;
}
.root[data-variant='floating'] .meta {
  display: none;
}
.root[data-variant='floating'] .lead ~ .value-wrap {
  padding-top: 2px;
}
.root[data-variant='floating']:has(.lead:not([hidden])) .float-label {
  left: calc(var(--gob-sel-pad-x) + 40px);
}
.root[data-variant='floating'][data-open='true'] .float-label,
.root[data-variant='floating'][data-focused='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  transform: none;
  font-size: 11px;
  font-weight: 700;
  color: var(--gob-sel-dorado);
}

.root[data-variant='filled'] .trigger {
  background: var(--gob-sel-fill);
  border-color: transparent;
}
.root[data-variant='filled'] .trigger:hover {
  background: #f3f1ec;
}
.root[data-variant='filled'][data-open='true'] .trigger,
.root[data-variant='filled'][data-focused='true'] .trigger {
  background: #ffffff;
  border-color: var(--gob-sel-focus);
}

.root[data-variant='soft'] .trigger {
  border-color: transparent;
  background: color-mix(in srgb, var(--gob-sel-vino) 7%, #ffffff);
}
.root[data-variant='soft'] .trigger:hover {
  background: color-mix(in srgb, var(--gob-sel-vino) 11%, #ffffff);
}
.root[data-variant='soft'][data-open='true'] .trigger,
.root[data-variant='soft'][data-focused='true'] .trigger {
  background: #ffffff;
  border-color: var(--gob-sel-focus);
}
.root[data-variant='soft'] .lead {
  color: var(--gob-sel-vino);
  background: color-mix(in srgb, var(--gob-sel-vino) 12%, transparent);
}

.root[data-variant='pill'] .trigger {
  border-radius: 999px;
  padding-left: 18px;
}
.root[data-variant='pill'] .lead {
  border-radius: 999px;
}

.root[data-variant='underline'] .trigger {
  border: 0;
  border-bottom: 2px solid #e5e1da;
  border-radius: 0;
  padding-left: 2px;
  background: transparent;
  box-shadow: none;
}
.root[data-variant='underline'] .trigger:hover {
  border-bottom-color: color-mix(in srgb, var(--gob-sel-dorado) 55%, #e5e1da);
}
.root[data-variant='underline'][data-open='true'] .trigger,
.root[data-variant='underline'][data-focused='true'] .trigger {
  border-bottom-color: var(--gob-sel-focus);
  box-shadow: none;
  background: transparent;
  transform: none;
}
.root[data-variant='underline'] .lead {
  background: transparent;
}

.root[data-variant='ghost'] .trigger {
  border-color: transparent;
  background: transparent;
}
.root[data-variant='ghost'] .trigger:hover {
  background: rgba(24, 21, 17, 0.04);
}
.root[data-variant='ghost'][data-open='true'] .trigger,
.root[data-variant='ghost'][data-focused='true'] .trigger {
  background: #fff;
  border-color: var(--gob-sel-focus);
}

.root[data-variant='split'] .trigger {
  padding-left: 8px;
  gap: 8px;
}
.root[data-variant='split'] .lead {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(145deg, #9f2141 0%, #7a1832 100%);
}
.root[data-variant='split'][data-open='true'] .lead,
.root[data-variant='split'][data-focused='true'] .lead {
  color: #fff;
  background: linear-gradient(145deg, #bc945a 0%, #9a7540 100%);
}

.root[data-variant='multiple'] .trigger {
  min-height: 56px;
  align-items: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sel-muted);
  line-height: 1.35;
}
.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.panel {
  position: absolute;
  z-index: 40;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  display: grid;
  gap: 0;
  max-height: 280px;
  overflow: hidden;
  border: 1px solid rgba(24, 21, 17, 0.08);
  border-radius: 16px;
  background: #fff;
  box-shadow: var(--gob-sel-panel-shadow);
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  pointer-events: none;
  transition:
    opacity 160ms var(--gob-sel-ease),
    transform 180ms var(--gob-sel-ease);
}
.root[data-open='true'] .panel {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.root[data-variant='pill'] .panel {
  border-radius: 20px;
}

.search-wrap {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
  background: #fff;
}
.search-wrap svg {
  width: 16px;
  height: 16px;
  color: var(--gob-sel-muted);
  flex: 0 0 auto;
}
.search {
  appearance: none;
  flex: 1 1 auto;
  min-width: 0;
  height: 32px;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--gob-sel-text);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
}
.search::placeholder {
  color: #b0aaa1;
}

.list {
  overflow: auto;
  max-height: 232px;
  padding: 6px;
  overscroll-behavior: contain;
}

.group-label {
  margin: 6px 8px 4px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gob-sel-dorado);
}

.option {
  display: grid;
  grid-template-columns: 22px 1fr auto;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 42px;
  padding: 8px 10px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--gob-sel-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}
.option:hover,
.option[data-active='true'] {
  background: color-mix(in srgb, var(--gob-sel-vino) 7%, #fff);
}
.option[data-selected='true'] {
  background: color-mix(in srgb, var(--gob-sel-vino) 10%, #fff);
  color: var(--gob-sel-vino);
}
.option[data-disabled='true'] {
  opacity: 0.45;
  cursor: not-allowed;
}
.check {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1.5px solid rgba(24, 21, 17, 0.14);
  color: transparent;
  background: #fff;
  transition: background 140ms ease, border-color 140ms ease, color 140ms ease;
}
.option[data-selected='true'] .check {
  border-color: var(--gob-sel-vino);
  background: var(--gob-sel-vino);
  color: #fff;
}
.check svg {
  width: 11px;
  height: 11px;
}
.option-text {
  min-width: 0;
  display: grid;
  gap: 1px;
}
.option-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: inherit;
}
.option-hint {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-sel-muted);
}
.option-badge {
  flex: 0 0 auto;
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-sel-dorado);
  background: color-mix(in srgb, var(--gob-sel-dorado) 16%, transparent);
}

.empty {
  margin: 0;
  padding: 22px 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--gob-sel-muted);
}

.native {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;

// src/components/select/gob-select.element.ts
var ICONS2 = {
  chevron: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.8 12 21 12 21Z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10.8" r="2.2" stroke="currentColor" stroke-width="1.6"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20.5h15M6.5 20.5V7.5l5-3 5 3v13M10 10.5h1.5M12.5 10.5H14M10 13.5h1.5M12.5 13.5H14M10 16.5h1.5M12.5 16.5H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.6"/><path d="M16.2 16.2L20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5L4.5 9 12 13.5 19.5 9 12 4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4.5 13.5L12 18l7.5-4.5M4.5 16.5L12 21l7.5-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
function statusPill6(status) {
  switch (status) {
    case "error":
      return "Error";
    case "success":
      return "Valido";
    case "warning":
      return "Revision";
    case "info":
      return "Info";
    default:
      return "";
  }
}
function parseValues(value, multiple) {
  if (!value) return [];
  if (!multiple) return [value];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
}
function leadIconFor(variant) {
  if (variant === "search") return ICONS2.search;
  if (variant === "soft" || variant === "split") return ICONS2.building;
  if (variant === "icon" || variant === "complete" || variant === "group") {
    return ICONS2.pin;
  }
  if (variant === "multiple") return ICONS2.layers;
  return null;
}
var GobSelectElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "headEl");
    __publicField(this, "labelEl");
    __publicField(this, "pillEl");
    __publicField(this, "triggerEl");
    __publicField(this, "floatLabelEl");
    __publicField(this, "leadEl");
    __publicField(this, "valueWrapEl");
    __publicField(this, "valueEl");
    __publicField(this, "metaEl");
    __publicField(this, "chipsEl");
    __publicField(this, "trailEl");
    __publicField(this, "clearBtn");
    __publicField(this, "chevronEl");
    __publicField(this, "panelEl");
    __publicField(this, "searchWrap");
    __publicField(this, "searchInput");
    __publicField(this, "listEl");
    __publicField(this, "helperEl");
    __publicField(this, "nativeEl");
    __publicField(this, "open", false);
    __publicField(this, "query", "");
    __publicField(this, "activeIndex", -1);
    __publicField(this, "selected", []);
    __publicField(this, "optionsPayload", []);
    __publicField(this, "flatOptions", []);
    __publicField(this, "optionButtons", []);
    __publicField(this, "fieldId", `gob-sel-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "onTriggerClick", (event) => {
      if (event.target.closest(".clear")) return;
      if (this.hasAttribute("disabled")) return;
      this.setOpen(!this.open);
    });
    __publicField(this, "onClear", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (this.hasAttribute("disabled")) return;
      this.selected = [];
      this.emitChange();
      this.renderValue();
      this.renderList();
      this.syncNative();
      this.triggerEl.focus();
    });
    __publicField(this, "onSearch", () => {
      this.query = this.searchInput.value.trim().toLowerCase();
      this.activeIndex = 0;
      this.renderList();
    });
    __publicField(this, "onSearchKeydown", (event) => {
      this.handleListKeys(event);
    });
    __publicField(this, "onTriggerKeydown", (event) => {
      if (this.hasAttribute("disabled")) return;
      if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!this.open) {
          this.setOpen(true);
          return;
        }
        this.handleListKeys(event);
      } else if (event.key === "Escape" && this.open) {
        event.preventDefault();
        this.setOpen(false);
      }
    });
    __publicField(this, "onListClick", (event) => {
      const btn = event.target.closest(
        "button.option"
      );
      if (!btn || btn.dataset.disabled === "true") return;
      const value = btn.dataset.value || "";
      this.toggleValue(value);
    });
    __publicField(this, "onDocPointer", (event) => {
      if (!this.open) return;
      const path = event.composedPath();
      if (!path.includes(this)) this.setOpen(false);
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = selectStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.headEl = document.createElement("div");
    this.headEl.className = "head";
    this.labelEl = document.createElement("label");
    this.labelEl.className = "label";
    this.pillEl = document.createElement("span");
    this.pillEl.className = "pill";
    this.pillEl.hidden = true;
    this.headEl.append(this.labelEl, this.pillEl);
    this.triggerEl = document.createElement("button");
    this.triggerEl.type = "button";
    this.triggerEl.className = "trigger";
    this.triggerEl.setAttribute("part", "trigger");
    this.triggerEl.setAttribute("aria-haspopup", "listbox");
    this.triggerEl.setAttribute("aria-expanded", "false");
    this.floatLabelEl = document.createElement("span");
    this.floatLabelEl.className = "float-label";
    this.floatLabelEl.hidden = true;
    this.leadEl = document.createElement("span");
    this.leadEl.className = "lead";
    this.leadEl.hidden = true;
    this.valueWrapEl = document.createElement("div");
    this.valueWrapEl.className = "value-wrap";
    this.valueEl = document.createElement("span");
    this.valueEl.className = "value";
    this.metaEl = document.createElement("span");
    this.metaEl.className = "meta";
    this.metaEl.hidden = true;
    this.chipsEl = document.createElement("div");
    this.chipsEl.className = "chips";
    this.chipsEl.hidden = true;
    this.valueWrapEl.append(this.valueEl, this.metaEl, this.chipsEl);
    this.trailEl = document.createElement("div");
    this.trailEl.className = "trail";
    this.clearBtn = document.createElement("button");
    this.clearBtn.type = "button";
    this.clearBtn.className = "clear";
    this.clearBtn.setAttribute("aria-label", "Limpiar seleccion");
    this.clearBtn.innerHTML = ICONS2.x;
    this.clearBtn.tabIndex = -1;
    this.chevronEl = document.createElement("span");
    this.chevronEl.className = "chevron";
    this.chevronEl.innerHTML = ICONS2.chevron;
    this.chevronEl.setAttribute("aria-hidden", "true");
    this.trailEl.append(this.clearBtn, this.chevronEl);
    this.triggerEl.append(
      this.floatLabelEl,
      this.leadEl,
      this.valueWrapEl,
      this.trailEl
    );
    this.panelEl = document.createElement("div");
    this.panelEl.className = "panel";
    this.panelEl.setAttribute("part", "panel");
    this.panelEl.hidden = true;
    this.searchWrap = document.createElement("div");
    this.searchWrap.className = "search-wrap";
    this.searchWrap.hidden = true;
    this.searchWrap.innerHTML = ICONS2.search;
    this.searchInput = document.createElement("input");
    this.searchInput.className = "search";
    this.searchInput.type = "search";
    this.searchInput.placeholder = "Buscar\u2026";
    this.searchInput.setAttribute("aria-label", "Buscar opciones");
    this.searchWrap.appendChild(this.searchInput);
    this.listEl = document.createElement("div");
    this.listEl.className = "list";
    this.listEl.setAttribute("role", "listbox");
    this.panelEl.append(this.searchWrap, this.listEl);
    this.helperEl = document.createElement("p");
    this.helperEl.className = "helper";
    this.helperEl.hidden = true;
    this.nativeEl = document.createElement("select");
    this.nativeEl.className = "native";
    this.nativeEl.tabIndex = -1;
    this.nativeEl.setAttribute("aria-hidden", "true");
    this.rootEl.append(
      this.headEl,
      this.triggerEl,
      this.panelEl,
      this.helperEl,
      this.nativeEl
    );
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...SELECT_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.triggerEl.addEventListener("click", this.onTriggerClick);
    this.triggerEl.addEventListener("keydown", this.onTriggerKeydown);
    this.clearBtn.addEventListener("click", this.onClear);
    this.searchInput.addEventListener("input", this.onSearch);
    this.searchInput.addEventListener("keydown", this.onSearchKeydown);
    this.listEl.addEventListener("click", this.onListClick);
    document.addEventListener("pointerdown", this.onDocPointer, true);
    this.sync(true);
  }
  disconnectedCallback() {
    this.triggerEl.removeEventListener("click", this.onTriggerClick);
    this.triggerEl.removeEventListener("keydown", this.onTriggerKeydown);
    this.clearBtn.removeEventListener("click", this.onClear);
    this.searchInput.removeEventListener("input", this.onSearch);
    this.searchInput.removeEventListener("keydown", this.onSearchKeydown);
    this.listEl.removeEventListener("click", this.onListClick);
    document.removeEventListener("pointerdown", this.onDocPointer, true);
  }
  attributeChangedCallback() {
    this.sync(false);
  }
  handleListKeys(event) {
    const enabled = this.optionButtons.filter(
      (b) => b.dataset.disabled !== "true"
    );
    if (!enabled.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.activeIndex = Math.min(this.activeIndex + 1, enabled.length - 1);
      this.paintActive(enabled);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
      this.paintActive(enabled);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const current = enabled[this.activeIndex] || enabled[0];
      if (current) this.toggleValue(current.dataset.value || "");
    } else if (event.key === "Escape") {
      event.preventDefault();
      this.setOpen(false);
      this.triggerEl.focus();
    }
  }
  paintActive(enabled) {
    for (const btn of this.optionButtons) btn.dataset.active = "false";
    const current = enabled[this.activeIndex];
    if (current) {
      current.dataset.active = "true";
      current.scrollIntoView({ block: "nearest" });
    }
  }
  setOpen(next) {
    if (this.hasAttribute("disabled")) return;
    this.open = next;
    this.rootEl.dataset.open = next ? "true" : "false";
    this.rootEl.dataset.focused = next ? "true" : "false";
    this.triggerEl.setAttribute("aria-expanded", next ? "true" : "false");
    this.panelEl.hidden = !next;
    this.renderValue();
    if (next) {
      this.query = "";
      this.searchInput.value = "";
      this.activeIndex = 0;
      this.renderList();
      const variant = resolveSelectVariant(this.getAttribute("variant"));
      if (variant === "search") {
        queueMicrotask(() => this.searchInput.focus());
      }
    }
  }
  toggleValue(value) {
    const variant = resolveSelectVariant(this.getAttribute("variant"));
    const multiple = variant === "multiple";
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
  emitChange() {
    const variant = resolveSelectVariant(this.getAttribute("variant"));
    const multiple = variant === "multiple";
    const value = multiple ? this.selected.join(",") : this.selected[0] || "";
    if ((this.getAttribute("value") ?? "") !== value) {
      this.setAttribute("value", value);
    }
    this.rootEl.dataset.filled = value ? "true" : "false";
    this.dispatchEvent(
      new CustomEvent("gob-select", {
        detail: { value, values: [...this.selected] },
        bubbles: true,
        composed: true
      })
    );
  }
  sync(fromConnect) {
    const variant = resolveSelectVariant(this.getAttribute("variant"));
    const status = resolveSelectStatus(this.getAttribute("status"));
    const size = resolveSelectSize(this.getAttribute("size"));
    const label = this.getAttribute("label")?.trim() || "";
    const placeholder = this.resolvePlaceholder(variant);
    const helper = this.getAttribute("helper")?.trim() || "";
    const name = this.getAttribute("name") ?? "";
    const disabled = this.hasAttribute("disabled");
    const required = this.hasAttribute("required");
    const multiple = variant === "multiple";
    const valueAttr = this.getAttribute("value") ?? "";
    this.optionsPayload = parseSelectOptions(
      this.getAttribute("options"),
      variant
    );
    this.flatOptions = flattenOptions(this.optionsPayload);
    this.selected = parseValues(valueAttr, multiple);
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.rootEl.dataset.open = this.open ? "true" : "false";
    const isFloating = variant === "floating";
    const showLabel = !isFloating && (Boolean(label) || [
      "labeled",
      "helper",
      "dense",
      "filled",
      "soft",
      "pill",
      "icon",
      "group",
      "multiple",
      "search",
      "underline",
      "ghost",
      "split",
      "complete"
    ].includes(variant));
    this.headEl.hidden = !showLabel && status === "default";
    this.labelEl.hidden = !showLabel;
    this.labelEl.replaceChildren();
    this.labelEl.append(document.createTextNode(label || "Selector"));
    if (required) {
      const req = document.createElement("span");
      req.className = "req";
      req.textContent = "*";
      this.labelEl.appendChild(req);
    }
    const pill = statusPill6(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.triggerEl.id = this.fieldId;
    this.labelEl.htmlFor = this.fieldId;
    this.triggerEl.disabled = disabled;
    this.triggerEl.dataset.placeholder = placeholder;
    if (isFloating) {
      this.floatLabelEl.hidden = false;
      this.floatLabelEl.textContent = label || "Entidad";
    } else {
      this.floatLabelEl.hidden = true;
    }
    const icon = leadIconFor(variant);
    if (icon) {
      this.leadEl.hidden = false;
      this.leadEl.innerHTML = icon;
    } else {
      this.leadEl.hidden = true;
      this.leadEl.innerHTML = "";
    }
    this.searchWrap.hidden = variant !== "search";
    this.listEl.setAttribute(
      "aria-multiselectable",
      multiple ? "true" : "false"
    );
    const showHelper = Boolean(helper) || variant === "helper" || variant === "complete" || status !== "default";
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent = helper || (status === "error" ? "Selecciona una opcion valida" : status === "success" ? "Seleccion confirmada" : status === "warning" ? "Requiere revision" : "");
    this.nativeEl.name = name;
    this.nativeEl.required = required;
    this.nativeEl.disabled = disabled;
    this.nativeEl.multiple = multiple;
    this.renderValue();
    this.syncNative();
    if (this.open || fromConnect) this.renderList();
  }
  resolvePlaceholder(variant) {
    const raw = this.getAttribute("placeholder");
    if (raw !== null && raw.trim() === "" && variant === "floating") {
      return "Elige una opcion";
    }
    const trimmed = raw?.trim() || "";
    if (trimmed) return trimmed;
    if (variant === "floating") return "Elige una opcion";
    return "Selecciona una opcion";
  }
  renderValue() {
    const variant = resolveSelectVariant(this.getAttribute("variant"));
    const multiple = variant === "multiple";
    const placeholder = this.resolvePlaceholder(variant);
    const selectedOpts = this.flatOptions.filter(
      (o) => this.selected.includes(o.value)
    );
    this.rootEl.dataset.filled = selectedOpts.length ? "true" : "false";
    this.chipsEl.replaceChildren();
    if (multiple) {
      this.valueEl.hidden = selectedOpts.length > 0;
      this.metaEl.hidden = true;
      this.chipsEl.hidden = selectedOpts.length === 0;
      this.valueEl.textContent = placeholder;
      this.valueEl.dataset.placeholder = "true";
      for (const opt of selectedOpts) {
        const chip = document.createElement("span");
        chip.className = "chip";
        const text = document.createElement("span");
        text.textContent = opt.label;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("aria-label", `Quitar ${opt.label}`);
        btn.innerHTML = ICONS2.x;
        btn.addEventListener("click", (event) => {
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
      this.valueEl.dataset.placeholder = "false";
      if (current.hint && variant !== "floating") {
        this.metaEl.hidden = false;
        this.metaEl.textContent = current.hint;
      } else {
        this.metaEl.hidden = true;
        this.metaEl.textContent = "";
      }
    } else {
      this.valueEl.textContent = placeholder;
      this.valueEl.dataset.placeholder = "true";
      this.metaEl.hidden = true;
      this.metaEl.textContent = "";
    }
  }
  renderList() {
    const variant = resolveSelectVariant(this.getAttribute("variant"));
    this.listEl.replaceChildren();
    this.optionButtons = [];
    let rendered = 0;
    const q = this.query;
    const pushOption = (opt) => {
      if (q) {
        const hay = `${opt.label} ${opt.hint || ""} ${opt.value}`.toLowerCase();
        if (!hay.includes(q)) return;
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.dataset.value = opt.value;
      btn.dataset.selected = this.selected.includes(opt.value) ? "true" : "false";
      btn.dataset.disabled = opt.disabled ? "true" : "false";
      btn.dataset.active = "false";
      btn.setAttribute("role", "option");
      btn.setAttribute(
        "aria-selected",
        this.selected.includes(opt.value) ? "true" : "false"
      );
      if (opt.disabled) btn.disabled = true;
      const check = document.createElement("span");
      check.className = "check";
      check.innerHTML = ICONS2.check;
      const text = document.createElement("span");
      text.className = "option-text";
      const label = document.createElement("span");
      label.className = "option-label";
      label.textContent = opt.label;
      text.appendChild(label);
      if (opt.hint) {
        const hint = document.createElement("span");
        hint.className = "option-hint";
        hint.textContent = opt.hint;
        text.appendChild(hint);
      }
      btn.append(check, text);
      if (variant === "group" && opt.hint) {
        const badge = document.createElement("span");
        badge.className = "option-badge";
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
          const hay = `${opt.label} ${opt.hint || ""} ${opt.value}`.toLowerCase();
          return hay.includes(q);
        });
        if (!visible.length) continue;
        const group = document.createElement("div");
        group.className = "group-label";
        group.textContent = item.label;
        this.listEl.appendChild(group);
        for (const opt of item.options) pushOption(opt);
      } else {
        pushOption(item);
      }
    }
    if (!rendered) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "Sin coincidencias";
      this.listEl.appendChild(empty);
      this.activeIndex = -1;
      return;
    }
    const enabled = this.optionButtons.filter(
      (b) => b.dataset.disabled !== "true"
    );
    this.activeIndex = Math.min(
      Math.max(this.activeIndex, 0),
      Math.max(enabled.length - 1, 0)
    );
    this.paintActive(enabled);
  }
  syncNative() {
    const multiple = resolveSelectVariant(this.getAttribute("variant")) === "multiple";
    this.nativeEl.replaceChildren();
    for (const opt of this.flatOptions) {
      const el = document.createElement("option");
      el.value = opt.value;
      el.textContent = opt.label;
      el.selected = this.selected.includes(opt.value);
      this.nativeEl.appendChild(el);
    }
    if (!multiple) {
      this.nativeEl.value = this.selected[0] || "";
    }
  }
};
defineCustomElement("gob-select", GobSelectElement);

// src/components/file-upload/file-upload-constants.ts
var FILE_UPLOAD_VARIANTS = [
  "basic",
  "labeled",
  "helper",
  "dense",
  "soft",
  "button",
  "compact",
  "multiple",
  "complete"
];
var FILE_UPLOAD_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info"
];
var FILE_UPLOAD_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "helper",
  "hint",
  "accept",
  "status",
  "size",
  "max-size",
  "max-files",
  "name",
  "multiple",
  "disabled",
  "required"
];
function resolveFileUploadVariant(value) {
  if (FILE_UPLOAD_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveFileUploadStatus(value) {
  if (FILE_UPLOAD_STATUSES.includes(value ?? "")) {
    return value;
  }
  return "default";
}
function resolveFileUploadSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}
function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function parseMaxSize(value) {
  if (!value?.trim()) return null;
  const m = /^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)?$/i.exec(value.trim());
  if (!m) return null;
  const n = Number(m[1]);
  const unit = (m[2] || "b").toLowerCase();
  if (unit === "kb") return n * 1024;
  if (unit === "mb") return n * 1024 * 1024;
  if (unit === "gb") return n * 1024 * 1024 * 1024;
  return n;
}
function fileMatchesAccept(file, accept) {
  if (!accept.trim()) return true;
  const tokens = accept.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token);
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}

// src/components/file-upload/file-upload-styles.ts
var fileUploadStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-fu-vino: #9f2141;
  --gob-fu-vino-deep: #7a1832;
  --gob-fu-dorado: #bc945a;
  --gob-fu-title: #181511;
  --gob-fu-muted: #8a8278;
  --gob-fu-text: #3d3a35;
  --gob-fu-border: rgba(24, 21, 17, 0.12);
  --gob-fu-focus: var(--gob-fu-vino);
  --gob-fu-ring: rgba(159, 33, 65, 0.16);
  --gob-fu-bg: #ffffff;
  --gob-fu-fill: #faf9f7;
  --gob-fu-radius: 16px;
  --gob-fu-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.root[data-size='sm'] { --gob-fu-radius: 12px; }
.root[data-size='lg'] { --gob-fu-radius: 18px; }

.root[data-status='error'] { --gob-fu-focus: #c62828; --gob-fu-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-fu-focus: #1f8a55; --gob-fu-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-fu-focus: #d0921a; --gob-fu-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-fu-focus: #2f5f8a; --gob-fu-ring: rgba(47,95,138,.16); }

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-fu-title);
}

.label .req {
  color: var(--gob-fu-vino);
  margin-left: 2px;
}

.pill {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-fu-vino);
}
.root[data-status='error'] .pill { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill { background: rgba(47,95,138,.12); color: #2f5f8a; }

.drop {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 28px 20px;
  border: 1.5px dashed var(--gob-fu-border);
  border-radius: var(--gob-fu-radius);
  background: var(--gob-fu-fill);
  text-align: center;
  cursor: pointer;
  transition:
    border-color 160ms var(--gob-fu-ease),
    background 160ms var(--gob-fu-ease),
    box-shadow 160ms var(--gob-fu-ease);
}

.drop:hover,
.root[data-dragging='true'] .drop {
  border-color: color-mix(in srgb, var(--gob-fu-vino) 45%, var(--gob-fu-border));
  background: color-mix(in srgb, var(--gob-fu-vino) 4%, #fff);
}

.root[data-dragging='true'] .drop {
  box-shadow: 0 0 0 4px var(--gob-fu-ring);
  border-style: solid;
}

.root[data-disabled='true'] .drop {
  opacity: 0.72;
  cursor: not-allowed;
}

.icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gob-fu-vino);
  background: color-mix(in srgb, var(--gob-fu-dorado) 18%, #fff);
  border: 1px solid color-mix(in srgb, var(--gob-fu-dorado) 28%, transparent);
}
.icon svg { width: 22px; height: 22px; display: block; }

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gob-fu-title);
  letter-spacing: -0.01em;
}

.title em {
  font-style: normal;
  color: var(--gob-fu-vino);
}

.hint {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-fu-muted);
  max-width: 36ch;
  line-height: 1.4;
}

.browse {
  appearance: none;
  margin-top: 4px;
  border: 0;
  border-radius: 999px;
  min-height: 34px;
  padding: 0 14px;
  background: var(--gob-fu-vino);
  color: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
.browse:hover { background: var(--gob-fu-vino-deep); }
.root[data-disabled='true'] .browse { pointer-events: none; }

.input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}

.root[data-variant='soft'] .drop {
  background: color-mix(in srgb, var(--gob-fu-vino) 5%, #fff);
  border-color: color-mix(in srgb, var(--gob-fu-vino) 18%, var(--gob-fu-border));
}

.root[data-variant='dense'] .drop {
  padding: 16px 14px;
  gap: 6px;
}
.root[data-variant='dense'] .icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
}
.root[data-variant='dense'] .icon svg { width: 18px; height: 18px; }

.root[data-variant='button'] .drop,
.root[data-variant='compact'] .drop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 12px;
  padding: 12px 14px;
  border-style: solid;
  background: #fff;
}

.root[data-variant='button'] .hint,
.root[data-variant='compact'] .hint,
.root[data-variant='button'] .browse,
.root[data-variant='compact'] .browse {
  display: none;
}

.root[data-variant='button'] .title,
.root[data-variant='compact'] .title {
  font-size: 13px;
}

.root[data-variant='complete'] .drop {
  background: #fff;
  border-style: dashed;
}

.files {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.file {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(24, 21, 17, 0.08);
  background: #fff;
}

.file-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gob-fu-dorado);
  background: #f7f4ef;
}
.file-icon svg { width: 18px; height: 18px; }

.file-meta {
  min-width: 0;
  display: grid;
  gap: 2px;
}

.file-name {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--gob-fu-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-sub {
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-fu-muted);
}

.file[data-error='true'] .file-sub { color: #c62828; }

.progress {
  grid-column: 1 / -1;
  height: 6px;
  border-radius: 999px;
  background: #efebe4;
  overflow: hidden;
}

.progress > span {
  display: block;
  height: 100%;
  width: 0%;
  border-radius: inherit;
  background: var(--gob-fu-vino);
  transition: width 200ms var(--gob-fu-ease);
}

.file[data-error='true'] .progress > span { background: #c62828; }
.file[data-done='true'] .progress > span { background: #1f8a55; }

.remove {
  appearance: none;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gob-fu-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.remove:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-fu-title);
}
.remove svg { width: 16px; height: 16px; }

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-fu-muted);
  line-height: 1.35;
}
.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }
`;

// src/components/file-upload/gob-file-upload.element.ts
var ICONS3 = {
  upload: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V5.5M12 5.5L8 9.5M12 5.5l4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 18.5h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h6l4 4v11a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.6"/><path d="M13.5 4.5v4h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
};
function statusPill7(status) {
  switch (status) {
    case "error":
      return "Error";
    case "success":
      return "Valido";
    case "warning":
      return "Revision";
    case "info":
      return "Info";
    default:
      return "";
  }
}
var GobFileUploadElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "headEl");
    __publicField(this, "labelEl");
    __publicField(this, "pillEl");
    __publicField(this, "dropEl");
    __publicField(this, "titleEl");
    __publicField(this, "hintEl");
    __publicField(this, "browseBtn");
    __publicField(this, "inputEl");
    __publicField(this, "filesEl");
    __publicField(this, "helperEl");
    __publicField(this, "items", []);
    __publicField(this, "fileMap", /* @__PURE__ */ new Map());
    __publicField(this, "fieldId", `gob-fu-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "dragDepth", 0);
    __publicField(this, "onDropClick", (e) => {
      if (this.hasAttribute("disabled")) return;
      if (e.target.closest(".browse")) return;
      this.inputEl.click();
    });
    __publicField(this, "onBrowseClick", (e) => {
      e.stopPropagation();
      if (this.hasAttribute("disabled")) return;
      this.inputEl.click();
    });
    __publicField(this, "onDropKey", (e) => {
      if (this.hasAttribute("disabled")) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.inputEl.click();
      }
    });
    __publicField(this, "onInputChange", () => {
      const files = [...this.inputEl.files || []];
      this.inputEl.value = "";
      this.addFiles(files);
    });
    __publicField(this, "onDragEnter", (e) => {
      e.preventDefault();
      if (this.hasAttribute("disabled")) return;
      this.dragDepth += 1;
      this.rootEl.dataset.dragging = "true";
    });
    __publicField(this, "onDragLeave", (e) => {
      e.preventDefault();
      this.dragDepth = Math.max(0, this.dragDepth - 1);
      if (this.dragDepth === 0) this.rootEl.dataset.dragging = "false";
    });
    __publicField(this, "onDragOver", (e) => {
      e.preventDefault();
    });
    __publicField(this, "onDrop", (e) => {
      e.preventDefault();
      this.dragDepth = 0;
      this.rootEl.dataset.dragging = "false";
      if (this.hasAttribute("disabled")) return;
      const files = [...e.dataTransfer?.files || []];
      this.addFiles(files);
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = fileUploadStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.headEl = document.createElement("div");
    this.headEl.className = "head";
    this.labelEl = document.createElement("label");
    this.labelEl.className = "label";
    this.pillEl = document.createElement("span");
    this.pillEl.className = "pill";
    this.pillEl.hidden = true;
    this.headEl.append(this.labelEl, this.pillEl);
    this.dropEl = document.createElement("div");
    this.dropEl.className = "drop";
    this.dropEl.setAttribute("role", "button");
    this.dropEl.tabIndex = 0;
    const icon = document.createElement("span");
    icon.className = "icon";
    icon.innerHTML = ICONS3.upload;
    icon.setAttribute("aria-hidden", "true");
    this.titleEl = document.createElement("p");
    this.titleEl.className = "title";
    this.hintEl = document.createElement("p");
    this.hintEl.className = "hint";
    this.browseBtn = document.createElement("button");
    this.browseBtn.type = "button";
    this.browseBtn.className = "browse";
    this.browseBtn.textContent = "Elegir archivo";
    this.inputEl = document.createElement("input");
    this.inputEl.type = "file";
    this.inputEl.className = "input";
    this.inputEl.tabIndex = -1;
    this.dropEl.append(icon, this.titleEl, this.hintEl, this.browseBtn, this.inputEl);
    this.filesEl = document.createElement("ul");
    this.filesEl.className = "files";
    this.filesEl.hidden = true;
    this.helperEl = document.createElement("p");
    this.helperEl.className = "helper";
    this.helperEl.hidden = true;
    this.rootEl.append(this.headEl, this.dropEl, this.filesEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...FILE_UPLOAD_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.dropEl.addEventListener("click", this.onDropClick);
    this.dropEl.addEventListener("keydown", this.onDropKey);
    this.browseBtn.addEventListener("click", this.onBrowseClick);
    this.inputEl.addEventListener("change", this.onInputChange);
    this.dropEl.addEventListener("dragenter", this.onDragEnter);
    this.dropEl.addEventListener("dragleave", this.onDragLeave);
    this.dropEl.addEventListener("dragover", this.onDragOver);
    this.dropEl.addEventListener("drop", this.onDrop);
    this.syncFromAttributes();
  }
  disconnectedCallback() {
    this.dropEl.removeEventListener("click", this.onDropClick);
    this.dropEl.removeEventListener("keydown", this.onDropKey);
    this.browseBtn.removeEventListener("click", this.onBrowseClick);
    this.inputEl.removeEventListener("change", this.onInputChange);
    this.dropEl.removeEventListener("dragenter", this.onDragEnter);
    this.dropEl.removeEventListener("dragleave", this.onDragLeave);
    this.dropEl.removeEventListener("dragover", this.onDragOver);
    this.dropEl.removeEventListener("drop", this.onDrop);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.syncFromAttributes();
  }
  /** Public helper for demos / hosts. */
  getFiles() {
    return [...this.fileMap.values()];
  }
  addFiles(incoming) {
    if (!incoming.length) return;
    const accept = this.getAttribute("accept") || "";
    const maxSize = parseMaxSize(this.getAttribute("max-size"));
    const maxFiles = Number(this.getAttribute("max-files") || 0) || Infinity;
    const multiple = this.hasAttribute("multiple") || resolveFileUploadVariant(this.getAttribute("variant")) === "multiple";
    let next = multiple ? [...this.items] : [];
    if (!multiple) this.fileMap.clear();
    for (const file of incoming) {
      if (!multiple && next.length >= 1) break;
      if (next.length >= maxFiles) break;
      const id = `f-${Math.random().toString(36).slice(2, 9)}`;
      let error;
      if (!fileMatchesAccept(file, accept)) {
        error = "Tipo de archivo no permitido";
      } else if (maxSize !== null && file.size > maxSize) {
        error = `Excede ${this.getAttribute("max-size")}`;
      }
      const item = {
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: error ? 0 : 100,
        error
      };
      if (!error) this.fileMap.set(id, file);
      next.push(item);
    }
    this.items = next;
    this.renderFiles();
    this.emitChange();
  }
  removeFile(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.fileMap.delete(id);
    this.renderFiles();
    this.emitChange();
  }
  emitChange() {
    const files = this.getFiles();
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent("gob-file-upload", {
        detail: {
          files,
          items: this.items.map(({ id, name, size, type, progress, error }) => ({
            id,
            name,
            size,
            type,
            progress,
            error: error || null
          }))
        },
        bubbles: true,
        composed: true
      })
    );
  }
  renderFiles() {
    this.filesEl.replaceChildren();
    this.filesEl.hidden = this.items.length === 0;
    for (const item of this.items) {
      const li = document.createElement("li");
      li.className = "file";
      li.dataset.error = item.error ? "true" : "false";
      li.dataset.done = !item.error && item.progress >= 100 ? "true" : "false";
      const icon = document.createElement("span");
      icon.className = "file-icon";
      icon.innerHTML = ICONS3.file;
      icon.setAttribute("aria-hidden", "true");
      const meta = document.createElement("div");
      meta.className = "file-meta";
      const name = document.createElement("p");
      name.className = "file-name";
      name.textContent = item.name;
      const sub = document.createElement("p");
      sub.className = "file-sub";
      sub.textContent = item.error || formatBytes(item.size);
      meta.append(name, sub);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove";
      remove.setAttribute("aria-label", `Quitar ${item.name}`);
      remove.innerHTML = ICONS3.x;
      remove.disabled = this.hasAttribute("disabled");
      remove.addEventListener("click", (e) => {
        e.stopPropagation();
        this.removeFile(item.id);
      });
      const progress = document.createElement("div");
      progress.className = "progress";
      progress.setAttribute("aria-hidden", "true");
      const bar = document.createElement("span");
      bar.style.width = `${Math.max(0, Math.min(100, item.progress))}%`;
      progress.appendChild(bar);
      li.append(icon, meta, remove, progress);
      this.filesEl.appendChild(li);
    }
  }
  syncFromAttributes() {
    const variant = resolveFileUploadVariant(this.getAttribute("variant"));
    const status = resolveFileUploadStatus(this.getAttribute("status"));
    const size = resolveFileUploadSize(this.getAttribute("size"));
    const disabled = this.hasAttribute("disabled");
    const required = this.hasAttribute("required");
    const multiple = this.hasAttribute("multiple") || variant === "multiple";
    const label = this.getAttribute("label")?.trim() || "";
    const helper = this.getAttribute("helper")?.trim() || "";
    const hint = this.getAttribute("hint")?.trim() || "PDF, DOC o imagen. Arrastra o elige desde tu equipo.";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.inputEl.id = this.fieldId;
    this.inputEl.disabled = disabled;
    this.inputEl.multiple = multiple;
    this.inputEl.accept = this.getAttribute("accept") || "";
    this.inputEl.name = this.getAttribute("name") || "";
    this.inputEl.required = required && this.items.length === 0;
    this.labelEl.htmlFor = this.fieldId;
    const showLabel = Boolean(label) && variant !== "basic";
    this.labelEl.hidden = !showLabel;
    this.labelEl.innerHTML = "";
    if (showLabel) {
      this.labelEl.append(document.createTextNode(label));
      if (required) {
        const req = document.createElement("span");
        req.className = "req";
        req.textContent = "*";
        this.labelEl.append(req);
      }
    }
    const pill = statusPill7(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.headEl.hidden = !showLabel && !pill;
    this.titleEl.innerHTML = variant === "button" || variant === "compact" ? "Adjuntar archivo" : "Arrastra archivos aqui o <em>explora</em>";
    this.hintEl.textContent = hint;
    this.browseBtn.textContent = multiple ? "Elegir archivos" : "Elegir archivo";
    this.browseBtn.disabled = disabled;
    this.dropEl.tabIndex = disabled ? -1 : 0;
    this.dropEl.setAttribute("aria-disabled", disabled ? "true" : "false");
    const showHelper = Boolean(helper) || variant === "helper" || variant === "complete" || status !== "default";
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent = helper || (status === "error" ? "Debes cargar al menos un archivo" : status === "success" ? "Archivos listos" : status === "warning" ? "Revisa el formato" : "");
    this.renderFiles();
  }
};
defineCustomElement("gob-file-upload", GobFileUploadElement);

// src/components/search-field/search-field-constants.ts
var SEARCH_FIELD_VARIANTS = [
  "basic",
  "labeled",
  "helper",
  "dense",
  "soft",
  "floating",
  "underline",
  "pill",
  "clearable",
  "shortcut",
  "loading",
  "complete"
];
var SEARCH_FIELD_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info"
];
var SEARCH_FIELD_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "placeholder",
  "helper",
  "value",
  "status",
  "size",
  "shortcut",
  "name",
  "disabled",
  "readonly",
  "required",
  "loading"
];
function resolveSearchFieldVariant(value) {
  if (SEARCH_FIELD_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveSearchFieldStatus(value) {
  if (SEARCH_FIELD_STATUSES.includes(value ?? "")) {
    return value;
  }
  return "default";
}
function resolveSearchFieldSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}

// src/components/search-field/search-field-styles.ts
var searchFieldStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sf-vino: #9f2141;
  --gob-sf-vino-deep: #7a1832;
  --gob-sf-dorado: #bc945a;
  --gob-sf-title: #181511;
  --gob-sf-muted: #8a8278;
  --gob-sf-text: #3d3a35;
  --gob-sf-border: rgba(24, 21, 17, 0.12);
  --gob-sf-border-hover: rgba(24, 21, 17, 0.22);
  --gob-sf-focus: var(--gob-sf-vino);
  --gob-sf-ring: rgba(159, 33, 65, 0.16);
  --gob-sf-bg: #ffffff;
  --gob-sf-fill: #faf9f7;
  --gob-sf-radius: 14px;
  --gob-sf-height: 50px;
  --gob-sf-pad-x: 14px;
  --gob-sf-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-sf-height: 40px;
  --gob-sf-radius: 12px;
  --gob-sf-pad-x: 12px;
}
.root[data-size='lg'] {
  --gob-sf-height: 58px;
  --gob-sf-radius: 16px;
  --gob-sf-pad-x: 16px;
}
.root[data-variant='dense'] {
  --gob-sf-height: 38px;
  --gob-sf-radius: 10px;
  gap: 6px;
}

.root[data-status='error'] { --gob-sf-focus: #c62828; --gob-sf-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-sf-focus: #1f8a55; --gob-sf-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-sf-focus: #d0921a; --gob-sf-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-sf-focus: #2f5f8a; --gob-sf-ring: rgba(47,95,138,.16); }

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-sf-title);
}

.label .req {
  color: var(--gob-sf-vino);
  margin-left: 2px;
}

.pill {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-sf-vino);
}
.root[data-status='error'] .pill { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill { background: rgba(47,95,138,.12); color: #2f5f8a; }

.control {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  min-height: var(--gob-sf-height);
  padding: 0 var(--gob-sf-pad-x);
  border: 1.5px solid var(--gob-sf-border);
  border-radius: var(--gob-sf-radius);
  background: var(--gob-sf-bg);
  transition:
    border-color 180ms var(--gob-sf-ease),
    box-shadow 180ms var(--gob-sf-ease),
    background 180ms var(--gob-sf-ease);
}

.control:hover { border-color: var(--gob-sf-border-hover); }

.root[data-focused='true'] .control {
  border-color: var(--gob-sf-focus);
  box-shadow: 0 0 0 4px var(--gob-sf-ring);
  background: #fff;
}

.root[data-status='error'] .control {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-sf-border));
}
.root[data-status='success'] .control {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-sf-border));
}
.root[data-status='warning'] .control {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-sf-border));
}

.root[data-disabled='true'] .control {
  opacity: 0.72;
  background: var(--gob-sf-fill);
  cursor: not-allowed;
}

.lead {
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gob-sf-dorado);
  background: color-mix(in srgb, var(--gob-sf-dorado) 16%, transparent);
  transition: color 180ms var(--gob-sf-ease), background 180ms var(--gob-sf-ease);
}

.root[data-focused='true'] .lead,
.root[data-filled='true'] .lead {
  color: var(--gob-sf-vino);
  background: color-mix(in srgb, var(--gob-sf-vino) 12%, transparent);
}

.lead svg,
.icon-btn svg,
.spinner {
  width: 16px;
  height: 16px;
  display: block;
}

.field {
  flex: 1 1 auto;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--gob-sf-title);
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  letter-spacing: -0.01em;
}

.field::placeholder {
  color: var(--gob-sf-muted);
  font-weight: 500;
}

.float-label {
  position: absolute;
  left: calc(var(--gob-sf-pad-x) + 40px);
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  z-index: 1;
  transition:
    top 180ms var(--gob-sf-ease),
    transform 180ms var(--gob-sf-ease),
    font-size 180ms var(--gob-sf-ease),
    color 180ms var(--gob-sf-ease);
}

.root[data-variant='floating'] .control {
  align-items: flex-end;
  min-height: 60px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.root[data-variant='floating'] .lead,
.root[data-variant='floating'] .actions {
  align-self: center;
}
.root[data-variant='floating'] .field {
  min-height: 22px;
  padding-top: 2px;
}
/* Empty + idle: only the float label (avoid overlap with placeholder). */
.root[data-variant='floating'][data-filled='false']:not([data-focused='true']) .field::placeholder {
  opacity: 0;
  color: transparent;
}
.root[data-variant='floating'][data-focused='true'] .field::placeholder {
  opacity: 1;
}
.root[data-variant='floating'][data-focused='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  transform: none;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-sf-dorado);
}

.actions {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  appearance: none;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gob-sf-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-btn:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-sf-title);
}

.clear {
  opacity: 0;
  pointer-events: none;
  transition: opacity 140ms ease;
}
.root[data-filled='true'][data-clearable='true']:not([data-disabled='true']) .clear,
.root[data-focused='true'][data-clearable='true'] .clear {
  opacity: 1;
  pointer-events: auto;
}

.kbd {
  display: none;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #f7f4ef;
  color: var(--gob-sf-muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.root[data-variant='shortcut'] .kbd,
.root[data-variant='complete'] .kbd {
  display: inline-flex;
}
.root[data-focused='true'] .kbd,
.root[data-filled='true'] .kbd {
  display: none;
}

.spinner {
  border-radius: 999px;
  border: 2px solid color-mix(in srgb, var(--gob-sf-vino) 20%, transparent);
  border-top-color: var(--gob-sf-vino);
  animation: gob-sf-spin 700ms linear infinite;
}
.root[data-loading='true'] .spinner { display: block; }
.root:not([data-loading='true']) .spinner { display: none; }

@keyframes gob-sf-spin {
  to { transform: rotate(360deg); }
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sf-muted);
  line-height: 1.35;
}
.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.root[data-variant='soft'] .control {
  background: color-mix(in srgb, var(--gob-sf-vino) 5%, #fff);
  border-color: color-mix(in srgb, var(--gob-sf-vino) 14%, var(--gob-sf-border));
}
.root[data-variant='soft'][data-focused='true'] .control { background: #fff; }

.root[data-variant='underline'] .control {
  border-radius: 0;
  border-width: 0 0 1.5px;
  padding-left: 2px;
  padding-right: 2px;
  background: transparent;
  box-shadow: none !important;
}
.root[data-variant='underline'][data-focused='true'] .control {
  border-bottom-color: var(--gob-sf-focus);
}
.root[data-variant='underline'] .lead { background: transparent; }

.root[data-variant='pill'] .control { border-radius: 999px; }

.root[data-variant='complete'] .control {
  background:
    radial-gradient(90% 80% at 100% 0%, rgba(188,148,90,.1), transparent 55%),
    #fff;
}
`;

// src/components/search-field/gob-search-field.element.ts
var ICONS4 = {
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.6"/><path d="M16.2 16.2L20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
};
function statusPill8(status) {
  switch (status) {
    case "error":
      return "Error";
    case "success":
      return "Valido";
    case "warning":
      return "Revision";
    case "info":
      return "Info";
    default:
      return "";
  }
}
var GobSearchFieldElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "headEl");
    __publicField(this, "labelEl");
    __publicField(this, "pillEl");
    __publicField(this, "controlEl");
    __publicField(this, "floatLabelEl");
    __publicField(this, "leadEl");
    __publicField(this, "field");
    __publicField(this, "actionsEl");
    __publicField(this, "clearBtn");
    __publicField(this, "kbdEl");
    __publicField(this, "spinnerEl");
    __publicField(this, "helperEl");
    __publicField(this, "fieldId", `gob-sf-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "onInput", () => {
      const value = this.field.value;
      if (this.getAttribute("value") !== value) {
        if (value) this.setAttribute("value", value);
        else this.removeAttribute("value");
      }
      this.rootEl.dataset.filled = value ? "true" : "false";
      this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      this.dispatchEvent(
        new CustomEvent("gob-search", {
          detail: { value, reason: "input" },
          bubbles: true,
          composed: true
        })
      );
    });
    __publicField(this, "onChange", () => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
    __publicField(this, "onFocus", () => {
      this.rootEl.dataset.focused = "true";
    });
    __publicField(this, "onBlur", () => {
      this.rootEl.dataset.focused = "false";
    });
    __publicField(this, "onKeyDown", (e) => {
      if (e.key === "Escape" && this.field.value) {
        e.preventDefault();
        this.clearValue();
        return;
      }
      if (e.key === "Enter") {
        this.dispatchEvent(
          new CustomEvent("gob-search", {
            detail: { value: this.field.value, reason: "submit" },
            bubbles: true,
            composed: true
          })
        );
      }
    });
    __publicField(this, "onClear", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.clearValue();
      this.field.focus();
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = searchFieldStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.headEl = document.createElement("div");
    this.headEl.className = "head";
    this.labelEl = document.createElement("label");
    this.labelEl.className = "label";
    this.pillEl = document.createElement("span");
    this.pillEl.className = "pill";
    this.pillEl.hidden = true;
    this.headEl.append(this.labelEl, this.pillEl);
    this.controlEl = document.createElement("div");
    this.controlEl.className = "control";
    this.floatLabelEl = document.createElement("span");
    this.floatLabelEl.className = "float-label";
    this.floatLabelEl.hidden = true;
    this.leadEl = document.createElement("span");
    this.leadEl.className = "lead";
    this.leadEl.innerHTML = ICONS4.search;
    this.leadEl.setAttribute("aria-hidden", "true");
    this.field = document.createElement("input");
    this.field.className = "field";
    this.field.type = "search";
    this.field.autocomplete = "off";
    this.field.setAttribute("enterkeyhint", "search");
    this.actionsEl = document.createElement("div");
    this.actionsEl.className = "actions";
    this.clearBtn = document.createElement("button");
    this.clearBtn.type = "button";
    this.clearBtn.className = "icon-btn clear";
    this.clearBtn.setAttribute("aria-label", "Limpiar busqueda");
    this.clearBtn.innerHTML = ICONS4.x;
    this.clearBtn.tabIndex = -1;
    this.kbdEl = document.createElement("span");
    this.kbdEl.className = "kbd";
    this.kbdEl.setAttribute("aria-hidden", "true");
    this.spinnerEl = document.createElement("span");
    this.spinnerEl.className = "spinner";
    this.spinnerEl.setAttribute("aria-hidden", "true");
    this.actionsEl.append(this.spinnerEl, this.clearBtn, this.kbdEl);
    this.controlEl.append(
      this.floatLabelEl,
      this.leadEl,
      this.field,
      this.actionsEl
    );
    this.helperEl = document.createElement("p");
    this.helperEl.className = "helper";
    this.helperEl.hidden = true;
    this.rootEl.append(this.headEl, this.controlEl, this.helperEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...SEARCH_FIELD_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.field.addEventListener("input", this.onInput);
    this.field.addEventListener("change", this.onChange);
    this.field.addEventListener("focus", this.onFocus);
    this.field.addEventListener("blur", this.onBlur);
    this.field.addEventListener("keydown", this.onKeyDown);
    this.clearBtn.addEventListener("click", this.onClear);
    this.syncFromAttributes();
  }
  disconnectedCallback() {
    this.field.removeEventListener("input", this.onInput);
    this.field.removeEventListener("change", this.onChange);
    this.field.removeEventListener("focus", this.onFocus);
    this.field.removeEventListener("blur", this.onBlur);
    this.field.removeEventListener("keydown", this.onKeyDown);
    this.clearBtn.removeEventListener("click", this.onClear);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "value" && this.field.value === (newValue || "")) {
      this.rootEl.dataset.filled = this.field.value ? "true" : "false";
      return;
    }
    this.syncFromAttributes();
  }
  clearValue() {
    this.field.value = "";
    this.removeAttribute("value");
    this.rootEl.dataset.filled = "false";
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent("gob-search", {
        detail: { value: "", reason: "clear" },
        bubbles: true,
        composed: true
      })
    );
  }
  syncFromAttributes() {
    const variant = resolveSearchFieldVariant(this.getAttribute("variant"));
    const status = resolveSearchFieldStatus(this.getAttribute("status"));
    const size = resolveSearchFieldSize(this.getAttribute("size"));
    const disabled = this.hasAttribute("disabled");
    const readonly = this.hasAttribute("readonly");
    const required = this.hasAttribute("required");
    const loading = this.hasAttribute("loading") || variant === "loading";
    const label = this.getAttribute("label")?.trim() || "";
    const helper = this.getAttribute("helper")?.trim() || "";
    const placeholder = this.getAttribute("placeholder")?.trim() || "Buscar\u2026";
    const shortcut = this.getAttribute("shortcut")?.trim() || "\u2318K";
    const value = this.getAttribute("value") ?? "";
    const clearable = variant === "clearable" || variant === "complete" || variant === "shortcut" || variant === "loading" || variant === "pill" || variant === "soft";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.rootEl.dataset.clearable = clearable ? "true" : "false";
    this.rootEl.dataset.loading = loading ? "true" : "false";
    this.rootEl.dataset.filled = value ? "true" : "false";
    if (this.rootEl.dataset.focused !== "true") {
      this.rootEl.dataset.focused = "false";
    }
    this.field.id = this.fieldId;
    this.labelEl.htmlFor = this.fieldId;
    this.field.value = value;
    this.field.placeholder = placeholder;
    this.field.disabled = disabled;
    this.field.readOnly = readonly;
    this.field.required = required;
    this.field.name = this.getAttribute("name") || "";
    const showLabel = Boolean(label) && variant !== "basic" && variant !== "floating";
    this.labelEl.hidden = !showLabel;
    this.labelEl.innerHTML = "";
    if (showLabel) {
      this.labelEl.append(document.createTextNode(label));
      if (required) {
        const req = document.createElement("span");
        req.className = "req";
        req.textContent = "*";
        this.labelEl.append(req);
      }
    }
    const floating = variant === "floating";
    this.floatLabelEl.hidden = !floating;
    this.floatLabelEl.textContent = label || "Buscar";
    const pill = statusPill8(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.headEl.hidden = !showLabel && !pill;
    this.kbdEl.textContent = shortcut;
    const showHelper = Boolean(helper) || variant === "helper" || variant === "complete" || status !== "default";
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent = helper || (status === "error" ? "No se encontraron resultados" : status === "success" ? "Busqueda lista" : status === "warning" ? "Afina tu busqueda" : "");
  }
};
defineCustomElement("gob-search-field", GobSearchFieldElement);

// src/components/form-field/form-field-constants.ts
var FORM_FIELD_VARIANTS = [
  "basic",
  "labeled",
  "helper",
  "dense",
  "soft",
  "horizontal",
  "stacked",
  "inline",
  "complete"
];
var FORM_FIELD_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info"
];
var FORM_FIELD_OBSERVED_ATTRIBUTES = [
  "variant",
  "label",
  "helper",
  "hint",
  "status",
  "size",
  "required",
  "disabled"
];
function resolveFormFieldVariant(value) {
  if (FORM_FIELD_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveFormFieldStatus(value) {
  if (FORM_FIELD_STATUSES.includes(value ?? "")) {
    return value;
  }
  return "default";
}
function resolveFormFieldSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}
function statusPill9(status) {
  if (status === "error") return "Error";
  if (status === "success") return "Exito";
  if (status === "warning") return "Aviso";
  if (status === "info") return "Info";
  return "";
}

// src/components/form-field/form-field-styles.ts
var formFieldStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ff-vino: #9f2141;
  --gob-ff-vino-deep: #7a1832;
  --gob-ff-dorado: #bc945a;
  --gob-ff-title: #181511;
  --gob-ff-muted: #8a8278;
  --gob-ff-text: #3d3a35;
  --gob-ff-border: rgba(24, 21, 17, 0.12);
  --gob-ff-focus: var(--gob-ff-vino);
  --gob-ff-ring: rgba(159, 33, 65, 0.16);
  --gob-ff-bg: #ffffff;
  --gob-ff-fill: #faf9f7;
  --gob-ff-radius: 14px;
  --gob-ff-gap: 8px;
  --gob-ff-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: var(--gob-ff-gap);
  min-width: 0;
}

.root[data-size='sm'] { --gob-ff-gap: 6px; }
.root[data-size='lg'] { --gob-ff-gap: 10px; }
.root[data-variant='dense'] { --gob-ff-gap: 4px; }

.root[data-status='error'] { --gob-ff-focus: #c62828; --gob-ff-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-ff-focus: #1f8a55; --gob-ff-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-ff-focus: #d0921a; --gob-ff-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-ff-focus: #2f5f8a; --gob-ff-ring: rgba(47,95,138,.16); }

.head {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.label {
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-ff-title);
}

.label .req {
  color: var(--gob-ff-vino);
  margin-left: 2px;
}

.hint {
  margin: 0;
  flex: 0 0 auto;
  font-size: 11px;
  font-weight: 600;
  color: var(--gob-ff-muted);
}

.pill {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-ff-focus);
  background: color-mix(in srgb, var(--gob-ff-focus) 12%, #fff);
}

.control {
  min-width: 0;
  flex: 1 1 auto;
}

.control-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;
  align-items: end;
  min-width: 0;
}

.root[data-variant='inline'] .control-row {
  grid-template-columns: minmax(0, 1fr) auto;
}

.control ::slotted(*) {
  width: 100%;
  max-width: 100%;
}

.fallback {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border-radius: var(--gob-ff-radius);
  border: 1px solid var(--gob-ff-border);
  background: var(--gob-ff-bg);
  color: var(--gob-ff-muted);
  font-size: 14px;
  font-weight: 500;
}

.root[data-variant='soft'] .fallback {
  background: color-mix(in srgb, var(--gob-ff-vino) 6%, #fff);
  border-color: color-mix(in srgb, var(--gob-ff-vino) 18%, #ebe6df);
}

.root[data-size='sm'] .fallback { min-height: 40px; }
.root[data-size='lg'] .fallback { min-height: 56px; }
.root[data-variant='dense'] .fallback { min-height: 36px; border-radius: 10px; }

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-ff-muted);
  line-height: 1.4;
}

.root[data-status='error'] .helper,
.root[data-status='success'] .helper,
.root[data-status='warning'] .helper,
.root[data-status='info'] .helper {
  color: var(--gob-ff-focus);
  font-weight: 600;
}

.root[data-variant='horizontal'] {
  grid-template-columns: minmax(110px, 160px) minmax(0, 1fr);
  align-items: start;
  column-gap: 16px;
}
.root[data-variant='horizontal'] .head {
  padding-top: 14px;
}
.root[data-variant='horizontal'] .helper {
  grid-column: 2;
}
.root[data-variant='horizontal'] .control-row {
  grid-column: 2;
  grid-row: 1;
}
.root[data-variant='horizontal'] .head {
  grid-column: 1;
  grid-row: 1;
}

.root[data-variant='stacked'] {
  gap: 12px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid var(--gob-ff-border);
  background: var(--gob-ff-fill);
}

.root[data-variant='inline'] {
  /* control-row handles the end action */
}
.root[data-variant='inline'] .helper {
  grid-column: 1 / -1;
}

.root[data-variant='complete'] {
  gap: 8px;
  padding: 2px 0 2px 14px;
  border: 0;
  border-radius: 0;
  border-left: 3px solid var(--gob-ff-focus);
  background: transparent;
}
.root[data-variant='complete'] .label {
  font-size: 13px;
}
.root[data-variant='complete'][data-status='default'] {
  border-left-color: var(--gob-ff-dorado);
}

.root[data-disabled='true'] {
  opacity: 0.55;
  pointer-events: none;
}
`;

// src/components/form-field/gob-form-field.element.ts
var GobFormFieldElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "headEl");
    __publicField(this, "labelEl");
    __publicField(this, "hintEl");
    __publicField(this, "pillEl");
    __publicField(this, "controlEl");
    __publicField(this, "fallbackEl");
    __publicField(this, "helperEl");
    __publicField(this, "slotEl");
    __publicField(this, "fieldId", `gob-ff-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "onSlotChange", () => {
      const hasNodes = this.slotEl.assignedNodes({ flatten: true }).some((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) return true;
        return Boolean(node.textContent?.trim());
      });
      this.fallbackEl.hidden = hasNodes;
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = formFieldStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.headEl = document.createElement("div");
    this.headEl.className = "head";
    this.headEl.setAttribute("part", "head");
    this.labelEl = document.createElement("label");
    this.labelEl.className = "label";
    this.labelEl.setAttribute("part", "label");
    this.hintEl = document.createElement("span");
    this.hintEl.className = "hint";
    this.hintEl.setAttribute("part", "hint");
    this.pillEl = document.createElement("span");
    this.pillEl.className = "pill";
    this.pillEl.setAttribute("part", "pill");
    this.headEl.append(this.labelEl, this.hintEl, this.pillEl);
    const row = document.createElement("div");
    row.className = "control-row";
    row.setAttribute("part", "control-row");
    this.controlEl = document.createElement("div");
    this.controlEl.className = "control";
    this.controlEl.setAttribute("part", "control");
    this.slotEl = document.createElement("slot");
    this.fallbackEl = document.createElement("div");
    this.fallbackEl.className = "fallback";
    this.fallbackEl.textContent = "Control del formulario";
    this.fallbackEl.hidden = true;
    this.controlEl.append(this.slotEl, this.fallbackEl);
    const endSlot = document.createElement("slot");
    endSlot.name = "end";
    row.append(this.controlEl, endSlot);
    this.helperEl = document.createElement("p");
    this.helperEl.className = "helper";
    this.helperEl.setAttribute("part", "helper");
    this.helperEl.hidden = true;
    this.rootEl.append(this.headEl, row, this.helperEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...FORM_FIELD_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.slotEl.addEventListener("slotchange", this.onSlotChange);
    this.syncFromAttributes();
    this.onSlotChange();
  }
  disconnectedCallback() {
    this.slotEl.removeEventListener("slotchange", this.onSlotChange);
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveFormFieldVariant(this.getAttribute("variant"));
    const status = resolveFormFieldStatus(this.getAttribute("status"));
    const size = resolveFormFieldSize(this.getAttribute("size"));
    const disabled = this.hasAttribute("disabled");
    const required = this.hasAttribute("required");
    const label = this.getAttribute("label")?.trim() || "";
    const helper = this.getAttribute("helper")?.trim() || "";
    const hint = this.getAttribute("hint")?.trim() || "";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    const showLabel = Boolean(label) || variant === "labeled" || variant === "helper" || variant === "horizontal" || variant === "stacked" || variant === "inline" || variant === "complete";
    this.labelEl.hidden = !showLabel;
    this.labelEl.htmlFor = this.fieldId;
    this.labelEl.innerHTML = "";
    if (showLabel) {
      this.labelEl.append(document.createTextNode(label || "Campo"));
      if (required) {
        const req = document.createElement("span");
        req.className = "req";
        req.textContent = "*";
        this.labelEl.append(req);
      }
    }
    this.hintEl.hidden = !hint;
    this.hintEl.textContent = hint;
    const pill = statusPill9(status);
    this.pillEl.hidden = !pill;
    this.pillEl.textContent = pill;
    this.headEl.hidden = !showLabel && !hint && !pill;
    const showHelper = Boolean(helper) || variant === "helper" || variant === "complete" || status !== "default";
    this.helperEl.hidden = !showHelper;
    this.helperEl.textContent = helper || (status === "error" ? "Revisa este campo" : status === "success" ? "Campo valido" : status === "warning" ? "Revisa la informacion" : status === "info" ? "Dato de apoyo" : "");
  }
};
defineCustomElement("gob-form-field", GobFormFieldElement);

// src/components/form/form-constants.ts
var FORM_VARIANTS = [
  "basic",
  "single",
  "dual",
  "triple",
  "stacked",
  "dense",
  "soft",
  "card",
  "sections",
  "complete",
  "outline",
  "rail",
  "inset",
  "flat",
  "wide",
  "split",
  "panel",
  "toolbar",
  "bleed",
  "dashboard"
];
var FORM_OBSERVED_ATTRIBUTES = [
  "variant",
  "title",
  "description",
  "gap",
  "columns"
];
function resolveFormVariant(value) {
  if (FORM_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveFormGap(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}
function resolveFormColumns(value, variant) {
  if (value === "1" || value === "2" || value === "3") {
    return Number(value);
  }
  if (variant === "dual" || variant === "split" || variant === "wide" || variant === "dashboard") {
    return 2;
  }
  if (variant === "triple" || variant === "toolbar") return 3;
  return 1;
}

// src/components/form/form-styles.ts
var formStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-fm-vino: #9f2141;
  --gob-fm-vino-deep: #7a1832;
  --gob-fm-dorado: #bc945a;
  --gob-fm-title: #181511;
  --gob-fm-muted: #8a8278;
  --gob-fm-text: #3d3a35;
  --gob-fm-border: rgba(24, 21, 17, 0.1);
  --gob-fm-border-strong: rgba(24, 21, 17, 0.16);
  --gob-fm-bg: #ffffff;
  --gob-fm-fill: #f7f5f1;
  --gob-fm-radius: 16px;
  --gob-fm-gap: 16px;
  --gob-fm-cols: 1;
  --gob-fm-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 18px;
  min-width: 0;
}

.head {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 17px;
  font-weight: 750;
  letter-spacing: -0.03em;
  color: var(--gob-fm-title);
  line-height: 1.25;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--gob-fm-muted);
  line-height: 1.45;
  max-width: 58ch;
}

.body {
  display: grid;
  grid-template-columns: repeat(var(--gob-fm-cols), minmax(0, 1fr));
  gap: var(--gob-fm-gap);
  min-width: 0;
  align-items: start;
}

.root[data-gap='sm'] { --gob-fm-gap: 10px; }
.root[data-gap='md'] { --gob-fm-gap: 16px; }
.root[data-gap='lg'] { --gob-fm-gap: 24px; }

.root[data-columns='1'] { --gob-fm-cols: 1; }
.root[data-columns='2'] { --gob-fm-cols: 2; }
.root[data-columns='3'] { --gob-fm-cols: 3; }

/* Single: clear editorial header */
.root[data-variant='single'] {
  gap: 20px;
}
.root[data-variant='single'] .head {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='single'] .title {
  font-size: 18px;
}

/* Dual / triple: airy grid */
.root[data-variant='dual'],
.root[data-variant='triple'] {
  --gob-fm-gap: 18px 20px;
}
.root[data-variant='dual'] .head,
.root[data-variant='triple'] .head {
  margin-bottom: 2px;
}

/* Stacked: generous vertical rhythm */
.root[data-variant='stacked'] {
  gap: 22px;
}
.root[data-variant='stacked'] .body {
  gap: 22px;
}

/* Dense: compact toolbar forms */
.root[data-variant='dense'] {
  gap: 12px;
  --gob-fm-gap: 10px;
}
.root[data-variant='dense'] .title {
  font-size: 14px;
  letter-spacing: -0.01em;
}
.root[data-variant='dense'] .description {
  font-size: 12px;
}

/* Soft: flat tint, no gradient */
.root[data-variant='soft'] {
  gap: 16px;
  padding: 18px;
  border-radius: var(--gob-fm-radius);
  background: color-mix(in srgb, var(--gob-fm-vino) 4%, #fff);
  border: 1px solid color-mix(in srgb, var(--gob-fm-vino) 12%, #ebe6df);
}
.root[data-variant='soft'] .title {
  color: var(--gob-fm-vino-deep);
}

/* Card: crisp surface, hairline border */
.root[data-variant='card'] {
  gap: 18px;
  padding: 22px;
  border-radius: calc(var(--gob-fm-radius) + 2px);
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.04);
}
.root[data-variant='card'] .head {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='card'] .actions {
  margin-top: 2px;
  padding-top: 16px;
  border-top: 1px solid var(--gob-fm-border);
}

/* Sections: rule dividers between fields */
.root[data-variant='sections'] {
  gap: 16px;
}
.root[data-variant='sections'] .head {
  padding-bottom: 12px;
  border-bottom: 2px solid var(--gob-fm-title);
}
.root[data-variant='sections'] .title {
  font-size: 15px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 700;
}
.root[data-variant='sections'] .body {
  gap: 0;
}
.root[data-variant='sections'] ::slotted(*:not(:last-child)) {
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--gob-fm-border);
}

/* Complete: modern panel with dorado accent rail \u2014 flat colors only */
.root[data-variant='complete'] {
  gap: 18px;
  padding: 22px 22px 20px 20px;
  border-radius: calc(var(--gob-fm-radius) + 2px);
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
  border-left: 3px solid var(--gob-fm-dorado);
  box-shadow: none;
}
.root[data-variant='complete'] .head {
  display: grid;
  gap: 6px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='complete'] .title {
  font-size: 18px;
}
.root[data-variant='complete'] .description {
  max-width: 52ch;
}
.root[data-variant='complete'] .actions {
  margin-top: 2px;
  padding-top: 16px;
  border-top: 1px solid var(--gob-fm-border);
}

/* Outline: marco fino sin relleno */
.root[data-variant='outline'] {
  gap: 16px;
  padding: 20px;
  border-radius: var(--gob-fm-radius);
  background: transparent;
  border: 1.5px solid var(--gob-fm-border-strong);
}
.root[data-variant='outline'] .head {
  gap: 4px;
}
.root[data-variant='outline'] .title {
  font-size: 15px;
}

/* Rail: acento vino a la izquierda */
.root[data-variant='rail'] {
  gap: 16px;
  padding: 4px 0 4px 16px;
  border-left: 3px solid var(--gob-fm-vino);
  background: transparent;
}
.root[data-variant='rail'] .title {
  font-size: 16px;
}

/* Inset: superficie hundida plana */
.root[data-variant='inset'] {
  gap: 16px;
  padding: 18px;
  border-radius: var(--gob-fm-radius);
  background: var(--gob-fm-fill);
  border: 1px solid transparent;
}
.root[data-variant='inset'] .title {
  font-size: 15px;
}

/* Flat: tipografia protagonista, cero marco */
.root[data-variant='flat'] {
  gap: 14px;
}
.root[data-variant='flat'] .head {
  gap: 2px;
}
.root[data-variant='flat'] .title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.root[data-variant='flat'] .description {
  font-size: 12px;
}

/* Wide: dos columnas con mas aire */
.root[data-variant='wide'] {
  gap: 20px;
  --gob-fm-gap: 20px 24px;
}
.root[data-variant='wide'] .head {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='wide'] .title {
  font-size: 18px;
}

/* Split: primera columna estrecha de contexto */
.root[data-variant='split'] {
  gap: 18px;
}
.root[data-variant='split'] .head {
  display: grid;
  gap: 6px;
  max-width: 36ch;
}
.root[data-variant='split'] .title {
  font-size: 16px;
}
.root[data-variant='split'] .body {
  --gob-fm-gap: 16px 28px;
}

/* Panel: bloque institucional sobrio */
.root[data-variant='panel'] {
  gap: 18px;
  padding: 22px;
  border-radius: 4px;
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
  border-top: 3px solid var(--gob-fm-vino);
}
.root[data-variant='panel'] .title {
  font-size: 15px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.root[data-variant='panel'] .actions {
  padding-top: 14px;
  border-top: 1px solid var(--gob-fm-border);
}

/* Toolbar: fila compacta de filtros */
.root[data-variant='toolbar'] {
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
  align-items: end;
}
.root[data-variant='toolbar'] .head {
  display: none;
}
.root[data-variant='toolbar'] .body {
  --gob-fm-gap: 10px;
  align-items: end;
}
.root[data-variant='toolbar'] .actions {
  justify-content: flex-start;
  padding-top: 0;
}

/* Bleed: borde a borde del contenedor */
.root[data-variant='bleed'] {
  gap: 0;
  border-radius: 0;
  background: var(--gob-fm-bg);
  border: 0;
  border-top: 1px solid var(--gob-fm-border);
  border-bottom: 1px solid var(--gob-fm-border);
  padding: 20px 0;
}
.root[data-variant='bleed'] .head {
  padding-bottom: 14px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='bleed'] .actions {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--gob-fm-border);
}

/* Dashboard: filtros densos en tablero */
.root[data-variant='dashboard'] {
  gap: 14px;
  padding: 16px;
  border-radius: 12px;
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
}
.root[data-variant='dashboard'] .title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--gob-fm-muted);
}
.root[data-variant='dashboard'] .description {
  display: none;
}
.root[data-variant='dashboard'] .body {
  --gob-fm-gap: 12px;
}
.root[data-variant='dashboard'] .actions {
  justify-content: stretch;
  gap: 8px;
}
.root[data-variant='dashboard'] .actions ::slotted(*) {
  flex: 1 1 auto;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  min-width: 0;
}

.actions ::slotted(*) {
  flex: 0 0 auto;
}

@media (max-width: 720px) {
  .root[data-columns='2'] .body,
  .root[data-columns='3'] .body,
  .root[data-variant='dual'] .body,
  .root[data-variant='triple'] .body {
    grid-template-columns: 1fr;
  }

  .root[data-variant='card'],
  .root[data-variant='soft'],
  .root[data-variant='complete'],
  .root[data-variant='outline'],
  .root[data-variant='inset'],
  .root[data-variant='panel'],
  .root[data-variant='dashboard'] {
    padding: 16px;
  }

  .root[data-variant='split'] .body,
  .root[data-variant='wide'] .body,
  .root[data-variant='dashboard'] .body,
  .root[data-variant='toolbar'] .body {
    grid-template-columns: 1fr;
  }
}
`;

// src/components/form/gob-form.element.ts
var GobFormElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "headEl");
    __publicField(this, "titleEl");
    __publicField(this, "descriptionEl");
    __publicField(this, "bodyEl");
    __publicField(this, "actionsEl");
    __publicField(this, "actionsSlot");
    __publicField(this, "onActionsChange", () => {
      const hasActions = this.actionsSlot.assignedNodes({ flatten: true }).length > 0;
      const variant = resolveFormVariant(this.getAttribute("variant"));
      this.actionsEl.hidden = !hasActions && variant !== "complete" && variant !== "panel" && variant !== "dashboard" && variant !== "toolbar" && variant !== "bleed";
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = formStyles;
    this.rootEl = document.createElement("form");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("gob-form-submit", {
          detail: {},
          bubbles: true,
          composed: true
        })
      );
    });
    this.headEl = document.createElement("div");
    this.headEl.className = "head";
    this.headEl.setAttribute("part", "head");
    this.titleEl = document.createElement("h3");
    this.titleEl.className = "title";
    this.titleEl.setAttribute("part", "title");
    this.descriptionEl = document.createElement("p");
    this.descriptionEl.className = "description";
    this.descriptionEl.setAttribute("part", "description");
    this.headEl.append(this.titleEl, this.descriptionEl);
    this.bodyEl = document.createElement("div");
    this.bodyEl.className = "body";
    this.bodyEl.setAttribute("part", "body");
    this.bodyEl.appendChild(document.createElement("slot"));
    this.actionsEl = document.createElement("div");
    this.actionsEl.className = "actions";
    this.actionsEl.setAttribute("part", "actions");
    this.actionsSlot = document.createElement("slot");
    this.actionsSlot.name = "actions";
    this.actionsEl.appendChild(this.actionsSlot);
    this.rootEl.append(this.headEl, this.bodyEl, this.actionsEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...FORM_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.actionsSlot.addEventListener("slotchange", this.onActionsChange);
    this.syncFromAttributes();
    this.onActionsChange();
  }
  disconnectedCallback() {
    this.actionsSlot.removeEventListener("slotchange", this.onActionsChange);
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveFormVariant(this.getAttribute("variant"));
    const gap = resolveFormGap(this.getAttribute("gap"));
    const columns = resolveFormColumns(this.getAttribute("columns"), variant);
    const title = this.getAttribute("title")?.trim() || "";
    const description = this.getAttribute("description")?.trim() || "";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.gap = gap;
    this.rootEl.dataset.columns = String(columns);
    const showHead = Boolean(title) || Boolean(description) || variant === "card" || variant === "sections" || variant === "complete" || variant === "outline" || variant === "rail" || variant === "inset" || variant === "flat" || variant === "wide" || variant === "split" || variant === "panel" || variant === "bleed" || variant === "dashboard";
    this.headEl.hidden = !showHead || variant === "toolbar";
    this.titleEl.hidden = !title && variant !== "complete" && variant !== "card" && variant !== "panel" && variant !== "dashboard" || variant === "toolbar";
    this.titleEl.textContent = title || "Formulario";
    this.descriptionEl.hidden = !description || variant === "dashboard" || variant === "toolbar";
    this.descriptionEl.textContent = description;
    this.onActionsChange();
  }
};
defineCustomElement("gob-form", GobFormElement);

// src/components/tabs/tabs-constants.ts
var TABS_VARIANTS = [
  "basic",
  "underline",
  "pills",
  "soft",
  "vertical",
  "dense",
  "icons",
  "segmented",
  "bordered",
  "complete",
  "line",
  "ghost",
  "card",
  "rail",
  "flush",
  "editorial"
];
var TABS_OBSERVED_ATTRIBUTES = [
  "variant",
  "size",
  "value",
  "items",
  "disabled"
];
var TABS_ICONS = {
  house: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 11.5 12 5l7.5 6.5M7 10.5V19h10v-8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.25" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 18.5c1.6-2.6 3.8-3.9 6.5-3.9s4.9 1.3 6.5 3.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="2.75" stroke="currentColor" stroke-width="1.5"/><path d="M3.8 18c1.3-2.1 3-3.2 5.2-3.2s3.9 1.1 5.2 3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="16.2" cy="9.2" r="2.25" stroke="currentColor" stroke-width="1.5"/><path d="M14.2 14.8c1.5.2 2.8.9 3.9 2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h6l4 4v11a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5"/><path d="M13.5 4.5v4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  files: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 7.5h7.5l3 3V18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5"/><path d="M15.5 7.5v3h3M10 4.5h6.5l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 8.5A2 2 0 0 1 5.5 6.5h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2M6.7 6.7l1.6 1.6M15.7 15.7l1.6 1.6M6.7 17.3l1.6-1.6M15.7 8.3l1.6-1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5h11l-1.2-1.5V10a4.3 4.3 0 0 0-8.6 0v5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  tray: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 14.5 6.2 7.5h11.6l1.7 7M4.5 14.5h15V18a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 18v-3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5V12l3.2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V10.5M12 19V5.5M19 19v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  table: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h17M10 5.5V18.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5.5 3.5 7.5v11l5.5-2 5.5 2 5.5-2v-11L14.5 7.5 9 5.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 5.5v11M14.5 7.5v11" stroke="currentColor" stroke-width="1.5"/></svg>`,
  export: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 14.5V5.5M12 5.5 8.5 9M12 5.5 15.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15.5V18a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18v-2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.8 5.5 6.2v5.3c0 4.1 2.7 7.1 6.5 8.5 3.8-1.4 6.5-4.4 6.5-8.5V6.2L12 3.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20.5h15M6.5 20.5V7.5l5-3 5 3v13M10 10.5h1.5M12.5 10.5H14M10 13.5h1.5M12.5 13.5H14M10 16.5h1.5M12.5 16.5H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.5"/><path d="M16.2 16.2 20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 7h11M8.5 12h11M8.5 17h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="5" cy="7" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="17" r="1" fill="currentColor"/></svg>`,
  squares: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  pencil: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  archive: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="4" rx="1.2" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 8.5v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9M10 12.5h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  envelope: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 7.5 12 13l7.5-5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  paper: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h9a2 2 0 0 1 2 2v13l-3-1.5-3 1.5-3-1.5-3 1.5v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 9.5h6M9 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  history: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 12a6.5 6.5 0 1 0 1.8-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5 6.5v4h4M12 8.5V12l2.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  day: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v1.8M12 17.7v1.8M4.5 12h1.8M17.7 12h1.8M6.7 6.7l1.3 1.3M16 16l1.3 1.3M6.7 17.3 8 16M16 8l1.3-1.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  week: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4M8 14h2M12 14h2M16 14h1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  month: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 3.5v4M16 3.5v4M3.5 10h17M8 14h1.5M12 14h1.5M16 14h1.5M8 17h1.5M12 17h1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5.5" y="10.5" width="13" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  dots: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18" cy="12" r="1.3" fill="currentColor"/></svg>`
};
function resolveTabsIcon(name) {
  if (!name) return null;
  const key = name.trim().toLowerCase();
  return TABS_ICONS[key] || null;
}
function resolveTabsVariant(value) {
  if (TABS_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveTabsSize(value) {
  if (value === "sm" || value === "lg" || value === "md") return value;
  return "md";
}
function parseTabsItems(raw) {
  if (!raw?.trim()) {
    return [
      { id: "general", label: "General", icon: "house" },
      { id: "detalle", label: "Detalle", icon: "file" },
      { id: "historial", label: "Historial", icon: "history" }
    ];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const row = item;
      const id = typeof row.id === "string" && row.id.trim() ? row.id.trim() : `tab-${index + 1}`;
      const label = typeof row.label === "string" && row.label.trim() ? row.label.trim() : id;
      return {
        id,
        label,
        icon: typeof row.icon === "string" ? row.icon : void 0,
        disabled: Boolean(row.disabled),
        badge: typeof row.badge === "string" ? row.badge : void 0
      };
    }).filter((item) => Boolean(item));
  } catch {
    return [];
  }
}

// src/components/tabs/tabs-styles.ts
var tabsStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-tb-vino: #9f2141;
  --gob-tb-vino-deep: #7a1832;
  --gob-tb-dorado: #bc945a;
  --gob-tb-title: #181511;
  --gob-tb-muted: #8a8278;
  --gob-tb-text: #3d3a35;
  --gob-tb-border: rgba(24, 21, 17, 0.1);
  --gob-tb-border-strong: rgba(24, 21, 17, 0.16);
  --gob-tb-bg: #ffffff;
  --gob-tb-fill: #f3f3f3;
  --gob-tb-radius: 10px;
  --gob-tb-height: 40px;
  --gob-tb-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 14px;
  min-width: 0;
}

.root[data-size='sm'] { --gob-tb-height: 34px; --gob-tb-radius: 8px; }
.root[data-size='lg'] { --gob-tb-height: 46px; --gob-tb-radius: 12px; }
.root[data-variant='dense'] { --gob-tb-height: 32px; --gob-tb-radius: 8px; gap: 10px; }

.root[data-variant='vertical'],
.root[data-variant='rail'] {
  grid-template-columns: minmax(148px, 200px) minmax(0, 1fr);
  align-items: start;
  gap: 16px;
}

.list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-width: 0;
  padding: 0;
  margin: 0;
  list-style: none;
}

.root[data-variant='vertical'] .list,
.root[data-variant='rail'] .list {
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 2px;
}

/* \u2014\u2014 list chrome \u2014\u2014 */
.root[data-variant='underline'] .list,
.root[data-variant='line'] .list,
.root[data-variant='flush'] .list,
.root[data-variant='complete'] .list {
  gap: 0;
  border-bottom: 1px solid var(--gob-tb-border);
}

.root[data-variant='pills'] .list,
.root[data-variant='soft'] .list,
.root[data-variant='segmented'] .list {
  padding: 4px;
  border-radius: 12px;
  background: var(--gob-tb-fill);
}

.root[data-variant='segmented'] .list {
  display: inline-flex;
  flex-wrap: nowrap;
  width: fit-content;
  max-width: 100%;
  padding: 3px;
  border-radius: 10px;
}

.root[data-variant='bordered'] .list {
  gap: 0;
  border: 1px solid var(--gob-tb-border);
  border-radius: var(--gob-tb-radius);
  overflow: hidden;
  background: var(--gob-tb-bg);
}

.root[data-variant='card'] .list {
  gap: 8px;
}

.root[data-variant='ghost'] .list {
  gap: 2px;
}

.root[data-variant='editorial'] .list {
  gap: 0;
  border-bottom: 1px solid var(--gob-tb-title);
}

.root[data-variant='flush'] .list {
  width: 100%;
}

.root[data-variant='rail'] .list {
  padding: 4px 0;
  border-right: 1px solid var(--gob-tb-border);
  padding-right: 10px;
}

/* \u2014\u2014 tabs \u2014\u2014 */
.tab {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: var(--gob-tb-height);
  padding: 0 14px;
  border: 0;
  border-radius: var(--gob-tb-radius);
  background: transparent;
  color: var(--gob-tb-muted);
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.015em;
  cursor: pointer;
  white-space: nowrap;
  transition:
    color 150ms var(--gob-tb-ease),
    background 150ms var(--gob-tb-ease),
    box-shadow 150ms var(--gob-tb-ease),
    border-color 150ms var(--gob-tb-ease);
}

.tab:hover:not(:disabled) {
  color: var(--gob-tb-title);
  background: rgba(24, 21, 17, 0.04);
}

.tab[aria-selected='true'] {
  color: var(--gob-tb-vino);
  background: color-mix(in srgb, var(--gob-tb-vino) 8%, #fff);
}

.tab:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-tb-vino) 45%, transparent);
  outline-offset: 2px;
}

.tab:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

/* basic */
.root[data-variant='basic'] .tab[aria-selected='true'] {
  background: color-mix(in srgb, var(--gob-tb-vino) 9%, #fff);
  color: var(--gob-tb-vino-deep);
}

/* underline / line / complete / flush */
.root[data-variant='underline'] .tab,
.root[data-variant='line'] .tab,
.root[data-variant='flush'] .tab,
.root[data-variant='complete'] .tab,
.root[data-variant='editorial'] .tab {
  border-radius: 0;
  background: transparent;
  box-shadow: inset 0 -2px 0 transparent;
  padding: 0 16px;
}
.root[data-variant='underline'] .tab:hover:not(:disabled),
.root[data-variant='line'] .tab:hover:not(:disabled),
.root[data-variant='flush'] .tab:hover:not(:disabled),
.root[data-variant='complete'] .tab:hover:not(:disabled),
.root[data-variant='editorial'] .tab:hover:not(:disabled) {
  background: transparent;
  color: var(--gob-tb-title);
}
.root[data-variant='underline'] .tab[aria-selected='true'],
.root[data-variant='complete'] .tab[aria-selected='true'] {
  color: var(--gob-tb-vino);
  background: transparent;
  box-shadow: inset 0 -2px 0 var(--gob-tb-vino);
}
.root[data-variant='line'] .tab {
  box-shadow: inset 0 -1px 0 transparent;
  font-weight: 600;
}
.root[data-variant='line'] .tab[aria-selected='true'] {
  color: var(--gob-tb-title);
  background: transparent;
  box-shadow: inset 0 -2px 0 var(--gob-tb-dorado);
}
.root[data-variant='flush'] .tab {
  flex: 1 1 auto;
  justify-content: center;
}
.root[data-variant='flush'] .tab[aria-selected='true'] {
  color: var(--gob-tb-vino);
  background: transparent;
  box-shadow: inset 0 -2px 0 var(--gob-tb-vino);
}
.root[data-variant='editorial'] .tab {
  padding: 0 14px;
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.root[data-variant='editorial'] .tab[aria-selected='true'] {
  color: var(--gob-tb-title);
  background: transparent;
  box-shadow: inset 0 -2px 0 var(--gob-tb-title);
}

/* pills / soft / segmented */
.root[data-variant='pills'] .tab,
.root[data-variant='segmented'] .tab {
  border-radius: 8px;
}
.root[data-variant='pills'] .tab[aria-selected='true'],
.root[data-variant='segmented'] .tab[aria-selected='true'] {
  background: #fff;
  color: var(--gob-tb-vino-deep);
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.08);
}
.root[data-variant='soft'] .tab[aria-selected='true'] {
  background: color-mix(in srgb, var(--gob-tb-vino) 12%, #fff);
  color: var(--gob-tb-vino-deep);
  box-shadow: none;
}
.root[data-variant='segmented'] .tab {
  min-width: 72px;
  font-size: 12px;
  font-weight: 700;
}

/* bordered */
.root[data-variant='bordered'] .tab {
  border-radius: 0;
  flex: 1 1 auto;
  border-right: 1px solid var(--gob-tb-border);
  background: transparent;
}
.root[data-variant='bordered'] .tab:last-child { border-right: 0; }
.root[data-variant='bordered'] .tab[aria-selected='true'] {
  background: color-mix(in srgb, var(--gob-tb-dorado) 14%, #fff);
  color: var(--gob-tb-title);
  box-shadow: none;
}

/* vertical */
.root[data-variant='vertical'] .tab {
  justify-content: flex-start;
  width: 100%;
  border-radius: 8px;
  padding: 0 12px;
}
.root[data-variant='vertical'] .tab[aria-selected='true'] {
  background: color-mix(in srgb, var(--gob-tb-vino) 9%, #fff);
  color: var(--gob-tb-vino-deep);
}

/* icons */
.root[data-variant='icons'] .tab {
  min-width: var(--gob-tb-height);
  padding: 0 12px;
  gap: 10px;
}
.root[data-variant='icons'] .tab[aria-selected='true'] {
  background: color-mix(in srgb, var(--gob-tb-dorado) 14%, #fff);
  color: var(--gob-tb-title);
}

/* ghost */
.root[data-variant='ghost'] .tab {
  background: transparent;
  color: var(--gob-tb-muted);
  font-weight: 600;
}
.root[data-variant='ghost'] .tab:hover:not(:disabled) {
  background: transparent;
  color: var(--gob-tb-title);
}
.root[data-variant='ghost'] .tab[aria-selected='true'] {
  background: transparent;
  color: var(--gob-tb-vino);
  font-weight: 750;
}

/* card */
.root[data-variant='card'] .tab {
  min-height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid var(--gob-tb-border);
  background: var(--gob-tb-bg);
  color: var(--gob-tb-muted);
}
.root[data-variant='card'] .tab:hover:not(:disabled) {
  border-color: var(--gob-tb-border-strong);
  color: var(--gob-tb-title);
  background: var(--gob-tb-bg);
}
.root[data-variant='card'] .tab[aria-selected='true'] {
  border-color: var(--gob-tb-vino);
  color: var(--gob-tb-vino-deep);
  background: color-mix(in srgb, var(--gob-tb-vino) 6%, #fff);
  box-shadow: none;
}

/* rail */
.root[data-variant='rail'] .tab {
  justify-content: flex-start;
  width: 100%;
  border-radius: 0;
  border-left: 2px solid transparent;
  padding: 0 12px;
  background: transparent;
}
.root[data-variant='rail'] .tab:hover:not(:disabled) {
  background: rgba(24, 21, 17, 0.03);
}
.root[data-variant='rail'] .tab[aria-selected='true'] {
  border-left-color: var(--gob-tb-vino);
  color: var(--gob-tb-vino-deep);
  background: color-mix(in srgb, var(--gob-tb-vino) 6%, #fff);
}

/* dense */
.root[data-variant='dense'] .tab {
  padding: 0 10px;
  font-size: 12px;
}

/* complete */
.root[data-variant='complete'] .tab {
  gap: 10px;
}
.root[data-variant='complete'] .tab[aria-selected='true'] {
  color: var(--gob-tb-vino-deep);
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: currentColor;
  opacity: 0.72;
}
.icon svg {
  width: 16px;
  height: 16px;
  display: block;
}
.tab[aria-selected='true'] .icon {
  opacity: 1;
  color: var(--gob-tb-dorado);
}
.root[data-variant='icons'] .icon,
.root[data-variant='complete'] .icon,
.root[data-variant='rail'] .icon,
.root[data-variant='card'] .icon {
  width: 17px;
  height: 17px;
}
.root[data-variant='icons'] .icon svg,
.root[data-variant='complete'] .icon svg,
.root[data-variant='rail'] .icon svg,
.root[data-variant='card'] .icon svg {
  width: 17px;
  height: 17px;
}
.root[data-size='sm'] .icon,
.root[data-size='sm'] .icon svg,
.root[data-variant='dense'] .icon,
.root[data-variant='dense'] .icon svg {
  width: 14px;
  height: 14px;
}

.label {
  min-width: 0;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.02em;
  background: color-mix(in srgb, var(--gob-tb-dorado) 20%, #fff);
  color: var(--gob-tb-title);
  border: 1px solid color-mix(in srgb, var(--gob-tb-dorado) 35%, transparent);
}

.panel {
  min-height: 64px;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid var(--gob-tb-border);
  background: var(--gob-tb-bg);
  color: var(--gob-tb-text);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
}

.root[data-variant='ghost'] .panel,
.root[data-variant='line'] .panel,
.root[data-variant='editorial'] .panel,
.root[data-variant='flush'] .panel {
  border: 0;
  border-radius: 0;
  padding: 12px 2px 0;
  background: transparent;
}

.root[data-variant='card'] .panel {
  border-radius: 12px;
  border-color: var(--gob-tb-border);
}

.root[data-variant='rail'] .panel,
.root[data-variant='vertical'] .panel {
  min-height: 120px;
}

.root[data-variant='complete'] .panel {
  border-color: var(--gob-tb-border);
  border-left: 3px solid var(--gob-tb-dorado);
  background: var(--gob-tb-bg);
  border-radius: 12px;
}

.root[data-variant='bordered'] .panel {
  border-radius: 0 0 10px 10px;
  margin-top: -1px;
}

.root[data-disabled='true'] {
  opacity: 0.55;
  pointer-events: none;
}

@media (max-width: 640px) {
  .root[data-variant='vertical'],
  .root[data-variant='rail'] {
    grid-template-columns: 1fr;
  }
  .root[data-variant='rail'] .list {
    border-right: 0;
    border-bottom: 1px solid var(--gob-tb-border);
    padding-right: 0;
    padding-bottom: 8px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .root[data-variant='rail'] .tab {
    width: auto;
    border-left: 0;
    border-bottom: 2px solid transparent;
  }
  .root[data-variant='rail'] .tab[aria-selected='true'] {
    border-left-color: transparent;
    border-bottom-color: var(--gob-tb-vino);
  }
}
`;

// src/components/tabs/gob-tabs.element.ts
var DEFAULT_ICONS = ["house", "file", "history", "gear", "user", "folder"];
var GobTabsElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "listEl");
    __publicField(this, "panelEl");
    __publicField(this, "items", []);
    __publicField(this, "selectedId", "");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = tabsStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.listEl = document.createElement("div");
    this.listEl.className = "list";
    this.listEl.setAttribute("part", "list");
    this.listEl.setAttribute("role", "tablist");
    this.panelEl = document.createElement("div");
    this.panelEl.className = "panel";
    this.panelEl.setAttribute("part", "panel");
    this.panelEl.setAttribute("role", "tabpanel");
    this.rootEl.append(this.listEl, this.panelEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...TABS_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveTabsVariant(this.getAttribute("variant"));
    const size = resolveTabsSize(this.getAttribute("size"));
    const disabled = this.hasAttribute("disabled");
    this.items = parseTabsItems(this.getAttribute("items"));
    const value = this.getAttribute("value")?.trim() || "";
    const firstEnabled = this.items.find((item) => !item.disabled)?.id || "";
    this.selectedId = value && this.items.some((item) => item.id === value) ? value : this.selectedId && this.items.some((item) => item.id === this.selectedId) ? this.selectedId : firstEnabled;
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.renderTabs();
    this.renderPanel();
  }
  renderTabs() {
    this.listEl.replaceChildren();
    const variant = this.rootEl.dataset.variant || "basic";
    const forceIcons = variant === "icons" || variant === "complete" || variant === "rail" || variant === "card" || variant === "vertical";
    this.items.forEach((item, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("part", "tab");
      btn.id = `tab-${item.id}`;
      btn.dataset.id = item.id;
      btn.setAttribute("aria-selected", item.id === this.selectedId ? "true" : "false");
      btn.disabled = Boolean(item.disabled) || this.hasAttribute("disabled");
      const iconName = item.icon || (forceIcons ? DEFAULT_ICONS[index % DEFAULT_ICONS.length] : void 0);
      const iconSvg = resolveTabsIcon(iconName);
      if (iconSvg) {
        const icon = document.createElement("span");
        icon.className = "icon";
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = iconSvg;
        btn.appendChild(icon);
      }
      const label = document.createElement("span");
      label.className = "label";
      label.textContent = item.label;
      btn.appendChild(label);
      if (item.badge) {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = item.badge;
        btn.appendChild(badge);
      }
      btn.addEventListener("click", () => this.selectTab(item.id));
      this.listEl.appendChild(btn);
    });
  }
  renderPanel() {
    const current = this.items.find((item) => item.id === this.selectedId);
    this.panelEl.setAttribute("aria-labelledby", current ? `tab-${current.id}` : "");
    this.panelEl.textContent = current ? `Contenido de ${current.label}` : "Selecciona una pesta\xF1a";
  }
  selectTab(id) {
    const item = this.items.find((row) => row.id === id);
    if (!item || item.disabled || this.hasAttribute("disabled")) return;
    if (this.selectedId === id) return;
    this.selectedId = id;
    if (this.getAttribute("value") !== id) {
      this.setAttribute("value", id);
    } else {
      this.renderTabs();
      this.renderPanel();
    }
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent("gob-tabs", {
        detail: { value: id, item },
        bubbles: true,
        composed: true
      })
    );
  }
};
defineCustomElement("gob-tabs", GobTabsElement);

// src/components/steps/steps-constants.ts
var STEPS_VARIANTS = [
  "basic",
  "numbered",
  "dots",
  "vertical",
  "compact",
  "soft",
  "outlined",
  "labeled",
  "progress",
  "complete"
];
var STEPS_OBSERVED_ATTRIBUTES = [
  "variant",
  "size",
  "value",
  "items",
  "disabled"
];
var STEPS_ICONS = {
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h6l4 4v11a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5"/><path d="M13.5 4.5v4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.25" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 18.5c1.6-2.6 3.8-3.9 6.5-3.9s4.9 1.3 6.5 3.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.8 5.5 6.2v5.3c0 4.1 2.7 7.1 6.5 8.5 3.8-1.4 6.5-4.4 6.5-8.5V6.2L12 3.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20.5h15M6.5 20.5V7.5l5-3 5 3v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
function resolveStepsIcon(name) {
  if (!name) return null;
  return STEPS_ICONS[name.trim().toLowerCase()] || null;
}
function resolveStepsVariant(value) {
  if (STEPS_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveStepsSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}
function parseStepsItems(raw) {
  if (!raw?.trim()) {
    return [
      { id: "datos", label: "Datos", description: "Captura inicial", icon: "user" },
      { id: "docs", label: "Documentos", description: "Anexos", icon: "file" },
      { id: "revision", label: "Revision", description: "Validacion", icon: "shield" },
      { id: "firma", label: "Firma", description: "Cierre", icon: "pen" }
    ];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const row = item;
      const id = typeof row.id === "string" && row.id.trim() ? row.id.trim() : `step-${index + 1}`;
      const label = typeof row.label === "string" && row.label.trim() ? row.label.trim() : `Paso ${index + 1}`;
      return {
        id,
        label,
        description: typeof row.description === "string" ? row.description : void 0,
        icon: typeof row.icon === "string" ? row.icon : void 0,
        disabled: Boolean(row.disabled)
      };
    }).filter((item) => Boolean(item));
  } catch {
    return [];
  }
}

// src/components/steps/steps-styles.ts
var stepsStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-st-vino: #9f2141;
  --gob-st-vino-deep: #7a1832;
  --gob-st-dorado: #bc945a;
  --gob-st-title: #181511;
  --gob-st-muted: #8a8278;
  --gob-st-border: rgba(24, 21, 17, 0.1);
  --gob-st-bg: #ffffff;
  --gob-st-fill: #f3f3f3;
  --gob-st-dot: 28px;
  --gob-st-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 14px;
  min-width: 0;
}

.root[data-size='sm'] { --gob-st-dot: 24px; }
.root[data-size='lg'] { --gob-st-dot: 34px; }

.list {
  display: flex;
  align-items: flex-start;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 0;
  width: 100%;
}

.root[data-variant='vertical'] .list {
  flex-direction: column;
  gap: 0;
}

/* Horizontal: icon row + label below (connector never crosses text) */
.step {
  appearance: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  flex: 1 1 0;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  font: inherit;
  cursor: pointer;
  color: var(--gob-st-muted);
}

.root[data-variant='vertical'] .step {
  flex-direction: row;
  align-items: flex-start;
  flex: 0 0 auto;
  width: 100%;
  gap: 12px;
  padding: 0 0 20px;
}

.step:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.marker-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--gob-st-dot);
}

.root[data-variant='vertical'] .marker-wrap {
  position: relative;
  display: grid;
  justify-items: center;
  width: var(--gob-st-dot);
  flex: 0 0 var(--gob-st-dot);
  align-self: stretch;
}

.marker {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  width: var(--gob-st-dot);
  height: var(--gob-st-dot);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--gob-st-border);
  background: var(--gob-st-bg);
  color: var(--gob-st-muted);
  font-size: 12px;
  font-weight: 750;
  letter-spacing: -0.02em;
  transition: background 150ms var(--gob-st-ease), border-color 150ms var(--gob-st-ease), color 150ms var(--gob-st-ease);
}

.marker .icon {
  width: 14px;
  height: 14px;
  display: inline-flex;
}
.marker .icon svg { width: 14px; height: 14px; display: block; }

/* Horizontal connector: flex line after the circle only */
.root:not([data-variant='vertical']):not([data-variant='dots']) .step:not(:last-child) .marker-wrap::after {
  content: '';
  flex: 1 1 auto;
  height: 1.5px;
  margin-left: 8px;
  margin-right: 8px;
  background: var(--gob-st-border);
  min-width: 12px;
}
.root:not([data-variant='vertical']):not([data-variant='dots']) .step[data-state='done']:not(:last-child) .marker-wrap::after {
  background: var(--gob-st-vino);
}

/* Vertical connector under the circle */
.root[data-variant='vertical'] .step:not(:last-child) .marker-wrap::after {
  content: '';
  position: absolute;
  top: var(--gob-st-dot);
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  bottom: 0;
  background: var(--gob-st-border);
}
.root[data-variant='vertical'] .step[data-state='done']:not(:last-child) .marker-wrap::after {
  background: var(--gob-st-vino);
}

.copy {
  display: grid;
  gap: 2px;
  min-width: 0;
  padding-right: 12px;
}

.root[data-variant='vertical'] .copy {
  padding-right: 0;
  padding-top: 2px;
  flex: 1 1 auto;
}

.root:not([data-variant='vertical']):not([data-variant='dots']) .step:last-child .copy {
  padding-right: 0;
}

.label {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: inherit;
}

.desc {
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-st-muted);
  line-height: 1.35;
}

.step[data-state='done'] .marker {
  background: var(--gob-st-vino);
  border-color: var(--gob-st-vino);
  color: #fff;
}
.step[data-state='current'] .marker {
  border-color: var(--gob-st-vino);
  color: var(--gob-st-vino);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gob-st-vino) 12%, transparent);
}
.step[data-state='current'] {
  color: var(--gob-st-vino-deep);
}
.step[data-state='done'] {
  color: var(--gob-st-title);
}

.root[data-variant='dots'] .list {
  gap: 10px;
  justify-content: center;
  align-items: center;
}
.root[data-variant='dots'] .step {
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
}
.root[data-variant='dots'] .marker-wrap {
  width: auto;
}
.root[data-variant='dots'] .copy { display: none; }
.root[data-variant='dots'] .marker {
  width: 10px;
  height: 10px;
  border-width: 0;
  background: #d8d8d8;
}
.root[data-variant='dots'] .step[data-state='done'] .marker,
.root[data-variant='dots'] .step[data-state='current'] .marker {
  background: var(--gob-st-vino);
  box-shadow: none;
}
.root[data-variant='dots'] .marker .num,
.root[data-variant='dots'] .marker .icon { display: none; }
.root[data-variant='dots'] .step:not(:last-child) .marker-wrap::after {
  content: '';
  flex: 0 0 18px;
  height: 1.5px;
  margin-left: 8px;
  margin-right: 0;
  background: var(--gob-st-border);
}
.root[data-variant='dots'] .step[data-state='done']:not(:last-child) .marker-wrap::after {
  background: var(--gob-st-vino);
}

.root[data-variant='compact'] .copy .desc { display: none; }
.root[data-variant='compact'] { --gob-st-dot: 24px; }

.root[data-variant='soft'] {
  padding: 14px;
  border-radius: 14px;
  background: var(--gob-st-fill);
}

.root[data-variant='outlined'] {
  padding: 14px;
  border-radius: 14px;
  border: 1.5px solid var(--gob-st-border);
}

.root[data-variant='labeled'] .desc { display: none; }
.root[data-variant='progress'] .panel,
.root[data-variant='complete'] .panel {
  display: block;
}

.panel {
  display: none;
  min-height: 56px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--gob-st-border);
  background: var(--gob-st-bg);
  color: #3d3a35;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
}

.root[data-variant='complete'] .panel {
  border-left: 3px solid var(--gob-st-dorado);
}

.root[data-variant='progress'] .bar {
  display: block;
  height: 4px;
  border-radius: 999px;
  background: var(--gob-st-fill);
  overflow: hidden;
}
.bar { display: none; }
.bar > i {
  display: block;
  height: 100%;
  background: var(--gob-st-vino);
  border-radius: inherit;
  width: 0%;
  transition: width 200ms var(--gob-st-ease);
}

.root[data-disabled='true'] { opacity: 0.55; pointer-events: none; }

@media (max-width: 720px) {
  .root:not([data-variant='dots']) .list {
    flex-direction: column;
  }
  .root:not([data-variant='dots']):not([data-variant='vertical']) .step {
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
    padding-bottom: 18px;
  }
  .root:not([data-variant='dots']):not([data-variant='vertical']) .marker-wrap {
    position: relative;
    display: grid;
    justify-items: center;
    width: var(--gob-st-dot);
    flex: 0 0 var(--gob-st-dot);
    align-self: stretch;
  }
  .root:not([data-variant='dots']):not([data-variant='vertical']) .step:not(:last-child) .marker-wrap::after {
    content: '';
    position: absolute;
    top: var(--gob-st-dot);
    left: 50%;
    transform: translateX(-50%);
    width: 1.5px;
    bottom: 0;
    height: auto;
    margin: 0;
    flex: none;
    min-width: 0;
    background: var(--gob-st-border);
  }
  .root:not([data-variant='dots']):not([data-variant='vertical']) .step[data-state='done']:not(:last-child) .marker-wrap::after {
    background: var(--gob-st-vino);
  }
  .root:not([data-variant='dots']):not([data-variant='vertical']) .copy {
    padding-right: 0;
    flex: 1 1 auto;
  }
}
`;

// src/components/steps/gob-steps.element.ts
var GobStepsElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "listEl");
    __publicField(this, "barEl");
    __publicField(this, "barFill");
    __publicField(this, "panelEl");
    __publicField(this, "items", []);
    __publicField(this, "selectedId", "");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = stepsStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.listEl = document.createElement("div");
    this.listEl.className = "list";
    this.listEl.setAttribute("role", "list");
    this.listEl.setAttribute("part", "list");
    this.barEl = document.createElement("div");
    this.barEl.className = "bar";
    this.barEl.setAttribute("part", "bar");
    this.barFill = document.createElement("i");
    this.barEl.appendChild(this.barFill);
    this.panelEl = document.createElement("div");
    this.panelEl.className = "panel";
    this.panelEl.setAttribute("part", "panel");
    this.rootEl.append(this.listEl, this.barEl, this.panelEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...STEPS_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveStepsVariant(this.getAttribute("variant"));
    const size = resolveStepsSize(this.getAttribute("size"));
    const disabled = this.hasAttribute("disabled");
    this.items = parseStepsItems(this.getAttribute("items"));
    const value = this.getAttribute("value")?.trim() || "";
    const first = this.items.find((item) => !item.disabled)?.id || "";
    this.selectedId = value && this.items.some((item) => item.id === value) ? value : this.selectedId && this.items.some((item) => item.id === this.selectedId) ? this.selectedId : first;
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.render();
  }
  render() {
    const currentIndex = Math.max(
      0,
      this.items.findIndex((item) => item.id === this.selectedId)
    );
    const variant = this.rootEl.dataset.variant || "basic";
    const showNumbers = variant !== "dots" && (variant === "numbered" || variant === "basic" || variant === "compact" || variant === "soft" || variant === "outlined" || variant === "labeled" || variant === "progress" || variant === "complete" || variant === "vertical");
    this.listEl.replaceChildren();
    this.items.forEach((item, index) => {
      const state = index < currentIndex ? "done" : index === currentIndex ? "current" : "todo";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "step";
      btn.dataset.state = state;
      btn.setAttribute("role", "listitem");
      btn.disabled = Boolean(item.disabled) || this.hasAttribute("disabled");
      const markerWrap = document.createElement("div");
      markerWrap.className = "marker-wrap";
      const marker = document.createElement("span");
      marker.className = "marker";
      if (state === "done") {
        const icon = document.createElement("span");
        icon.className = "icon";
        icon.innerHTML = resolveStepsIcon("check") || "";
        marker.appendChild(icon);
      } else if (item.icon && resolveStepsIcon(item.icon) && variant !== "dots") {
        const icon = document.createElement("span");
        icon.className = "icon";
        icon.innerHTML = resolveStepsIcon(item.icon) || "";
        marker.appendChild(icon);
      } else if (showNumbers) {
        const num = document.createElement("span");
        num.className = "num";
        num.textContent = String(index + 1);
        marker.appendChild(num);
      }
      markerWrap.appendChild(marker);
      const copy = document.createElement("div");
      copy.className = "copy";
      const label = document.createElement("p");
      label.className = "label";
      label.textContent = item.label;
      const desc = document.createElement("p");
      desc.className = "desc";
      desc.textContent = item.description || "";
      if (!item.description) desc.hidden = true;
      copy.append(label, desc);
      btn.append(markerWrap, copy);
      btn.addEventListener("click", () => this.selectStep(item.id));
      this.listEl.appendChild(btn);
    });
    const pct2 = this.items.length <= 1 ? 100 : Math.round(currentIndex / (this.items.length - 1) * 100);
    this.barFill.style.width = `${pct2}%`;
    const current = this.items[currentIndex];
    this.panelEl.textContent = current ? `Paso actual: ${current.label}${current.description ? ` \u2014 ${current.description}` : ""}` : "Sin pasos";
  }
  selectStep(id) {
    const item = this.items.find((row) => row.id === id);
    if (!item || item.disabled || this.hasAttribute("disabled")) return;
    if (this.selectedId === id) return;
    this.selectedId = id;
    if (this.getAttribute("value") !== id) this.setAttribute("value", id);
    else this.render();
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent("gob-steps", {
        detail: { value: id, item },
        bubbles: true,
        composed: true
      })
    );
  }
};
defineCustomElement("gob-steps", GobStepsElement);

// src/components/nav-menu/nav-menu-constants.ts
var NAV_MENU_VARIANTS = [
  "basic",
  "horizontal",
  "vertical",
  "pills",
  "underline",
  "soft",
  "dense",
  "icons",
  "bordered",
  "complete",
  "rail",
  "ghost",
  "dock",
  "sidebar",
  "floating"
];
var NAV_MENU_OBSERVED_ATTRIBUTES = [
  "variant",
  "size",
  "value",
  "items",
  "disabled"
];
var NAV_ICONS = {
  house: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 11.5 12 5l7.5 6.5M7 10.5V19h10v-8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 8.5A2 2 0 0 1 5.5 6.5h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="2.75" stroke="currentColor" stroke-width="1.5"/><path d="M3.8 18c1.3-2.1 3-3.2 5.2-3.2s3.9 1.1 5.2 3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="16.2" cy="9.2" r="2.25" stroke="currentColor" stroke-width="1.5"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V10.5M12 19V5.5M19 19v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5h11l-1.2-1.5V10a4.3 4.3 0 0 0-8.6 0v5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5h6l4 4v11a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.5"/><path d="M13.5 4.5v4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 20.5h15M6.5 20.5V7.5l5-3 5 3v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.5"/><path d="M16.2 16.2 20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  squares: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`
};
function resolveNavIcon(name) {
  if (!name) return null;
  return NAV_ICONS[name.trim().toLowerCase()] || null;
}
function resolveNavMenuVariant(value) {
  if (NAV_MENU_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveNavMenuSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}
function parseNavMenuItems(raw) {
  if (!raw?.trim()) {
    return [
      { id: "inicio", label: "Inicio", icon: "house", description: "Panel principal" },
      { id: "tramites", label: "Tramites", icon: "folder", description: "Gestiones activas" },
      { id: "ciudadanos", label: "Ciudadanos", icon: "users", description: "Padron" },
      { id: "reportes", label: "Reportes", icon: "chart", description: "Indicadores" }
    ];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const row = item;
      const id = typeof row.id === "string" && row.id.trim() ? row.id.trim() : `nav-${index + 1}`;
      const label = typeof row.label === "string" && row.label.trim() ? row.label.trim() : id;
      return {
        id,
        label,
        href: typeof row.href === "string" ? row.href : void 0,
        icon: typeof row.icon === "string" ? row.icon : void 0,
        disabled: Boolean(row.disabled),
        badge: typeof row.badge === "string" ? row.badge : void 0,
        description: typeof row.description === "string" ? row.description : void 0
      };
    }).filter((item) => Boolean(item));
  } catch {
    return [];
  }
}

// src/components/nav-menu/nav-menu-styles.ts
var navMenuStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-nm-vino: #9f2141;
  --gob-nm-vino-deep: #7a1832;
  --gob-nm-dorado: #bc945a;
  --gob-nm-title: #181511;
  --gob-nm-muted: #6f6a63;
  --gob-nm-border: rgba(24, 21, 17, 0.1);
  --gob-nm-border-strong: rgba(24, 21, 17, 0.16);
  --gob-nm-bg: #ffffff;
  --gob-nm-fill: #f3f3f3;
  --gob-nm-height: 42px;
  --gob-nm-radius: 12px;
  --gob-nm-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 0;
  min-width: 0;
}

.root[data-size='sm'] { --gob-nm-height: 36px; --gob-nm-radius: 10px; }
.root[data-size='lg'] { --gob-nm-height: 48px; --gob-nm-radius: 14px; }
.root[data-variant='dense'] { --gob-nm-height: 34px; --gob-nm-radius: 9px; }

.list {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 0;
}

/* \u2014\u2014 shell variants \u2014\u2014 */
.root[data-variant='vertical'] .list,
.root[data-variant='rail'] .list,
.root[data-variant='sidebar'] .list {
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 4px;
  max-width: 280px;
  width: 100%;
}

.root[data-variant='pills'] .list,
.root[data-variant='soft'] .list {
  padding: 5px;
  border-radius: 14px;
  background: var(--gob-nm-fill);
  gap: 3px;
}

.root[data-variant='underline'] .list,
.root[data-variant='complete'] .list {
  gap: 0;
  border-bottom: 1px solid var(--gob-nm-border);
}

.root[data-variant='bordered'] .list {
  gap: 0;
  border: 1px solid var(--gob-nm-border);
  border-radius: var(--gob-nm-radius);
  overflow: hidden;
  background: var(--gob-nm-bg);
}

.root[data-variant='floating'] {
  padding: 6px;
  border-radius: 16px;
  border: 1px solid var(--gob-nm-border);
  background: var(--gob-nm-bg);
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.04);
}
.root[data-variant='floating'] .list {
  gap: 2px;
}

.root[data-variant='complete'] {
  padding: 8px 10px 0;
  border: 1px solid var(--gob-nm-border);
  border-radius: 16px;
  background: var(--gob-nm-bg);
  border-left: 3px solid var(--gob-nm-dorado);
}

.root[data-variant='sidebar'] {
  padding: 10px;
  border-radius: 16px;
  border: 1px solid var(--gob-nm-border);
  background: var(--gob-nm-bg);
  max-width: 300px;
}
.root[data-variant='sidebar'] .list {
  max-width: none;
}

.root[data-variant='dock'] .list {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 4px;
  padding: 6px;
  border-radius: 16px;
  border: 1px solid var(--gob-nm-border);
  background: var(--gob-nm-fill);
}

/* \u2014\u2014 items \u2014\u2014 */
.item {
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: var(--gob-nm-height);
  padding: 0 14px;
  border: 0;
  border-radius: calc(var(--gob-nm-radius) - 2px);
  background: transparent;
  color: var(--gob-nm-muted);
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.02em;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition:
    color 160ms var(--gob-nm-ease),
    background 160ms var(--gob-nm-ease),
    box-shadow 160ms var(--gob-nm-ease),
    border-color 160ms var(--gob-nm-ease);
}

.item:hover:not(:disabled):not([aria-disabled='true']) {
  color: var(--gob-nm-title);
  background: rgba(24, 21, 17, 0.045);
}

.item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-nm-vino) 40%, transparent);
  outline-offset: 2px;
}

.item[data-active='true'] {
  color: var(--gob-nm-vino-deep);
  background: color-mix(in srgb, var(--gob-nm-vino) 8%, #fff);
  font-weight: 700;
}

.item:disabled,
.item[aria-disabled='true'] {
  opacity: 0.4;
  cursor: not-allowed;
}

.copy {
  display: grid;
  gap: 1px;
  min-width: 0;
  text-align: left;
}

.label {
  line-height: 1.2;
}

.desc {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--gob-nm-muted);
  opacity: 0.85;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item[data-active='true'] .desc {
  color: color-mix(in srgb, var(--gob-nm-vino) 55%, var(--gob-nm-muted));
}

.icon {
  width: 17px;
  height: 17px;
  display: inline-flex;
  flex: 0 0 auto;
  opacity: 0.7;
  color: currentColor;
}
.icon svg { width: 17px; height: 17px; display: block; }
.item[data-active='true'] .icon {
  opacity: 1;
  color: var(--gob-nm-dorado);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  min-width: 20px;
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.02em;
  background: var(--gob-nm-fill);
  color: var(--gob-nm-title);
  border: 1px solid var(--gob-nm-border);
}
.item[data-active='true'] .badge {
  background: color-mix(in srgb, var(--gob-nm-vino) 10%, #fff);
  border-color: color-mix(in srgb, var(--gob-nm-vino) 22%, transparent);
  color: var(--gob-nm-vino-deep);
}

/* basic / horizontal */
.root[data-variant='basic'] .item,
.root[data-variant='horizontal'] .item {
  padding: 0 16px;
}
.root[data-variant='horizontal'] .list {
  gap: 4px;
}
.root[data-variant='horizontal'] .item[data-active='true'] {
  background: transparent;
  box-shadow: inset 0 -2px 0 var(--gob-nm-vino);
  border-radius: 0;
  color: var(--gob-nm-vino);
}

/* vertical / rail / sidebar */
.root[data-variant='vertical'] .item,
.root[data-variant='rail'] .item,
.root[data-variant='sidebar'] .item {
  width: 100%;
  justify-content: flex-start;
  min-height: 48px;
  padding: 10px 12px;
  border-radius: 12px;
}
.root[data-variant='rail'] .item {
  border-left: 2px solid transparent;
  border-radius: 0 12px 12px 0;
  padding-left: 14px;
}
.root[data-variant='rail'] .item[data-active='true'] {
  border-left-color: var(--gob-nm-vino);
  background: color-mix(in srgb, var(--gob-nm-vino) 7%, #fff);
}
.root[data-variant='sidebar'] .item[data-active='true'] {
  background: color-mix(in srgb, var(--gob-nm-vino) 8%, #fff);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gob-nm-vino) 14%, transparent);
}

/* underline / complete */
.root[data-variant='underline'] .item,
.root[data-variant='complete'] .item {
  border-radius: 0;
  background: transparent;
  box-shadow: inset 0 -2px 0 transparent;
  padding: 0 16px;
  min-height: 44px;
}
.root[data-variant='underline'] .item:hover:not(:disabled),
.root[data-variant='complete'] .item:hover:not(:disabled) {
  background: transparent;
  color: var(--gob-nm-title);
}
.root[data-variant='underline'] .item[data-active='true'],
.root[data-variant='complete'] .item[data-active='true'] {
  background: transparent;
  color: var(--gob-nm-vino);
  box-shadow: inset 0 -2px 0 var(--gob-nm-vino);
}

/* pills / soft / floating */
.root[data-variant='pills'] .item,
.root[data-variant='floating'] .item {
  border-radius: 10px;
}
.root[data-variant='pills'] .item[data-active='true'],
.root[data-variant='floating'] .item[data-active='true'] {
  background: #fff;
  color: var(--gob-nm-vino-deep);
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.08);
}
.root[data-variant='soft'] .item[data-active='true'] {
  background: color-mix(in srgb, var(--gob-nm-vino) 12%, #fff);
  color: var(--gob-nm-vino-deep);
  box-shadow: none;
}

/* bordered */
.root[data-variant='bordered'] .item {
  border-radius: 0;
  flex: 1 1 auto;
  justify-content: center;
  border-right: 1px solid var(--gob-nm-border);
  min-height: 44px;
}
.root[data-variant='bordered'] .item:last-child { border-right: 0; }
.root[data-variant='bordered'] .item[data-active='true'] {
  background: color-mix(in srgb, var(--gob-nm-dorado) 14%, #fff);
  color: var(--gob-nm-title);
}

/* icons */
.root[data-variant='icons'] .item {
  gap: 10px;
  padding: 0 14px;
}
.root[data-variant='icons'] .icon {
  width: 18px;
  height: 18px;
}
.root[data-variant='icons'] .icon svg {
  width: 18px;
  height: 18px;
}

/* ghost */
.root[data-variant='ghost'] .list { gap: 6px; }
.root[data-variant='ghost'] .item {
  background: transparent;
  padding: 0 10px;
  font-weight: 600;
}
.root[data-variant='ghost'] .item:hover:not(:disabled) {
  background: transparent;
  color: var(--gob-nm-title);
}
.root[data-variant='ghost'] .item[data-active='true'] {
  background: transparent;
  color: var(--gob-nm-vino);
  font-weight: 750;
}

/* dock: icon-forward app bar */
.root[data-variant='dock'] .item {
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  min-height: 64px;
  padding: 8px 6px;
  border-radius: 12px;
  white-space: normal;
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.root[data-variant='dock'] .copy {
  text-align: center;
}
.root[data-variant='dock'] .desc { display: none; }
.root[data-variant='dock'] .badge {
  position: absolute;
  top: 8px;
  right: 10px;
  margin: 0;
}
.root[data-variant='dock'] .item[data-active='true'] {
  background: #fff;
  color: var(--gob-nm-vino-deep);
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.08);
}

.root[data-disabled='true'] { opacity: 0.55; pointer-events: none; }

@media (max-width: 640px) {
  .root[data-variant='dock'] .list {
    grid-auto-flow: row;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .root[data-variant='bordered'] .list {
    flex-wrap: wrap;
  }
  .root[data-variant='bordered'] .item {
    flex: 1 1 45%;
    border-bottom: 1px solid var(--gob-nm-border);
  }
}
`;

// src/components/nav-menu/gob-nav-menu.element.ts
var FALLBACK_ICONS = [
  "house",
  "folder",
  "users",
  "chart",
  "gear",
  "bell",
  "file",
  "building"
];
var GobNavMenuElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "listEl");
    __publicField(this, "items", []);
    __publicField(this, "selectedId", "");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = navMenuStyles;
    this.rootEl = document.createElement("nav");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("aria-label", "Menu de navegacion");
    this.listEl = document.createElement("div");
    this.listEl.className = "list";
    this.listEl.setAttribute("part", "list");
    this.listEl.setAttribute("role", "menubar");
    this.rootEl.appendChild(this.listEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...NAV_MENU_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveNavMenuVariant(this.getAttribute("variant"));
    const size = resolveNavMenuSize(this.getAttribute("size"));
    const disabled = this.hasAttribute("disabled");
    this.items = parseNavMenuItems(this.getAttribute("items"));
    const value = this.getAttribute("value")?.trim() || "";
    const first = this.items.find((item) => !item.disabled)?.id || "";
    this.selectedId = value && this.items.some((item) => item.id === value) ? value : this.selectedId && this.items.some((item) => item.id === this.selectedId) ? this.selectedId : first;
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.listEl.setAttribute(
      "role",
      variant === "vertical" || variant === "rail" || variant === "sidebar" ? "menu" : "menubar"
    );
    this.render();
  }
  render() {
    const variant = this.rootEl.dataset.variant || "basic";
    const forceIcons = variant === "icons" || variant === "vertical" || variant === "complete" || variant === "soft" || variant === "rail" || variant === "sidebar" || variant === "dock" || variant === "floating";
    const showDesc = variant === "vertical" || variant === "rail" || variant === "sidebar";
    this.listEl.replaceChildren();
    this.items.forEach((item, index) => {
      const active = item.id === this.selectedId;
      const el = item.href ? document.createElement("a") : document.createElement("button");
      el.className = "item";
      el.setAttribute("role", "menuitem");
      el.dataset.active = active ? "true" : "false";
      if (active) el.setAttribute("aria-current", "page");
      if (item.href) {
        el.href = item.href;
      } else {
        el.type = "button";
      }
      if (item.disabled || this.hasAttribute("disabled")) {
        if (item.href) el.setAttribute("aria-disabled", "true");
        else el.disabled = true;
      }
      const iconName = item.icon || (forceIcons ? FALLBACK_ICONS[index % FALLBACK_ICONS.length] : void 0);
      const iconSvg = resolveNavIcon(iconName);
      if (iconSvg) {
        const icon = document.createElement("span");
        icon.className = "icon";
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = iconSvg;
        el.appendChild(icon);
      }
      const copy = document.createElement("span");
      copy.className = "copy";
      const label = document.createElement("span");
      label.className = "label";
      label.textContent = item.label;
      copy.appendChild(label);
      if (showDesc && item.description) {
        const desc = document.createElement("span");
        desc.className = "desc";
        desc.textContent = item.description;
        copy.appendChild(desc);
      }
      el.appendChild(copy);
      if (item.badge) {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = item.badge;
        el.appendChild(badge);
      }
      el.addEventListener("click", (event) => {
        if (item.disabled || this.hasAttribute("disabled")) {
          event.preventDefault();
          return;
        }
        this.selectItem(item.id, item);
      });
      this.listEl.appendChild(el);
    });
  }
  selectItem(id, item) {
    if (this.selectedId === id) return;
    this.selectedId = id;
    if (this.getAttribute("value") !== id) this.setAttribute("value", id);
    else this.render();
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent("gob-nav-menu", {
        detail: { value: id, item },
        bubbles: true,
        composed: true
      })
    );
  }
};
defineCustomElement("gob-nav-menu", GobNavMenuElement);

// src/components/pagination-bar/pagination-bar-constants.ts
var PAGINATION_BAR_VARIANTS = [
  "basic",
  "summary",
  "dense",
  "soft",
  "bordered",
  "compact",
  "detailed",
  "toolbar",
  "split",
  "complete"
];
var PAGINATION_BAR_OBSERVED_ATTRIBUTES = [
  "variant",
  "size",
  "page",
  "total",
  "page-size",
  "summary",
  "disabled"
];
function resolvePaginationBarVariant(value) {
  if (PAGINATION_BAR_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolvePaginationBarSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}
function toPositiveInt(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.floor(n);
}
var PAGINATION_BAR_ICONS = {
  prev: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 6.5 9 12l5.5 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  next: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.5 6.5 15 12l-5.5 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

// src/components/pagination-bar/pagination-bar-styles.ts
var paginationBarStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-pb-vino: #9f2141;
  --gob-pb-vino-deep: #7a1832;
  --gob-pb-dorado: #bc945a;
  --gob-pb-title: #181511;
  --gob-pb-muted: #8a8278;
  --gob-pb-border: rgba(24, 21, 17, 0.1);
  --gob-pb-bg: #ffffff;
  --gob-pb-fill: #f3f3f3;
  --gob-pb-radius: 12px;
  --gob-pb-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 16px;
  min-width: 0;
}

.root[data-variant='soft'] {
  padding: 12px 14px;
  border-radius: var(--gob-pb-radius);
  background: var(--gob-pb-fill);
}

.root[data-variant='bordered'],
.root[data-variant='complete'],
.root[data-variant='toolbar'] {
  padding: 12px 14px;
  border-radius: var(--gob-pb-radius);
  border: 1px solid var(--gob-pb-border);
  background: var(--gob-pb-bg);
}

.root[data-variant='complete'] {
  border-left: 3px solid var(--gob-pb-dorado);
}

.root[data-variant='split'] {
  gap: 16px;
}
.root[data-variant='split'] .summary {
  flex: 1 1 auto;
}
.root[data-variant='dense'],
.root[data-variant='compact'] {
  gap: 8px;
}

.root[data-variant='toolbar'] {
  justify-content: flex-start;
}

.summary {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--gob-pb-title);
}

.meta {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-pb-muted);
}

.root[data-variant='compact'] .meta { display: none; }
.root[data-variant='basic'] .title { display: none; }

.controls {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}

.btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid var(--gob-pb-border);
  background: var(--gob-pb-bg);
  color: var(--gob-pb-title);
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 140ms var(--gob-pb-ease), border-color 140ms var(--gob-pb-ease), color 140ms var(--gob-pb-ease);
}

.btn:hover:not(:disabled) {
  border-color: rgba(24, 21, 17, 0.2);
  background: var(--gob-pb-fill);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn[data-active='true'] {
  background: var(--gob-pb-vino);
  border-color: var(--gob-pb-vino);
  color: #fff;
}

.btn .icon {
  width: 16px;
  height: 16px;
  display: inline-flex;
}
.btn .icon svg { width: 16px; height: 16px; display: block; }

.pages {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.root[data-size='sm'] .btn { min-width: 30px; height: 30px; border-radius: 8px; }
.root[data-size='lg'] .btn { min-width: 40px; height: 40px; }

.root[data-variant='detailed'] .pages { gap: 6px; }

.root[data-disabled='true'] { opacity: 0.55; pointer-events: none; }

@media (max-width: 640px) {
  .root {
    flex-direction: column;
    align-items: stretch;
  }
  .controls {
    justify-content: space-between;
    width: 100%;
  }
}
`;

// src/components/pagination-bar/gob-pagination-bar.element.ts
var GobPaginationBarElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "summaryEl");
    __publicField(this, "titleEl");
    __publicField(this, "metaEl");
    __publicField(this, "controlsEl");
    __publicField(this, "pagesEl");
    __publicField(this, "prevBtn");
    __publicField(this, "nextBtn");
    __publicField(this, "onPrev", () => {
      const page = toPositiveInt(this.getAttribute("page"), 1);
      if (page <= 1) return;
      this.setPage(page - 1);
    });
    __publicField(this, "onNext", () => {
      const page = toPositiveInt(this.getAttribute("page"), 1);
      const total = toPositiveInt(this.getAttribute("total"), 1);
      const pageSize = toPositiveInt(this.getAttribute("page-size"), 10);
      const pages = Math.max(1, Math.ceil(total / pageSize));
      if (page >= pages) return;
      this.setPage(page + 1);
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = paginationBarStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.summaryEl = document.createElement("div");
    this.summaryEl.className = "summary";
    this.summaryEl.setAttribute("part", "summary");
    this.titleEl = document.createElement("p");
    this.titleEl.className = "title";
    this.metaEl = document.createElement("p");
    this.metaEl.className = "meta";
    this.summaryEl.append(this.titleEl, this.metaEl);
    this.controlsEl = document.createElement("div");
    this.controlsEl.className = "controls";
    this.controlsEl.setAttribute("part", "controls");
    this.prevBtn = document.createElement("button");
    this.prevBtn.type = "button";
    this.prevBtn.className = "btn";
    this.prevBtn.setAttribute("aria-label", "Pagina anterior");
    this.prevBtn.innerHTML = `<span class="icon">${PAGINATION_BAR_ICONS.prev}</span>`;
    this.nextBtn = document.createElement("button");
    this.nextBtn.type = "button";
    this.nextBtn.className = "btn";
    this.nextBtn.setAttribute("aria-label", "Pagina siguiente");
    this.nextBtn.innerHTML = `<span class="icon">${PAGINATION_BAR_ICONS.next}</span>`;
    this.pagesEl = document.createElement("div");
    this.pagesEl.className = "pages";
    this.controlsEl.append(this.prevBtn, this.pagesEl, this.nextBtn);
    this.rootEl.append(this.summaryEl, this.controlsEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...PAGINATION_BAR_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.prevBtn.addEventListener("click", this.onPrev);
    this.nextBtn.addEventListener("click", this.onNext);
    this.syncFromAttributes();
  }
  disconnectedCallback() {
    this.prevBtn.removeEventListener("click", this.onPrev);
    this.nextBtn.removeEventListener("click", this.onNext);
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  setPage(page) {
    this.setAttribute("page", String(page));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent("gob-pagination-bar", {
        detail: { page },
        bubbles: true,
        composed: true
      })
    );
  }
  syncFromAttributes() {
    const variant = resolvePaginationBarVariant(this.getAttribute("variant"));
    const size = resolvePaginationBarSize(this.getAttribute("size"));
    const disabled = this.hasAttribute("disabled");
    const page = toPositiveInt(this.getAttribute("page"), 1);
    const total = toPositiveInt(this.getAttribute("total"), 48);
    const pageSize = toPositiveInt(this.getAttribute("page-size"), 10);
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const current = Math.min(page, pages);
    const start = (current - 1) * pageSize + 1;
    const end = Math.min(current * pageSize, total);
    const summary = this.getAttribute("summary")?.trim() || "Resultados de la consulta";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.titleEl.textContent = summary;
    this.metaEl.textContent = `Mostrando ${start}-${end} de ${total} \xB7 Pagina ${current} de ${pages}`;
    this.prevBtn.disabled = disabled || current <= 1;
    this.nextBtn.disabled = disabled || current >= pages;
    this.pagesEl.replaceChildren();
    const maxButtons = variant === "compact" || variant === "dense" ? 3 : variant === "detailed" ? 7 : 5;
    let from = Math.max(1, current - Math.floor(maxButtons / 2));
    let to = Math.min(pages, from + maxButtons - 1);
    from = Math.max(1, to - maxButtons + 1);
    for (let i = from; i <= to; i += 1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn";
      btn.textContent = String(i);
      btn.dataset.active = i === current ? "true" : "false";
      btn.disabled = disabled;
      btn.addEventListener("click", () => {
        if (i !== current) this.setPage(i);
      });
      this.pagesEl.appendChild(btn);
    }
  }
};
defineCustomElement("gob-pagination-bar", GobPaginationBarElement);

// src/components/link/link-constants.ts
var LINK_VARIANTS = [
  "basic",
  "inline",
  "subtle",
  "underline",
  "strong",
  "soft",
  "external",
  "nav",
  "muted",
  "complete"
];
var LINK_TONES = ["primary", "neutral", "success", "warning", "danger"];
var LINK_OBSERVED_ATTRIBUTES = [
  "variant",
  "tone",
  "size",
  "href",
  "label",
  "external",
  "disabled"
];
var LINK_ICONS = {
  arrow: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h12.5M13.5 7.5 18 12l-4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5.5h4.5V10M18.5 5.5 11 13M9.5 6.5H7.5A2 2 0 0 0 5.5 8.5v8A2 2 0 0 0 7.5 18.5h8a2 2 0 0 0 2-2v-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
function resolveLinkVariant(value) {
  if (LINK_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveLinkTone(value) {
  if (LINK_TONES.includes(value ?? "")) {
    return value;
  }
  return "primary";
}
function resolveLinkSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}

// src/components/link/link-styles.ts
var linkStyles = `
:host {
  display: inline-flex;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-lk-vino: #9f2141;
  --gob-lk-vino-deep: #7a1832;
  --gob-lk-dorado: #bc945a;
  --gob-lk-title: #181511;
  --gob-lk-muted: #6f6a63;
  --gob-lk-color: var(--gob-lk-vino);
  --gob-lk-size: 14px;
  --gob-lk-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: var(--gob-lk-color);
  font-size: var(--gob-lk-size);
  font-weight: 650;
  letter-spacing: -0.015em;
  line-height: 1.3;
  text-decoration: none;
  cursor: pointer;
  transition: color 150ms var(--gob-lk-ease), background 150ms var(--gob-lk-ease), opacity 150ms var(--gob-lk-ease);
}

.root:hover { color: var(--gob-lk-vino-deep); }
.root:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-lk-vino) 40%, transparent);
  outline-offset: 3px;
  border-radius: 4px;
}

.root[data-size='sm'] { --gob-lk-size: 12px; }
.root[data-size='lg'] { --gob-lk-size: 16px; }

.root[data-tone='primary'] { --gob-lk-color: var(--gob-lk-vino); }
.root[data-tone='neutral'] { --gob-lk-color: var(--gob-lk-title); }
.root[data-tone='success'] { --gob-lk-color: #1f8a55; }
.root[data-tone='warning'] { --gob-lk-color: #b87712; }
.root[data-tone='danger'] { --gob-lk-color: #c62828; }

.root[data-variant='inline'] {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.root[data-variant='underline'] {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1.5px;
  text-decoration-color: color-mix(in srgb, currentColor 45%, transparent);
}
.root[data-variant='underline']:hover {
  text-decoration-color: currentColor;
}
.root[data-variant='subtle'],
.root[data-variant='muted'] {
  color: var(--gob-lk-muted);
  font-weight: 600;
}
.root[data-variant='subtle']:hover,
.root[data-variant='muted']:hover {
  color: var(--gob-lk-vino);
}
.root[data-variant='strong'] {
  font-weight: 750;
  letter-spacing: -0.02em;
}
.root[data-variant='soft'] {
  padding: 6px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--gob-lk-vino) 8%, #fff);
}
.root[data-variant='soft']:hover {
  background: color-mix(in srgb, var(--gob-lk-vino) 14%, #fff);
}
.root[data-variant='nav'] {
  font-weight: 700;
  letter-spacing: -0.02em;
}
.root[data-variant='nav']:hover {
  color: var(--gob-lk-dorado);
}
.root[data-variant='external'] .icon,
.root[data-variant='complete'] .icon {
  display: inline-flex;
}
.root[data-variant='complete'] {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  border-left: 3px solid var(--gob-lk-dorado);
}

.label { min-width: 0; }

.icon {
  display: none;
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  color: currentColor;
}
.icon svg { width: 14px; height: 14px; display: block; }
.root[data-external='true'] .icon,
.root[data-variant='external'] .icon,
.root[data-variant='complete'] .icon,
.root[data-variant='nav'] .icon {
  display: inline-flex;
}

.root[data-disabled='true'] {
  opacity: 0.45;
  pointer-events: none;
  cursor: not-allowed;
}
`;

// src/components/link/gob-link.element.ts
var GobLinkElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "anchorEl");
    __publicField(this, "labelEl");
    __publicField(this, "iconEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = linkStyles;
    this.anchorEl = document.createElement("a");
    this.anchorEl.className = "root";
    this.anchorEl.setAttribute("part", "root");
    this.labelEl = document.createElement("span");
    this.labelEl.className = "label";
    this.labelEl.setAttribute("part", "label");
    this.iconEl = document.createElement("span");
    this.iconEl.className = "icon";
    this.iconEl.setAttribute("aria-hidden", "true");
    this.iconEl.setAttribute("part", "icon");
    this.anchorEl.append(this.labelEl, this.iconEl);
    shadow.append(style, this.anchorEl);
  }
  static get observedAttributes() {
    return [...LINK_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveLinkVariant(this.getAttribute("variant"));
    const tone = resolveLinkTone(this.getAttribute("tone"));
    const size = resolveLinkSize(this.getAttribute("size"));
    const href = this.getAttribute("href")?.trim() || "#";
    const label = this.getAttribute("label")?.trim() || this.textContent?.trim() || "Enlace";
    const external = this.hasAttribute("external") || variant === "external" || variant === "complete";
    const disabled = this.hasAttribute("disabled");
    this.anchorEl.dataset.variant = variant;
    this.anchorEl.dataset.tone = tone;
    this.anchorEl.dataset.size = size;
    this.anchorEl.dataset.external = external ? "true" : "false";
    this.anchorEl.dataset.disabled = disabled ? "true" : "false";
    this.anchorEl.href = disabled ? "#" : href;
    if (disabled) this.anchorEl.setAttribute("aria-disabled", "true");
    else this.anchorEl.removeAttribute("aria-disabled");
    if (external && !disabled) {
      this.anchorEl.target = "_blank";
      this.anchorEl.rel = "noopener noreferrer";
    } else {
      this.anchorEl.removeAttribute("target");
      this.anchorEl.removeAttribute("rel");
    }
    this.labelEl.textContent = label;
    this.iconEl.innerHTML = variant === "nav" ? LINK_ICONS.arrow : LINK_ICONS.external;
  }
};
defineCustomElement("gob-link", GobLinkElement);

// src/components/icon-button/icon-button-constants.ts
var ICON_BUTTON_VARIANTS = [
  "basic",
  "solid",
  "soft",
  "outline",
  "ghost",
  "danger",
  "success",
  "tonal",
  "square",
  "complete"
];
var ICON_BUTTON_OBSERVED_ATTRIBUTES = [
  "variant",
  "size",
  "icon",
  "label",
  "disabled",
  "loading"
];
var ICON_BUTTON_ICONS = {
  plus: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.25" stroke="currentColor" stroke-width="1.5"/><path d="M16.2 16.2 20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 16.5h11l-1.2-1.5V10a4.3 4.3 0 0 0-8.6 0v5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 8.5h13M9.5 8.5V6.8A1.3 1.3 0 0 1 10.8 5.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M8 8.5l.8 10a1.5 1.5 0 0 0 1.5 1.4h4.4a1.5 1.5 0 0 0 1.5-1.4l.8-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  more: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18" cy="12" r="1.3" fill="currentColor"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v10.5M12 15.5 8.5 12M12 15.5 15.5 12M5 18.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5h14l-5.5 6.2V18l-3 1.5v-6.8L5 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6.5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="6.5" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8.3 11.1 15.2 7.4M8.3 12.9l6.9 3.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
};
function resolveIconButtonIcon(name) {
  const key = (name || "plus").trim().toLowerCase();
  return ICON_BUTTON_ICONS[key] || ICON_BUTTON_ICONS.plus;
}
function resolveIconButtonVariant(value) {
  if (ICON_BUTTON_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveIconButtonSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}

// src/components/icon-button/icon-button-styles.ts
var iconButtonStyles = `
:host {
  display: inline-flex;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ib-vino: #9f2141;
  --gob-ib-vino-deep: #7a1832;
  --gob-ib-dorado: #bc945a;
  --gob-ib-title: #181511;
  --gob-ib-muted: #6f6a63;
  --gob-ib-border: rgba(24, 21, 17, 0.1);
  --gob-ib-fill: #f3f3f3;
  --gob-ib-bg: #ffffff;
  --gob-ib-size: 42px;
  --gob-ib-icon: 18px;
  --gob-ib-radius: 14px;
  --gob-ib-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.btn {
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--gob-ib-size);
  height: var(--gob-ib-size);
  padding: 0;
  border-radius: var(--gob-ib-radius);
  border: 1px solid transparent;
  background: var(--gob-ib-fill);
  color: var(--gob-ib-title);
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.03);
  transition:
    background 160ms var(--gob-ib-ease),
    color 160ms var(--gob-ib-ease),
    border-color 160ms var(--gob-ib-ease),
    box-shadow 160ms var(--gob-ib-ease),
    transform 140ms var(--gob-ib-ease);
}

.btn:hover:not(:disabled) {
  background: color-mix(in srgb, var(--gob-ib-vino) 8%, #fff);
  color: var(--gob-ib-vino-deep);
  border-color: color-mix(in srgb, var(--gob-ib-vino) 16%, transparent);
}

.btn:active:not(:disabled) {
  transform: scale(0.95);
}

.btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-ib-vino) 40%, transparent);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

.root[data-size='sm'] { --gob-ib-size: 34px; --gob-ib-icon: 15px; --gob-ib-radius: 11px; }
.root[data-size='lg'] { --gob-ib-size: 50px; --gob-ib-icon: 20px; --gob-ib-radius: 16px; }

.root[data-variant='basic'] .btn {
  background: var(--gob-ib-fill);
  color: var(--gob-ib-title);
  border-color: transparent;
  box-shadow: none;
}
.root[data-variant='solid'] .btn {
  background: var(--gob-ib-vino);
  color: #fff;
  border-color: var(--gob-ib-vino);
  box-shadow: none;
}
.root[data-variant='solid'] .btn:hover:not(:disabled) {
  background: var(--gob-ib-vino-deep);
  border-color: var(--gob-ib-vino-deep);
  color: #fff;
}
.root[data-variant='soft'] .btn {
  background: color-mix(in srgb, var(--gob-ib-vino) 9%, #fff);
  color: var(--gob-ib-vino-deep);
  border-color: color-mix(in srgb, var(--gob-ib-vino) 12%, transparent);
  box-shadow: none;
}
.root[data-variant='outline'] .btn {
  background: var(--gob-ib-bg);
  border-color: var(--gob-ib-border);
  color: var(--gob-ib-title);
}
.root[data-variant='outline'] .btn:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--gob-ib-vino) 40%, transparent);
  color: var(--gob-ib-vino);
}
.root[data-variant='ghost'] .btn {
  background: transparent;
  color: var(--gob-ib-muted);
  box-shadow: none;
}
.root[data-variant='ghost'] .btn:hover:not(:disabled) {
  background: rgba(24, 21, 17, 0.05);
  color: var(--gob-ib-title);
  border-color: transparent;
}
.root[data-variant='danger'] .btn {
  background: color-mix(in srgb, #c62828 8%, #fff);
  color: #c62828;
  border-color: color-mix(in srgb, #c62828 18%, transparent);
  box-shadow: none;
}
.root[data-variant='danger'] .btn:hover:not(:disabled) {
  background: #c62828;
  border-color: #c62828;
  color: #fff;
}
.root[data-variant='success'] .btn {
  background: color-mix(in srgb, #1f8a55 10%, #fff);
  color: #1f8a55;
  border-color: color-mix(in srgb, #1f8a55 18%, transparent);
  box-shadow: none;
}
.root[data-variant='success'] .btn:hover:not(:disabled) {
  background: #1f8a55;
  border-color: #1f8a55;
  color: #fff;
}
.root[data-variant='tonal'] .btn {
  background: color-mix(in srgb, var(--gob-ib-dorado) 16%, #fff);
  color: #3d3428;
  border-color: color-mix(in srgb, var(--gob-ib-dorado) 34%, transparent);
  box-shadow: none;
}
.root[data-variant='square'] .btn {
  border-radius: 10px;
  background: var(--gob-ib-bg);
  border-color: var(--gob-ib-border);
}
.root[data-variant='complete'] .btn {
  background: var(--gob-ib-bg);
  border: 1px solid var(--gob-ib-border);
  border-left: 3px solid var(--gob-ib-dorado);
  color: var(--gob-ib-vino-deep);
  box-shadow: none;
}

.icon {
  width: var(--gob-ib-icon);
  height: var(--gob-ib-icon);
  display: inline-flex;
}
.icon svg { width: var(--gob-ib-icon); height: var(--gob-ib-icon); display: block; }

.spinner {
  display: none;
  width: calc(var(--gob-ib-icon) - 2px);
  height: calc(var(--gob-ib-icon) - 2px);
  border-radius: 999px;
  border: 2px solid color-mix(in srgb, currentColor 25%, transparent);
  border-top-color: currentColor;
  animation: gob-ib-spin 700ms linear infinite;
}

.root[data-loading='true'] .icon { display: none; }
.root[data-loading='true'] .spinner { display: block; }

@keyframes gob-ib-spin {
  to { transform: rotate(360deg); }
}
`;

// src/components/icon-button/gob-icon-button.element.ts
var GobIconButtonElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "btnEl");
    __publicField(this, "iconEl");
    __publicField(this, "spinnerEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = iconButtonStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.btnEl = document.createElement("button");
    this.btnEl.type = "button";
    this.btnEl.className = "btn";
    this.btnEl.setAttribute("part", "button");
    this.iconEl = document.createElement("span");
    this.iconEl.className = "icon";
    this.iconEl.setAttribute("aria-hidden", "true");
    this.spinnerEl = document.createElement("span");
    this.spinnerEl.className = "spinner";
    this.spinnerEl.setAttribute("aria-hidden", "true");
    this.btnEl.append(this.iconEl, this.spinnerEl);
    this.rootEl.appendChild(this.btnEl);
    shadow.append(style, this.rootEl);
    this.btnEl.addEventListener("click", () => {
      if (this.hasAttribute("disabled") || this.hasAttribute("loading")) return;
      this.dispatchEvent(
        new CustomEvent("gob-icon-button", {
          detail: { icon: this.getAttribute("icon") || "plus" },
          bubbles: true,
          composed: true
        })
      );
    });
  }
  static get observedAttributes() {
    return [...ICON_BUTTON_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveIconButtonVariant(this.getAttribute("variant"));
    const size = resolveIconButtonSize(this.getAttribute("size"));
    const icon = this.getAttribute("icon");
    const label = this.getAttribute("label")?.trim() || this.getAttribute("aria-label")?.trim() || "Accion";
    const disabled = this.hasAttribute("disabled");
    const loading = this.hasAttribute("loading");
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.loading = loading ? "true" : "false";
    this.btnEl.disabled = disabled || loading;
    this.btnEl.setAttribute("aria-label", label);
    if (loading) this.btnEl.setAttribute("aria-busy", "true");
    else this.btnEl.removeAttribute("aria-busy");
    this.iconEl.innerHTML = resolveIconButtonIcon(icon);
  }
};
defineCustomElement("gob-icon-button", GobIconButtonElement);

// src/components/button-group/button-group-constants.ts
var BUTTON_GROUP_VARIANTS = [
  "basic",
  "solid",
  "outline",
  "soft",
  "ghost",
  "split",
  "vertical",
  "dense",
  "bordered",
  "complete"
];
var BUTTON_GROUP_OBSERVED_ATTRIBUTES = [
  "variant",
  "size",
  "items",
  "disabled"
];
var BUTTON_GROUP_ICONS = {
  plus: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 8.5h13M9.5 8.5V6.8A1.3 1.3 0 0 1 10.8 5.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M8 8.5l.8 10a1.5 1.5 0 0 0 1.5 1.4h4.4a1.5 1.5 0 0 0 1.5-1.4l.8-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v10.5M12 15.5 8.5 12M12 15.5 15.5 12M5 18.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6.5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="6.5" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8.3 11.1 15.2 7.4M8.3 12.9l6.9 3.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5h14l-5.5 6.2V18l-3 1.5v-6.8L5 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  print: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 9V5.5h10V9M7 15.5h10V19H7v-3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><rect x="4.5" y="9" width="15" height="6.5" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
function resolveButtonGroupIcon(name) {
  if (!name) return null;
  return BUTTON_GROUP_ICONS[name.trim().toLowerCase()] || null;
}
function resolveButtonGroupVariant(value) {
  if (BUTTON_GROUP_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveButtonGroupSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}
function parseButtonGroupItems(raw) {
  if (!raw?.trim()) {
    return [
      { id: "guardar", label: "Guardar", icon: "check" },
      { id: "editar", label: "Editar", icon: "edit" },
      { id: "eliminar", label: "Eliminar", icon: "trash" }
    ];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const row = item;
      const id = typeof row.id === "string" && row.id.trim() ? row.id.trim() : `btn-${index + 1}`;
      const label = typeof row.label === "string" && row.label.trim() ? row.label.trim() : id;
      return {
        id,
        label,
        icon: typeof row.icon === "string" ? row.icon : void 0,
        disabled: Boolean(row.disabled)
      };
    }).filter((item) => Boolean(item));
  } catch {
    return [];
  }
}

// src/components/button-group/button-group-styles.ts
var buttonGroupStyles = `
:host {
  display: inline-block;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-bg-vino: #9f2141;
  --gob-bg-vino-deep: #7a1832;
  --gob-bg-dorado: #bc945a;
  --gob-bg-title: #181511;
  --gob-bg-muted: #6f6a63;
  --gob-bg-border: rgba(24, 21, 17, 0.1);
  --gob-bg-fill: #f3f3f3;
  --gob-bg-bg: #ffffff;
  --gob-bg-height: 42px;
  --gob-bg-radius: 14px;
  --gob-bg-pad-x: 15px;
  --gob-bg-font: 13.5px;
  --gob-bg-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: inline-flex;
  max-width: 100%;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-bg-height: 34px;
  --gob-bg-radius: 11px;
  --gob-bg-pad-x: 11px;
  --gob-bg-font: 12px;
}
.root[data-size='lg'] {
  --gob-bg-height: 50px;
  --gob-bg-radius: 16px;
  --gob-bg-pad-x: 18px;
  --gob-bg-font: 15px;
}
.root[data-variant='dense'] {
  --gob-bg-height: 36px;
  --gob-bg-pad-x: 11px;
  --gob-bg-font: 12.5px;
  --gob-bg-radius: 12px;
}

.list {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 0;
}

.root[data-variant='basic'] .list,
.root[data-variant='dense'] .list {
  gap: 4px;
  padding: 4px;
  border-radius: calc(var(--gob-bg-radius) + 4px);
  background: var(--gob-bg-fill);
}

.root[data-variant='vertical'] .list {
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  min-width: 180px;
}

.root[data-variant='split'] .list,
.root[data-variant='bordered'] .list,
.root[data-variant='complete'] .list {
  gap: 0;
  overflow: hidden;
  border-radius: var(--gob-bg-radius);
  border: 1px solid var(--gob-bg-border);
  background: var(--gob-bg-bg);
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.03);
}

.root[data-variant='complete'] .list {
  border-left: 3px solid var(--gob-bg-dorado);
}

.item {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: var(--gob-bg-height);
  padding: 0 var(--gob-bg-pad-x);
  border-radius: var(--gob-bg-radius);
  border: 1px solid transparent;
  background: var(--gob-bg-bg);
  color: var(--gob-bg-title);
  font: inherit;
  font-size: var(--gob-bg-font);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 160ms var(--gob-bg-ease),
    color 160ms var(--gob-bg-ease),
    border-color 160ms var(--gob-bg-ease),
    box-shadow 160ms var(--gob-bg-ease),
    transform 140ms var(--gob-bg-ease);
}

.item:hover:not(:disabled) {
  color: var(--gob-bg-vino-deep);
  border-color: color-mix(in srgb, var(--gob-bg-vino) 18%, transparent);
  background: color-mix(in srgb, var(--gob-bg-vino) 6%, #fff);
}

.item:active:not(:disabled) {
  transform: scale(0.98);
}

.item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-bg-vino) 40%, transparent);
  outline-offset: 2px;
  z-index: 1;
}

.item:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.root[data-variant='basic'] .item,
.root[data-variant='dense'] .item {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}
.root[data-variant='basic'] .item:hover:not(:disabled),
.root[data-variant='dense'] .item:hover:not(:disabled) {
  background: var(--gob-bg-bg);
  border-color: transparent;
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.06);
}

.root[data-variant='solid'] .item {
  background: var(--gob-bg-vino);
  color: #fff;
  border-color: var(--gob-bg-vino);
}
.root[data-variant='solid'] .item:hover:not(:disabled) {
  background: var(--gob-bg-vino-deep);
  border-color: var(--gob-bg-vino-deep);
  color: #fff;
}

.root[data-variant='outline'] .item {
  background: var(--gob-bg-bg);
  border-color: var(--gob-bg-border);
}
.root[data-variant='outline'] .item:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--gob-bg-vino) 40%, transparent);
  color: var(--gob-bg-vino);
  background: #fff;
}

.root[data-variant='soft'] .item {
  background: color-mix(in srgb, var(--gob-bg-vino) 9%, #fff);
  color: var(--gob-bg-vino-deep);
  border-color: transparent;
}
.root[data-variant='soft'] .item:hover:not(:disabled) {
  background: color-mix(in srgb, var(--gob-bg-vino) 15%, #fff);
  border-color: transparent;
}

.root[data-variant='ghost'] .item {
  background: transparent;
  color: var(--gob-bg-muted);
}
.root[data-variant='ghost'] .item:hover:not(:disabled) {
  background: rgba(24, 21, 17, 0.05);
  color: var(--gob-bg-title);
  border-color: transparent;
}

.root[data-variant='split'] .item,
.root[data-variant='bordered'] .item,
.root[data-variant='complete'] .item {
  border-radius: 0;
  border: 0;
  border-right: 1px solid var(--gob-bg-border);
  background: transparent;
  box-shadow: none;
}
.root[data-variant='split'] .item:hover:not(:disabled),
.root[data-variant='bordered'] .item:hover:not(:disabled),
.root[data-variant='complete'] .item:hover:not(:disabled) {
  background: #f3f3f3;
  border-right-color: var(--gob-bg-border);
  color: var(--gob-bg-vino-deep);
}
.root[data-variant='split'] .item:last-child,
.root[data-variant='bordered'] .item:last-child,
.root[data-variant='complete'] .item:last-child {
  border-right: 0;
}

.root[data-variant='vertical'] .item {
  width: 100%;
  justify-content: flex-start;
}

.root[data-disabled='true'] .item {
  opacity: 0.4;
  pointer-events: none;
}

.icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  flex: 0 0 auto;
  color: currentColor;
  opacity: 0.92;
}
.icon svg { width: 18px; height: 18px; display: block; }
`;

// src/components/button-group/gob-button-group.element.ts
var GobButtonGroupElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "listEl");
    __publicField(this, "items", []);
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = buttonGroupStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("role", "group");
    this.listEl = document.createElement("div");
    this.listEl.className = "list";
    this.listEl.setAttribute("part", "list");
    this.rootEl.appendChild(this.listEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...BUTTON_GROUP_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveButtonGroupVariant(this.getAttribute("variant"));
    const size = resolveButtonGroupSize(this.getAttribute("size"));
    const disabled = this.hasAttribute("disabled");
    this.items = parseButtonGroupItems(this.getAttribute("items"));
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.render();
  }
  render() {
    this.listEl.replaceChildren();
    this.items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "item";
      btn.disabled = Boolean(item.disabled) || this.hasAttribute("disabled");
      const iconSvg = resolveButtonGroupIcon(item.icon);
      if (iconSvg) {
        const icon = document.createElement("span");
        icon.className = "icon";
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = iconSvg;
        btn.appendChild(icon);
      }
      btn.append(document.createTextNode(item.label));
      btn.addEventListener("click", () => this.emit(item));
      this.listEl.appendChild(btn);
    });
  }
  emit(item) {
    if (item.disabled || this.hasAttribute("disabled")) return;
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent("gob-button-group", {
        detail: { value: item.id, item },
        bubbles: true,
        composed: true
      })
    );
  }
};
defineCustomElement("gob-button-group", GobButtonGroupElement);

// src/components/dropdown-menu/dropdown-menu-constants.ts
var DROPDOWN_MENU_VARIANTS = [
  "basic",
  "solid",
  "soft",
  "outline",
  "ghost",
  "dense",
  "icons",
  "danger",
  "bordered",
  "complete"
];
var DROPDOWN_MENU_OBSERVED_ATTRIBUTES = [
  "variant",
  "size",
  "label",
  "items",
  "disabled",
  "open"
];
var DROPDOWN_ICONS = {
  edit: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M5 19l1.2-4.5L15.8 4.9a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L9.5 17.8 5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 8.5h13M9.5 8.5V6.8A1.3 1.3 0 0 1 10.8 5.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M8 8.5l.8 10a1.5 1.5 0 0 0 1.5 1.4h4.4a1.5 1.5 0 0 0 1.5-1.4l.8-10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v10.5M12 15.5 8.5 12M12 15.5 15.5 12M5 18.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6.5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="6.5" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8.3 11.1 15.2 7.4M8.3 12.9l6.9 3.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 15.5H5.5A2 2 0 0 1 3.5 13.5v-8A2 2 0 0 1 5.5 3.5h8a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.5 12s3.2-6 8.5-6 8.5 6 8.5 6-3.2 6-8.5 6-8.5-6-8.5-6Z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M12 4.5v2.2M12 17.3v2.2M4.5 12h2.2M17.3 12h2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  more: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18" cy="12" r="1.3" fill="currentColor"/></svg>`
};
var CARET_SVG2 = `<svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function resolveDropdownIcon(name) {
  if (!name) return null;
  return DROPDOWN_ICONS[name.trim().toLowerCase()] || null;
}
function resolveDropdownMenuVariant(value) {
  if (DROPDOWN_MENU_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveDropdownMenuSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}
function parseDropdownMenuItems(raw) {
  if (!raw?.trim()) {
    return [
      { id: "ver", label: "Ver detalle", icon: "eye" },
      { id: "editar", label: "Editar", icon: "edit" },
      { id: "copiar", label: "Duplicar", icon: "copy" },
      { id: "div", label: "", divider: true },
      { id: "eliminar", label: "Eliminar", icon: "trash", danger: true }
    ];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const row = item;
      if (row.divider) {
        return {
          id: typeof row.id === "string" ? row.id : `div-${index}`,
          label: "",
          divider: true
        };
      }
      const id = typeof row.id === "string" && row.id.trim() ? row.id.trim() : `item-${index + 1}`;
      const label = typeof row.label === "string" && row.label.trim() ? row.label.trim() : id;
      return {
        id,
        label,
        icon: typeof row.icon === "string" ? row.icon : void 0,
        danger: Boolean(row.danger),
        disabled: Boolean(row.disabled)
      };
    }).filter((item) => Boolean(item));
  } catch {
    return [];
  }
}

// src/components/dropdown-menu/dropdown-menu-styles.ts
var dropdownMenuStyles = `
:host {
  display: inline-block;
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-dd-vino: #9f2141;
  --gob-dd-vino-deep: #7a1832;
  --gob-dd-dorado: #bc945a;
  --gob-dd-title: #181511;
  --gob-dd-muted: #6f6a63;
  --gob-dd-border: rgba(24, 21, 17, 0.1);
  --gob-dd-fill: #f3f3f3;
  --gob-dd-bg: #ffffff;
  --gob-dd-height: 42px;
  --gob-dd-radius: 14px;
  --gob-dd-font: 13.5px;
  --gob-dd-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
}

.root[data-size='sm'] { --gob-dd-height: 34px; --gob-dd-radius: 11px; --gob-dd-font: 12px; }
.root[data-size='lg'] { --gob-dd-height: 50px; --gob-dd-radius: 16px; --gob-dd-font: 15px; }
.root[data-variant='dense'] { --gob-dd-height: 36px; --gob-dd-font: 12.5px; --gob-dd-radius: 12px; }

.trigger {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: var(--gob-dd-height);
  padding: 0 16px;
  border-radius: var(--gob-dd-radius);
  border: 1px solid var(--gob-dd-border);
  background: var(--gob-dd-bg);
  color: var(--gob-dd-title);
  font: inherit;
  font-size: var(--gob-dd-font);
  font-weight: 700;
  letter-spacing: -0.02em;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.03);
  transition:
    background 160ms var(--gob-dd-ease),
    color 160ms var(--gob-dd-ease),
    border-color 160ms var(--gob-dd-ease),
    box-shadow 160ms var(--gob-dd-ease);
}

.trigger:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--gob-dd-vino) 24%, var(--gob-dd-border));
  color: var(--gob-dd-vino-deep);
  background: color-mix(in srgb, var(--gob-dd-vino) 4%, #fff);
}

.trigger:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-dd-vino) 40%, transparent);
  outline-offset: 2px;
}

.root[data-open='true'] .trigger {
  border-color: color-mix(in srgb, var(--gob-dd-vino) 40%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gob-dd-vino) 12%, transparent);
  color: var(--gob-dd-vino-deep);
}

.trigger:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.root[data-variant='basic'] .trigger,
.root[data-variant='dense'] .trigger {
  background: var(--gob-dd-fill);
  border-color: transparent;
  box-shadow: none;
}

.root[data-variant='solid'] .trigger {
  background: var(--gob-dd-vino);
  border-color: var(--gob-dd-vino);
  color: #fff;
  box-shadow: none;
}
.root[data-variant='solid'] .trigger:hover:not(:disabled) {
  background: var(--gob-dd-vino-deep);
  border-color: var(--gob-dd-vino-deep);
  color: #fff;
}
.root[data-variant='solid'][data-open='true'] .trigger {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gob-dd-vino) 22%, transparent);
}

.root[data-variant='soft'] .trigger {
  background: color-mix(in srgb, var(--gob-dd-vino) 9%, #fff);
  border-color: color-mix(in srgb, var(--gob-dd-vino) 14%, transparent);
  color: var(--gob-dd-vino-deep);
  box-shadow: none;
}

.root[data-variant='outline'] .trigger,
.root[data-variant='bordered'] .trigger,
.root[data-variant='icons'] .trigger {
  background: var(--gob-dd-bg);
  border-color: var(--gob-dd-border);
}

.root[data-variant='ghost'] .trigger {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  color: var(--gob-dd-muted);
}
.root[data-variant='ghost'] .trigger:hover:not(:disabled) {
  background: rgba(24, 21, 17, 0.05);
  color: var(--gob-dd-title);
}

.root[data-variant='danger'] .trigger {
  background: color-mix(in srgb, #c62828 8%, #fff);
  border-color: color-mix(in srgb, #c62828 22%, transparent);
  color: #c62828;
  box-shadow: none;
}

.root[data-variant='complete'] .trigger {
  background: var(--gob-dd-bg);
  border: 1px solid var(--gob-dd-border);
  border-left: 3px solid var(--gob-dd-dorado);
  color: var(--gob-dd-vino-deep);
}

.caret {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #f3f3f3;
  color: currentColor;
  transition: transform 180ms var(--gob-dd-ease), background 160ms var(--gob-dd-ease);
}
.caret svg { width: 11px; height: 11px; display: block; }
.root[data-open='true'] .caret { transform: rotate(180deg); }
.root[data-variant='solid'] .caret {
  background: rgba(255, 255, 255, 0.16);
}
.root[data-variant='ghost'] .caret,
.root[data-variant='basic'] .caret,
.root[data-variant='dense'] .caret {
  background: rgba(24, 21, 17, 0.06);
}

.menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 30;
  min-width: 220px;
  max-width: min(300px, 92vw);
  padding: 8px;
  border-radius: 16px;
  border: 1px solid var(--gob-dd-border);
  background: var(--gob-dd-bg);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 18px 40px rgba(24, 21, 17, 0.12);
  display: none;
  transform-origin: top left;
  animation: gob-dd-in 160ms var(--gob-dd-ease);
}

.root[data-open='true'] .menu { display: grid; gap: 2px; }

.root[data-variant='complete'] .menu {
  border-left: 3px solid var(--gob-dd-dorado);
}

.item {
  appearance: none;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 40px;
  padding: 0 10px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: var(--gob-dd-title);
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.015em;
  text-align: left;
  cursor: pointer;
  transition: background 140ms var(--gob-dd-ease), color 140ms var(--gob-dd-ease), transform 140ms var(--gob-dd-ease);
}

.item:hover:not(:disabled) {
  background: #f3f3f3;
  color: var(--gob-dd-vino-deep);
}

.item:active:not(:disabled) {
  transform: scale(0.985);
}

.item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-dd-vino) 40%, transparent);
  outline-offset: 1px;
}

.item:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.item[data-danger='true'] { color: #c62828; }
.item[data-danger='true']:hover:not(:disabled) {
  background: color-mix(in srgb, #c62828 9%, #fff);
  color: #c62828;
}
.item[data-danger='true'] .icon {
  background: color-mix(in srgb, #c62828 10%, #fff);
  color: #c62828;
}

.divider {
  height: 1px;
  margin: 5px 8px;
  background: var(--gob-dd-border);
}

.icon {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border-radius: 9px;
  background: #f3f3f3;
  color: var(--gob-dd-vino-deep);
}
.item:hover:not(:disabled) .icon {
  background: color-mix(in srgb, var(--gob-dd-vino) 10%, #fff);
}
.icon svg { width: 15px; height: 15px; display: block; }

.label { min-width: 0; }

@keyframes gob-dd-in {
  from { opacity: 0; transform: translateY(-4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
`;

// src/components/dropdown-menu/gob-dropdown-menu.element.ts
var GobDropdownMenuElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "triggerEl");
    __publicField(this, "labelEl");
    __publicField(this, "caretEl");
    __publicField(this, "menuEl");
    __publicField(this, "items", []);
    __publicField(this, "open", false);
    __publicField(this, "onDocClick", (event) => {
      if (!this.open) return;
      const path = event.composedPath();
      if (!path.includes(this)) this.setOpen(false);
    });
    __publicField(this, "onKeyDown", (event) => {
      if (event.key === "Escape" && this.open) this.setOpen(false);
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = dropdownMenuStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.triggerEl = document.createElement("button");
    this.triggerEl.type = "button";
    this.triggerEl.className = "trigger";
    this.triggerEl.setAttribute("part", "trigger");
    this.triggerEl.setAttribute("aria-haspopup", "menu");
    this.labelEl = document.createElement("span");
    this.labelEl.className = "label";
    this.caretEl = document.createElement("span");
    this.caretEl.className = "caret";
    this.caretEl.setAttribute("aria-hidden", "true");
    this.caretEl.innerHTML = CARET_SVG2;
    this.triggerEl.append(this.labelEl, this.caretEl);
    this.menuEl = document.createElement("div");
    this.menuEl.className = "menu";
    this.menuEl.setAttribute("part", "menu");
    this.menuEl.setAttribute("role", "menu");
    this.rootEl.append(this.triggerEl, this.menuEl);
    shadow.append(style, this.rootEl);
    this.triggerEl.addEventListener("click", (event) => {
      event.stopPropagation();
      if (this.hasAttribute("disabled")) return;
      this.setOpen(!this.open);
    });
  }
  static get observedAttributes() {
    return [...DROPDOWN_MENU_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    document.addEventListener("click", this.onDocClick);
    document.addEventListener("keydown", this.onKeyDown);
    this.syncFromAttributes();
  }
  disconnectedCallback() {
    document.removeEventListener("click", this.onDocClick);
    document.removeEventListener("keydown", this.onKeyDown);
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  setOpen(next) {
    this.open = next;
    if (next) this.setAttribute("open", "");
    else this.removeAttribute("open");
    this.triggerEl.setAttribute("aria-expanded", next ? "true" : "false");
    this.rootEl.dataset.open = next ? "true" : "false";
  }
  syncFromAttributes() {
    const variant = resolveDropdownMenuVariant(this.getAttribute("variant"));
    const size = resolveDropdownMenuSize(this.getAttribute("size"));
    const disabled = this.hasAttribute("disabled");
    const label = this.getAttribute("label")?.trim() || this.textContent?.trim() || "Acciones";
    this.items = parseDropdownMenuItems(this.getAttribute("items"));
    this.open = this.hasAttribute("open");
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.open = this.open ? "true" : "false";
    this.triggerEl.disabled = disabled;
    this.triggerEl.setAttribute("aria-expanded", this.open ? "true" : "false");
    this.labelEl.textContent = label;
    this.renderMenu();
  }
  renderMenu() {
    const forceIcons = this.rootEl.dataset.variant === "icons" || this.rootEl.dataset.variant === "complete";
    this.menuEl.replaceChildren();
    this.items.forEach((item) => {
      if (item.divider) {
        const divider = document.createElement("div");
        divider.className = "divider";
        divider.setAttribute("role", "separator");
        this.menuEl.appendChild(divider);
        return;
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "item";
      btn.setAttribute("role", "menuitem");
      btn.disabled = Boolean(item.disabled) || this.hasAttribute("disabled");
      if (item.danger) btn.dataset.danger = "true";
      const iconSvg = resolveDropdownIcon(item.icon);
      if (iconSvg || forceIcons) {
        const icon = document.createElement("span");
        icon.className = "icon";
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = iconSvg || resolveDropdownIcon("more") || "";
        btn.appendChild(icon);
      }
      const text = document.createElement("span");
      text.className = "label";
      text.textContent = item.label;
      btn.appendChild(text);
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        this.selectItem(item);
      });
      this.menuEl.appendChild(btn);
    });
  }
  selectItem(item) {
    if (item.disabled || item.divider || this.hasAttribute("disabled")) return;
    this.setOpen(false);
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent("gob-dropdown-menu", {
        detail: { value: item.id, item },
        bubbles: true,
        composed: true
      })
    );
  }
};
defineCustomElement("gob-dropdown-menu", GobDropdownMenuElement);

// src/components/alert/alert-constants.ts
var ALERT_VARIANTS = [
  "basic",
  "soft",
  "outline",
  "solid",
  "banner",
  "dense",
  "inline",
  "bordered",
  "dismissible",
  "complete"
];
var ALERT_TONES = ["info", "success", "warning", "danger", "neutral"];
var ALERT_OBSERVED_ATTRIBUTES = [
  "variant",
  "tone",
  "title",
  "description",
  "action",
  "dismissible",
  "hidden"
];
var ALERT_ICONS = {
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v5M12 15.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  neutral: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12h7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`
};
function resolveAlertVariant(value) {
  if (ALERT_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveAlertTone(value) {
  if (ALERT_TONES.includes(value ?? "")) {
    return value;
  }
  return "info";
}

// src/components/alert/alert-styles.ts
var alertStyles = `
:host {
  display: block;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-al-vino: #9f2141;
  --gob-al-dorado: #bc945a;
  --gob-al-title: #181511;
  --gob-al-muted: #6f6a63;
  --gob-al-border: rgba(24, 21, 17, 0.1);
  --gob-al-bg: #ffffff;
  --gob-al-fill: #f3f3f3;
  --gob-al-accent: #2f6fed;
  --gob-al-accent-soft: color-mix(in srgb, #2f6fed 10%, #fff);
  --gob-al-radius: 16px;
  --gob-al-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px 14px;
  align-items: start;
  width: 100%;
  padding: 14px 16px;
  border-radius: var(--gob-al-radius);
  border: 1px solid color-mix(in srgb, var(--gob-al-accent) 18%, transparent);
  background: var(--gob-al-accent-soft);
  color: var(--gob-al-title);
}

.root[data-tone='info'] {
  --gob-al-accent: #2f6fed;
  --gob-al-accent-soft: color-mix(in srgb, #2f6fed 10%, #fff);
}
.root[data-tone='success'] {
  --gob-al-accent: #1f8a55;
  --gob-al-accent-soft: color-mix(in srgb, #1f8a55 10%, #fff);
}
.root[data-tone='warning'] {
  --gob-al-accent: #b87712;
  --gob-al-accent-soft: color-mix(in srgb, #b87712 11%, #fff);
}
.root[data-tone='danger'] {
  --gob-al-accent: #c62828;
  --gob-al-accent-soft: color-mix(in srgb, #c62828 10%, #fff);
}
.root[data-tone='neutral'] {
  --gob-al-accent: #6f6a63;
  --gob-al-accent-soft: #f3f3f3;
}

.icon {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: color-mix(in srgb, var(--gob-al-accent) 12%, #fff);
  color: var(--gob-al-accent);
  flex: 0 0 auto;
}
.icon svg { width: 18px; height: 18px; display: block; }

.body {
  display: grid;
  gap: 4px;
  min-width: 0;
  padding-top: 2px;
}

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--gob-al-title);
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-al-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}

.action,
.dismiss {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  border-radius: 10px;
  border: 0;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition: background 140ms var(--gob-al-ease), color 140ms var(--gob-al-ease);
}

.action {
  padding: 0 12px;
  background: color-mix(in srgb, var(--gob-al-accent) 12%, #fff);
  color: var(--gob-al-accent);
}
.action:hover { background: color-mix(in srgb, var(--gob-al-accent) 18%, #fff); }

.dismiss {
  width: 32px;
  padding: 0;
  background: transparent;
  color: var(--gob-al-muted);
}
.dismiss:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-al-title);
}
.dismiss svg { width: 14px; height: 14px; display: block; }

.root[data-variant='outline'] {
  background: var(--gob-al-bg);
  border-color: color-mix(in srgb, var(--gob-al-accent) 28%, transparent);
}
.root[data-variant='solid'] {
  background: var(--gob-al-accent);
  border-color: var(--gob-al-accent);
  color: #fff;
}
.root[data-variant='solid'] .title,
.root[data-variant='solid'] .description { color: #fff; }
.root[data-variant='solid'] .description { opacity: 0.88; }
.root[data-variant='solid'] .icon {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}
.root[data-variant='solid'] .action {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.root[data-variant='solid'] .dismiss { color: rgba(255, 255, 255, 0.85); }
.root[data-variant='solid'] .dismiss:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}

.root[data-variant='banner'],
.root[data-variant='complete'] {
  border-radius: 14px;
  border-left: 3px solid var(--gob-al-accent);
  background: var(--gob-al-bg);
  border-color: var(--gob-al-border);
  border-left-color: var(--gob-al-accent);
}
.root[data-variant='complete'] {
  border-left-color: var(--gob-al-dorado);
}

.root[data-variant='dense'] {
  padding: 10px 12px;
  border-radius: 12px;
  gap: 10px;
}
.root[data-variant='dense'] .icon { width: 28px; height: 28px; border-radius: 9px; }
.root[data-variant='dense'] .icon svg { width: 15px; height: 15px; }

.root[data-variant='inline'] {
  display: inline-grid;
  width: auto;
  max-width: 100%;
  padding: 8px 12px;
  border-radius: 999px;
  align-items: center;
}
.root[data-variant='inline'] .icon {
  width: 22px;
  height: 22px;
  border-radius: 999px;
}
.root[data-variant='inline'] .icon svg { width: 13px; height: 13px; }
.root[data-variant='inline'] .description,
.root[data-variant='inline'] .actions { display: none; }

.root[data-variant='bordered'] {
  background: var(--gob-al-bg);
  border: 1.5px solid color-mix(in srgb, var(--gob-al-accent) 30%, transparent);
}

.root[data-variant='soft'],
.root[data-variant='basic'],
.root[data-variant='dismissible'] {
  background: var(--gob-al-accent-soft);
}
`;

// src/components/alert/gob-alert.element.ts
var CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;
var GobAlertElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "iconEl");
    __publicField(this, "bodyEl");
    __publicField(this, "titleEl");
    __publicField(this, "descEl");
    __publicField(this, "actionsEl");
    __publicField(this, "actionBtn");
    __publicField(this, "dismissBtn");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = alertStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("role", "alert");
    this.iconEl = document.createElement("span");
    this.iconEl.className = "icon";
    this.iconEl.setAttribute("aria-hidden", "true");
    this.bodyEl = document.createElement("div");
    this.bodyEl.className = "body";
    this.titleEl = document.createElement("p");
    this.titleEl.className = "title";
    this.descEl = document.createElement("p");
    this.descEl.className = "description";
    this.bodyEl.append(this.titleEl, this.descEl);
    this.actionsEl = document.createElement("div");
    this.actionsEl.className = "actions";
    this.actionBtn = document.createElement("button");
    this.actionBtn.type = "button";
    this.actionBtn.className = "action";
    this.dismissBtn = document.createElement("button");
    this.dismissBtn.type = "button";
    this.dismissBtn.className = "dismiss";
    this.dismissBtn.setAttribute("aria-label", "Cerrar");
    this.dismissBtn.innerHTML = CLOSE_SVG;
    this.actionsEl.append(this.actionBtn, this.dismissBtn);
    this.rootEl.append(this.iconEl, this.bodyEl, this.actionsEl);
    shadow.append(style, this.rootEl);
    this.actionBtn.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("gob-alert", {
          detail: { action: "action" },
          bubbles: true,
          composed: true
        })
      );
    });
    this.dismissBtn.addEventListener("click", () => {
      this.setAttribute("hidden", "");
      this.dispatchEvent(
        new CustomEvent("gob-alert", {
          detail: { action: "dismiss" },
          bubbles: true,
          composed: true
        })
      );
    });
  }
  static get observedAttributes() {
    return [...ALERT_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveAlertVariant(this.getAttribute("variant"));
    const tone = resolveAlertTone(this.getAttribute("tone"));
    const title = this.getAttribute("title")?.trim() || "Aviso importante";
    const description = this.getAttribute("description")?.trim() || "Revisa la informacion antes de continuar.";
    const action = this.getAttribute("action")?.trim() || "";
    const dismissible = this.hasAttribute("dismissible") || variant === "dismissible";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.hidden = this.hasAttribute("hidden");
    this.iconEl.innerHTML = ALERT_ICONS[tone];
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.descEl.hidden = !description;
    if (action) {
      this.actionBtn.hidden = false;
      this.actionBtn.textContent = action;
    } else {
      this.actionBtn.hidden = true;
    }
    this.dismissBtn.hidden = !dismissible;
    this.actionsEl.hidden = this.actionBtn.hidden && this.dismissBtn.hidden;
  }
};
defineCustomElement("gob-alert", GobAlertElement);

// src/components/toast/toast-constants.ts
var TOAST_VARIANTS = [
  "basic",
  "soft",
  "solid",
  "outline",
  "dense",
  "action",
  "progress",
  "stacked",
  "compact",
  "complete"
];
var TOAST_TONES = ["info", "success", "warning", "danger", "neutral"];
var TOAST_OBSERVED_ATTRIBUTES = [
  "variant",
  "tone",
  "title",
  "description",
  "action",
  "dismissible",
  "duration",
  "open"
];
var TOAST_ICONS = {
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v5M12 15.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  neutral: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12h7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`
};
function resolveToastVariant(value) {
  if (TOAST_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveToastTone(value) {
  if (TOAST_TONES.includes(value ?? "")) {
    return value;
  }
  return "info";
}

// src/components/toast/toast-styles.ts
var toastStyles = `
:host {
  display: inline-block;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ts-vino: #9f2141;
  --gob-ts-dorado: #bc945a;
  --gob-ts-title: #181511;
  --gob-ts-muted: #6f6a63;
  --gob-ts-border: rgba(24, 21, 17, 0.1);
  --gob-ts-bg: #ffffff;
  --gob-ts-fill: #f3f3f3;
  --gob-ts-accent: #2f6fed;
  --gob-ts-radius: 16px;
  --gob-ts-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  width: min(360px, 100%);
  padding: 14px 14px 14px 14px;
  border-radius: var(--gob-ts-radius);
  border: 1px solid var(--gob-ts-border);
  background: var(--gob-ts-bg);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 16px 36px rgba(24, 21, 17, 0.12);
  color: var(--gob-ts-title);
  overflow: hidden;
  animation: gob-ts-in 180ms var(--gob-ts-ease);
}

.root[data-tone='info'] { --gob-ts-accent: #2f6fed; }
.root[data-tone='success'] { --gob-ts-accent: #1f8a55; }
.root[data-tone='warning'] { --gob-ts-accent: #b87712; }
.root[data-tone='danger'] { --gob-ts-accent: #c62828; }
.root[data-tone='neutral'] { --gob-ts-accent: #6f6a63; }

.icon {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: color-mix(in srgb, var(--gob-ts-accent) 12%, #fff);
  color: var(--gob-ts-accent);
  flex: 0 0 auto;
}
.icon svg { width: 17px; height: 17px; display: block; }

.body {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 13.5px;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.description {
  margin: 0;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--gob-ts-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.action,
.dismiss {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  border: 0;
  border-radius: 9px;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 140ms var(--gob-ts-ease), color 140ms var(--gob-ts-ease);
}

.action {
  padding: 0 10px;
  background: color-mix(in srgb, var(--gob-ts-accent) 12%, #fff);
  color: var(--gob-ts-accent);
}
.action:hover { background: color-mix(in srgb, var(--gob-ts-accent) 18%, #fff); }

.dismiss {
  width: 30px;
  padding: 0;
  background: transparent;
  color: var(--gob-ts-muted);
}
.dismiss:hover {
  background: #f3f3f3;
  color: var(--gob-ts-title);
}
.dismiss svg { width: 13px; height: 13px; display: block; }

.progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: color-mix(in srgb, var(--gob-ts-accent) 14%, transparent);
  display: none;
  overflow: hidden;
}
.progress > i {
  display: block;
  height: 100%;
  width: 100%;
  background: var(--gob-ts-accent);
  transform-origin: left center;
  animation: gob-ts-bar linear forwards;
}

.root[data-variant='progress'] .progress,
.root[data-variant='complete'] .progress { display: block; }

.root[data-variant='soft'] {
  background: color-mix(in srgb, var(--gob-ts-accent) 8%, #fff);
  border-color: color-mix(in srgb, var(--gob-ts-accent) 16%, transparent);
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.08);
}

.root[data-variant='solid'] {
  background: var(--gob-ts-accent);
  border-color: var(--gob-ts-accent);
  color: #fff;
}
.root[data-variant='solid'] .description { color: rgba(255,255,255,0.88); }
.root[data-variant='solid'] .icon {
  background: rgba(255,255,255,0.16);
  color: #fff;
}
.root[data-variant='solid'] .action {
  background: rgba(255,255,255,0.18);
  color: #fff;
}
.root[data-variant='solid'] .dismiss { color: rgba(255,255,255,0.85); }
.root[data-variant='solid'] .dismiss:hover {
  background: rgba(255,255,255,0.14);
  color: #fff;
}
.root[data-variant='solid'] .progress {
  background: rgba(255,255,255,0.2);
}
.root[data-variant='solid'] .progress > i { background: #fff; }

.root[data-variant='outline'] {
  background: var(--gob-ts-bg);
  border-color: color-mix(in srgb, var(--gob-ts-accent) 28%, transparent);
}

.root[data-variant='dense'],
.root[data-variant='compact'] {
  padding: 10px 12px;
  border-radius: 13px;
  gap: 10px;
  width: min(300px, 100%);
}
.root[data-variant='dense'] .icon,
.root[data-variant='compact'] .icon {
  width: 28px;
  height: 28px;
  border-radius: 9px;
}
.root[data-variant='compact'] .description { display: none; }

.root[data-variant='action'] .action { display: inline-flex; }

.root[data-variant='stacked'] {
  width: min(320px, 100%);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 10px 0 -4px #fff,
    0 10px 0 -3px var(--gob-ts-border),
    0 18px 0 -8px #fff,
    0 18px 0 -7px var(--gob-ts-border),
    0 16px 36px rgba(24, 21, 17, 0.12);
}

.root[data-variant='complete'] {
  border-left: 3px solid var(--gob-ts-dorado);
}

.root[data-open='false'] {
  display: none;
}

@keyframes gob-ts-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes gob-ts-bar {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}
`;

// src/components/toast/gob-toast.element.ts
var CLOSE_SVG2 = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;
var GobToastElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "iconEl");
    __publicField(this, "bodyEl");
    __publicField(this, "titleEl");
    __publicField(this, "descEl");
    __publicField(this, "actionsEl");
    __publicField(this, "actionBtn");
    __publicField(this, "dismissBtn");
    __publicField(this, "progressEl");
    __publicField(this, "progressBar");
    __publicField(this, "timer", null);
    __publicField(this, "closed", false);
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = toastStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("role", "status");
    this.iconEl = document.createElement("span");
    this.iconEl.className = "icon";
    this.iconEl.setAttribute("aria-hidden", "true");
    this.bodyEl = document.createElement("div");
    this.bodyEl.className = "body";
    this.titleEl = document.createElement("p");
    this.titleEl.className = "title";
    this.descEl = document.createElement("p");
    this.descEl.className = "description";
    this.bodyEl.append(this.titleEl, this.descEl);
    this.actionsEl = document.createElement("div");
    this.actionsEl.className = "actions";
    this.actionBtn = document.createElement("button");
    this.actionBtn.type = "button";
    this.actionBtn.className = "action";
    this.dismissBtn = document.createElement("button");
    this.dismissBtn.type = "button";
    this.dismissBtn.className = "dismiss";
    this.dismissBtn.setAttribute("aria-label", "Cerrar");
    this.dismissBtn.innerHTML = CLOSE_SVG2;
    this.actionsEl.append(this.actionBtn, this.dismissBtn);
    this.progressEl = document.createElement("div");
    this.progressEl.className = "progress";
    this.progressEl.setAttribute("aria-hidden", "true");
    this.progressBar = document.createElement("i");
    this.progressEl.appendChild(this.progressBar);
    this.rootEl.append(this.iconEl, this.bodyEl, this.actionsEl, this.progressEl);
    shadow.append(style, this.rootEl);
    this.actionBtn.addEventListener("click", () => this.emit("action"));
    this.dismissBtn.addEventListener("click", () => {
      this.close();
      this.emit("dismiss");
    });
  }
  static get observedAttributes() {
    return [...TOAST_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  disconnectedCallback() {
    this.clearTimer();
  }
  attributeChangedCallback(name) {
    if (name === "open" && this.hasAttribute("open")) {
      this.closed = false;
    }
    this.syncFromAttributes();
  }
  emit(action) {
    this.dispatchEvent(
      new CustomEvent("gob-toast", {
        detail: { action },
        bubbles: true,
        composed: true
      })
    );
  }
  close() {
    this.closed = true;
    this.removeAttribute("open");
    this.rootEl.dataset.open = "false";
    this.clearTimer();
  }
  clearTimer() {
    if (this.timer != null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
  syncFromAttributes() {
    const variant = resolveToastVariant(this.getAttribute("variant"));
    const tone = resolveToastTone(this.getAttribute("tone"));
    const title = this.getAttribute("title")?.trim() || "Aviso";
    const description = this.getAttribute("description")?.trim() || "";
    const action = this.getAttribute("action")?.trim() || "";
    const dismissible = this.hasAttribute("dismissible") || variant === "action" || variant === "basic" || variant === "complete" || variant === "progress";
    const durationRaw = Number(this.getAttribute("duration") || "0");
    const duration = Number.isFinite(durationRaw) ? Math.max(0, durationRaw) : 0;
    const isOpen = !this.closed;
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.open = isOpen ? "true" : "false";
    this.iconEl.innerHTML = TOAST_ICONS[tone];
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.descEl.hidden = !description;
    const showAction = Boolean(action) || variant === "action";
    this.actionBtn.hidden = !showAction;
    this.actionBtn.textContent = action || "Deshacer";
    this.dismissBtn.hidden = !dismissible;
    this.clearTimer();
    const barMs = duration > 0 ? duration : 4e3;
    this.progressBar.style.animationDuration = `${barMs}ms`;
    if (isOpen && duration > 0 && (variant === "progress" || variant === "complete") && this.isConnected) {
      this.timer = window.setTimeout(() => {
        this.close();
        this.emit("timeout");
      }, duration);
    }
  }
};
defineCustomElement("gob-toast", GobToastElement);

// src/components/banner/banner-constants.ts
var BANNER_VARIANTS = [
  "basic",
  "soft",
  "solid",
  "outline",
  "dense",
  "promo",
  "sticky",
  "centered",
  "split",
  "complete"
];
var BANNER_TONES = ["info", "success", "warning", "danger", "neutral", "brand"];
var BANNER_OBSERVED_ATTRIBUTES = [
  "variant",
  "tone",
  "title",
  "description",
  "action",
  "dismissible",
  "hidden"
];
function resolveBannerVariant(value) {
  if (BANNER_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveBannerTone(value) {
  if (BANNER_TONES.includes(value ?? "")) {
    return value;
  }
  return "info";
}

// src/components/banner/banner-styles.ts
var bannerStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-bn-vino: #9f2141;
  --gob-bn-dorado: #bc945a;
  --gob-bn-title: #181511;
  --gob-bn-muted: #6f6a63;
  --gob-bn-border: rgba(24, 21, 17, 0.1);
  --gob-bn-bg: #ffffff;
  --gob-bn-accent: #2f6fed;
  --gob-bn-soft: color-mix(in srgb, #2f6fed 10%, #fff);
  --gob-bn-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px 18px;
  align-items: center;
  width: 100%;
  padding: 14px 18px;
  border: 1px solid color-mix(in srgb, var(--gob-bn-accent) 18%, transparent);
  background: var(--gob-bn-soft);
  color: var(--gob-bn-title);
}

.root[data-tone='info'] { --gob-bn-accent: #2f6fed; --gob-bn-soft: color-mix(in srgb, #2f6fed 10%, #fff); }
.root[data-tone='success'] { --gob-bn-accent: #1f8a55; --gob-bn-soft: color-mix(in srgb, #1f8a55 10%, #fff); }
.root[data-tone='warning'] { --gob-bn-accent: #b87712; --gob-bn-soft: color-mix(in srgb, #b87712 11%, #fff); }
.root[data-tone='danger'] { --gob-bn-accent: #c62828; --gob-bn-soft: color-mix(in srgb, #c62828 10%, #fff); }
.root[data-tone='neutral'] { --gob-bn-accent: #6f6a63; --gob-bn-soft: #f3f3f3; }
.root[data-tone='brand'] { --gob-bn-accent: var(--gob-bn-vino); --gob-bn-soft: color-mix(in srgb, var(--gob-bn-vino) 9%, #fff); }

.body { min-width: 0; display: grid; gap: 3px; }
.title {
  margin: 0;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.25;
}
.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-bn-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.action,
.dismiss {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition: background 140ms var(--gob-bn-ease), color 140ms var(--gob-bn-ease);
}

.action {
  padding: 0 14px;
  background: var(--gob-bn-accent);
  color: #fff;
}
.action:hover { filter: brightness(0.94); }

.dismiss {
  width: 34px;
  padding: 0;
  background: transparent;
  color: var(--gob-bn-muted);
}
.dismiss:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-bn-title);
}
.dismiss svg { width: 14px; height: 14px; display: block; }

.root[data-variant='solid'] {
  background: var(--gob-bn-accent);
  border-color: var(--gob-bn-accent);
  color: #fff;
}
.root[data-variant='solid'] .description { color: rgba(255,255,255,0.88); }
.root[data-variant='solid'] .action {
  background: rgba(255,255,255,0.18);
  color: #fff;
}
.root[data-variant='solid'] .dismiss { color: rgba(255,255,255,0.88); }
.root[data-variant='solid'] .dismiss:hover {
  background: rgba(255,255,255,0.14);
  color: #fff;
}

.root[data-variant='outline'] {
  background: var(--gob-bn-bg);
  border-color: color-mix(in srgb, var(--gob-bn-accent) 30%, transparent);
}

.root[data-variant='dense'] { padding: 10px 14px; }
.root[data-variant='dense'] .title { font-size: 13px; }

.root[data-variant='promo'] {
  background: color-mix(in srgb, var(--gob-bn-dorado) 16%, #fff);
  border-color: color-mix(in srgb, var(--gob-bn-dorado) 34%, transparent);
}
.root[data-variant='promo'] .action {
  background: var(--gob-bn-vino);
}

.root[data-variant='sticky'] {
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.04);
}

.root[data-variant='centered'] {
  text-align: center;
  justify-items: center;
  grid-template-columns: 1fr;
}
.root[data-variant='centered'] .actions { justify-content: center; }

.root[data-variant='split'] {
  grid-template-columns: 1fr auto;
  border-left: 3px solid var(--gob-bn-accent);
  background: var(--gob-bn-bg);
  border-color: var(--gob-bn-border);
  border-left-color: var(--gob-bn-accent);
}

.root[data-variant='complete'] {
  border-left: 3px solid var(--gob-bn-dorado);
  background: var(--gob-bn-bg);
  border-color: var(--gob-bn-border);
  border-left-color: var(--gob-bn-dorado);
}

.root[data-variant='basic'],
.root[data-variant='soft'] {
  border-radius: 0;
}
`;

// src/components/banner/gob-banner.element.ts
var CLOSE_SVG3 = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;
var GobBannerElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "bodyEl");
    __publicField(this, "titleEl");
    __publicField(this, "descEl");
    __publicField(this, "actionsEl");
    __publicField(this, "actionBtn");
    __publicField(this, "dismissBtn");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = bannerStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.rootEl.setAttribute("role", "region");
    this.bodyEl = document.createElement("div");
    this.bodyEl.className = "body";
    this.titleEl = document.createElement("p");
    this.titleEl.className = "title";
    this.descEl = document.createElement("p");
    this.descEl.className = "description";
    this.bodyEl.append(this.titleEl, this.descEl);
    this.actionsEl = document.createElement("div");
    this.actionsEl.className = "actions";
    this.actionBtn = document.createElement("button");
    this.actionBtn.type = "button";
    this.actionBtn.className = "action";
    this.dismissBtn = document.createElement("button");
    this.dismissBtn.type = "button";
    this.dismissBtn.className = "dismiss";
    this.dismissBtn.setAttribute("aria-label", "Cerrar");
    this.dismissBtn.innerHTML = CLOSE_SVG3;
    this.actionsEl.append(this.actionBtn, this.dismissBtn);
    this.rootEl.append(this.bodyEl, this.actionsEl);
    shadow.append(style, this.rootEl);
    this.actionBtn.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("gob-banner", {
          detail: { action: "action" },
          bubbles: true,
          composed: true
        })
      );
    });
    this.dismissBtn.addEventListener("click", () => {
      this.setAttribute("hidden", "");
      this.dispatchEvent(
        new CustomEvent("gob-banner", {
          detail: { action: "dismiss" },
          bubbles: true,
          composed: true
        })
      );
    });
  }
  static get observedAttributes() {
    return [...BANNER_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveBannerVariant(this.getAttribute("variant"));
    const tone = resolveBannerTone(this.getAttribute("tone"));
    const title = this.getAttribute("title")?.trim() || "Aviso del sistema";
    const description = this.getAttribute("description")?.trim() || "Hay informacion importante para tu sesion.";
    const action = this.getAttribute("action")?.trim() || "";
    const dismissible = this.hasAttribute("dismissible");
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.hidden = this.hasAttribute("hidden");
    this.rootEl.setAttribute("aria-label", title);
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.descEl.hidden = !description;
    if (action) {
      this.actionBtn.hidden = false;
      this.actionBtn.textContent = action;
    } else {
      this.actionBtn.hidden = true;
    }
    this.dismissBtn.hidden = !dismissible;
    this.actionsEl.hidden = this.actionBtn.hidden && this.dismissBtn.hidden;
  }
};
defineCustomElement("gob-banner", GobBannerElement);

// src/components/badge/badge-constants.ts
var BADGE_VARIANTS = [
  "basic",
  "soft",
  "solid",
  "outline",
  "dot",
  "count",
  "pill",
  "square",
  "status",
  "complete"
];
var BADGE_TONES = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "neutral"
];
var BADGE_OBSERVED_ATTRIBUTES = [
  "variant",
  "tone",
  "size",
  "label",
  "count",
  "max"
];
function resolveBadgeVariant(value) {
  if (BADGE_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveBadgeTone(value) {
  if (BADGE_TONES.includes(value ?? "")) {
    return value;
  }
  return "primary";
}
function resolveBadgeSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}
function formatBadgeCount(count, max) {
  const n = Number(count ?? "");
  if (!Number.isFinite(n)) return count?.trim() || "";
  const cap = Number(max ?? "99");
  const limit = Number.isFinite(cap) && cap > 0 ? cap : 99;
  if (n > limit) return `${limit}+`;
  return String(Math.max(0, Math.floor(n)));
}

// src/components/badge/badge-styles.ts
var badgeStyles = `
:host {
  display: inline-flex;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-bd-vino: #9f2141;
  --gob-bd-dorado: #bc945a;
  --gob-bd-title: #181511;
  --gob-bd-muted: #6f6a63;
  --gob-bd-border: rgba(24, 21, 17, 0.12);
  --gob-bd-bg: #ffffff;
  --gob-bd-accent: #9f2141;
  --gob-bd-soft: color-mix(in srgb, #9f2141 12%, #fff);
  --gob-bd-height: 24px;
  --gob-bd-pad: 0 9px;
  --gob-bd-font: 11.5px;
  --gob-bd-radius: 999px;
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: var(--gob-bd-height);
  padding: var(--gob-bd-pad);
  border-radius: var(--gob-bd-radius);
  border: 1px solid transparent;
  background: var(--gob-bd-soft);
  color: var(--gob-bd-accent);
  font-size: var(--gob-bd-font);
  font-weight: 750;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
}

.root[data-tone='primary'] { --gob-bd-accent: #9f2141; --gob-bd-soft: color-mix(in srgb, #9f2141 12%, #fff); }
.root[data-tone='success'] { --gob-bd-accent: #1f8a55; --gob-bd-soft: color-mix(in srgb, #1f8a55 12%, #fff); }
.root[data-tone='warning'] { --gob-bd-accent: #b87712; --gob-bd-soft: color-mix(in srgb, #b87712 14%, #fff); }
.root[data-tone='danger'] { --gob-bd-accent: #c62828; --gob-bd-soft: color-mix(in srgb, #c62828 12%, #fff); }
.root[data-tone='info'] { --gob-bd-accent: #2f6fed; --gob-bd-soft: color-mix(in srgb, #2f6fed 12%, #fff); }
.root[data-tone='neutral'] { --gob-bd-accent: #6f6a63; --gob-bd-soft: #f3f3f3; }

.root[data-size='sm'] { --gob-bd-height: 20px; --gob-bd-pad: 0 7px; --gob-bd-font: 10.5px; }
.root[data-size='lg'] { --gob-bd-height: 28px; --gob-bd-pad: 0 11px; --gob-bd-font: 12.5px; }

.root[data-variant='solid'] {
  background: var(--gob-bd-accent);
  color: #fff;
}
.root[data-variant='outline'] {
  background: var(--gob-bd-bg);
  border-color: color-mix(in srgb, var(--gob-bd-accent) 35%, transparent);
}
.root[data-variant='basic'],
.root[data-variant='soft'],
.root[data-variant='status'],
.root[data-variant='count'],
.root[data-variant='pill'] {
  background: var(--gob-bd-soft);
}

.root[data-variant='square'] {
  border-radius: 8px;
}

.root[data-variant='dot'] {
  width: 10px;
  height: 10px;
  min-height: 10px;
  padding: 0;
  border-radius: 999px;
  background: var(--gob-bd-accent);
  color: transparent;
  font-size: 0;
}

.root[data-variant='count'] {
  min-width: var(--gob-bd-height);
  padding: 0 6px;
}

.root[data-variant='complete'] {
  background: var(--gob-bd-bg);
  border: 1px solid var(--gob-bd-border);
  border-left: 3px solid var(--gob-bd-dorado);
  color: var(--gob-bd-vino);
  border-radius: 10px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: currentColor;
  flex: 0 0 auto;
  display: none;
}
.root[data-variant='status'] .dot { display: inline-block; }
`;

// src/components/badge/gob-badge.element.ts
var GobBadgeElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "dotEl");
    __publicField(this, "labelEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = badgeStyles;
    this.rootEl = document.createElement("span");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.dotEl = document.createElement("span");
    this.dotEl.className = "dot";
    this.dotEl.setAttribute("aria-hidden", "true");
    this.labelEl = document.createElement("span");
    this.labelEl.className = "label";
    this.rootEl.append(this.dotEl, this.labelEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...BADGE_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveBadgeVariant(this.getAttribute("variant"));
    const tone = resolveBadgeTone(this.getAttribute("tone"));
    const size = resolveBadgeSize(this.getAttribute("size"));
    const label = this.getAttribute("label")?.trim() || this.textContent?.trim() || "";
    const count = formatBadgeCount(
      this.getAttribute("count"),
      this.getAttribute("max")
    );
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.size = size;
    if (variant === "dot") {
      this.labelEl.textContent = "";
      this.rootEl.setAttribute("aria-label", label || tone);
      return;
    }
    if (variant === "count" || count) {
      this.labelEl.textContent = count || label || "0";
    } else {
      this.labelEl.textContent = label || "Nuevo";
    }
  }
};
defineCustomElement("gob-badge", GobBadgeElement);

// src/components/tag/tag-constants.ts
var TAG_VARIANTS = [
  "basic",
  "soft",
  "outline",
  "solid",
  "filter",
  "removable",
  "dense",
  "icon",
  "brand",
  "complete"
];
var TAG_TONES = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "neutral"
];
var TAG_OBSERVED_ATTRIBUTES = [
  "variant",
  "tone",
  "size",
  "label",
  "icon",
  "removable",
  "disabled"
];
var TAG_ICONS = {
  filter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5h14l-5.5 6.2V18l-3 1.5v-6.8L5 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 10.5 7 16l5.5-2 5.5 2-2-5.5L18 8.5 14.5 7 12 3.5 9.5 7 6 8.5 9 10.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 12.5V6.8A2.3 2.3 0 0 1 6.8 4.5h5.7L19.5 11.5l-7 7-8-6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="8.2" cy="8.2" r="1.1" fill="currentColor"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
};
var TAG_CLOSE = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
function resolveTagIcon(name) {
  if (!name) return null;
  return TAG_ICONS[name.trim().toLowerCase()] || null;
}
function resolveTagVariant(value) {
  if (TAG_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveTagTone(value) {
  if (TAG_TONES.includes(value ?? "")) {
    return value;
  }
  return "primary";
}
function resolveTagSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}

// src/components/tag/tag-styles.ts
var tagStyles = `
:host {
  display: inline-flex;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-tg-vino: #9f2141;
  --gob-tg-dorado: #bc945a;
  --gob-tg-title: #181511;
  --gob-tg-muted: #6f6a63;
  --gob-tg-border: rgba(24, 21, 17, 0.12);
  --gob-tg-bg: #ffffff;
  --gob-tg-accent: #9f2141;
  --gob-tg-soft: color-mix(in srgb, #9f2141 10%, #fff);
  --gob-tg-height: 32px;
  --gob-tg-pad: 0 10px;
  --gob-tg-font: 12.5px;
  --gob-tg-radius: 999px;
  --gob-tg-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: 100%;
  min-height: var(--gob-tg-height);
  padding: var(--gob-tg-pad);
  border-radius: var(--gob-tg-radius);
  border: 1px solid transparent;
  background: var(--gob-tg-soft);
  color: var(--gob-tg-accent);
  font-size: var(--gob-tg-font);
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1;
}

.root[data-tone='primary'] { --gob-tg-accent: #9f2141; --gob-tg-soft: color-mix(in srgb, #9f2141 10%, #fff); }
.root[data-tone='success'] { --gob-tg-accent: #1f8a55; --gob-tg-soft: color-mix(in srgb, #1f8a55 10%, #fff); }
.root[data-tone='warning'] { --gob-tg-accent: #b87712; --gob-tg-soft: color-mix(in srgb, #b87712 12%, #fff); }
.root[data-tone='danger'] { --gob-tg-accent: #c62828; --gob-tg-soft: color-mix(in srgb, #c62828 10%, #fff); }
.root[data-tone='info'] { --gob-tg-accent: #2f6fed; --gob-tg-soft: color-mix(in srgb, #2f6fed 10%, #fff); }
.root[data-tone='neutral'] { --gob-tg-accent: #6f6a63; --gob-tg-soft: #f3f3f3; }

.root[data-size='sm'] { --gob-tg-height: 26px; --gob-tg-pad: 0 8px; --gob-tg-font: 11.5px; }
.root[data-size='lg'] { --gob-tg-height: 38px; --gob-tg-pad: 0 12px; --gob-tg-font: 13.5px; }

.root[data-variant='solid'] {
  background: var(--gob-tg-accent);
  color: #fff;
}
.root[data-variant='outline'],
.root[data-variant='filter'],
.root[data-variant='removable'] {
  background: var(--gob-tg-bg);
  border-color: color-mix(in srgb, var(--gob-tg-accent) 28%, transparent);
  color: var(--gob-tg-title);
}
.root[data-variant='filter'] {
  border-style: dashed;
}
.root[data-variant='brand'] {
  background: color-mix(in srgb, var(--gob-tg-dorado) 16%, #fff);
  border-color: color-mix(in srgb, var(--gob-tg-dorado) 34%, transparent);
  color: #3d3428;
}
.root[data-variant='dense'] {
  --gob-tg-height: 26px;
  --gob-tg-font: 11.5px;
}
.root[data-variant='complete'] {
  background: var(--gob-tg-bg);
  border: 1px solid var(--gob-tg-border);
  border-left: 3px solid var(--gob-tg-dorado);
  border-radius: 12px;
  color: var(--gob-tg-vino);
}

.root[data-disabled='true'] {
  opacity: 0.42;
  pointer-events: none;
}

.icon {
  width: 14px;
  height: 14px;
  display: none;
  flex: 0 0 auto;
  color: currentColor;
}
.icon svg { width: 14px; height: 14px; display: block; }
.root[data-has-icon='true'] .icon { display: inline-flex; }

.label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove {
  appearance: none;
  display: none;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: -2px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: currentColor;
  cursor: pointer;
  transition: background 140ms var(--gob-tg-ease);
}
.remove:hover { background: rgba(24, 21, 17, 0.08); }
.remove svg { width: 11px; height: 11px; display: block; }
.root[data-removable='true'] .remove { display: inline-flex; }
.root[data-variant='solid'] .remove:hover { background: rgba(255,255,255,0.18); }
`;

// src/components/tag/gob-tag.element.ts
var GobTagElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "iconEl");
    __publicField(this, "labelEl");
    __publicField(this, "removeBtn");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = tagStyles;
    this.rootEl = document.createElement("span");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.iconEl = document.createElement("span");
    this.iconEl.className = "icon";
    this.iconEl.setAttribute("aria-hidden", "true");
    this.labelEl = document.createElement("span");
    this.labelEl.className = "label";
    this.labelEl.setAttribute("part", "label");
    this.removeBtn = document.createElement("button");
    this.removeBtn.type = "button";
    this.removeBtn.className = "remove";
    this.removeBtn.setAttribute("aria-label", "Quitar");
    this.removeBtn.innerHTML = TAG_CLOSE;
    this.rootEl.append(this.iconEl, this.labelEl, this.removeBtn);
    shadow.append(style, this.rootEl);
    this.removeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      if (this.hasAttribute("disabled")) return;
      this.dispatchEvent(
        new CustomEvent("gob-tag", {
          detail: {
            action: "remove",
            label: this.getAttribute("label") || this.labelEl.textContent
          },
          bubbles: true,
          composed: true
        })
      );
      this.remove();
    });
  }
  static get observedAttributes() {
    return [...TAG_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveTagVariant(this.getAttribute("variant"));
    const tone = resolveTagTone(this.getAttribute("tone"));
    const size = resolveTagSize(this.getAttribute("size"));
    const label = this.getAttribute("label")?.trim() || this.textContent?.trim() || "Etiqueta";
    const iconName = this.getAttribute("icon");
    const iconSvg = resolveTagIcon(iconName);
    const removable = this.hasAttribute("removable") || variant === "removable" || variant === "filter";
    const disabled = this.hasAttribute("disabled");
    const forceIcon = variant === "icon" || variant === "filter";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.removable = removable ? "true" : "false";
    this.rootEl.dataset.disabled = disabled ? "true" : "false";
    this.rootEl.dataset.hasIcon = iconSvg || forceIcon ? "true" : "false";
    this.labelEl.textContent = label;
    this.iconEl.innerHTML = iconSvg || (forceIcon ? resolveTagIcon("tag") || "" : "");
    this.removeBtn.hidden = !removable;
    this.removeBtn.disabled = disabled;
  }
};
defineCustomElement("gob-tag", GobTagElement);

// src/components/tooltip/tooltip-constants.ts
var TOOLTIP_VARIANTS = [
  "basic",
  "soft",
  "solid",
  "outline",
  "dense",
  "rich",
  "inverse",
  "brand",
  "success",
  "complete"
];
var TOOLTIP_PLACEMENTS = ["top", "bottom", "left", "right"];
var TOOLTIP_OBSERVED_ATTRIBUTES = [
  "variant",
  "placement",
  "label",
  "trigger",
  "open"
];
function resolveTooltipVariant(value) {
  if (TOOLTIP_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveTooltipPlacement(value) {
  if (TOOLTIP_PLACEMENTS.includes(value ?? "")) {
    return value;
  }
  return "top";
}

// src/components/tooltip/tooltip-styles.ts
var tooltipStyles = `
:host {
  display: inline-flex;
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-tt-vino: #9f2141;
  --gob-tt-dorado: #bc945a;
  --gob-tt-title: #181511;
  --gob-tt-muted: #6f6a63;
  --gob-tt-border: rgba(24, 21, 17, 0.12);
  --gob-tt-bg: #181511;
  --gob-tt-fg: #ffffff;
  --gob-tt-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.trigger {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--gob-tt-border);
  background: #fff;
  color: var(--gob-tt-title);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: default;
}

.bubble {
  position: absolute;
  z-index: 20;
  width: max-content;
  max-width: min(240px, 70vw);
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--gob-tt-bg);
  color: var(--gob-tt-fg);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.35;
  text-align: left;
  pointer-events: none;
  opacity: 0;
  transform: translateY(2px) scale(0.98);
  transition: opacity 140ms var(--gob-tt-ease), transform 140ms var(--gob-tt-ease);
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.16);
}

.bubble::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  transform: rotate(45deg);
}

.root[data-open='true'] .bubble,
.root:hover .bubble,
.root:focus-within .bubble {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.root[data-placement='top'] .bubble {
  left: 50%;
  bottom: calc(100% + 10px);
  transform: translate(-50%, 4px) scale(0.98);
}
.root[data-placement='top'][data-open='true'] .bubble,
.root[data-placement='top']:hover .bubble,
.root[data-placement='top']:focus-within .bubble {
  transform: translate(-50%, 0) scale(1);
}
.root[data-placement='top'] .bubble::after {
  left: 50%;
  bottom: -4px;
  margin-left: -4px;
}

.root[data-placement='bottom'] .bubble {
  left: 50%;
  top: calc(100% + 10px);
  transform: translate(-50%, -4px) scale(0.98);
}
.root[data-placement='bottom'][data-open='true'] .bubble,
.root[data-placement='bottom']:hover .bubble,
.root[data-placement='bottom']:focus-within .bubble {
  transform: translate(-50%, 0) scale(1);
}
.root[data-placement='bottom'] .bubble::after {
  left: 50%;
  top: -4px;
  margin-left: -4px;
}

.root[data-placement='left'] .bubble {
  right: calc(100% + 10px);
  top: 50%;
  transform: translate(-4px, -50%) scale(0.98);
}
.root[data-placement='left'][data-open='true'] .bubble,
.root[data-placement='left']:hover .bubble,
.root[data-placement='left']:focus-within .bubble {
  transform: translate(0, -50%) scale(1);
}
.root[data-placement='left'] .bubble::after {
  right: -4px;
  top: 50%;
  margin-top: -4px;
}

.root[data-placement='right'] .bubble {
  left: calc(100% + 10px);
  top: 50%;
  transform: translate(4px, -50%) scale(0.98);
}
.root[data-placement='right'][data-open='true'] .bubble,
.root[data-placement='right']:hover .bubble,
.root[data-placement='right']:focus-within .bubble {
  transform: translate(0, -50%) scale(1);
}
.root[data-placement='right'] .bubble::after {
  left: -4px;
  top: 50%;
  margin-top: -4px;
}

.root[data-variant='soft'] .bubble {
  background: #f3f3f3;
  color: var(--gob-tt-title);
  border: 1px solid var(--gob-tt-border);
  box-shadow: 0 8px 18px rgba(24, 21, 17, 0.08);
}
.root[data-variant='outline'] .bubble {
  background: #fff;
  color: var(--gob-tt-title);
  border: 1px solid var(--gob-tt-border);
}
.root[data-variant='solid'] .bubble,
.root[data-variant='brand'] .bubble {
  background: var(--gob-tt-vino);
  color: #fff;
}
.root[data-variant='success'] .bubble {
  background: #1f8a55;
  color: #fff;
}
.root[data-variant='inverse'] .bubble {
  background: #fff;
  color: var(--gob-tt-title);
  border: 1px solid var(--gob-tt-border);
}
.root[data-variant='dense'] .bubble {
  padding: 5px 8px;
  font-size: 11px;
  border-radius: 8px;
}
.root[data-variant='rich'] .bubble {
  padding: 10px 12px;
  max-width: min(280px, 80vw);
  font-weight: 500;
}
.root[data-variant='complete'] .bubble {
  background: #fff;
  color: var(--gob-tt-vino);
  border: 1px solid var(--gob-tt-border);
  border-left: 3px solid var(--gob-tt-dorado);
}
`;

// src/components/tooltip/gob-tooltip.element.ts
var GobTooltipElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "triggerEl");
    __publicField(this, "bubbleEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = tooltipStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.triggerEl = document.createElement("button");
    this.triggerEl.type = "button";
    this.triggerEl.className = "trigger";
    this.triggerEl.setAttribute("part", "trigger");
    this.bubbleEl = document.createElement("div");
    this.bubbleEl.className = "bubble";
    this.bubbleEl.setAttribute("part", "bubble");
    this.bubbleEl.setAttribute("role", "tooltip");
    this.rootEl.append(this.triggerEl, this.bubbleEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...TOOLTIP_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveTooltipVariant(this.getAttribute("variant"));
    const placement = resolveTooltipPlacement(this.getAttribute("placement"));
    const label = this.getAttribute("label")?.trim() || "Ayuda contextual del control.";
    const trigger = this.getAttribute("trigger")?.trim() || this.textContent?.trim() || "Pasa el cursor";
    const open = this.hasAttribute("open");
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.placement = placement;
    this.rootEl.dataset.open = open ? "true" : "false";
    this.triggerEl.textContent = trigger;
    this.triggerEl.setAttribute("aria-describedby", "tip");
    this.bubbleEl.id = "tip";
    this.bubbleEl.textContent = label;
  }
};
defineCustomElement("gob-tooltip", GobTooltipElement);

// src/components/helper-text/helper-text-constants.ts
var HELPER_TEXT_VARIANTS = [
  "basic",
  "hint",
  "error",
  "success",
  "warning",
  "info",
  "dense",
  "icon",
  "counter",
  "complete"
];
var HELPER_TEXT_TONES = [
  "neutral",
  "info",
  "success",
  "warning",
  "danger"
];
var HELPER_TEXT_OBSERVED_ATTRIBUTES = [
  "variant",
  "tone",
  "label",
  "count",
  "max"
];
var HELPER_ICONS = {
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v5M12 15.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  hint: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M9.8 9.6a2.4 2.4 0 0 1 4.4 1.2c0 1.4-1.4 1.8-2.2 2.4V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16.5" r="0.9" fill="currentColor"/></svg>`
};
function resolveHelperTextVariant(value) {
  if (HELPER_TEXT_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveHelperTextTone(value) {
  if (HELPER_TEXT_TONES.includes(value ?? "")) {
    return value;
  }
  return "neutral";
}

// src/components/helper-text/helper-text-styles.ts
var helperTextStyles = `
:host {
  display: block;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ht-vino: #9f2141;
  --gob-ht-dorado: #bc945a;
  --gob-ht-title: #181511;
  --gob-ht-muted: #6f6a63;
  --gob-ht-border: rgba(24, 21, 17, 0.1);
  --gob-ht-accent: #6f6a63;
  --gob-ht-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  color: var(--gob-ht-accent);
  font-size: 12.5px;
  font-weight: 550;
  letter-spacing: -0.01em;
  line-height: 1.4;
}

.root[data-tone='neutral'],
.root[data-variant='basic'],
.root[data-variant='hint'] { --gob-ht-accent: #6f6a63; }
.root[data-tone='info'],
.root[data-variant='info'] { --gob-ht-accent: #2f6fed; }
.root[data-tone='success'],
.root[data-variant='success'] { --gob-ht-accent: #1f8a55; }
.root[data-tone='warning'],
.root[data-variant='warning'] { --gob-ht-accent: #b87712; }
.root[data-tone='danger'],
.root[data-variant='error'] { --gob-ht-accent: #c62828; }

.root[data-variant='dense'] { font-size: 11.5px; gap: 6px; }

.root[data-variant='complete'] {
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--gob-ht-border);
  border-left: 3px solid var(--gob-ht-dorado);
  background: #fff;
  color: var(--gob-ht-vino);
}

.icon {
  width: 16px;
  height: 16px;
  display: none;
  flex: 0 0 auto;
  margin-top: 1px;
  color: currentColor;
}
.icon svg { width: 16px; height: 16px; display: block; }
.root[data-has-icon='true'] .icon { display: inline-flex; }

.body {
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.label { min-width: 0; }

.counter {
  flex: 0 0 auto;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  opacity: 0.85;
  display: none;
}
.root[data-variant='counter'] .counter,
.root[data-has-counter='true'] .counter { display: inline; }
`;

// src/components/helper-text/gob-helper-text.element.ts
var GobHelperTextElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "iconEl");
    __publicField(this, "bodyEl");
    __publicField(this, "labelEl");
    __publicField(this, "counterEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = helperTextStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.iconEl = document.createElement("span");
    this.iconEl.className = "icon";
    this.iconEl.setAttribute("aria-hidden", "true");
    this.bodyEl = document.createElement("div");
    this.bodyEl.className = "body";
    this.labelEl = document.createElement("span");
    this.labelEl.className = "label";
    this.counterEl = document.createElement("span");
    this.counterEl.className = "counter";
    this.bodyEl.append(this.labelEl, this.counterEl);
    this.rootEl.append(this.iconEl, this.bodyEl);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...HELPER_TEXT_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveHelperTextVariant(this.getAttribute("variant"));
    const tone = resolveHelperTextTone(this.getAttribute("tone"));
    const label = this.getAttribute("label")?.trim() || this.textContent?.trim() || "Texto de apoyo del campo.";
    const count = this.getAttribute("count");
    const max = this.getAttribute("max");
    const hasCounter = variant === "counter" || count != null && count !== "";
    const iconKey = variant === "error" ? "danger" : variant === "hint" || variant === "icon" ? "hint" : variant === "success" || variant === "warning" || variant === "info" ? variant : tone === "danger" ? "danger" : tone === "success" || tone === "warning" || tone === "info" ? tone : null;
    const showIcon = Boolean(iconKey) || variant === "icon" || variant === "error" || variant === "complete";
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.hasIcon = showIcon ? "true" : "false";
    this.rootEl.dataset.hasCounter = hasCounter ? "true" : "false";
    if (variant === "error") {
      this.rootEl.setAttribute("role", "alert");
    } else {
      this.rootEl.removeAttribute("role");
    }
    this.labelEl.textContent = label;
    this.iconEl.innerHTML = showIcon ? HELPER_ICONS[iconKey || "hint"] || HELPER_ICONS.hint : "";
    if (hasCounter) {
      const c = count?.trim() || "0";
      const m = max?.trim();
      this.counterEl.textContent = m ? `${c}/${m}` : c;
    } else {
      this.counterEl.textContent = "";
    }
  }
};
defineCustomElement("gob-helper-text", GobHelperTextElement);

// src/components/modal/modal-constants.ts
var MODAL_VARIANTS = [
  "basic",
  "confirm",
  "form",
  "danger",
  "success",
  "dense",
  "center",
  "sheet",
  "wide",
  "complete"
];
var MODAL_OBSERVED_ATTRIBUTES = [
  "variant",
  "size",
  "title",
  "description",
  "body",
  "confirm-label",
  "cancel-label",
  "open",
  "preview"
];
var MODAL_ICONS = {
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  confirm: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  form: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 5.5h10A1.5 1.5 0 0 1 18.5 7v10a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 17V7A1.5 1.5 0 0 1 7 5.5Z" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 9.5h7M8.5 12.5h7M8.5 15.5h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  brand: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7.5h10v9H7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.5 10.5h5M9.5 13.5h3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
};
function resolveModalVariant(value) {
  if (MODAL_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveModalSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}
function resolveModalIcon(variant) {
  if (variant === "danger") return MODAL_ICONS.danger;
  if (variant === "success") return MODAL_ICONS.success;
  if (variant === "confirm") return MODAL_ICONS.confirm;
  if (variant === "form") return MODAL_ICONS.form;
  if (variant === "complete") return MODAL_ICONS.brand;
  if (variant === "sheet") return MODAL_ICONS.info;
  if (variant === "basic" || variant === "center" || variant === "wide" || variant === "dense") {
    return MODAL_ICONS.info;
  }
  return null;
}

// src/components/modal/modal-styles.ts
var modalStyles = `
:host {
  display: contents;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-md-vino: #9f2141;
  --gob-md-vino-deep: #7a1832;
  --gob-md-dorado: #bc945a;
  --gob-md-title: #181511;
  --gob-md-muted: #6f6a63;
  --gob-md-border: rgba(24, 21, 17, 0.1);
  --gob-md-bg: #ffffff;
  --gob-md-fill: #f3f3f3;
  --gob-md-accent: #9f2141;
  --gob-md-accent-soft: color-mix(in srgb, #9f2141 10%, #fff);
  --gob-md-width: 440px;
  --gob-md-radius: 22px;
  --gob-md-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

:host([preview]) {
  display: block;
  width: 100%;
  max-width: var(--gob-md-width);
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  background: rgba(24, 21, 17, 0.48);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  animation: gob-md-scrim 200ms var(--gob-md-ease);
}

:host([open]) .backdrop { display: flex; }

:host([preview]) .backdrop,
:host([preview][open]) .backdrop {
  position: relative;
  inset: auto;
  z-index: auto;
  display: flex;
  padding: 0;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  animation: none;
  width: 100%;
}

.dialog {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0;
  width: min(var(--gob-md-width), 100%);
  max-height: min(86vh, 720px);
  overflow: hidden;
  border-radius: var(--gob-md-radius);
  border: 1px solid var(--gob-md-border);
  background: var(--gob-md-bg);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 18px 40px rgba(24, 21, 17, 0.16),
    0 48px 80px rgba(24, 21, 17, 0.12);
  animation: gob-md-in 220ms var(--gob-md-ease);
}

:host([preview]) .dialog {
  max-height: none;
  width: 100%;
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 12px 28px rgba(24, 21, 17, 0.08);
  animation: none;
}

.dialog::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  background: var(--gob-md-accent);
  opacity: 0;
}

.backdrop[data-size='sm'] .dialog { --gob-md-width: 360px; }
.backdrop[data-size='lg'] .dialog { --gob-md-width: 560px; }
.backdrop[data-variant='wide'] .dialog { --gob-md-width: 640px; }

.backdrop[data-variant='danger'] {
  --gob-md-accent: #c62828;
  --gob-md-accent-soft: color-mix(in srgb, #c62828 10%, #fff);
}
.backdrop[data-variant='success'] {
  --gob-md-accent: #1f8a55;
  --gob-md-accent-soft: color-mix(in srgb, #1f8a55 10%, #fff);
}
.backdrop[data-variant='confirm'],
.backdrop[data-variant='basic'],
.backdrop[data-variant='center'],
.backdrop[data-variant='wide'],
.backdrop[data-variant='form'] {
  --gob-md-accent: #9f2141;
  --gob-md-accent-soft: color-mix(in srgb, #9f2141 10%, #fff);
}
.backdrop[data-variant='complete'] {
  --gob-md-accent: #bc945a;
  --gob-md-accent-soft: color-mix(in srgb, #bc945a 14%, #fff);
}
.backdrop[data-variant='complete'] .dialog::before,
.backdrop[data-variant='danger'] .dialog::before,
.backdrop[data-variant='success'] .dialog::before {
  opacity: 1;
}

.backdrop[data-variant='dense'] .dialog {
  --gob-md-radius: 16px;
}
.backdrop[data-variant='dense'] .head {
  padding: 14px 16px 12px;
  gap: 10px;
}
.backdrop[data-variant='dense'] .copy { gap: 2px; }
.backdrop[data-variant='dense'] .title { font-size: 15px; }
.backdrop[data-variant='dense'] .description { font-size: 12.5px; }
.backdrop[data-variant='dense'] .body {
  margin: 0 16px 14px;
  padding: 10px 12px;
}
.backdrop[data-variant='dense'] .actions {
  padding: 12px 16px;
  gap: 6px;
}
.backdrop[data-variant='dense'] .btn {
  min-height: 34px;
  padding: 0 12px;
  font-size: 12.5px;
  border-radius: 10px;
}

.backdrop[data-variant='sheet'] {
  align-items: flex-end;
  padding: 0;
}
.backdrop[data-variant='sheet'] .dialog {
  width: 100%;
  max-width: 100%;
  max-height: min(78vh, 640px);
  border-radius: 24px 24px 0 0;
  animation: gob-md-sheet 240ms var(--gob-md-ease);
}
:host([preview]) .backdrop[data-variant='sheet'] .dialog {
  border-radius: 22px;
  animation: none;
}
.backdrop[data-variant='sheet'] .handle {
  display: flex;
}

.handle {
  display: none;
  justify-content: center;
  padding: 10px 0 2px;
}
.handle > i {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: rgba(24, 21, 17, 0.16);
}

.head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px 14px;
  align-items: start;
  padding: 20px 20px 14px;
}

.icon {
  width: 40px;
  height: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background: var(--gob-md-accent-soft);
  color: var(--gob-md-accent);
  flex: 0 0 auto;
}
.icon svg { width: 20px; height: 20px; display: block; }
.backdrop[data-has-icon='true'] .icon { display: inline-flex; }
.backdrop[data-has-icon='false'] .head {
  grid-template-columns: 1fr auto;
}
.backdrop[data-has-icon='false'] .icon { display: none; }

.copy {
  display: grid;
  gap: 4px;
  min-width: 0;
  padding-top: 1px;
}

.title {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--gob-md-title);
  line-height: 1.2;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-md-muted);
}

.close {
  appearance: none;
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: -2px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: var(--gob-md-muted);
  cursor: pointer;
  transition: background 140ms var(--gob-md-ease), color 140ms var(--gob-md-ease);
}
.close:hover {
  background: var(--gob-md-fill);
  color: var(--gob-md-title);
}
.close:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-md-vino) 45%, transparent);
  outline-offset: 2px;
}
.close svg { width: 14px; height: 14px; display: block; }

.body {
  margin: 0 20px 4px;
  padding: 14px 15px;
  border-radius: 14px;
  background: var(--gob-md-fill);
  color: var(--gob-md-title);
  font-size: 13.5px;
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: -0.01em;
  overflow: auto;
}

.backdrop[data-variant='form'] .body {
  background: #fff;
  border: 1px dashed color-mix(in srgb, var(--gob-md-border) 80%, #9f2141);
  min-height: 72px;
  color: var(--gob-md-muted);
}

.backdrop[data-variant='danger'] .body {
  background: color-mix(in srgb, #c62828 6%, #fff);
  border: 1px solid color-mix(in srgb, #c62828 12%, transparent);
}

.backdrop[data-variant='success'] .body {
  background: color-mix(in srgb, #1f8a55 7%, #fff);
  border: 1px solid color-mix(in srgb, #1f8a55 12%, transparent);
}

.actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  padding: 16px 20px 20px;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
  background: color-mix(in srgb, var(--gob-md-fill) 55%, #fff);
}

.btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition:
    background 150ms var(--gob-md-ease),
    color 150ms var(--gob-md-ease),
    border-color 150ms var(--gob-md-ease),
    transform 150ms var(--gob-md-ease);
}
.btn:active { transform: translateY(1px); }
.btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-md-accent) 50%, transparent);
  outline-offset: 2px;
}

.cancel {
  background: #fff;
  border-color: var(--gob-md-border);
  color: var(--gob-md-title);
}
.cancel:hover {
  background: var(--gob-md-fill);
  border-color: color-mix(in srgb, var(--gob-md-border) 70%, #181511);
}

.confirm {
  background: var(--gob-md-accent);
  color: #fff;
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.08);
}
.confirm:hover {
  filter: brightness(0.92);
}

.backdrop[data-variant='danger'] .confirm {
  background: #c62828;
}
.backdrop[data-variant='success'] .confirm {
  background: #1f8a55;
}
.backdrop[data-variant='complete'] .confirm {
  background: var(--gob-md-vino);
}

@keyframes gob-md-scrim {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes gob-md-in {
  from { opacity: 0; transform: translateY(12px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes gob-md-sheet {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop,
  .dialog {
    animation: none !important;
  }
  .btn:active { transform: none; }
}
`;

// src/components/modal/gob-modal.element.ts
var CLOSE_SVG4 = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;
var GobModalElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "backdropEl");
    __publicField(this, "dialogEl");
    __publicField(this, "handleEl");
    __publicField(this, "iconEl");
    __publicField(this, "titleEl");
    __publicField(this, "descEl");
    __publicField(this, "bodyEl");
    __publicField(this, "confirmBtn");
    __publicField(this, "cancelBtn");
    __publicField(this, "closeBtn");
    __publicField(this, "titleId", `gob-md-title-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "descId", `gob-md-desc-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "onKeyDown", (event) => {
      if (event.key === "Escape" && this.hasAttribute("open") && !this.hasAttribute("preview")) {
        this.close("escape");
      }
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = modalStyles;
    this.backdropEl = document.createElement("div");
    this.backdropEl.className = "backdrop";
    this.backdropEl.setAttribute("part", "backdrop");
    this.dialogEl = document.createElement("div");
    this.dialogEl.className = "dialog";
    this.dialogEl.setAttribute("part", "dialog");
    this.dialogEl.setAttribute("role", "dialog");
    this.dialogEl.setAttribute("aria-modal", "true");
    this.dialogEl.setAttribute("aria-labelledby", this.titleId);
    this.dialogEl.setAttribute("aria-describedby", this.descId);
    this.handleEl = document.createElement("div");
    this.handleEl.className = "handle";
    this.handleEl.setAttribute("aria-hidden", "true");
    const handleBar = document.createElement("i");
    this.handleEl.appendChild(handleBar);
    const head2 = document.createElement("div");
    head2.className = "head";
    this.iconEl = document.createElement("span");
    this.iconEl.className = "icon";
    this.iconEl.setAttribute("aria-hidden", "true");
    this.iconEl.setAttribute("part", "icon");
    const copy = document.createElement("div");
    copy.className = "copy";
    this.titleEl = document.createElement("h2");
    this.titleEl.className = "title";
    this.titleEl.id = this.titleId;
    this.descEl = document.createElement("p");
    this.descEl.className = "description";
    this.descEl.id = this.descId;
    copy.append(this.titleEl, this.descEl);
    this.closeBtn = document.createElement("button");
    this.closeBtn.type = "button";
    this.closeBtn.className = "close";
    this.closeBtn.setAttribute("aria-label", "Cerrar");
    this.closeBtn.setAttribute("part", "close");
    this.closeBtn.innerHTML = CLOSE_SVG4;
    head2.append(this.iconEl, copy, this.closeBtn);
    this.bodyEl = document.createElement("div");
    this.bodyEl.className = "body";
    this.bodyEl.setAttribute("part", "body");
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.setAttribute("part", "actions");
    this.cancelBtn = document.createElement("button");
    this.cancelBtn.type = "button";
    this.cancelBtn.className = "btn cancel";
    this.cancelBtn.setAttribute("part", "cancel");
    this.confirmBtn = document.createElement("button");
    this.confirmBtn.type = "button";
    this.confirmBtn.className = "btn confirm";
    this.confirmBtn.setAttribute("part", "confirm");
    actions.append(this.cancelBtn, this.confirmBtn);
    this.dialogEl.append(this.handleEl, head2, this.bodyEl, actions);
    this.backdropEl.appendChild(this.dialogEl);
    shadow.append(style, this.backdropEl);
    this.backdropEl.addEventListener("click", (event) => {
      if (this.hasAttribute("preview")) return;
      if (event.target === this.backdropEl) this.close("backdrop");
    });
    this.closeBtn.addEventListener("click", () => {
      if (this.hasAttribute("preview")) return;
      this.close("close");
    });
    this.cancelBtn.addEventListener("click", () => {
      if (this.hasAttribute("preview")) return;
      this.close("cancel");
    });
    this.confirmBtn.addEventListener("click", () => {
      if (this.hasAttribute("preview")) return;
      this.close("confirm");
    });
  }
  static get observedAttributes() {
    return [...MODAL_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    document.addEventListener("keydown", this.onKeyDown);
    this.syncFromAttributes();
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this.onKeyDown);
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  close(action) {
    this.removeAttribute("open");
    this.dispatchEvent(
      new CustomEvent("gob-modal", {
        detail: { action },
        bubbles: true,
        composed: true
      })
    );
  }
  syncFromAttributes() {
    const variant = resolveModalVariant(this.getAttribute("variant"));
    const size = resolveModalSize(this.getAttribute("size"));
    const preview = this.hasAttribute("preview");
    const title = this.getAttribute("title")?.trim() || "Confirmar accion";
    const description = this.getAttribute("description")?.trim() || "Revisa la informacion antes de continuar.";
    const body = this.getAttribute("body")?.trim() || this.textContent?.trim() || "Esta accion puede afectar el expediente seleccionado.";
    const confirm = this.getAttribute("confirm-label")?.trim() || "Confirmar";
    const cancel = this.getAttribute("cancel-label")?.trim() || "Cancelar";
    const icon = resolveModalIcon(variant);
    this.backdropEl.dataset.variant = variant;
    this.backdropEl.dataset.size = size;
    this.backdropEl.dataset.hasIcon = icon ? "true" : "false";
    this.backdropEl.dataset.preview = preview ? "true" : "false";
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.bodyEl.textContent = body;
    this.confirmBtn.textContent = confirm;
    this.cancelBtn.textContent = cancel;
    this.iconEl.innerHTML = icon || "";
    this.dialogEl.setAttribute("aria-modal", preview ? "false" : "true");
    this.closeBtn.tabIndex = preview ? -1 : 0;
    this.closeBtn.setAttribute("aria-hidden", preview ? "true" : "false");
  }
};
defineCustomElement("gob-modal", GobModalElement);

// src/components/confirm-dialog/confirm-dialog-constants.ts
var CONFIRM_DIALOG_VARIANTS = [
  "basic",
  "danger",
  "warning",
  "success",
  "info",
  "dense",
  "soft",
  "outline",
  "brand",
  "complete"
];
var CONFIRM_DIALOG_OBSERVED_ATTRIBUTES = [
  "variant",
  "title",
  "description",
  "body",
  "confirm-label",
  "cancel-label",
  "open",
  "preview"
];
var CONFIRM_ICONS = {
  danger: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4.5M12 16.8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  brand: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 8v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`
};
function resolveConfirmDialogVariant(value) {
  if (CONFIRM_DIALOG_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveConfirmIcon(variant) {
  if (variant === "danger") return CONFIRM_ICONS.danger;
  if (variant === "warning") return CONFIRM_ICONS.warning;
  if (variant === "success") return CONFIRM_ICONS.success;
  if (variant === "complete" || variant === "brand") return CONFIRM_ICONS.brand;
  return CONFIRM_ICONS.info;
}

// src/components/confirm-dialog/confirm-dialog-styles.ts
var confirmDialogStyles = `
:host {
  display: contents;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-cd-vino: #9f2141;
  --gob-cd-vino-deep: #7a1832;
  --gob-cd-dorado: #bc945a;
  --gob-cd-title: #181511;
  --gob-cd-muted: #6f6a63;
  --gob-cd-border: rgba(24, 21, 17, 0.1);
  --gob-cd-bg: #ffffff;
  --gob-cd-fill: #f3f3f3;
  --gob-cd-accent: #9f2141;
  --gob-cd-accent-soft: color-mix(in srgb, #9f2141 10%, #fff);
  --gob-cd-width: 420px;
  --gob-cd-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

:host([preview]) {
  display: block;
  width: 100%;
  max-width: var(--gob-cd-width);
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 28px 20px;
  background: rgba(24, 21, 17, 0.48);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  animation: gob-cd-scrim 200ms var(--gob-cd-ease);
}

:host([open]) .backdrop { display: flex; }

:host([preview]) .backdrop,
:host([preview][open]) .backdrop {
  position: relative;
  inset: auto;
  z-index: auto;
  display: flex;
  padding: 0;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  animation: none;
  width: 100%;
}

.dialog {
  position: relative;
  display: grid;
  gap: 0;
  width: min(var(--gob-cd-width), 100%);
  border-radius: 20px;
  border: 1px solid var(--gob-cd-border);
  background: var(--gob-cd-bg);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 18px 40px rgba(24, 21, 17, 0.16);
  animation: gob-cd-in 220ms var(--gob-cd-ease);
  overflow: hidden;
}

:host([preview]) .dialog {
  width: 100%;
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 12px 28px rgba(24, 21, 17, 0.08);
  animation: none;
}

.dialog::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  background: var(--gob-cd-accent);
  opacity: 0;
}

.backdrop[data-variant='danger'] {
  --gob-cd-accent: #c62828;
  --gob-cd-accent-soft: color-mix(in srgb, #c62828 10%, #fff);
}
.backdrop[data-variant='warning'] {
  --gob-cd-accent: #b87712;
  --gob-cd-accent-soft: color-mix(in srgb, #b87712 11%, #fff);
}
.backdrop[data-variant='success'] {
  --gob-cd-accent: #1f8a55;
  --gob-cd-accent-soft: color-mix(in srgb, #1f8a55 10%, #fff);
}
.backdrop[data-variant='info'],
.backdrop[data-variant='basic'],
.backdrop[data-variant='soft'],
.backdrop[data-variant='outline'] {
  --gob-cd-accent: #9f2141;
  --gob-cd-accent-soft: color-mix(in srgb, #9f2141 10%, #fff);
}
.backdrop[data-variant='complete'],
.backdrop[data-variant='brand'] {
  --gob-cd-accent: #bc945a;
  --gob-cd-accent-soft: color-mix(in srgb, #bc945a 14%, #fff);
}

.backdrop[data-variant='danger'] .dialog::before,
.backdrop[data-variant='warning'] .dialog::before,
.backdrop[data-variant='success'] .dialog::before,
.backdrop[data-variant='complete'] .dialog::before { opacity: 1; }

.head {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px 14px;
  align-items: start;
  padding: 20px 20px 12px;
}

.icon {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background: var(--gob-cd-accent-soft);
  color: var(--gob-cd-accent);
}
.icon svg { width: 20px; height: 20px; display: block; }

.copy { display: grid; gap: 4px; min-width: 0; padding-top: 2px; }

.title {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--gob-cd-title);
  line-height: 1.2;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-cd-muted);
}

.body {
  margin: 0 20px 4px;
  padding: 14px 15px;
  border-radius: 14px;
  background: var(--gob-cd-fill);
  color: var(--gob-cd-title);
  font-size: 13.5px;
  font-weight: 550;
  line-height: 1.5;
}

.backdrop[data-variant='danger'] .body {
  background: color-mix(in srgb, #c62828 6%, #fff);
  border: 1px solid color-mix(in srgb, #c62828 12%, transparent);
}
.backdrop[data-variant='warning'] .body {
  background: color-mix(in srgb, #b87712 8%, #fff);
  border: 1px solid color-mix(in srgb, #b87712 14%, transparent);
}
.backdrop[data-variant='success'] .body {
  background: color-mix(in srgb, #1f8a55 7%, #fff);
  border: 1px solid color-mix(in srgb, #1f8a55 12%, transparent);
}
.backdrop[data-variant='soft'] .dialog { background: var(--gob-cd-fill); }
.backdrop[data-variant='outline'] .dialog {
  border-color: color-mix(in srgb, var(--gob-cd-accent) 28%, #d7dde6);
}
.backdrop[data-variant='dense'] .head { padding: 14px 14px 8px; gap: 10px; }
.backdrop[data-variant='dense'] .icon { width: 34px; height: 34px; border-radius: 11px; }
.backdrop[data-variant='dense'] .icon svg { width: 16px; height: 16px; }
.backdrop[data-variant='dense'] .title { font-size: 15px; }
.backdrop[data-variant='dense'] .body { margin: 0 14px 2px; padding: 10px 12px; }
.backdrop[data-variant='dense'] .actions { padding: 12px 14px 14px; }
.backdrop[data-variant='dense'] .btn { min-height: 34px; border-radius: 10px; font-size: 12.5px; }

.actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
  padding: 16px 20px 20px;
  border-top: 1px solid rgba(24, 21, 17, 0.06);
  background: color-mix(in srgb, var(--gob-cd-fill) 55%, #fff);
}

.btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.015em;
  cursor: pointer;
  transition: background 150ms var(--gob-cd-ease), border-color 150ms var(--gob-cd-ease), filter 150ms var(--gob-cd-ease);
}
.btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-cd-accent) 45%, transparent);
  outline-offset: 2px;
}

.cancel {
  background: #fff;
  border-color: var(--gob-cd-border);
  color: var(--gob-cd-title);
}
.cancel:hover { background: var(--gob-cd-fill); }

.confirm {
  background: var(--gob-cd-accent);
  color: #fff;
}
.confirm:hover { filter: brightness(0.92); }

.backdrop[data-variant='complete'] .confirm,
.backdrop[data-variant='brand'] .confirm {
  background: var(--gob-cd-vino);
}

@keyframes gob-cd-scrim {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes gob-cd-in {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop, .dialog { animation: none !important; }
}
`;

// src/components/confirm-dialog/gob-confirm-dialog.element.ts
var GobConfirmDialogElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "backdropEl");
    __publicField(this, "dialogEl");
    __publicField(this, "iconEl");
    __publicField(this, "titleEl");
    __publicField(this, "descEl");
    __publicField(this, "bodyEl");
    __publicField(this, "confirmBtn");
    __publicField(this, "cancelBtn");
    __publicField(this, "titleId", `gob-cd-title-${Math.random().toString(36).slice(2, 9)}`);
    __publicField(this, "onKeyDown", (event) => {
      if (event.key === "Escape" && this.hasAttribute("open") && !this.hasAttribute("preview")) {
        this.close("escape");
      }
    });
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = confirmDialogStyles;
    this.backdropEl = document.createElement("div");
    this.backdropEl.className = "backdrop";
    this.backdropEl.setAttribute("part", "backdrop");
    this.dialogEl = document.createElement("div");
    this.dialogEl.className = "dialog";
    this.dialogEl.setAttribute("part", "dialog");
    this.dialogEl.setAttribute("role", "alertdialog");
    this.dialogEl.setAttribute("aria-modal", "true");
    this.dialogEl.setAttribute("aria-labelledby", this.titleId);
    const head2 = document.createElement("div");
    head2.className = "head";
    this.iconEl = document.createElement("span");
    this.iconEl.className = "icon";
    this.iconEl.setAttribute("aria-hidden", "true");
    const copy = document.createElement("div");
    copy.className = "copy";
    this.titleEl = document.createElement("h2");
    this.titleEl.className = "title";
    this.titleEl.id = this.titleId;
    this.descEl = document.createElement("p");
    this.descEl.className = "description";
    copy.append(this.titleEl, this.descEl);
    head2.append(this.iconEl, copy);
    this.bodyEl = document.createElement("div");
    this.bodyEl.className = "body";
    this.bodyEl.setAttribute("part", "body");
    const actions = document.createElement("div");
    actions.className = "actions";
    this.cancelBtn = document.createElement("button");
    this.cancelBtn.type = "button";
    this.cancelBtn.className = "btn cancel";
    this.confirmBtn = document.createElement("button");
    this.confirmBtn.type = "button";
    this.confirmBtn.className = "btn confirm";
    actions.append(this.cancelBtn, this.confirmBtn);
    this.dialogEl.append(head2, this.bodyEl, actions);
    this.backdropEl.appendChild(this.dialogEl);
    shadow.append(style, this.backdropEl);
    this.backdropEl.addEventListener("click", (event) => {
      if (this.hasAttribute("preview")) return;
      if (event.target === this.backdropEl) this.close("backdrop");
    });
    this.cancelBtn.addEventListener("click", () => {
      if (this.hasAttribute("preview")) return;
      this.close("cancel");
    });
    this.confirmBtn.addEventListener("click", () => {
      if (this.hasAttribute("preview")) return;
      this.close("confirm");
    });
  }
  static get observedAttributes() {
    return [...CONFIRM_DIALOG_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    document.addEventListener("keydown", this.onKeyDown);
    this.syncFromAttributes();
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this.onKeyDown);
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  close(action) {
    this.removeAttribute("open");
    this.dispatchEvent(
      new CustomEvent("gob-confirm-dialog", {
        detail: { action },
        bubbles: true,
        composed: true
      })
    );
  }
  syncFromAttributes() {
    const variant = resolveConfirmDialogVariant(this.getAttribute("variant"));
    const preview = this.hasAttribute("preview");
    const title = this.getAttribute("title")?.trim() || "Confirmar accion";
    const description = this.getAttribute("description")?.trim() || "Esta decision puede tener efectos permanentes.";
    const body = this.getAttribute("body")?.trim() || this.textContent?.trim() || "Revisa el impacto antes de continuar.";
    const confirm = this.getAttribute("confirm-label")?.trim() || "Confirmar";
    const cancel = this.getAttribute("cancel-label")?.trim() || "Cancelar";
    this.backdropEl.dataset.variant = variant;
    this.backdropEl.dataset.preview = preview ? "true" : "false";
    this.iconEl.innerHTML = resolveConfirmIcon(variant);
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.bodyEl.textContent = body;
    this.confirmBtn.textContent = confirm;
    this.cancelBtn.textContent = cancel;
    this.dialogEl.setAttribute("aria-modal", preview ? "false" : "true");
  }
};
defineCustomElement("gob-confirm-dialog", GobConfirmDialogElement);

// src/components/card/card-constants.ts
var CARD_VARIANTS = [
  "basic",
  "soft",
  "outline",
  "elevated",
  "media",
  "action",
  "dense",
  "stat",
  "horizontal",
  "complete"
];
var CARD_OBSERVED_ATTRIBUTES = [
  "variant",
  "title",
  "description",
  "body",
  "action-label",
  "meta"
];
function resolveCardVariant(value) {
  if (CARD_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}

// src/components/card/card-styles.ts
var cardStyles = `
:host {
  display: block;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-card-vino: #9f2141;
  --gob-card-dorado: #bc945a;
  --gob-card-title: #181511;
  --gob-card-muted: #6f6a63;
  --gob-card-border: rgba(24, 21, 17, 0.1);
  --gob-card-bg: #ffffff;
  --gob-card-fill: #f3f3f3;
  --gob-card-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: grid;
  gap: 12px;
  width: 100%;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid var(--gob-card-border);
  background: var(--gob-card-bg);
  color: var(--gob-card-title);
  overflow: hidden;
}

.root::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--gob-card-dorado);
  opacity: 0;
}

.meta {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-card-muted);
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-card-muted);
}

.body {
  margin: 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--gob-card-fill);
  font-size: 13px;
  font-weight: 550;
  line-height: 1.45;
}

.media {
  display: none;
  height: 96px;
  border-radius: 12px;
  background: var(--gob-card-fill);
  border: 1px solid rgba(24, 21, 17, 0.06);
}

.footer {
  display: none;
  justify-content: flex-end;
}

.action {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 11px;
  border: 0;
  background: var(--gob-card-vino);
  color: #fff;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
}
.action:hover { background: #7a1832; }

.root[data-variant='soft'] {
  background: var(--gob-card-fill);
  border-color: transparent;
}
.root[data-variant='outline'] {
  border-color: color-mix(in srgb, var(--gob-card-vino) 24%, #d7dde6);
}
.root[data-variant='elevated'] {
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 14px 28px rgba(24, 21, 17, 0.1);
}
.root[data-variant='media'] .media { display: block; }
.root[data-variant='action'] .footer,
.root[data-variant='media'] .footer { display: flex; }
.root[data-variant='dense'] {
  gap: 8px;
  padding: 14px;
  border-radius: 14px;
}
.root[data-variant='dense'] .title { font-size: 14.5px; }
.root[data-variant='dense'] .body { padding: 10px 12px; }
.root[data-variant='stat'] .title {
  font-size: 28px;
  letter-spacing: -0.04em;
}
.root[data-variant='stat'] .description { order: -1; }
.root[data-variant='horizontal'] {
  grid-template-columns: 72px 1fr;
  align-items: center;
}
.root[data-variant='horizontal'] .media {
  display: block;
  height: 72px;
  grid-row: 1 / span 4;
}
.root[data-variant='horizontal'] .meta,
.root[data-variant='horizontal'] .title,
.root[data-variant='horizontal'] .description,
.root[data-variant='horizontal'] .body,
.root[data-variant='horizontal'] .footer {
  grid-column: 2;
}
.root[data-variant='complete']::before { opacity: 1; }
.root[data-variant='complete'] {
  border-color: color-mix(in srgb, var(--gob-card-dorado) 28%, #d7dde6);
}
`;

// src/components/card/gob-card.element.ts
var GobCardElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "mediaEl");
    __publicField(this, "metaEl");
    __publicField(this, "titleEl");
    __publicField(this, "descEl");
    __publicField(this, "bodyEl");
    __publicField(this, "actionBtn");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = cardStyles;
    this.rootEl = document.createElement("article");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.mediaEl = document.createElement("div");
    this.mediaEl.className = "media";
    this.mediaEl.setAttribute("aria-hidden", "true");
    this.mediaEl.setAttribute("part", "media");
    this.metaEl = document.createElement("p");
    this.metaEl.className = "meta";
    this.titleEl = document.createElement("h3");
    this.titleEl.className = "title";
    this.titleEl.setAttribute("part", "title");
    this.descEl = document.createElement("p");
    this.descEl.className = "description";
    this.bodyEl = document.createElement("p");
    this.bodyEl.className = "body";
    this.bodyEl.setAttribute("part", "body");
    const footer = document.createElement("div");
    footer.className = "footer";
    this.actionBtn = document.createElement("button");
    this.actionBtn.type = "button";
    this.actionBtn.className = "action";
    this.actionBtn.setAttribute("part", "action");
    footer.appendChild(this.actionBtn);
    this.rootEl.append(
      this.mediaEl,
      this.metaEl,
      this.titleEl,
      this.descEl,
      this.bodyEl,
      footer
    );
    shadow.append(style, this.rootEl);
    this.actionBtn.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("gob-card", {
          detail: { action: "action" },
          bubbles: true,
          composed: true
        })
      );
    });
  }
  static get observedAttributes() {
    return [...CARD_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveCardVariant(this.getAttribute("variant"));
    const title = this.getAttribute("title")?.trim() || "Tarjeta GobMX";
    const description = this.getAttribute("description")?.trim() || "Contenedor de contenido y acciones.";
    const body = this.getAttribute("body")?.trim() || this.textContent?.trim() || "Resumen breve del expediente o modulo.";
    const meta = this.getAttribute("meta")?.trim() || "Contenido";
    const action = this.getAttribute("action-label")?.trim() || "Ver detalle";
    this.rootEl.dataset.variant = variant;
    this.metaEl.textContent = meta;
    this.titleEl.textContent = title;
    this.descEl.textContent = description;
    this.bodyEl.textContent = body;
    this.actionBtn.textContent = action;
  }
};
defineCustomElement("gob-card", GobCardElement);

// src/components/avatar/avatar-constants.ts
var AVATAR_VARIANTS = [
  "basic",
  "soft",
  "solid",
  "outline",
  "square",
  "status",
  "group",
  "dense",
  "brand",
  "complete"
];
var AVATAR_TONES = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "neutral"
];
var AVATAR_OBSERVED_ATTRIBUTES = [
  "variant",
  "size",
  "tone",
  "name",
  "initials",
  "status"
];
function resolveAvatarVariant(value) {
  if (AVATAR_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function resolveAvatarSize(value) {
  if (value === "sm" || value === "lg") return value;
  return "md";
}
function resolveAvatarTone(value) {
  if (AVATAR_TONES.includes(value ?? "")) {
    return value;
  }
  return "primary";
}
function buildInitials(name, initials) {
  const direct = initials?.trim();
  if (direct) return direct.slice(0, 2).toUpperCase();
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "GM";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

// src/components/avatar/avatar-styles.ts
var avatarStyles = `
:host {
  display: inline-flex;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-av-vino: #9f2141;
  --gob-av-dorado: #bc945a;
  --gob-av-title: #181511;
  --gob-av-muted: #6f6a63;
  --gob-av-border: rgba(24, 21, 17, 0.12);
  --gob-av-fill: #f3f3f3;
  --gob-av-accent: #9f2141;
  --gob-av-accent-soft: color-mix(in srgb, #9f2141 12%, #fff);
  --gob-av-size: 40px;
  --gob-av-font: 13px;
  --gob-av-radius: 999px;
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.face {
  position: relative;
  width: var(--gob-av-size);
  height: var(--gob-av-size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--gob-av-radius);
  background: var(--gob-av-accent-soft);
  color: var(--gob-av-accent);
  border: 1px solid color-mix(in srgb, var(--gob-av-accent) 16%, transparent);
  font-size: var(--gob-av-font);
  font-weight: 780;
  letter-spacing: -0.02em;
  line-height: 1;
  flex: 0 0 auto;
}

.stack {
  display: none;
  align-items: center;
}
.stack .face {
  margin-left: -10px;
  box-shadow: 0 0 0 2px #fff;
}
.stack .face:first-child { margin-left: 0; }

.label {
  display: none;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.name {
  margin: 0;
  font-size: 13px;
  font-weight: 750;
  letter-spacing: -0.02em;
  color: var(--gob-av-title);
  line-height: 1.2;
}
.role {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-av-muted);
}

.dot {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #1f8a55;
  border: 2px solid #fff;
  display: none;
}

.root[data-size='sm'] {
  --gob-av-size: 28px;
  --gob-av-font: 11px;
}
.root[data-size='lg'] {
  --gob-av-size: 52px;
  --gob-av-font: 16px;
}

.root[data-tone='primary'] {
  --gob-av-accent: #9f2141;
  --gob-av-accent-soft: color-mix(in srgb, #9f2141 12%, #fff);
}
.root[data-tone='success'] {
  --gob-av-accent: #1f8a55;
  --gob-av-accent-soft: color-mix(in srgb, #1f8a55 12%, #fff);
}
.root[data-tone='warning'] {
  --gob-av-accent: #b87712;
  --gob-av-accent-soft: color-mix(in srgb, #b87712 13%, #fff);
}
.root[data-tone='danger'] {
  --gob-av-accent: #c62828;
  --gob-av-accent-soft: color-mix(in srgb, #c62828 12%, #fff);
}
.root[data-tone='info'] {
  --gob-av-accent: #2f6fed;
  --gob-av-accent-soft: color-mix(in srgb, #2f6fed 12%, #fff);
}
.root[data-tone='neutral'] {
  --gob-av-accent: #6f6a63;
  --gob-av-accent-soft: #f3f3f3;
}

.root[data-variant='soft'] .face {
  background: var(--gob-av-accent-soft);
  border-color: transparent;
}
.root[data-variant='solid'] .face {
  background: var(--gob-av-accent);
  color: #fff;
  border-color: transparent;
}
.root[data-variant='outline'] .face {
  background: #fff;
  border-color: color-mix(in srgb, var(--gob-av-accent) 35%, #d7dde6);
}
.root[data-variant='square'],
.root[data-variant='square'] .face {
  --gob-av-radius: 12px;
}
.root[data-variant='status'] .dot { display: block; }
.root[data-variant='status'][data-status='busy'] .dot { background: #c62828; }
.root[data-variant='status'][data-status='away'] .dot { background: #b87712; }
.root[data-variant='status'][data-status='offline'] .dot { background: #9ca3af; }

.root[data-variant='group'] .face { display: none; }
.root[data-variant='group'] .stack { display: inline-flex; }

.root[data-variant='dense'] {
  --gob-av-size: 24px;
  --gob-av-font: 10px;
}
.root[data-variant='brand'] .face {
  background: var(--gob-av-vino);
  color: #fff;
  border-color: transparent;
}
.root[data-variant='complete'] .face {
  border-color: color-mix(in srgb, var(--gob-av-dorado) 55%, #d7dde6);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gob-av-dorado) 35%, transparent);
}

.root[data-has-label='true'] .label { display: flex; }
`;

// src/components/avatar/gob-avatar.element.ts
var GobAvatarElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "faceEl");
    __publicField(this, "stackEl");
    __publicField(this, "nameEl");
    __publicField(this, "roleEl");
    __publicField(this, "dotEl");
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = avatarStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    this.faceEl = document.createElement("span");
    this.faceEl.className = "face";
    this.faceEl.setAttribute("part", "face");
    this.dotEl = document.createElement("i");
    this.dotEl.className = "dot";
    this.dotEl.setAttribute("aria-hidden", "true");
    this.faceEl.appendChild(this.dotEl);
    this.stackEl = document.createElement("div");
    this.stackEl.className = "stack";
    this.stackEl.setAttribute("aria-hidden", "true");
    for (const text of ["AM", "LR", "JG"]) {
      const face = document.createElement("span");
      face.className = "face";
      face.textContent = text;
      this.stackEl.appendChild(face);
    }
    const label = document.createElement("div");
    label.className = "label";
    this.nameEl = document.createElement("p");
    this.nameEl.className = "name";
    this.roleEl = document.createElement("p");
    this.roleEl.className = "role";
    this.roleEl.textContent = "Operador";
    label.append(this.nameEl, this.roleEl);
    this.rootEl.append(this.faceEl, this.stackEl, label);
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...AVATAR_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveAvatarVariant(this.getAttribute("variant"));
    const size = resolveAvatarSize(this.getAttribute("size"));
    const tone = resolveAvatarTone(this.getAttribute("tone"));
    const name = this.getAttribute("name")?.trim() || "Ana Morales";
    const initials = buildInitials(name, this.getAttribute("initials"));
    const status = this.getAttribute("status")?.trim() || "online";
    const showLabel = Boolean(this.getAttribute("name")?.trim());
    this.rootEl.dataset.variant = variant;
    this.rootEl.dataset.size = size;
    this.rootEl.dataset.tone = tone;
    this.rootEl.dataset.status = status;
    this.rootEl.dataset.hasLabel = showLabel ? "true" : "false";
    const textNode = Array.from(this.faceEl.childNodes).find(
      (node) => node.nodeType === Node.TEXT_NODE
    );
    if (textNode) textNode.textContent = initials;
    else this.faceEl.insertBefore(document.createTextNode(initials), this.dotEl);
    this.faceEl.setAttribute("aria-label", name);
    this.nameEl.textContent = name;
  }
};
defineCustomElement("gob-avatar", GobAvatarElement);

// src/components/accordion/accordion-constants.ts
var ACCORDION_VARIANTS = [
  "basic",
  "soft",
  "outline",
  "dense",
  "flush",
  "separated",
  "brand",
  "faq",
  "single",
  "complete"
];
var ACCORDION_OBSERVED_ATTRIBUTES = [
  "variant",
  "items",
  "open-index"
];
function resolveAccordionVariant(value) {
  if (ACCORDION_VARIANTS.includes(value ?? "")) {
    return value;
  }
  return "basic";
}
function parseAccordionItems(value) {
  if (!value?.trim()) {
    return [
      {
        title: "Que documentos necesito?",
        body: "CURP, identificacion oficial y comprobante de domicilio vigentes."
      },
      {
        title: "Cuanto tarda el tramite?",
        body: "El tiempo promedio de resolucion es de 5 a 10 dias habiles."
      },
      {
        title: "Puedo dar seguimiento en linea?",
        body: "Si. Con el folio puedes consultar el estatus en la bandeja ciudadana."
      }
    ];
  }
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return parseAccordionItems(null);
    return parsed.map((row) => {
      if (!row || typeof row !== "object") return null;
      const item = row;
      const title = typeof item.title === "string" ? item.title.trim() : "";
      const body = typeof item.body === "string" ? item.body.trim() : "";
      if (!title || !body) return null;
      return { title, body };
    }).filter((row) => Boolean(row));
  } catch {
    return parseAccordionItems(null);
  }
}

// src/components/accordion/accordion-styles.ts
var accordionStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ac-title: #181511;
  --gob-ac-muted: #6f6a63;
  --gob-ac-border: rgba(24, 21, 17, 0.1);
  --gob-ac-bg: #ffffff;
  --gob-ac-fill: #f3f3f3;
  --gob-ac-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: grid;
  gap: 0;
  width: 100%;
  border: 1px solid var(--gob-ac-border);
  border-radius: 16px;
  background: var(--gob-ac-bg);
  overflow: hidden;
}

.item {
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
  background: transparent;
}
.item:last-child { border-bottom: 0; }

.trigger {
  appearance: none;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  min-height: 52px;
  padding: 14px 16px;
  border: 0;
  background: transparent;
  color: var(--gob-ac-title);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 140ms var(--gob-ac-ease);
}
.trigger:hover { background: #fafafa; }
.item[data-open='true'] .trigger { background: #fafafa; }

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.35;
}

.icon {
  width: 18px;
  height: 18px;
  color: var(--gob-ac-muted);
  transition: transform 160ms var(--gob-ac-ease);
}
.icon svg { width: 18px; height: 18px; display: block; }
.item[data-open='true'] .icon { transform: rotate(180deg); }

.panel {
  display: none;
  padding: 0 16px 16px;
}
.item[data-open='true'] .panel { display: block; }

.body {
  margin: 0;
  padding: 0;
  color: var(--gob-ac-muted);
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.55;
}

.root[data-variant='soft'] {
  background: var(--gob-ac-fill);
  border-color: transparent;
}
.root[data-variant='soft'] .trigger:hover,
.root[data-variant='soft'] .item[data-open='true'] .trigger {
  background: rgba(255, 255, 255, 0.55);
}
.root[data-variant='soft'] .body { color: var(--gob-ac-title); }

.root[data-variant='outline'] {
  border-color: rgba(24, 21, 17, 0.14);
}

.root[data-variant='dense'] .trigger {
  min-height: 42px;
  padding: 10px 14px;
}
.root[data-variant='dense'] .title { font-size: 13px; }
.root[data-variant='dense'] .panel { padding: 0 14px 12px; }
.root[data-variant='dense'] .body { font-size: 12.5px; }

.root[data-variant='flush'] {
  border: 0;
  border-radius: 0;
  background: transparent;
}
.root[data-variant='flush'] .item {
  border-bottom: 1px solid var(--gob-ac-border);
}
.root[data-variant='flush'] .trigger:hover,
.root[data-variant='flush'] .item[data-open='true'] .trigger {
  background: transparent;
}

.root[data-variant='separated'] {
  gap: 10px;
  border: 0;
  background: transparent;
  overflow: visible;
}
.root[data-variant='separated'] .item {
  border: 1px solid var(--gob-ac-border);
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
}

.root[data-variant='brand'] .item[data-open='true'] .title {
  color: var(--gob-ac-title);
}
.root[data-variant='brand'] .item[data-open='true'] {
  box-shadow: inset 3px 0 0 #9f2141;
}

.root[data-variant='faq'] .title {
  font-weight: 700;
}

.root[data-variant='complete'] .item[data-open='true'] {
  box-shadow: inset 3px 0 0 #bc945a;
}

@media (prefers-reduced-motion: reduce) {
  .icon { transition: none !important; }
}
`;

// src/components/accordion/gob-accordion.element.ts
var CHEVRON = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
var GobAccordionElement = class extends SafeHTMLElement {
  constructor() {
    super();
    __publicField(this, "rootEl");
    __publicField(this, "openIndex", 0);
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = accordionStyles;
    this.rootEl = document.createElement("div");
    this.rootEl.className = "root";
    this.rootEl.setAttribute("part", "root");
    shadow.append(style, this.rootEl);
  }
  static get observedAttributes() {
    return [...ACCORDION_OBSERVED_ATTRIBUTES];
  }
  connectedCallback() {
    this.syncFromAttributes();
  }
  attributeChangedCallback() {
    this.syncFromAttributes();
  }
  syncFromAttributes() {
    const variant = resolveAccordionVariant(this.getAttribute("variant"));
    const items = parseAccordionItems(this.getAttribute("items"));
    const rawOpen = Number(this.getAttribute("open-index"));
    this.openIndex = Number.isFinite(rawOpen) ? Math.max(0, Math.min(items.length - 1, rawOpen)) : 0;
    const single = variant === "single";
    this.rootEl.dataset.variant = variant;
    this.rootEl.replaceChildren();
    items.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "item";
      row.dataset.open = index === this.openIndex ? "true" : "false";
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "trigger";
      trigger.setAttribute("aria-expanded", index === this.openIndex ? "true" : "false");
      const title = document.createElement("p");
      title.className = "title";
      title.textContent = item.title;
      const icon = document.createElement("span");
      icon.className = "icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = CHEVRON;
      trigger.append(title, icon);
      const panel = document.createElement("div");
      panel.className = "panel";
      const body = document.createElement("p");
      body.className = "body";
      body.textContent = item.body;
      panel.appendChild(body);
      trigger.addEventListener("click", () => {
        const currentlyOpen = row.dataset.open === "true";
        if (single || currentlyOpen === false) {
          Array.from(this.rootEl.children).forEach((child, childIndex) => {
            const el = child;
            const open = childIndex === index && !currentlyOpen;
            el.dataset.open = open ? "true" : "false";
            const btn = el.querySelector(".trigger");
            btn?.setAttribute("aria-expanded", open ? "true" : "false");
          });
          if (!currentlyOpen) this.openIndex = index;
        } else {
          row.dataset.open = "false";
          trigger.setAttribute("aria-expanded", "false");
        }
        this.dispatchEvent(
          new CustomEvent("gob-accordion", {
            detail: { index, open: row.dataset.open === "true" },
            bubbles: true,
            composed: true
          })
        );
      });
      row.append(trigger, panel);
      this.rootEl.appendChild(row);
    });
  }
};
defineCustomElement("gob-accordion", GobAccordionElement);
//# sourceMappingURL=index.js.map