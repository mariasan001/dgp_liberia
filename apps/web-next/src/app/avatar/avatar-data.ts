import type { AvatarSize, AvatarTone, AvatarVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type AvatarExample = {
  id: string;
  title: string;
  description: string;
  variant: AvatarVariant;
  size?: AvatarSize;
  tone?: AvatarTone;
  name?: string;
  initials?: string;
  status?: string;
};

export const AVATAR_EXAMPLES: AvatarExample[] = [
  { id: 'basic', title: 'Basico', description: 'Iniciales sobre fondo suave.', variant: 'basic', name: 'Ana Morales', tone: 'primary' },
  { id: 'soft', title: 'Suave', description: 'Sin borde fuerte.', variant: 'soft', name: 'Luis Reyes', tone: 'info' },
  { id: 'solid', title: 'Solido', description: 'Alto contraste.', variant: 'solid', name: 'Maria Solis', tone: 'primary' },
  { id: 'outline', title: 'Contorno', description: 'Fondo blanco con borde.', variant: 'outline', name: 'Jorge Pena', tone: 'neutral' },
  { id: 'square', title: 'Cuadrado', description: 'Radio cerrado.', variant: 'square', name: 'Carla Nunez', tone: 'success' },
  { id: 'status', title: 'Estado', description: 'Indicador en linea.', variant: 'status', name: 'Diego Ruiz', tone: 'primary', status: 'online' },
  { id: 'busy', title: 'Ocupado', description: 'Estado busy.', variant: 'status', name: 'Elena Soto', tone: 'danger', status: 'busy' },
  { id: 'group', title: 'Grupo', description: 'Stack de avatares.', variant: 'group', name: 'Equipo revision' },
  { id: 'dense', title: 'Denso', description: 'Tamano minimo.', variant: 'dense', name: 'AM', initials: 'AM' },
  { id: 'brand', title: 'Marca', description: 'Fondo vino institucional.', variant: 'brand', name: 'GobMX', initials: 'GX' },
  { id: 'complete', title: 'Completo', description: 'Acento dorado.', variant: 'complete', name: 'Oficial', initials: 'OF', tone: 'primary' },
  { id: 'sm', title: 'Pequeño', description: 'Size sm.', variant: 'solid', size: 'sm', name: 'Ana', initials: 'AM' },
  { id: 'lg', title: 'Grande', description: 'Size lg.', variant: 'solid', size: 'lg', name: 'Ana Morales' },
];

export const AVATAR_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | solid | outline | square | status | group | dense | brand | complete' },
  { name: 'size', type: 'string', defaultValue: 'md', body: 'sm | md | lg' },
  { name: 'tone', type: 'string', defaultValue: 'primary', body: 'primary | success | warning | danger | info | neutral' },
  { name: 'name', type: 'string', defaultValue: 'Ana Morales', body: 'Nombre para iniciales / label.' },
  { name: 'initials', type: 'string', defaultValue: '—', body: 'Fuerza las iniciales.' },
  { name: 'status', type: 'string', defaultValue: 'online', body: 'online | busy | away | offline' },
] as const;

export function buildSnippet(lang: CodeLang, example: AvatarExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.size && example.size !== 'md' ? `size="${example.size}"` : null,
    example.tone ? `tone="${example.tone}"` : null,
    example.name ? `name="${example.name}"` : null,
    example.initials ? `initials="${example.initials}"` : null,
    example.status ? `status="${example.status}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-avatar ${attrs}></gob-avatar>\n`;
}
