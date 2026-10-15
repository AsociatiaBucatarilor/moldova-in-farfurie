'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import type { Landing } from '@/payload-types'

import { PlayIcon } from './icons'
import { lines } from './lines'
import { useModal } from './ModalProvider'
import { MoldovaMap } from './MoldovaMap'
import { REGION_COLORS, REGION_ORDER, type PhotoView, type RaionView, type Region } from './types'

type Filter = Region | 'all'

const ALL_REGIONS_DOT = `conic-gradient(${REGION_ORDER.map((r, i) => `${REGION_COLORS[r].fill} ${(i * 100) / 3}% ${((i + 1) * 100) / 3}%`).join(', ')})`

type Props = {
  raioane: RaionView[]
  map: Landing['map']
  districts: Landing['districts']
  featuredId: number | null
}

// How many district cards are shown before "show all", per breakpoint
const PREVIEW_DESKTOP = 8
const PREVIEW_MOBILE = 4
const MOBILE_QUERY = '(max-width: 720px)'

const usePreviewCount = () => {
  const [count, setCount] = useState(PREVIEW_DESKTOP)
  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY)
    const update = () => setCount(query.matches ? PREVIEW_MOBILE : PREVIEW_DESKTOP)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return count
}

// Map, side panel and district grid share the region filter, so they live in one client island.
export const Explorer: React.FC<Props> = ({ raioane, map, districts, featuredId }) => {
  const locale = useLocale()
  const t = useTranslations()
  const { openRaion } = useModal()
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<number | null>(featuredId)
  const [hoveredMapId, setHoveredMapId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const previewCount = usePreviewCount()
  const gridRef = useRef<HTMLElement>(null)

  const sorted = useMemo(
    () =>
      [...raioane].sort(
        (a, b) =>
          REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region) ||
          a.name.localeCompare(b.name, locale),
      ),
    [raioane, locale],
  )
  const filtered = filter === 'all' ? sorted : sorted.filter((r) => r.region === filter)
  const visible = expanded ? filtered : filtered.slice(0, previewCount)
  const hasMore = filtered.length > previewCount

  // The panel previews whatever is under the cursor, falling back to the last clicked district
  const hovered = hoveredMapId ? raioane.find((r) => r.mapId === hoveredMapId) : undefined
  const panelRaion = hovered ?? raioane.find((r) => r.id === selectedId)

  const pick = (raion: RaionView) => {
    setSelectedId(raion.id)
    openRaion(raion.id)
  }

  const changeFilter = (next: Filter) => {
    setFilter(next)
    setExpanded(false)
  }

  const collapse = () => {
    setExpanded(false)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section id="harta" className="harta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/sketch.webp" alt="" className="harta__sketch" aria-hidden="true" />

        <div className="harta__grid">
          <div className="harta__intro">
            {map?.eyebrow && <div className="eyebrow">{map.eyebrow}</div>}
            {map?.title && <h2 className="section-title">{lines(map.title)}</h2>}
            {map?.description && <p className="harta__lead">{map.description}</p>}

            <div className="legend">
              {(['all', ...REGION_ORDER] as Filter[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className="legend__item"
                  aria-pressed={filter === key}
                  onClick={() => changeFilter(key)}
                >
                  <span
                    className="legend__dot"
                    style={{
                      background: key === 'all' ? ALL_REGIONS_DOT : REGION_COLORS[key].fill,
                    }}
                  />
                  {key === 'all' ? t('map.allRegions') : t(`regions.${key}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="harta__map">
            <MoldovaMap
              raioane={raioane}
              filter={filter}
              selectedId={selectedId}
              hoveredId={hoveredMapId}
              onHover={setHoveredMapId}
              onPick={pick}
            />
            {map?.script && (
              <div className="harta__script" aria-hidden="true">
                {map.script.split('\n').map((line, i) => (
                  <span key={i} style={{ paddingLeft: `${i * 1.6}em` }}>
                    {line}
                  </span>
                ))}
              </div>
            )}
          </div>

          {panelRaion ? (
            <RaionPanel raion={panelRaion} onOpen={() => pick(panelRaion)} />
          ) : (
            <aside className="panel panel--empty">
              <div className="panel__empty-art" aria-hidden="true">
                {REGION_ORDER.map((region) => (
                  <span key={region} style={{ background: REGION_COLORS[region].fill }} />
                ))}
              </div>
              <h3 className="panel__title">{t('map.pickTitle')}</h3>
              <p className="panel__text">{t('map.pickText')}</p>
            </aside>
          )}
        </div>
      </section>

      <section id="raioane" className="raioane" ref={gridRef}>
        {(districts?.eyebrow || districts?.title) && (
          <div className="raioane__head">
            {districts.eyebrow && <div className="eyebrow">{districts.eyebrow}</div>}
            {districts.title && <h2 className="section-title">{districts.title}</h2>}
            {districts.description && <p className="raioane__lead">{districts.description}</p>}
          </div>
        )}

        <div className="raioane__toolbar">
          <div className="tabs" role="group">
            {(['all', ...REGION_ORDER] as Filter[]).map((key) => (
              <button
                key={key}
                type="button"
                className="tabs__item"
                aria-pressed={filter === key}
                onClick={() => changeFilter(key)}
              >
                {key !== 'all' && (
                  <span className="tabs__dot" style={{ background: REGION_COLORS[key].fill }} />
                )}
                {key === 'all' ? t('grid.all') : t(`regions.${key}`)}
              </button>
            ))}
          </div>
          <div className="raioane__count" aria-live="polite">
            {t('grid.count', { count: filtered.length })}
          </div>
        </div>

        <ul className="raioane__grid">
          {visible.map((raion) => (
            <li key={raion.id}>
              <RaionCard raion={raion} onOpen={() => pick(raion)} />
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className="raioane__more">
            {expanded ? (
              <button type="button" className="btn btn--outline-dark" onClick={collapse}>
                {t('grid.showLess')}
              </button>
            ) : (
              <button type="button" className="btn btn--dark" onClick={() => setExpanded(true)}>
                {t('grid.showAll', { count: filtered.length })}
              </button>
            )}
          </div>
        )}
      </section>
    </>
  )
}

const RaionCard: React.FC<{ raion: RaionView; onOpen: () => void }> = ({ raion, onOpen }) => {
  const t = useTranslations()

  return (
    <article className="card" onClick={onOpen}>
      <div className="card__media">
        {raion.cover && (
          <Image
            src={raion.cover.url}
            alt={raion.cover.alt}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
          />
        )}
        <span className="pill">
          <span className="pill__dot" style={{ background: REGION_COLORS[raion.region].fill }} />
          {t(`regions.${raion.region}`)}
        </span>
      </div>
      <div className="card__foot">
        <h3 className="card__title">{raion.name}</h3>
        <button
          type="button"
          className="round-btn"
          aria-label={t('grid.open', { name: raion.name })}
          onClick={(e) => {
            e.stopPropagation()
            onOpen()
          }}
        >
          →
        </button>
      </div>
    </article>
  )
}

const PhotoGrid: React.FC<{ title: string; items: PhotoView[] }> = ({ title, items }) => (
  <>
    <div className="panel__subtitle">{title}</div>
    <ul className="panel__photos">
      {items.map((item, i) => (
        <li key={i}>
          <div className="panel__photo">
            {item.image && <Image src={item.image.url} alt={item.image.alt} fill sizes="120px" />}
          </div>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  </>
)

const RaionPanel: React.FC<{ raion: RaionView; onOpen: () => void }> = ({ raion, onOpen }) => {
  const t = useTranslations('map')

  return (
    <aside className="panel" aria-live="polite">
      <button type="button" className="panel__media" onClick={onOpen} aria-label={t('watch')}>
        {raion.cover && <Image src={raion.cover.url} alt={raion.cover.alt} fill sizes="(max-width: 1000px) 100vw, 30vw" />}
        <span className="panel__play">
          <PlayIcon />
        </span>
        <span className="panel__caption">{raion.name}</span>
      </button>
      <div className="panel__body">
        <h3 className="panel__title">{t('raion', { name: raion.name })}</h3>
        {raion.intro && <p className="panel__text">{raion.intro}</p>}
        <button type="button" className="btn btn--dark btn--xs" onClick={onOpen}>
          {t('watch')} <span aria-hidden="true">→</span>
        </button>
        {raion.sights.length > 0 && <PhotoGrid title={t('sights')} items={raion.sights} />}
        {raion.dishes.length > 0 && <PhotoGrid title={t('dishes')} items={raion.dishes} />}
      </div>
    </aside>
  )
}
