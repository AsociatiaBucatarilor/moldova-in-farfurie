// Run with `pnpm seed` — seeds the database without going through the admin panel.
// `payload run` exits as soon as the module is imported, so the work must be top-level awaited.
import config from '@payload-config'
import { getPayload } from 'payload'

import { seed } from './index'

const payload = await getPayload({ config })
await seed({ payload })
process.exit(0)
