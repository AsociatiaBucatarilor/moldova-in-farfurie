import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

// The site is small and its pages share content (footer, partners), so any content change
// re-renders every page in every locale.
const revalidate = (context: Record<string, unknown>) => {
  if (context.disableRevalidate) return
  try {
    revalidatePath('/', 'layout')
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
