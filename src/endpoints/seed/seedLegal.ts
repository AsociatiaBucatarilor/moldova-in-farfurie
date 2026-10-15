import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import type { Payload, PayloadRequest } from 'payload'

import { COOKIES, LEGAL_UPDATED_ON, PRIVACY } from './legal'
import type { Locale } from './data'

const LOCALES: Locale[] = ['ro', 'ru', 'en']

/** Writes the privacy and cookie policies (all locales) into the `legal` global. */
export const seedLegal = async ({ payload, req }: { payload: Payload; req?: PayloadRequest }) => {
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const toRichText = (markdown: string) => convertMarkdownToLexical({ editorConfig, markdown })

  for (const locale of LOCALES) {
    await payload.updateGlobal({
      slug: 'legal',
      locale,
      req,
      context: { disableRevalidate: true },
      data: {
        privacy: {
          title: PRIVACY[locale].title,
          updatedOn: LEGAL_UPDATED_ON,
          content: toRichText(PRIVACY[locale].markdown),
        },
        cookies: {
          title: COOKIES[locale].title,
          updatedOn: LEGAL_UPDATED_ON,
          content: toRichText(COOKIES[locale].markdown),
        },
      },
    })
  }
}
