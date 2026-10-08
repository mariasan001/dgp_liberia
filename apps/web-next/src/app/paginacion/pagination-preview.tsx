'use client';

import { useEffect, useRef } from 'react';

import type { PaginationLang, PaginationVariant, Tone } from '@mariasan001/ui-wc';

type Props = {
  variant: PaginationVariant;
  tone: Tone;
  lang: PaginationLang;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function PaginationPreview({ variant, tone, lang, page, total, onPageChange }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const handleChange = (event: Event) => {
      const detail = (event as CustomEvent<{ page: number }>).detail;
      if (detail?.page) {
        onPageChange(detail.page);
      }
    };

    node.addEventListener('gob-page-change', handleChange);
    return () => node.removeEventListener('gob-page-change', handleChange);
  }, [onPageChange]);

  return (
    <gob-pagination
      ref={(node) => {
        ref.current = node;
      }}
      variant={variant}
      tone={tone}
      lang={lang}
      page={String(page)}
      total={String(total)}
    />
  );
}
