export const toastStyles = `
:host {
  display: inline-block;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ts-vino: #9f2141;
  --gob-ts-dorado: #bc945a;
  --gob-ts-title: #181511;
  --gob-ts-muted: #6f6a63;
  --gob-ts-border: rgba(24, 21, 17, 0.1);
  --gob-ts-bg: #ffffff;
  --gob-ts-fill: #f3f3f3;
  --gob-ts-accent: #2f6fed;
  --gob-ts-radius: 16px;
  --gob-ts-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.root {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  width: min(360px, 100%);
  padding: 14px 14px 14px 14px;
  border-radius: var(--gob-ts-radius);
  border: 1px solid var(--gob-ts-border);
  background: var(--gob-ts-bg);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 16px 36px rgba(24, 21, 17, 0.12);
  color: var(--gob-ts-title);
  overflow: hidden;
  animation: gob-ts-in 180ms var(--gob-ts-ease);
}

.root[data-tone='info'] { --gob-ts-accent: #2f6fed; }
.root[data-tone='success'] { --gob-ts-accent: #1f8a55; }
.root[data-tone='warning'] { --gob-ts-accent: #b87712; }
.root[data-tone='danger'] { --gob-ts-accent: #c62828; }
.root[data-tone='neutral'] { --gob-ts-accent: #6f6a63; }

.icon {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: color-mix(in srgb, var(--gob-ts-accent) 12%, #fff);
  color: var(--gob-ts-accent);
  flex: 0 0 auto;
}
.icon svg { width: 17px; height: 17px; display: block; }

.body {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 13.5px;
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.description {
  margin: 0;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--gob-ts-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.action,
.dismiss {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  border: 0;
  border-radius: 9px;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 140ms var(--gob-ts-ease), color 140ms var(--gob-ts-ease);
}

.action {
  padding: 0 10px;
  background: color-mix(in srgb, var(--gob-ts-accent) 12%, #fff);
  color: var(--gob-ts-accent);
}
.action:hover { background: color-mix(in srgb, var(--gob-ts-accent) 18%, #fff); }

.dismiss {
  width: 30px;
  padding: 0;
  background: transparent;
  color: var(--gob-ts-muted);
}
.dismiss:hover {
  background: #f3f3f3;
  color: var(--gob-ts-title);
}
.dismiss svg { width: 13px; height: 13px; display: block; }

.progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: color-mix(in srgb, var(--gob-ts-accent) 14%, transparent);
  display: none;
  overflow: hidden;
}
.progress > i {
  display: block;
  height: 100%;
  width: 100%;
  background: var(--gob-ts-accent);
  transform-origin: left center;
  animation: gob-ts-bar linear forwards;
}

.root[data-variant='progress'] .progress,
.root[data-variant='complete'] .progress { display: block; }

.root[data-variant='soft'] {
  background: color-mix(in srgb, var(--gob-ts-accent) 8%, #fff);
  border-color: color-mix(in srgb, var(--gob-ts-accent) 16%, transparent);
  box-shadow: 0 10px 24px rgba(24, 21, 17, 0.08);
}

.root[data-variant='solid'] {
  background: var(--gob-ts-accent);
  border-color: var(--gob-ts-accent);
  color: #fff;
}
.root[data-variant='solid'] .description { color: rgba(255,255,255,0.88); }
.root[data-variant='solid'] .icon {
  background: rgba(255,255,255,0.16);
  color: #fff;
}
.root[data-variant='solid'] .action {
  background: rgba(255,255,255,0.18);
  color: #fff;
}
.root[data-variant='solid'] .dismiss { color: rgba(255,255,255,0.85); }
.root[data-variant='solid'] .dismiss:hover {
  background: rgba(255,255,255,0.14);
  color: #fff;
}
.root[data-variant='solid'] .progress {
  background: rgba(255,255,255,0.2);
}
.root[data-variant='solid'] .progress > i { background: #fff; }

.root[data-variant='outline'] {
  background: var(--gob-ts-bg);
  border-color: color-mix(in srgb, var(--gob-ts-accent) 28%, transparent);
}

.root[data-variant='dense'],
.root[data-variant='compact'] {
  padding: 10px 12px;
  border-radius: 13px;
  gap: 10px;
  width: min(300px, 100%);
}
.root[data-variant='dense'] .icon,
.root[data-variant='compact'] .icon {
  width: 28px;
  height: 28px;
  border-radius: 9px;
}
.root[data-variant='compact'] .description { display: none; }

.root[data-variant='action'] .action { display: inline-flex; }

.root[data-variant='stacked'] {
  width: min(320px, 100%);
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 10px 0 -4px #fff,
    0 10px 0 -3px var(--gob-ts-border),
    0 18px 0 -8px #fff,
    0 18px 0 -7px var(--gob-ts-border),
    0 16px 36px rgba(24, 21, 17, 0.12);
}

.root[data-variant='complete'] {
  border-left: 3px solid var(--gob-ts-dorado);
}

.root[data-open='false'] {
  display: none;
}

@keyframes gob-ts-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes gob-ts-bar {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}
`;
