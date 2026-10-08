import type { HelperTextTone, HelperTextVariant } from '@mariasan001/ui-wc';

export type CodeLang = 'html' | 'react' | 'vue' | 'angular';

export const CODE_LANGUAGES: { id: CodeLang; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'angular', label: 'Angular' },
];

export type HelperTextExample = {
  id: string;
  title: string;
  description: string;
  variant: HelperTextVariant;
  tone?: HelperTextTone;
  label?: string;
  count?: number;
  max?: number;
};

export const HELPER_TEXT_EXAMPLES: HelperTextExample[] = [
  { id: 'basic', title: 'Basico', description: 'Apoyo bajo un campo.', variant: 'basic', label: 'Usa tu CURP a 18 caracteres.' },
  { id: 'hint', title: 'Pista', description: 'Sugerencia con icono.', variant: 'hint', label: 'Puedes pegar el folio desde el correo de acuse.' },
  { id: 'error', title: 'Error', description: 'Mensaje de validacion.', variant: 'error', label: 'El RFC no coincide con el padron.' },
  { id: 'success', title: 'Exito', description: 'Confirmacion positiva.', variant: 'success', label: 'Documento validado correctamente.' },
  { id: 'warning', title: 'Advertencia', description: 'Atencion sin bloquear.', variant: 'warning', label: 'La vigencia vence en menos de 30 dias.' },
  { id: 'info', title: 'Informacion', description: 'Dato contextual.', variant: 'info', label: 'Este campo se comparte con Hacienda.' },
  { id: 'dense', title: 'Denso', description: 'Tipografia compacta.', variant: 'dense', label: 'Maximo 120 caracteres.' },
  { id: 'icon', title: 'Con icono', description: 'Icono thin a la izquierda.', variant: 'icon', tone: 'info', label: 'Revisa el aviso de privacidad antes de enviar.' },
  { id: 'counter', title: 'Contador', description: 'Conteo de caracteres.', variant: 'counter', label: 'Descripcion del tramite', count: 48, max: 120 },
  { id: 'complete', title: 'Completo', description: 'Riel dorado institucional.', variant: 'complete', label: 'Ayuda con acento institucional del sistema.' },
];

export const HELPER_TEXT_ATTRS = [
  { name: 'variant', type: 'string', defaultValue: 'basic', body: 'basic | hint | error | success | warning | info | dense | icon | counter | complete' },
  { name: 'tone', type: 'string', defaultValue: 'neutral', body: 'neutral | info | success | warning | danger' },
  { name: 'label', type: 'string', defaultValue: 'Texto…', body: 'Mensaje visible.' },
  { name: 'count / max', type: 'number', defaultValue: '—', body: 'Contador opcional (counter).' },
] as const;

export function buildSnippet(lang: CodeLang, example: HelperTextExample): string {
  const attrs = [
    `variant="${example.variant}"`,
    example.tone ? `tone="${example.tone}"` : null,
    `label="${example.label ?? 'Ayuda'}"`,
    example.count != null ? `count="${example.count}"` : null,
    example.max != null ? `max="${example.max}"` : null,
  ].filter(Boolean).join(' ');
  const imports = lang === 'html' ? '' : `import '@mariasan001/ui-wc';\n\n`;
  return `${imports}<gob-helper-text ${attrs}></gob-helper-text>\n`;
}
