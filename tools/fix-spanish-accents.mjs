import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (/\.(tsx|ts|md)$/.test(name)) acc.push(full);
  }
  return acc;
}

const files = [
  path.join(root, 'README.md'),
  ...walk(path.join(root, 'apps/web-next/src/app')).filter(
    (f) =>
      f.endsWith(`${path.sep}page.tsx`) ||
      f.endsWith(`${path.sep}site-nav.tsx`) ||
      f.endsWith(`${path.sep}components-catalog.ts`) ||
      f.endsWith('-data.ts'),
  ),
];

// Longest first
const map = [
  ['documentacion', 'documentación'],
  ['autenticacion', 'autenticación'],
  ['configuracion', 'configuración'],
  ['confirmacion', 'confirmación'],
  ['notificacion', 'notificación'],
  ['Comprobacion', 'Comprobación'],
  ['instalacion', 'instalación'],
  ['Instalacion', 'Instalación'],
  ['navegacion', 'navegación'],
  ['Navegacion', 'Navegación'],
  ['descripcion', 'descripción'],
  ['Descripcion', 'Descripción'],
  ['paginacion', 'paginación'],
  ['Paginacion', 'Paginación'],
  ['tipografia', 'tipografía'],
  ['Tipografia', 'Tipografía'],
  ['iconografia', 'iconografía'],
  ['Iconografia', 'Iconografía'],
  ['validacion', 'validación'],
  ['seleccion', 'selección'],
  ['Seleccion', 'Selección'],
  ['composicion', 'composición'],
  ['jerarquica', 'jerárquica'],
  ['multilinea', 'multilínea'],
  ['informacion', 'información'],
  ['practicas', 'prácticas'],
  ['Practicas', 'Prácticas'],
  ['practica', 'práctica'],
  ['busqueda', 'búsqueda'],
  ['Busqueda', 'Búsqueda'],
  ['cuadricula', 'cuadrícula'],
  ['Cuadricula', 'Cuadrícula'],
  ['pestanas', 'pestañas'],
  ['Pestanas', 'Pestañas'],
  ['basicos', 'básicos'],
  ['basicas', 'básicas'],
  ['basico', 'básico'],
  ['Basico', 'Básico'],
  ['tramites', 'trámites'],
  ['tramite', 'trámite'],
  ['criticas', 'críticas'],
  ['criticos', 'críticos'],
  ['multiples', 'múltiples'],
  ['multiple', 'múltiple'],
  ['margenes', 'márgenes'],
  ['vacios', 'vacíos'],
  ['vacio', 'vacío'],
  ['Vacio', 'Vacío'],
  ['utiles', 'útiles'],
  ['tambien', 'también'],
  ['Tambien', 'También'],
  ['despues', 'después'],
  ['ademas', 'además'],
  ['rapido', 'rápido'],
  ['rapida', 'rápida'],
  ['conexion', 'conexión'],
  ['libreria', 'librería'],
  ['catalogo', 'catálogo'],
  ['Catalogo', 'Catálogo'],
  ['decision', 'decisión'],
  ['Decision', 'Decisión'],
  ['edicion', 'edición'],
  ['proposito', 'propósito'],
  ['revision', 'revisión'],
  ['Revision', 'Revisión'],
  ['gramatica', 'gramática'],
  ['semaforo', 'semáforo'],
  ['paginas', 'páginas'],
  ['pagina', 'página'],
  ['Pagina', 'Página'],
  ['titulo', 'título'],
  ['Titulo', 'Título'],
  ['codigo', 'código'],
  ['Codigo', 'Código'],
  ['indice', 'índice'],
  ['Indice', 'Índice'],
  ['nucleo', 'núcleo'],
  ['Nucleo', 'Núcleo'],
  ['pequeno', 'pequeño'],
  ['unico', 'único'],
  ['Unico', 'Único'],
  ['unica', 'única'],
  ['Unica', 'Única'],
  ['opcion', 'opción'],
  ['Opcion', 'Opción'],
  ['accion', 'acción'],
  ['Accion', 'Acción'],
  ['boton', 'botón'],
  ['Boton', 'Botón'],
  ['menu', 'menú'],
  ['Menu', 'Menú'],
  ['exito', 'éxito'],
  ['dialogo', 'diálogo'],
  ['Dialogo', 'Diálogo'],
  ['lineas', 'líneas'],
  ['linea', 'línea'],
  ['Linea', 'Línea'],
  ['seccion', 'sección'],
  ['Seccion', 'Sección'],
  ['metricas', 'métricas'],
  ['grafica', 'gráfica'],
  ['estatico', 'estático'],
  ['publico', 'público'],
  ['publica', 'pública'],
  ['minima', 'mínima'],
  ['minimo', 'mínimo'],
  ['numeros', 'números'],
  ['numero', 'número'],
  ['guia', 'guía'],
  ['Guia', 'Guía'],
  ['aqui', 'aquí'],
  ['asi', 'así'],
  ['Asi', 'Así'],
  ['acoto', 'acotó'],
  ['Area', 'Área'],
];

const phraseFixes = [
  [/Por que/g, 'Por qué'],
  [/por que/g, 'por qué'],
  [/Como instalar/g, 'Cómo instalar'],
  [/Nada mas/g, 'Nada más'],
  [/ mas /g, ' más '],
  [/esta cargando/g, 'está cargando'],
  [/Parte de ahi/g, 'Parte de ahí'],
  [/Por que asi/g, 'Por qué así'],
  [/el <em>que<\/em>/g, 'el <em>qué</em>'],
  [/el <em>por qué<\/em>/g, 'el <em>porqué</em>'],
];

function protect(content) {
  const bag = [];
  const out = content.replace(
    /(href:\s*'[^']*'|href="[^"]*"|to="[^"]*"|id:\s*'[^']*'|active="[^"]*"|\['[a-z0-9-]+'\]|\/[a-z0-9-]+)/g,
    (m) => {
      const key = `__PROT_${bag.length}__`;
      bag.push(m);
      return key;
    },
  );
  return { out, bag };
}

function unprotect(content, bag) {
  return content.replace(/__PROT_(\d+)__/g, (_, i) => bag[Number(i)]);
}

let changed = 0;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const { out, bag } = protect(text);
  let next = out;
  for (const [from, to] of map) {
    const re = new RegExp(`(?<![A-Za-zÁÉÍÓÚÜáéíóúüÑñ])${from}(?![A-Za-zÁÉÍÓÚÜáéíóúüÑñ])`, 'g');
    next = next.replace(re, to);
  }
  for (const [re, to] of phraseFixes) {
    next = next.replace(re, to);
  }
  next = unprotect(next, bag);
  if (next !== text) {
    fs.writeFileSync(file, next, 'utf8');
    changed += 1;
    console.log('fixed', path.relative(root, file));
  }
}
console.log(`done: ${changed} files updated`);
