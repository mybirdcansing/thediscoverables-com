import { isClient } from 'lib/playerHelper'
import React from 'react'

export const useAirPlay = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  airPlayRef: React.RefObject<HTMLSpanElement | null>,
) => {
  React.useEffect(() => {
    const player = audioRef.current
    const airPlay = airPlayRef.current

    if (!player || !airPlay || !isClient) {
      return
    }
    const airPlayClickHandler = () => {
      player.webkitShowPlaybackTargetPicker()
    }
    airPlay.addEventListener('click', airPlayClickHandler)

    const airPlayChangedHandler = (ev: Event) => {
      const event = ev as WebKitPlaybackTargetAvailabilityEvent
      if (event.availability === 'available') {
        airPlay.style.display = 'inline-block'
      } else {
        airPlay.style.display = 'none'
      }
      airPlay.addEventListener('click', () => {
        player.webkitShowPlaybackTargetPicker()
      })
    }
    if (typeof window.WebKitPlaybackTargetAvailabilityEvent === 'function') {
      player.addEventListener(
        'webkitplaybacktargetavailabilitychanged',
        airPlayChangedHandler,
      )
    } else {
      airPlay.style.display = 'none'
    }
    return () => {
      airPlay.removeEventListener('click', airPlayClickHandler)
      player.removeEventListener(
        'webkitplaybacktargetavailabilitychanged',
        airPlayChangedHandler,
      )
    }
  }, [audioRef, airPlayRef])
}
