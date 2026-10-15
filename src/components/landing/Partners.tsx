import Image from 'next/image'
import React from 'react'

import type { Landing } from '@/payload-types'

import { toImage } from './toView'

export const Partners: React.FC<{ partners: Landing['partners'] }> = ({ partners }) => {
  const items = partners?.items || []
  if (!items.length) return null

  return (
    <section id="parteneri" className="partners">
      <ul className="partners__grid">
        {items.map((item) => {
          const logo = toImage(item.logo)
          const img = logo && (
            <Image
              src={logo.url}
              alt={logo.alt || item.name}
              width={logo.width || 300}
              height={logo.height || 120}
              className="partners__logo"
            />
          )
          return (
            <li key={item.id} className="partners__item">
              {item.label && <div className="partners__label">{item.label}</div>}
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" title={item.name}>
                  {img}
                </a>
              ) : (
                img
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
