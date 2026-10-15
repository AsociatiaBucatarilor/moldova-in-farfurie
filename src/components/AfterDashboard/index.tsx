'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

const SuccessMessage: React.FC = () => (
  <div>
    Database seeded! You can now{' '}
    <a target="_blank" href="/">
      visit your website
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault()
      if (loading || seeded) return

      setLoading(true)

      try {
        const res = await fetch('/api/seed')
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || res.statusText)
        }
        setSeeded(true)
        toast.success(<SuccessMessage />, { duration: 5000 })
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    },
    [loading, seeded],
  )

  let message = ''
  if (loading) message = ' (seeding...)'
  if (seeded) message = ' (done!)'
  if (error) message = ` (error: ${error})`

  return (
    <Fragment>
      <a href="/api/seed" onClick={handleClick} rel="noopener noreferrer" target="_blank">
        Încarcă conținutul din design (resetează raioanele și media)
      </a>
      {message}
    </Fragment>
  )
}

export default SeedButton
