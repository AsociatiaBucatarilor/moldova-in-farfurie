'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useId, useRef, useState } from 'react'

import { PlayIcon } from './icons'
import { REGION_COLORS, type RaionView } from './types'

type DialogProps = {
  label: string
  onClose: () => void
  children: React.ReactNode
  style?: React.CSSProperties
}

// Shared shell: backdrop, Escape to close, scroll lock and focus handling.
const Dialog: React.FC<DialogProps> = ({ label, onClose, children, style }) => {
  const t = useTranslations('modal')
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panelRef}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        style={style}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label={t('close')}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

type PlayerProps = { videoId: string | null; kind: string; title: string }

const Player: React.FC<PlayerProps> = ({ videoId, kind, title }) => {
  const t = useTranslations('modal')

  if (videoId) {
    return (
      <div className="player">
        <iframe
          key={videoId}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  return (
    <div className="player player--soon">
      <span className="player__icon">
        <PlayIcon />
      </span>
      <p className="player__title">{t('soon', { kind })}</p>
      <p className="player__text">{t('soonText')}</p>
    </div>
  )
}

type Tab = 'episode' | 'teaser'

export const RaionModal: React.FC<{ raion: RaionView; onClose: () => void }> = ({ raion, onClose }) => {
  const t = useTranslations('modal')
  const tRegion = useTranslations('regions')
  const tMap = useTranslations('map')
  const tabsId = useId()
  // Open on whichever video is already published, episode first
  const [tab, setTab] = useState<Tab>(!raion.episodeId && raion.teaserId ? 'teaser' : 'episode')

  const title = tMap('raion', { name: raion.name })
  const videoId = tab === 'episode' ? raion.episodeId : raion.teaserId
  const pending = !raion.episodeId && !raion.teaserId

  return (
    <Dialog
      label={title}
      onClose={onClose}
      style={{ '--band': REGION_COLORS[raion.region].band } as React.CSSProperties}
    >
      <div className="modal__media">
        <div className="modal__tabs" role="tablist" aria-label={title}>
          {(['episode', 'teaser'] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`${tabsId}-${key}`}
              aria-selected={tab === key}
              aria-controls={`${tabsId}-panel`}
              className="modal__tab"
              onClick={() => setTab(key)}
            >
              {t(key)}
            </button>
          ))}
        </div>
        <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${tab}`}>
          <Player videoId={videoId} kind={t(tab)} title={`${title} — ${t(tab)}`} />
        </div>
      </div>

      <div className="modal__body">
        <div className="modal__kicker">{t('kicker', { region: tRegion(raion.region) })}</div>
        <h2 className="modal__title">{title}</h2>

        {raion.heritage && (
          <>
            <h3 className="modal__subtitle">{t('heritage')}</h3>
            <p className="modal__text">{raion.heritage}</p>
          </>
        )}
        {raion.food && (
          <>
            <h3 className="modal__subtitle">{t('food')}</h3>
            <p className="modal__text">{raion.food}</p>
          </>
        )}
        {!raion.heritage && !raion.food && raion.intro && <p className="modal__text">{raion.intro}</p>}

        {pending && <div className="modal__status">{t('status')}</div>}
        {raion.moreUrl && (
          <a className="modal__more" href={raion.moreUrl} target="_blank" rel="noopener noreferrer">
            {t('more')} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </Dialog>
  )
}

export const TrailerModal: React.FC<{ videoId: string | null; onClose: () => void }> = ({
  videoId,
  onClose,
}) => {
  const t = useTranslations('modal')

  return (
    <Dialog label={t('trailer')} onClose={onClose} style={{ '--band': '#2b2a26' } as React.CSSProperties}>
      <div className="modal__media modal__media--solo">
        <Player videoId={videoId} kind={t('trailer')} title="Moldova în Farfurie — trailer" />
      </div>
    </Dialog>
  )
}
