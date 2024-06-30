// components/SongInfo.tsx
import { currentTimeToString, durationToString } from 'lib/playerHelper'
import Link from 'next/link'
import React from 'react'

interface SongInfoProps {
  currentTime: number
  duration: number
  activeSong: any
}

export const SongInfo = ({
  currentTime,
  duration,
  activeSong,
}: SongInfoProps) => {
  return (
    <div className="flex flex-row justify-center gap-2">
      <span className="song-time">
        {currentTimeToString(currentTime)} / {durationToString(duration)}
      </span>
      <span>{activeSong.title}</span>
      {activeSong.album && (
        <>
          <span>•</span>
          <Link href={`/albums/${activeSong.album.slug.current}`}>
            {activeSong.album.title}
          </Link>
        </>
      )}
    </div>
  )
}
