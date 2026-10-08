export const segmentedStyles = `
:host {
  display: inline-block;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sg-vino: #9f2141;
  --gob-sg-vino-deep: #7a1832;
  --gob-sg-dorado: #bc945a;
  --gob-sg-title: #181511;
  --gob-sg-muted: #6f6a63;
  --gob-sg-border: rgba(24, 21, 17, 0.1);
  --gob-sg-bg: #ffffff;
  --gob-sg-fill: #f3f3f3;
  --gob-sg-height: 38px;
  --gob-sg-radius: 12px;
  --gob-sg-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: inline-flex;
  max-width: 100%;
  min-width: 0;
}

.root[data-size='sm'] { --gob-sg-height: 32px; --gob-sg-radius: 10px; }
.root[data-size='lg'] { --gob-sg-height: 44px; --gob-sg-radius: 14px; }
.root[data-variant='dense'] { --gob-sg-height: 30px; }

.list {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 3px;
  margin: 0;
  padding: 4px;
  list-style: none;
  border-radius: calc(var(--gob-sg-radius) + 2px);
  background: var(--gob-sg-fill);
  min-width: 0;
}

.root[data-variant='underline'] .list,
.root[data-variant='ghost'] .list {
  padding: 0;
  background: transparent;
  border-radius: 0;
  border-bottom: 1px solid var(--gob-sg-border);
  gap: 0;
}

.root[data-variant='bordered'] .list {
  background: var(--gob-sg-bg);
  border: 1px solid var(--gob-sg-border);
  padding: 0;
  gap: 0;
  overflow: hidden;
}

.root[data-variant='block'] {
  display: block;
  width: 100%;
}
.root[data-variant='block'] .list {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  width: 100%;
}

.root[data-variant='complete'] .list {
  border: 1px solid var(--gob-sg-border);
  background: var(--gob-sg-bg);
  border-left: 3px solid var(--gob-sg-dorado);
}

.item {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: var(--gob-sg-height);
  padding: 0 14px;
  border: 0;
  border-radius: calc(var(--gob-sg-radius) - 2px);
  background: transparent;
  color: var(--gob-sg-muted);
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.015em;
  cursor: pointer;
  white-space: nowrap;
  transition: color 150ms var(--gob-sg-ease), background 150ms var(--gob-sg-ease), box-shadow 150ms var(--gob-sg-ease);
}

.item:hover:not(:disabled) {
  color: var(--gob-sg-title);
}

.item[aria-pressed='true'] {
  background: #fff;
  color: var(--gob-sg-vino-deep);
  box-shadow: 0 1px 2px rgba(24, 21, 17, 0.08);
  font-weight: 700;
}

.item:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.item:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-sg-vino) 40%, transparent);
  outline-offset: 2px;
}

.root[data-variant='soft'] .item[aria-pressed='true'] {
  background: color-mix(in srgb, var(--gob-sg-vino) 12%, #fff);
  box-shadow: none;
}

.root[data-variant='underline'] .item,
.root[data-variant='ghost'] .item {
  border-radius: 0;
  box-shadow: inset 0 -2px 0 transparent;
  background: transparent;
}
.root[data-variant='underline'] .item[aria-pressed='true'],
.root[data-variant='ghost'] .item[aria-pressed='true'] {
  background: transparent;
  box-shadow: inset 0 -2px 0 var(--gob-sg-vino);
  color: var(--gob-sg-vino);
}

.root[data-variant='bordered'] .item {
  border-radius: 0;
  flex: 1 1 auto;
  border-right: 1px solid var(--gob-sg-border);
}
.root[data-variant='bordered'] .item:last-child { border-right: 0; }
.root[data-variant='bordered'] .item[aria-pressed='true'] {
  background: color-mix(in srgb, var(--gob-sg-dorado) 14%, #fff);
  color: var(--gob-sg-title);
  box-shadow: none;
}

.root[data-variant='icons'] .item { gap: 8px; }

.icon {
  width: 15px;
  height: 15px;
  display: inline-flex;
  flex: 0 0 auto;
  opacity: 0.7;
  color: currentColor;
}
.icon svg { width: 15px; height: 15px; display: block; }
.item[aria-pressed='true'] .icon {
  opacity: 1;
  color: var(--gob-sg-dorado);
}

.root[data-disabled='true'] { opacity: 0.55; pointer-events: none; }
`;
