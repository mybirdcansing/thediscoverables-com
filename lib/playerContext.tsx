import React from 'react'

import { PlayerContextAction, PlayerContextState } from './types/player'
import { Playlist } from './types/playlist'
import { Song } from './types/song'

const initialState: PlayerContextState = {
  activeSong: null,
  isPlaying: false,
  isLoading: false,
  playlist: [],
  isDrawerExpanded: false,
  songClickIndex: 0,
}

export const PlayerContext = React.createContext<{
  state: PlayerContextState
  dispatch: React.Dispatch<PlayerContextAction>
  setSong: (song: Song, playlist?: Playlist | undefined) => void
}>({
  state: initialState,
  dispatch: () => undefined,
  setSong: () => undefined,
})

export const reducer = (
  state: PlayerContextState,
  action: PlayerContextAction,
): PlayerContextState => {
  switch (action.type) {
    case 'SET_ACTIVE_SONG_AND_PLAYLIST':
      return {
        ...state,
        activeSong: action.payload.song,
        playlist: action.payload.playlist,
        songClickIndex: state.songClickIndex + 1,
      }
    case 'SET_ACTIVE_SONG':
      return {
        ...state,
        activeSong: action.payload.song,
        songClickIndex: state.songClickIndex + 1,
      }
    case 'PLAY':
      return { ...state, isPlaying: true }
    case 'PAUSE':
      return { ...state, isPlaying: false }
    case 'SET_PLAYLIST':
      return { ...state, playlist: action.payload.playlist }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_DRAWER_EXPANDED':
      return { ...state, isDrawerExpanded: action.payload }
    default:
      throw new Error('Unknown action')
  }
}

interface PlayerProviderProps {
  children: React.ReactNode
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const setSong = (song: Song, playlist: Playlist | undefined = []) => {
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
