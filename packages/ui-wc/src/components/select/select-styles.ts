export const selectStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sel-vino: #9f2141;
  --gob-sel-dorado: #bc945a;
  --gob-sel-title: #181511;
  --gob-sel-muted: #8a8278;
  --gob-sel-text: #3d3a35;
  --gob-sel-border: rgba(24, 21, 17, 0.12);
  --gob-sel-border-hover: rgba(24, 21, 17, 0.22);
  --gob-sel-focus: var(--gob-sel-vino);
  --gob-sel-ring: rgba(159, 33, 65, 0.18);
  --gob-sel-bg: #ffffff;
  --gob-sel-fill: #faf9f7;
  --gob-sel-radius: 14px;
  --gob-sel-height: 50px;
  --gob-sel-pad-x: 14px;
  --gob-sel-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --gob-sel-panel-shadow:
    0 18px 40px rgba(24, 21, 17, 0.14),
    0 2px 8px rgba(24, 21, 17, 0.06);
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
  position: relative;
  display: grid;
  gap: 8px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-sel-height: 40px;
  --gob-sel-radius: 12px;
  --gob-sel-pad-x: 12px;
}
.root[data-size='lg'] {
  --gob-sel-height: 58px;
  --gob-sel-radius: 16px;
  --gob-sel-pad-x: 16px;
}
.root[data-variant='dense'] {
  --gob-sel-height: 38px;
  --gob-sel-radius: 10px;
  gap: 6px;
}

.root[data-status='error'] {
  --gob-sel-focus: #c62828;
  --gob-sel-ring: rgba(198, 40, 40, 0.16);
}
.root[data-status='success'] {
  --gob-sel-focus: #1f8a55;
  --gob-sel-ring: rgba(31, 138, 85, 0.16);
}
.root[data-status='warning'] {
  --gob-sel-focus: #d0921a;
  --gob-sel-ring: rgba(208, 146, 26, 0.18);
}
.root[data-status='info'] {
  --gob-sel-focus: #2f5f8a;
  --gob-sel-ring: rgba(47, 95, 138, 0.16);
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-sel-title);
}
.label .req {
  color: var(--gob-sel-vino);
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
  color: var(--gob-sel-vino);
}
.root[data-status='error'] .pill { background: rgba(198, 40, 40, 0.12); color: #c62828; }
.root[data-status='success'] .pill { background: rgba(31, 138, 85, 0.14); color: #1f8a55; }
.root[data-status='warning'] .pill { background: rgba(208, 146, 26, 0.16); color: #a87412; }
.root[data-status='info'] .pill { background: rgba(47, 95, 138, 0.12); color: #2f5f8a; }

.trigger {
  appearance: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  min-height: var(--gob-sel-height);
  margin: 0;
  padding: 0 calc(var(--gob-sel-pad-x) + 34px) 0 var(--gob-sel-pad-x);
  border: 1.5px solid var(--gob-sel-border);
  border-radius: var(--gob-sel-radius);
  background: var(--gob-sel-bg);
  color: var(--gob-sel-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 180ms var(--gob-sel-ease),
    box-shadow 180ms var(--gob-sel-ease),
    background 180ms var(--gob-sel-ease),
    transform 180ms var(--gob-sel-ease);
}
.trigger:hover {
  border-color: var(--gob-sel-border-hover);
}
.trigger:focus-visible {
  outline: none;
}
.root[data-open='true'] .trigger,
.root[data-focused='true'] .trigger {
  border-color: var(--gob-sel-focus);
  box-shadow: 0 0 0 4px var(--gob-sel-ring);
  background: #ffffff;
}
.root[data-open='true'] .trigger {
  transform: translateY(-1px);
}
.root[data-status='error'] .trigger {
  border-color: color-mix(in srgb, #c62828 55%, var(--gob-sel-border));
}
.root[data-status='success'] .trigger {
  border-color: color-mix(in srgb, #1f8a55 50%, var(--gob-sel-border));
}
.root[data-status='warning'] .trigger {
  border-color: color-mix(in srgb, #d0921a 55%, var(--gob-sel-border));
}
.root[data-disabled='true'] .trigger {
  background: var(--gob-sel-fill);
  opacity: 0.72;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.lead {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: var(--gob-sel-dorado);
  background: color-mix(in srgb, var(--gob-sel-dorado) 14%, transparent);
  transition: background 180ms var(--gob-sel-ease), color 180ms var(--gob-sel-ease);
}
.lead svg {
  width: 16px;
  height: 16px;
  display: block;
}
.root[data-open='true'] .lead,
.root[data-focused='true'] .lead {
  color: var(--gob-sel-vino);
  background: color-mix(in srgb, var(--gob-sel-vino) 12%, transparent);
}

.value-wrap {
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  gap: 2px;
}
.value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--gob-sel-title);
  line-height: 1.25;
}
.value[data-placeholder='true'] {
  color: #b0aaa1;
  font-weight: 500;
}
.meta {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-sel-muted);
  line-height: 1.2;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 2px 0;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
  height: 26px;
  padding: 0 8px 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--gob-sel-vino) 10%, #fff);
  color: var(--gob-sel-vino);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.chip span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chip button {
  appearance: none;
  display: inline-grid;
  place-items: center;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(159, 33, 65, 0.12);
  color: var(--gob-sel-vino);
  cursor: pointer;
}
.chip button svg {
  width: 10px;
  height: 10px;
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
.clear {
  appearance: none;
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-sel-muted);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 140ms ease, background 140ms ease, color 140ms ease;
}
.root[data-filled='true']:not([data-disabled='true']) .trigger:hover .clear,
.root[data-open='true'][data-filled='true'] .clear,
.root[data-focused='true'][data-filled='true'] .clear {
  opacity: 1;
  pointer-events: auto;
}
.clear:hover {
  background: rgba(159, 33, 65, 0.12);
  color: var(--gob-sel-vino);
}
.clear svg {
  width: 12px;
  height: 12px;
}

.chevron {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  color: var(--gob-sel-muted);
  background: transparent;
  transition:
    transform 220ms var(--gob-sel-ease),
    color 180ms var(--gob-sel-ease),
    background 180ms var(--gob-sel-ease);
}
.chevron svg {
  width: 16px;
  height: 16px;
}
.root[data-open='true'] .chevron {
  transform: rotate(180deg);
  color: var(--gob-sel-vino);
  background: color-mix(in srgb, var(--gob-sel-vino) 10%, transparent);
}

.float-label {
  position: absolute;
  left: var(--gob-sel-pad-x);
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #b0aaa1;
  pointer-events: none;
  transition:
    top 180ms var(--gob-sel-ease),
    transform 180ms var(--gob-sel-ease),
    font-size 180ms var(--gob-sel-ease),
    color 180ms var(--gob-sel-ease);
}
.root[data-variant='floating'] .trigger {
  align-items: flex-end;
  min-height: 60px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.root[data-variant='floating'] .float-label {
  left: var(--gob-sel-pad-x);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
.root[data-variant='floating'] .value-wrap {
  width: 100%;
  min-height: 22px;
}
.root[data-variant='floating'] .value[data-placeholder='true'] {
  opacity: 0;
  pointer-events: none;
}
.root[data-variant='floating'][data-open='true'] .value[data-placeholder='true'],
.root[data-variant='floating'][data-focused='true'] .value[data-placeholder='true'] {
  opacity: 1;
}
.root[data-variant='floating'] .meta {
  display: none;
}
.root[data-variant='floating'] .lead ~ .value-wrap {
  padding-top: 2px;
}
.root[data-variant='floating']:has(.lead:not([hidden])) .float-label {
  left: calc(var(--gob-sel-pad-x) + 40px);
}
.root[data-variant='floating'][data-open='true'] .float-label,
.root[data-variant='floating'][data-focused='true'] .float-label,
.root[data-variant='floating'][data-filled='true'] .float-label {
  top: 10px;
  transform: none;
  font-size: 11px;
  font-weight: 700;
  color: var(--gob-sel-dorado);
}

.root[data-variant='filled'] .trigger {
  background: var(--gob-sel-fill);
  border-color: transparent;
}
.root[data-variant='filled'] .trigger:hover {
  background: #f3f1ec;
}
.root[data-variant='filled'][data-open='true'] .trigger,
.root[data-variant='filled'][data-focused='true'] .trigger {
  background: #ffffff;
  border-color: var(--gob-sel-focus);
}

.root[data-variant='soft'] .trigger {
  border-color: transparent;
  background: color-mix(in srgb, var(--gob-sel-vino) 7%, #ffffff);
}
.root[data-variant='soft'] .trigger:hover {
  background: color-mix(in srgb, var(--gob-sel-vino) 11%, #ffffff);
}
.root[data-variant='soft'][data-open='true'] .trigger,
.root[data-variant='soft'][data-focused='true'] .trigger {
  background: #ffffff;
  border-color: var(--gob-sel-focus);
}
.root[data-variant='soft'] .lead {
  color: var(--gob-sel-vino);
  background: color-mix(in srgb, var(--gob-sel-vino) 12%, transparent);
}

.root[data-variant='pill'] .trigger {
  border-radius: 999px;
  padding-left: 18px;
}
.root[data-variant='pill'] .lead {
  border-radius: 999px;
}

.root[data-variant='underline'] .trigger {
  border: 0;
  border-bottom: 2px solid #e5e1da;
  border-radius: 0;
  padding-left: 2px;
  background: transparent;
  box-shadow: none;
}
.root[data-variant='underline'] .trigger:hover {
  border-bottom-color: color-mix(in srgb, var(--gob-sel-dorado) 55%, #e5e1da);
}
.root[data-variant='underline'][data-open='true'] .trigger,
.root[data-variant='underline'][data-focused='true'] .trigger {
  border-bottom-color: var(--gob-sel-focus);
  box-shadow: none;
  background: transparent;
  transform: none;
}
.root[data-variant='underline'] .lead {
  background: transparent;
}

.root[data-variant='ghost'] .trigger {
  border-color: transparent;
  background: transparent;
}
.root[data-variant='ghost'] .trigger:hover {
  background: rgba(24, 21, 17, 0.04);
}
.root[data-variant='ghost'][data-open='true'] .trigger,
.root[data-variant='ghost'][data-focused='true'] .trigger {
  background: #fff;
  border-color: var(--gob-sel-focus);
}

.root[data-variant='split'] .trigger {
  padding-left: 8px;
  gap: 8px;
}
.root[data-variant='split'] .lead {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(145deg, #9f2141 0%, #7a1832 100%);
}
.root[data-variant='split'][data-open='true'] .lead,
.root[data-variant='split'][data-focused='true'] .lead {
  color: #fff;
  background: linear-gradient(145deg, #bc945a 0%, #9a7540 100%);
}

.root[data-variant='multiple'] .trigger {
  min-height: 56px;
  align-items: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sel-muted);
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
  display: grid;
  gap: 0;
  max-height: 280px;
  overflow: hidden;
  border: 1px solid rgba(24, 21, 17, 0.08);
  border-radius: 16px;
  background: #fff;
  box-shadow: var(--gob-sel-panel-shadow);
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  pointer-events: none;
  transition:
    opacity 160ms var(--gob-sel-ease),
    transform 180ms var(--gob-sel-ease);
}
.root[data-open='true'] .panel {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.root[data-variant='pill'] .panel {
  border-radius: 20px;
}

.search-wrap {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(24, 21, 17, 0.06);
  background: #fff;
}
.search-wrap svg {
  width: 16px;
  height: 16px;
  color: var(--gob-sel-muted);
  flex: 0 0 auto;
}
.search {
  appearance: none;
  flex: 1 1 auto;
  min-width: 0;
  height: 32px;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--gob-sel-text);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
}
.search::placeholder {
  color: #b0aaa1;
}

.list {
  overflow: auto;
  max-height: 232px;
  padding: 6px;
  overscroll-behavior: contain;
}

.group-label {
  margin: 6px 8px 4px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gob-sel-dorado);
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
  color: var(--gob-sel-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}
.option:hover,
.option[data-active='true'] {
  background: color-mix(in srgb, var(--gob-sel-vino) 7%, #fff);
}
.option[data-selected='true'] {
  background: color-mix(in srgb, var(--gob-sel-vino) 10%, #fff);
  color: var(--gob-sel-vino);
}
.option[data-disabled='true'] {
  opacity: 0.45;
  cursor: not-allowed;
}
.check {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1.5px solid rgba(24, 21, 17, 0.14);
  color: transparent;
  background: #fff;
  transition: background 140ms ease, border-color 140ms ease, color 140ms ease;
}
.option[data-selected='true'] .check {
  border-color: var(--gob-sel-vino);
  background: var(--gob-sel-vino);
  color: #fff;
}
.check svg {
  width: 11px;
  height: 11px;
}
.option-text {
  min-width: 0;
  display: grid;
  gap: 1px;
}
.option-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: inherit;
}
.option-hint {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-sel-muted);
}
.option-badge {
  flex: 0 0 auto;
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-sel-dorado);
  background: color-mix(in srgb, var(--gob-sel-dorado) 16%, transparent);
}

.empty {
  margin: 0;
  padding: 22px 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--gob-sel-muted);
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
