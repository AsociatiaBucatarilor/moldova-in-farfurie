import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import React from 'react'

import { ConsentProvider } from '@/components/landing/CookieConsent'
import { routing } from '@/i18n/routing'
import { getServerUrl } from '@/utilities/serverUrl'

// Fonts are self-hosted from @fontsource: next/font/google fetches from Google at build time,
// which made Vercel builds fail intermittently
import '@fontsource/allura/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/marcellus/400.css'
import '@fontsource/source-sans-3/400.css'
import '@fontsource/source-sans-3/600.css'

import './globals.css'

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
    <html lang={locale}>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ConsentProvider>{children}</ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerUrl()),
  // Sub-pages read "Politica de cookie-uri · Moldova în Farfurie"
  title: { default: 'Moldova în Farfurie', template: '%s · Moldova în Farfurie' },
  applicationName: 'Moldova în Farfurie',
  // Preview deployments must not be indexed; production follows robots.txt
  robots: process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' ? { index: false, follow: false } : undefined,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
