import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import type { TypedLocale } from 'payload'
import React from 'react'

import { LegalPage, legalMetadata } from '@/components/landing/LegalPage'

type Args = { params: Promise<{ locale: TypedLocale }> }

export default async function Page({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  return <LegalPage locale={locale} policy="privacy" />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  return legalMetadata(locale, 'privacy')
}
