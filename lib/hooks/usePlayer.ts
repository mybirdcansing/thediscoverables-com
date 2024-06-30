import { usePlayerContext } from 'lib/playerContext'
import { isChromeDesktop } from 'lib/playerHelper'
import { Playlist, Song } from 'lib/types/content'
import React from 'react'

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
let playPromise
let isPlaying = false

export const usePlayer = (): PlayerHook => {
  const playerContext = usePlayerContext()
  const { dispatch, state } = playerContext
  const { activeSong, isLoading, playlist, songClickIndex } = state
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)

  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const airPlayRef = React.useRef<HTMLSpanElement | null>(null)
  const playerVolumeSliderRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    const audio = audioRef.current

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    if (audio) {
      audio.addEventListener('timeupdate', updateCurrentTime)
      audio.addEventListener('loadedmetadata', updateDuration)
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateCurrentTime)
        audio.removeEventListener('loadedmetadata', updateDuration)
      }
    }
  }, [])

  const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = audioRef.current
    if (player) {
      player.volume = Number(e.target.value) / 100
    }
  }
  const lowerVolume = () => {
    const player = audioRef.current
    const playerVolumeSlider = playerVolumeSliderRef.current

    if (player && playerVolumeSlider) {
      const currentVolume = player.volume
      if (currentVolume === 0) {
        return
      }
      if (currentVolume <= 0.1) {
        player.volume = 0
        playerVolumeSlider.value = '0'
        return
      }
      const newLevel = currentVolume - 0.1
      playerVolumeSlider.value = String(newLevel * 100)
      player.volume = newLevel
    }
  }
  const raiseVolume = () => {
    const player = audioRef.current
    const playerVolumeSlider = playerVolumeSliderRef.current
    if (player && playerVolumeSlider) {
      const currentVolume = player.volume
      if (currentVolume === 1) {
        return
      }
      if (currentVolume >= 0.9) {
        player.volume = 1
        playerVolumeSlider.value = '100'
        return
      }
      const newLevel = currentVolume + 0.1
      playerVolumeSlider.value = String(newLevel * 100)
      player.volume = newLevel
    }
  }
  const songIndex = React.useCallback(() => {
    if (!activeSong || !playlist) {
      return 0
    }
    const { _id: activeSongId } = activeSong

    return playlist.findIndex((song) => song._id === activeSongId)
  }, [activeSong, playlist])

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
          // Chrome on Mac has a bit of a stutter when changing tracks.
          // a slight timeout makes it better
          setTimeout(function () {
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
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              player.pause()
            })
            .catch(() => {
              dispatch({ type: 'PAUSE' })
            })
        }
      } else {
        playPromise = player.play()
      }
    },
    [dispatch],
  )

  const playPrevious = React.useCallback(() => {
    const activeSongIndex = songIndex()
    if (!playlist || playlist.length === 0 || activeSongIndex < 1) {
      return
    }

    dispatch({
      type: 'SET_ACTIVE_SONG',
      payload: { song: playlist[activeSongIndex - 1] },
    })
  }, [dispatch, playlist, songIndex])

  const playNext = React.useCallback(
    (loop) => {
      const playlistLength = playlist?.length ?? 0
      if (playlistLength === 0) {
        return
      }
      const activeSongIndex = songIndex()
      // prevent looping?
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
    const playerVolumeSlider = playerVolumeSliderRef.current
    const airPlay = airPlayRef.current

    if (playerVolumeSlider) {
      playerVolumeSlider.value = String(player.volume * 100)
    }

    if (player) {
      player.addEventListener('playing', () => {
        dispatch({ type: 'SET_LOADING', payload: false })
        dispatch({ type: 'PLAY' })
        isPlaying = true
      })

      player.addEventListener('pause', () => {
        requestAnimationFrame(() => {
          if (player.paused) {
            isPlaying = false
            dispatch({ type: 'PAUSE' })
          }
        })
      })

      // I have to find a way to test this
      player.addEventListener('stalled', () => {
        dispatch({ type: 'SET_LOADING', payload: true })
      })

      player.addEventListener('waiting', () => {
        dispatch({ type: 'SET_LOADING', payload: true })
      })

      player.addEventListener('ended', () => {
        playNext(true)
        isPlaying = false
      })
    }

    // Detect if AirPlay is available
    // Mac OS Safari 9+ only
    if (airPlay && typeof window !== 'undefined') {
      if (window.WebKitPlaybackTargetAvailabilityEvent) {
        player.addEventListener(
          'webkitplaybacktargetavailabilitychanged',
          (ev: Event) => {
            const event = ev as WebKitPlaybackTargetAvailabilityEvent
            switch (event.availability) {
              case 'available':
                airPlay.style.display = 'inline-block'
                break

              default:
            }
            airPlay.addEventListener('click', function () {
              player.webkitShowPlaybackTargetPicker()
            })
          },
        )
      } else {
        airPlay.style.display = 'none'
      }
    }
  }, [dispatch, playNext])

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
