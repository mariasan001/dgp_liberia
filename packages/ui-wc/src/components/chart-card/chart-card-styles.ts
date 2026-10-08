export const chartCardStyles = `
:host {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-cc-bg: #ffffff;
  --gob-cc-border: rgba(24, 21, 17, 0.1);
  --gob-cc-title: #181511;
  --gob-cc-muted: #8a8278;
  --gob-cc-accent: #9f2141;
  --gob-cc-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-cc-accent-mid: rgba(159, 33, 65, 0.28);
  --gob-cc-pad: 18px;
  --gob-cc-radius: 18px;
  --gob-cc-shadow: none;
  --gob-cc-chart-min: 160px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  position: relative;
  display: grid;
  gap: 14px;
  min-width: 0;
  padding: var(--gob-cc-pad);
  border-radius: var(--gob-cc-radius);
  border: 1px solid var(--gob-cc-border);
  background: var(--gob-cc-bg);
  color: var(--gob-cc-muted);
  box-shadow: var(--gob-cc-shadow);
  overflow: hidden;
}

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.headText {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--gob-cc-title);
}

.subtitle {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-cc-muted);
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.main {
  display: grid;
  gap: 14px;
  min-width: 0;
}

.chart {
  display: block;
  min-width: 0;
  min-height: var(--gob-cc-chart-min);
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  align-items: center;
}

.footer {
  display: none;
  margin: 0;
  padding-top: 12px;
  border-top: 1px solid rgba(24, 21, 17, 0.08);
  font-size: 12px;
  font-weight: 500;
  color: var(--gob-cc-muted);
}

.root[data-variant='dense'],
.root[data-variant='minimal'] {
  --gob-cc-pad: 12px;
  --gob-cc-chart-min: 120px;
  gap: 10px;
}

.root[data-variant='elevated'] {
  --gob-cc-shadow: 0 16px 32px rgba(24, 21, 17, 0.1);
  border-color: transparent;
}

.root[data-variant='stripe'] {
  padding-left: calc(var(--gob-cc-pad) + 6px);
}

.root[data-variant='stripe']::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gob-cc-accent);
}

.root[data-variant='framed'] .chart {
  padding: 12px;
  border-radius: 14px;
  background: rgba(24, 21, 17, 0.03);
  border: 1px solid rgba(24, 21, 17, 0.06);
}

.root[data-variant='side-legend'] .main,
.root[data-variant='compare'] .main {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
}

.root[data-variant='side-legend'] .legend,
.root[data-variant='compare'] .legend {
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  min-width: 112px;
}

.root[data-variant='footer'] .footer,
.root[data-variant='waterfall'] .footer {
  display: block;
}

.root[data-variant='basic'] .subtitle,
.root[data-variant='basic'] .actions,
.root[data-variant='basic'] .legend,
.root[data-variant='legend'] .subtitle,
.root[data-variant='legend'] .actions,
.root[data-variant='actions'] .subtitle,
.root[data-variant='actions'] .legend,
.root[data-variant='period'] .actions,
.root[data-variant='period'] .legend,
.root[data-variant='side-legend'] .subtitle,
.root[data-variant='side-legend'] .actions,
.root[data-variant='dense'] .subtitle,
.root[data-variant='dense'] .actions,
.root[data-variant='footer'] .subtitle,
.root[data-variant='footer'] .actions,
.root[data-variant='footer'] .legend,
.root[data-variant='stripe'] .actions,
.root[data-variant='stripe'] .legend,
.root[data-variant='framed'] .actions,
.root[data-variant='framed'] .legend,
.root[data-variant='toolbar'] .legend,
.root[data-variant='minimal'] .subtitle,
.root[data-variant='minimal'] .actions,
.root[data-variant='minimal'] .legend,
.root[data-variant='compare'] .subtitle,
.root[data-variant='compare'] .actions,
.root[data-variant='funnel'] .subtitle,
.root[data-variant='funnel'] .actions,
.root[data-variant='funnel'] .legend,
.root[data-variant='treemap'] .actions,
.root[data-variant='treemap'] .legend,
.root[data-variant='rose'] .subtitle,
.root[data-variant='rose'] .actions,
.root[data-variant='waterfall'] .actions,
.root[data-variant='waterfall'] .legend {
  display: none;
}

:host([tone='primary']),
:host(:not([tone])),
.root[data-tone='primary'] {
  --gob-cc-accent: #9f2141;
  --gob-cc-accent-soft: rgba(159, 33, 65, 0.12);
  --gob-cc-accent-mid: rgba(159, 33, 65, 0.28);
}

:host([tone='accent']),
.root[data-tone='accent'] {
  --gob-cc-accent: #bc945a;
  --gob-cc-accent-soft: rgba(188, 148, 90, 0.2);
  --gob-cc-accent-mid: rgba(188, 148, 90, 0.42);
}

:host([tone='dark']),
.root[data-tone='dark'] {
  --gob-cc-accent: #181511;
  --gob-cc-accent-soft: rgba(24, 21, 17, 0.08);
  --gob-cc-accent-mid: rgba(24, 21, 17, 0.22);
}

:host([tone='neutral']),
.root[data-tone='neutral'] {
  --gob-cc-accent: #6b655c;
  --gob-cc-accent-soft: rgba(24, 21, 17, 0.06);
  --gob-cc-accent-mid: rgba(24, 21, 17, 0.16);
}

:host([tone='soft']),
.root[data-tone='soft'] {
  --gob-cc-accent: #a67c52;
  --gob-cc-accent-soft: rgba(231, 215, 189, 0.7);
  --gob-cc-accent-mid: rgba(166, 124, 82, 0.35);
}
`;
