import cx from 'classnames'
import { usePlayerContext } from 'lib/playerContext'
import {
  currentTimeToString,
  durationToString,
  isChromeDesktop,
  isIOS,
} from 'lib/playerHelper'
import { Song } from 'lib/types/content'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from './Player.module.css'

let playPromise
let ticker
let sliderBeingSlided = false
let isPlaying = false

export const Player = () => {
  const playerContext = usePlayerContext()
  const { dispatch, state } = playerContext
  const { activeSong, isLoading, playlist, songClickIndex } = state
  const [currentTimeString, setCurrentTimeString] =
    React.useState<string>('00:00')
  const [durationString, setDurationString] = React.useState<string>('00:00')
  const player = React.useRef<HTMLAudioElement | null>(null)
  const progressBar = React.useRef<HTMLDivElement | null>(null)
  const slideContainer = React.useRef<HTMLDivElement | null>(null)
  const playSlider = React.useRef<HTMLDivElement | null>(null)
  const airPlay = React.useRef<HTMLSpanElement | null>(null)
  const playerVolumeSlider = React.useRef<HTMLInputElement | null>(null)

  const setVolume = (e) => {
    player.current.volume = e.target.value / 100
  }
  const songIndex = React.useCallback(() => {
    if (!activeSong || !playlist) {
      return 0
    }
    const { _id } = activeSong

    return playlist.findIndex((song) => song._id === _id)
  }, [activeSong, playlist])

  const toggleSong = React.useCallback(
    (song: Song) => {
      if (!song) {
        return
      }

      const src = song.audioFile.asset.url

      if (player.current.src !== src) {
        dispatch({ type: 'SET_LOADING', payload: true })
        cancelAnimationFrame(ticker)

        if (isPlaying) {
          player.current.pause()
        }

        const spans = slideContainer.current.getElementsByTagName('span')
        for (let i = 0; i < spans.length; i++) {
          slideContainer.current.removeChild(spans[i])
        }

        player.current.setAttribute(
          'title',
          `The Discoverables - ${song.title}`,
        )
        requestAnimationFrame(function () {
          progressBar.current.style.width = '0px'
        })

        if (isChromeDesktop() && !player.current.paused) {
          // Chrome on Mac has a bit of a stutter when changing tracks.
          // a slight timeout makes it better
          setTimeout(function () {
            player.current.src = src
            player.current.load()
            playPromise = player.current.play()
          }, 1000)
        } else {
          player.current.src = src
          player.current.load()
          playPromise = player.current.play()
        }
      } else if (isPlaying) {
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              player.current.pause()
            })
            .catch(() => {
              dispatch({ type: 'PAUSE' })
            })
        }
      } else {
        playPromise = player.current.play()
      }
    },
    [dispatch],
  )

  React.useEffect(() => {
    console.log('PLAYER: Active song was changed', {
      activeSong,
      songClickIndex,
    })
    if (activeSong) {
      toggleSong(activeSong)
    }
  }, [activeSong, toggleSong, songClickIndex])

  const tick = React.useCallback(() => {
    // if the duration is set, and the player isn't paused,
    // and the slider isn't being moved,
    // set the slider's position dynamically
    if (
      player.current &&
      !isNaN(player.current.duration) &&
      !player.current.paused &&
      !sliderBeingSlided
    ) {
      const progress =
        (player.current.currentTime / player.current.duration) * 100
      progressBar.current.style.width = `${progress}%`
    }
    ticker = requestAnimationFrame(tick)
  }, [])

  function handleProgress() {
    let ranges = []
    for (let i = 0; i < player.current.buffered.length; i++) {
      ranges.push([
        player.current.buffered.start(i),
        player.current.buffered.end(i),
      ])
    }

    //get the current collection of spans inside the slide container
    const spans = slideContainer.current.getElementsByTagName('span')

    //then add or remove spans so we have the same number as time ranges
    while (spans.length < player.current.buffered.length) {
      const span = document.createElement('span')
      slideContainer.current.appendChild(span)
    }

    while (spans.length > player.current.buffered.length) {
      slideContainer.current.removeChild(slideContainer.current.lastChild)
    }

    for (let i = 0; i < player.current.buffered.length; i++) {
      const durationPercent = 100 / player.current.duration
      spans[i].style.left = Math.round(durationPercent * ranges[i][0]) + '%'
      spans[i].style.width =
        Math.round(durationPercent * (ranges[i][1] - ranges[i][0])) + '%'
    }
  }
  React.useEffect(() => {
    if (playerVolumeSlider.current) {
      playerVolumeSlider.current.value = String(player.current.volume * 100)
    }

    if (player.current) {
      player.current.addEventListener('playing', () => {
        dispatch({ type: 'SET_LOADING', payload: false })
        dispatch({ type: 'PLAY' })
        ticker = requestAnimationFrame(tick)
        isPlaying = true
      })
      player.current.addEventListener('timeupdate', () => {
        setCurrentTimeString(currentTimeToString(player.current.currentTime))
      })

      player.current.addEventListener('durationchange', () => {
        setDurationString(durationToString(player.current.duration))
      })

      player.current.addEventListener('progress', handleProgress, false)
      player.current.addEventListener('loadedmetadata', handleProgress, false)

      player.current.addEventListener('pause', () => {
        progressBar.current.style.width = `${
          (player.current.currentTime / player.current.duration) * 100
        }%`
        // if the player is still paused on the next animation frame, cancel the ticker
        requestAnimationFrame(() => {
          if (player.current.paused) {
            isPlaying = false
            dispatch({ type: 'PAUSE' })
            cancelAnimationFrame(ticker)
          }
        })
      })

      // I have to find a way to test this
      player.current.addEventListener('stalled', () => {
        console.log('stalled')

        dispatch({ type: 'SET_LOADING', payload: true })
      })

      player.current.addEventListener('waiting', () => {
        console.log('waiting')
        dispatch({ type: 'SET_LOADING', payload: true })
      })

      player.current.addEventListener('ended', () => {
        // playNext(true)
        isPlaying = false
      })
    }

    // Detect if AirPlay is available
    // Mac OS Safari 9+ only

    if (airPlay.current && typeof window !== 'undefined') {
      if (window.WebKitPlaybackTargetAvailabilityEvent) {
        player.current.addEventListener(
          'webkitplaybacktargetavailabilitychanged',
          (ev: Event) => {
            const event = ev as WebKitPlaybackTargetAvailabilityEvent
            switch (event.availability) {
              case 'available':
                airPlay.current.style.display = 'inline-block'
                break

              default:
            }
            airPlay.current.addEventListener('click', function () {
              player.current.webkitShowPlaybackTargetPicker()
            })
          },
        )
      } else {
        airPlay.current.style.display = 'none'
      }
    }
  }, [dispatch, activeSong, tick])

  React.useEffect(() => {
    const initializeHammer = async () => {
      if (!slideContainer.current) {
        return
      }

      const HammerModule = (await import('hammerjs')).default
      const hammerInstance = new HammerModule(slideContainer.current!)

      hammerInstance.on('pan press tap pressup', (ev: any) => {
        cancelAnimationFrame(ticker)
        sliderBeingSlided = true
        playSlider.current!.classList.add('activePlaySlider')
        const xPos = ev.center.x - slideContainer.current!.offsetLeft
        progressBar.current!.style.width = `${xPos}px`
        if (ev.isFinal) {
          const timeRemaining =
            (xPos / slideContainer.current!.offsetWidth) *
            player.current!.duration
          player.current!.currentTime = timeRemaining
          ticker = requestAnimationFrame(tick)
          playSlider.current!.classList.remove('activePlaySlider')
          sliderBeingSlided = false
        }
      })

      // Clean up the Hammer instance on component unmount
      return () => {
        hammerInstance.off('pan press tap pressup')
        hammerInstance.destroy()
      }
    }

    const hammerSetupInterval = setInterval(() => {
      if (slideContainer.current) {
        clearInterval(hammerSetupInterval)
        initializeHammer()
      }
    }, 100)

    // Clear interval on component unmount
    return () => {
      clearInterval(hammerSetupInterval)
    }
  }, [tick])

  if (!activeSong) {
    return null
  }

  return (
    <div className="fixed bottom-0 bg-slate-400 w-full p-4">
      <audio id={styles.player} ref={player} preload="auto"></audio>
      <div id={styles.slideContainerContainer}>
        <div ref={slideContainer} id={styles.slideContainer}>
          <div ref={progressBar} id={styles.progressBar}>
            <div ref={playSlider} className={styles.playSlider}></div>
          </div>
        </div>
      </div>

      <div id={styles.timeDisplay}>
        <table>
          <tbody>
            <tr>
              <td className="title-cell">
                <span className="song-time">
                  {currentTimeString} / {durationString}
                </span>
                <span className="song-title">{activeSong.title}</span>
                {activeSong.album && (
                  <span>
                    •
                    <Link
                      className="album-title"
                      href={`/albums/${activeSong.album.slug.current}`}
                    >
                      {activeSong.album.title}
                    </Link>
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id={styles.playerControls}>
        <table>
          <tbody>
            <tr>
              <td
                className={cx('previous', {
                  'first-song-active': songIndex() === 0,
                })}
              >
                <Image
                  src="/previous-icon.svg"
                  alt="Previous"
                  unoptimized
                  width={36}
                  height={36}
                />
              </td>
              <td
                id="playerToggle"
                onClick={() => {
                  toggleSong(activeSong)
                }}
              >
                {!isLoading && !isPlaying && (
                  <Image
                    src="/play-icon.svg"
                    alt="Play"
                    className="play"
                    unoptimized
                    width={36}
                    height={34}
                  />
                )}
                {!isLoading && isPlaying && (
                  <Image
                    src="/pause-icon.svg"
                    alt="Pause"
                    className="pause"
                    unoptimized
                    width={36}
                    height={34}
                  />
                )}
                {isLoading && (
                  <Image
                    src="/spinner-icon.svg"
                    alt="Loading"
                    className="spinner"
                    unoptimized
                    width={36}
                    height={34}
                  />
                )}
              </td>
              <td
                className={cx('next', {
                  'last-song-active': playlist.length === songIndex() + 1,
                })}
              >
                <Image
                  src="/next-icon.svg"
                  alt="Next"
                  unoptimized
                  width={36}
                  height={36}
                />
              </td>
              <td className="volume-cell">
                {isIOS() ? (
                  <span ref={airPlay} id="airPlay">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                        fill="white"
                      />
                    </svg>
                  </span>
                ) : (
                  <div className="flex flex-row gap-4">
                    <Image
                      src="/volume_down.svg"
                      alt="volume down"
                      width={18}
                      height={18}
                      unoptimized
                    />
                    <input
                      // input={setVolume}
                      ref={playerVolumeSlider}
                      type="range"
                      min="0"
                      max="100"
                    />
                    <Image
                      src="/volume_up.svg"
                      alt="volume up"
                      width={18}
                      height={18}
                      unoptimized
                    />
                  </div>
                )}
                &nbsp; &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
