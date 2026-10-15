'use client'

import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

import { Link } from '@/i18n/routing'
import localization from '@/i18n/localization'

export const LocaleSwitcher: React.FC = () => {
  const current = useLocale()
  const t = useTranslations('nav')

  return (
    <nav className="locales" aria-label={t('language')}>
      {localization.locales.map(({ code, label }) => (
        <Link
          key={code}
          href="/"
          locale={code}
          lang={code}
          title={label}
          aria-current={code === current ? 'true' : undefined}
          className="locales__link"
        >
          {code.toUpperCase()}
        </Link>
      ))}
    </nav>
  )
}
