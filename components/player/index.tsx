import cx from 'classnames'
import { usePlayerContext } from 'lib/playerContext'
import { isChromeDesktop } from 'lib/playerHelper'
import { Song } from 'lib/types/content'
import React from 'react'

import Container from '../Container'
import styles from './Player.module.css'

let playPromise
let ticker

export const Player = () => {
  const playerContext = usePlayerContext()
  const { dispatch, state } = playerContext
  const { activeSong, isPlaying, playlist } = state

  const player = React.useRef<HTMLAudioElement | null>(null)
  const progressBar = React.useRef<HTMLDivElement | null>(null)
  const slideContainer = React.useRef<HTMLDivElement | null>(null)
  const playSlider = React.useRef<HTMLDivElement | null>(null)
  const [audioSrc, setAudioSrc] = React.useState()

  const toggleSong = React.useCallback(
    (song: Song) => {
      if (!activeSong) {
        return
      }
      const src = song.audioFile.asset.url
      debugger
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
    [activeSong, dispatch, isPlaying],
  )

  React.useEffect(() => {
    console.log('PLAYER: Active song was changed', activeSong?.title)
    toggleSong(activeSong)
  }, [activeSong, toggleSong])

  return (
    <div
      className={cx('fixed bottom-0 bg-slate-400 w-full p-4', {
        hidden: !activeSong,
      })}
    >
      <audio
        id={styles.player}
        ref={player}
        key={audioSrc}
        src={audioSrc}
        preload="auto"
      ></audio>

      <Container>Player Active Song: {activeSong?.title}</Container>

      <div id={styles.slideContainerContainer}>
        <div ref={slideContainer} id={styles.slideContainer}>
          <div ref={progressBar} id={styles.progressBar}>
            <div ref={playSlider} className={styles.playSlider}></div>
          </div>
        </div>
      </div>
      {/* <div id={styles.timeDisplay}>
        <table>
          <tr>
            <td class="title-cell">
              <span class="song-time"
                >{{ currentTimeString }} / {{ durationString }}</span
              >
              <span class="song-title">{{ activeSong.title }}</span>
              <span v-if="activeSong.album">
                •
                <router-link
                  class="album-title"
                  :to="'/album/' + activeSong.album.id"
                >
                  {{ activeSong.album.title }}</router-link
                >
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div id="playerControls">
        <table>
          <tr>
            <td
              @click="playPrevious"
              class="previous"
              v-bind:class="{
                'first-song-active': songIndex === 0,
              }"
            >
              <img src="../assets/previous-icon.svg" alt="Next" />
            </td>
            <td
              id="playerToggle"
              @click="toggleSong(activeSong)"
              v-bind:class="{
                loading: loading,
                playing: playing,
                paused: !playing,
              }"
            >
              <img src="../assets/play-icon.svg" alt="Play" class="play" />
              <img src="../assets/pause-icon.svg" alt="Pause" class="pause" />
              <img
                src="../assets/spinner-icon.svg"
                alt="Loading"
                class="spinner"
              />
            </td>
            <td
              @click="playNext(false)"
              class="next"
              v-bind:class="{
                'last-song-active': queue.length === songIndex + 1,
              }"
            >
              <img src="../assets/next-icon.svg" alt="Next" />
            </td>
            <td class="volume-cell">
              <span v-if="!isIOS">
                <img src="../assets/volume_down.svg" alt="volume down" />
                <input
                  @input="setVolume"
                  ref="playerVolumeSlider"
                  type="range"
                  min="0"
                  max="100"
                />
                <img src="../assets/volume_up.svg" alt="volume up" />
              </span>
              <span v-else ref="airPlay" id="airPlay">
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
              &nbsp; &nbsp;
            </td>
          </tr>
        </table>
      </div> */}
    </div>
  )
}
