import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import { cache } from 'react'

export const getLanding = cache(async (locale: TypedLocale) => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'landing', locale, depth: 1 })
})

export const getLegal = cache(async (locale: TypedLocale) => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'legal', locale, depth: 0 })
})
