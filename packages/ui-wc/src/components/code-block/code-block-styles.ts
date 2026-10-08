export const codeBlockStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-cb-vino: #9f2141;
  --gob-cb-gold: #bc945a;
  --gob-cb-title: #181511;
  --gob-cb-muted: #6f6a63;
  --gob-cb-fill: #f3f3f3;
  --gob-cb-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  display: grid;
  gap: 0;
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  overflow: hidden;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  background: var(--gob-cb-fill);
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
}

.meta { display: grid; gap: 2px; min-width: 0; }
.filename {
  margin: 0;
  font-size: 12.5px;
  font-weight: 750;
  letter-spacing: -0.01em;
  color: var(--gob-cb-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.language {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--gob-cb-muted);
}

.copy {
  appearance: none;
  border: 1px solid rgba(24, 21, 17, 0.12);
  background: #fff;
  color: var(--gob-cb-title);
  border-radius: 10px;
  min-height: 32px;
  padding: 0 12px;
  font: inherit;
  font-size: 12px;
  font-weight: 750;
  cursor: pointer;
  transition: background 140ms var(--gob-cb-ease), border-color 140ms var(--gob-cb-ease);
}
.copy:hover { background: #fafafa; border-color: rgba(24, 21, 17, 0.2); }
.copy[data-copied='true'] {
  background: #f7eef1;
  border-color: rgba(159, 33, 65, 0.25);
  color: var(--gob-cb-vino);
}

.body {
  margin: 0;
  padding: 16px 18px;
  overflow: auto;
  background: #1c1916;
  color: #f4efe8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12.5px;
  line-height: 1.65;
  white-space: pre;
}

.lines { display: grid; gap: 0; }
.line {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  min-width: max-content;
}
.num {
  display: none;
  color: rgba(244, 239, 232, 0.35);
  text-align: right;
  user-select: none;
  font-variant-numeric: tabular-nums;
}
.code { color: inherit; }

.root[data-variant='soft'] .head { background: #efecea; }
.root[data-variant='soft'] .body { background: #24201c; }

.root[data-variant='dense'] .head { padding: 8px 10px; }
.root[data-variant='dense'] .body { padding: 12px 14px; font-size: 11.5px; }
.root[data-variant='dense'] .copy { min-height: 28px; border-radius: 8px; }

.root[data-variant='outline'] {
  border: 1.5px solid rgba(159, 33, 65, 0.28);
  box-shadow: inset 4px 0 0 var(--gob-cb-vino);
}

.root[data-variant='terminal'] .head {
  background: #151311;
  border-bottom-color: rgba(255,255,255,0.06);
}
.root[data-variant='terminal'] .filename,
.root[data-variant='terminal'] .language { color: rgba(244,239,232,0.75); }
.root[data-variant='terminal'] .copy {
  background: transparent;
  color: #f4efe8;
  border-color: rgba(255,255,255,0.16);
}
.root[data-variant='terminal'] .body { background: #0f0d0b; }

.root[data-variant='numbered'] .line { grid-template-columns: 36px 1fr; }
.root[data-variant='numbered'] .num { display: block; }

.root[data-variant='compact'] { border-radius: 12px; }
.root[data-variant='compact'] .filename { font-size: 12px; }

.root[data-variant='wide'] .body { padding: 20px 22px; font-size: 13px; }

.root[data-variant='brand'] .head {
  background: var(--gob-cb-vino);
  border-bottom-color: transparent;
}
.root[data-variant='brand'] .filename,
.root[data-variant='brand'] .language { color: rgba(255,255,255,0.9); }
.root[data-variant='brand'] .copy {
  background: #fff;
  color: var(--gob-cb-vino);
  border-color: transparent;
}

.root[data-variant='complete'] {
  border-color: rgba(188, 148, 90, 0.35);
  background: #fffaf2;
}
.root[data-variant='complete'] .head {
  background: #f6f0e4;
  border-bottom-color: rgba(188, 148, 90, 0.2);
}
.root[data-variant='complete'] .language { color: #8a6d3a; }
`;
