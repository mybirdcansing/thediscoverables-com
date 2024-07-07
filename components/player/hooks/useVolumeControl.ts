import { isLocalStorageAvailable } from 'lib/localStorageHelper'
import React from 'react'

export const useVolumeControl = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  playerVolumeSliderRef: React.RefObject<HTMLInputElement | null>,
) => {
  const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value) / 100
    const player = audioRef.current
    if (player) {
      player.volume = volume
      if (isLocalStorageAvailable()) {
        localStorage.setItem('playerVolume', volume.toString())
      }
    }
  }

  const adjustVolume = (change: number) => {
    const player = audioRef.current
    const playerVolumeSlider = playerVolumeSliderRef.current

    if (player && playerVolumeSlider) {
      const newVolume = Math.max(0, Math.min(1, player.volume + change))
      player.volume = newVolume
      playerVolumeSlider.value = String(newVolume * 100)
      if (isLocalStorageAvailable()) {
        localStorage.setItem('playerVolume', newVolume.toString())
      }
    }
  }

  const lowerVolume = () => adjustVolume(-0.1)
  const raiseVolume = () => adjustVolume(0.1)

  React.useEffect(() => {
    if (isLocalStorageAvailable()) {
      const storedVolume = localStorage.getItem('playerVolume')
      const player = audioRef.current
      const playerVolumeSlider = playerVolumeSliderRef.current

      if (player && playerVolumeSlider) {
        const volume = storedVolume ? Number(storedVolume) : player.volume
        player.volume = volume
        playerVolumeSlider.value = String(volume * 100)
      }
    }
  }, [audioRef, playerVolumeSliderRef])

  return {
    setVolume,
    lowerVolume,
    raiseVolume,
  }
}
