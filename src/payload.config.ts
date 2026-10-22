import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Raioane } from './collections/Raioane'
import Users from './collections/Users'
import { seedHandler } from './endpoints/seedHandler'
import { Landing } from './globals/Landing'
import { Legal } from './globals/Legal'
import localization from './i18n/localization'
import { getAllowedOrigins } from './utilities/serverUrl'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      afterDashboard: ['@/components/AfterDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Moldova în Farfurie',
    },
    user: Users.slug,
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [Raioane, Media, Users],
  globals: [Landing, Legal],
  cors: getAllowedOrigins(),
  csrf: getAllowedOrigins(),
  endpoints: [
    // Populates the database with the content from the design.
    // Remove this endpoint once the real content is in place.
    {
      handler: seedHandler,
      method: 'get',
      path: '/seed',
    },
  ],
  plugins: [
    // Uploads go to Vercel Blob (the serverless filesystem is read-only).
    // Without a token, files fall back to public/media on disk.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: {
          // Serve files straight from the Blob CDN instead of proxying through /api/media
          disablePayloadAccessControl: true,
          // Separate folder per environment, so local and production databases sharing this
          // store never overwrite or delete each other's files
          prefix: process.env.BLOB_PREFIX || process.env.VERCEL_ENV || 'local',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Uploads go through the server. Browser (client) uploads would avoid Vercel's 4.5 MB request
      // limit, but in this plugin version they break files whose name already exists in Media:
      // the document is renamed to "name-1" while the blob keeps the original key, so the link 404s.
      clientUploads: false,
    }),
  ],
  localization,
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
