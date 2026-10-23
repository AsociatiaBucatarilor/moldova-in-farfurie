// `pnpm create-user` — creates an admin account in the database from DATABASE_URL.
// Name, e-mail and password are typed in the terminal only.
import config from '@payload-config'
import { getPayload } from 'payload'

import { ask, askEmail, askNewPassword } from './prompt'

const payload = await getPayload({ config })

const name = await ask('Nume: ')
const email = await askEmail()
const { totalDocs } = await payload.count({ collection: 'users', where: { email: { equals: email } } })
if (totalDocs) {
  console.error(`Există deja un cont cu emailul ${email}. Pentru o parolă nouă folosește pnpm reset-password.`)
  process.exit(1)
}

const password = await askNewPassword()

await payload.create({
  collection: 'users',
  data: { name: name || undefined, email, password },
  overrideAccess: true,
})
console.log(`Contul ${email} a fost creat. Te poți autentifica în /admin.`)
process.exit(0)
