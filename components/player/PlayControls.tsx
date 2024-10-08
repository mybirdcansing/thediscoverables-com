import cx from 'classnames'
import Image from 'next/image'
import React from 'react'

import styles from './PlayerControls.module.css'

interface PlayControlsProps {
  isPlaying: boolean
  isLoading: boolean
  toggleSong: (e: React.MouseEvent) => void
  playPrevious: (e: React.MouseEvent) => void
  playNext: (e: React.MouseEvent) => void
  songIndex?: number
  playlistLength?: number
}

export const PlayControls = ({
  isPlaying,
  isLoading,
  toggleSong,
  playPrevious,
  playNext,
}: PlayControlsProps) => {
  return (
    <div
      className={cx(
        styles['player-controls'],
        'flex flex-row justify-center relative',
      )}
    >
      <button className="hidden xs:block" onClick={playPrevious}>
        <Image src="/previous-icon.svg" alt="Previous" width={46} height={46} />
      </button>
      <button onClick={toggleSong}>
        {!isLoading && !isPlaying && (
          <Image
            src="/play-icon.svg"
            alt="Play"
            className="play"
            width={46}
            height={46}
          />
        )}
        {!isLoading && isPlaying && (
          <Image
            src="/pause-icon.svg"
            alt="Pause"
            className="pause"
            width={46}
            height={46}
          />
        )}
        {isLoading && (
          <Image
            src="/spinner-icon.svg"
            alt="Loading"
            className="spinner"
            width={46}
            height={46}
          />
        )}
      </button>
      <button onClick={playNext}>
        <Image
          src="/next-icon.svg"
          alt="Next"
          unoptimized
          width={46}
          height={46}
        />
      </button>
    </div>
  )
}
