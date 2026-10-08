import type { DataGridTone, DataGridVariant } from '@mariasan001/ui-wc';

import type { TabId } from './grid-logic';

export type { TabId };

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export const COLOR_OPTIONS: {
  id: DataGridTone;
  label: string;
  swatch: string;
}[] = [
  { id: 'primary', label: 'Primary', swatch: '#9F2141' },
  { id: 'accent', label: 'Accent', swatch: '#BC945A' },
  { id: 'dark', label: 'Dark', swatch: '#181511' },
  { id: 'neutral', label: 'Neutral', swatch: '#FFFFFF' },
  { id: 'soft', label: 'Soft', swatch: '#E7D7BD' },
];

export type GridExample = {
  id: DataGridVariant;
  title: string;
  description: string;
  variant: DataGridVariant;
  cardTitle: string;
  subtitle?: string;
  showFilters?: boolean;
  showTabs?: boolean;
  showBulk?: boolean;
  showActions?: boolean;
  footer?: string;
};

export const GRID_EXAMPLES: GridExample[] = [
  {
    id: 'filters',
    title: 'Con filtros',
    description:
      'Tabs de estatus, busqueda y chips — consulta masiva tipo SaaS institucional.',
    variant: 'filters',
    cardTitle: 'Expedientes',
    subtitle: 'Vista completa de todos los expedientes de la dependencia.',
    showFilters: true,
    showTabs: true,
    showActions: true,
    footer: '1 – 6 de 12,480',
  },
  {
    id: 'frozen-left',
    title: 'Columna fija izq.',
    description: 'Congela el folio al hacer scroll horizontal en grillas anchas.',
    variant: 'frozen-left',
    cardTitle: 'Padron ampliado',
    subtitle: 'Scroll horizontal con folio siempre visible.',
    footer: 'Columna Folio fijada',
  },
  {
    id: 'frozen-right',
    title: 'Acciones fijas',
    description: 'Menu de fila siempre visible a la derecha.',
    variant: 'frozen-right',
    cardTitle: 'Operacion de casos',
    showActions: true,
    footer: 'Acciones siempre a la vista',
  },
  {
    id: 'bulk',
    title: 'Barra de lote',
    description: 'Seleccion multiple con barra de acciones masivas.',
    variant: 'bulk',
    cardTitle: 'Asignacion por lote',
    subtitle: 'Mesa de control · 3 seleccionados',
    showBulk: true,
    footer: 'Ideal para archivar / reasignar cientos de filas',
  },
  {
    id: 'paginated',
    title: 'Con paginacion',
    description: 'Pie moderno con paginas numeradas para datasets de servidor.',
    variant: 'paginated',
    cardTitle: 'Bitacora institucional',
    subtitle: 'Registros paginados desde servidor.',
    showTabs: true,
    showFilters: true,
    showActions: true,
    footer: '1 – 6 de 12,480',
  },
  {
    id: 'expandable',
    title: 'Fila expandible',
    description: 'Detalle anidado del expediente sin salir del listado.',
    variant: 'expandable',
    cardTitle: 'Seguimiento detallado',
    subtitle: 'Expande la fila para ver cargos y documentos.',
    showTabs: true,
    showActions: true,
    footer: '1 fila expandida',
  },
  {
    id: 'column-filter',
    title: 'Filtro por columna',
    description: 'Inputs bajo cada encabezado para afinar sin abrir paneles.',
    variant: 'column-filter',
    cardTitle: 'Tablero analitico',
    showFilters: true,
    showTabs: true,
    footer: 'Filtros inline por campo',
  },
  {
    id: 'wide',
    title: 'Muchas columnas',
    description: 'Grilla ancha de reportes con scroll H y jerarquia visual.',
    variant: 'wide',
    cardTitle: 'Reporte operativo',
    subtitle: '14 columnas · exportable',
    showFilters: true,
    showTabs: true,
    showActions: true,
    footer: '1 – 6 de 12,480',
  },
  {
    id: 'toolbar',
    title: 'Toolbar completa',
    description: 'Tabs + busqueda + ordenar + filtrar + exportar en un bloque.',
    variant: 'toolbar',
    cardTitle: 'Centro de tramites',
    subtitle: 'Panel operativo de mesa de control.',
    showFilters: true,
    showTabs: true,
    showActions: true,
    footer: 'Actualizado hace 45s',
  },
  {
    id: 'grouped',
    title: 'Agrupada',
    description: 'Filas de grupo por dependencia para navegar volumenes grandes.',
    variant: 'grouped',
    cardTitle: 'Expedientes por dependencia',
    subtitle: 'Agrupacion servidor',
    footer: '3 grupos · 12,480 total',
  },
  {
    id: 'card-rows',
    title: 'Filas tarjeta',
    description: 'Cada fila es una tarjeta con espacio — listado operativo premium.',
    variant: 'card-rows',
    cardTitle: 'Mesa de control',
    subtitle: 'Vista de tarjetas para priorizar casos.',
    showTabs: true,
    showFilters: true,
    showActions: true,
    footer: '1 – 6 de 12,480',
  },
  {
    id: 'assignees',
    title: 'Con asignados',
    description: 'Stack de avatares del analitista / mesa responsable.',
    variant: 'assignees',
    cardTitle: 'Carga por analista',
    subtitle: 'Quien atiende cada expediente.',
    showTabs: true,
    showFilters: true,
    showActions: true,
    footer: '1 – 6 de 12,480',
  },
  {
    id: 'progress',
    title: 'Con progreso',
    description: 'Barras y anillos de avance documental (checklist / score).',
    variant: 'progress',
    cardTitle: 'Avance de expedientes',
    subtitle: 'Documentacion y cumplimiento.',
    showTabs: true,
    showFilters: true,
    showActions: true,
    footer: 'Promedio de avance: 68%',
  },
  {
    id: 'tags',
    title: 'Con etiquetas',
    description: 'Pills de programa, prioridad y canal sin saturar la fila.',
    variant: 'tags',
    cardTitle: 'Clasificacion operativa',
    subtitle: 'Etiquetas institucionales.',
    showTabs: true,
    showFilters: true,
    showActions: true,
    footer: '1 – 6 de 12,480',
  },
  {
    id: 'live',
    title: 'Estado en vivo',
    description: 'Indicador Live + ubicacion / siguiente accion en tiempo real.',
    variant: 'live',
    cardTitle: 'Operacion en campo',
    subtitle: 'Ventanillas y unidades moviles.',
    showTabs: true,
    showFilters: true,
    showActions: true,
    footer: '4 unidades en vivo',
  },
  {
    id: 'financial',
    title: 'Financiera',
    description: 'Total, pagado y saldo con color (estilo factura / cobranza).',
    variant: 'financial',
    cardTitle: 'Cobranza de derechos',
    subtitle: 'Montos institucionales.',
    showTabs: true,
    showFilters: true,
    showActions: true,
    footer: 'Saldo pendiente: $13,580.00',
  },
  {
    id: 'alert',
    title: 'Con alertas',
    description: 'Filas prioritarias resaltadas para vencimientos o riesgos.',
    variant: 'alert',
    cardTitle: 'Vencimientos criticos',
    subtitle: 'Atencion inmediata.',
    showTabs: true,
    showFilters: true,
    showActions: true,
    footer: '2 alertas activas',
  },
  {
    id: 'skeleton',
    title: 'Cargando',
    description: 'Skeleton shimmer mientras llegan datos del servidor.',
    variant: 'skeleton',
    cardTitle: 'Cargando expedientes',
    subtitle: 'Esperando respuesta del API…',
    showActions: true,
    footer: 'Cargando…',
  },
];

export const GRID_ATTRS = [
  {
    name: 'variant',
    type: 'string',
    defaultValue: 'filters',
    body: 'filters | frozen-left | frozen-right | bulk | paginated | expandable | column-filter | wide | toolbar | grouped | card-rows | assignees | progress | tags | live | financial | alert | skeleton',
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
    defaultValue: '—',
    body: 'Titulo del grid.',
  },
  {
    name: 'slot=subtitle',
    type: 'slot',
    defaultValue: '—',
    body: 'Contexto o conteo de registros.',
  },
  {
    name: 'slot=actions',
    type: 'slot',
    defaultValue: '—',
    body: 'Acciones globales (exportar, ordenar, filtrar).',
  },
  {
    name: 'slot=tabs',
    type: 'slot',
    defaultValue: '—',
    body: 'Tabs de estatus con conteos (Todos, Activos, etc.).',
  },
  {
    name: 'slot=filters',
    type: 'slot',
    defaultValue: '—',
    body: 'Barra de busqueda y chips de filtro.',
  },
  {
    name: 'slot=bulk',
    type: 'slot',
    defaultValue: '—',
    body: 'Barra de acciones masivas.',
  },
  {
    name: 'slot=default',
    type: 'slot',
    defaultValue: '—',
    body: 'Tabla HTML nativa con thead/tbody.',
  },
  {
    name: 'slot=footer',
    type: 'slot',
    defaultValue: '—',
    body: 'Paginacion / resumen.',
  },
] as const;

export type DemoRow = {
  folio: string;
  ciudadano: string;
  curp: string;
  dependencia: string;
  fecha: string;
  monto: string;
  pagado: string;
  saldo: string;
  municipio: string;
  programa: string;
  estatus: 'ok' | 'warn' | 'err' | 'info' | 'muted';
  estatusLabel: string;
  initials: string;
  hue: number;
  isNew?: boolean;
  relative: string;
  assignees: { initials: string; hue: number }[];
  assigneeExtra: number;
  progress: number;
  score: number;
  tags: string[];
  location: string;
  locationNote: string;
  live: boolean;
  alert?: boolean;
  alertReason?: string;
};

export const DEMO_ROWS: DemoRow[] = [
  {
    folio: 'EXP-2026-01482',
    ciudadano: 'Garcia Lopez, Ana',
    curp: 'GALA850312MDFRPN09',
    dependencia: 'Salud',
    fecha: '12/03/2026',
    monto: '$4,250.00',
    pagado: '$4,250.00',
    saldo: '$0.00',
    municipio: 'Centro',
    programa: 'Apoyo familiar',
    estatus: 'ok',
    estatusLabel: 'Aprobado',
    initials: 'AG',
    hue: 0,
    relative: 'hace 2 h',
    assignees: [
      { initials: 'MR', hue: 1 },
      { initials: 'CL', hue: 2 },
    ],
    assigneeExtra: 1,
    progress: 100,
    score: 9,
    tags: ['Prioritario', 'Salud'],
    location: 'Ventanilla 4 · Centro',
    locationNote: 'Listo para entrega',
    live: false,
  },
  {
    folio: 'EXP-2026-01483',
    ciudadano: 'Hernandez Ruiz, Luis',
    curp: 'HERL900221HDFRZS08',
    dependencia: 'Educacion',
    fecha: '12/03/2026',
    monto: '$1,180.00',
    pagado: '$0.00',
    saldo: '$1,180.00',
    municipio: 'Norte',
    programa: 'Beca basica',
    estatus: 'warn',
    estatusLabel: 'En revision',
    initials: 'LH',
    hue: 1,
    isNew: true,
    relative: 'hace 5 h',
    assignees: [
      { initials: 'SP', hue: 0 },
      { initials: 'JD', hue: 4 },
      { initials: 'AK', hue: 5 },
    ],
    assigneeExtra: 0,
    progress: 45,
    score: 4,
    tags: ['Beca', 'Documentos'],
    location: 'Mesa 2 · Educacion',
    locationNote: 'Faltan 2 anexos',
    live: true,
    alert: true,
    alertReason: 'Vence en 24 h',
  },
  {
    folio: 'EXP-2026-01484',
    ciudadano: 'Martinez Soto, Paula',
    curp: 'MASP880714MDFRTL05',
    dependencia: 'Movilidad',
    fecha: '11/03/2026',
    monto: '$890.00',
    pagado: '$890.00',
    saldo: '$0.00',
    municipio: 'Sur',
    programa: 'Tarifa social',
    estatus: 'ok',
    estatusLabel: 'Aprobado',
    initials: 'PM',
    hue: 2,
    relative: 'ayer',
    assignees: [{ initials: 'TG', hue: 3 }],
    assigneeExtra: 0,
    progress: 90,
    score: 8,
    tags: ['Movilidad'],
    location: 'Unidad movil Sur',
    locationNote: '5 min a siguiente cita',
    live: true,
  },
  {
    folio: 'EXP-2026-01485',
    ciudadano: 'Jimenez Cruz, Diego',
    curp: 'JICD750903HDFMRG02',
    dependencia: 'Hacienda',
    fecha: '11/03/2026',
    monto: '$12,400.00',
    pagado: '$0.00',
    saldo: '$12,400.00',
    municipio: 'Oriente',
    programa: 'Devolucion',
    estatus: 'err',
    estatusLabel: 'Rechazado',
    initials: 'DJ',
    hue: 3,
    relative: 'ayer',
    assignees: [
      { initials: 'NR', hue: 1 },
      { initials: 'FB', hue: 2 },
    ],
    assigneeExtra: 2,
    progress: 20,
    score: 2,
    tags: ['Hacienda', 'Urgente'],
    location: 'Archivo Oriente',
    locationNote: 'Requiere reclasificacion',
    live: false,
    alert: true,
    alertReason: 'Saldo critico',
  },
  {
    folio: 'EXP-2026-01486',
    ciudadano: 'Vargas Neri, Sofia',
    curp: 'VANS920518MDFRRF07',
    dependencia: 'Seguridad',
    fecha: '10/03/2026',
    monto: '$2,010.00',
    pagado: '$1,000.00',
    saldo: '$1,010.00',
    municipio: 'Poniente',
    programa: 'Atencion ciudadana',
    estatus: 'info',
    estatusLabel: 'En transito',
    initials: 'SV',
    hue: 4,
    relative: 'hace 2 d',
    assignees: [
      { initials: 'QL', hue: 5 },
      { initials: 'HM', hue: 0 },
    ],
    assigneeExtra: 0,
    progress: 65,
    score: 6,
    tags: ['Campo', 'Seguridad'],
    location: 'Ruta Poniente',
    locationNote: 'En ruta · ETA 18 min',
    live: true,
  },
  {
    folio: 'EXP-2026-01487',
    ciudadano: 'Ortega Diaz, Mario',
    curp: 'ORDM830101HDFRTR01',
    dependencia: 'Salud',
    fecha: '10/03/2026',
    monto: '$760.00',
    pagado: '$760.00',
    saldo: '$0.00',
    municipio: 'Centro',
    programa: 'Medicamentos',
    estatus: 'ok',
    estatusLabel: 'Aprobado',
    initials: 'MO',
    hue: 5,
    relative: 'hace 2 d',
    assignees: [{ initials: 'VW', hue: 2 }],
    assigneeExtra: 0,
    progress: 80,
    score: 7,
    tags: ['Farmacia'],
    location: 'Farmacia Centro',
    locationNote: 'Entrega programada',
    live: false,
  },
];

export const STATUS_TABS: {
  id: TabId;
  label: string;
}[] = [
  { id: 'all', label: 'Todos' },
  { id: 'active', label: 'Activos' },
  { id: 'review', label: 'En revision' },
  { id: 'transit', label: 'En transito' },
  { id: 'done', label: 'Completados' },
  { id: 'cancel', label: 'Cancelados' },
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
      pagado: r.pagado,
      saldo: r.saldo,
      programa: r.programa,
      estatus: r.estatus,
      estatusLabel: r.estatusLabel,
      initials: r.initials,
      hue: r.hue,
      relative: r.relative,
    })),
    null,
    2,
  );
}

function htmlRow(r: (typeof DEMO_ROWS)[number], indent = '      '): string {
  return `${indent}<tr>
${indent}  <td>
${indent}    <span class="gob-dg-stack">
${indent}      <span class="gob-dg-primary">${r.folio}</span>
${indent}      <span class="gob-dg-secondary">Creado: ${r.fecha}</span>
${indent}    </span>
${indent}  </td>
${indent}  <td>
${indent}    <span class="gob-dg-cell">
${indent}      <span class="gob-dg-avatar" data-hue="${r.hue}">${r.initials}</span>
${indent}      <span class="gob-dg-stack">
${indent}        <span class="gob-dg-primary">${r.ciudadano}</span>
${indent}        <span class="gob-dg-secondary">${r.curp}</span>
${indent}      </span>
${indent}    </span>
${indent}  </td>
${indent}  <td>
${indent}    <span class="gob-dg-stack">
${indent}      <span class="gob-dg-primary">${r.dependencia}</span>
${indent}      <span class="gob-dg-secondary">${r.programa}</span>
${indent}    </span>
${indent}  </td>
${indent}  <td><span class="gob-dg-secondary">${r.relative}</span></td>
${indent}  <td class="num">${r.monto}</td>
${indent}  <td><span class="gob-dg-status" data-tone="${r.estatus}"><span class="gob-dg-dot"></span>${r.estatusLabel}</span></td>
${indent}</tr>`;
}

function chromeSlots(example: GridExample, lang: CodeLang): string {
  const tabs =
    example.showTabs
      ? lang === 'react'
        ? `      <div slot="tabs">{/* tabs con conteos + onClick */}</div>`
        : `  <div slot="tabs">
    <button type="button" data-active>Todos</button>
    <button type="button">Activos</button>
    <button type="button">En revision</button>
  </div>`
      : '';
  const filters =
    example.showFilters
      ? lang === 'react'
        ? `      <div slot="filters">
        <input placeholder="Buscar folio, CURP o nombre..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>`
        : `  <div slot="filters">
    <input placeholder="Buscar folio, CURP o nombre..." />
  </div>`
      : '';
  const bulk =
    example.showBulk
      ? lang === 'react'
        ? `      <div slot="bulk">{selected.length} seleccionados</div>`
        : `  <div slot="bulk">0 seleccionados</div>`
      : '';
  return [tabs, filters, bulk].filter(Boolean).join('\n');
}

/** Snippet completo: markup real + patron interactivo (la logica vive en tu app). */
export function buildSnippet(
  lang: CodeLang,
  example: GridExample,
  tone: DataGridTone,
): string {
  const attrs = ` variant="${example.variant}" tone="${tone}"`;
  const rows = DEMO_ROWS.slice(0, 3);
  const htmlBody = rows.map((r) => htmlRow(r)).join('\n');
  const chrome = chromeSlots(example, lang);

  if (lang === 'html') {
    return `<!-- npm i @mariasan001/ui-wc -->
<!-- gob-data-grid es el cascaron visual. Ordenar/filtrar/paginar lo implementas en tu app. -->
<script type="module">import '@mariasan001/ui-wc';</script>

<gob-data-grid${attrs}>
  <span slot="title">${example.cardTitle}</span>
${example.subtitle ? `  <span slot="subtitle">${example.subtitle}</span>\n` : ''}${chrome ? `${chrome}\n` : ''}  <table>
    <thead>
      <tr>
        <th><button type="button" class="gob-dg-sort" data-dir="desc">Expediente</button></th>
        <th><button type="button" class="gob-dg-sort">Ciudadano</button></th>
        <th><button type="button" class="gob-dg-sort">Dependencia</button></th>
        <th><button type="button" class="gob-dg-sort">Actualizado</button></th>
        <th class="num"><button type="button" class="gob-dg-sort">Monto</button></th>
        <th><button type="button" class="gob-dg-sort">Estatus</button></th>
      </tr>
    </thead>
    <tbody>
${htmlBody}
    </tbody>
  </table>
  <span slot="footer">1 – ${rows.length} de ${rows.length}</span>
</gob-data-grid>`;
  }

  if (lang === 'react') {
    return `// npm i @mariasan001/ui-wc
// Patron interactivo: el estado (sort/filter/page) vive en React; gob-data-grid solo pinta.
import { useMemo, useState } from 'react';
import '@mariasan001/ui-wc';

const ROWS = ${sampleRowsJson(3)};

export function TablaAvanzada() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('folio');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const pageSize = 5;
${example.showBulk ? `  const [selected, setSelected] = useState([]);\n` : ''}
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROWS.filter((r) =>
      !q ||
      r.folio.toLowerCase().includes(q) ||
      r.ciudadano.toLowerCase().includes(q) ||
      r.curp.toLowerCase().includes(q)
    );
  }, [query]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = String(av).localeCompare(String(bv), 'es');
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize);
  const from = sorted.length ? (page - 1) * pageSize + 1 : 0;
  const to = (page - 1) * pageSize + pageRows.length;

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }

  return (
    <gob-data-grid${attrs}>
      <span slot="title">${example.cardTitle}</span>
${example.subtitle ? `      <span slot="subtitle">${example.subtitle}</span>\n` : ''}${chrome ? `${chrome}\n` : ''}      <table>
        <thead>
          <tr>
            <th><button type="button" className="gob-dg-sort" data-dir={sortKey === 'folio' ? sortDir : undefined} onClick={() => toggleSort('folio')}>Expediente</button></th>
            <th><button type="button" className="gob-dg-sort" data-dir={sortKey === 'ciudadano' ? sortDir : undefined} onClick={() => toggleSort('ciudadano')}>Ciudadano</button></th>
            <th>Dependencia</th>
            <th>Actualizado</th>
            <th className="num">Monto</th>
            <th>Estatus</th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((r) => (
            <tr key={r.folio}>
              <td>
                <span className="gob-dg-stack">
                  <span className="gob-dg-primary">{r.folio}</span>
                  <span className="gob-dg-secondary">Creado: {r.fecha}</span>
                </span>
              </td>
              <td>
                <span className="gob-dg-cell">
                  <span className="gob-dg-avatar" data-hue={r.hue}>{r.initials}</span>
                  <span className="gob-dg-stack">
                    <span className="gob-dg-primary">{r.ciudadano}</span>
                    <span className="gob-dg-secondary">{r.curp}</span>
                  </span>
                </span>
              </td>
              <td>
                <span className="gob-dg-stack">
                  <span className="gob-dg-primary">{r.dependencia}</span>
                  <span className="gob-dg-secondary">{r.programa}</span>
                </span>
              </td>
              <td><span className="gob-dg-secondary">{r.relative}</span></td>
              <td className="num">{r.monto}</td>
              <td>
                <span className="gob-dg-status" data-tone={r.estatus}>
                  <span className="gob-dg-dot" />
                  {r.estatusLabel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span slot="footer">
        {from} – {to} de {sorted.length}
        <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Anterior</button>
        <button type="button" disabled={to >= sorted.length} onClick={() => setPage((p) => p + 1)}>Siguiente</button>
      </span>
    </gob-data-grid>
  );
}`;
  }

  if (lang === 'vue') {
    return `<!-- npm i @mariasan001/ui-wc -->
<!-- La interaccion (sort/filter/page) la controlas en script setup; el WC solo estiliza. -->
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
  <gob-data-grid${attrs}>
    <span slot="title">${example.cardTitle}</span>
${example.subtitle ? `    <span slot="subtitle">${example.subtitle}</span>\n` : ''}${example.showFilters ? `    <div slot="filters">
      <input v-model="query" placeholder="Buscar folio, CURP o nombre..." />
    </div>\n` : ''}    <table>
      <thead>
        <tr>
          <th>Expediente</th>
          <th>Ciudadano</th>
          <th>Dependencia</th>
          <th class="num">Monto</th>
          <th>Estatus</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in filtered" :key="r.folio">
          <td>
            <span class="gob-dg-stack">
              <span class="gob-dg-primary">{{ r.folio }}</span>
              <span class="gob-dg-secondary">Creado: {{ r.fecha }}</span>
            </span>
          </td>
          <td>
            <span class="gob-dg-cell">
              <span class="gob-dg-avatar" :data-hue="r.hue">{{ r.initials }}</span>
              <span class="gob-dg-stack">
                <span class="gob-dg-primary">{{ r.ciudadano }}</span>
                <span class="gob-dg-secondary">{{ r.curp }}</span>
              </span>
            </span>
          </td>
          <td>{{ r.dependencia }}</td>
          <td class="num">{{ r.monto }}</td>
          <td>
            <span class="gob-dg-status" :data-tone="r.estatus">{{ r.estatusLabel }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <span slot="footer">{{ filtered.length }} resultados</span>
  </gob-data-grid>
</template>`;
  }

  return `// npm i @mariasan001/ui-wc
// Angular: controla sort/filter/page en el componente; gob-data-grid solo renderiza slots + table.
// app.component.ts — rows = ${JSON.stringify(rows.map((r) => r.folio))}
import '@mariasan001/ui-wc';

// app.component.html
<gob-data-grid${attrs}>
  <span slot="title">${example.cardTitle}</span>
${example.subtitle ? `  <span slot="subtitle">${example.subtitle}</span>\n` : ''}  <div slot="filters">
    <input placeholder="Buscar folio, CURP o nombre..." (input)="onSearch($event)" />
  </div>
  <table>
    <thead>
      <tr>
        <th>Expediente</th>
        <th>Ciudadano</th>
        <th>Dependencia</th>
        <th class="num">Monto</th>
        <th>Estatus</th>
      </tr>
    </thead>
    <tbody>
${htmlBody}
    </tbody>
  </table>
  <span slot="footer">1 – ${rows.length} de ${rows.length}</span>
</gob-data-grid>`;
}

