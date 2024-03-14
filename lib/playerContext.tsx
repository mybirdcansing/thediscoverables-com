import React from 'react'
import type { Song } from './sanity.queries'

export const PlayerContext = React.createContext<
  { activeSong: Song } | undefined
>(undefined)

export const PlayerProvider = ({ children }) => {
  return (
    <PlayerContext.Provider value={undefined}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext = () => {
  const context = React.useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerContext')
  }

  return context
}
