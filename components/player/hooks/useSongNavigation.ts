// hooks/useSongNavigation.ts
import { usePlayerContext } from 'lib/playerContext'
import { handleInnerClick, isChromeDesktop } from 'lib/playerHelper'
import { Song } from 'lib/types/song'
import React from 'react'

let playPromise: Promise<void> | undefined

export const useSongNavigation = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  playlist: Song[],
  songIndex: () => number,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { dispatch } = usePlayerContext()

  const toggleSong = React.useCallback(
    (song: Song, e?: React.MouseEvent) => {
      if (e) {
        handleInnerClick(e)
      }
      if (!song) {
        return
      }
      const player = audioRef.current
      const src = song.audioFile?.asset.url
      if (!player || !src) {
        return
      }

      if (player.src !== src) {
        dispatch({ type: 'SET_LOADING', payload: true })
        player.pause()
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
        setIsPlaying(true)
      } else if (player.paused) {
        playPromise = player.play()
        setIsPlaying(true)
      } else {
        playPromise?.then(() => {
          player.pause()
          setIsPlaying(false)
        })
      }
    },
    [dispatch, audioRef, setIsPlaying],
  )

  const playPrevious = React.useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        handleInnerClick(e)
      }
      const activeSongIndex = songIndex()
      const playlistLength = playlist.length
      if (
        !playlistLength ||
        activeSongIndex < 0 ||
        activeSongIndex >= playlist.length
      ) {
        return
      }
      const index = activeSongIndex === 0 ? 0 : activeSongIndex - 1
      dispatch({
        type: 'SET_ACTIVE_SONG',
        payload: {
          song: playlist[index],
        },
      })
    },
    [dispatch, playlist, songIndex],
  )

  const playNext = React.useCallback(
    (loop: boolean, e?: React.MouseEvent) => {
      if (e) {
        handleInnerClick(e)
      }
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

  return { toggleSong, playPrevious, playNext }
}
