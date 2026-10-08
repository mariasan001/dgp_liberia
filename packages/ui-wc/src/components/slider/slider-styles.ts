export const sliderStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sl-vino: #9f2141;
  --gob-sl-vino-deep: #7a1832;
  --gob-sl-dorado: #bc945a;
  --gob-sl-dorado-soft: #d4b57e;
  --gob-sl-title: #181511;
  --gob-sl-muted: #8a8278;
  --gob-sl-text: #3d3a35;
  --gob-sl-border: rgba(24, 21, 17, 0.12);
  --gob-sl-focus: var(--gob-sl-vino);
  --gob-sl-ring: rgba(159, 33, 65, 0.18);
  --gob-sl-track: #ebe6df;
  --gob-sl-track-h: 8px;
  --gob-sl-thumb: 22px;
  --gob-sl-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 12px;
  min-width: 0;
}

.root[data-size='sm'] {
  --gob-sl-thumb: 18px;
  --gob-sl-track-h: 6px;
  gap: 8px;
}
.root[data-size='lg'] {
  --gob-sl-thumb: 26px;
  --gob-sl-track-h: 10px;
}

.root[data-status='error'] { --gob-sl-focus: #c62828; --gob-sl-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-sl-focus: #1f8a55; --gob-sl-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-sl-focus: #d0921a; --gob-sl-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-sl-focus: #2f5f8a; --gob-sl-ring: rgba(47,95,138,.16); }

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.label {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--gob-sl-title);
}

.label .req {
  color: var(--gob-sl-vino);
  margin-left: 2px;
}

.value-pill {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--gob-sl-vino) 22%, rgba(24,21,17,.08));
  color: var(--gob-sl-vino-deep);
  font-size: 13px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.04);
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
  color: var(--gob-sl-vino);
}
.root[data-status='error'] .pill { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill { background: rgba(47,95,138,.12); color: #2f5f8a; }

.shell {
  display: grid;
  gap: 10px;
  padding: 6px 2px 0;
}

.root[data-variant='soft'] .shell,
.root[data-variant='complete'] .shell,
.root[data-variant='inset'] .shell,
.root[data-variant='duo'] .shell {
  padding: 16px 18px 14px;
  border-radius: 18px;
  border: 1px solid rgba(24, 21, 17, 0.08);
  background: #fff;
}

.root[data-variant='soft'] .shell {
  background: color-mix(in srgb, var(--gob-sl-vino) 5%, #fff);
  border-color: color-mix(in srgb, var(--gob-sl-vino) 14%, transparent);
}

.root[data-variant='duo'] .shell {
  background:
    radial-gradient(90% 80% at 100% 0%, rgba(188,148,90,.12), transparent 55%),
    #fff;
}

.root[data-variant='inset'] .shell {
  background: #f4f1ec;
  box-shadow: inset 0 1px 2px rgba(24, 21, 17, 0.06);
}

.control {
  position: relative;
  height: calc(var(--gob-sl-thumb) + 16px);
  display: flex;
  align-items: center;
  touch-action: none;
  user-select: none;
}

.track {
  position: absolute;
  left: 0;
  right: 0;
  height: var(--gob-sl-track-h);
  border-radius: 999px;
  background: var(--gob-sl-track);
  overflow: hidden;
}

.fill {
  position: absolute;
  left: 0;
  height: var(--gob-sl-track-h);
  border-radius: 999px;
  background: var(--gob-sl-focus);
  pointer-events: none;
  transition: width 60ms linear, left 60ms linear;
}

.segments {
  position: absolute;
  inset: 0;
  display: none;
  pointer-events: none;
}

.segment {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.55);
  transform: translateX(-50%);
}

.thumb {
  appearance: none;
  position: absolute;
  top: 50%;
  width: var(--gob-sl-thumb);
  height: var(--gob-sl-thumb);
  margin: 0;
  border: 3px solid #fff;
  border-radius: 999px;
  background: var(--gob-sl-focus);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--gob-sl-focus) 30%, transparent),
    0 6px 14px rgba(24, 21, 17, 0.18);
  transform: translate(-50%, -50%);
  cursor: grab;
  z-index: 2;
  transition:
    transform 140ms var(--gob-sl-ease),
    box-shadow 140ms var(--gob-sl-ease);
}

.thumb:hover {
  transform: translate(-50%, -50%) scale(1.08);
}

.thumb:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.12);
}

.thumb:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 4px var(--gob-sl-ring),
    0 6px 14px rgba(24, 21, 17, 0.18);
}

.tooltip {
  position: absolute;
  left: 0;
  bottom: calc(100% + 8px);
  transform: translateX(-50%);
  min-height: 26px;
  padding: 0 10px;
  border-radius: 10px;
  background: var(--gob-sl-vino-deep);
  color: #fff;
  font-size: 12px;
  font-weight: 750;
  font-variant-numeric: tabular-nums;
  display: none;
  align-items: center;
  white-space: nowrap;
  pointer-events: none;
  z-index: 3;
  box-shadow: 0 8px 18px rgba(122, 24, 50, 0.28);
}

.tooltip::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--gob-sl-vino-deep);
}

.root[data-variant='tooltip'] .tooltip {
  display: inline-flex;
}

.root[data-variant='tooltip'] .value-pill {
  display: none;
}

.root[data-disabled='true'] .thumb {
  cursor: not-allowed;
  background: color-mix(in srgb, var(--gob-sl-focus) 45%, #ebe6df);
  box-shadow: none;
  transform: translate(-50%, -50%);
}

.root[data-disabled='true'] .fill {
  background: color-mix(in srgb, var(--gob-sl-focus) 40%, #ebe6df);
}

.root[data-disabled='true'] { opacity: 0.78; }
.root[data-readonly='true'] .thumb { cursor: default; }

.marks {
  position: relative;
  height: 18px;
  margin: 0 0 2px;
}

.mark {
  position: absolute;
  transform: translateX(-50%);
  display: grid;
  justify-items: center;
  gap: 4px;
}

.mark i {
  width: 2px;
  height: 6px;
  border-radius: 1px;
  background: var(--gob-sl-dorado);
  opacity: 0.75;
}

.mark span {
  font-size: 10px;
  font-weight: 650;
  color: var(--gob-sl-muted);
  font-variant-numeric: tabular-nums;
}

.bounds {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 11px;
  font-weight: 650;
  color: var(--gob-sl-muted);
  font-variant-numeric: tabular-nums;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sl-muted);
  line-height: 1.35;
}
.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

/* —— New / modern variants —— */

.root[data-variant='pill'] {
  --gob-sl-track-h: 14px;
  --gob-sl-thumb: 24px;
}
.root[data-variant='pill'] .track {
  background: #f0ebe4;
}
.root[data-variant='pill'] .thumb {
  border-width: 4px;
  box-shadow: 0 8px 18px rgba(159, 33, 65, 0.22);
}

.root[data-variant='segmented'] .segments {
  display: block;
}
.root[data-variant='segmented'] .track {
  overflow: visible;
  background: #f0ebe4;
}
.root[data-variant='segmented'] .fill {
  overflow: hidden;
}

.root[data-variant='duo'] {
  --gob-sl-focus: var(--gob-sl-vino);
}
.root[data-variant='duo'] .fill {
  background: linear-gradient(90deg, var(--gob-sl-vino), var(--gob-sl-dorado));
}
.root[data-variant='duo'] .thumb {
  background: var(--gob-sl-dorado);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--gob-sl-dorado) 40%, transparent),
    0 6px 14px rgba(138, 106, 61, 0.28);
}
.root[data-variant='duo'] .value-pill {
  color: #8a6a3d;
  border-color: color-mix(in srgb, var(--gob-sl-dorado) 40%, transparent);
}

.root[data-variant='inset'] .track {
  background: #e5dfd6;
  box-shadow: inset 0 1px 2px rgba(24, 21, 17, 0.12);
}
.root[data-variant='inset'] .fill {
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25);
}

.root[data-variant='vertical'] {
  width: fit-content;
  min-width: 120px;
}
.root[data-variant='vertical'] .shell {
  justify-items: center;
}
.root[data-variant='vertical'] .control {
  width: calc(var(--gob-sl-thumb) + 16px);
  height: 180px;
  align-items: stretch;
  justify-content: center;
}
.root[data-variant='vertical'] .track,
.root[data-variant='vertical'] .fill {
  left: 50%;
  right: auto;
  top: 0;
  bottom: 0;
  width: var(--gob-sl-track-h);
  height: auto;
  transform: translateX(-50%);
}
.root[data-variant='vertical'] .fill {
  top: auto;
}
.root[data-variant='vertical'] .thumb {
  left: 50% !important;
  transform: translate(-50%, 50%);
}
.root[data-variant='vertical'] .thumb:hover {
  transform: translate(-50%, 50%) scale(1.08);
}
.root[data-variant='vertical'] .thumb:active {
  transform: translate(-50%, 50%) scale(1.12);
}
.root[data-variant='vertical'] .marks {
  display: none;
}
.root[data-variant='vertical'] .bounds {
  flex-direction: column-reverse;
  align-items: center;
  height: 180px;
  position: absolute;
  right: -2px;
  opacity: 0;
  pointer-events: none;
}
.root[data-variant='vertical'] .tooltip {
  left: calc(100% + 14px);
  bottom: auto;
  top: 50%;
  transform: translateY(-50%);
}
.root[data-variant='vertical'] .tooltip::after {
  left: 0;
  top: 50%;
  transform: translate(-100%, -50%);
  border: 6px solid transparent;
  border-right-color: var(--gob-sl-vino-deep);
  border-top-color: transparent;
}

.hidden-inputs {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
`;
