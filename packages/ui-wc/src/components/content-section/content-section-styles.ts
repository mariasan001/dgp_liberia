export const contentSectionStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-cs-vino: #9f2141;
  --gob-cs-vino-deep: #6e142c;
  --gob-cs-vino-soft: #f8eef1;
  --gob-cs-gold: #bc945a;
  --gob-cs-gold-soft: #f6f0e4;
  --gob-cs-title: #181511;
  --gob-cs-muted: #6f6a63;
  --gob-cs-border: rgba(24, 21, 17, 0.1);
  --gob-cs-bg: #ffffff;
  --gob-cs-fill: #f3f3f3;
  --gob-cs-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*, *::before, *::after { box-sizing: border-box; }

.root {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  width: 100%;
  min-height: 0;
  padding: 0;
  border-radius: 26px;
  border: 1px solid var(--gob-cs-border);
  background: var(--gob-cs-bg);
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 220ms var(--gob-cs-ease),
    box-shadow 220ms var(--gob-cs-ease),
    border-color 220ms var(--gob-cs-ease);
}
.root:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 48px rgba(24, 21, 17, 0.1);
}

.mark {
  position: absolute;
  top: 0;
  left: 28px;
  width: 42px;
  height: 4px;
  border-radius: 0 0 6px 6px;
  background: var(--gob-cs-gold);
  z-index: 2;
}

.copy {
  position: relative;
  z-index: 1;
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 34px 32px 32px;
  min-width: 0;
}

.eyebrow {
  margin: 0;
  width: fit-content;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gob-cs-muted);
  line-height: 1.2;
}

.title {
  margin: 0;
  font-size: clamp(1.55rem, 3vw, 2.05rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  color: var(--gob-cs-title);
  line-height: 1.05;
  max-width: 12ch;
  text-wrap: balance;
}

.description {
  margin: 0;
  font-size: 15.5px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--gob-cs-muted);
  max-width: 36ch;
}

.body {
  margin: 4px 0 0;
  padding: 0;
  color: var(--gob-cs-title);
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.55;
  max-width: 42ch;
}

.steps {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: grid;
  gap: 10px;
}

.step {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 14px;
  background: var(--gob-cs-fill);
  border: 1px solid rgba(24, 21, 17, 0.05);
}

.step-num {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: #fff;
  border: 1px solid rgba(24, 21, 17, 0.08);
  color: var(--gob-cs-vino);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.step-label {
  font-size: 13.5px;
  font-weight: 650;
  letter-spacing: -0.015em;
  color: var(--gob-cs-title);
  line-height: 1.3;
}

.actions {
  display: none;
  margin-top: 10px;
}

.action {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 14px;
  border: 0;
  background: var(--gob-cs-vino);
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 750;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition:
    background 160ms var(--gob-cs-ease),
    transform 160ms var(--gob-cs-ease),
    box-shadow 160ms var(--gob-cs-ease);
}
.action::after {
  content: '';
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid currentColor;
  transition: transform 160ms var(--gob-cs-ease);
}
.action:hover {
  background: var(--gob-cs-vino-deep);
  box-shadow: 0 14px 28px rgba(159, 33, 65, 0.24);
  transform: translateY(-1px);
}
.action:hover::after { transform: translateX(3px); }

.media {
  display: none;
  position: relative;
  min-height: 240px;
  overflow: hidden;
  background: #ebe7e2;
}

.media-grid,
.media-orb,
.media-frame,
.media-chip {
  position: absolute;
  pointer-events: none;
}

.media-grid {
  inset: 0;
  opacity: 0.35;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 21px,
      rgba(24, 21, 17, 0.06) 21px,
      rgba(24, 21, 17, 0.06) 22px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 21px,
      rgba(24, 21, 17, 0.06) 21px,
      rgba(24, 21, 17, 0.06) 22px
    );
}

.media-orb {
  border-radius: 999px;
}
.media-orb-a {
  width: 58%;
  aspect-ratio: 1;
  left: -8%;
  top: 18%;
  background: var(--gob-cs-vino);
  opacity: 0.16;
}
.media-orb-b {
  width: 42%;
  aspect-ratio: 1;
  right: -6%;
  bottom: -8%;
  background: var(--gob-cs-gold);
  opacity: 0.28;
}

.media-frame {
  left: 18%;
  top: 20%;
  width: 54%;
  height: 54%;
  border-radius: 22px;
  border: 2px solid rgba(24, 21, 17, 0.55);
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 18px 40px rgba(24, 21, 17, 0.12);
  transform: rotate(-6deg);
}

.media-chip {
  right: 16%;
  top: 22%;
  width: 64px;
  height: 28px;
  border-radius: 999px;
  background: var(--gob-cs-vino);
  box-shadow: 0 10px 20px rgba(159, 33, 65, 0.25);
}

/* —— basic —— */
.root[data-variant='basic'] .copy { padding-top: 38px; }
.root[data-variant='basic'] .title { max-width: 11ch; }

/* —— soft —— */
.root[data-variant='soft'] {
  background: var(--gob-cs-fill);
  border-color: transparent;
}
.root[data-variant='soft'] .mark { background: rgba(24, 21, 17, 0.25); }
.root[data-variant='soft'] .copy {
  margin: 14px;
  padding: 26px 24px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(24, 21, 17, 0.05);
}

/* —— split —— */
.root[data-variant='split'] {
  grid-template-columns: 1.05fr 0.95fr;
  min-height: 320px;
}
.root[data-variant='split'] .mark { left: 32px; }
.root[data-variant='split'] .copy {
  padding: 40px 36px 36px;
  align-content: center;
}
.root[data-variant='split'] .media {
  display: block;
  min-height: 100%;
  border-left: 1px solid rgba(24, 21, 17, 0.06);
}
.root[data-variant='split'] .title { max-width: 10ch; font-size: clamp(1.7rem, 3.2vw, 2.25rem); }

/* —— centered —— */
.root[data-variant='centered'] {
  text-align: center;
  background: #fff;
}
.root[data-variant='centered'] .mark {
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
}
.root[data-variant='centered'] .copy {
  justify-items: center;
  padding: 48px 36px 44px;
  gap: 14px;
}
.root[data-variant='centered'] .eyebrow {
  letter-spacing: 0.16em;
}
.root[data-variant='centered'] .title {
  max-width: 14ch;
  font-size: clamp(1.8rem, 3.6vw, 2.4rem);
}
.root[data-variant='centered'] .description,
.root[data-variant='centered'] .body {
  max-width: 34ch;
}
.root[data-variant='centered'] .body {
  padding-top: 8px;
  border-top: 1px solid rgba(24, 21, 17, 0.08);
}

/* —— dense —— */
.root[data-variant='dense'] {
  border-radius: 16px;
}
.root[data-variant='dense']:hover {
  transform: none;
  box-shadow: none;
}
.root[data-variant='dense'] .mark {
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  border-radius: 0;
  background: var(--gob-cs-vino);
}
.root[data-variant='dense'] .copy {
  padding: 14px 16px 14px 20px;
  gap: 4px;
  grid-template-columns: 1fr;
}
.root[data-variant='dense'] .eyebrow { font-size: 10px; letter-spacing: 0.08em; }
.root[data-variant='dense'] .title {
  font-size: 1.05rem;
  max-width: none;
  letter-spacing: -0.03em;
}
.root[data-variant='dense'] .description { font-size: 12.5px; max-width: none; }
.root[data-variant='dense'] .body { font-size: 12.5px; margin: 0; max-width: none; }

/* —— outline —— */
.root[data-variant='outline'] {
  border: 2px solid rgba(159, 33, 65, 0.35);
  box-shadow: inset 6px 0 0 var(--gob-cs-vino);
}
.root[data-variant='outline'] .mark { display: none; }
.root[data-variant='outline'] .eyebrow { color: var(--gob-cs-vino); }
.root[data-variant='outline'] .title { max-width: 13ch; }

/* —— steps —— */
.root[data-variant='steps'] .copy {
  padding: 34px 28px 28px;
  gap: 14px;
}
.root[data-variant='steps'] .mark { background: var(--gob-cs-vino); }
.root[data-variant='steps'] .title { max-width: 14ch; }
.root[data-variant='steps'] .steps {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 6px;
}
.root[data-variant='steps'] .step {
  grid-template-columns: 1fr;
  justify-items: start;
  gap: 10px;
  min-height: 112px;
  padding: 16px;
  background: #fff;
  border: 1px solid rgba(24, 21, 17, 0.08);
  box-shadow: 0 8px 18px rgba(24, 21, 17, 0.04);
}
.root[data-variant='steps'] .step-num {
  background: var(--gob-cs-vino);
  color: #fff;
  border-color: transparent;
}
.root[data-variant='steps'] {
  background: var(--gob-cs-fill);
  border-color: transparent;
}

/* —— feature —— */
.root[data-variant='feature'] {
  background: #fff;
}
.root[data-variant='feature'] .mark {
  width: 64px;
  background: var(--gob-cs-vino);
}
.root[data-variant='feature'] .copy {
  padding: 38px 32px 32px;
  gap: 14px;
}
.root[data-variant='feature'] .title {
  max-width: 11ch;
  font-size: clamp(1.7rem, 3.2vw, 2.2rem);
}
.root[data-variant='feature'] .actions { display: flex; }
.root[data-variant='feature'] .action {
  box-shadow: 0 12px 26px rgba(159, 33, 65, 0.2);
}
.root[data-variant='feature']::after {
  content: '';
  position: absolute;
  right: -40px;
  bottom: -50px;
  width: 180px;
  height: 180px;
  border-radius: 999px;
  background: var(--gob-cs-vino);
  opacity: 0.06;
  pointer-events: none;
}

/* —— brand —— */
.root[data-variant='brand'] {
  background: var(--gob-cs-vino);
  border-color: transparent;
  color: #fff;
}
.root[data-variant='brand'] .mark { background: var(--gob-cs-gold); }
.root[data-variant='brand'] .eyebrow { color: rgba(255, 255, 255, 0.72); }
.root[data-variant='brand'] .title { color: #fff; max-width: 11ch; }
.root[data-variant='brand'] .description { color: rgba(255, 255, 255, 0.78); }
.root[data-variant='brand'] .body { color: rgba(255, 255, 255, 0.92); }
.root[data-variant='brand'] .actions { display: flex; }
.root[data-variant='brand'] .action {
  background: #fff;
  color: var(--gob-cs-vino-deep);
}
.root[data-variant='brand'] .action:hover {
  background: var(--gob-cs-gold-soft);
  box-shadow: 0 14px 28px rgba(24, 21, 17, 0.18);
}
.root[data-variant='brand']:hover {
  box-shadow: 0 24px 50px rgba(110, 20, 44, 0.28);
}
.root[data-variant='brand']::before {
  content: '';
  position: absolute;
  right: -30px;
  top: -40px;
  width: 200px;
  height: 200px;
  border-radius: 999px;
  background: #fff;
  opacity: 0.06;
  pointer-events: none;
}
.root[data-variant='brand']::after {
  content: '';
  position: absolute;
  left: -20px;
  bottom: -60px;
  width: 160px;
  height: 160px;
  border-radius: 999px;
  background: var(--gob-cs-gold);
  opacity: 0.16;
  pointer-events: none;
}

/* —— complete —— */
.root[data-variant='complete'] {
  border: 1px solid rgba(188, 148, 90, 0.35);
  background: #fffaf2;
  box-shadow: 0 14px 34px rgba(24, 21, 17, 0.07);
}
.root[data-variant='complete'] .mark {
  width: 72px;
  height: 5px;
  background: var(--gob-cs-gold);
}
.root[data-variant='complete'] .copy { padding: 38px 32px 32px; }
.root[data-variant='complete'] .eyebrow { color: #8a6d3a; }
.root[data-variant='complete'] .title { max-width: 12ch; }
.root[data-variant='complete'] .actions { display: flex; }
.root[data-variant='complete'] .action {
  background: var(--gob-cs-title);
  min-width: 160px;
}
.root[data-variant='complete'] .action:hover {
  background: #000;
  box-shadow: 0 14px 28px rgba(24, 21, 17, 0.22);
}
.root[data-variant='complete']:hover {
  box-shadow: 0 24px 52px rgba(24, 21, 17, 0.12);
}

@media (max-width: 720px) {
  .root { border-radius: 22px; }
  .copy { padding: 28px 22px 24px; }
  .title { max-width: none; }

  .root[data-variant='split'] {
    grid-template-columns: 1fr;
  }
  .root[data-variant='split'] .media {
    min-height: 180px;
    order: -1;
    border-left: 0;
    border-bottom: 1px solid rgba(24, 21, 17, 0.06);
  }
  .root[data-variant='split'] .copy { padding: 28px 22px 24px; }

  .root[data-variant='steps'] .steps {
    grid-template-columns: 1fr;
  }
  .root[data-variant='steps'] .step { min-height: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .root, .action, .action::after { transition: none !important; }
  .root:hover, .action:hover { transform: none; }
}
`;
