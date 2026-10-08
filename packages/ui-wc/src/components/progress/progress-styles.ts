export const progressStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-pg-vino: #9f2141;
  --gob-pg-dorado: #bc945a;
  --gob-pg-track: #f0eeeb;
  --gob-pg-fill: var(--gob-pg-vino);
  --gob-pg-fill-2: var(--gob-pg-dorado);
  --gob-pg-title: #181511;
  --gob-pg-muted: #8a8278;
  --gob-pg-bg: #ffffff;
  --gob-pg-border: rgba(24, 21, 17, 0.07);
  --gob-pg-radius: 20px;
  --gob-pg-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  display: grid;
  gap: 14px;
  min-width: 0;
  padding: 22px 22px 20px;
  border: 1px solid var(--gob-pg-border);
  border-radius: var(--gob-pg-radius);
  background: var(--gob-pg-bg);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.7) inset,
    0 12px 28px rgba(24, 21, 17, 0.045);
}

.root[data-variant='thin'],
.root[data-variant='bar'] {
  padding: 16px 18px;
  gap: 0;
  box-shadow: none;
}

.root[data-status='info'] { --gob-pg-fill: #2f5f8a; --gob-pg-fill-2: #5a86ad; }
.root[data-status='warning'] { --gob-pg-fill: #d0921a; --gob-pg-fill-2: #bc945a; }
.root[data-status='success'] { --gob-pg-fill: #1f8a55; --gob-pg-fill-2: #4aa879; }
.root[data-status='danger'] { --gob-pg-fill: #c62828; --gob-pg-fill-2: #9f2141; }

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
}

.head-main {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.label {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--gob-pg-title);
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.value {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--gob-pg-title);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.value small {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--gob-pg-dorado);
  margin-left: 2px;
}

.track {
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: var(--gob-pg-track);
  overflow: hidden;
}

.root[data-variant='thin'] .track { height: 4px; }
.root[data-variant='thick'] .track,
.root[data-variant='labeled'] .track,
.root[data-variant='stacked'] .track,
.root[data-variant='complete'] .track {
  height: 12px;
}

.fill {
  position: relative;
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--gob-pg-fill);
  transition: width 520ms var(--gob-pg-ease);
}

.fill::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 100%;
  border-radius: 999px;
  background: color-mix(in srgb, #fff 28%, transparent);
  opacity: 0.9;
}

.root[data-variant='stacked'] .fill {
  background: var(--gob-pg-vino);
}
.root[data-variant='stacked'] .fill-accent {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 18%;
  min-width: 18px;
  max-width: 48px;
  background: var(--gob-pg-dorado);
  border-radius: 0 999px 999px 0;
}

/* Indeterminate */
.root[data-variant='indeterminate'] .track {
  height: 8px;
}
.root[data-variant='indeterminate'] .fill {
  width: 32% !important;
  background: var(--gob-pg-vino);
  animation: gob-pg-indeterminate 1.5s var(--gob-pg-ease) infinite;
}
.root[data-variant='indeterminate'] .fill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gob-pg-dorado);
  opacity: 0.35;
  mix-blend-mode: soft-light;
}

@keyframes gob-pg-indeterminate {
  0% { transform: translateX(-130%); }
  100% { transform: translateX(360%); }
}

@media (prefers-reduced-motion: reduce) {
  .root[data-variant='indeterminate'] .fill {
    animation: none;
    width: 48% !important;
    transform: none;
  }
  .fill { transition: none; }
  .ring-fill { transition: none; }
  .step-dot { transition: none; }
}

/* Segmented */
.segments {
  display: grid;
  grid-template-columns: repeat(var(--gob-pg-segments, 4), minmax(0, 1fr));
  gap: 8px;
}
.segment {
  height: 12px;
  border-radius: 999px;
  background: var(--gob-pg-track);
  overflow: hidden;
  transition: background 280ms var(--gob-pg-ease), transform 280ms var(--gob-pg-ease);
}
.segment[data-on='true'] {
  background: var(--gob-pg-fill);
  transform: scaleY(1.08);
}
.segment:nth-child(even)[data-on='true'] {
  background: var(--gob-pg-fill-2);
}

/* Steps */
.steps {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 0 2px;
}
.step {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
}
.step:last-child {
  flex: 0 0 auto;
}
.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #fff;
  color: var(--gob-pg-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex: 0 0 auto;
  border: 2px solid #e6e2dc;
  box-shadow: 0 0 0 4px rgba(188, 148, 90, 0.08);
  transition:
    background 280ms var(--gob-pg-ease),
    color 280ms var(--gob-pg-ease),
    border-color 280ms var(--gob-pg-ease),
    box-shadow 280ms var(--gob-pg-ease),
    transform 280ms var(--gob-pg-ease);
}
.step[data-done='true'] .step-dot,
.step[data-active='true'] .step-dot {
  background: var(--gob-pg-fill);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--gob-pg-fill) 16%, transparent);
}
.step[data-active='true'] .step-dot {
  transform: scale(1.08);
}
.step:nth-child(even)[data-done='true'] .step-dot,
.step:nth-child(even)[data-active='true'] .step-dot {
  background: var(--gob-pg-fill-2);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--gob-pg-fill-2) 18%, transparent);
}
.step-line {
  height: 2px;
  flex: 1 1 auto;
  margin: 0 8px;
  border-radius: 999px;
  background: #e8e4de;
  position: relative;
  overflow: hidden;
}
.step[data-done='true'] .step-line {
  background: var(--gob-pg-fill);
}

/* Ring */
.ring-wrap {
  display: grid;
  justify-items: center;
  gap: 10px;
}
.ring {
  position: relative;
  width: 118px;
  height: 118px;
}
.root[data-variant='complete'] .ring {
  width: 92px;
  height: 92px;
}
.ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.ring-track {
  fill: none;
  stroke: var(--gob-pg-track);
  stroke-width: 9;
}
.ring-halo {
  fill: none;
  stroke: color-mix(in srgb, var(--gob-pg-dorado) 35%, transparent);
  stroke-width: 2;
}
.ring-fill {
  fill: none;
  stroke: var(--gob-pg-fill);
  stroke-width: 9;
  stroke-linecap: round;
  transition: stroke-dashoffset 620ms var(--gob-pg-ease);
}
.ring-center {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 0;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--gob-pg-title);
  font-variant-numeric: tabular-nums;
}
.ring-center span {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--gob-pg-dorado);
}

.complete-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 18px;
  align-items: center;
}
.complete-side {
  display: grid;
  gap: 12px;
  min-width: 0;
}

.hint {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-pg-muted);
  letter-spacing: -0.01em;
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
  background: rgba(159, 33, 65, 0.1);
  color: #9f2141;
}
.root[data-status='info'] .pill {
  background: rgba(47, 95, 138, 0.12);
  color: #2f5f8a;
}
.root[data-status='warning'] .pill {
  background: rgba(208, 146, 26, 0.16);
  color: #a87412;
}
.root[data-status='success'] .pill {
  background: rgba(31, 138, 85, 0.14);
  color: #1f8a55;
}
.root[data-status='danger'] .pill {
  background: rgba(198, 40, 40, 0.12);
  color: #c62828;
}
`;
