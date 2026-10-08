export const formFieldStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ff-vino: #9f2141;
  --gob-ff-vino-deep: #7a1832;
  --gob-ff-dorado: #bc945a;
  --gob-ff-title: #181511;
  --gob-ff-muted: #8a8278;
  --gob-ff-text: #3d3a35;
  --gob-ff-border: rgba(24, 21, 17, 0.12);
  --gob-ff-focus: var(--gob-ff-vino);
  --gob-ff-ring: rgba(159, 33, 65, 0.16);
  --gob-ff-bg: #ffffff;
  --gob-ff-fill: #faf9f7;
  --gob-ff-radius: 14px;
  --gob-ff-gap: 8px;
  --gob-ff-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: var(--gob-ff-gap);
  min-width: 0;
}

.root[data-size='sm'] { --gob-ff-gap: 6px; }
.root[data-size='lg'] { --gob-ff-gap: 10px; }
.root[data-variant='dense'] { --gob-ff-gap: 4px; }

.root[data-status='error'] { --gob-ff-focus: #c62828; --gob-ff-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-ff-focus: #1f8a55; --gob-ff-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-ff-focus: #d0921a; --gob-ff-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-ff-focus: #2f5f8a; --gob-ff-ring: rgba(47,95,138,.16); }

.head {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.label {
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-ff-title);
}

.label .req {
  color: var(--gob-ff-vino);
  margin-left: 2px;
}

.hint {
  margin: 0;
  flex: 0 0 auto;
  font-size: 11px;
  font-weight: 600;
  color: var(--gob-ff-muted);
}

.pill {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-ff-focus);
  background: color-mix(in srgb, var(--gob-ff-focus) 12%, #fff);
}

.control {
  min-width: 0;
  flex: 1 1 auto;
}

.control-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;
  align-items: end;
  min-width: 0;
}

.root[data-variant='inline'] .control-row {
  grid-template-columns: minmax(0, 1fr) auto;
}

.control ::slotted(*) {
  width: 100%;
  max-width: 100%;
}

.fallback {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border-radius: var(--gob-ff-radius);
  border: 1px solid var(--gob-ff-border);
  background: var(--gob-ff-bg);
  color: var(--gob-ff-muted);
  font-size: 14px;
  font-weight: 500;
}

.root[data-variant='soft'] .fallback {
  background: color-mix(in srgb, var(--gob-ff-vino) 6%, #fff);
  border-color: color-mix(in srgb, var(--gob-ff-vino) 18%, #ebe6df);
}

.root[data-size='sm'] .fallback { min-height: 40px; }
.root[data-size='lg'] .fallback { min-height: 56px; }
.root[data-variant='dense'] .fallback { min-height: 36px; border-radius: 10px; }

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-ff-muted);
  line-height: 1.4;
}

.root[data-status='error'] .helper,
.root[data-status='success'] .helper,
.root[data-status='warning'] .helper,
.root[data-status='info'] .helper {
  color: var(--gob-ff-focus);
  font-weight: 600;
}

.root[data-variant='horizontal'] {
  grid-template-columns: minmax(110px, 160px) minmax(0, 1fr);
  align-items: start;
  column-gap: 16px;
}
.root[data-variant='horizontal'] .head {
  padding-top: 14px;
}
.root[data-variant='horizontal'] .helper {
  grid-column: 2;
}
.root[data-variant='horizontal'] .control-row {
  grid-column: 2;
  grid-row: 1;
}
.root[data-variant='horizontal'] .head {
  grid-column: 1;
  grid-row: 1;
}

.root[data-variant='stacked'] {
  gap: 12px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid var(--gob-ff-border);
  background: var(--gob-ff-fill);
}

.root[data-variant='inline'] {
  /* control-row handles the end action */
}
.root[data-variant='inline'] .helper {
  grid-column: 1 / -1;
}

.root[data-variant='complete'] {
  gap: 8px;
  padding: 2px 0 2px 14px;
  border: 0;
  border-radius: 0;
  border-left: 3px solid var(--gob-ff-focus);
  background: transparent;
}
.root[data-variant='complete'] .label {
  font-size: 13px;
}
.root[data-variant='complete'][data-status='default'] {
  border-left-color: var(--gob-ff-dorado);
}

.root[data-disabled='true'] {
  opacity: 0.55;
  pointer-events: none;
}
`;
