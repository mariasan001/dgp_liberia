export const switchStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sw-vino: #9f2141;
  --gob-sw-dorado: #bc945a;
  --gob-sw-title: #181511;
  --gob-sw-muted: #8a8278;
  --gob-sw-text: #3d3a35;
  --gob-sw-border: rgba(24, 21, 17, 0.14);
  --gob-sw-focus: var(--gob-sw-vino);
  --gob-sw-ring: rgba(159, 33, 65, 0.18);
  --gob-sw-track-w: 44px;
  --gob-sw-track-h: 24px;
  --gob-sw-thumb: 16px;
  --gob-sw-ease: cubic-bezier(0.22, 1, 0.36, 1);
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
  --gob-sw-track-w: 38px;
  --gob-sw-track-h: 20px;
  --gob-sw-thumb: 14px;
}
.root[data-size='lg'] {
  --gob-sw-track-w: 52px;
  --gob-sw-track-h: 28px;
  --gob-sw-thumb: 20px;
}

.root[data-status='error'] { --gob-sw-focus: #c62828; --gob-sw-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-sw-focus: #1f8a55; --gob-sw-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-sw-focus: #d0921a; --gob-sw-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-sw-focus: #2f5f8a; --gob-sw-ring: rgba(47,95,138,.16); }

.control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  color: var(--gob-sw-text);
}

.root[data-disabled='true'] .control {
  cursor: not-allowed;
  opacity: 0.72;
}

input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: 0;
  pointer-events: none;
}

.track {
  position: relative;
  flex: 0 0 auto;
  width: var(--gob-sw-track-w);
  height: var(--gob-sw-track-h);
  margin-top: 1px;
  border-radius: 999px;
  border: 1.5px solid var(--gob-sw-border);
  background: #f4f1ec;
  display: inline-flex;
  align-items: center;
  transition:
    background-color 160ms var(--gob-sw-ease),
    border-color 160ms var(--gob-sw-ease),
    box-shadow 160ms var(--gob-sw-ease);
}

.thumb {
  position: absolute;
  top: 50%;
  left: 3px;
  width: var(--gob-sw-thumb);
  height: var(--gob-sw-thumb);
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(24, 21, 17, 0.18);
  transform: translateY(-50%);
  transition:
    left 160ms var(--gob-sw-ease),
    background-color 160ms var(--gob-sw-ease),
    box-shadow 160ms var(--gob-sw-ease);
}

.control:hover .track {
  border-color: color-mix(in srgb, var(--gob-sw-focus) 45%, var(--gob-sw-border));
}

.root[data-checked='true'] .track {
  background: var(--gob-sw-focus);
  border-color: var(--gob-sw-focus);
}

.root[data-checked='true'] .thumb {
  left: calc(var(--gob-sw-track-w) - var(--gob-sw-thumb) - 5px);
  box-shadow: 0 1px 4px rgba(24, 21, 17, 0.22);
}

input:focus-visible + .track {
  box-shadow: 0 0 0 4px var(--gob-sw-ring);
  border-color: var(--gob-sw-focus);
}

.copy {
  min-width: 0;
  display: grid;
  gap: 2px;
  padding-top: 1px;
}

.label {
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--gob-sw-title);
  line-height: 1.3;
}

.label .req {
  color: var(--gob-sw-vino);
  margin-left: 2px;
}

.description {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sw-muted);
  line-height: 1.4;
}

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sw-muted);
  line-height: 1.35;
  padding-left: calc(var(--gob-sw-track-w) + 12px);
}

.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }

.pill-status {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(159, 33, 65, 0.1);
  color: var(--gob-sw-vino);
}
.root[data-status='error'] .pill-status { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill-status { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill-status { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill-status { background: rgba(47,95,138,.12); color: #2f5f8a; }

.root[data-variant='dense'] { gap: 6px; }
.root[data-variant='dense'] .control { gap: 8px; }
.root[data-variant='dense'] .label { font-size: 13px; }

.root[data-variant='soft'] .control,
.root[data-variant='card'] .control,
.root[data-variant='pill'] .control,
.root[data-variant='tile'] .control,
.root[data-variant='complete'] .control {
  padding: 12px 14px;
  border-radius: 14px;
  border: 1.5px solid transparent;
  transition:
    background 160ms var(--gob-sw-ease),
    border-color 160ms var(--gob-sw-ease),
    box-shadow 160ms var(--gob-sw-ease);
}

.root[data-variant='soft'] .control {
  background: color-mix(in srgb, var(--gob-sw-vino) 6%, #fff);
}
.root[data-variant='soft'] .control:hover {
  background: color-mix(in srgb, var(--gob-sw-vino) 10%, #fff);
}
.root[data-variant='soft'][data-checked='true'] .control {
  background: color-mix(in srgb, var(--gob-sw-vino) 12%, #fff);
  border-color: color-mix(in srgb, var(--gob-sw-vino) 28%, transparent);
}

.root[data-variant='card'] .control {
  background: #fff;
  border-color: rgba(24, 21, 17, 0.1);
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.03);
}
.root[data-variant='card'] .control:hover {
  border-color: color-mix(in srgb, var(--gob-sw-vino) 35%, rgba(24,21,17,.1));
}
.root[data-variant='card'][data-checked='true'] .control {
  border-color: var(--gob-sw-focus);
  box-shadow: 0 0 0 4px var(--gob-sw-ring);
}

.root[data-variant='pill'] .control {
  border-radius: 999px;
  background: #faf9f7;
  align-items: center;
}
.root[data-variant='pill'] .track { margin-top: 0; }
.root[data-variant='pill'][data-checked='true'] .control {
  background: color-mix(in srgb, var(--gob-sw-vino) 10%, #fff);
  border-color: color-mix(in srgb, var(--gob-sw-vino) 24%, transparent);
}

.root[data-variant='tile'] .control {
  grid-template-columns: 1fr auto;
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(188,148,90,.12), transparent 50%),
    #fff;
  border-color: rgba(24, 21, 17, 0.1);
}
.root[data-variant='tile'] .track { order: 2; margin-top: 0; align-self: center; }
.root[data-variant='tile'] .copy { order: 1; }
.root[data-variant='tile'][data-checked='true'] .control {
  border-color: var(--gob-sw-dorado);
  box-shadow: 0 0 0 4px rgba(188, 148, 90, 0.18);
}
.root[data-variant='tile'][data-checked='true'] .track {
  background: var(--gob-sw-dorado);
  border-color: var(--gob-sw-dorado);
}

.root[data-variant='complete'] .control {
  background: #fff;
  border-color: rgba(24, 21, 17, 0.1);
}
.root[data-variant='complete'][data-checked='true'] .control {
  border-color: var(--gob-sw-focus);
  box-shadow: 0 0 0 4px var(--gob-sw-ring);
}

.root[data-variant='soft'] .helper,
.root[data-variant='card'] .helper,
.root[data-variant='pill'] .helper,
.root[data-variant='tile'] .helper,
.root[data-variant='complete'] .helper {
  padding-left: 14px;
}

.root[data-disabled='true'] .track {
  border-color: #ebe6df;
  background: #f0ebe4;
}
.root[data-disabled='true'][data-checked='true'] .track {
  background: color-mix(in srgb, var(--gob-sw-focus) 40%, #ebe6df);
  border-color: transparent;
}
`;
