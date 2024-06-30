import React from 'react'

export const useCurrentTimeAndDuration = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)

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

    player.addEventListener('timeupdate', updateCurrentTime)
    player.addEventListener('loadedmetadata', updateDuration)

    return () => {
      player.removeEventListener('timeupdate', updateCurrentTime)
      player.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [audioRef])

  return { currentTime, duration }
}
