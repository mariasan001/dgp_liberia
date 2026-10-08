export type PreviewKind =
  | 'btn'
  | 'pag'
  | 'type'
  | 'color'
  | 'icon'
  | 'shell'
  | 'sidebar'
  | 'topbar'
  | 'page-header'
  | 'breadcrumb'
  | 'container'
  | 'grid'
  | 'divider'
  | 'spacer'
  | 'kpi-card'
  | 'chart-card'
  | 'tabla'
  | 'data-grid'
  | 'filter-bar'
  | 'toolbar'
  | 'list'
  | 'timeline'
  | 'activity-feed'
  | 'empty-state'
  | 'skeleton'
  | 'progress'
  | 'spinner'
  | 'input'
  | 'textarea'
  | 'select'
  | 'combobox'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'datepicker'
  | 'timepicker'
  | 'file-upload'
  | 'slider'
  | 'search-field'
  | 'form-field'
  | 'form'
  | 'tabs'
  | 'steps'
  | 'nav-menu'
  | 'pagination-bar'
  | 'link'
  | 'segmented'
  | 'icon-button'
  | 'button-group'
  | 'dropdown-menu'
  | 'split-button'
  | 'fab'
  | 'alert'
  | 'toast'
  | 'banner'
  | 'badge'
  | 'tag'
  | 'tooltip'
  | 'helper-text'
  | 'modal'
  | 'drawer'
  | 'popover'
  | 'sheet'
  | 'confirm-dialog'
  | 'card'
  | 'avatar'
  | 'user-menu'
  | 'accordion'
  | 'content-section'
  | 'hero-block'
  | 'footer'
  | 'table-of-contents'
  | 'code-block'
  | 'stat-strip'
  | 'notification-center'
  | 'command-palette'
  | 'soon';

export type ComponentStatus = 'ready' | 'soon';

export type ComponentCategory =
  | 'fundamentos'
  | 'acciones'
  | 'formularios'
  | 'navegacion'
  | 'layout'
  | 'datos'
  | 'feedback'
  | 'overlays'
  | 'contenido';

export type ComponentItem = {
  id: string;
  href?: string;
  name: string;
  description: string;
  preview: PreviewKind;
  category: ComponentCategory;
  tags: string[];
  status: ComponentStatus;
};

export const CATEGORIES: { id: ComponentCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'layout', label: 'Estructura' },
  { id: 'datos', label: 'Tablero' },
  { id: 'formularios', label: 'Formularios' },
  { id: 'navegacion', label: 'Navegacion' },
  { id: 'acciones', label: 'Acciones' },
  { id: 'feedback', label: 'Avisos' },
  { id: 'overlays', label: 'Capas' },
  { id: 'contenido', label: 'Contenido' },
  { id: 'fundamentos', label: 'Fundamentos' },
];

/** Catalogo curado Gob UI — nombres en espanol. */
export const COMPONENTS: ComponentItem[] = [
  {
    id: 'botones',
    href: '/botones',
    name: 'Botones',
    description: 'Acciones relleno, contorno, texto y dividido.',
    preview: 'btn',
    category: 'acciones',
    tags: ['button', 'cta', 'accion'],
    status: 'ready',
  },
  {
    id: 'paginacion',
    href: '/paginacion',
    name: 'Paginacion',
    description: 'Recorrido de listados, consultas y tablas.',
    preview: 'pag',
    category: 'navegacion',
    tags: ['pagination', 'tabla', 'listado'],
    status: 'ready',
  },
  {
    id: 'tipografia',
    href: '/tipografia',
    name: 'Tipografia',
    description: 'Gotham H1–H6, cuerpo y colores de texto.',
    preview: 'type',
    category: 'fundamentos',
    tags: ['font', 'texto', 'gotham'],
    status: 'ready',
  },
  {
    id: 'colores',
    href: '/colores',
    name: 'Colores',
    description: 'Marca, Canvas y semaforo institucional.',
    preview: 'color',
    category: 'fundamentos',
    tags: ['tokens', 'marca', 'semaforo'],
    status: 'ready',
  },
  {
    id: 'iconografia',
    href: '/iconografia',
    name: 'Iconografia',
    description: 'Phosphor thin y uso en componentes.',
    preview: 'icon',
    category: 'fundamentos',
    tags: ['phosphor', 'iconos'],
    status: 'ready',
  },
  {
    id: 'app-shell',
    href: '/estructura-app',
    name: 'Estructura de app',
    description: 'Marco base: menu lateral + barra superior + contenido.',
    preview: 'shell',
    category: 'layout',
    tags: ['dashboard', 'layout', 'shell', 'app'],
    status: 'ready',
  },
  {
    id: 'sidebar',
    href: '/menu-lateral',
    name: 'Menu lateral',
    description: 'Navegacion lateral colapsable para consolas.',
    preview: 'sidebar',
    category: 'layout',
    tags: ['menu', 'nav', 'dashboard', 'aside', 'sidebar'],
    status: 'ready',
  },
  {
    id: 'topbar',
    href: '/barra-superior',
    name: 'Barra superior',
    description: 'Barra con busqueda, usuario y acciones.',
    preview: 'topbar',
    category: 'layout',
    tags: ['header', 'navbar', 'dashboard', 'topbar'],
    status: 'ready',
  },
  {
    id: 'page-header',
    href: '/encabezado-pagina',
    name: 'Encabezado de pagina',
    description: 'Titulo, migas de pan y acciones de la vista.',
    preview: 'page-header',
    category: 'layout',
    tags: ['header', 'titulo', 'dashboard', 'page-header'],
    status: 'ready',
  },
  {
    id: 'breadcrumb',
    href: '/migas-de-pan',
    name: 'Migas de pan',
    description: 'Ruta jerarquica entre secciones del sistema.',
    preview: 'breadcrumb',
    category: 'navegacion',
    tags: ['ruta', 'navegacion', 'breadcrumb', 'migas'],
    status: 'ready',
  },
  {
    id: 'container',
    href: '/contenedor',
    name: 'Contenedor',
    description: 'Anchos y margenes consistentes de pagina.',
    preview: 'container',
    category: 'layout',
    tags: ['grid', 'layout', 'ancho', 'container'],
    status: 'ready',
  },
  {
    id: 'grid',
    href: '/cuadricula',
    name: 'Cuadricula',
    description: 'Composicion de filas, columnas y espacios.',
    preview: 'grid',
    category: 'layout',
    tags: ['layout', 'columnas', 'dashboard', 'grid'],
    status: 'ready',
  },
  {
    id: 'divider',
    href: '/separador',
    name: 'Separador',
    description: 'Lineas divisorias horizontales y verticales.',
    preview: 'divider',
    category: 'layout',
    tags: ['hr', 'separador', 'divider'],
    status: 'ready',
  },
  {
    id: 'spacer',
    href: '/espaciador',
    name: 'Espaciador',
    description: 'Espaciado utilitario entre bloques.',
    preview: 'spacer',
    category: 'layout',
    tags: ['espacio', 'layout', 'spacer'],
    status: 'ready',
  },
  {
    id: 'kpi-card',
    href: '/tarjeta-metrica',
    name: 'Tarjeta de metrica',
    description: 'Indicador clave con tendencia y periodo.',
    preview: 'kpi-card',
    category: 'datos',
    tags: ['dashboard', 'kpi', 'metric', 'stat'],
    status: 'ready',
  },
  {
    id: 'chart-card',
    href: '/tarjeta-grafica',
    name: 'Tarjeta de grafica',
    description: 'Contenedor de graficas con titulo y leyenda.',
    preview: 'chart-card',
    category: 'datos',
    tags: ['dashboard', 'chart', 'grafica'],
    status: 'ready',
  },
  {
    id: 'tabla',
    href: '/tabla',
    name: 'Tabla',
    description: 'Listados densos con orden, seleccion y vacios.',
    preview: 'tabla',
    category: 'datos',
    tags: ['table', 'datos', 'grid', 'dashboard', 'expedientes'],
    status: 'ready',
  },
  {
    id: 'data-grid',
    href: '/tabla-avanzada',
    name: 'Tabla avanzada',
    description: 'Tabla con filtros, columnas fijas y acciones por fila.',
    preview: 'data-grid',
    category: 'datos',
    tags: ['tabla', 'dashboard', 'excel', 'datagrid', 'filtros'],
    status: 'ready',
  },
  {
    id: 'filter-bar',
    href: '/barra-filtros',
    name: 'Barra de filtros',
    description: 'Filtros para tableros y consultas.',
    preview: 'filter-bar',
    category: 'datos',
    tags: ['filtros', 'dashboard', 'toolbar'],
    status: 'ready',
  },
  {
    id: 'toolbar',
    href: '/barra-herramientas',
    name: 'Barra de herramientas',
    description: 'Acciones de vista: exportar, refrescar, densificar.',
    preview: 'toolbar',
    category: 'datos',
    tags: ['acciones', 'dashboard', 'barra', 'toolbar'],
    status: 'ready',
  },
  {
    id: 'list',
    href: '/lista',
    name: 'Lista',
    description: 'Listas simples con avatar, meta y accion.',
    preview: 'list',
    category: 'datos',
    tags: ['lista', 'feed', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'timeline',
    href: '/linea-tiempo',
    name: 'Linea de tiempo',
    description: 'Historial de eventos y bitacoras.',
    preview: 'timeline',
    category: 'datos',
    tags: ['historial', 'actividad', 'dashboard', 'timeline'],
    status: 'ready',
  },
  {
    id: 'activity-feed',
    href: '/actividad-reciente',
    name: 'Actividad reciente',
    description: 'Flujo de actividad reciente del sistema.',
    preview: 'activity-feed',
    category: 'datos',
    tags: ['actividad', 'dashboard', 'notificaciones'],
    status: 'ready',
  },
  {
    id: 'empty-state',
    href: '/estado-vacio',
    name: 'Estado vacio',
    description: 'Vacios utiles con CTA cuando no hay datos.',
    preview: 'empty-state',
    category: 'datos',
    tags: ['vacio', 'placeholder', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'skeleton',
    href: '/esqueleto-carga',
    name: 'Esqueleto de carga',
    description: 'Placeholders de carga para tarjetas y tablas.',
    preview: 'skeleton',
    category: 'feedback',
    tags: ['loading', 'carga', 'dashboard', 'skeleton'],
    status: 'ready',
  },
  {
    id: 'progress',
    href: '/progreso',
    name: 'Progreso',
    description: 'Barras y anillos de avance.',
    preview: 'progress',
    category: 'feedback',
    tags: ['progreso', 'carga', 'progress'],
    status: 'ready',
  },
  {
    id: 'spinner',
    href: '/cargando',
    name: 'Cargando',
    description: 'Indicador de espera en linea o de pagina.',
    preview: 'spinner',
    category: 'feedback',
    tags: ['loading', 'espera', 'spinner'],
    status: 'ready',
  },
  {
    id: 'input',
    href: '/campo-texto',
    name: 'Campo de texto',
    description: 'Entrada de texto con ayuda y validacion.',
    preview: 'input',
    category: 'formularios',
    tags: ['form', 'textfield', 'input'],
    status: 'ready',
  },
  {
    id: 'textarea',
    href: '/area-texto',
    name: 'Area de texto',
    description: 'Texto multilinea para notas y observaciones.',
    preview: 'textarea',
    category: 'formularios',
    tags: ['form', 'texto', 'textarea'],
    status: 'ready',
  },
  {
    id: 'select',
    href: '/selector',
    name: 'Selector',
    description: 'Lista desplegable simple o con busqueda.',
    preview: 'select',
    category: 'formularios',
    tags: ['form', 'dropdown', 'lista', 'select'],
    status: 'ready',
  },
  {
    id: 'combobox',
    href: '/selector-busqueda',
    name: 'Selector con busqueda',
    description: 'Campo + lista filtrable de opciones.',
    preview: 'combobox',
    category: 'formularios',
    tags: ['form', 'autocomplete', 'busqueda', 'combobox'],
    status: 'ready',
  },
  {
    id: 'checkbox',
    href: '/casilla',
    name: 'Casilla',
    description: 'Seleccion multiple en formularios.',
    preview: 'checkbox',
    category: 'formularios',
    tags: ['form', 'check', 'checkbox'],
    status: 'ready',
  },
  {
    id: 'radio',
    href: '/opcion-unica',
    name: 'Opcion unica',
    description: 'Seleccion unica en grupos de opciones.',
    preview: 'radio',
    category: 'formularios',
    tags: ['form', 'radio'],
    status: 'ready',
  },
  {
    id: 'switch',
    href: '/interruptor',
    name: 'Interruptor',
    description: 'Encendido/apagado para preferencias y flags.',
    preview: 'switch',
    category: 'formularios',
    tags: ['toggle', 'form', 'switch'],
    status: 'ready',
  },
  {
    id: 'datepicker',
    href: '/selector-fecha',
    name: 'Selector de fecha',
    description: 'Fecha y rango para filtros de tablero.',
    preview: 'datepicker',
    category: 'formularios',
    tags: ['fecha', 'calendario', 'dashboard', 'filtro'],
    status: 'ready',
  },
  {
    id: 'timepicker',
    href: '/selector-hora',
    name: 'Selector de hora',
    description: 'Seleccion de hora en agendas y reportes.',
    preview: 'timepicker',
    category: 'formularios',
    tags: ['hora', 'form'],
    status: 'ready',
  },
  {
    id: 'file-upload',
    href: '/carga-archivos',
    name: 'Carga de archivos',
    description: 'Subida de archivos, arrastrar y soltar, progreso.',
    preview: 'file-upload',
    category: 'formularios',
    tags: ['archivo', 'upload', 'form'],
    status: 'ready',
  },
  {
    id: 'slider',
    href: '/control-deslizante',
    name: 'Control deslizante',
    description: 'Rango numerico continuo o discreto.',
    preview: 'slider',
    category: 'formularios',
    tags: ['range', 'form', 'slider'],
    status: 'ready',
  },
  {
    id: 'search-field',
    href: '/campo-busqueda',
    name: 'Campo de busqueda',
    description: 'Busqueda con icono, limpiar y atajos.',
    preview: 'search-field',
    category: 'formularios',
    tags: ['buscar', 'filtro', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'form-field',
    href: '/campo-formulario',
    name: 'Campo de formulario',
    description: 'Etiqueta + control + error + ayuda.',
    preview: 'form-field',
    category: 'formularios',
    tags: ['form', 'label', 'validacion'],
    status: 'ready',
  },
  {
    id: 'form',
    href: '/diseno-formulario',
    name: 'Diseño de formulario',
    description: 'Layouts de formulario de 1 o 2 columnas.',
    preview: 'form',
    category: 'formularios',
    tags: ['form', 'layout'],
    status: 'ready',
  },
  {
    id: 'tabs',
    href: '/pestanas',
    name: 'Pestañas',
    description: 'Navegacion por pestañas en paneles y bandejas.',
    preview: 'tabs',
    category: 'navegacion',
    tags: ['tabs', 'panel', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'steps',
    href: '/pasos',
    name: 'Pasos',
    description: 'Flujos por pasos (altas, tramites, asistentes).',
    preview: 'steps',
    category: 'navegacion',
    tags: ['pasos', 'wizard', 'flujo', 'stepper'],
    status: 'ready',
  },
  {
    id: 'nav-menu',
    href: '/menu-navegacion',
    name: 'Menu de navegacion',
    description: 'Menu horizontal o vertical de enlaces.',
    preview: 'nav-menu',
    category: 'navegacion',
    tags: ['menu', 'links'],
    status: 'ready',
  },
  {
    id: 'pagination-bar',
    href: '/barra-paginacion',
    name: 'Barra de paginacion',
    description: 'Resumen + controles de pagina juntos.',
    preview: 'pagination-bar',
    category: 'navegacion',
    tags: ['paginacion', 'tabla'],
    status: 'ready',
  },
  {
    id: 'link',
    href: '/enlace',
    name: 'Enlace',
    description: 'Enlaces tipograficos e en linea.',
    preview: 'link',
    category: 'navegacion',
    tags: ['anchor', 'texto', 'link'],
    status: 'ready',
  },
  {
    id: 'segmented',
    href: '/control-segmentado',
    name: 'Control segmentado',
    description: 'Selector compacto de vistas o periodos.',
    preview: 'segmented',
    category: 'navegacion',
    tags: ['toggle', 'filtro', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'icon-button',
    href: '/boton-icono',
    name: 'Boton de icono',
    description: 'Accion compacta solo con icono.',
    preview: 'icon-button',
    category: 'acciones',
    tags: ['button', 'icon'],
    status: 'ready',
  },
  {
    id: 'button-group',
    href: '/grupo-botones',
    name: 'Grupo de botones',
    description: 'Grupo de acciones relacionadas.',
    preview: 'button-group',
    category: 'acciones',
    tags: ['button', 'toolbar'],
    status: 'ready',
  },
  {
    id: 'dropdown-menu',
    href: '/menu-desplegable',
    name: 'Menu desplegable',
    description: 'Menu contextual de acciones.',
    preview: 'dropdown-menu',
    category: 'acciones',
    tags: ['menu', 'acciones', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'split-button',
    href: '/boton-dividido',
    name: 'Boton dividido',
    description: 'Accion principal + menu de variantes.',
    preview: 'split-button',
    category: 'acciones',
    tags: ['button', 'menu'],
    status: 'ready',
  },
  {
    id: 'fab',
    href: '/boton-flotante',
    name: 'Boton flotante',
    description: 'Accion primaria flotante en movil.',
    preview: 'fab',
    category: 'acciones',
    tags: ['button', 'flotante', 'fab'],
    status: 'ready',
  },
  {
    id: 'alert',
    href: '/alerta',
    name: 'Alerta',
    description: 'Avisos persistentes dentro de la pagina.',
    preview: 'alert',
    category: 'feedback',
    tags: ['alerta', 'banner', 'semaforo'],
    status: 'ready',
  },
  {
    id: 'toast',
    href: '/aviso-temporal',
    name: 'Aviso temporal',
    description: 'Mensajes breves de exito, error e informacion.',
    preview: 'toast',
    category: 'feedback',
    tags: ['snackbar', 'notificacion', 'toast'],
    status: 'ready',
  },
  {
    id: 'banner',
    href: '/banner',
    name: 'Banner',
    description: 'Aviso de sistema a ancho completo.',
    preview: 'banner',
    category: 'feedback',
    tags: ['alerta', 'sistema'],
    status: 'ready',
  },
  {
    id: 'badge',
    href: '/insignia',
    name: 'Insignia',
    description: 'Etiquetas de estado y conteos.',
    preview: 'badge',
    category: 'feedback',
    tags: ['tag', 'estado', 'dashboard', 'badge'],
    status: 'ready',
  },
  {
    id: 'tag',
    href: '/etiqueta',
    name: 'Etiqueta',
    description: 'Chips removibles para filtros activos.',
    preview: 'tag',
    category: 'feedback',
    tags: ['filtro', 'chip', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'tooltip',
    href: '/descripcion-emergente',
    name: 'Descripcion emergente',
    description: 'Ayuda contextual al pasar el cursor.',
    preview: 'tooltip',
    category: 'feedback',
    tags: ['ayuda', 'hover', 'tooltip'],
    status: 'ready',
  },
  {
    id: 'helper-text',
    href: '/texto-ayuda',
    name: 'Texto de ayuda',
    description: 'Texto de apoyo y error bajo controles.',
    preview: 'helper-text',
    category: 'feedback',
    tags: ['form', 'error'],
    status: 'ready',
  },
  {
    id: 'modal',
    href: '/modal',
    name: 'Modal',
    description: 'Ventana de confirmacion o formulario corto.',
    preview: 'modal',
    category: 'overlays',
    tags: ['dialog', 'overlay'],
    status: 'ready',
  },
  {
    id: 'drawer',
    href: '/panel-deslizable',
    name: 'Panel deslizable',
    description: 'Panel lateral para detalle o filtros.',
    preview: 'drawer',
    category: 'overlays',
    tags: ['panel', 'sidebar', 'dashboard', 'drawer'],
    status: 'ready',
  },
  {
    id: 'popover',
    href: '/ventana-anclada',
    name: 'Ventana anclada',
    description: 'Contenido emergente anclado a un trigger.',
    preview: 'popover',
    category: 'overlays',
    tags: ['overlay', 'menu', 'popover'],
    status: 'ready',
  },
  {
    id: 'sheet',
    href: '/hoja-inferior',
    name: 'Hoja inferior',
    description: 'Panel desde abajo para acciones en movil.',
    preview: 'sheet',
    category: 'overlays',
    tags: ['movil', 'overlay', 'sheet'],
    status: 'ready',
  },
  {
    id: 'confirm-dialog',
    href: '/confirmacion',
    name: 'Confirmacion',
    description: 'Dialogo para acciones destructivas o criticas.',
    preview: 'confirm-dialog',
    category: 'overlays',
    tags: ['modal', 'peligro'],
    status: 'ready',
  },
  {
    id: 'card',
    href: '/tarjeta',
    name: 'Tarjeta',
    description: 'Contenedor de contenido y acciones.',
    preview: 'card',
    category: 'contenido',
    tags: ['panel', 'dashboard', 'web', 'card'],
    status: 'ready',
  },
  {
    id: 'avatar',
    href: '/avatar',
    name: 'Avatar',
    description: 'Foto o iniciales de usuario.',
    preview: 'avatar',
    category: 'contenido',
    tags: ['usuario', 'perfil'],
    status: 'ready',
  },
  {
    id: 'user-menu',
    href: '/menu-usuario',
    name: 'Menu de usuario',
    description: 'Cuenta, sesion y preferencias.',
    preview: 'user-menu',
    category: 'contenido',
    tags: ['perfil', 'dashboard', 'topbar'],
    status: 'ready',
  },
  {
    id: 'accordion',
    href: '/acordeon',
    name: 'Acordeon',
    description: 'Secciones expandibles de contenido.',
    preview: 'accordion',
    category: 'contenido',
    tags: ['faq', 'collapse'],
    status: 'ready',
  },
  {
    id: 'tabs-content',
    href: '/secciones-contenido',
    name: 'Secciones de contenido',
    description: 'Bloques de seccion para landing y docs.',
    preview: 'content-section',
    category: 'contenido',
    tags: ['web', 'seccion', 'landing'],
    status: 'ready',
  },
  {
    id: 'hero-block',
    href: '/bloque-heroe',
    name: 'Bloque heroe',
    description: 'Bloque principal para paginas publicas.',
    preview: 'hero-block',
    category: 'contenido',
    tags: ['web', 'landing', 'marca', 'hero'],
    status: 'ready',
  },
  {
    id: 'footer',
    href: '/pie-pagina',
    name: 'Pie de pagina',
    description: 'Pie institucional de sitio.',
    preview: 'footer',
    category: 'contenido',
    tags: ['web', 'pie', 'footer'],
    status: 'ready',
  },
  {
    id: 'table-of-contents',
    href: '/indice-contenidos',
    name: 'Indice de contenidos',
    description: 'Indice lateral para documentos largos.',
    preview: 'table-of-contents',
    category: 'contenido',
    tags: ['docs', 'indice'],
    status: 'ready',
  },
  {
    id: 'code-block',
    href: '/bloque-codigo',
    name: 'Bloque de codigo',
    description: 'Codigo con boton de copiar.',
    preview: 'code-block',
    category: 'contenido',
    tags: ['docs', 'snippet'],
    status: 'ready',
  },
  {
    id: 'stat-strip',
    href: '/franja-metricas',
    name: 'Franja de metricas',
    description: 'Fila de metricas en landing o resumen.',
    preview: 'stat-strip',
    category: 'contenido',
    tags: ['web', 'metricas'],
    status: 'ready',
  },
  {
    id: 'notification-center',
    href: '/centro-notificaciones',
    name: 'Centro de notificaciones',
    description: 'Centro de avisos del tablero.',
    preview: 'notification-center',
    category: 'datos',
    tags: ['dashboard', 'campana', 'avisos'],
    status: 'ready',
  },
  {
    id: 'command-palette',
    href: '/paleta-comandos',
    name: 'Paleta de comandos',
    description: 'Busqueda global de acciones (Cmd/Ctrl+K).',
    preview: 'command-palette',
    category: 'navegacion',
    tags: ['busqueda', 'atajos', 'dashboard'],
    status: 'ready',
  },
];
