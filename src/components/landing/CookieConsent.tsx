'use client'

import { useTranslations } from 'next-intl'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { Link } from '@/i18n/routing'

// Only YouTube embeds need consent; everything else the site stores is strictly necessary.
export type Consent = 'all' | 'necessary'

export const CONSENT_COOKIE = 'mf_cookie_consent'
const CONSENT_MAX_AGE = 60 * 60 * 24 * 182 // ~6 months, as stated in the cookie policy

type ConsentContextValue = {
  consent: Consent | null
  setConsent: (value: Consent) => void
  openSettings: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export const useConsent = (): ConsentContextValue => {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>')
  return ctx
}

const readConsent = (): Consent | null => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(all|necessary)`))
  return (match?.[1] as Consent | undefined) ?? null
}

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsentState] = useState<Consent | null>(null)
  const [bannerOpen, setBannerOpen] = useState(false)

  // The cookie is only readable in the browser, so the banner appears after hydration
  useEffect(() => {
    const stored = readConsent()
    setConsentState(stored)
    setBannerOpen(stored === null)
  }, [])

  const setConsent = useCallback((value: Consent) => {
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`
    setConsentState(value)
    setBannerOpen(false)
  }, [])

  const openSettings = useCallback(() => setBannerOpen(true), [])

  const value = useMemo(() => ({ consent, setConsent, openSettings }), [consent, setConsent, openSettings])

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {bannerOpen && <CookieBanner current={consent} onChoose={setConsent} onClose={() => setBannerOpen(false)} />}
    </ConsentContext.Provider>
  )
}

type BannerProps = {
  current: Consent | null
  onChoose: (value: Consent) => void
  onClose: () => void
}

const CookieBanner: React.FC<BannerProps> = ({ current, onChoose, onClose }) => {
  const t = useTranslations('cookies')

  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title">
      <div className="cookie-banner__text">
        <h2 id="cookie-banner-title" className="cookie-banner__title">
          {t('title')}
        </h2>
        <p>
          {t('text')}{' '}
          <Link href="/politica-cookie" className="cookie-banner__link">
            {t('policy')}
          </Link>
        </p>
      </div>
      <div className="cookie-banner__actions">
        {/* Both choices get the same visual weight, so refusing is as easy as accepting */}
        <button type="button" className="btn btn--outline-dark btn--sm" onClick={() => onChoose('necessary')}>
          {t('necessary')}
        </button>
        <button type="button" className="btn btn--dark btn--sm" onClick={() => onChoose('all')}>
          {t('acceptAll')}
        </button>
      </div>
      {current && (
        <button type="button" className="cookie-banner__close" onClick={onClose} aria-label={t('close')}>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

/** Footer link that reopens the banner so visitors can change or withdraw consent. */
export const CookieSettingsButton: React.FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations('cookies')
  const { openSettings } = useConsent()

  return (
    <button type="button" className={className} onClick={openSettings}>
      {t('settings')}
    </button>
  )
}
