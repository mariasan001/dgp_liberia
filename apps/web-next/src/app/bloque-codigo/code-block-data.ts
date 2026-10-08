import type { CodeBlockVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type CodeBlockExample = {
  id: string;
  title: string;
  description: string;
  variant: CodeBlockVariant;
  language?: string;
  filename?: string;
  code?: string;
};

const SAMPLE = `import '@mariasan001/ui-wc';\n\n<gob-button label="Continuar"></gob-button>`;

export const CODE_BLOCK_EXAMPLES: CodeBlockExample[] = [
  { id: 'basic', title: 'Basico', description: 'Snippet con copiar.', variant: 'basic', filename: 'boton.html', language: 'HTML', code: SAMPLE },
  { id: 'soft', title: 'Suave', description: 'Cabecera fill.', variant: 'soft', filename: 'app.ts', language: 'TypeScript', code: SAMPLE },
  { id: 'dense', title: 'Denso', description: 'Compacto para docs densas.', variant: 'dense', filename: 'main.js', language: 'JavaScript', code: SAMPLE },
  { id: 'outline', title: 'Contorno', description: 'Acento vino lateral.', variant: 'outline', filename: 'snippet.tsx', language: 'TSX', code: SAMPLE },
  { id: 'terminal', title: 'Terminal', description: 'Estilo consola oscura.', variant: 'terminal', filename: 'bash', language: 'Shell', code: 'pnpm install @mariasan001/ui-wc\npnpm exec tsup' },
  { id: 'numbered', title: 'Numerado', description: 'Lineas numeradas.', variant: 'numbered', filename: 'index.ts', language: 'TypeScript', code: SAMPLE },
  { id: 'compact', title: 'Compacto', description: 'Radio menor.', variant: 'compact', filename: 'copy.html', language: 'HTML', code: SAMPLE },
  { id: 'wide', title: 'Amplio', description: 'Mas padding tipografico.', variant: 'wide', filename: 'landing.vue', language: 'Vue', code: SAMPLE },
  { id: 'brand', title: 'Marca', description: 'Cabecera vino.', variant: 'brand', filename: 'gob.ts', language: 'TypeScript', code: SAMPLE },
  { id: 'complete', title: 'Completo', description: 'Acento dorado.', variant: 'complete', filename: 'oficial.ts', language: 'TypeScript', code: SAMPLE },
];

export const CODE_BLOCK_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | soft | dense | outline | terminal | numbered | compact | wide | brand | complete' },
  { name: 'filename', type: 'string', defaultValue: 'snippet.ts', body: 'Nombre de archivo.' },
  { name: 'language', type: 'string', defaultValue: 'TypeScript', body: 'Etiqueta de lenguaje.' },
  { name: 'code', type: 'string', defaultValue: '—', body: 'Contenido del bloque.' },
] as const;

export function buildSnippet(lang: CodeLang, example: CodeBlockExample): string {
  const code = (example.code ?? SAMPLE).replace(/"/g, '&quot;');
  const attrs = [
    `variant="${example.variant}"`,
    example.filename ? `filename="${example.filename}"` : null,
    example.language ? `language="${example.language}"` : null,
    `code="${code}"`,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-code-block ${attrs}></gob-code-block>\n`;
}
