export const timepickerStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-tp-vino: #9f2141;
  --gob-tp-vino-deep: #7a1832;
  --gob-tp-dorado: #bc945a;
  --gob-tp-title: #181511;
  --gob-tp-muted: #8a8278;
  --gob-tp-text: #3d3a35;
  --gob-tp-border: rgba(24, 21, 17, 0.12);
  --gob-tp-border-hover: rgba(24, 21, 17, 0.22);
  --gob-tp-focus: var(--gob-tp-vino);
  --gob-tp-ring: rgba(159, 33, 65, 0.16);
  --gob-tp-bg: #ffffff;
  --gob-tp-fill: #faf9f7;
  --gob-tp-radius: 14px;
  --gob-tp-height: 50px;
  --gob-tp-pad-x: 14px;
  --gob-tp-ease: cubic-bezier(0.22, 1, 0.36, 1);
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
  --gob-tp-height: 40px;
  --gob-tp-radius: 12px;
  --gob-tp-pad-x: 12px;
}
.root[data-size='lg'] {
  --gob-tp-height: 58px;
  --gob-tp-radius: 16px;
  --gob-tp-pad-x: 16px;
}
.root[data-variant='dense'] {
  --gob-tp-height: 38px;
  --gob-tp-radius: 10px;
  gap: 6px;
}

.root[data-status='error'] { --gob-tp-focus: #c62828; --gob-tp-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-tp-focus: #1f8a55; --gob-tp-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-tp-focus: #d0921a; --gob-tp-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-tp-focus: #2f5f8a; --gob-tp-ring: rgba(47,95,138,.16); }

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
  color: var(--gob-tp-title);
}

.label .req {
  color: var(--gob-tp-vino);
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
  color: var(--gob-tp-vino);
}
.root[data-status='error'] .pill { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill { background: rgba(47,95,138,.12); color: #2f5f8a; }

.trigger {
  appearance: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  min-height: var(--gob-tp-height);
  padding: 0 var(--gob-tp-pad-x);
  border: 1.5px solid var(--gob-tp-border);
  border-radius: var(--gob-tp-radius);
  background: var(--gob-tp-bg);
  color: var(--gob-tp-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 180ms var(--gob-tp-ease),
    box-shadow 180ms var(--gob-tp-ease),
    background 180ms var(--gob-tp-ease),
    transform 180ms var(--gob-tp-ease);
}

.trigger:hover { border-color: var(--gob-tp-border-hover); }

.root[data-open='true'] .trigger,
.trigger:focus-visible {
  outline: none;
  border-color: var(--gob-tp-focus);
  box-shadow: 0 0 0 4px var(--gob-tp-ring);
  background: #fff;
}

.root[data-open='true'] .trigger { transform: translateY(-1px); }

.root[data-status='error'] .trigger {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-tp-border));
}
.root[data-status='success'] .trigger {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-tp-border));
}
.root[data-status='warning'] .trigger {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-tp-border));
}

.root[data-disabled='true'] .trigger {
  cursor: not-allowed;
  opacity: 0.72;
  background: var(--gob-tp-fill);
  transform: none;
  box-shadow: none;
}

.root[data-readonly='true'] .trigger {
  cursor: default;
  background: var(--gob-tp-fill);
}

.lead,
.trail {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.lead {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: var(--gob-tp-dorado);
  background: color-mix(in srgb, var(--gob-tp-dorado) 16%, transparent);
  transition: background 180ms var(--gob-tp-ease), color 180ms var(--gob-tp-ease);
}

.root[data-open='true'] .lead,
.root[data-filled='true'] .lead {
  color: var(--gob-tp-vino);
  background: color-mix(in srgb, var(--gob-tp-vino) 12%, transparent);
}

.trail {
  color: var(--gob-tp-muted);
  transition: transform 180ms var(--gob-tp-ease), color 180ms var(--gob-tp-ease);
}

.root[data-open='true'] .trail {
  color: var(--gob-tp-vino);
  transform: rotate(90deg);
}

.lead svg,
.trail svg,
.icon-btn svg { width: 16px; height: 16px; display: block; }

.value {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--gob-tp-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}

.value[data-placeholder='true'] {
  color: var(--gob-tp-muted);
  font-weight: 500;
}

.float-label {
  position: absolute;
  left: calc(var(--gob-tp-pad-x) + 40px);
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  z-index: 1;
  transition:
    top 180ms var(--gob-tp-ease),
    transform 180ms var(--gob-tp-ease),
    font-size 180ms var(--gob-tp-ease),
    color 180ms var(--gob-tp-ease);
}

.root[data-variant='floating'] .trigger {
  align-items: flex-end;
  min-height: 60px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.root[data-variant='floating'] .lead,
.root[data-variant='floating'] .trail,
.root[data-variant='floating'] .clear { align-self: center; }
.root[data-variant='floating'] .value {
  padding-top: 2px;
  min-height: 22px;
}
.root[data-variant='floating'] .value[data-placeholder='true'] {
  opacity: 0;
  pointer-events: none;
}
.root[data-variant='floating'][data-open='true'] .value[data-placeholder='true'] {
  opacity: 1;
}
.root[data-variant='floating'][data-open='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  transform: none;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-tp-dorado);
}

.icon-btn {
  appearance: none;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gob-tp-muted);
  cursor: pointer;
}
.icon-btn:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-tp-title);
}

.clear {
  opacity: 0;
  pointer-events: none;
  transition: opacity 140ms ease;
}
.root[data-filled='true'][data-clearable='true']:not([data-disabled='true']):not([data-readonly='true']) .clear,
.root[data-open='true'][data-clearable='true'] .clear {
  opacity: 1;
  pointer-events: auto;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-tp-muted);
  line-height: 1.35;
}
.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.root[data-variant='soft'] .trigger {
  background: color-mix(in srgb, var(--gob-tp-vino) 5%, #fff);
  border-color: color-mix(in srgb, var(--gob-tp-vino) 14%, var(--gob-tp-border));
}
.root[data-variant='soft'][data-open='true'] .trigger { background: #fff; }

.root[data-variant='underline'] .trigger {
  border-radius: 0;
  border-width: 0 0 1.5px;
  padding-left: 2px;
  padding-right: 2px;
  background: transparent;
  box-shadow: none !important;
  transform: none !important;
}
.root[data-variant='underline'][data-open='true'] .trigger {
  border-bottom-color: var(--gob-tp-focus);
}
.root[data-variant='underline'] .lead { background: transparent; }

.root[data-variant='pill'] .trigger { border-radius: 999px; }

.root[data-variant='complete'] .trigger {
  background:
    radial-gradient(90% 80% at 100% 0%, rgba(188,148,90,.12), transparent 55%),
    #fff;
}

.panel {
  position: absolute;
  z-index: 40;
  top: calc(100% + 10px);
  left: 0;
  width: min(280px, 100%);
  padding: 14px;
  border-radius: 20px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  box-shadow:
    0 22px 48px rgba(24, 21, 17, 0.14),
    0 2px 8px rgba(24, 21, 17, 0.05);
  display: none;
  gap: 10px;
  overflow: hidden;
  transform-origin: top center;
  animation: gob-tp-in 180ms var(--gob-tp-ease);
}

.root[data-open='true'] .panel { display: grid; }

@keyframes gob-tp-in {
  from { opacity: 0; transform: translateY(-6px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.summary {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f7f4ef;
  border: 1px solid rgba(24, 21, 17, 0.08);
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-tp-muted);
}
.summary strong {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--gob-tp-vino-deep);
  font-variant-numeric: tabular-nums;
}

.cols {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 8px;
  align-items: stretch;
  min-height: 0;
}

.col {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.col-label {
  margin: 0;
  text-align: center;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gob-tp-dorado);
}

.list {
  height: 196px;
  overflow: auto;
  border-radius: 14px;
  border: 1px solid rgba(24, 21, 17, 0.08);
  background: #faf9f7;
  padding: 6px;
  display: grid;
  gap: 2px;
  scrollbar-width: thin;
}

.sep {
  align-self: center;
  font-size: 22px;
  font-weight: 800;
  color: var(--gob-tp-dorado);
  padding-top: 18px;
}

.opt {
  appearance: none;
  width: 100%;
  min-height: 36px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--gob-tp-title);
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}
.opt:hover:not([disabled]):not([data-selected='true']) {
  background: color-mix(in srgb, var(--gob-tp-dorado) 16%, #fff);
}
.opt[data-selected='true'] {
  background: var(--gob-tp-vino);
  color: #fff;
  font-weight: 750;
}
.opt[disabled] {
  opacity: 0.32;
  cursor: not-allowed;
}

.cal-foot {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding-top: 4px;
  border-top: 1px solid #f0ece6;
}

.foot-btn {
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--gob-tp-muted);
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  padding: 7px 12px;
  border-radius: 999px;
}
.foot-btn:hover {
  background: #f6f2eb;
  color: var(--gob-tp-title);
}
.foot-btn.foot-primary {
  color: #fff;
  background: var(--gob-tp-vino);
}
.foot-btn.foot-primary:hover {
  background: var(--gob-tp-vino-deep);
  color: #fff;
}
`;
