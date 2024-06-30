// hooks/useSongNavigation.ts
import { usePlayerContext } from 'lib/playerContext'
import { isChromeDesktop } from 'lib/playerHelper'
import { Song } from 'lib/types/content'
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
    (song: Song) => {
      if (!song) {
        return
      }
      const player = audioRef.current
      const src = song.audioFile.asset.url

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

  return { toggleSong, playPrevious, playNext }
}
