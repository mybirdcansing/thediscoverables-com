import { Playlist } from './playlist'
import { Song } from './song'

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
  songClickIndex: number
  isDrawerExpanded: boolean
}

export type PlayerContextAction =
  | {
      type: 'SET_ACTIVE_SONG_AND_PLAYLIST'
      payload: { song: Song; playlist: Playlist }
    }
  | { type: 'SET_ACTIVE_SONG'; payload: { song: Song } }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PLAYLIST'; payload: { playlist: Playlist } }
  | { type: 'SET_DRAWER_EXPANDED'; payload: boolean }
