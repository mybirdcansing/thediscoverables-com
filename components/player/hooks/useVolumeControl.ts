import React from 'react'

export const useVolumeControl = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  playerVolumeSliderRef: React.RefObject<HTMLInputElement | null>,
) => {
  const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = audioRef.current
    if (player) {
      player.volume = Number(e.target.value) / 100
    }
  }

  const adjustVolume = (change: number) => {
    const player = audioRef.current
    const playerVolumeSlider = playerVolumeSliderRef.current

    if (player && playerVolumeSlider) {
      const newVolume = Math.max(0, Math.min(1, player.volume + change))
      player.volume = newVolume
      playerVolumeSlider.value = String(newVolume * 100)
    }
  }

  const lowerVolume = () => adjustVolume(-0.1)
  const raiseVolume = () => adjustVolume(0.1)

  React.useEffect(() => {
    const player = audioRef.current
    const playerVolumeSlider = playerVolumeSliderRef.current

    if (player && playerVolumeSlider) {
      playerVolumeSlider.value = String(player.volume * 100)
    }
  }, [audioRef, playerVolumeSliderRef])

  return {
    setVolume,
    lowerVolume,
    raiseVolume,
  }
}
