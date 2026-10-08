export const footerStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-ft-vino: #9f2141;
  --gob-ft-vino-deep: #6e142c;
  --gob-ft-gold: #bc945a;
  --gob-ft-title: #181511;
  --gob-ft-muted: #6f6a63;
  --gob-ft-fill: #f3f3f3;
  --gob-ft-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: grid;
  gap: 22px;
  width: 100%;
  padding: 28px 28px 22px;
  border-radius: 24px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  overflow: hidden;
}

.top {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 24px 32px;
  align-items: start;
}

.brand-block { display: grid; gap: 8px; min-width: 0; }

.brand {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: var(--gob-ft-title);
}

.tagline {
  margin: 0;
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-ft-muted);
  max-width: 36ch;
}

.links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  justify-content: flex-end;
  align-content: start;
}

.link {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  font: inherit;
  font-size: 13.5px;
  font-weight: 650;
  color: var(--gob-ft-title);
  cursor: pointer;
  letter-spacing: -0.01em;
}
.link:hover { color: var(--gob-ft-vino); }

.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(24, 21, 17, 0.08);
}

.legal {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-ft-muted);
}

.mark {
  width: 36px;
  height: 4px;
  border-radius: 999px;
  background: var(--gob-ft-gold);
}

.root[data-variant='soft'] {
  background: var(--gob-ft-fill);
  border-color: transparent;
}

.root[data-variant='dense'] {
  gap: 12px;
  padding: 16px 18px;
  border-radius: 16px;
}
.root[data-variant='dense'] .top { gap: 12px; }
.root[data-variant='dense'] .brand { font-size: 1rem; }
.root[data-variant='dense'] .tagline { font-size: 12.5px; }
.root[data-variant='dense'] .bottom { padding-top: 10px; }

.root[data-variant='outline'] {
  border: 1.5px solid rgba(159, 33, 65, 0.28);
  box-shadow: inset 4px 0 0 var(--gob-ft-vino);
}

.root[data-variant='columns'] .links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 18px;
  justify-items: start;
}
.root[data-variant='columns'] .link {
  min-height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  background: var(--gob-ft-fill);
  display: inline-flex;
  align-items: center;
}

.root[data-variant='legal'] .top { grid-template-columns: 1fr; }
.root[data-variant='legal'] .links { justify-content: flex-start; }
.root[data-variant='legal'] .legal {
  font-size: 12.5px;
  max-width: 62ch;
  line-height: 1.5;
}

.root[data-variant='compact'] {
  padding: 18px 20px;
  border-radius: 16px;
}
.root[data-variant='compact'] .top {
  grid-template-columns: auto 1fr;
  align-items: center;
}
.root[data-variant='compact'] .tagline,
.root[data-variant='compact'] .bottom { display: none; }
.root[data-variant='compact'] .links { gap: 8px 14px; }

.root[data-variant='wide'] { padding: 32px 34px 24px; }
.root[data-variant='wide'] .brand { font-size: 1.45rem; }
.root[data-variant='wide'] .links { gap: 10px 22px; }

.root[data-variant='brand'] {
  background: var(--gob-ft-vino);
  border-color: transparent;
  color: #fff;
}
.root[data-variant='brand'] .brand { color: #fff; }
.root[data-variant='brand'] .tagline,
.root[data-variant='brand'] .legal { color: rgba(255,255,255,0.72); }
.root[data-variant='brand'] .link { color: #fff; }
.root[data-variant='brand'] .link:hover { color: #f6f0e4; }
.root[data-variant='brand'] .bottom { border-top-color: rgba(255,255,255,0.16); }
.root[data-variant='brand'] .mark { background: var(--gob-ft-gold); }
.root[data-variant='brand']::after {
  content: '';
  position: absolute;
  right: -30px;
  top: -40px;
  width: 160px;
  height: 160px;
  border-radius: 999px;
  background: #fff;
  opacity: 0.06;
  pointer-events: none;
}

.root[data-variant='complete'] {
  background: #fffaf2;
  border-color: rgba(188, 148, 90, 0.35);
}
.root[data-variant='complete'] .mark { width: 52px; height: 5px; }
.root[data-variant='complete'] .link:hover { color: #8a6d3a; }

@media (max-width: 720px) {
  .top { grid-template-columns: 1fr; }
  .links { justify-content: flex-start; }
  .root[data-variant='compact'] .top { grid-template-columns: 1fr; }
  .root[data-variant='columns'] .links { grid-template-columns: 1fr; }
}
`;
