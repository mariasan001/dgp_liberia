export const searchFieldStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sf-vino: #9f2141;
  --gob-sf-vino-deep: #7a1832;
  --gob-sf-dorado: #bc945a;
  --gob-sf-title: #181511;
  --gob-sf-muted: #8a8278;
  --gob-sf-text: #3d3a35;
  --gob-sf-border: rgba(24, 21, 17, 0.12);
  --gob-sf-border-hover: rgba(24, 21, 17, 0.22);
  --gob-sf-focus: var(--gob-sf-vino);
  --gob-sf-ring: rgba(159, 33, 65, 0.16);
  --gob-sf-bg: #ffffff;
  --gob-sf-fill: #faf9f7;
  --gob-sf-radius: 14px;
  --gob-sf-height: 50px;
  --gob-sf-pad-x: 14px;
  --gob-sf-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-sf-height: 40px;
  --gob-sf-radius: 12px;
  --gob-sf-pad-x: 12px;
}
.root[data-size='lg'] {
  --gob-sf-height: 58px;
  --gob-sf-radius: 16px;
  --gob-sf-pad-x: 16px;
}
.root[data-variant='dense'] {
  --gob-sf-height: 38px;
  --gob-sf-radius: 10px;
  gap: 6px;
}

.root[data-status='error'] { --gob-sf-focus: #c62828; --gob-sf-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-sf-focus: #1f8a55; --gob-sf-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-sf-focus: #d0921a; --gob-sf-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-sf-focus: #2f5f8a; --gob-sf-ring: rgba(47,95,138,.16); }

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-sf-title);
}

.label .req {
  color: var(--gob-sf-vino);
  margin-left: 2px;
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
  color: var(--gob-sf-vino);
}
.root[data-status='error'] .pill { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill { background: rgba(47,95,138,.12); color: #2f5f8a; }

.control {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  min-height: var(--gob-sf-height);
  padding: 0 var(--gob-sf-pad-x);
  border: 1.5px solid var(--gob-sf-border);
  border-radius: var(--gob-sf-radius);
  background: var(--gob-sf-bg);
  transition:
    border-color 180ms var(--gob-sf-ease),
    box-shadow 180ms var(--gob-sf-ease),
    background 180ms var(--gob-sf-ease);
}

.control:hover { border-color: var(--gob-sf-border-hover); }

.root[data-focused='true'] .control {
  border-color: var(--gob-sf-focus);
  box-shadow: 0 0 0 4px var(--gob-sf-ring);
  background: #fff;
}

.root[data-status='error'] .control {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-sf-border));
}
.root[data-status='success'] .control {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-sf-border));
}
.root[data-status='warning'] .control {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-sf-border));
}

.root[data-disabled='true'] .control {
  opacity: 0.72;
  background: var(--gob-sf-fill);
  cursor: not-allowed;
}

.lead {
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gob-sf-dorado);
  background: color-mix(in srgb, var(--gob-sf-dorado) 16%, transparent);
  transition: color 180ms var(--gob-sf-ease), background 180ms var(--gob-sf-ease);
}

.root[data-focused='true'] .lead,
.root[data-filled='true'] .lead {
  color: var(--gob-sf-vino);
  background: color-mix(in srgb, var(--gob-sf-vino) 12%, transparent);
}

.lead svg,
.icon-btn svg,
.spinner {
  width: 16px;
  height: 16px;
  display: block;
}

.field {
  flex: 1 1 auto;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--gob-sf-title);
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  letter-spacing: -0.01em;
}

.field::placeholder {
  color: var(--gob-sf-muted);
  font-weight: 500;
}

.float-label {
  position: absolute;
  left: calc(var(--gob-sf-pad-x) + 40px);
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  z-index: 1;
  transition:
    top 180ms var(--gob-sf-ease),
    transform 180ms var(--gob-sf-ease),
    font-size 180ms var(--gob-sf-ease),
    color 180ms var(--gob-sf-ease);
}

.root[data-variant='floating'] .control {
  align-items: flex-end;
  min-height: 60px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.root[data-variant='floating'] .lead,
.root[data-variant='floating'] .actions {
  align-self: center;
}
.root[data-variant='floating'] .field {
  min-height: 22px;
  padding-top: 2px;
}
/* Empty + idle: only the float label (avoid overlap with placeholder). */
.root[data-variant='floating'][data-filled='false']:not([data-focused='true']) .field::placeholder {
  opacity: 0;
  color: transparent;
}
.root[data-variant='floating'][data-focused='true'] .field::placeholder {
  opacity: 1;
}
.root[data-variant='floating'][data-focused='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  transform: none;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-sf-dorado);
}

.actions {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  appearance: none;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gob-sf-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-btn:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-sf-title);
}

.clear {
  opacity: 0;
  pointer-events: none;
  transition: opacity 140ms ease;
}
.root[data-filled='true'][data-clearable='true']:not([data-disabled='true']) .clear,
.root[data-focused='true'][data-clearable='true'] .clear {
  opacity: 1;
  pointer-events: auto;
}

.kbd {
  display: none;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #f7f4ef;
  color: var(--gob-sf-muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.root[data-variant='shortcut'] .kbd,
.root[data-variant='complete'] .kbd {
  display: inline-flex;
}
.root[data-focused='true'] .kbd,
.root[data-filled='true'] .kbd {
  display: none;
}

.spinner {
  border-radius: 999px;
  border: 2px solid color-mix(in srgb, var(--gob-sf-vino) 20%, transparent);
  border-top-color: var(--gob-sf-vino);
  animation: gob-sf-spin 700ms linear infinite;
}
.root[data-loading='true'] .spinner { display: block; }
.root:not([data-loading='true']) .spinner { display: none; }

@keyframes gob-sf-spin {
  to { transform: rotate(360deg); }
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sf-muted);
  line-height: 1.35;
}
.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.root[data-variant='soft'] .control {
  background: color-mix(in srgb, var(--gob-sf-vino) 5%, #fff);
  border-color: color-mix(in srgb, var(--gob-sf-vino) 14%, var(--gob-sf-border));
}
.root[data-variant='soft'][data-focused='true'] .control { background: #fff; }

.root[data-variant='underline'] .control {
  border-radius: 0;
  border-width: 0 0 1.5px;
  padding-left: 2px;
  padding-right: 2px;
  background: transparent;
  box-shadow: none !important;
}
.root[data-variant='underline'][data-focused='true'] .control {
  border-bottom-color: var(--gob-sf-focus);
}
.root[data-variant='underline'] .lead { background: transparent; }

.root[data-variant='pill'] .control { border-radius: 999px; }

.root[data-variant='complete'] .control {
  background:
    radial-gradient(90% 80% at 100% 0%, rgba(188,148,90,.1), transparent 55%),
    #fff;
}
`;
