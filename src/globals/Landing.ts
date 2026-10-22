import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateLandingGlobal } from '../hooks/revalidateLanding'
import { normalizeUrl, validateUrl } from '../utilities/url'
import { validateYouTubeUrl } from '../utilities/youtube'

const multiline = 'Fiecare rând nou apare pe un rând separat pe site.'

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: 'Pagina principală',
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
          name: 'hero',
          label: 'Hero',
          fields: [
            { name: 'background', label: 'Imagine fundal', type: 'upload', relationTo: 'media' },
            {
              name: 'title',
              label: 'Titlu',
              type: 'textarea',
              localized: true,
              required: true,
              admin: { description: multiline },
            },
            {
              name: 'tagline',
              label: 'Subtitlu',
              type: 'textarea',
              localized: true,
              admin: { description: multiline },
            },
            { name: 'description', label: 'Descriere', type: 'textarea', localized: true },
            {
              name: 'script',
              label: 'Text caligrafic',
              type: 'textarea',
              localized: true,
              admin: { description: multiline },
            },
            {
              name: 'trailerUrl',
              label: 'Trailer (link YouTube)',
              type: 'text',
              validate: validateYouTubeUrl,
              admin: { description: 'Deschis de butoanele „Vezi trailerul” și „Urmărește proiectul”.' },
            },
            {
              name: 'stats',
              label: 'Cifre',
              type: 'array',
              maxRows: 5,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', label: 'Valoare', type: 'text', required: true },
                    { name: 'label', label: 'Etichetă', type: 'text', localized: true, required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'map',
          label: 'Hartă',
          fields: [
            { name: 'eyebrow', label: 'Supratitlu', type: 'text', localized: true },
            {
              name: 'title',
              label: 'Titlu',
              type: 'textarea',
              localized: true,
              admin: { description: multiline },
            },
            { name: 'description', label: 'Descriere', type: 'textarea', localized: true },
            {
              name: 'script',
              label: 'Text caligrafic',
              type: 'textarea',
              localized: true,
              admin: { description: multiline },
            },
            {
              name: 'featured',
              label: 'Raion afișat implicit în panou',
              type: 'relationship',
              relationTo: 'raioane',
            },
          ],
        },
        {
          name: 'districts',
          label: 'Grila de raioane',
          fields: [
            { name: 'eyebrow', label: 'Supratitlu', type: 'text', localized: true },
            { name: 'title', label: 'Titlu', type: 'text', localized: true },
            { name: 'description', label: 'Descriere', type: 'textarea', localized: true },
          ],
        },
        {
          name: 'quote',
          label: 'Citat',
          fields: [
            {
              name: 'text',
              label: 'Citat',
              type: 'textarea',
              localized: true,
              admin: { description: multiline },
            },
            { name: 'author', label: 'Autor', type: 'text', localized: true },
          ],
        },
        {
          name: 'partners',
          label: 'Parteneri',
          fields: [
            {
              name: 'title',
              label: 'Titlu',
              type: 'text',
              localized: true,
              admin: { description: 'Afișat deasupra caruselului cu logo-uri.' },
            },
            {
              name: 'items',
              label: 'Parteneri',
              type: 'array',
              admin: { description: 'Logo-urile defilează într-un carusel, în ordinea de aici.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', label: 'Nume', type: 'text', required: true },
                    {
                      name: 'url',
                      label: 'Link către site-ul partenerului',
                      type: 'text',
                      admin: {
                        placeholder: 'https://exemplu.md',
                        description: 'Opțional. Click pe logo deschide site-ul într-un tab nou.',
                      },
                      hooks: { beforeValidate: [({ value }) => normalizeUrl(value)] },
                      validate: validateUrl,
                    },
                  ],
                },
                { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
        {
          name: 'footer',
          label: 'Footer',
          fields: [
            {
              type: 'collapsible',
              label: 'Contacte',
              admin: {
                description:
                  'Apar în footer, la secțiunea „Contacte” (linkul „Contacte” din meniu duce aici). Câmpurile goale nu se afișează.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'phone', label: 'Telefon', type: 'text' },
                    { name: 'email', label: 'Email', type: 'email' },
                  ],
                },
                { name: 'address', label: 'Adresă', type: 'textarea', localized: true },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'instagram', type: 'text' },
                { name: 'facebook', type: 'text' },
                { name: 'youtube', type: 'text' },
                { name: 'tiktok', type: 'text' },
              ],
            },
            { name: 'hashtag', label: 'Hashtag', type: 'text', defaultValue: '#MoldovaInFarfurie' },
            { name: 'copyright', label: 'Copyright', type: 'text', localized: true },
            { name: 'madeWith', label: 'Text dreapta jos', type: 'text', localized: true },
          ],
        },
      ],
    },
  ],
}
