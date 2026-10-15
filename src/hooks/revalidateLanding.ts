import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

// The whole site is a single page, so any content change re-renders it for every locale.
const revalidate = (context: Record<string, unknown>) => {
  if (context.disableRevalidate) return
  try {
    revalidatePath('/[locale]', 'page')
  } catch {
    // revalidatePath throws outside of a Next.js request (e.g. seeding from a script)
  }
}

export const revalidateLandingCollection: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidate(req.context)
  return doc
}

export const revalidateLandingDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidate(req.context)
  return doc
}

export const revalidateLandingGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidate(req.context)
  return doc
}
