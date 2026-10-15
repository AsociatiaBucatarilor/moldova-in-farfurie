// Accepts any common YouTube link (watch, youtu.be, shorts, embed, live) and returns the video id.
export const getYouTubeId = (url?: string | null): string | null => {
  if (!url) return null
  const trimmed = url.trim()
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed
  try {
    const u = new URL(trimmed)
    const host = u.hostname.replace(/^www\.|^m\./, '')
    if (host === 'youtu.be') return u.pathname.slice(1, 12) || null
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      const v = u.searchParams.get('v')
      if (v) return v
      const match = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/)
      if (match) return match[1]
    }
  } catch {
    return null
  }
  return null
}

export const validateYouTubeUrl = (value: string | null | undefined): true | string => {
  if (!value) return true
  return getYouTubeId(value) ? true : 'Introduceți un link YouTube valid (ex. https://youtu.be/…)'
}
