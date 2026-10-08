export const heroBlockStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-hb-vino: #9f2141;
  --gob-hb-vino-deep: #6e142c;
  --gob-hb-gold: #bc945a;
  --gob-hb-title: #181511;
  --gob-hb-muted: #6f6a63;
  --gob-hb-fill: #f3f3f3;
  --gob-hb-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 28px;
  align-items: center;
  width: 100%;
  min-height: 280px;
  padding: 36px 34px;
  border-radius: 28px;
  border: 1px solid rgba(24, 21, 17, 0.1);
  background: #fff;
  overflow: hidden;
  isolation: isolate;
}

.copy { display: grid; gap: 14px; align-content: center; min-width: 0; z-index: 1; }

.eyebrow {
  margin: 0;
  width: fit-content;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gob-hb-muted);
  padding-left: 10px;
  border-left: 2px solid var(--gob-hb-gold);
}

.title {
  margin: 0;
  font-size: clamp(2rem, 4.2vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.98;
  color: var(--gob-hb-title);
  max-width: 11ch;
  text-wrap: balance;
}

.description {
  margin: 0;
  font-size: 15.5px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--gob-hb-muted);
  max-width: 38ch;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

.btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  font: inherit;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: background 160ms var(--gob-hb-ease), transform 160ms var(--gob-hb-ease), box-shadow 160ms var(--gob-hb-ease), border-color 160ms var(--gob-hb-ease);
}
.btn-primary {
  border: 0;
  background: var(--gob-hb-vino);
  color: #fff;
}
.btn-primary:hover {
  background: var(--gob-hb-vino-deep);
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(159, 33, 65, 0.22);
}
.btn-secondary {
  border: 1px solid rgba(24, 21, 17, 0.14);
  background: #fff;
  color: var(--gob-hb-title);
}
.btn-secondary:hover { background: var(--gob-hb-fill); }

.media {
  position: relative;
  min-height: 220px;
  border-radius: 22px;
  background: #ebe7e2;
  overflow: hidden;
  border: 1px solid rgba(24, 21, 17, 0.06);
}
.media-grid {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(24,21,17,0.07) 20px, rgba(24,21,17,0.07) 21px),
    repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(24,21,17,0.07) 20px, rgba(24,21,17,0.07) 21px);
}
.media-orb {
  position: absolute;
  border-radius: 999px;
}
.media-orb-a {
  width: 58%;
  aspect-ratio: 1;
  left: -10%;
  top: 16%;
  background: var(--gob-hb-vino);
  opacity: 0.16;
}
.media-orb-b {
  width: 44%;
  aspect-ratio: 1;
  right: -8%;
  bottom: -10%;
  background: var(--gob-hb-gold);
  opacity: 0.3;
}
.media-card {
  position: absolute;
  left: 16%;
  top: 22%;
  width: 58%;
  height: 52%;
  border-radius: 18px;
  background: rgba(255,255,255,0.72);
  border: 2px solid rgba(24,21,17,0.5);
  transform: rotate(-5deg);
  box-shadow: 0 16px 36px rgba(24,21,17,0.12);
}

.root[data-variant='soft'] { background: var(--gob-hb-fill); border-color: transparent; }
.root[data-variant='soft'] .media { background: #e4e0db; }

.root[data-variant='split'] { padding: 0; gap: 0; min-height: 320px; }
.root[data-variant='split'] .copy { padding: 40px 36px; }
.root[data-variant='split'] .media {
  min-height: 100%;
  border-radius: 0;
  border: 0;
  border-left: 1px solid rgba(24,21,17,0.06);
}

.root[data-variant='centered'] {
  grid-template-columns: 1fr;
  text-align: center;
  justify-items: center;
  min-height: 260px;
  padding: 48px 32px;
}
.root[data-variant='centered'] .copy { justify-items: center; }
.root[data-variant='centered'] .eyebrow { border-left: 0; padding-left: 0; border-bottom: 2px solid var(--gob-hb-gold); padding-bottom: 4px; }
.root[data-variant='centered'] .title { max-width: 14ch; }
.root[data-variant='centered'] .description { max-width: 42ch; }
.root[data-variant='centered'] .actions { justify-content: center; }
.root[data-variant='centered'] .media { display: none; }

.root[data-variant='dense'] {
  grid-template-columns: 1fr auto;
  min-height: 0;
  padding: 22px 24px;
  border-radius: 18px;
  gap: 18px;
}
.root[data-variant='dense'] .title { font-size: 1.35rem; max-width: none; }
.root[data-variant='dense'] .description { font-size: 13.5px; }
.root[data-variant='dense'] .media { width: 120px; min-height: 88px; border-radius: 14px; }
.root[data-variant='dense'] .btn { min-height: 38px; border-radius: 11px; font-size: 13px; }

.root[data-variant='outline'] {
  border: 2px solid rgba(159, 33, 65, 0.28);
  box-shadow: inset 5px 0 0 var(--gob-hb-vino);
}
.root[data-variant='outline'] .eyebrow { color: var(--gob-hb-vino); border-left-color: var(--gob-hb-vino); }

.root[data-variant='compact'] {
  grid-template-columns: 1fr;
  min-height: 0;
  padding: 28px;
}
.root[data-variant='compact'] .media { display: none; }
.root[data-variant='compact'] .title { font-size: clamp(1.6rem, 3vw, 2rem); max-width: 16ch; }

.root[data-variant='feature'] .btn-primary { box-shadow: 0 12px 26px rgba(159,33,65,0.2); }
.root[data-variant='feature']::after {
  content: '';
  position: absolute;
  right: -48px;
  bottom: -60px;
  width: 200px;
  height: 200px;
  border-radius: 999px;
  background: var(--gob-hb-vino);
  opacity: 0.06;
  pointer-events: none;
}

.root[data-variant='brand'] {
  background: var(--gob-hb-vino);
  border-color: transparent;
  color: #fff;
}
.root[data-variant='brand'] .eyebrow { color: rgba(255,255,255,0.72); border-left-color: var(--gob-hb-gold); }
.root[data-variant='brand'] .title { color: #fff; }
.root[data-variant='brand'] .description { color: rgba(255,255,255,0.8); }
.root[data-variant='brand'] .btn-primary { background: #fff; color: var(--gob-hb-vino-deep); }
.root[data-variant='brand'] .btn-primary:hover { background: #f6f0e4; box-shadow: 0 12px 24px rgba(24,21,17,0.18); }
.root[data-variant='brand'] .btn-secondary {
  background: transparent;
  border-color: rgba(255,255,255,0.35);
  color: #fff;
}
.root[data-variant='brand'] .btn-secondary:hover { background: rgba(255,255,255,0.08); }
.root[data-variant='brand'] .media { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.12); }
.root[data-variant='brand'] .media-card { background: rgba(255,255,255,0.16); border-color: rgba(255,255,255,0.55); }
.root[data-variant='brand'] .media-orb-a { background: #fff; opacity: 0.08; }
.root[data-variant='brand'] .media-orb-b { opacity: 0.35; }

.root[data-variant='complete'] {
  background: #fffaf2;
  border-color: rgba(188, 148, 90, 0.35);
}
.root[data-variant='complete']::before {
  content: '';
  position: absolute;
  top: 0; left: 32px;
  width: 72px; height: 5px;
  border-radius: 0 0 6px 6px;
  background: var(--gob-hb-gold);
}
.root[data-variant='complete'] .eyebrow { color: #8a6d3a; }
.root[data-variant='complete'] .btn-primary { background: var(--gob-hb-title); }
.root[data-variant='complete'] .btn-primary:hover { background: #000; box-shadow: 0 12px 24px rgba(24,21,17,0.2); }

@media (max-width: 720px) {
  .root, .root[data-variant='split'], .root[data-variant='dense'] {
    grid-template-columns: 1fr;
    padding: 26px 22px;
    min-height: 0;
  }
  .root[data-variant='split'] .copy { padding: 26px 22px 8px; }
  .root[data-variant='split'] .media {
    order: -1;
    min-height: 160px;
    border-left: 0;
    border-bottom: 1px solid rgba(24,21,17,0.06);
  }
  .title { max-width: none; }
  .root[data-variant='dense'] .media { width: 100%; min-height: 120px; }
}

@media (prefers-reduced-motion: reduce) {
  .btn { transition: none !important; }
  .btn-primary:hover { transform: none; }
}
`;
