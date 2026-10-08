export const spinnerStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-sp-vino: #9f2141;
  --gob-sp-dorado: #bc945a;
  --gob-sp-accent: var(--gob-sp-vino);
  --gob-sp-accent-2: var(--gob-sp-dorado);
  --gob-sp-track: #efece7;
  --gob-sp-title: #181511;
  --gob-sp-muted: #8a8278;
  --gob-sp-bg: #ffffff;
  --gob-sp-border: rgba(24, 21, 17, 0.07);
  --gob-sp-size: 36px;
  --gob-sp-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  place-items: center;
  gap: 14px;
  min-width: 0;
  padding: 28px 22px;
  border: 1px solid var(--gob-sp-border);
  border-radius: 20px;
  background: var(--gob-sp-bg);
  box-shadow: 0 12px 28px rgba(24, 21, 17, 0.045);
}

.root[data-size='sm'] { --gob-sp-size: 24px; }
.root[data-size='md'] { --gob-sp-size: 36px; }
.root[data-size='lg'] { --gob-sp-size: 52px; }

.root[data-status='info'] { --gob-sp-accent: #2f5f8a; --gob-sp-accent-2: #5a86ad; }
.root[data-status='warning'] { --gob-sp-accent: #d0921a; --gob-sp-accent-2: #bc945a; }
.root[data-status='success'] { --gob-sp-accent: #1f8a55; --gob-sp-accent-2: #4aa879; }
.root[data-status='danger'] { --gob-sp-accent: #c62828; --gob-sp-accent-2: #9f2141; }

.root[data-variant='button'],
.root[data-variant='inline'] {
  display: inline-flex;
  width: auto;
  place-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  box-shadow: none;
}

.root[data-variant='page'] {
  min-height: 220px;
  gap: 16px;
}

.root[data-variant='overlay'] {
  min-height: 180px;
  background: #ffffff;
}

.visual {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--gob-sp-size);
  height: var(--gob-sp-size);
}

.label {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--gob-sp-title);
  text-align: center;
}

.hint {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-sp-muted);
  text-align: center;
}

.pill {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: color-mix(in srgb, var(--gob-sp-accent) 12%, transparent);
  color: var(--gob-sp-accent);
}

/* Ring */
.ring {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  border: 3px solid var(--gob-sp-track);
  border-top-color: var(--gob-sp-accent);
  animation: gob-sp-spin 0.85s linear infinite;
}

.root[data-size='sm'] .ring { border-width: 2px; }
.root[data-size='lg'] .ring { border-width: 4px; }

/* Dual */
.dual {
  position: relative;
  width: 100%;
  height: 100%;
}
.dual-outer,
.dual-inner {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 3px solid transparent;
}
.dual-outer {
  border-top-color: var(--gob-sp-accent);
  border-right-color: color-mix(in srgb, var(--gob-sp-accent) 35%, transparent);
  animation: gob-sp-spin 0.95s linear infinite;
}
.dual-inner {
  inset: 22%;
  border-bottom-color: var(--gob-sp-accent-2);
  border-left-color: color-mix(in srgb, var(--gob-sp-accent-2) 40%, transparent);
  animation: gob-sp-spin-rev 0.7s linear infinite;
}

/* Dots */
.dots {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: var(--gob-sp-size);
}
.dot {
  width: calc(var(--gob-sp-size) * 0.22);
  height: calc(var(--gob-sp-size) * 0.22);
  border-radius: 999px;
  background: var(--gob-sp-accent);
  animation: gob-sp-bounce 0.9s var(--gob-sp-ease) infinite;
}
.dot:nth-child(2) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.12s;
}
.dot:nth-child(3) {
  animation-delay: 0.24s;
}

/* Pulse */
.pulse {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--gob-sp-accent);
  animation: gob-sp-pulse 1.15s var(--gob-sp-ease) infinite;
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--gob-sp-accent-2) 35%, transparent);
}

/* Bars */
.bars {
  display: inline-flex;
  align-items: flex-end;
  gap: 5px;
  height: var(--gob-sp-size);
}
.bar {
  width: calc(var(--gob-sp-size) * 0.16);
  height: 35%;
  border-radius: 999px;
  background: var(--gob-sp-accent);
  animation: gob-sp-bars 0.85s ease-in-out infinite;
}
.bar:nth-child(2) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.1s;
}
.bar:nth-child(3) {
  animation-delay: 0.2s;
}
.bar:nth-child(4) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.3s;
}

.root[data-variant='complete'] {
  gap: 12px;
}
.root[data-variant='complete'] .copy {
  display: grid;
  gap: 6px;
  justify-items: center;
}

/* —— 10 variantes modernas —— */

/* Orbit */
.orbit {
  position: relative;
  width: 100%;
  height: 100%;
  animation: gob-sp-spin 1.15s linear infinite;
}
.orbit-core {
  position: absolute;
  inset: 36%;
  border-radius: 999px;
  background: var(--gob-sp-accent);
}
.orbit-sat {
  position: absolute;
  top: 4%;
  left: 50%;
  width: 22%;
  height: 22%;
  margin-left: -11%;
  border-radius: 999px;
  background: var(--gob-sp-accent-2);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gob-sp-accent-2) 18%, transparent);
}

/* Arc SVG */
.arc {
  width: 100%;
  height: 100%;
  animation: gob-sp-spin 0.9s linear infinite;
}
.arc-track {
  fill: none;
  stroke: var(--gob-sp-track);
  stroke-width: 3.5;
}
.arc-stroke {
  fill: none;
  stroke: var(--gob-sp-accent);
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-dasharray: 52 120;
}

/* Dash ring */
.dash {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  border: 3px dashed color-mix(in srgb, var(--gob-sp-accent) 55%, var(--gob-sp-track));
  border-top-color: var(--gob-sp-accent);
  border-right-color: var(--gob-sp-accent-2);
  animation: gob-sp-spin 1.2s linear infinite;
}

/* Comet */
.comet {
  position: relative;
  width: 100%;
  height: 100%;
  animation: gob-sp-spin 0.85s linear infinite;
}
.comet-tail {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 3px solid transparent;
  border-top-color: var(--gob-sp-accent);
  border-right-color: color-mix(in srgb, var(--gob-sp-accent) 25%, transparent);
  filter: drop-shadow(0 0 4px color-mix(in srgb, var(--gob-sp-accent) 35%, transparent));
}
.comet-head {
  position: absolute;
  top: 0;
  left: 50%;
  width: 18%;
  height: 18%;
  margin-left: -9%;
  border-radius: 999px;
  background: var(--gob-sp-accent-2);
}

/* Petals */
.petals {
  position: relative;
  width: 100%;
  height: 100%;
  animation: gob-sp-spin 1.35s linear infinite;
}
.petal {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28%;
  height: 28%;
  margin: -14% 0 0 -14%;
  border-radius: 999px;
  background: var(--gob-sp-accent);
  transform-origin: center center;
  opacity: 0.9;
}
.petal:nth-child(1) { transform: rotate(0deg) translateY(-120%); background: var(--gob-sp-accent); }
.petal:nth-child(2) { transform: rotate(72deg) translateY(-120%); background: var(--gob-sp-accent-2); opacity: 0.75; }
.petal:nth-child(3) { transform: rotate(144deg) translateY(-120%); background: var(--gob-sp-accent); opacity: 0.6; }
.petal:nth-child(4) { transform: rotate(216deg) translateY(-120%); background: var(--gob-sp-accent-2); opacity: 0.75; }
.petal:nth-child(5) { transform: rotate(288deg) translateY(-120%); background: var(--gob-sp-accent); opacity: 0.5; }

/* Metro squares */
.metro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  width: 72%;
  height: 72%;
}
.metro span {
  border-radius: 5px;
  background: var(--gob-sp-accent);
  animation: gob-sp-metro 1.1s var(--gob-sp-ease) infinite;
}
.metro span:nth-child(2) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.12s;
}
.metro span:nth-child(3) {
  background: var(--gob-sp-accent-2);
  animation-delay: 0.24s;
}
.metro span:nth-child(4) {
  animation-delay: 0.36s;
}

/* Wave */
.wave {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: var(--gob-sp-size);
}
.wave i {
  width: calc(var(--gob-sp-size) * 0.18);
  height: calc(var(--gob-sp-size) * 0.18);
  border-radius: 999px;
  background: var(--gob-sp-accent);
  animation: gob-sp-wave 1s var(--gob-sp-ease) infinite;
}
.wave i:nth-child(even) { background: var(--gob-sp-accent-2); }
.wave i:nth-child(2) { animation-delay: 0.08s; }
.wave i:nth-child(3) { animation-delay: 0.16s; }
.wave i:nth-child(4) { animation-delay: 0.24s; }
.wave i:nth-child(5) { animation-delay: 0.32s; }

/* Radar */
.radar {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--gob-sp-track);
  overflow: hidden;
}
.radar::before {
  content: '';
  position: absolute;
  inset: 18%;
  border-radius: 999px;
  border: 1.5px solid color-mix(in srgb, var(--gob-sp-accent-2) 45%, transparent);
}
.radar-sweep {
  position: absolute;
  inset: 0;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    color-mix(in srgb, var(--gob-sp-accent) 55%, transparent) 55deg,
    transparent 90deg
  );
  animation: gob-sp-spin 1.25s linear infinite;
}
.radar-dot {
  position: absolute;
  top: 12%;
  left: 50%;
  width: 10%;
  height: 10%;
  margin-left: -5%;
  border-radius: 999px;
  background: var(--gob-sp-accent-2);
  animation: gob-sp-spin 1.25s linear infinite;
  transform-origin: 50% 380%;
}

/* Infinity */
.infinity {
  position: relative;
  width: 100%;
  height: 100%;
}
.infinity-path {
  position: absolute;
  inset: 18% 8%;
  border: 3px solid var(--gob-sp-track);
  border-radius: 999px 999px 999px 999px / 999px 999px 999px 999px;
  clip-path: none;
}
.infinity-a,
.infinity-b {
  position: absolute;
  top: 50%;
  width: 18%;
  height: 18%;
  margin-top: -9%;
  border-radius: 999px;
  animation: gob-sp-infinity 1.4s var(--gob-sp-ease) infinite;
}
.infinity-a {
  left: 12%;
  background: var(--gob-sp-accent);
}
.infinity-b {
  right: 12%;
  background: var(--gob-sp-accent-2);
  animation-delay: 0.7s;
}

/* Morph */
.morph {
  width: 72%;
  height: 72%;
  background: var(--gob-sp-accent);
  border-radius: 42% 58% 60% 40% / 40% 42% 58% 60%;
  animation: gob-sp-morph 1.4s var(--gob-sp-ease) infinite;
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--gob-sp-accent-2) 18%, transparent);
}

@keyframes gob-sp-spin {
  to { transform: rotate(360deg); }
}
@keyframes gob-sp-spin-rev {
  to { transform: rotate(-360deg); }
}
@keyframes gob-sp-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.55; }
  40% { transform: translateY(-38%); opacity: 1; }
}
@keyframes gob-sp-pulse {
  0% { transform: scale(0.82); opacity: 0.75; box-shadow: 0 0 0 0 color-mix(in srgb, var(--gob-sp-accent-2) 40%, transparent); }
  70% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 12px transparent; }
  100% { transform: scale(0.82); opacity: 0.75; box-shadow: 0 0 0 0 transparent; }
}
@keyframes gob-sp-bars {
  0%, 100% { height: 32%; }
  50% { height: 100%; }
}
@keyframes gob-sp-metro {
  0%, 100% { transform: scale(0.72); opacity: 0.45; }
  40% { transform: scale(1); opacity: 1; }
}
@keyframes gob-sp-wave {
  0%, 100% { transform: translateY(0) scale(0.85); opacity: 0.5; }
  50% { transform: translateY(-55%) scale(1); opacity: 1; }
}
@keyframes gob-sp-infinity {
  0%, 100% { transform: translateX(0) scale(0.9); opacity: 0.65; }
  50% { transform: translateX(55%) scale(1.08); opacity: 1; }
}
@keyframes gob-sp-morph {
  0% { border-radius: 42% 58% 60% 40% / 40% 42% 58% 60%; transform: rotate(0deg) scale(0.92); background: var(--gob-sp-accent); }
  50% { border-radius: 60% 40% 42% 58% / 58% 60% 40% 42%; transform: rotate(180deg) scale(1); background: var(--gob-sp-accent-2); }
  100% { border-radius: 42% 58% 60% 40% / 40% 42% 58% 60%; transform: rotate(360deg) scale(0.92); background: var(--gob-sp-accent); }
}

@media (prefers-reduced-motion: reduce) {
  .ring,
  .dual-outer,
  .dual-inner,
  .dot,
  .pulse,
  .bar,
  .orbit,
  .arc,
  .dash,
  .comet,
  .petals,
  .metro span,
  .wave i,
  .radar-sweep,
  .radar-dot,
  .infinity-a,
  .infinity-b,
  .morph {
    animation: none;
  }
  .ring {
    border-top-color: var(--gob-sp-accent);
    border-right-color: var(--gob-sp-accent-2);
  }
  .pulse { opacity: 0.85; }
  .bar:nth-child(1) { height: 45%; }
  .bar:nth-child(2) { height: 80%; }
  .bar:nth-child(3) { height: 55%; }
  .bar:nth-child(4) { height: 70%; }
  .morph { border-radius: 28%; }
}
`;
