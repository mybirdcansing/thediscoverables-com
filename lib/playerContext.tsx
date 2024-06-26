import React from 'react'

import { Song } from './types/content'

export interface PlayerContextProps {
  activeSong: Song
  setActiveSong: (song: Song) => void
  isSongPlaying: boolean
  setIsSongPlaying: (isSongPlaying: boolean) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const PlayerContext = React.createContext<PlayerContextProps>(undefined)

export const PlayerProvider = ({ children }) => {
  const [activeSong, setActiveSong] = React.useState(null)
  const [isSongPlaying, setIsSongPlaying] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <PlayerContext.Provider
      value={{
        activeSong,
        setActiveSong,
        isSongPlaying,
        setIsSongPlaying,
        isLoading,
        setIsLoading,
      }}
    >
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
