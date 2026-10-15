import React from 'react'

import type { Landing } from '@/payload-types'

import { lines } from './lines'

export const Quote: React.FC<{ quote: Landing['quote'] }> = ({ quote }) => {
  if (!quote?.text) return null

  return (
    <section id="despre" className="quote">
      <blockquote className="quote__text">{lines(quote.text)}</blockquote>
      {quote.author && <div className="quote__author">{quote.author}</div>}
    </section>
  )
}
