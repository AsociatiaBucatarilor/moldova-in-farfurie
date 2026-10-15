import { useTranslations } from 'next-intl'
import React from 'react'

import { Link } from '@/i18n/routing'

import { LocaleSwitcher } from './LocaleSwitcher'
import { TrailerButton } from './TrailerButton'

// Sections of the home page; linked as `/#id` so they also work from the policy pages.
export const NAV_LINKS = [
  { key: 'about', section: 'despre' },
  { key: 'map', section: 'harta' },
  { key: 'districts', section: 'raioane' },
  { key: 'partners', section: 'parteneri' },
  { key: 'contacts', section: 'contacte' },
] as const

type Props = {
  /** `overlay` sits on top of the hero photo; `solid` is used on pages without one. */
  variant?: 'overlay' | 'solid'
}

export const SiteHeader: React.FC<Props> = ({ variant = 'overlay' }) => {
  const t = useTranslations('nav')
  const solid = variant === 'solid'

  return (
    <div className={`site-header${solid ? ' site-header--solid' : ''}`}>
      <Link href="/" className={`brand${solid ? '' : ' brand--light'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={solid ? '/assets/logo-footer.png' : '/assets/logo-top.png'}
          alt=""
          className={`brand__logo ${solid ? 'brand__logo--multiply' : 'brand__logo--screen'}`}
        />
        <span className="brand__text">
          <span className="brand__name">MOLDOVA ÎN FARFURIE</span>
          <span className="brand__by">by Chef&apos;s Forum</span>
        </span>
      </Link>
      <div className="site-header__nav">
        <nav className="site-header__links" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link key={link.key} href={`/#${link.section}`}>
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <LocaleSwitcher />
        <TrailerButton className={`btn btn--sm ${solid ? 'btn--outline-dark' : 'btn--dark'}`}>
          {t('watch')}
        </TrailerButton>
      </div>
    </div>
  )
}
