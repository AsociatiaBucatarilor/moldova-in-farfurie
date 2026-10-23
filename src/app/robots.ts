import type { MetadataRoute } from 'next'

import { getServerUrl } from '@/utilities/serverUrl'

export default function robots(): MetadataRoute.Robots {
  // Only the production site may be indexed; preview deployments stay out of search results
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  const base = getServerUrl()
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
