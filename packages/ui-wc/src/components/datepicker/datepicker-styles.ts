export const datepickerStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-dp-vino: #9f2141;
  --gob-dp-vino-deep: #7a1832;
  --gob-dp-dorado: #bc945a;
  --gob-dp-dorado-soft: #d4b57e;
  --gob-dp-title: #181511;
  --gob-dp-muted: #8a8278;
  --gob-dp-text: #3d3a35;
  --gob-dp-border: rgba(24, 21, 17, 0.12);
  --gob-dp-border-hover: rgba(24, 21, 17, 0.22);
  --gob-dp-focus: var(--gob-dp-vino);
  --gob-dp-ring: rgba(159, 33, 65, 0.16);
  --gob-dp-bg: #ffffff;
  --gob-dp-fill: #faf9f7;
  --gob-dp-radius: 14px;
  --gob-dp-height: 50px;
  --gob-dp-pad-x: 14px;
  --gob-dp-ease: cubic-bezier(0.22, 1, 0.36, 1);
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
  --gob-dp-height: 40px;
  --gob-dp-radius: 12px;
  --gob-dp-pad-x: 12px;
}
.root[data-size='lg'] {
  --gob-dp-height: 58px;
  --gob-dp-radius: 16px;
  --gob-dp-pad-x: 16px;
}
.root[data-variant='dense'] {
  --gob-dp-height: 38px;
  --gob-dp-radius: 10px;
  gap: 6px;
}

.root[data-status='error'] { --gob-dp-focus: #c62828; --gob-dp-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-dp-focus: #1f8a55; --gob-dp-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-dp-focus: #d0921a; --gob-dp-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-dp-focus: #2f5f8a; --gob-dp-ring: rgba(47,95,138,.16); }

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
  color: var(--gob-dp-title);
}

.label .req {
  color: var(--gob-dp-vino);
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
  color: var(--gob-dp-vino);
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
  min-height: var(--gob-dp-height);
  padding: 0 var(--gob-dp-pad-x);
  border: 1.5px solid var(--gob-dp-border);
  border-radius: var(--gob-dp-radius);
  background: var(--gob-dp-bg);
  color: var(--gob-dp-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 180ms var(--gob-dp-ease),
    box-shadow 180ms var(--gob-dp-ease),
    background 180ms var(--gob-dp-ease),
    transform 180ms var(--gob-dp-ease);
}

.trigger:hover {
  border-color: var(--gob-dp-border-hover);
}

.root[data-open='true'] .trigger,
.trigger:focus-visible {
  outline: none;
  border-color: var(--gob-dp-focus);
  box-shadow: 0 0 0 4px var(--gob-dp-ring);
  background: #fff;
}

.root[data-open='true'] .trigger {
  transform: translateY(-1px);
}

.root[data-status='error'] .trigger {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-dp-border));
}
.root[data-status='success'] .trigger {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-dp-border));
}
.root[data-status='warning'] .trigger {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-dp-border));
}

.root[data-disabled='true'] .trigger {
  cursor: not-allowed;
  opacity: 0.72;
  background: var(--gob-dp-fill);
  transform: none;
  box-shadow: none;
}

.root[data-readonly='true'] .trigger {
  cursor: default;
  background: var(--gob-dp-fill);
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
  color: var(--gob-dp-dorado);
  background: color-mix(in srgb, var(--gob-dp-dorado) 16%, transparent);
  transition: background 180ms var(--gob-dp-ease), color 180ms var(--gob-dp-ease);
}

.root[data-open='true'] .lead,
.root[data-filled='true'] .lead {
  color: var(--gob-dp-vino);
  background: color-mix(in srgb, var(--gob-dp-vino) 12%, transparent);
}

.trail {
  color: var(--gob-dp-muted);
  transition: transform 180ms var(--gob-dp-ease), color 180ms var(--gob-dp-ease);
}

.root[data-open='true'] .trail {
  color: var(--gob-dp-vino);
  transform: rotate(90deg);
}

.lead svg,
.trail svg,
.icon-btn svg {
  width: 16px;
  height: 16px;
  display: block;
}

.value {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--gob-dp-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.value[data-placeholder='true'] {
  color: var(--gob-dp-muted);
  font-weight: 500;
}

.float-label {
  position: absolute;
  left: calc(var(--gob-dp-pad-x) + 40px);
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  z-index: 1;
  transition:
    top 180ms var(--gob-dp-ease),
    transform 180ms var(--gob-dp-ease),
    font-size 180ms var(--gob-dp-ease),
    color 180ms var(--gob-dp-ease);
}

.root[data-variant='floating'] .trigger {
  align-items: flex-end;
  min-height: 60px;
  padding-top: 20px;
  padding-bottom: 10px;
}

.root[data-variant='floating'] .lead,
.root[data-variant='floating'] .trail,
.root[data-variant='floating'] .clear {
  align-self: center;
}

.root[data-variant='floating'] .value {
  padding-top: 2px;
  min-height: 22px;
}

/* Empty + closed: only the float label (avoid overlap with placeholder). */
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
  color: var(--gob-dp-dorado);
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
  color: var(--gob-dp-muted);
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease;
}

.icon-btn:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-dp-title);
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
  color: var(--gob-dp-muted);
  line-height: 1.35;
}

.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.root[data-variant='soft'] .trigger {
  background: color-mix(in srgb, var(--gob-dp-vino) 5%, #fff);
  border-color: color-mix(in srgb, var(--gob-dp-vino) 14%, var(--gob-dp-border));
}
.root[data-variant='soft'][data-open='true'] .trigger {
  background: #fff;
}

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
  border-bottom-color: var(--gob-dp-focus);
}
.root[data-variant='underline'] .lead {
  background: transparent;
}

.root[data-variant='pill'] .trigger {
  border-radius: 999px;
}

.root[data-variant='complete'] .trigger,
.root[data-variant='range'] .trigger {
  background:
    radial-gradient(90% 80% at 100% 0%, rgba(188,148,90,.12), transparent 55%),
    #fff;
}

.panel {
  position: absolute;
  z-index: 40;
  top: calc(100% + 10px);
  left: 0;
  width: min(336px, 100%);
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
  animation: gob-dp-in 180ms var(--gob-dp-ease);
}

.root[data-open='true'] .panel {
  display: grid;
}

@keyframes gob-dp-in {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.panel-accent {
  display: none;
}

.summary {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 8px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f7f4ef;
  border: 1px solid rgba(24, 21, 17, 0.08);
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-dp-muted);
  line-height: 1.3;
}

.summary strong {
  font-size: 13px;
  font-weight: 750;
  letter-spacing: -0.01em;
  color: var(--gob-dp-vino-deep);
}

.summary span {
  color: var(--gob-dp-muted);
}

.cal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.cal-title-wrap {
  display: grid;
  justify-items: center;
  gap: 1px;
  min-width: 0;
}

.cal-title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  color: var(--gob-dp-title);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.cal-year {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gob-dp-dorado);
}

.nav-btn {
  appearance: none;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 11px;
  background: #f6f2eb;
  color: var(--gob-dp-title);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease, transform 140ms ease;
}
.nav-btn:hover {
  background: color-mix(in srgb, var(--gob-dp-dorado) 28%, #f6f2eb);
  color: var(--gob-dp-vino-deep);
  transform: translateY(-1px);
}
.nav-btn:active {
  transform: translateY(0);
}
.nav-btn svg {
  width: 16px;
  height: 16px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  padding: 2px 0 0;
}

.weekday {
  text-align: center;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--gob-dp-dorado);
  padding: 6px 0 2px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day {
  appearance: none;
  width: 100%;
  aspect-ratio: 1;
  min-height: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gob-dp-title);
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;
  transition:
    background 140ms var(--gob-dp-ease),
    color 140ms var(--gob-dp-ease),
    box-shadow 140ms var(--gob-dp-ease),
    transform 140ms var(--gob-dp-ease);
}
.day:hover:not([disabled]):not([data-selected='true']):not([data-range-start='true']):not([data-range-end='true']) {
  background: color-mix(in srgb, var(--gob-dp-dorado) 18%, #fff);
  transform: scale(1.04);
}
.day[data-outside='true'] {
  color: #b8b0a5;
  font-weight: 500;
}
.day[data-today='true']:not([data-selected='true']):not([data-range-start='true']):not([data-range-end='true']) {
  box-shadow: inset 0 0 0 1.5px var(--gob-dp-dorado);
  color: var(--gob-dp-vino-deep);
  font-weight: 800;
}
.day[data-in-range='true'] {
  background: color-mix(in srgb, var(--gob-dp-vino) 12%, #fff);
  border-radius: 0;
  color: var(--gob-dp-vino-deep);
}
.day[data-range-start='true'],
.day[data-range-end='true'],
.day[data-selected='true'] {
  background: var(--gob-dp-vino);
  color: #fff;
  box-shadow: 0 4px 12px rgba(159, 33, 65, 0.22);
  border-radius: 999px;
  font-weight: 750;
}
.day[data-range-start='true'] {
  border-radius: 999px 0 0 999px;
}
.day[data-range-end='true'] {
  border-radius: 0 999px 999px 0;
}
.day[data-range-start='true'][data-range-end='true'],
.day[data-selected='true'] {
  border-radius: 999px;
}
.day[disabled] {
  opacity: 0.32;
  cursor: not-allowed;
  transform: none !important;
}

.cal-foot {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0ece6;
}

.foot-btn {
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--gob-dp-muted);
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  padding: 7px 12px;
  border-radius: 999px;
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;
}
.foot-btn:hover {
  background: #f6f2eb;
  color: var(--gob-dp-title);
}
.foot-btn.foot-primary {
  color: #fff;
  background: var(--gob-dp-vino);
  border-color: transparent;
}
.foot-btn.foot-primary:hover {
  background: var(--gob-dp-vino-deep);
  color: #fff;
}
`;
