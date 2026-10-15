'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { RaionModal, TrailerModal } from './Modal'
import type { RaionView } from './types'

type ModalState = { type: 'raion'; id: number } | { type: 'trailer' } | null

type ModalContextValue = {
  openRaion: (id: number) => void
  openTrailer: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used inside <ModalProvider>')
  return ctx
}

type Props = {
  children: React.ReactNode
  raioane: RaionView[]
  trailerId: string | null
}

export const ModalProvider: React.FC<Props> = ({ children, raioane, trailerId }) => {
  const [state, setState] = useState<ModalState>(null)

  const openRaion = useCallback((id: number) => setState({ type: 'raion', id }), [])
  const openTrailer = useCallback(() => setState({ type: 'trailer' }), [])
  const close = useCallback(() => setState(null), [])

  const value = useMemo(() => ({ openRaion, openTrailer }), [openRaion, openTrailer])
  const raion = state?.type === 'raion' ? raioane.find((r) => r.id === state.id) : undefined

  return (
    <ModalContext.Provider value={value}>
      {children}
      {raion && <RaionModal raion={raion} onClose={close} />}
      {state?.type === 'trailer' && <TrailerModal videoId={trailerId} onClose={close} />}
    </ModalContext.Provider>
  )
}
