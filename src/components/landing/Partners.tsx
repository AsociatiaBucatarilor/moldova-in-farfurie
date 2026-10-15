import Image from 'next/image'
import React from 'react'

import type { Landing } from '@/payload-types'

import { toImage } from './toView'

// The marquee track holds the logo list twice and slides by half its width, so the loop is
// seamless. Short lists are repeated first so one half is always wider than the screen.
const MIN_ITEMS_PER_HALF = 6

type Item = NonNullable<NonNullable<Landing['partners']>['items']>[number]

const PartnerLogo: React.FC<{ item: Item; hidden: boolean }> = ({ item, hidden }) => {
  const logo = toImage(item.logo)
  if (!logo) return null

  const img = (
    <Image
      src={logo.url}
      alt={hidden ? '' : logo.alt || item.name}
      width={logo.width || 300}
      height={logo.height || 120}
      sizes="320px"
      className="partners__logo"
    />
  )

  return (
    <li className="partners__item" aria-hidden={hidden || undefined}>
      {item.url ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
          tabIndex={hidden ? -1 : undefined}
        >
          {img}
        </a>
      ) : (
        img
      )}
    </li>
  )
}

export const Partners: React.FC<{ partners: Landing['partners'] }> = ({ partners }) => {
  const items = (partners?.items || []).filter((item) => toImage(item.logo))
  if (!items.length) return null

  const repeat = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / items.length))
  const half = Array.from({ length: repeat }, () => items).flat()
  // Duration grows with the number of logos so the scrolling speed stays the same
  const duration = `${half.length * 5}s`

  return (
    <section id="parteneri" className="partners">
      {partners?.title && <h2 className="partners__title">{partners.title}</h2>}
      <div className="partners__viewport">
        <ul className="partners__track" style={{ '--marquee-duration': duration } as React.CSSProperties}>
          {[...half, ...half].map((item, i) => (
            // Only the first copy of each logo is exposed to assistive technology
            <PartnerLogo key={`${item.id}-${i}`} item={item} hidden={i >= items.length} />
          ))}
        </ul>
      </div>
    </section>
  )
}
