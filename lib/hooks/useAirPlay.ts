import React from 'react'

export const useAirPlay = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  airPlayRef: React.RefObject<HTMLSpanElement | null>,
) => {
  React.useEffect(() => {
    const player = audioRef.current
    const airPlay = airPlayRef.current

    if (!player || !airPlay || typeof window === 'undefined') {
      return
    }

    if (window.WebKitPlaybackTargetAvailabilityEvent) {
      player.addEventListener(
        'webkitplaybacktargetavailabilitychanged',
        (ev: Event) => {
          const event = ev as WebKitPlaybackTargetAvailabilityEvent
          if (event.availability === 'available') {
            airPlay.style.display = 'inline-block'
          } else {
            airPlay.style.display = 'none'
          }
          airPlay.addEventListener('click', () => {
            player.webkitShowPlaybackTargetPicker()
          })
        },
      )
    } else {
      airPlay.style.display = 'none'
    }
  }, [audioRef, airPlayRef])
}
