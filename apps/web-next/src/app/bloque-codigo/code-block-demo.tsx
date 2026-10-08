'use client';

import type { CodeBlockExample } from './code-block-data';
import local from './code-block.module.css';

export function CodeBlockDemo({ example }: { example: CodeBlockExample }) {
  return (
    <div className={local.stageInner}>
      <gob-code-block
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        filename={example.filename}
        language={example.language}
        code={example.code}
      />
    </div>
  );
}
