'use client'

import { useLocale, useTranslations } from 'next-intl'
import React, { useEffect, useId, useRef, useState } from 'react'

import localization from '@/i18n/localization'
import { Link, usePathname } from '@/i18n/routing'

export const LocaleSwitcher: React.FC = () => {
  const current = useLocale()
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="locales" ref={rootRef}>
      <button
        type="button"
        className="locales__toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t('language')}: ${current.toUpperCase()}`}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="locales__globe">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9M12 3c-2.5 2.6-3.8 5.6-3.8 9s1.3 6.4 3.8 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
        {current.toUpperCase()}
        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" className="locales__chevron">
          <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      {open && (
        <ul id={menuId} className="locales__menu">
          {localization.locales.map(({ code, label }) => (
            <li key={code}>
              <Link
                href={pathname}
                locale={code}
                lang={code}
                className="locales__option"
                aria-current={code === current ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="locales__code">{code.toUpperCase()}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
