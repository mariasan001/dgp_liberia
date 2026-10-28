# Kit HTML de Gob UI

## Neta fácil

En esta carpeta hay solo 3 cosas:

1. `index.html` — página de ejemplo
2. `gob-ui.css` — estilos
3. `gob-ui.js` — componentes

## Cómo verlo

Opción más simple (si tienes VS Code):
1. Abre esta carpeta
2. Clic derecho en `index.html` → **Open with Live Server**

Desde el proyecto (si ya tienes pnpm):
```
pnpm kit
```
Abre http://localhost:5173/

## Cómo usarlo en tu trámite

1. Copia `gob-ui.css` y `gob-ui.js` junto a tu HTML
2. En el `<head>` pega:

```html
<link rel="stylesheet" href="./gob-ui.css" />
<script type="module" src="./gob-ui.js"></script>
```

3. En el body escribe, por ejemplo:

```html
<gob-button tone="primary" appearance="solid">Guardar</gob-button>
```

Listo. Sin token, sin npm, sin Node en tu máquina de destino
(solo necesitas un servidor local chiquito para verlo, como Live Server).
