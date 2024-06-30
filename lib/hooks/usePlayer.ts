import { usePlayerContext } from 'lib/playerContext'
import { isChromeDesktop } from 'lib/playerHelper'
import { Playlist, Song } from 'lib/types/content'
import React from 'react'

import { useAirPlay } from './useAirPlay'
import { useVolumeControl } from './useVolumeControl'

export interface PlayerHookProps {}
export interface PlayerHook {
  activeSong: Song | undefined
  isPlaying: boolean
  isLoading: boolean
  currentTime: number
  duration: number
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
  playlist: Playlist
  airPlayRef: React.MutableRefObject<HTMLSpanElement | null>
  playerVolumeSliderRef: React.MutableRefObject<HTMLInputElement | null>
  toggleSong: (song: Song) => void
  setVolume: (e: React.ChangeEvent<HTMLInputElement>) => void
  songIndex: () => number
  lowerVolume: () => void
  raiseVolume: () => void
  playPrevious: () => void
  playNext: (loop: boolean) => void
}

let playPromise: Promise<void> | undefined
let isPlaying = false

export const usePlayer = (): PlayerHook => {
  const { dispatch, state } = usePlayerContext()
  const { activeSong, isLoading, playlist, songClickIndex } = state
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)

  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const airPlayRef = React.useRef<HTMLSpanElement | null>(null)
  const playerVolumeSliderRef = React.useRef<HTMLInputElement | null>(null)

  const { setVolume, lowerVolume, raiseVolume } = useVolumeControl(
    audioRef,
    playerVolumeSliderRef,
  )
  useAirPlay(audioRef, airPlayRef)

  const songIndex = React.useCallback(() => {
    if (!activeSong || !playlist) {
      return 0
    }
    return playlist.findIndex((song) => song._id === activeSong._id)
  }, [activeSong, playlist])

  const playNext = React.useCallback(
    (loop: boolean) => {
      const playlistLength = playlist.length
      if (playlistLength === 0) {
        return
      }
      const activeSongIndex = songIndex()
      if (playlistLength === activeSongIndex + 1 && !loop) {
        return
      }
      const nextIndex =
        playlistLength > activeSongIndex + 1 ? activeSongIndex + 1 : 0
      dispatch({
        type: 'SET_ACTIVE_SONG',
        payload: { song: playlist[nextIndex] },
      })
    },
    [dispatch, playlist, songIndex],
  )

  React.useEffect(() => {
    const player = audioRef.current

    if (!player) {
      return
    }

    const updateCurrentTime = () => {
      setCurrentTime(player.currentTime)
    }

    const updateDuration = () => {
      setDuration(player.duration)
    }

    const handleStalled = () => {
      dispatch({ type: 'SET_LOADING', payload: true })
    }

    const handleWaiting = () => {
      dispatch({ type: 'SET_LOADING', payload: true })
    }

    const handlePlaying = () => {
      dispatch({ type: 'SET_LOADING', payload: false })
      dispatch({ type: 'PLAY' })
      isPlaying = true
    }

    const handlePause = () => {
      requestAnimationFrame(() => {
        if (player.paused) {
          isPlaying = false
          dispatch({ type: 'PAUSE' })
        }
      })
    }

    const handleEnded = () => {
      playNext(true)
      isPlaying = false
    }

    player.addEventListener('timeupdate', updateCurrentTime)
    player.addEventListener('loadedmetadata', updateDuration)
    player.addEventListener('playing', handlePlaying)
    player.addEventListener('pause', handlePause)
    player.addEventListener('stalled', handleStalled)
    player.addEventListener('waiting', handleWaiting)
    player.addEventListener('ended', handleEnded)

    return () => {
      player.removeEventListener('timeupdate', updateCurrentTime)
      player.removeEventListener('loadedmetadata', updateDuration)
      player.removeEventListener('playing', handlePlaying)
      player.removeEventListener('pause', handlePause)
      player.removeEventListener('stalled', handleStalled)
      player.removeEventListener('waiting', handleWaiting)
      player.removeEventListener('ended', handleEnded)
    }
  }, [dispatch, playNext])

  const toggleSong = React.useCallback(
    (song: Song) => {
      if (!song) {
        return
      }
      const player = audioRef.current
      const src = song.audioFile.asset.url

      if (player.src !== src) {
        dispatch({ type: 'SET_LOADING', payload: true })
        if (isPlaying) {
          player.pause()
        }
        player.setAttribute('title', `The Discoverables - ${song.title}`)
        if (isChromeDesktop() && !player.paused) {
          setTimeout(() => {
            player.src = src
            player.load()
            playPromise = player.play()
          }, 1000)
        } else {
          player.src = src
          player.load()
          playPromise = player.play()
        }
      } else if (isPlaying) {
        playPromise
          ?.then(() => player.pause())
          .catch(() => dispatch({ type: 'PAUSE' }))
      } else {
        playPromise = player.play()
      }
    },
    [dispatch],
  )

  const playPrevious = React.useCallback(() => {
    const activeSongIndex = songIndex()
    if (playlist.length === 0 || activeSongIndex < 1) {
      return
    }
    dispatch({
      type: 'SET_ACTIVE_SONG',
      payload: { song: playlist[activeSongIndex - 1] },
    })
  }, [dispatch, playlist, songIndex])

  React.useEffect(() => {
    if (activeSong) {
      toggleSong(activeSong)
    }
  }, [activeSong, toggleSong, songClickIndex])

  return {
    activeSong,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    playlist,
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
