import path from 'path'
import type { Payload, PayloadRequest } from 'payload'

import type { Media } from '@/payload-types'

import { LANDING, RAIOANE, raionFood, raionIntro, type Locale, type Localized } from './data'

const IMAGES_DIR = path.resolve(process.cwd(), 'src/endpoints/seed/images')
const TRANSLATIONS: Locale[] = ['ru', 'en']

type Args = { payload: Payload; req?: PayloadRequest }

export const seed = async ({ payload, req }: Args): Promise<void> => {
  const context = { disableRevalidate: true }
  // depth 0 keeps relations as ids, so returned rows can be sent back as-is
  const base = { req, context, depth: 0 }

  payload.logger.info('Seeding: clearing raioane and media…')
  const current = await payload.findGlobal({ ...base, slug: 'landing' })
  if (current.hero?.title) {
    // Partner logos are required uploads, so drop them before their media can be deleted
    await payload.updateGlobal({
      ...base,
      slug: 'landing',
      data: { hero: { background: null }, map: { featured: null }, partners: { items: [] } },
    })
  }
  await payload.delete({ ...base, collection: 'raioane', where: { id: { exists: true } } })
  await payload.delete({ ...base, collection: 'media', where: { id: { exists: true } } })

  // Upload every image once and reuse it everywhere it appears
  const media = new Map<string, Media>()
  const upload = async (file: string, alt: string): Promise<number> => {
    const existing = media.get(file)
    if (existing) return existing.id
    const doc = await payload.create({
      ...base,
      collection: 'media',
      data: { alt },
      filePath: path.join(IMAGES_DIR, file),
    })
    media.set(file, doc)
    return doc.id
  }

  payload.logger.info(`Seeding: ${RAIOANE.length} raioane…`)
  const raionIds = new Map<string, number>()
  for (const raion of RAIOANE) {
    const intro = raionIntro(raion.name)
    const food = raionFood(raion.name)
    const sights = raion.sights ?? []
    const dishes = raion.dishes ?? []

    const doc = await payload.create({
      ...base,
      collection: 'raioane',
      locale: 'ro',
      data: {
        name: raion.name.ro,
        region: raion.region,
        mapId: raion.mapId,
        cover: await upload(raion.cover, raion.name.ro),
        intro: intro.ro,
        heritage: raion.heritage?.ro,
        food: food.ro,
        moreUrl: 'https://moldova.travel',
        sights: await Promise.all(
          sights.map(async (s) => ({ name: s.name.ro, image: await upload(s.image, s.name.ro) })),
        ),
        dishes: await Promise.all(
          dishes.map(async (s) => ({ name: s.name.ro, image: await upload(s.image, s.name.ro) })),
        ),
      },
    })
    raionIds.set(raion.mapId, doc.id)

    for (const locale of TRANSLATIONS) {
      await payload.update({
        ...base,
        collection: 'raioane',
        id: doc.id,
        locale,
        data: {
          name: raion.name[locale],
          intro: intro[locale],
          heritage: raion.heritage?.[locale],
          food: food[locale],
          // Array rows keep their ids so only the localized names change
          sights: doc.sights?.map((row, i) => ({ ...row, name: sights[i].name[locale] })),
          dishes: doc.dishes?.map((row, i) => ({ ...row, name: dishes[i].name[locale] })),
        },
      })
    }
  }

  payload.logger.info('Seeding: landing page…')
  const pick = (value: Localized, locale: Locale) => value[locale]
  const localized = (locale: Locale) => ({
    hero: {
      title: pick(LANDING.hero.title, locale),
      tagline: pick(LANDING.hero.tagline, locale),
      description: pick(LANDING.hero.description, locale),
      script: pick(LANDING.hero.script, locale),
    },
    map: {
      eyebrow: pick(LANDING.map.eyebrow, locale),
      title: pick(LANDING.map.title, locale),
      description: pick(LANDING.map.description, locale),
      script: pick(LANDING.map.script, locale),
    },
    districts: {
      eyebrow: pick(LANDING.districts.eyebrow, locale),
      title: pick(LANDING.districts.title, locale),
      description: pick(LANDING.districts.description, locale),
    },
    quote: {
      text: pick(LANDING.quote.text, locale),
      author: pick(LANDING.quote.author, locale),
    },
    footer: {
      copyright: pick(LANDING.footer.copyright, locale),
      madeWith: pick(LANDING.footer.madeWith, locale),
    },
  })

  const ro = localized('ro')
  const landing = await payload.updateGlobal({
    ...base,
    slug: 'landing',
    locale: 'ro',
    data: {
      ...ro,
      hero: {
        ...ro.hero,
        background: await upload(LANDING.heroImage, 'Masă rustică cu bucate moldovenești'),
        trailerUrl: '',
        stats: LANDING.hero.stats.map((s) => ({ value: s.value, label: s.label.ro })),
      },
      map: { ...ro.map, featured: raionIds.get('orhei') },
      partners: {
        items: await Promise.all(
          LANDING.partners.map(async (p) => ({
            name: p.name,
            label: p.label.ro,
            logo: await upload(p.logo, p.name),
          })),
        ),
      },
      footer: { ...ro.footer, hashtag: '#MoldovaInFarfurie' },
    },
  })

  for (const locale of TRANSLATIONS) {
    const t = localized(locale)
    await payload.updateGlobal({
      ...base,
      slug: 'landing',
      locale,
      data: {
        ...t,
        hero: {
          ...t.hero,
          stats: landing.hero.stats?.map((row, i) => ({
            ...row,
            label: LANDING.hero.stats[i].label[locale],
          })),
        },
        partners: {
          items: landing.partners?.items?.map((row, i) => ({
            ...row,
            label: LANDING.partners[i].label[locale],
          })),
        },
      },
    })
  }

  payload.logger.info('Seeding: done.')
}
