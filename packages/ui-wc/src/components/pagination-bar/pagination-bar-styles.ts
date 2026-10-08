export const paginationBarStyles = `
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
