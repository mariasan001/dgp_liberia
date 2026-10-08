export const FILE_UPLOAD_VARIANTS = [
  'basic',
  'labeled',
  'helper',
  'dense',
  'soft',
  'button',
  'compact',
  'multiple',
  'complete',
] as const;

export type FileUploadVariant = (typeof FILE_UPLOAD_VARIANTS)[number];

export const FILE_UPLOAD_STATUSES = [
  'default',
  'error',
  'success',
  'warning',
  'info',
] as const;

export type FileUploadStatus = (typeof FILE_UPLOAD_STATUSES)[number];

export const FILE_UPLOAD_SIZES = ['sm', 'md', 'lg'] as const;
export type FileUploadSize = (typeof FILE_UPLOAD_SIZES)[number];

export const FILE_UPLOAD_OBSERVED_ATTRIBUTES = [
  'variant',
  'label',
  'helper',
  'hint',
  'accept',
  'status',
  'size',
  'max-size',
  'max-files',
  'name',
  'multiple',
  'disabled',
  'required',
] as const;

export type FileUploadItem = {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  error?: string;
};

export function resolveFileUploadVariant(value: string | null): FileUploadVariant {
  if ((FILE_UPLOAD_VARIANTS as readonly string[]).includes(value ?? '')) {
    return value as FileUploadVariant;
  }
  return 'basic';
}

export function resolveFileUploadStatus(value: string | null): FileUploadStatus {
  if ((FILE_UPLOAD_STATUSES as readonly string[]).includes(value ?? '')) {
    return value as FileUploadStatus;
  }
  return 'default';
}

export function resolveFileUploadSize(value: string | null): FileUploadSize {
  if (value === 'sm' || value === 'lg' || value === 'md') return value;
  return 'md';
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function parseMaxSize(value: string | null): number | null {
  if (!value?.trim()) return null;
  const m = /^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)?$/i.exec(value.trim());
  if (!m) return null;
  const n = Number(m[1]);
  const unit = (m[2] || 'b').toLowerCase();
  if (unit === 'kb') return n * 1024;
  if (unit === 'mb') return n * 1024 * 1024;
  if (unit === 'gb') return n * 1024 * 1024 * 1024;
  return n;
}

export function fileMatchesAccept(file: File, accept: string): boolean {
  if (!accept.trim()) return true;
  const tokens = accept.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return tokens.some((token) => {
    if (token.startsWith('.')) return name.endsWith(token);
    if (token.endsWith('/*')) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}
