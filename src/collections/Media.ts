import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Imagine', plural: 'Media' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    description: 'Imaginile se încarcă prin server: maximum 4 MB per fișier. Comprimați fotografiile mari înainte.',
  },
  fields: [
    {
      name: 'alt',
      label: 'Text alternativ',
      type: 'text',
      localized: true,
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumb', width: 400 },
      { name: 'card', width: 900 },
      { name: 'hero', width: 2000 },
    ],
    adminThumbnail: 'thumb',
  },
}
