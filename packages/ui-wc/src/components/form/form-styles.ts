export const formStyles = `
:host {
  display: block;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  --gob-fm-vino: #9f2141;
  --gob-fm-vino-deep: #7a1832;
  --gob-fm-dorado: #bc945a;
  --gob-fm-title: #181511;
  --gob-fm-muted: #8a8278;
  --gob-fm-text: #3d3a35;
  --gob-fm-border: rgba(24, 21, 17, 0.1);
  --gob-fm-border-strong: rgba(24, 21, 17, 0.16);
  --gob-fm-bg: #ffffff;
  --gob-fm-fill: #f7f5f1;
  --gob-fm-radius: 16px;
  --gob-fm-gap: 16px;
  --gob-fm-cols: 1;
  --gob-fm-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after { box-sizing: border-box; }

[hidden] { display: none !important; }

.root {
  display: grid;
  gap: 18px;
  min-width: 0;
}

.head {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.title {
  margin: 0;
  font-size: 17px;
  font-weight: 750;
  letter-spacing: -0.03em;
  color: var(--gob-fm-title);
  line-height: 1.25;
}

.description {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--gob-fm-muted);
  line-height: 1.45;
  max-width: 58ch;
}

.body {
  display: grid;
  grid-template-columns: repeat(var(--gob-fm-cols), minmax(0, 1fr));
  gap: var(--gob-fm-gap);
  min-width: 0;
  align-items: start;
}

.root[data-gap='sm'] { --gob-fm-gap: 10px; }
.root[data-gap='md'] { --gob-fm-gap: 16px; }
.root[data-gap='lg'] { --gob-fm-gap: 24px; }

.root[data-columns='1'] { --gob-fm-cols: 1; }
.root[data-columns='2'] { --gob-fm-cols: 2; }
.root[data-columns='3'] { --gob-fm-cols: 3; }

/* Single: clear editorial header */
.root[data-variant='single'] {
  gap: 20px;
}
.root[data-variant='single'] .head {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='single'] .title {
  font-size: 18px;
}

/* Dual / triple: airy grid */
.root[data-variant='dual'],
.root[data-variant='triple'] {
  --gob-fm-gap: 18px 20px;
}
.root[data-variant='dual'] .head,
.root[data-variant='triple'] .head {
  margin-bottom: 2px;
}

/* Stacked: generous vertical rhythm */
.root[data-variant='stacked'] {
  gap: 22px;
}
.root[data-variant='stacked'] .body {
  gap: 22px;
}

/* Dense: compact toolbar forms */
.root[data-variant='dense'] {
  gap: 12px;
  --gob-fm-gap: 10px;
}
.root[data-variant='dense'] .title {
  font-size: 14px;
  letter-spacing: -0.01em;
}
.root[data-variant='dense'] .description {
  font-size: 12px;
}

/* Soft: flat tint, no gradient */
.root[data-variant='soft'] {
  gap: 16px;
  padding: 18px;
  border-radius: var(--gob-fm-radius);
  background: color-mix(in srgb, var(--gob-fm-vino) 4%, #fff);
  border: 1px solid color-mix(in srgb, var(--gob-fm-vino) 12%, #ebe6df);
}
.root[data-variant='soft'] .title {
  color: var(--gob-fm-vino-deep);
}

/* Card: crisp surface, hairline border */
.root[data-variant='card'] {
  gap: 18px;
  padding: 22px;
  border-radius: calc(var(--gob-fm-radius) + 2px);
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
  box-shadow: 0 1px 0 rgba(24, 21, 17, 0.04);
}
.root[data-variant='card'] .head {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='card'] .actions {
  margin-top: 2px;
  padding-top: 16px;
  border-top: 1px solid var(--gob-fm-border);
}

/* Sections: rule dividers between fields */
.root[data-variant='sections'] {
  gap: 16px;
}
.root[data-variant='sections'] .head {
  padding-bottom: 12px;
  border-bottom: 2px solid var(--gob-fm-title);
}
.root[data-variant='sections'] .title {
  font-size: 15px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 700;
}
.root[data-variant='sections'] .body {
  gap: 0;
}
.root[data-variant='sections'] ::slotted(*:not(:last-child)) {
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--gob-fm-border);
}

/* Complete: modern panel with dorado accent rail — flat colors only */
.root[data-variant='complete'] {
  gap: 18px;
  padding: 22px 22px 20px 20px;
  border-radius: calc(var(--gob-fm-radius) + 2px);
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
  border-left: 3px solid var(--gob-fm-dorado);
  box-shadow: none;
}
.root[data-variant='complete'] .head {
  display: grid;
  gap: 6px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='complete'] .title {
  font-size: 18px;
}
.root[data-variant='complete'] .description {
  max-width: 52ch;
}
.root[data-variant='complete'] .actions {
  margin-top: 2px;
  padding-top: 16px;
  border-top: 1px solid var(--gob-fm-border);
}

/* Outline: marco fino sin relleno */
.root[data-variant='outline'] {
  gap: 16px;
  padding: 20px;
  border-radius: var(--gob-fm-radius);
  background: transparent;
  border: 1.5px solid var(--gob-fm-border-strong);
}
.root[data-variant='outline'] .head {
  gap: 4px;
}
.root[data-variant='outline'] .title {
  font-size: 15px;
}

/* Rail: acento vino a la izquierda */
.root[data-variant='rail'] {
  gap: 16px;
  padding: 4px 0 4px 16px;
  border-left: 3px solid var(--gob-fm-vino);
  background: transparent;
}
.root[data-variant='rail'] .title {
  font-size: 16px;
}

/* Inset: superficie hundida plana */
.root[data-variant='inset'] {
  gap: 16px;
  padding: 18px;
  border-radius: var(--gob-fm-radius);
  background: var(--gob-fm-fill);
  border: 1px solid transparent;
}
.root[data-variant='inset'] .title {
  font-size: 15px;
}

/* Flat: tipografia protagonista, cero marco */
.root[data-variant='flat'] {
  gap: 14px;
}
.root[data-variant='flat'] .head {
  gap: 2px;
}
.root[data-variant='flat'] .title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.root[data-variant='flat'] .description {
  font-size: 12px;
}

/* Wide: dos columnas con mas aire */
.root[data-variant='wide'] {
  gap: 20px;
  --gob-fm-gap: 20px 24px;
}
.root[data-variant='wide'] .head {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='wide'] .title {
  font-size: 18px;
}

/* Split: primera columna estrecha de contexto */
.root[data-variant='split'] {
  gap: 18px;
}
.root[data-variant='split'] .head {
  display: grid;
  gap: 6px;
  max-width: 36ch;
}
.root[data-variant='split'] .title {
  font-size: 16px;
}
.root[data-variant='split'] .body {
  --gob-fm-gap: 16px 28px;
}

/* Panel: bloque institucional sobrio */
.root[data-variant='panel'] {
  gap: 18px;
  padding: 22px;
  border-radius: 4px;
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
  border-top: 3px solid var(--gob-fm-vino);
}
.root[data-variant='panel'] .title {
  font-size: 15px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.root[data-variant='panel'] .actions {
  padding-top: 14px;
  border-top: 1px solid var(--gob-fm-border);
}

/* Toolbar: fila compacta de filtros */
.root[data-variant='toolbar'] {
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
  align-items: end;
}
.root[data-variant='toolbar'] .head {
  display: none;
}
.root[data-variant='toolbar'] .body {
  --gob-fm-gap: 10px;
  align-items: end;
}
.root[data-variant='toolbar'] .actions {
  justify-content: flex-start;
  padding-top: 0;
}

/* Bleed: borde a borde del contenedor */
.root[data-variant='bleed'] {
  gap: 0;
  border-radius: 0;
  background: var(--gob-fm-bg);
  border: 0;
  border-top: 1px solid var(--gob-fm-border);
  border-bottom: 1px solid var(--gob-fm-border);
  padding: 20px 0;
}
.root[data-variant='bleed'] .head {
  padding-bottom: 14px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--gob-fm-border);
}
.root[data-variant='bleed'] .actions {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--gob-fm-border);
}

/* Dashboard: filtros densos en tablero */
.root[data-variant='dashboard'] {
  gap: 14px;
  padding: 16px;
  border-radius: 12px;
  background: var(--gob-fm-bg);
  border: 1px solid var(--gob-fm-border);
}
.root[data-variant='dashboard'] .title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--gob-fm-muted);
}
.root[data-variant='dashboard'] .description {
  display: none;
}
.root[data-variant='dashboard'] .body {
  --gob-fm-gap: 12px;
}
.root[data-variant='dashboard'] .actions {
  justify-content: stretch;
  gap: 8px;
}
.root[data-variant='dashboard'] .actions ::slotted(*) {
  flex: 1 1 auto;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  min-width: 0;
}

.actions ::slotted(*) {
  flex: 0 0 auto;
}

@media (max-width: 720px) {
  .root[data-columns='2'] .body,
  .root[data-columns='3'] .body,
  .root[data-variant='dual'] .body,
  .root[data-variant='triple'] .body {
    grid-template-columns: 1fr;
  }

  .root[data-variant='card'],
  .root[data-variant='soft'],
  .root[data-variant='complete'],
  .root[data-variant='outline'],
  .root[data-variant='inset'],
  .root[data-variant='panel'],
  .root[data-variant='dashboard'] {
    padding: 16px;
  }

  .root[data-variant='split'] .body,
  .root[data-variant='wide'] .body,
  .root[data-variant='dashboard'] .body,
  .root[data-variant='toolbar'] .body {
    grid-template-columns: 1fr;
  }
}
`;
