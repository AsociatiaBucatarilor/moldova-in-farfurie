import type { Metadata } from 'next'
import { Allura, Cormorant_Garamond, Marcellus, Source_Sans_3 } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import React from 'react'

import { routing } from '@/i18n/routing'
import { getServerUrl } from '@/utilities/serverUrl'

import './globals.css'

const marcellus = Marcellus({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-marcellus',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})
const allura = Allura({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-allura',
})
const sourceSans = Source_Sans_3({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-sans',
})

type Args = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      className={[marcellus.variable, cormorant.variable, allura.variable, sourceSans.variable].join(' ')}
      lang={locale}
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerUrl()),
  title: 'Moldova în Farfurie · by Chef’s Forum',
  description:
    'Un proiect care aduce împreună gastronomia locală, turismul și oamenii care păstrează autenticitatea Moldovei.',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
