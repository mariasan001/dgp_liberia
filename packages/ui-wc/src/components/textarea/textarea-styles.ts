export const textareaStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ta-vino: #9f2141;
  --gob-ta-dorado: #bc945a;
  --gob-ta-title: #181511;
  --gob-ta-muted: #8a8278;
  --gob-ta-text: #3d3a35;
  --gob-ta-border: rgba(24, 21, 17, 0.12);
  --gob-ta-border-hover: rgba(24, 21, 17, 0.22);
  --gob-ta-focus: var(--gob-ta-vino);
  --gob-ta-ring: rgba(159, 33, 65, 0.16);
  --gob-ta-bg: #ffffff;
  --gob-ta-fill: #faf9f7;
  --gob-ta-radius: 14px;
  --gob-ta-pad-x: 14px;
  --gob-ta-pad-y: 12px;
  --gob-ta-min-h: 112px;
  --gob-ta-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

[hidden] {
  display: none !important;
}

.root {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-ta-radius: 12px;
  --gob-ta-pad-x: 12px;
  --gob-ta-pad-y: 10px;
  --gob-ta-min-h: 88px;
}
.root[data-size='lg'] {
  --gob-ta-radius: 16px;
  --gob-ta-pad-x: 16px;
  --gob-ta-pad-y: 14px;
  --gob-ta-min-h: 148px;
}
.root[data-variant='dense'] {
  --gob-ta-radius: 10px;
  --gob-ta-pad-x: 10px;
  --gob-ta-pad-y: 8px;
  --gob-ta-min-h: 72px;
  gap: 6px;
}

.root[data-status='error'] {
  --gob-ta-focus: #c62828;
  --gob-ta-ring: rgba(198, 40, 40, 0.16);
}
.root[data-status='success'] {
  --gob-ta-focus: #1f8a55;
  --gob-ta-ring: rgba(31, 138, 85, 0.16);
}
.root[data-status='warning'] {
  --gob-ta-focus: #d0921a;
  --gob-ta-ring: rgba(208, 146, 26, 0.18);
}
.root[data-status='info'] {
  --gob-ta-focus: #2f5f8a;
  --gob-ta-ring: rgba(47, 95, 138, 0.16);
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-ta-title);
}

.label .req {
  color: var(--gob-ta-vino);
  margin-left: 2px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.pill {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-ta-vino);
}
.root[data-status='error'] .pill {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
}
.root[data-status='success'] .pill {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
}
.root[data-status='warning'] .pill {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
}
.root[data-status='info'] .pill {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
}

.control {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: var(--gob-ta-min-h);
  padding: var(--gob-ta-pad-y) var(--gob-ta-pad-x);
  border: 1.5px solid var(--gob-ta-border);
  border-radius: var(--gob-ta-radius);
  background: var(--gob-ta-bg);
  transition:
    border-color 180ms var(--gob-ta-ease),
    box-shadow 180ms var(--gob-ta-ease),
    background 180ms var(--gob-ta-ease);
}

.control:hover {
  border-color: var(--gob-ta-border-hover);
}

.root[data-focused='true'] .control {
  border-color: var(--gob-ta-focus);
  box-shadow: 0 0 0 4px var(--gob-ta-ring);
  background: #ffffff;
}

.root[data-status='error'] .control {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-ta-border));
}
.root[data-status='success'] .control {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-ta-border));
}
.root[data-status='warning'] .control {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-ta-border));
}

.root[data-disabled='true'] .control {
  background: var(--gob-ta-fill);
  opacity: 0.72;
  cursor: not-allowed;
}
.root[data-readonly='true'] .control {
  background: var(--gob-ta-fill);
}

.field {
  appearance: none;
  display: block;
  width: 100%;
  min-height: calc(var(--gob-ta-min-h) - (var(--gob-ta-pad-y) * 2));
  border: 0;
  outline: none;
  resize: none;
  background: transparent;
  color: var(--gob-ta-text);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.5;
}

.field::placeholder {
  color: #b0aaa1;
  font-weight: 500;
}

.field:disabled {
  cursor: not-allowed;
  color: var(--gob-ta-muted);
}

.foot {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.helper {
  margin: 0;
  flex: 1 1 auto;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-ta-muted);
  line-height: 1.35;
}

.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.counter {
  flex: 0 0 auto;
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-ta-muted);
  font-variant-numeric: tabular-nums;
}

.counter[data-warn='true'] {
  color: #a87412;
}
.counter[data-over='true'] {
  color: #c62828;
}

.float-label {
  position: absolute;
  left: var(--gob-ta-pad-x);
  top: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  transition:
    top 180ms var(--gob-ta-ease),
    font-size 180ms var(--gob-ta-ease),
    color 180ms var(--gob-ta-ease);
}

.root[data-variant='floating'] .control {
  padding-top: 26px;
  min-height: 128px;
}
.root[data-variant='floating'][data-focused='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  font-size: 11px;
  font-weight: 700;
  color: var(--gob-ta-dorado);
}

.root[data-variant='filled'] .control {
  background: var(--gob-ta-fill);
  border-color: transparent;
}
.root[data-variant='filled'] .control:hover {
  background: #f3f1ec;
  border-color: transparent;
}
.root[data-variant='filled'][data-focused='true'] .control {
  background: #ffffff;
  border-color: var(--gob-ta-focus);
}

.root[data-variant='soft'] .control {
  border-color: transparent;
  background: color-mix(in srgb, var(--gob-ta-vino) 7%, #ffffff);
}
.root[data-variant='soft'] .control:hover {
  background: color-mix(in srgb, var(--gob-ta-vino) 11%, #ffffff);
  border-color: transparent;
}
.root[data-variant='soft'][data-focused='true'] .control {
  background: #ffffff;
  border-color: var(--gob-ta-focus);
}

.root[data-variant='resize'] .field {
  resize: vertical;
  min-height: 96px;
}

.root[data-variant='code'] .control {
  border-radius: 16px;
  background: #181511;
  border-color: #181511;
}
.root[data-variant='code'] .field {
  color: #f4f1ec;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0;
}
.root[data-variant='code'] .field::placeholder {
  color: rgba(244, 241, 236, 0.45);
}
.root[data-variant='code'][data-focused='true'] .control {
  box-shadow: 0 0 0 4px rgba(188, 148, 90, 0.28);
  border-color: var(--gob-ta-dorado);
}
.root[data-variant='code'] .helper,
.root[data-variant='code'] .counter {
  color: var(--gob-ta-muted);
}

.root[data-variant='auto'] .field {
  overflow: hidden;
}
`;
