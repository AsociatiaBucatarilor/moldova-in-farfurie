import configPromise from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import { LOCALES, localizedPath } from '@/utilities/seo'
import { getServerUrl } from '@/utilities/serverUrl'

// Rebuilt at most once an hour; content edits are rare
export const revalidate = 3600

const PAGES = [
  { path: '/', global: 'landing', priority: 1 },
  { path: '/politica-de-confidentialitate', global: 'legal', priority: 0.3 },
  { path: '/politica-cookie', global: 'legal', priority: 0.3 },
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getServerUrl()
  const payload = await getPayload({ config: configPromise })

  const updatedAt = async (slug: 'landing' | 'legal') => {
    try {
      const doc = await payload.findGlobal({ slug, depth: 0 })
      return doc.updatedAt ? new Date(doc.updatedAt) : undefined
    } catch {
      return undefined
    }
  }
  const modified = { landing: await updatedAt('landing'), legal: await updatedAt('legal') }

  // One entry per language, each listing all of its translations (hreflang)
  return PAGES.flatMap(({ path, global, priority }) =>
    LOCALES.map((locale) => ({
      url: `${base}${localizedPath(locale, path)}`,
      lastModified: modified[global],
      changeFrequency: 'weekly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((code) => [code, `${base}${localizedPath(code, path)}`])),
      },
    })),
  )
}
