export const linkStyles = `
:host {
  display: inline-flex;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-lk-vino: #9f2141;
  --gob-lk-vino-deep: #7a1832;
  --gob-lk-dorado: #bc945a;
  --gob-lk-title: #181511;
  --gob-lk-muted: #6f6a63;
  --gob-lk-color: var(--gob-lk-vino);
  --gob-lk-size: 14px;
  --gob-lk-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: var(--gob-lk-color);
  font-size: var(--gob-lk-size);
  font-weight: 650;
  letter-spacing: -0.015em;
  line-height: 1.3;
  text-decoration: none;
  cursor: pointer;
  transition: color 150ms var(--gob-lk-ease), background 150ms var(--gob-lk-ease), opacity 150ms var(--gob-lk-ease);
}

.root:hover { color: var(--gob-lk-vino-deep); }
.root:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--gob-lk-vino) 40%, transparent);
  outline-offset: 3px;
  border-radius: 4px;
}

.root[data-size='sm'] { --gob-lk-size: 12px; }
.root[data-size='lg'] { --gob-lk-size: 16px; }

.root[data-tone='primary'] { --gob-lk-color: var(--gob-lk-vino); }
.root[data-tone='neutral'] { --gob-lk-color: var(--gob-lk-title); }
.root[data-tone='success'] { --gob-lk-color: #1f8a55; }
.root[data-tone='warning'] { --gob-lk-color: #b87712; }
.root[data-tone='danger'] { --gob-lk-color: #c62828; }

.root[data-variant='inline'] {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.root[data-variant='underline'] {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1.5px;
  text-decoration-color: color-mix(in srgb, currentColor 45%, transparent);
}
.root[data-variant='underline']:hover {
  text-decoration-color: currentColor;
}
.root[data-variant='subtle'],
.root[data-variant='muted'] {
  color: var(--gob-lk-muted);
  font-weight: 600;
}
.root[data-variant='subtle']:hover,
.root[data-variant='muted']:hover {
  color: var(--gob-lk-vino);
}
.root[data-variant='strong'] {
  font-weight: 750;
  letter-spacing: -0.02em;
}
.root[data-variant='soft'] {
  padding: 6px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--gob-lk-vino) 8%, #fff);
}
.root[data-variant='soft']:hover {
  background: color-mix(in srgb, var(--gob-lk-vino) 14%, #fff);
}
.root[data-variant='nav'] {
  font-weight: 700;
  letter-spacing: -0.02em;
}
.root[data-variant='nav']:hover {
  color: var(--gob-lk-dorado);
}
.root[data-variant='external'] .icon,
.root[data-variant='complete'] .icon {
  display: inline-flex;
}
.root[data-variant='complete'] {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  border-left: 3px solid var(--gob-lk-dorado);
}

.label { min-width: 0; }

.icon {
  display: none;
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  color: currentColor;
}
.icon svg { width: 14px; height: 14px; display: block; }
.root[data-external='true'] .icon,
.root[data-variant='external'] .icon,
.root[data-variant='complete'] .icon,
.root[data-variant='nav'] .icon {
  display: inline-flex;
}

.root[data-disabled='true'] {
  opacity: 0.45;
  pointer-events: none;
  cursor: not-allowed;
}
`;
