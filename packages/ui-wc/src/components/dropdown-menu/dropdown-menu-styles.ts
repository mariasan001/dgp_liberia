export const dropdownMenuStyles = `
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
