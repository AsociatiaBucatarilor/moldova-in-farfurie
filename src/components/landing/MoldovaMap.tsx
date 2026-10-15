'use client'

import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'

import { MAP_HEIGHT, MAP_SHAPES, MAP_WIDTH } from './mapShapes'
import { REGION_COLORS, type RaionView, type Region } from './types'

type Props = {
  raioane: RaionView[]
  filter: Region | 'all'
  selectedId: number | null
  hoveredId: string | null
  onHover: (mapId: string | null) => void
  onPick: (raion: RaionView) => void
}

export const MoldovaMap: React.FC<Props> = ({
  raioane,
  filter,
  selectedId,
  hoveredId,
  onHover: setHoveredId,
  onPick,
}) => {
  const t = useTranslations('map')

  const byMapId = useMemo(() => new Map(raioane.map((r) => [r.mapId, r])), [raioane])
  const hovered = hoveredId ? MAP_SHAPES.find((s) => s.id === hoveredId) : undefined
  const hoveredRaion = hovered ? byMapId.get(hovered.id) : undefined
  const selected = raioane.find((r) => r.id === selectedId)
  const selectedShape = selected ? MAP_SHAPES.find((s) => s.id === selected.mapId) : undefined

  return (
    <svg
      className="map"
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      role="group"
      aria-label={t('label')}
      onMouseLeave={() => setHoveredId(null)}
    >
      <defs>
        <filter id="map-lift" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#2b2620" floodOpacity="0.35" />
        </filter>
      </defs>

      {MAP_SHAPES.map((shape) => {
        const raion = byMapId.get(shape.id)

        // Areas without a district document (municipalities, Transnistria) stay neutral
        if (!raion) {
          return <path key={shape.id} d={shape.d} className="map__shape map__shape--muted" />
        }

        const dimmed = filter !== 'all' && raion.region !== filter
        return (
          <path
            key={shape.id}
            d={shape.d}
            fill={REGION_COLORS[raion.region].fill}
            className={`map__shape map__shape--active${dimmed ? ' is-dimmed' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={t('raion', { name: raion.name })}
            onMouseEnter={() => setHoveredId(shape.id)}
            onFocus={() => setHoveredId(shape.id)}
            onBlur={() => setHoveredId(null)}
            onClick={() => onPick(raion)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onPick(raion)
              }
            }}
          />
        )
      })}

      {selectedShape && selectedShape.id !== hoveredId && (
        <path d={selectedShape.d} className="map__selected" />
      )}

      <g className="map__labels" aria-hidden="true">
        {MAP_SHAPES.map((shape) => {
          const raion = byMapId.get(shape.id)
          if (!raion || shape.id === hoveredId) return null
          return (
            <text key={shape.id} x={shape.cx} y={shape.cy} className="map__label">
              {raion.name}
            </text>
          )
        })}
      </g>

      {/* The hovered district is redrawn on top so it can lift above its neighbours */}
      {hovered && hoveredRaion && (
        <g className="map__hover" aria-hidden="true">
          <path d={hovered.d} fill={REGION_COLORS[hoveredRaion.region].fill} filter="url(#map-lift)" />
          <text x={hovered.cx} y={hovered.cy} className="map__hover-label">
            {hoveredRaion.name}
          </text>
        </g>
      )}
    </svg>
  )
}
