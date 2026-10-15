import type { Field, GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateLandingGlobal } from '../hooks/revalidateLanding'

const policyFields = (description: string): Field[] => [
  { name: 'title', label: 'Titlu', type: 'text', localized: true, required: true },
  {
    name: 'updatedOn',
    label: 'Ultima actualizare',
    type: 'date',
    admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' } },
  },
  {
    name: 'content',
    label: 'Conținut',
    type: 'richText',
    localized: true,
    admin: { description },
  },
]

export const Legal: GlobalConfig = {
  slug: 'legal',
  label: 'Politici legale',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateLandingGlobal],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'privacy',
          label: 'Politica de confidențialitate',
          fields: policyFields('Pagina /politica-de-confidentialitate. Textul juridic trebuie verificat de un jurist.'),
        },
        {
          name: 'cookies',
          label: 'Politica de cookie-uri',
          fields: policyFields(
            'Pagina /politica-cookie. Dacă adăugați servicii noi (analytics, pixeli etc.), actualizați lista de cookie-uri.',
          ),
        },
      ],
    },
  ],
}
