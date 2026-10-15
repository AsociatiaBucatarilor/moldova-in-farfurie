import { useTranslations } from 'next-intl'
import React from 'react'

import { LocaleSwitcher } from './LocaleSwitcher'
import { TrailerButton } from './TrailerButton'

export const NAV_LINKS = [
  { key: 'about', href: '#despre' },
  { key: 'map', href: '#harta' },
  { key: 'districts', href: '#raioane' },
  { key: 'partners', href: '#parteneri' },
] as const

export const SiteHeader: React.FC = () => {
  const t = useTranslations('nav')

  return (
    <div className="site-header">
      <a href="#top" className="brand brand--light">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo-top.png" alt="" className="brand__logo brand__logo--screen" />
        <span className="brand__text">
          <span className="brand__name">MOLDOVA ÎN FARFURIE</span>
          <span className="brand__by">by Chef&apos;s Forum</span>
        </span>
      </a>
      <div className="site-header__nav">
        <nav className="site-header__links" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a key={link.key} href={link.href}>
              {t(link.key)}
            </a>
          ))}
        </nav>
        <LocaleSwitcher />
        <TrailerButton className="btn btn--dark btn--sm">{t('watch')}</TrailerButton>
      </div>
    </div>
  )
}
