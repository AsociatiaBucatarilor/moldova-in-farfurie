'use client'

import React from 'react'

import { PlayIcon } from './icons'
import { useModal } from './ModalProvider'

type Props = { className: string; children: React.ReactNode }

export const TrailerButton: React.FC<Props> = ({ className, children }) => {
  const { openTrailer } = useModal()

  return (
    <button type="button" className={className} onClick={openTrailer}>
      <span className="btn__play">
        <PlayIcon />
      </span>
      {children}
    </button>
  )
}
