'use client';

import type { FileUploadExample } from './file-upload-data';
import local from './file-upload.module.css';

export function FileUploadDemo({ example }: { example: FileUploadExample }) {
  return (
    <div className={local.stageInner}>
      <gob-file-upload
        key={example.id}
        variant={example.variant}
        label={example.label}
        helper={example.helper}
        hint={example.hint}
        accept={example.accept}
        status={example.status}
        size={example.size}
        {...(example.maxSize ? { 'max-size': example.maxSize } : {})}
        {...(example.maxFiles ? { 'max-files': example.maxFiles } : {})}
        {...(example.multiple ? { multiple: true } : {})}
        {...(example.required ? { required: true } : {})}
        {...(example.disabled ? { disabled: true } : {})}
        className={local.fileUpload}
      />
    </div>
  );
}
