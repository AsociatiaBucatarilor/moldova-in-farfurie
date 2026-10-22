// Editors often paste "jetour.md" or "www.site.md"; store a full https:// URL instead.
export const normalizeUrl = (value: unknown): unknown => {
  if (typeof value !== 'string') return value
  const trimmed = value.trim()
  if (!trimmed) return null
  return /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export const validateUrl = (value: string | null | undefined): true | string => {
  if (!value) return true
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) throw new Error()
    return true
  } catch {
    return 'Introduceți o adresă web validă (ex. https://exemplu.md)'
  }
}
