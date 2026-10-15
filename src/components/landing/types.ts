export type Region = 'nord' | 'centru' | 'sud'

export type ImageView = { url: string; alt: string; width?: number; height?: number }

export type PhotoView = { name: string; image: ImageView | null }

export type RaionView = {
  id: number
  mapId: string
  region: Region
  name: string
  intro: string
  heritage: string
  food: string
  moreUrl: string
  episodeId: string | null
  teaserId: string | null
  cover: ImageView | null
  sights: PhotoView[]
  dishes: PhotoView[]
}

export const REGION_ORDER: Region[] = ['nord', 'centru', 'sud']

export const REGION_COLORS: Record<Region, { fill: string; band: string }> = {
  nord: { fill: '#5f7650', band: '#3d5236' },
  centru: { fill: '#d3a843', band: '#7a5d36' },
  sud: { fill: '#b5604a', band: '#934e3d' },
}
