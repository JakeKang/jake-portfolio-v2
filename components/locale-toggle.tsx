'use client';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/components/i18n-provider';

interface LocaleToggleProps {
  className?: string;
}

export function LocaleToggle({ className }: LocaleToggleProps) {
  const { locale, toggleLocale, content } = useI18n();

  const ariaLabel =
    locale === 'ko'
      ? content.localeToggle.toEnglishAria
      : content.localeToggle.toKoreanAria;

  return (
    <Button
      type='button'
      variant='ghost'
      size='icon'
      onClick={toggleLocale}
      aria-label={ariaLabel}
      className={className}>
      <span className='text-[11px] font-semibold tracking-wide'>
        {locale === 'ko' ? content.localeToggle.shortKo : content.localeToggle.shortEn}
      </span>
    </Button>
  );
}
