// Run with `pnpm seed:legal` — fills in the privacy/cookie policies and the partners title
// without touching any other content, so it is safe to run against production.
import config from '@payload-config'
import { getPayload } from 'payload'

import { LANDING } from './data'
import { seedLegal } from './seedLegal'

const payload = await getPayload({ config })

await seedLegal({ payload })

for (const locale of ['ro', 'ru', 'en'] as const) {
  // No fallback: an empty translation must not look filled in with the Romanian text
  const landing = await payload.findGlobal({ slug: 'landing', locale, depth: 0, fallbackLocale: false })
  if (landing.partners?.title) continue
  await payload.updateGlobal({
    slug: 'landing',
    locale,
    depth: 0,
    context: { disableRevalidate: true },
    // Spread the existing group so the partner list (and its row ids) is kept as is
    data: { partners: { ...landing.partners, title: LANDING.partnersTitle[locale] } },
  })
}

payload.logger.info('Legal pages and partners title seeded.')
process.exit(0)
