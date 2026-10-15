import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { MAP_SHAPES } from '../components/landing/mapShapes'
import {
  revalidateLandingCollection,
  revalidateLandingDelete,
} from '../hooks/revalidateLanding'
import { validateYouTubeUrl } from '../utilities/youtube'

export const REGIONS = [
  { label: 'Nord', value: 'nord' },
  { label: 'Centru', value: 'centru' },
  { label: 'Sud', value: 'sud' },
] as const

const photoRow = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  maxRows: 3,
  labels: { singular: 'Element', plural: 'Elemente' },
  admin: { initCollapsed: true },
  fields: [
    {
      type: 'row' as const,
      fields: [
        { name: 'name', label: 'Denumire', type: 'text' as const, localized: true, required: true },
        { name: 'image', label: 'Imagine', type: 'upload' as const, relationTo: 'media' as const },
      ],
    },
  ],
})

export const Raioane: CollectionConfig = {
  slug: 'raioane',
  labels: { singular: 'Raion', plural: 'Raioane' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'episodeUrl', 'teaserUrl'],
    listSearchableFields: ['name'],
    description:
      'Fiecare raion apare pe hartă și în grila de raioane. Click pe raion deschide pop-up-ul cu episodul și teaserul.',
  },
  defaultSort: 'name',
  hooks: {
    afterChange: [revalidateLandingCollection],
    afterDelete: [revalidateLandingDelete],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Denumire',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'region',
          label: 'Zona',
          type: 'select',
          required: true,
          options: [...REGIONS],
        },
        {
          name: 'mapId',
          label: 'Zona pe hartă',
          type: 'select',
          required: true,
          unique: true,
          index: true,
          options: MAP_SHAPES.map((shape) => ({ label: shape.name, value: shape.id })),
          admin: { description: 'Conturul de pe hartă care deschide acest raion.' },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Video',
          fields: [
            {
              name: 'episodeUrl',
              label: 'Episodul (link YouTube)',
              type: 'text',
              validate: validateYouTubeUrl,
              admin: { description: 'Lăsați gol până la lansare — pop-up-ul va afișa „în curând”.' },
            },
            {
              name: 'teaserUrl',
              label: 'Teaserul (link YouTube)',
              type: 'text',
              validate: validateYouTubeUrl,
            },
            {
              name: 'cover',
              label: 'Imagine copertă',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Folosită în grila de raioane și în panoul de lângă hartă.' },
            },
          ],
        },
        {
          label: 'Descriere',
          fields: [
            {
              name: 'intro',
              label: 'Descriere scurtă',
              type: 'textarea',
              localized: true,
              admin: { description: 'Apare în panoul de lângă hartă.' },
            },
            {
              name: 'heritage',
              label: 'Locuri și patrimoniu',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'food',
              label: 'La masa locului',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'moreUrl',
              label: 'Link „Descoperă mai mult”',
              type: 'text',
              defaultValue: 'https://moldova.travel',
            },
          ],
        },
        {
          label: 'Obiective și gastronomie',
          fields: [
            photoRow('sights', 'Obiective turistice'),
            photoRow('dishes', 'Gastronomie locală'),
          ],
        },
      ],
    },
  ],
}
