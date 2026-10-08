export const navMenuStyles = `
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

/* —— shell variants —— */
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

/* —— items —— */
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
