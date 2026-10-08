export const tabsStyles = `
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

/* —— list chrome —— */
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

/* —— tabs —— */
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
