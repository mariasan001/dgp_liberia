# gob-ui (HTML)

Monorepo pnpm de un sistema de interfaz **compatible solo con HTML** (Web Components).

## Alcance de esta copia

- **50 componentes básicos** (sin capas avanzadas ni patrones innovadores)
- Snippets y consumo documentados **solo en HTML**
- Sin React / Vue / Angular en la API pública de documentación

## Workspace

- `packages/tokens`: tokens base en JSON
- `packages/styles`: estilos compartidos (`base.css`, `theme.css`, `utilities.css`, `fonts.css`)
- `packages/ui-wc`: Web Components `gob-*`
- `apps/web-next`: demo de referencia
- `apps/web-vanilla`: demo mínima en HTML puro

## Requisitos

- Node.js 20 o superior
- pnpm 9.12.3

## Como correr demos

```bash
pnpm install
pnpm build:ui-wc
pnpm dev
```

Abre `http://localhost:9090`.

## Como consumir (HTML)

```html
<script type="module">
  import '@mariasan001/ui-wc';
</script>

<link rel="stylesheet" href="node_modules/@mariasan001/styles/base.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/theme.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/utilities.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/fonts.css" />

<gob-button tone="primary" appearance="solid">Guardar</gob-button>
```

## Calidad

```bash
pnpm verify
```
