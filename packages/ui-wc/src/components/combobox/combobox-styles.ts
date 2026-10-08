export const comboboxStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-cb-vino: #9f2141;
  --gob-cb-dorado: #bc945a;
  --gob-cb-title: #181511;
  --gob-cb-muted: #8a8278;
  --gob-cb-text: #3d3a35;
  --gob-cb-border: rgba(24, 21, 17, 0.12);
  --gob-cb-border-hover: rgba(24, 21, 17, 0.22);
  --gob-cb-focus: var(--gob-cb-vino);
  --gob-cb-ring: rgba(159, 33, 65, 0.18);
  --gob-cb-bg: #ffffff;
  --gob-cb-fill: #faf9f7;
  --gob-cb-radius: 14px;
  --gob-cb-height: 50px;
  --gob-cb-pad-x: 14px;
  --gob-cb-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --gob-cb-panel-shadow:
    0 18px 40px rgba(24, 21, 17, 0.14),
    0 2px 8px rgba(24, 21, 17, 0.06);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  position: relative;
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-cb-height: 40px;
  --gob-cb-radius: 12px;
  --gob-cb-pad-x: 12px;
}
.root[data-size='lg'] {
  --gob-cb-height: 58px;
  --gob-cb-radius: 16px;
  --gob-cb-pad-x: 16px;
}
.root[data-variant='dense'] {
  --gob-cb-height: 38px;
  --gob-cb-radius: 10px;
  gap: 6px;
}

.root[data-status='error'] { --gob-cb-focus: #c62828; --gob-cb-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-cb-focus: #1f8a55; --gob-cb-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-cb-focus: #d0921a; --gob-cb-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-cb-focus: #2f5f8a; --gob-cb-ring: rgba(47,95,138,.16); }

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-cb-title);
}
.label .req { color: var(--gob-cb-vino); margin-left: 2px; }

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.pill {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-cb-vino);
}
.root[data-status='error'] .pill { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill { background: rgba(47,95,138,.12); color: #2f5f8a; }

.control {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: var(--gob-cb-height);
  padding: 0 calc(var(--gob-cb-pad-x) + 34px) 0 var(--gob-cb-pad-x);
  border: 1.5px solid var(--gob-cb-border);
  border-radius: var(--gob-cb-radius);
  background: var(--gob-cb-bg);
  transition:
    border-color 180ms var(--gob-cb-ease),
    box-shadow 180ms var(--gob-cb-ease),
    background 180ms var(--gob-cb-ease),
    transform 180ms var(--gob-cb-ease);
}
.control:hover { border-color: var(--gob-cb-border-hover); }
.root[data-open='true'] .control,
.root[data-focused='true'] .control {
  border-color: var(--gob-cb-focus);
  box-shadow: 0 0 0 4px var(--gob-cb-ring);
  background: #fff;
}
.root[data-open='true'] .control { transform: translateY(-1px); }
.root[data-status='error'] .control { border-color: color-mix(in srgb, #c62828 55%, var(--gob-cb-border)); }
.root[data-status='success'] .control { border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-cb-border)); }
.root[data-status='warning'] .control { border-color: color-mix(in srgb, #d0921a 55%, var(--gob-cb-border)); }
.root[data-disabled='true'] .control {
  background: var(--gob-cb-fill);
  opacity: 0.72;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.lead {
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: var(--gob-cb-dorado);
  background: color-mix(in srgb, var(--gob-cb-dorado) 14%, transparent);
}
.lead svg { width: 16px; height: 16px; display: block; }
.root[data-open='true'] .lead,
.root[data-focused='true'] .lead {
  color: var(--gob-cb-vino);
  background: color-mix(in srgb, var(--gob-cb-vino) 12%, transparent);
}

.field-wrap {
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  gap: 1px;
}

.field {
  appearance: none;
  width: 100%;
  min-width: 0;
  height: 24px;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--gob-cb-title);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.015em;
}
.field::placeholder {
  color: #b0aaa1;
  font-weight: 500;
}
.field:disabled {
  cursor: not-allowed;
  color: var(--gob-cb-muted);
}

.meta {
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-cb-muted);
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trail {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.clear, .chevron-btn {
  appearance: none;
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gob-cb-muted);
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease, transform 200ms var(--gob-cb-ease);
}
.clear {
  background: rgba(24, 21, 17, 0.06);
  opacity: 0;
  pointer-events: none;
}
.root[data-filled='true']:not([data-disabled='true']) .control:hover .clear,
.root[data-open='true'][data-filled='true'] .clear,
.root[data-focused='true'][data-filled='true'] .clear {
  opacity: 1;
  pointer-events: auto;
}
.clear:hover { background: rgba(159, 33, 65, 0.12); color: var(--gob-cb-vino); }
.clear svg, .chevron-btn svg { width: 14px; height: 14px; }
.root[data-open='true'] .chevron-btn {
  transform: rotate(180deg);
  color: var(--gob-cb-vino);
  background: color-mix(in srgb, var(--gob-cb-vino) 10%, transparent);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(159, 33, 65, 0.18);
  border-top-color: var(--gob-cb-vino);
  border-radius: 999px;
  animation: gob-cb-spin 700ms linear infinite;
}
@keyframes gob-cb-spin { to { transform: rotate(360deg); } }

.float-label {
  position: absolute;
  left: var(--gob-cb-pad-x);
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  transition:
    top 180ms var(--gob-cb-ease),
    transform 180ms var(--gob-cb-ease),
    font-size 180ms var(--gob-cb-ease),
    color 180ms var(--gob-cb-ease);
}
.root[data-variant='floating'] .control {
  align-items: flex-end;
  min-height: 60px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.root[data-variant='floating'] .field[data-empty='true'] { opacity: 0; }
.root[data-variant='floating'][data-open='true'] .field[data-empty='true'],
.root[data-variant='floating'][data-focused='true'] .field[data-empty='true'] { opacity: 1; }
.root[data-variant='floating']:has(.lead:not([hidden])) .float-label {
  left: calc(var(--gob-cb-pad-x) + 40px);
}
.root[data-variant='floating'][data-open='true'] .float-label,
.root[data-variant='floating'][data-focused='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  transform: none;
  font-size: 11px;
  font-weight: 700;
  color: var(--gob-cb-dorado);
}

.root[data-variant='filled'] .control {
  background: var(--gob-cb-fill);
  border-color: transparent;
}
.root[data-variant='filled'] .control:hover { background: #f3f1ec; }
.root[data-variant='filled'][data-open='true'] .control,
.root[data-variant='filled'][data-focused='true'] .control {
  background: #fff;
  border-color: var(--gob-cb-focus);
}

.root[data-variant='soft'] .control {
  border-color: transparent;
  background: color-mix(in srgb, var(--gob-cb-vino) 7%, #fff);
}
.root[data-variant='soft'] .control:hover {
  background: color-mix(in srgb, var(--gob-cb-vino) 11%, #fff);
}
.root[data-variant='soft'][data-open='true'] .control,
.root[data-variant='soft'][data-focused='true'] .control {
  background: #fff;
  border-color: var(--gob-cb-focus);
}
.root[data-variant='soft'] .lead {
  color: var(--gob-cb-vino);
  background: color-mix(in srgb, var(--gob-cb-vino) 12%, transparent);
}

.root[data-variant='pill'] .control {
  border-radius: 999px;
  padding-left: 18px;
}
.root[data-variant='pill'] .lead { border-radius: 999px; }

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-cb-muted);
  line-height: 1.35;
}
.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.panel {
  position: absolute;
  z-index: 40;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  max-height: 280px;
  overflow: hidden;
  border: 1px solid rgba(24, 21, 17, 0.08);
  border-radius: 16px;
  background: #fff;
  box-shadow: var(--gob-cb-panel-shadow);
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  pointer-events: none;
  transition: opacity 160ms var(--gob-cb-ease), transform 180ms var(--gob-cb-ease);
}
.root[data-open='true'] .panel {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.root[data-variant='pill'] .panel { border-radius: 20px; }

.list {
  overflow: auto;
  max-height: 280px;
  padding: 6px;
  overscroll-behavior: contain;
}

.option {
  display: grid;
  grid-template-columns: 22px 1fr auto;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 42px;
  padding: 8px 10px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--gob-cb-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 120ms ease;
}
.option:hover,
.option[data-active='true'] {
  background: color-mix(in srgb, var(--gob-cb-vino) 7%, #fff);
}
.option[data-selected='true'] {
  background: color-mix(in srgb, var(--gob-cb-vino) 10%, #fff);
  color: var(--gob-cb-vino);
}
.option[data-disabled='true'] { opacity: 0.45; cursor: not-allowed; }

.check {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1.5px solid rgba(24, 21, 17, 0.14);
  color: transparent;
  background: #fff;
}
.option[data-selected='true'] .check {
  border-color: var(--gob-cb-vino);
  background: var(--gob-cb-vino);
  color: #fff;
}
.check svg { width: 11px; height: 11px; }

.option-text { min-width: 0; display: grid; gap: 1px; }
.option-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.01em;
}
.option-hint {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-cb-muted);
}
.option-badge {
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  color: var(--gob-cb-dorado);
  background: color-mix(in srgb, var(--gob-cb-dorado) 16%, transparent);
}

.create {
  display: grid;
  grid-template-columns: 22px 1fr;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 42px;
  padding: 8px 10px;
  border: 0;
  border-radius: 12px;
  background: color-mix(in srgb, var(--gob-cb-dorado) 10%, #fff);
  color: #7a5a2e;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}
.create:hover { background: color-mix(in srgb, var(--gob-cb-dorado) 18%, #fff); }
.create svg { width: 16px; height: 16px; }

.empty, .loading-msg {
  margin: 0;
  padding: 22px 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--gob-cb-muted);
}

.native {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;
