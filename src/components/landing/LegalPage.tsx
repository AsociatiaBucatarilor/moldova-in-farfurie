import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { TypedLocale } from 'payload'
import React from 'react'

import { Link } from '@/i18n/routing'
import { getLanding, getLegal } from '@/utilities/getContent'
import { alternatesFor, localizedPath, ogLocales } from '@/utilities/seo'
import { getYouTubeId } from '@/utilities/youtube'

import { ModalProvider } from './ModalProvider'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export type PolicyKey = 'privacy' | 'cookies'

export const getPolicy = async (locale: TypedLocale, key: PolicyKey) => (await getLegal(locale))[key]

const POLICY_PATHS: Record<PolicyKey, string> = {
  privacy: '/politica-de-confidentialitate',
  cookies: '/politica-cookie',
}

export const legalMetadata = async (locale: TypedLocale, policy: PolicyKey): Promise<Metadata> => {
  const [content, t, tLegal] = await Promise.all([
    getPolicy(locale, policy),
    getTranslations({ locale, namespace: 'seo' }),
    getTranslations({ locale, namespace: 'legal' }),
  ])
  const title = content?.title || tLegal(policy)
  const description = t(policy === 'privacy' ? 'privacyDescription' : 'cookiesDescription')

  return {
    title,
    description,
    alternates: alternatesFor(locale, POLICY_PATHS[policy]),
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      title,
      description,
      url: localizedPath(locale, POLICY_PATHS[policy]),
      ...ogLocales(locale),
    },
  }
}

export const LegalPage = async ({ locale, policy }: { locale: TypedLocale; policy: PolicyKey }) => {
  const [landing, content] = await Promise.all([getLanding(locale), getPolicy(locale, policy)])
  const t = await getTranslations({ locale, namespace: 'legal' })

  const updatedOn = content?.updatedOn
    ? new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(content.updatedOn))
    : null

  return (
    <ModalProvider raioane={[]} trailerId={getYouTubeId(landing.hero?.trailerUrl)}>
      <SiteHeader variant="solid" />
      <main className="legal">
        <Link href="/" className="legal__back">
          <span aria-hidden="true">←</span> {t('back')}
        </Link>
        <h1 className="legal__title">{content?.title || t(policy)}</h1>
        {updatedOn && <p className="legal__updated">{t('updated', { date: updatedOn })}</p>}
        {content?.content && (
          <div className="legal__body">
            <RichText data={content.content} />
          </div>
        )}
      </main>
      <SiteFooter footer={landing.footer} />
    </ModalProvider>
  )
}
