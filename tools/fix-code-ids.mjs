import fs from 'node:fs';
import path from 'node:path';

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx)$/.test(name)) acc.push(full);
  }
  return acc;
}

const fixes = [
  [/nav-menú/g, 'nav-menu'],
  [/dropdown-menú/g, 'dropdown-menu'],
  [/'navegación'/g, "'navegacion'"],
  [/"navegación"/g, '"navegacion"'],
  [/'instalación'/g, "'instalacion'"],
  [/"instalación"/g, '"instalacion"'],
  [/'básico'/g, "'basico'"],
  [/"básico"/g, '"basico"'],
  [/'múltiple'/g, "'multiple'"],
  [/"múltiple"/g, '"multiple"'],
  [/\.múltiple\b/g, '.multiple'],
  [/múltiple\?:/g, 'multiple?:'],
  [/múltiple:/g, 'multiple:'],
  [/ name: 'múltiple/g, " name: 'multiple"],
];

let n = 0;
for (const file of walk(path.join(process.cwd(), 'apps/web-next/src'))) {
  let text = fs.readFileSync(file, 'utf8');
  const orig = text;
  for (const [re, to] of fixes) text = text.replace(re, to);
  if (text !== orig) {
    fs.writeFileSync(file, text);
    n += 1;
    console.log('id-fix', path.relative(process.cwd(), file));
  }
}
console.log(`fixed ${n} files`);
