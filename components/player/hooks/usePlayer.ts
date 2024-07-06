import { usePlayerContext } from 'lib/playerContext'
import { Playlist, Song } from 'lib/types/content'
import React from 'react'

import { useAirPlay } from './useAirPlay'
import { useAudioEventHandlers } from './useAudioEventHandlers'
import { useCurrentTimeAndDuration } from './useCurrentTimeAndDuration'
import { useSongNavigation } from './useSongNavigation'
import { useVolumeControl } from './useVolumeControl'

export interface PlayerHook {
  activeSong: Song | null
  isPlaying: boolean
  isLoading: boolean
  currentTime: number
  duration: number
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
  playlist: Playlist
  airPlayRef: React.MutableRefObject<HTMLSpanElement | null>
  playerVolumeSliderRef: React.MutableRefObject<HTMLInputElement | null>
  toggleSong: (song: Song, e?: React.MouseEvent) => void
  setVolume: (e: React.ChangeEvent<HTMLInputElement>) => void
  songIndex: () => number
  lowerVolume: () => void
  raiseVolume: () => void
  playPrevious: (e?: React.MouseEvent) => void
  playNext: (loop: boolean, e?: React.MouseEvent) => void
}

export const usePlayer = (): PlayerHook => {
  const { state } = usePlayerContext()
  const { activeSong, isLoading, playlist, songClickIndex } = state

  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const airPlayRef = React.useRef<HTMLSpanElement | null>(null)
  const playerVolumeSliderRef = React.useRef<HTMLInputElement | null>(null)

  const { setVolume, lowerVolume, raiseVolume } = useVolumeControl(
    audioRef,
    playerVolumeSliderRef,
  )
  useAirPlay(audioRef, airPlayRef)

  const { currentTime, duration } = useCurrentTimeAndDuration(audioRef)

  const [isPlaying, setIsPlaying] = React.useState(false)

  const songIndex = React.useCallback(() => {
    if (!activeSong || !playlist) {
      return 0
    }
    return playlist.findIndex((song) => song._id === activeSong._id)
  }, [activeSong, playlist])

  const { toggleSong, playPrevious, playNext } = useSongNavigation(
    audioRef,
    playlist ?? [],
    songIndex,
    setIsPlaying,
  )

  useAudioEventHandlers(audioRef, playNext, setIsPlaying)

  React.useEffect(() => {
    if (activeSong) {
      toggleSong(activeSong)
    }
  }, [activeSong, toggleSong, songClickIndex])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        if (isPlaying) {
          audioRef.current?.pause()
          setIsPlaying(false)
        } else {
          audioRef.current?.play()
          setIsPlaying(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPlaying])

  return {
    activeSong,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    playlist: playlist ?? [],
    audioRef,
    airPlayRef,
    playerVolumeSliderRef,
    songIndex,
    toggleSong,
    setVolume,
    lowerVolume,
    raiseVolume,
    playPrevious,
    playNext,
  }
}
