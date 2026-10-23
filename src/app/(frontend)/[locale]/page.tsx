import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getPayload, type TypedLocale } from 'payload'
import React, { cache } from 'react'

import { Explorer } from '@/components/landing/Explorer'
import { Hero } from '@/components/landing/Hero'
import { ModalProvider } from '@/components/landing/ModalProvider'
import { Partners } from '@/components/landing/Partners'
import { Quote } from '@/components/landing/Quote'
import { SiteFooter } from '@/components/landing/SiteFooter'
import { StructuredData } from '@/components/landing/StructuredData'
import { toImage, toRaionView } from '@/components/landing/toView'
import { getLanding } from '@/utilities/getContent'
import { alternatesFor, localizedPath, ogLocales } from '@/utilities/seo'
import { getYouTubeId } from '@/utilities/youtube'

type Args = {
  params: Promise<{ locale: TypedLocale }>
}

const getContent = cache(async (locale: TypedLocale) => {
  const payload = await getPayload({ config: configPromise })

  const [landing, raioane] = await Promise.all([
    getLanding(locale),
    payload.find({
      collection: 'raioane',
      locale,
      depth: 1,
      limit: 100,
      pagination: false,
      sort: 'name',
    }),
  ])

  return { landing, raioane: raioane.docs.map(toRaionView) }
})

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const { landing, raioane } = await getContent(locale)
  const featured = landing.map?.featured
  const featuredId = typeof featured === 'object' && featured ? featured.id : featured

  return (
    <ModalProvider raioane={raioane} trailerId={getYouTubeId(landing.hero?.trailerUrl)}>
      <StructuredData locale={locale} landing={landing} raioane={raioane} />
      <main className="landing">
        <Hero hero={landing.hero} />
        <Explorer
          raioane={raioane}
          map={landing.map}
          districts={landing.districts}
          featuredId={featuredId ?? null}
        />
        <Quote quote={landing.quote} />
        <Partners partners={landing.partners} />
        <SiteFooter footer={landing.footer} />
      </main>
    </ModalProvider>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const { landing } = await getContent(locale)
  const t = await getTranslations({ locale, namespace: 'seo' })

  const title = landing.seo?.title || t('title')
  const description = landing.seo?.description || landing.hero?.description || undefined
  // Prefer the dedicated share image, then the hero photo; the "hero" size is 2000px wide
  const image = toImage(landing.seo?.image, 'hero') ?? toImage(landing.hero?.background, 'hero')
  const images = image
    ? [{ url: image.url, width: image.width, height: image.height, alt: image.alt || title }]
    : undefined

  return {
    // `absolute` skips the layout's title template on the home page
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, '/'),
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      title,
      description,
      url: localizedPath(locale, '/'),
      images,
      ...ogLocales(locale),
    },
    twitter: { card: 'summary_large_image', title, description, images: images?.map((i) => i.url) },
  }
}
