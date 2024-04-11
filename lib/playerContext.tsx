import React from 'react'

import { Song } from './types/content'

export const PlayerContext = React.createContext<{
  activeSong: Song
  setActiveSong: (song: Song) => void
}>(undefined)

export const PlayerProvider = ({ children }) => {
  const [activeSong, setActiveSong] = React.useState(null)

  return (
    <PlayerContext.Provider value={{ activeSong, setActiveSong }}>
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
