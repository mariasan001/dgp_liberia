export const inputStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-in-vino: #9f2141;
  --gob-in-dorado: #bc945a;
  --gob-in-title: #181511;
  --gob-in-muted: #8a8278;
  --gob-in-text: #3d3a35;
  --gob-in-border: rgba(24, 21, 17, 0.12);
  --gob-in-border-hover: rgba(24, 21, 17, 0.22);
  --gob-in-focus: var(--gob-in-vino);
  --gob-in-ring: rgba(159, 33, 65, 0.16);
  --gob-in-bg: #ffffff;
  --gob-in-fill: #faf9f7;
  --gob-in-radius: 14px;
  --gob-in-height: 48px;
  --gob-in-pad-x: 14px;
  --gob-in-ease: cubic-bezier(0.22, 1, 0.36, 1);
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
  --gob-in-height: 40px;
  --gob-in-radius: 12px;
  --gob-in-pad-x: 12px;
}
.root[data-size='lg'] {
  --gob-in-height: 56px;
  --gob-in-radius: 16px;
  --gob-in-pad-x: 16px;
}
.root[data-variant='dense'] {
  --gob-in-height: 38px;
  --gob-in-radius: 10px;
  gap: 6px;
}

.root[data-status='error'] {
  --gob-in-focus: #c62828;
  --gob-in-ring: rgba(198, 40, 40, 0.16);
}
.root[data-status='success'] {
  --gob-in-focus: #1f8a55;
  --gob-in-ring: rgba(31, 138, 85, 0.16);
}
.root[data-status='warning'] {
  --gob-in-focus: #d0921a;
  --gob-in-ring: rgba(208, 146, 26, 0.18);
}
.root[data-status='info'] {
  --gob-in-focus: #2f5f8a;
  --gob-in-ring: rgba(47, 95, 138, 0.16);
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-in-title);
}

.label .req {
  color: var(--gob-in-vino);
  margin-left: 2px;
}

.control {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  min-height: var(--gob-in-height);
  padding: 0 var(--gob-in-pad-x);
  border: 1.5px solid var(--gob-in-border);
  border-radius: var(--gob-in-radius);
  background: var(--gob-in-bg);
  transition:
    border-color 180ms var(--gob-in-ease),
    box-shadow 180ms var(--gob-in-ease),
    background 180ms var(--gob-in-ease);
}

.control:hover {
  border-color: var(--gob-in-border-hover);
}

.root[data-focused='true'] .control {
  border-color: var(--gob-in-focus);
  box-shadow: 0 0 0 4px var(--gob-in-ring);
  background: #ffffff;
}

.root[data-status='error'] .control {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-in-border));
}
.root[data-status='success'] .control {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-in-border));
}
.root[data-status='warning'] .control {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-in-border));
}

.root[data-disabled='true'] .control {
  background: var(--gob-in-fill);
  opacity: 0.72;
  cursor: not-allowed;
}
.root[data-readonly='true'] .control {
  background: var(--gob-in-fill);
}

.affix {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gob-in-dorado);
  font-size: 13px;
  font-weight: 700;
}

.affix svg {
  width: 18px;
  height: 18px;
  display: block;
}

.root[data-size='sm'] .affix svg {
  width: 16px;
  height: 16px;
}

.field {
  appearance: none;
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  height: calc(var(--gob-in-height) - 4px);
  border: 0;
  outline: none;
  background: transparent;
  color: var(--gob-in-text);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.field::placeholder {
  color: #b0aaa1;
  font-weight: 500;
}

.field:disabled {
  cursor: not-allowed;
  color: var(--gob-in-muted);
}

.toggle {
  appearance: none;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gob-in-muted);
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
}
.toggle:hover {
  background: rgba(188, 148, 90, 0.12);
  color: #7a5a2e;
}
.toggle:focus-visible {
  outline: 2px solid var(--gob-in-ring);
  outline-offset: 1px;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-in-muted);
  line-height: 1.35;
}

.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

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
  color: var(--gob-in-vino);
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

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

/* Floating */
.root[data-variant='floating'] {
  gap: 6px;
}
.root[data-variant='floating'] .control {
  align-items: flex-end;
  min-height: 58px;
  padding: 18px 14px 10px;
}
.root[data-variant='floating'] .float-label {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  transition:
    top 180ms var(--gob-in-ease),
    transform 180ms var(--gob-in-ease),
    font-size 180ms var(--gob-in-ease),
    color 180ms var(--gob-in-ease);
}
.root[data-variant='floating'][data-focused='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  transform: none;
  font-size: 11px;
  font-weight: 700;
  color: var(--gob-in-dorado);
}
.root[data-variant='floating'] .field {
  height: 24px;
}

/* Underline */
.root[data-variant='underline'] .control {
  border: 0;
  border-bottom: 2px solid #e5e1da;
  border-radius: 0;
  padding-left: 2px;
  padding-right: 2px;
  background: transparent;
  box-shadow: none;
}
.root[data-variant='underline'] .control:hover {
  border-bottom-color: color-mix(in srgb, var(--gob-in-dorado) 55%, #e5e1da);
}
.root[data-variant='underline'][data-focused='true'] .control {
  border-bottom-color: var(--gob-in-focus);
  box-shadow: none;
  background: transparent;
}

/* Pill */
.root[data-variant='pill'] .control {
  border-radius: 999px;
  padding-left: 18px;
  padding-right: 18px;
  background: #fff;
}

/* Soft filled — tinte vino ligero */
.root[data-variant='soft'] .control {
  border-color: transparent;
  background: color-mix(in srgb, var(--gob-in-vino) 7%, #ffffff);
}
.root[data-variant='soft'] .control:hover {
  background: color-mix(in srgb, var(--gob-in-vino) 11%, #ffffff);
  border-color: transparent;
}
.root[data-variant='soft'][data-focused='true'] .control {
  background: #ffffff;
  border-color: var(--gob-in-focus);
}
.root[data-variant='soft'] .affix {
  color: var(--gob-in-vino);
}

/* Code / OTP */
.root[data-variant='code'] .control {
  justify-content: center;
  border-radius: 16px;
  letter-spacing: 0.28em;
}
.root[data-variant='code'] .field {
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.28em;
}
.root[data-variant='code'] .field::placeholder {
  letter-spacing: 0.2em;
  font-weight: 600;
}

/* Clearable */
.clear {
  appearance: none;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-in-muted);
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;
}
.clear:hover {
  background: rgba(159, 33, 65, 0.12);
  color: var(--gob-in-vino);
}
`;
