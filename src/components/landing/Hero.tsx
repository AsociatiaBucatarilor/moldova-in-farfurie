import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

import type { Landing } from '@/payload-types'

import { lines } from './lines'
import { SiteHeader } from './SiteHeader'
import { toImage } from './toView'
import { TrailerButton } from './TrailerButton'

export const Hero: React.FC<{ hero: Landing['hero'] }> = ({ hero }) => {
  const t = useTranslations('hero')
  const background = toImage(hero?.background, 'hero')

  return (
    <header id="top" className="hero">
      {background && (
        <Image src={background.url} alt={background.alt} fill priority sizes="100vw" className="hero__bg" />
      )}
      <div className="hero__shade" aria-hidden="true" />
      <SiteHeader />

      <div className="hero__content">
        <h1 className="hero__title">{lines(hero?.title)}</h1>
        {hero?.tagline && <div className="hero__tagline">{lines(hero.tagline)}</div>}
        {hero?.description && <p className="hero__lead">{hero.description}</p>}
        <div className="hero__actions">
          <TrailerButton className="btn btn--outline">{t('trailer')}</TrailerButton>
          <a href="#despre" className="btn btn--light">
            {t('about')}
          </a>
        </div>
        {!!hero?.stats?.length && (
          <dl className="hero__stats">
            {hero.stats.map((stat) => (
              <div key={stat.id} className="hero__stat">
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {hero?.script && (
        <div className="hero__script" aria-hidden="true">
          {hero.script.split('\n').map((line, i) => (
            <span key={i} style={{ paddingLeft: `${i * 0.5}em` }}>
              {line}
            </span>
          ))}
          <span className="hero__script-line" />
        </div>
      )}
    </header>
  )
}
