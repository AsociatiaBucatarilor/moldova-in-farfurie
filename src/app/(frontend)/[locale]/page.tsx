import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPayload, type TypedLocale } from 'payload'
import React, { cache } from 'react'

import { Explorer } from '@/components/landing/Explorer'
import { Hero } from '@/components/landing/Hero'
import { ModalProvider } from '@/components/landing/ModalProvider'
import { Partners } from '@/components/landing/Partners'
import { Quote } from '@/components/landing/Quote'
import { SiteFooter } from '@/components/landing/SiteFooter'
import { toRaionView } from '@/components/landing/toView'
import { getLanding } from '@/utilities/getContent'
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
  const description = landing.hero?.description || undefined
  const image = landing.hero?.background

  return {
    title: 'Moldova în Farfurie · by Chef’s Forum',
    description,
    openGraph: {
      title: 'Moldova în Farfurie',
      description,
      images: typeof image === 'object' && image?.url ? [image.url] : undefined,
    },
  }
}
