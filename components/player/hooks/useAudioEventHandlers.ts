// hooks/useAudioEventHandlers.ts
import { usePlayerContext } from 'lib/playerContext'
import React from 'react'

export const useAudioEventHandlers = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  playNext: (loop: boolean) => void,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { dispatch } = usePlayerContext()

  React.useEffect(() => {
    const player = audioRef.current

    if (!player) {
      return
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
      setIsPlaying(true)
    }

    const handlePause = () => {
      requestAnimationFrame(() => {
        if (player.paused) {
          setIsPlaying(false)
          dispatch({ type: 'PAUSE' })
        }
      })
    }

    const handleEnded = () => {
      playNext(true)
      setIsPlaying(false)
    }

    player.addEventListener('playing', handlePlaying)
    player.addEventListener('pause', handlePause)
    player.addEventListener('stalled', handleStalled)
    player.addEventListener('waiting', handleWaiting)
    player.addEventListener('ended', handleEnded)

    return () => {
      player.removeEventListener('playing', handlePlaying)
      player.removeEventListener('pause', handlePause)
      player.removeEventListener('stalled', handleStalled)
      player.removeEventListener('waiting', handleWaiting)
      player.removeEventListener('ended', handleEnded)
    }
  }, [dispatch, playNext, audioRef, setIsPlaying])
}
