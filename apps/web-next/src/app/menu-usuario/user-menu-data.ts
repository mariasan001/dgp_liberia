import type { UserMenuVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type UserMenuExample = {
  id: string;
  title: string;
  description: string;
  variant: UserMenuVariant;
  name?: string;
  role?: string;
  email?: string;
  initials?: string;
  open?: boolean;
};

export const USER_MENU_EXAMPLES: UserMenuExample[] = [
  { id: 'basic', title: 'Basico', description: 'Trigger con nombre y rol.', variant: 'basic', name: 'Ana Morales', role: 'Operadora', email: 'ana.morales@gob.mx', open: true },
  { id: 'soft', title: 'Suave', description: 'Trigger con fill.', variant: 'soft', name: 'Luis Reyes', role: 'Revisor', open: true },
  { id: 'compact', title: 'Compacto', description: 'Solo avatar.', variant: 'compact', name: 'Maria Solis', role: 'Admin', open: true },
  { id: 'elevated', title: 'Elevado', description: 'Panel con sombra fuerte.', variant: 'elevated', name: 'Jorge Pena', role: 'Firmante', open: true },
  { id: 'dense', title: 'Denso', description: 'Trigger minimo.', variant: 'dense', name: 'Carla Nunez', initials: 'CN', open: true },
  { id: 'outline', title: 'Contorno', description: 'Borde con acento vino.', variant: 'outline', name: 'Diego Ruiz', role: 'Capturista', open: true },
  { id: 'brand', title: 'Marca', description: 'Avatar vino institucional.', variant: 'brand', name: 'GobMX', role: 'Cuenta oficial', initials: 'GX', open: true },
  { id: 'status', title: 'Estado', description: 'Indicador en linea.', variant: 'status', name: 'Elena Soto', role: 'En linea', open: true },
  { id: 'wide', title: 'Ancho', description: 'Panel mas amplio.', variant: 'wide', name: 'Ana Morales', role: 'Operadora', open: true },
  { id: 'complete', title: 'Completo', description: 'Riel dorado en el panel.', variant: 'complete', name: 'Oficial', role: 'Sistema', initials: 'OF', open: true },
];

export const USER_MENU_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | compact | elevated | dense | outline | brand | status | wide | complete' },
  { name: 'name', type: 'string', defaultValue: 'Ana Morales', body: 'Nombre visible.' },
  { name: 'role', type: 'string', defaultValue: 'Operadora', body: 'Rol o cargo.' },
  { name: 'email', type: 'string', defaultValue: 'ana…@gob.mx', body: 'Correo en el panel.' },
  { name: 'initials', type: 'string', defaultValue: '—', body: 'Fuerza las iniciales.' },
  { name: 'open', type: 'boolean', defaultValue: 'false', body: 'Muestra el menu.' },
] as const;

export function buildSnippet(lang: CodeLang, example: UserMenuExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.name ? `name="${example.name}"` : null,
    example.role ? `role="${example.role}"` : null,
    example.email ? `email="${example.email}"` : null,
    example.initials ? `initials="${example.initials}"` : null,
    example.open ? 'open' : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-user-menu ${attrs}></gob-user-menu>\n`;
}
