export const buttonStyles = `
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

/* Dividido — mismo ritmo que Básico; con icono no se comprime ni se estrecha */
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
