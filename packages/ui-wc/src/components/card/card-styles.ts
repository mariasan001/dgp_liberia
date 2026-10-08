export const cardStyles = `
:host {
  display: block;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-card-vino: #9f2141;
  --gob-card-dorado: #bc945a;
  --gob-card-title: #181511;
  --gob-card-muted: #6f6a63;
  --gob-card-border: rgba(24, 21, 17, 0.1);
  --gob-card-bg: #ffffff;
  --gob-card-fill: #f3f3f3;
  --gob-card-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: grid;
  gap: 12px;
  width: 100%;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid var(--gob-card-border);
  background: var(--gob-card-bg);
  color: var(--gob-card-title);
  overflow: hidden;
}

.root::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--gob-card-dorado);
  opacity: 0;
}

.meta {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-card-muted);
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-card-muted);
}

.body {
  margin: 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--gob-card-fill);
  font-size: 13px;
  font-weight: 550;
  line-height: 1.45;
}

.media {
  display: none;
  height: 96px;
  border-radius: 12px;
  background: var(--gob-card-fill);
  border: 1px solid rgba(24, 21, 17, 0.06);
}

.footer {
  display: none;
  justify-content: flex-end;
}

.action {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 11px;
  border: 0;
  background: var(--gob-card-vino);
  color: #fff;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
}
.action:hover { background: #7a1832; }

.root[data-variant='soft'] {
  background: var(--gob-card-fill);
  border-color: transparent;
}
.root[data-variant='outline'] {
  border-color: color-mix(in srgb, var(--gob-card-vino) 24%, #d7dde6);
}
.root[data-variant='elevated'] {
  box-shadow:
    0 1px 0 rgba(24, 21, 17, 0.04),
    0 14px 28px rgba(24, 21, 17, 0.1);
}
.root[data-variant='media'] .media { display: block; }
.root[data-variant='action'] .footer,
.root[data-variant='media'] .footer { display: flex; }
.root[data-variant='dense'] {
  gap: 8px;
  padding: 14px;
  border-radius: 14px;
}
.root[data-variant='dense'] .title { font-size: 14.5px; }
.root[data-variant='dense'] .body { padding: 10px 12px; }
.root[data-variant='stat'] .title {
  font-size: 28px;
  letter-spacing: -0.04em;
}
.root[data-variant='stat'] .description { order: -1; }
.root[data-variant='horizontal'] {
  grid-template-columns: 72px 1fr;
  align-items: center;
}
.root[data-variant='horizontal'] .media {
  display: block;
  height: 72px;
  grid-row: 1 / span 4;
}
.root[data-variant='horizontal'] .meta,
.root[data-variant='horizontal'] .title,
.root[data-variant='horizontal'] .description,
.root[data-variant='horizontal'] .body,
.root[data-variant='horizontal'] .footer {
  grid-column: 2;
}
.root[data-variant='complete']::before { opacity: 1; }
.root[data-variant='complete'] {
  border-color: color-mix(in srgb, var(--gob-card-dorado) 28%, #d7dde6);
}
`;
