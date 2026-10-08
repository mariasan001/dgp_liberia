# gob-ui

Monorepo pnpm para un sistema de interfaz enfocado en `gob-button`.

## Workspace

- `packages/tokens`: tokens base en JSON
- `packages/styles`: estilos compartidos (`base.css`, `theme.css`, `utilities.css`, `fonts.css`)
- `packages/ui-wc`: Web Component `gob-button`
- `apps/web-next`: demo de referencia en Next.js
- `apps/web-vanilla`: demo minima en HTML puro

## Requisitos

- Node.js 20 o superior
- pnpm 9.12.3

## Como correr demos

Instala dependencias:

```bash
pnpm install
```

Demo Next.js:

```bash
pnpm dev
```

Abre `http://localhost:9090`.

Build de la demo Next.js:

```bash
pnpm build:next
```

Demo HTML puro:

```bash
pnpm build:ui-wc
```

Despues sirve `apps/web-vanilla/` con cualquier servidor estatico y abre `index.html`.
Esta demo consume los packages instalados desde `node_modules`.

## Como consumir packages

### Styles

Importa solo los CSS que necesites:

```ts
import '@mariasan001/styles/base.css';
import '@mariasan001/styles/theme.css';
import '@mariasan001/styles/utilities.css';
import '@mariasan001/styles/fonts.css';
```

### Web Component

Registra el custom element una vez en el cliente:

```ts
import '@mariasan001/ui-wc';
```

Luego puedes usar:

```html
<gob-button tone="primary" appearance="solid">Guardar</gob-button>
```

En React + TypeScript, el repo ya incluye una declaracion JSX local para `gob-button` en `apps/web-next/src/types/gob-ui.d.ts`.

## Calidad y empaquetado

Puerta minima reproducible:

```bash
pnpm verify
```

Equivale a ejecutar:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm pack:styles
pnpm pack:ui-wc
```

Tambien puedes correr pasos puntuales:

```bash
pnpm -C apps/web-next lint
pnpm -C apps/web-next exec tsc --noEmit
pnpm -C apps/web-next build
pnpm -C packages/ui-wc build
pnpm -C packages/styles exec npm pack --dry-run --cache .npm-cache
pnpm -C packages/ui-wc exec npm pack --dry-run --cache .npm-cache
```

## Release checklist

Aplica para los packages publicables actuales:

- `@mariasan001/styles`
- `@mariasan001/ui-wc`

`@gob/tokens` sigue como package privado y no entra al flujo de publicacion.

### 1. Bump de versiones

Si hubo cambios publicables, actualiza manualmente el campo `version` en:

- `packages/styles/package.json`
- `packages/ui-wc/package.json`

Usa semver:

- `patch`: fixes o ajustes internos sin romper API
- `minor`: nuevas capacidades compatibles
- `major`: cambios incompatibles

### 2. Verificacion previa

Antes de taggear o publicar:

```bash
pnpm verify
pnpm smoke:pack
pnpm smoke:consumers
```

Si alguno falla, no publiques.

### 3. Tag + release notes

Crea un commit final de release y luego un tag anotado:

```bash
git tag -a styles-vX.Y.Z -m "Release @mariasan001/styles vX.Y.Z"
git tag -a ui-wc-vX.Y.Z -m "Release @mariasan001/ui-wc vX.Y.Z"
```

Si ambos packages salen juntos, puedes usar tambien un tag coordinado del repo:

```bash
git tag -a release-YYYY-MM-DD -m "Release styles vX.Y.Z + ui-wc vA.B.C"
```

Las release notes deben incluir:

- versiones publicadas
- cambios visibles para consumidores
- breaking changes, si existen
- comandos de instalacion

### 4. Publicacion a GitHub Packages

Configura un `.npmrc` local basado en `.npmrc.example` con `GITHUB_PACKAGES_TOKEN`.

Publica desde cada package:

```bash
pnpm -C packages/styles exec npm publish --registry=https://npm.pkg.github.com
pnpm -C packages/ui-wc exec npm publish --registry=https://npm.pkg.github.com
```

### 5. Confirmacion desde proyecto limpio

Valida instalacion real fuera del workspace:

```bash
pnpm smoke:pack
pnpm smoke:consumers
```

Ademas, valida desde un proyecto limpio contra registry si el release ya esta publicado:

```bash
pnpm add @mariasan001/styles @mariasan001/ui-wc
```

Comprueba al menos:

- import de `@mariasan001/styles/base.css`
- import de `@mariasan001/styles/theme.css`
- import de `@mariasan001/styles/utilities.css`
- import de `@mariasan001/ui-wc`
- build exitoso del consumidor

### 6. Criterio de salida

Considera el release completo solo si:

- `pnpm verify` pasa
- `pnpm smoke:consumers` pasa
- `npm publish` termina sin errores para cada package objetivo
- la instalacion desde registry funciona en proyecto limpio
- el tag y las release notes quedaron publicados

## Troubleshooting

### PowerShell bloquea `pnpm`

Si PowerShell bloquea scripts (`pnpm.ps1`), usa:

```bash
cmd /c pnpm install
```

o ejecuta los comandos desde `cmd`.

### `gob-button` no existe en JSX

Confirma que:

- `@mariasan001/ui-wc` este instalado en el workspace
- la app tenga el import de tipos en `src/types/gob-ui.d.ts`
- el registro del custom element se haga en cliente

### La demo HTML no renderiza estilos o el componente

Confirma que:

- corriste `pnpm install`
- corriste `pnpm build:ui-wc`
- estas sirviendo `apps/web-vanilla` con un servidor estatico, no abriendo el archivo sin servidor

## Tokens

Los tokens viven en `packages/tokens/src/tokens.json`.
