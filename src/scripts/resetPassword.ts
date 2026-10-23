// `pnpm reset-password` — sets a new password for an admin account in the database from
// DATABASE_URL and clears any login lock. The password is typed in the terminal only.
import config from '@payload-config'
import { getPayload } from 'payload'

import { askEmail, askNewPassword } from './prompt'

const payload = await getPayload({ config })

const email = await askEmail()
const { docs } = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
if (!docs.length) {
  console.error(`Nu există niciun utilizator cu emailul ${email}.`)
  process.exit(1)
}

const password = await askNewPassword()

// unlock only reads the e-mail; its type also asks for a password
await payload.unlock({ collection: 'users', data: { email, password }, overrideAccess: true })
await payload.update({ collection: 'users', id: docs[0].id, data: { password }, overrideAccess: true })
console.log(`Parola pentru ${email} a fost schimbată. Te poți autentifica în /admin.`)
process.exit(0)
