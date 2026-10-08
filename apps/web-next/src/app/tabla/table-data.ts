import type { TableTone, TableVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
];

export const COLOR_OPTIONS: { id: TableTone; label: string; swatch: string }[] =
  [
    { id: 'primary', label: 'Primary', swatch: '#9F2141' },
    { id: 'accent', label: 'Accent', swatch: '#BC945A' },
    { id: 'dark', label: 'Dark', swatch: '#181511' },
    { id: 'neutral', label: 'Neutral', swatch: '#FFFFFF' },
    { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
  ];

export type TableExample = {
  id: TableVariant;
  title: string;
  description: string;
  variant: TableVariant;
  cardTitle: string;
  subtitle?: string;
  showActions?: boolean;
  footer?: string;
};

/** 10 tipos pensados para listados masivos institucionales. */
export const TABLE_EXAMPLES: TableExample[] = [
  {
    id: 'basic',
    title: 'Basica',
    description: 'Listado limpio de expedientes. Punto de partida para consultas.',
    variant: 'basic',
    cardTitle: 'Expedientes recientes',
    footer: 'Mostrando 1â€“5 de 12,480',
  },
  {
    id: 'striped',
    title: 'Zebra',
    description: 'Filas alternadas para escanear miles de registros sin perder la línea.',
    variant: 'striped',
    cardTitle: 'Padron de beneficiarios',
    subtitle: 'Corte 2026-Q2',
    footer: '5,902 registros en esta página',
  },
  {
    id: 'bordered',
    title: 'Con borde',
    description: 'Celdas definidas para reportes oficiales e impresion.',
    variant: 'bordered',
    cardTitle: 'Reporte de ingresos',
  },
  {
    id: 'dense',
    title: 'Densa',
    description: 'Maxima densidad tipografica para tableros con mucho volumen.',
    variant: 'dense',
    cardTitle: 'Bitacora de movimientos',
    footer: 'Densidad compacta Â· 40 filas/vista',
  },
  {
    id: 'selectable',
    title: 'Seleccionable',
    description: 'Checkbox por fila para acciones masivas (exportar, asignar, archivar).',
    variant: 'selectable',
    cardTitle: 'Lote de trámites',
    subtitle: 'Selecciona para operar en bloque',
    showActions: true,
    footer: '2 seleccionados de 5',
  },
  {
    id: 'sortable',
    title: 'Ordenable',
    description: 'Encabezados con orden para priorizar por folio, fecha o monto.',
    variant: 'sortable',
    cardTitle: 'Cola de revisión',
    subtitle: 'Orden por fecha de ingreso',
    footer: 'Clic en columna para ordenar',
  },
  {
    id: 'sticky',
    title: 'Encabezado fijo',
    description: 'Header sticky al hacer scroll en listados largos.',
    variant: 'sticky',
    cardTitle: 'Inventario documental',
    subtitle: 'Scroll vertical interno',
    footer: 'Header fijo mientras navegas',
  },
  {
    id: 'status',
    title: 'Con estatus',
    description: 'Badges de estado para flujos: en revisión, aprobado, rechazado.',
    variant: 'status',
    cardTitle: 'Seguimiento de solicitudes',
    showActions: true,
    footer: 'Actualizado hace 3 min',
  },
  {
    id: 'actions',
    title: 'Con acciones',
    description: 'Botones por fila: ver, descargar, reasignar.',
    variant: 'actions',
    cardTitle: 'Gestion de casos',
    subtitle: 'Operacion diaria',
    footer: 'Acciones por expediente',
  },
  {
    id: 'empty',
    title: 'Vacia',
    description: 'Estado sin resultados para busquedas o filtros sin coincidencias.',
    variant: 'empty',
    cardTitle: 'Resultados de búsqueda',
    subtitle: 'Folio / CURP / RFC',
  },
];

export const TABLE_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'basic',
    body: 'basic | striped | bordered | dense | selectable | sortable | sticky | status | actions | empty',
  },
  {
    name: 'tone',
    type: 'string',
    defaultValue: 'primary',
    body: 'primary | accent | dark | neutral | soft',
  },
  {
    name: 'slot=title',
    type: 'slot',
    defaultValue: 'â€”',
    body: 'Título del listado.',
  },
  {
    name: 'slot=subtitle',
    type: 'slot',
    defaultValue: 'â€”',
    body: 'Contexto o corte de datos.',
  },
  {
    name: 'slot=actions',
    type: 'slot',
    defaultValue: 'â€”',
    body: 'Acciones de lote (exportar, filtrar).',
  },
  {
    name: 'slot=default',
    type: 'slot',
    defaultValue: 'â€”',
    body: 'Tabla HTML nativa (<table>) con thead/tbody.',
  },
  {
    name: 'slot=empty',
    type: 'slot',
    defaultValue: 'â€”',
    body: 'Contenido del estado vacío (variant=empty).',
  },
  {
    name: 'slot=footer',
    type: 'slot',
    defaultValue: 'â€”',
    body: 'Resumen / paginación / conteo de registros.',
  },
] as const;

export type DemoRow = {
  folio: string;
  ciudadano: string;
  curp: string;
  dependencia: string;
  fecha: string;
  monto: string;
  estatus: 'ok' | 'warn' | 'err' | 'info';
  estatusLabel: string;
  initials: string;
  hue: number;
};

export const DEMO_ROWS: DemoRow[] = [
  {
    folio: 'EXP-2026-01482',
    ciudadano: 'Garcia Lopez, Ana',
    curp: 'GALA850312MDFRPN09',
    dependencia: 'Salud',
    fecha: '12/03/2026',
    monto: '$4,250.00',
    estatus: 'ok',
    estatusLabel: 'Aprobado',
    initials: 'AG',
    hue: 0,
  },
  {
    folio: 'EXP-2026-01483',
    ciudadano: 'Hernandez Ruiz, Luis',
    curp: 'HERL900221HDFRZS08',
    dependencia: 'Educacion',
    fecha: '12/03/2026',
    monto: '$1,180.00',
    estatus: 'warn',
    estatusLabel: 'En revisión',
    initials: 'LH',
    hue: 1,
  },
  {
    folio: 'EXP-2026-01484',
    ciudadano: 'Martinez Soto, Paula',
    curp: 'MASP880714MDFRTL05',
    dependencia: 'Movilidad',
    fecha: '11/03/2026',
    monto: '$890.00',
    estatus: 'info',
    estatusLabel: 'Recibido',
    initials: 'PM',
    hue: 2,
  },
  {
    folio: 'EXP-2026-01485',
    ciudadano: 'Jimenez Cruz, Diego',
    curp: 'JICD750903HDFMRG02',
    dependencia: 'Hacienda',
    fecha: '11/03/2026',
    monto: '$12,400.00',
    estatus: 'err',
    estatusLabel: 'Rechazado',
    initials: 'DJ',
    hue: 3,
  },
  {
    folio: 'EXP-2026-01486',
    ciudadano: 'Vargas Neri, Sofia',
    curp: 'VANS920518MDFRRF07',
    dependencia: 'Seguridad',
    fecha: '10/03/2026',
    monto: '$2,010.00',
    estatus: 'ok',
    estatusLabel: 'Aprobado',
    initials: 'SV',
    hue: 4,
  },
];

/** Filas extra para sticky / densas (sensacion de volumen). */
export const DEMO_ROWS_LONG: DemoRow[] = [
  ...DEMO_ROWS,
  {
    folio: 'EXP-2026-01487',
    ciudadano: 'Ortega Diaz, Mario',
    curp: 'ORDM830101HDFRTR01',
    dependencia: 'Salud',
    fecha: '10/03/2026',
    monto: '$760.00',
    estatus: 'warn',
    estatusLabel: 'En revisión',
    initials: 'MO',
    hue: 5,
  },
  {
    folio: 'EXP-2026-01488',
    ciudadano: 'Pena Salas, Laura',
    curp: 'PESL910430MDFNLS04',
    dependencia: 'Educacion',
    fecha: '09/03/2026',
    monto: '$3,320.00',
    estatus: 'info',
    estatusLabel: 'Recibido',
    initials: 'LP',
    hue: 1,
  },
  {
    folio: 'EXP-2026-01489',
    ciudadano: 'Ramos Ibarra, Jose',
    curp: 'RAIJ780212HDFMBS03',
    dependencia: 'Movilidad',
    fecha: '09/03/2026',
    monto: '$510.00',
    estatus: 'ok',
    estatusLabel: 'Aprobado',
    initials: 'JR',
    hue: 2,
  },
];

function iconImports(lang: CodeLang): string {
  if (lang === 'html') return '';
  return `import '@mariasan001/ui-wc';
`;
}

function sampleRowsJson(count = 3): string {
  return JSON.stringify(
    DEMO_ROWS.slice(0, count).map((r) => ({
      folio: r.folio,
      ciudadano: r.ciudadano,
      curp: r.curp,
      dependencia: r.dependencia,
      fecha: r.fecha,
      monto: r.monto,
      estatus: r.estatus,
      estatusLabel: r.estatusLabel,
      initials: r.initials,
      hue: r.hue,
    })),
    null,
    2,
  );
}

function htmlRow(r: DemoRow, indent = '      '): string {
  return `${indent}<tr>
${indent}  <td>
${indent}    <span class="gob-tb-stack">
${indent}      <span class="gob-tb-primary">${r.folio}</span>
${indent}      <span class="gob-tb-secondary">Creado: ${r.fecha}</span>
${indent}    </span>
${indent}  </td>
${indent}  <td>
${indent}    <span class="gob-tb-cell">
${indent}      <span class="gob-tb-avatar" data-hue="${r.hue}">${r.initials}</span>
${indent}      <span class="gob-tb-stack">
${indent}        <span class="gob-tb-primary">${r.ciudadano}</span>
${indent}        <span class="gob-tb-secondary">${r.curp}</span>
${indent}      </span>
${indent}    </span>
${indent}  </td>
${indent}  <td>${r.dependencia}</td>
${indent}  <td><span class="gob-tb-secondary">${r.fecha}</span></td>
${indent}  <td class="num">${r.monto}</td>
${indent}  <td><span class="gob-tb-status" data-tone="${r.estatus}"><span class="gob-tb-dot"></span>${r.estatusLabel}</span></td>
${indent}</tr>`;
}

/** Snippet completo: filas reales + patron de interaccion en el host. */
export function buildSnippet(
  lang: CodeLang,
  example: TableExample,
  tone: TableTone,
): string {
  const attrs = ` variant="${example.variant}" tone="${tone}"`;
  const title = example.cardTitle;
  const rows = DEMO_ROWS.slice(0, 3);
  const withStatus =
    example.variant === 'status' || example.variant === 'actions';
  const withCheck = example.variant === 'selectable';
  const body = rows
    .map((r) => {
      const base = htmlRow(r);
      if (!withStatus) {
        return base.replace(
          /\n\s*<td><span class="gob-tb-status"[\s\S]*?<\/td>/,
          '',
        );
      }
      return base;
    })
    .join('\n');

  if (example.variant === 'empty') {
    if (lang === 'react') {
      return `${iconImports(lang)}
export function TablaVacia() {
  return (
    <gob-table${attrs}>
      <span slot="title">${title}</span>
      <div slot="empty">
        <p>Sin resultados</p>
        <p>No hay expedientes con ese folio, CURP o RFC.</p>
      </div>
    </gob-table>
  );
}`;
    }
    return `<!-- npm i @mariasan001/ui-wc -->
<script type="module">import '@mariasan001/ui-wc';</script>
<gob-table${attrs}>
  <span slot="title">${title}</span>
  <div slot="empty">
    <p>Sin resultados</p>
    <p>No hay expedientes con ese folio, CURP o RFC.</p>
  </div>
</gob-table>`;
  }

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<!-- gob-table estiliza. Selección/orden los cables tu (JS o framework). -->
<script type="module">import '@mariasan001/ui-wc';</script>

<gob-table${attrs}>
  <span slot="title">${title}</span>
${example.subtitle ? `  <span slot="subtitle">${example.subtitle}</span>\n` : ''}  <table>
    <thead>
      <tr>
${withCheck ? `        <th><input class="gob-tb-check" type="checkbox" /></th>\n` : ''}        <th><button type="button" class="gob-tb-sort" data-dir="asc">Expediente</button></th>
        <th><button type="button" class="gob-tb-sort">Ciudadano</button></th>
        <th><button type="button" class="gob-tb-sort">Dependencia</button></th>
        <th><button type="button" class="gob-tb-sort">Fecha</button></th>
        <th class="num"><button type="button" class="gob-tb-sort">Monto</button></th>
${withStatus ? `        <th>Estatus</th>\n` : ''}      </tr>
    </thead>
    <tbody>
${body}
    </tbody>
  </table>
  <span slot="footer">Mostrando 1â€“${rows.length} de ${rows.length}</span>
</gob-table>`;
  }

  if (lang === 'react') {
    return `// npm i @mariasan001/ui-wc
// Interaccion en React; gob-table solo aporta marco + estilos light-DOM.
import { useMemo, useState } from 'react';
import '@mariasan001/ui-wc';

const ROWS = ${sampleRowsJson(3)};

export function TablaExpedientes() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('folio');
  const [sortDir, setSortDir] = useState('asc');
${withCheck ? `  const [selected, setSelected] = useState(new Set());\n` : ''}
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = ROWS.filter((r) =>
      !q ||
      r.folio.toLowerCase().includes(q) ||
      r.ciudadano.toLowerCase().includes(q) ||
      r.curp.toLowerCase().includes(q)
    );
    return [...filtered].sort((a, b) => {
      const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]), 'es');
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [query, sortKey, sortDir]);

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }
${withCheck ? `
  function toggle(folio) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(folio)) next.delete(folio); else next.add(folio);
      return next;
    });
  }
` : ''}
  return (
    <gob-table${attrs}>
      <span slot="title">${title}</span>
${example.subtitle ? `      <span slot="subtitle">${example.subtitle}</span>\n` : ''}${example.showActions ? `      <span slot="actions">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filtrarâ€¦" />
      </span>\n` : ''}      <table>
        <thead>
          <tr>
${withCheck ? `            <th><input className="gob-tb-check" type="checkbox" /></th>\n` : ''}            <th><button type="button" className="gob-tb-sort" data-dir={sortKey === 'folio' ? sortDir : undefined} onClick={() => toggleSort('folio')}>Expediente</button></th>
            <th><button type="button" className="gob-tb-sort" data-dir={sortKey === 'ciudadano' ? sortDir : undefined} onClick={() => toggleSort('ciudadano')}>Ciudadano</button></th>
            <th><button type="button" className="gob-tb-sort" onClick={() => toggleSort('dependencia')}>Dependencia</button></th>
            <th><button type="button" className="gob-tb-sort" onClick={() => toggleSort('fecha')}>Fecha</button></th>
            <th className="num"><button type="button" className="gob-tb-sort" onClick={() => toggleSort('monto')}>Monto</button></th>
${withStatus ? `            <th>Estatus</th>\n` : ''}          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.folio}>
${withCheck ? `              <td>
                <input className="gob-tb-check" type="checkbox" checked={selected.has(r.folio)} onChange={() => toggle(r.folio)} />
              </td>\n` : ''}              <td>
                <span className="gob-tb-stack">
                  <span className="gob-tb-primary">{r.folio}</span>
                  <span className="gob-tb-secondary">Creado: {r.fecha}</span>
                </span>
              </td>
              <td>
                <span className="gob-tb-cell">
                  <span className="gob-tb-avatar" data-hue={r.hue}>{r.initials}</span>
                  <span className="gob-tb-stack">
                    <span className="gob-tb-primary">{r.ciudadano}</span>
                    <span className="gob-tb-secondary">{r.curp}</span>
                  </span>
                </span>
              </td>
              <td>{r.dependencia}</td>
              <td><span className="gob-tb-secondary">{r.fecha}</span></td>
              <td className="num">{r.monto}</td>
${withStatus ? `              <td>
                <span className="gob-tb-status" data-tone={r.estatus}>
                  <span className="gob-tb-dot" />
                  {r.estatusLabel}
                </span>
              </td>\n` : ''}            </tr>
          ))}
        </tbody>
      </table>
      <span slot="footer">
${withCheck ? `        {selected.size} seleccionados Â· ` : ''}{rows.length} registros
      </span>
    </gob-table>
  );
}`;
  }

  if (lang === 'vue') {
    return `<!-- npm i @mariasan001/ui-wc -->
<script setup>
import { computed, ref } from 'vue';
import '@mariasan001/ui-wc';

const query = ref('');
const rows = ref(${sampleRowsJson(3)});
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return rows.value.filter((r) =>
    !q || r.folio.toLowerCase().includes(q) || r.ciudadano.toLowerCase().includes(q)
  );
});
</script>

<template>
  <gob-table${attrs}>
    <span slot="title">${title}</span>
${example.showActions ? `    <span slot="actions">
      <input v-model="query" placeholder="Filtrarâ€¦" />
    </span>\n` : ''}    <table>
      <thead>
        <tr>
          <th>Expediente</th>
          <th>Ciudadano</th>
          <th>Dependencia</th>
          <th class="num">Monto</th>
${withStatus ? `          <th>Estatus</th>\n` : ''}        </tr>
      </thead>
      <tbody>
        <tr v-for="r in filtered" :key="r.folio">
          <td>{{ r.folio }}</td>
          <td>{{ r.ciudadano }}</td>
          <td>{{ r.dependencia }}</td>
          <td class="num">{{ r.monto }}</td>
${withStatus ? `          <td>
            <span class="gob-tb-status" :data-tone="r.estatus">{{ r.estatusLabel }}</span>
          </td>\n` : ''}        </tr>
      </tbody>
    </table>
    <span slot="footer">{{ filtered.length }} registros</span>
  </gob-table>
</template>`;
  }

  return `// npm i @mariasan001/ui-wc
// Angular: filtra/ordena en el .ts; gob-table solo estiliza el <table>.
import '@mariasan001/ui-wc';

<gob-table${attrs}>
  <span slot="title">${title}</span>
  <table>
    <thead>
      <tr>
        <th>Expediente</th>
        <th>Ciudadano</th>
        <th>Dependencia</th>
        <th class="num">Monto</th>
${withStatus ? `        <th>Estatus</th>\n` : ''}      </tr>
    </thead>
    <tbody>
${body}
    </tbody>
  </table>
  <span slot="footer">Mostrando 1â€“${rows.length}</span>
</gob-table>`;
}

