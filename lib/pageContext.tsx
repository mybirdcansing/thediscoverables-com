import React from 'react'

export const PlayerContext = React.createContext({})

export const PlayerProvider = ({ children }) => (
  <PlayerContext.Provider value={{}}>{children}</PlayerContext.Provider>
)

export const usePlayerContext = () => React.useContext(PlayerContext)
