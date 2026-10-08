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
  | 'tabla'
  | 'list'
  | 'empty-state'
  | 'skeleton'
  | 'progress'
  | 'spinner'
  | 'input'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'file-upload'
  | 'search-field'
  | 'form-field'
  | 'form'
  | 'tabs'
  | 'steps'
  | 'nav-menu'
  | 'pagination-bar'
  | 'link'
  | 'icon-button'
  | 'button-group'
  | 'dropdown-menu'
  | 'alert'
  | 'toast'
  | 'banner'
  | 'badge'
  | 'tag'
  | 'tooltip'
  | 'helper-text'
  | 'modal'
  | 'confirm-dialog'
  | 'card'
  | 'avatar'
  | 'accordion'
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
  { id: 'navegacion', label: 'Navegación' },
  { id: 'acciones', label: 'Acciones' },
  { id: 'feedback', label: 'Avisos' },
  { id: 'overlays', label: 'Capas' },
  { id: 'contenido', label: 'Contenido' },
  { id: 'fundamentos', label: 'Fundamentos' },
];

/** Catálogo Gob UI HTML — 50 elementos básicos. */
export const COMPONENTS: ComponentItem[] = [
  {
    id: 'botones',
    href: '/botones',
    name: 'Botones',
    description: 'Acciones relleno, contorno y texto.',
    preview: 'btn',
    category: 'acciones',
    tags: ['button', 'cta', 'acción'],
    status: 'ready',
  },
  {
    id: 'paginacion',
    href: '/paginacion',
    name: 'Paginación',
    description: 'Recorrido de listados, consultas y tablas.',
    preview: 'pag',
    category: 'navegacion',
    tags: ['pagination', 'tabla', 'listado'],
    status: 'ready',
  },
  {
    id: 'tipografia',
    href: '/tipografia',
    name: 'Tipografía',
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
    description: 'Marca, Canvas y semáforo institucional.',
    preview: 'color',
    category: 'fundamentos',
    tags: ['tokens', 'marca', 'semáforo'],
    status: 'ready',
  },
  {
    id: 'iconografia',
    href: '/iconografia',
    name: 'Iconografía',
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
    description: 'Marco base: menú lateral + barra superior + contenido.',
    preview: 'shell',
    category: 'layout',
    tags: ['dashboard', 'layout', 'shell', 'app'],
    status: 'ready',
  },
  {
    id: 'sidebar',
    href: '/menu-lateral',
    name: 'Menú lateral',
    description: 'Navegación lateral colapsable para consolas.',
    preview: 'sidebar',
    category: 'layout',
    tags: ['menú', 'nav', 'dashboard', 'aside', 'sidebar'],
    status: 'ready',
  },
  {
    id: 'topbar',
    href: '/barra-superior',
    name: 'Barra superior',
    description: 'Barra con búsqueda, usuario y acciones.',
    preview: 'topbar',
    category: 'layout',
    tags: ['header', 'navbar', 'dashboard', 'topbar'],
    status: 'ready',
  },
  {
    id: 'page-header',
    href: '/encabezado-pagina',
    name: 'Encabezado de página',
    description: 'Título, migas de pan y acciones de la vista.',
    preview: 'page-header',
    category: 'layout',
    tags: ['header', 'título', 'dashboard', 'page-header'],
    status: 'ready',
  },
  {
    id: 'breadcrumb',
    href: '/migas-de-pan',
    name: 'Migas de pan',
    description: 'Ruta jerárquica entre secciones del sistema.',
    preview: 'breadcrumb',
    category: 'navegacion',
    tags: ['ruta', 'navegacion', 'breadcrumb', 'migas'],
    status: 'ready',
  },
  {
    id: 'container',
    href: '/contenedor',
    name: 'Contenedor',
    description: 'Anchos y márgenes consistentes de página.',
    preview: 'container',
    category: 'layout',
    tags: ['grid', 'layout', 'ancho', 'container'],
    status: 'ready',
  },
  {
    id: 'grid',
    href: '/cuadricula',
    name: 'Cuadrícula',
    description: 'Composición de filas, columnas y espacios.',
    preview: 'grid',
    category: 'layout',
    tags: ['layout', 'columnas', 'dashboard', 'grid'],
    status: 'ready',
  },
  {
    id: 'divider',
    href: '/separador',
    name: 'Separador',
    description: 'Líneas divisorias horizontales y verticales.',
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
    id: 'tabla',
    href: '/tabla',
    name: 'Tabla',
    description: 'Listados densos con orden, selección y vacíos.',
    preview: 'tabla',
    category: 'datos',
    tags: ['table', 'datos', 'grid', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'list',
    href: '/lista',
    name: 'Lista',
    description: 'Listas simples con avatar, meta y acción.',
    preview: 'list',
    category: 'datos',
    tags: ['lista', 'feed', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'empty-state',
    href: '/estado-vacio',
    name: 'Estado vacío',
    description: 'Vacios útiles con CTA cuando no hay datos.',
    preview: 'empty-state',
    category: 'datos',
    tags: ['vacío', 'placeholder', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'skeleton',
    href: '/esqueleto-carga',
    name: 'Esqueleto de carga',
    description: 'Placeholders de carga para tarjetas y tablas.',
    preview: 'skeleton',
    category: 'feedback',
    tags: ['loading', 'carga', 'skeleton'],
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
    description: 'Indicador de espera en línea o de página.',
    preview: 'spinner',
    category: 'feedback',
    tags: ['loading', 'espera', 'spinner'],
    status: 'ready',
  },
  {
    id: 'input',
    href: '/campo-texto',
    name: 'Campo de texto',
    description: 'Entrada de texto con ayuda y validación.',
    preview: 'input',
    category: 'formularios',
    tags: ['form', 'textfield', 'input'],
    status: 'ready',
  },
  {
    id: 'textarea',
    href: '/area-texto',
    name: 'Área de texto',
    description: 'Texto multilínea para notas y observaciones.',
    preview: 'textarea',
    category: 'formularios',
    tags: ['form', 'texto', 'textarea'],
    status: 'ready',
  },
  {
    id: 'select',
    href: '/selector',
    name: 'Selector',
    description: 'Lista desplegable simple.',
    preview: 'select',
    category: 'formularios',
    tags: ['form', 'dropdown', 'lista', 'select'],
    status: 'ready',
  },
  {
    id: 'checkbox',
    href: '/casilla',
    name: 'Casilla',
    description: 'Selección múltiple en formularios.',
    preview: 'checkbox',
    category: 'formularios',
    tags: ['form', 'check', 'checkbox'],
    status: 'ready',
  },
  {
    id: 'radio',
    href: '/opcion-unica',
    name: 'Opción única',
    description: 'Selección única en grupos de opciones.',
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
    id: 'search-field',
    href: '/campo-busqueda',
    name: 'Campo de búsqueda',
    description: 'Búsqueda con icono, limpiar y atajos.',
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
    tags: ['form', 'label', 'validación'],
    status: 'ready',
  },
  {
    id: 'form',
    href: '/diseno-formulario',
    name: 'Diseno de formulario',
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
    description: 'Navegación por pestañas en paneles y bandejas.',
    preview: 'tabs',
    category: 'navegacion',
    tags: ['tabs', 'panel', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'steps',
    href: '/pasos',
    name: 'Pasos',
    description: 'Flujos por pasos (altas, trámites, asistentes).',
    preview: 'steps',
    category: 'navegacion',
    tags: ['pasos', 'wizard', 'flujo', 'stepper'],
    status: 'ready',
  },
  {
    id: 'nav-menu',
    href: '/menu-navegacion',
    name: 'Menú de navegación',
    description: 'Menú horizontal o vertical de enlaces.',
    preview: 'nav-menu',
    category: 'navegacion',
    tags: ['menú', 'links'],
    status: 'ready',
  },
  {
    id: 'pagination-bar',
    href: '/barra-paginacion',
    name: 'Barra de paginación',
    description: 'Resumen + controles de página juntos.',
    preview: 'pagination-bar',
    category: 'navegacion',
    tags: ['paginación', 'tabla'],
    status: 'ready',
  },
  {
    id: 'link',
    href: '/enlace',
    name: 'Enlace',
    description: 'Enlaces tipograficos e en línea.',
    preview: 'link',
    category: 'navegacion',
    tags: ['anchor', 'texto', 'link'],
    status: 'ready',
  },
  {
    id: 'icon-button',
    href: '/boton-icono',
    name: 'Botón de icono',
    description: 'Acción compacta solo con icono.',
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
    name: 'Menú desplegable',
    description: 'Menú contextual de acciones.',
    preview: 'dropdown-menu',
    category: 'acciones',
    tags: ['menú', 'acciones', 'dashboard'],
    status: 'ready',
  },
  {
    id: 'alert',
    href: '/alerta',
    name: 'Alerta',
    description: 'Avisos persistentes dentro de la página.',
    preview: 'alert',
    category: 'feedback',
    tags: ['alerta', 'banner', 'semáforo'],
    status: 'ready',
  },
  {
    id: 'toast',
    href: '/aviso-temporal',
    name: 'Aviso temporal',
    description: 'Mensajes breves de éxito, error e información.',
    preview: 'toast',
    category: 'feedback',
    tags: ['snackbar', 'notificación', 'toast'],
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
    name: 'Descripción emergente',
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
    description: 'Ventana de confirmación o formulario corto.',
    preview: 'modal',
    category: 'overlays',
    tags: ['dialog', 'overlay'],
    status: 'ready',
  },
  {
    id: 'confirm-dialog',
    href: '/confirmacion',
    name: 'Confirmacion',
    description: 'Diálogo para acciones destructivas o críticas.',
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
    id: 'accordion',
    href: '/acordeon',
    name: 'Acordeon',
    description: 'Secciones expandibles de contenido.',
    preview: 'accordion',
    category: 'contenido',
    tags: ['faq', 'collapse'],
    status: 'ready',
  },
];
