import { useTranslations } from 'next-intl'
import React from 'react'

import { Link } from '@/i18n/routing'

export default function NotFound() {
  const t = useTranslations()

  return (
    <main className="not-found">
      <h1>404</h1>
      <p>{t('page-not-found')}</p>
      <Link href="/" className="btn btn--dark">
        {t('go-home')}
      </Link>
    </main>
  )
}
