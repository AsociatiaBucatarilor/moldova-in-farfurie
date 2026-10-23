import type { Metadata } from 'next'

import localization from '@/i18n/localization'

export type SiteLocale = 'ro' | 'ru' | 'en'

export const LOCALES = localization.locales.map((l) => l.code) as SiteLocale[]
export const DEFAULT_LOCALE = localization.defaultLocale as SiteLocale

export const OG_LOCALES: Record<SiteLocale, string> = { ro: 'ro_RO', ru: 'ru_RU', en: 'en_US' }

/** Public path of a page in a locale; Romanian has no prefix (`localePrefix: 'as-needed'`). */
export const localizedPath = (locale: string, path = '/'): string => {
  if (locale === DEFAULT_LOCALE) return path
  return `/${locale}${path === '/' ? '' : path}`
}

/** Canonical URL plus hreflang links to every translation (resolved against `metadataBase`). */
export const alternatesFor = (locale: string, path = '/'): Metadata['alternates'] => ({
  canonical: localizedPath(locale, path),
  languages: {
    ...Object.fromEntries(LOCALES.map((code) => [code, localizedPath(code, path)])),
    'x-default': localizedPath(DEFAULT_LOCALE, path),
  },
})

/** Open Graph locale fields for the current language and its translations. */
export const ogLocales = (locale: string) => ({
  locale: OG_LOCALES[locale as SiteLocale] ?? OG_LOCALES[DEFAULT_LOCALE],
  alternateLocale: LOCALES.filter((code) => code !== locale).map((code) => OG_LOCALES[code]),
})
