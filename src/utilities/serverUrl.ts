const withProtocol = (host: string) => (host.startsWith('http') ? host : `https://${host}`)

/**
 * Public URL of the site. An explicit NEXT_PUBLIC_SERVER_URL wins (custom domain); on Vercel it
 * falls back to the project's production domain, locally to localhost.
 */
export const getServerUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return withProtocol(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  return 'http://localhost:3000'
}

/** Every origin the admin panel can be served from — allowed for CORS and CSRF. */
export const getAllowedOrigins = (): string[] =>
  [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_URL,
  ]
    .filter((value): value is string => Boolean(value))
    .map(withProtocol)
