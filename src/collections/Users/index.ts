import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    // Brute-force protection: after 10 wrong passwords in a row the account is locked for
    // 5 minutes. The counter resets on a successful login and when the lock expires.
    maxLoginAttempts: 10,
    lockTime: 5 * 60 * 1000,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}

export default Users
