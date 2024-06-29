import { usePlayerContext } from 'lib/playerContext'
import {
  currentTimeToString,
  durationToString,
  isChromeDesktop,
} from 'lib/playerHelper'
import { Playlist, Song } from 'lib/types/content'
import React from 'react'

export interface PlayerHookProps {}
export interface PlayerHook {
  activeSong: Song | undefined
  isPlaying: boolean
  isLoading: boolean
  currentTimeString: string
  durationString: string
  playlist: Playlist
  playerRef: React.MutableRefObject<HTMLAudioElement | null>
  progressBarRef: React.MutableRefObject<HTMLDivElement | null>
  slideContainerRef: React.MutableRefObject<HTMLDivElement | null>
  playSliderRef: React.MutableRefObject<HTMLDivElement | null>
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
let ticker
let sliderBeingSlided = false
let isPlaying = false

export const usePlayer = (): PlayerHook => {
  const playerContext = usePlayerContext()
  const { dispatch, state } = playerContext
  const { activeSong, isLoading, playlist, songClickIndex } = state

  const [currentTimeString, setCurrentTimeString] =
    React.useState<string>('00:00')
  const [durationString, setDurationString] = React.useState<string>(
    activeSong?.duration ?? '00:00',
  )
  const playerRef = React.useRef<HTMLAudioElement | null>(null)
  const progressBarRef = React.useRef<HTMLDivElement | null>(null)
  const slideContainerRef = React.useRef<HTMLDivElement | null>(null)
  const playSliderRef = React.useRef<HTMLDivElement | null>(null)
  const airPlayRef = React.useRef<HTMLSpanElement | null>(null)
  const playerVolumeSliderRef = React.useRef<HTMLInputElement | null>(null)

  const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerRef.current
    if (player) {
      player.volume = Number(e.target.value) / 100
    }
  }
  const lowerVolume = () => {
    const player = playerRef.current
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
    const player = playerRef.current
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
      const player = playerRef.current
      const slideContainer = slideContainerRef.current
      // const progressBar = progressBarRef.current
      const src = song.audioFile.asset.url

      if (player.src !== src) {
        dispatch({ type: 'SET_LOADING', payload: true })
        cancelAnimationFrame(ticker)

        if (isPlaying) {
          player.pause()
        }

        const spans = slideContainer.getElementsByTagName('span')
        for (let i = 0; i < spans.length; i++) {
          slideContainer.removeChild(spans[i])
        }

        player.setAttribute('title', `The Discoverables - ${song.title}`)
        // requestAnimationFrame(function () {
        //   progressBar.style.width = '0px'
        // })

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

  const tick = React.useCallback(() => {
    const player = playerRef.current
    const progressBar = progressBarRef.current
    // if the duration is set, and the player isn't paused,
    // and the slider isn't being moved,
    // set the slider's position dynamically
    if (
      player &&
      !isNaN(player.duration) &&
      !player.paused &&
      !sliderBeingSlided
    ) {
      const progress = (player.currentTime / player.duration) * 100
      progressBar.style.width = `${progress}%`
    }
    ticker = requestAnimationFrame(tick)
  }, [])

  const handleProgress = () => {
    const player = playerRef.current
    const slideContainer = slideContainerRef.current
    let ranges = []
    for (let i = 0; i < player.buffered.length; i++) {
      ranges.push([player.buffered.start(i), player.buffered.end(i)])
    }

    //get the current collection of spans inside the slide container
    const spans = slideContainer.getElementsByTagName('span')

    //then add or remove spans so we have the same number as time ranges
    while (spans.length < player.buffered.length) {
      const span = document.createElement('span')
      slideContainer.appendChild(span)
    }

    while (spans.length > player.buffered.length) {
      slideContainer.removeChild(slideContainer.lastChild)
    }

    for (let i = 0; i < player.buffered.length; i++) {
      const durationPercent = 100 / player.duration
      spans[i].style.left = Math.round(durationPercent * ranges[i][0]) + '%'
      spans[i].style.width =
        Math.round(durationPercent * (ranges[i][1] - ranges[i][0])) + '%'
    }
  }

  React.useEffect(() => {
    const player = playerRef.current
    const progressBar = progressBarRef.current
    const playerVolumeSlider = playerVolumeSliderRef.current
    const airPlay = airPlayRef.current

    if (playerVolumeSlider) {
      playerVolumeSlider.value = String(player.volume * 100)
    }

    if (player) {
      player.addEventListener('playing', () => {
        dispatch({ type: 'SET_LOADING', payload: false })
        dispatch({ type: 'PLAY' })
        ticker = requestAnimationFrame(tick)
        isPlaying = true
      })
      player.addEventListener('timeupdate', () => {
        setCurrentTimeString(currentTimeToString(player.currentTime))
      })

      player.addEventListener('durationchange', () => {
        setDurationString(durationToString(player.duration))
      })

      player.addEventListener('progress', handleProgress, false)
      player.addEventListener('loadedmetadata', handleProgress, false)

      player.addEventListener('pause', () => {
        // progressBar.style.width = `${(player.currentTime / player.duration) * 100}%`
        // if the player is still paused on the next animation frame, cancel the ticker
        requestAnimationFrame(() => {
          if (player.paused) {
            isPlaying = false
            dispatch({ type: 'PAUSE' })
            cancelAnimationFrame(ticker)
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
  }, [dispatch, playNext, tick])

  React.useEffect(() => {
    let hammerInstance
    const player = playerRef.current
    const progressBar = progressBarRef.current
    const slideContainer = slideContainerRef.current
    const playSlider = playSliderRef.current

    const initializeHammer = async () => {
      if (!slideContainer) {
        return
      }

      const HammerModule = (await import('hammerjs')).default
      hammerInstance = new HammerModule(slideContainer!)

      hammerInstance.on('pan press tap pressup', (ev: any) => {
        cancelAnimationFrame(ticker)
        sliderBeingSlided = true
        playSlider.classList.add('activePlaySlider')
        const xPos = ev.center.x - slideContainer.offsetLeft
        progressBar.style.width = `${xPos}px`
        if (ev.isFinal) {
          const timeRemaining =
            (xPos / slideContainer.offsetWidth) * player.duration
          player.currentTime = timeRemaining
          ticker = requestAnimationFrame(tick)
          playSlider.classList.remove('activePlaySlider')
          sliderBeingSlided = false
        }
      })
    }

    const hammerSetupInterval = setInterval(() => {
      if (slideContainer) {
        clearInterval(hammerSetupInterval)
        initializeHammer()
      }
    }, 100)

    // Clear interval on component unmount
    return () => {
      clearInterval(hammerSetupInterval)
      // Clean up the Hammer instance on component unmount
      if (hammerInstance) {
        hammerInstance.off('pan press tap pressup')
        hammerInstance.destroy()
      }
    }
  }, [tick])

  React.useEffect(() => {
    if (activeSong) {
      toggleSong(activeSong)
    }
  }, [activeSong, toggleSong, songClickIndex])

  return {
    activeSong,
    isPlaying,
    isLoading,
    currentTimeString,
    durationString,
    playlist,
    playerRef,
    progressBarRef,
    slideContainerRef,
    playSliderRef,
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
