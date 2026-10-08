export const sidebarStyles = `
:host {
  display: block;
  width: var(--gob-sidebar-width, 248px);
  height: 100%;
  min-height: inherit;
  box-sizing: border-box;
  font-family: var(--gob-font-sans, Gotham, Raleway, sans-serif);
  color: var(--gob-sidebar-text, #6b665f);
  transition: width 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.root {
  position: relative;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 14px;
  width: 100%;
  height: 100%;
  min-height: inherit;
  padding: 16px 12px 12px;
  border-right: 1px solid var(--gob-sidebar-border, rgba(24, 21, 17, 0.1));
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, #fff 7%, transparent) 0%,
      transparent 42%
    ),
    var(--gob-sidebar-bg, #fff);
  color: var(--gob-sidebar-text, #6b665f);
  transition: padding 240ms ease, gap 240ms ease;
}

:host([collapsed]) {
  width: var(--gob-sidebar-collapsed-width, 80px);
}

.root[data-collapsed="true"] {
  padding: 14px 10px 12px;
  gap: 12px;
  justify-items: stretch;
}

.root[data-variant="dense"] {
  gap: 8px;
  padding: 12px 8px 10px;
  --gob-sidebar-width: 212px;
}

:host([variant="dense"]:not([collapsed])) {
  width: var(--gob-sidebar-width, 212px);
}

.root[data-variant="brand"] {
  gap: 16px;
  padding-top: 18px;
}

.brand {
  min-width: 0;
}

.nav {
  display: grid;
  gap: 3px;
  align-content: start;
  min-height: 0;
  overflow: auto;
  padding-right: 2px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.nav::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

.footer {
  min-width: 0;
}

.root[data-collapsed="true"] .brand,
.root[data-collapsed="true"] .footer {
  width: 100%;
  display: grid;
  justify-items: center;
}

.root[data-collapsed="true"] .nav {
  justify-items: center;
  gap: 6px;
}

/* Tones */
:host([tone='primary']),
:host(:not([tone])) {
  --gob-sidebar-bg: #9f2141;
  --gob-sidebar-text: rgba(255, 255, 255, 0.86);
  --gob-sidebar-muted: rgba(255, 255, 255, 0.58);
  --gob-sidebar-active-bg: rgba(255, 255, 255, 0.16);
  --gob-sidebar-active-text: #fff;
  --gob-sidebar-border: rgba(255, 255, 255, 0.14);
  --gob-sidebar-accent: #9f2141;
  --gob-sidebar-hover: rgba(255, 255, 255, 0.08);
}

:host([tone='accent']) {
  --gob-sidebar-bg: #f3ebe0;
  --gob-sidebar-text: #53493e;
  --gob-sidebar-muted: #8a8278;
  --gob-sidebar-active-bg: rgba(188, 148, 90, 0.26);
  --gob-sidebar-active-text: #6f5128;
  --gob-sidebar-border: rgba(24, 21, 17, 0.08);
  --gob-sidebar-accent: #bc945a;
  --gob-sidebar-hover: rgba(24, 21, 17, 0.05);
}

:host([tone='dark']) {
  --gob-sidebar-bg: #181511;
  --gob-sidebar-text: rgba(255, 255, 255, 0.82);
  --gob-sidebar-muted: rgba(255, 255, 255, 0.48);
  --gob-sidebar-active-bg: rgba(255, 255, 255, 0.12);
  --gob-sidebar-active-text: #fff;
  --gob-sidebar-border: rgba(255, 255, 255, 0.1);
  --gob-sidebar-accent: #181511;
  --gob-sidebar-hover: rgba(255, 255, 255, 0.06);
}

:host([tone='neutral']) {
  --gob-sidebar-bg: #fff;
  --gob-sidebar-text: #5f5952;
  --gob-sidebar-muted: #9a9590;
  --gob-sidebar-active-bg: rgba(159, 33, 65, 0.1);
  --gob-sidebar-active-text: #9f2141;
  --gob-sidebar-border: rgba(24, 21, 17, 0.08);
  --gob-sidebar-accent: #9f2141;
  --gob-sidebar-hover: rgba(24, 21, 17, 0.04);
}

:host([tone='soft']) {
  --gob-sidebar-bg: #e7d7bd;
  --gob-sidebar-text: #463d31;
  --gob-sidebar-muted: #7a6f60;
  --gob-sidebar-active-bg: rgba(159, 33, 65, 0.12);
  --gob-sidebar-active-text: #9f2141;
  --gob-sidebar-border: rgba(24, 21, 17, 0.08);
  --gob-sidebar-accent: #9f2141;
  --gob-sidebar-hover: rgba(24, 21, 17, 0.05);
}

::slotted([data-active="true"]),
::slotted(.is-active) {
  background: var(--gob-sidebar-active-bg, rgba(159, 33, 65, 0.1)) !important;
  color: var(--gob-sidebar-active-text, #9f2141) !important;
}

::slotted(a),
::slotted(button),
::slotted([data-nav]) {
  color: inherit;
}
`;
