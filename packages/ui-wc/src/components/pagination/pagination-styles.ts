export const paginationStyles = `
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
