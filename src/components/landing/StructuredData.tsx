import { getTranslations } from 'next-intl/server'
import React from 'react'

import type { Landing } from '@/payload-types'
import { localizedPath } from '@/utilities/seo'
import { getServerUrl } from '@/utilities/serverUrl'

import type { RaionView } from './types'

type Props = { locale: string; landing: Landing; raioane: RaionView[] }

const absolute = (base: string, url: string) => (url.startsWith('http') ? url : `${base}${url}`)

/**
 * JSON-LD for search engines: the organisation, the website and the districts with their
 * descriptions — text that on the page only appears inside the district pop-up.
 */
export const StructuredData = async ({ locale, landing, raioane }: Props) => {
  const t = await getTranslations({ locale, namespace: 'map' })
  const tSeo = await getTranslations({ locale, namespace: 'seo' })
  const base = getServerUrl()
  const pageUrl = `${base}${localizedPath(locale, '/')}`
  const footer = landing.footer

  const sameAs = [footer?.instagram, footer?.facebook, footer?.youtube, footer?.tiktok].filter(Boolean)

  const graph = [
    {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: 'Moldova în Farfurie',
      alternateName: 'Moldova în Farfurie by Chef’s Forum',
      url: base,
      logo: `${base}/assets/logo-footer.png`,
      ...(sameAs.length ? { sameAs } : {}),
      ...(footer?.email || footer?.phone
        ? {
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              ...(footer?.email ? { email: footer.email } : {}),
              ...(footer?.phone ? { telephone: footer.phone } : {}),
            },
          }
        : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      name: tSeo('siteName'),
      url: pageUrl,
      inLanguage: locale,
      publisher: { '@id': `${base}/#organization` },
    },
    {
      '@type': 'ItemList',
      name: landing.districts?.title || 'Raioane',
      numberOfItems: raioane.length,
      itemListElement: raioane.map((raion, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristDestination',
          name: t('raion', { name: raion.name }),
          description: [raion.intro, raion.heritage, raion.food].filter(Boolean).join(' '),
          ...(raion.cover ? { image: absolute(base, raion.cover.url) } : {}),
          url: `${pageUrl}#raioane`,
          containedInPlace: { '@type': 'Country', name: 'Moldova' },
        },
      })),
    },
  ]

  // `<` is escaped so content can never close the script tag
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\u003c')

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
