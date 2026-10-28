# gob-ui (HTML)

Sistema de interfaz institucional para HTML (Web Components).

## Instalación con npm

1. Archivo `.npmrc` (GitHub Packages):

```ini
@mariasan001:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TU_GITHUB_PACKAGES_TOKEN
always-auth=true
```

2. Instalar:

```bash
npm install @mariasan001/styles@0.1.4 @mariasan001/ui-wc@0.3.1
```

También con `pnpm add` o `yarn add`.

3. Enlazar en el HTML:

```html
<link rel="stylesheet" href="node_modules/@mariasan001/styles/fonts.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/theme.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/base.css" />
<link rel="stylesheet" href="node_modules/@mariasan001/styles/utilities.css" />

<script type="module">
  import '@mariasan001/ui-wc';
</script>

<gob-button tone="primary" appearance="solid">Guardar</gob-button>
```

Detalle en la demo → **Instalación**.

## Sin npm

Carpeta `apps/html-kit`: `gob-ui.css`, `gob-ui.js` e `index.html`.

```bash
pnpm kit
```

## Desarrollo del monorepo

```bash
pnpm install
pnpm kit
pnpm dev
```

## Alcance

- 50 componentes básicos
- Documentación solo en HTML
- Paquetes: `@mariasan001/styles` y `@mariasan001/ui-wc`
