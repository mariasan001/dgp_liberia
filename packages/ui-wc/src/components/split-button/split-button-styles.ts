export const splitButtonStyles = `
:host {
  display: inline-block;
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sb-vino: #9f2141;
  --gob-sb-vino-deep: #7a1832;
  --gob-sb-dorado: #bc945a;
  --gob-sb-title: #181511;
  --gob-sb-muted: #6f6a63;
  --gob-sb-border: rgba(24, 21, 17, 0.1);
  --gob-sb-fill: #f3f3f3;
  --gob-sb-bg: #ffffff;
  --gob-sb-height: 42px;
  --gob-sb-radius: 14px;
  --gob-sb-font: 13.5px;
  --gob-sb-ease: cubic-bezier(0.22, 1, 0.36, 1);
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

.root[data-size='sm'] { --gob-sb-height: 34px; --gob-sb-radius: 11px; --gob-sb-font: 12px; }
.root[data-size='lg'] { --gob-sb-height: 50px; --gob-sb-radius: 16px; --gob-sb-font: 15px; }
.root[data-variant='dense'] { --gob-sb-height: 36px; --gob-sb-font: 12.5px; --gob-sb-radius: 12px; }

.group {
  display: inline-flex;
  align-items: stretch;
  isolation: isolate;
  overflow: hidden;
  border-radius: var(--gob-sb-radius);
  border: 1px solid var(--gob-sb-border);
  background: var(--gob-sb-bg);
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.03);
  transition: border-color 160ms var(--gob-sb-ease), box-shadow 160ms var(--gob-sb-ease), transform 160ms var(--gob-sb-ease);
}

.root:hover .group {
  border-color: color-mix(in srgb, var(--gob-sb-vino) 22%, var(--gob-sb-border));
}

.root[data-open='true'] .group {
  border-color: color-mix(in srgb, var(--gob-sb-vino) 40%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gob-sb-vino) 12%, transparent);
}

.main,
.caretBtn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--gob-sb-height);
  margin: 0;
  border: 0;
  background: transparent;
  color: var(--gob-sb-title);
  font: inherit;
  font-size: var(--gob-sb-font);
  font-weight: 700;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: background 160ms var(--gob-sb-ease), color 160ms var(--gob-sb-ease);
}

.main {
  gap: 8px;
  padding: 0 18px;
}

.caretBtn {
  position: relative;
  width: calc(var(--gob-sb-height) + 2px);
  color: var(--gob-sb-muted);
}

.caretBtn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 22%;
  bottom: 22%;
  width: 1px;
  background: var(--gob-sb-border);
}

.main:hover:not(:disabled),
.caretBtn:hover:not(:disabled) {
  background: #f3f3f3;
  color: var(--gob-sb-vino-deep);
}

.main:active:not(:disabled),
.caretBtn:active:not(:disabled) {
  background: color-mix(in srgb, var(--gob-sb-vino) 8%, #f3f3f3);
}

.main:focus-visible,
.caretBtn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-sb-vino) 45%, transparent);
  outline-offset: -2px;
  z-index: 1;
}

.main:disabled,
.caretBtn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* solid */
.root[data-variant='solid'] .group {
  background: var(--gob-sb-vino);
  border-color: var(--gob-sb-vino);
  box-shadow: none;
}
.root[data-variant='solid'] .main,
.root[data-variant='solid'] .caretBtn { color: #fff; }
.root[data-variant='solid'] .caretBtn::before {
  background: rgba(255, 255, 255, 0.22);
}
.root[data-variant='solid'] .main:hover:not(:disabled),
.root[data-variant='solid'] .caretBtn:hover:not(:disabled) {
  background: color-mix(in srgb, #000 12%, transparent);
  color: #fff;
}
.root[data-variant='solid'][data-open='true'] .group {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gob-sb-vino) 22%, transparent);
}

/* soft */
.root[data-variant='soft'] .group {
  background: color-mix(in srgb, var(--gob-sb-vino) 9%, #fff);
  border-color: color-mix(in srgb, var(--gob-sb-vino) 14%, transparent);
}
.root[data-variant='soft'] .main,
.root[data-variant='soft'] .caretBtn { color: var(--gob-sb-vino-deep); }
.root[data-variant='soft'] .main:hover:not(:disabled),
.root[data-variant='soft'] .caretBtn:hover:not(:disabled) {
  background: color-mix(in srgb, var(--gob-sb-vino) 14%, #fff);
}

/* outline / bordered */
.root[data-variant='outline'] .group,
.root[data-variant='bordered'] .group {
  background: var(--gob-sb-bg);
  border-color: var(--gob-sb-border);
}
.root[data-variant='bordered'] .group {
  border-width: 1.5px;
}

/* ghost */
.root[data-variant='ghost'] .group {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
}
.root[data-variant='ghost'] .main,
.root[data-variant='ghost'] .caretBtn { color: var(--gob-sb-muted); }
.root[data-variant='ghost'] .caretBtn::before { background: rgba(24, 21, 17, 0.08); }
.root[data-variant='ghost'] .main:hover:not(:disabled),
.root[data-variant='ghost'] .caretBtn:hover:not(:disabled) {
  background: rgba(24, 21, 17, 0.05);
  color: var(--gob-sb-title);
}

/* tonal */
.root[data-variant='tonal'] .group {
  background: color-mix(in srgb, var(--gob-sb-dorado) 16%, #fff);
  border-color: color-mix(in srgb, var(--gob-sb-dorado) 34%, transparent);
}
.root[data-variant='tonal'] .main,
.root[data-variant='tonal'] .caretBtn { color: #3d3428; }

/* danger */
.root[data-variant='danger'] .group {
  background: color-mix(in srgb, #c62828 8%, #fff);
  border-color: color-mix(in srgb, #c62828 22%, transparent);
}
.root[data-variant='danger'] .main,
.root[data-variant='danger'] .caretBtn { color: #c62828; }
.root[data-variant='danger'] .main:hover:not(:disabled),
.root[data-variant='danger'] .caretBtn:hover:not(:disabled) {
  background: color-mix(in srgb, #c62828 14%, #fff);
}

/* complete */
.root[data-variant='complete'] .group {
  background: var(--gob-sb-bg);
  border-color: var(--gob-sb-border);
  border-left: 3px solid var(--gob-sb-dorado);
}
.root[data-variant='complete'] .main,
.root[data-variant='complete'] .caretBtn { color: var(--gob-sb-vino-deep); }

/* basic uses fill track */
.root[data-variant='basic'] .group,
.root[data-variant='dense'] .group {
  background: var(--gob-sb-fill);
  border-color: transparent;
}
.root[data-variant='basic']:hover .group,
.root[data-variant='dense']:hover .group {
  border-color: transparent;
  background: color-mix(in srgb, var(--gob-sb-vino) 6%, #f3f3f3);
}

.caret {
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  transition: transform 180ms var(--gob-sb-ease), background 160ms var(--gob-sb-ease);
}
.caret svg { width: 12px; height: 12px; display: block; }
.root[data-open='true'] .caret { transform: rotate(180deg); }
.root[data-variant='solid'] .caretBtn:hover:not(:disabled) .caret {
  background: rgba(255, 255, 255, 0.12);
}

.menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 30;
  min-width: max(240px, 100%);
  padding: 8px;
  border-radius: 16px;
  border: 1px solid var(--gob-sb-border);
  background: var(--gob-sb-bg);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 18px 40px rgba(24, 21, 17, 0.12);
  display: none;
  gap: 2px;
  transform-origin: top left;
  animation: gob-sb-in 160ms var(--gob-sb-ease);
}

.root[data-open='true'] .menu { display: grid; }

.root[data-variant='complete'] .menu {
  border-left: 3px solid var(--gob-sb-dorado);
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
  color: var(--gob-sb-title);
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.015em;
  text-align: left;
  cursor: pointer;
  transition: background 140ms var(--gob-sb-ease), color 140ms var(--gob-sb-ease), transform 140ms var(--gob-sb-ease);
}

.item:hover:not(:disabled) {
  background: #f3f3f3;
  color: var(--gob-sb-vino-deep);
}

.item:active:not(:disabled) {
  transform: scale(0.985);
}

.item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-sb-vino) 40%, transparent);
  outline-offset: 1px;
}

.item:disabled {
  opacity: 0.4;
  cursor: not-allowed;
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
  color: var(--gob-sb-vino-deep);
}
.item:hover:not(:disabled) .icon {
  background: color-mix(in srgb, var(--gob-sb-vino) 10%, #fff);
}
.icon svg { width: 15px; height: 15px; display: block; }

@keyframes gob-sb-in {
  from { opacity: 0; transform: translateY(-4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
`;
