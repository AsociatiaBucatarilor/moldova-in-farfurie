import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import type { TypedLocale } from 'payload'
import React from 'react'

import { getPolicy, LegalPage } from '@/components/landing/LegalPage'

type Args = { params: Promise<{ locale: TypedLocale }> }

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  return <LegalPage locale={locale} policy="privacy" />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const policy = await getPolicy(locale, 'privacy')

  return { title: `${policy?.title} · Moldova în Farfurie` }
}
