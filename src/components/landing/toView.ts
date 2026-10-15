import type { Media, Raioane } from '@/payload-types'
import { getYouTubeId } from '@/utilities/youtube'

import type { ImageView, RaionView } from './types'

type Size = 'thumb' | 'card' | 'hero'

export const toImage = (value: number | Media | null | undefined, size?: Size): ImageView | null => {
  if (!value || typeof value !== 'object' || !value.url) return null
  const sized = size ? value.sizes?.[size] : undefined
  return {
    url: sized?.url || value.url,
    alt: value.alt || '',
    width: sized?.width || value.width || undefined,
    height: sized?.height || value.height || undefined,
  }
}

export const toRaionView = (doc: Raioane): RaionView => ({
  id: doc.id,
  mapId: doc.mapId,
  region: doc.region,
  name: doc.name,
  intro: doc.intro || '',
  heritage: doc.heritage || '',
  food: doc.food || '',
  moreUrl: doc.moreUrl || '',
  episodeId: getYouTubeId(doc.episodeUrl),
  teaserId: getYouTubeId(doc.teaserUrl),
  cover: toImage(doc.cover, 'card'),
  sights: (doc.sights || []).map((s) => ({ name: s.name, image: toImage(s.image, 'thumb') })),
  dishes: (doc.dishes || []).map((s) => ({ name: s.name, image: toImage(s.image, 'thumb') })),
})
