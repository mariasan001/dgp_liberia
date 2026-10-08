export const helperTextStyles = `
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
