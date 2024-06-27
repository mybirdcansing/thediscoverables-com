import { Playlist, Song } from './content'

export enum LoadingState {
  INIT = 0,
  LOADING = 1,
  ERROR = 2,
  LOADED = 3,
}

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
