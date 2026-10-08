export const fileUploadStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-fu-vino: #9f2141;
  --gob-fu-vino-deep: #7a1832;
  --gob-fu-dorado: #bc945a;
  --gob-fu-title: #181511;
  --gob-fu-muted: #8a8278;
  --gob-fu-text: #3d3a35;
  --gob-fu-border: rgba(24, 21, 17, 0.12);
  --gob-fu-focus: var(--gob-fu-vino);
  --gob-fu-ring: rgba(159, 33, 65, 0.16);
  --gob-fu-bg: #ffffff;
  --gob-fu-fill: #faf9f7;
  --gob-fu-radius: 16px;
  --gob-fu-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.root[data-size='sm'] { --gob-fu-radius: 12px; }
.root[data-size='lg'] { --gob-fu-radius: 18px; }

.root[data-status='error'] { --gob-fu-focus: #c62828; --gob-fu-ring: rgba(198,40,40,.16); }
.root[data-status='success'] { --gob-fu-focus: #1f8a55; --gob-fu-ring: rgba(31,138,85,.16); }
.root[data-status='warning'] { --gob-fu-focus: #d0921a; --gob-fu-ring: rgba(208,146,26,.18); }
.root[data-status='info'] { --gob-fu-focus: #2f5f8a; --gob-fu-ring: rgba(47,95,138,.16); }

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
  color: var(--gob-fu-title);
}

.label .req {
  color: var(--gob-fu-vino);
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
  color: var(--gob-fu-vino);
}
.root[data-status='error'] .pill { background: rgba(198,40,40,.12); color: #c62828; }
.root[data-status='success'] .pill { background: rgba(31,138,85,.14); color: #1f8a55; }
.root[data-status='warning'] .pill { background: rgba(208,146,26,.16); color: #a87412; }
.root[data-status='info'] .pill { background: rgba(47,95,138,.12); color: #2f5f8a; }

.drop {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 8px;
  padding: 28px 20px;
  border: 1.5px dashed var(--gob-fu-border);
  border-radius: var(--gob-fu-radius);
  background: var(--gob-fu-fill);
  text-align: center;
  cursor: pointer;
  transition:
    border-color 160ms var(--gob-fu-ease),
    background 160ms var(--gob-fu-ease),
    box-shadow 160ms var(--gob-fu-ease);
}

.drop:hover,
.root[data-dragging='true'] .drop {
  border-color: color-mix(in srgb, var(--gob-fu-vino) 45%, var(--gob-fu-border));
  background: color-mix(in srgb, var(--gob-fu-vino) 4%, #fff);
}

.root[data-dragging='true'] .drop {
  box-shadow: 0 0 0 4px var(--gob-fu-ring);
  border-style: solid;
}

.root[data-disabled='true'] .drop {
  opacity: 0.72;
  cursor: not-allowed;
}

.icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gob-fu-vino);
  background: color-mix(in srgb, var(--gob-fu-dorado) 18%, #fff);
  border: 1px solid color-mix(in srgb, var(--gob-fu-dorado) 28%, transparent);
}
.icon svg { width: 22px; height: 22px; display: block; }

.title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--gob-fu-title);
  letter-spacing: -0.01em;
}

.title em {
  font-style: normal;
  color: var(--gob-fu-vino);
}

.hint {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-fu-muted);
  max-width: 36ch;
  line-height: 1.4;
}

.browse {
  appearance: none;
  margin-top: 4px;
  border: 0;
  border-radius: 999px;
  min-height: 34px;
  padding: 0 14px;
  background: var(--gob-fu-vino);
  color: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
.browse:hover { background: var(--gob-fu-vino-deep); }
.root[data-disabled='true'] .browse { pointer-events: none; }

.input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}

.root[data-variant='soft'] .drop {
  background: color-mix(in srgb, var(--gob-fu-vino) 5%, #fff);
  border-color: color-mix(in srgb, var(--gob-fu-vino) 18%, var(--gob-fu-border));
}

.root[data-variant='dense'] .drop {
  padding: 16px 14px;
  gap: 6px;
}
.root[data-variant='dense'] .icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
}
.root[data-variant='dense'] .icon svg { width: 18px; height: 18px; }

.root[data-variant='button'] .drop,
.root[data-variant='compact'] .drop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 12px;
  padding: 12px 14px;
  border-style: solid;
  background: #fff;
}

.root[data-variant='button'] .hint,
.root[data-variant='compact'] .hint,
.root[data-variant='button'] .browse,
.root[data-variant='compact'] .browse {
  display: none;
}

.root[data-variant='button'] .title,
.root[data-variant='compact'] .title {
  font-size: 13px;
}

.root[data-variant='complete'] .drop {
  background: #fff;
  border-style: dashed;
}

.files {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.file {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(24, 21, 17, 0.08);
  background: #fff;
}

.file-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gob-fu-dorado);
  background: #f7f4ef;
}
.file-icon svg { width: 18px; height: 18px; }

.file-meta {
  min-width: 0;
  display: grid;
  gap: 2px;
}

.file-name {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--gob-fu-title);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-sub {
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--gob-fu-muted);
}

.file[data-error='true'] .file-sub { color: #c62828; }

.progress {
  grid-column: 1 / -1;
  height: 6px;
  border-radius: 999px;
  background: #efebe4;
  overflow: hidden;
}

.progress > span {
  display: block;
  height: 100%;
  width: 0%;
  border-radius: inherit;
  background: var(--gob-fu-vino);
  transition: width 200ms var(--gob-fu-ease);
}

.file[data-error='true'] .progress > span { background: #c62828; }
.file[data-done='true'] .progress > span { background: #1f8a55; }

.remove {
  appearance: none;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--gob-fu-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.remove:hover {
  background: rgba(24, 21, 17, 0.06);
  color: var(--gob-fu-title);
}
.remove svg { width: 16px; height: 16px; }

.helper {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-fu-muted);
  line-height: 1.35;
}
.root[data-status='error'] .helper { color: #c62828; }
.root[data-status='success'] .helper { color: #1f8a55; }
.root[data-status='warning'] .helper { color: #a87412; }
.root[data-status='info'] .helper { color: #2f5f8a; }
`;
