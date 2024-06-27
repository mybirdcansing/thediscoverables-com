import React from 'react'

import { Playlist, Song } from './types/content'

export interface PlayerContextState {
  activeSong: Song | null
  isPlaying: boolean
  isLoading: boolean
  playlist: Playlist | null
}

export type PlayerContextAction =
  | {
      type: 'SET_ACTIVE_SONG_AND_PLAYLIST'
      payload: { song: Song; playlist: Playlist }
    }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PLAYLIST'; payload: { playlist: Playlist } }

const initialState: PlayerContextState = {
  activeSong: null,
  isPlaying: false,
  isLoading: false,
  playlist: [],
}

export const PlayerContext = React.createContext<{
  state: PlayerContextState
  dispatch: React.Dispatch<PlayerContextAction>
  setSong: (song: Song, playlist?: Playlist) => void
}>({
  state: initialState,
  dispatch: () => undefined,
  setSong: (song: Song, playlist?: Playlist) => undefined,
})

export const reducer = (
  state: PlayerContextState,
  action: PlayerContextAction,
): PlayerContextState => {
  console.log(state)

  switch (action.type) {
    case 'SET_ACTIVE_SONG_AND_PLAYLIST':
      return {
        ...state,
        activeSong: action.payload.song,
        playlist: action.payload.playlist,
      }
    case 'PLAY':
      return { ...state, isPlaying: true }
    case 'PAUSE':
      return { ...state, isPlaying: false }
    case 'SET_PLAYLIST':
      return { ...state, playlist: action.payload.playlist }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      throw new Error('Unknown action')
  }
}

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const setSong = (song: Song, playlist: Playlist) => {
    dispatch({
      type: 'SET_ACTIVE_SONG_AND_PLAYLIST',
      payload: { song, playlist },
    })
  }

  return (
    <PlayerContext.Provider
      value={{
        dispatch,
        state,
        setSong,
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
