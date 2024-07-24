import { currentTimeToString, durationToString } from 'lib/playerHelper'
import React from 'react'

interface SongTimeProps {
  currentTime: number
  duration: number
}

export const SongTime = ({ currentTime, duration }: SongTimeProps) => {
  console.log({
    currentTime,
    currentTimeToString: currentTimeToString(currentTime),
  })

  return (
    <div className="flex flex-row justify-center gap-2">
      <span className="text-xs">
        {currentTimeToString(currentTime)} / {durationToString(duration)}
      </span>
    </div>
  )
}
