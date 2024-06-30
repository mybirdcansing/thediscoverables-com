import cx from 'classnames'
import { usePlayer } from 'lib/hooks/usePlayer'
import { currentTimeToString, durationToString, isIOS } from 'lib/playerHelper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { AudioSlider } from './AudioSlider'
import styles from './Player.module.css'

export const Player = () => {
  const {
    activeSong,
    isPlaying,
    playlist,
    isLoading,
    currentTime,
    duration,
    audioRef,
    airPlayRef,
    playerVolumeSliderRef,
    songIndex,
    toggleSong,
    setVolume,
    lowerVolume,
    raiseVolume,
    playPrevious,
    playNext,
  } = usePlayer()

  if (!activeSong) {
    return null
  }

  return (
    <div className="fixed bottom-0 bg-slate-400 w-full p-1.5">
      <audio id={styles.player} ref={audioRef} preload="auto"></audio>

      <AudioSlider
        audioRef={audioRef}
        currentTime={currentTime}
        duration={duration}
      />

      <div className="flex flex-row justify-center gap-2 mt-2">
        <span className="song-time">
          {currentTimeToString(currentTime)} / {durationToString(duration)}
        </span>
        <span>{activeSong.title}</span>
        {activeSong.album && (
          <span>
            •
            <Link
              className="album-title"
              href={`/albums/${activeSong.album.slug.current}`}
            >
              {activeSong.album.title}
            </Link>
          </span>
        )}
      </div>
      <div id={styles.playerControls}>
        <button
          className={cx('previous', {
            [styles['first-song-active']]: songIndex() === 0,
          })}
          onClick={playPrevious}
        >
          <Image
            src="/previous-icon.svg"
            alt="Previous"
            unoptimized
            width={36}
            height={36}
          />
        </button>
        <button
          id="playerToggle"
          onClick={() => {
            toggleSong(activeSong)
          }}
        >
          {!isLoading && !isPlaying && (
            <Image
              src="/play-icon.svg"
              alt="Play"
              className="play"
              unoptimized
              width={36}
              height={34}
            />
          )}
          {!isLoading && isPlaying && (
            <Image
              src="/pause-icon.svg"
              alt="Pause"
              className="pause"
              unoptimized
              width={36}
              height={34}
            />
          )}
          {isLoading && (
            <Image
              src="/spinner-icon.svg"
              alt="Loading"
              className="spinner"
              unoptimized
              width={36}
              height={34}
            />
          )}
        </button>
        <button
          className={cx('next', {
            [styles['last-song-active']]: playlist.length === songIndex() + 1,
          })}
          onClick={() => {
            playNext(false)
          }}
        >
          <Image
            src="/next-icon.svg"
            alt="Next"
            unoptimized
            width={36}
            height={36}
          />
        </button>
        <div className={styles.volume}>
          {isIOS() ? (
            <span ref={airPlayRef} id="airPlay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                  fill="white"
                />
              </svg>
            </span>
          ) : (
            <div className="flex flex-row gap-4">
              <button onClick={lowerVolume}>
                <Image
                  src="/volume_down.svg"
                  alt="volume down"
                  width={18}
                  height={18}
                  unoptimized
                />
              </button>
              <input
                onInput={setVolume}
                ref={playerVolumeSliderRef}
                type="range"
                min="0"
                max="100"
              />
              <button onClick={raiseVolume}>
                <Image
                  src="/volume_up.svg"
                  alt="volume up"
                  width={18}
                  height={18}
                  unoptimized
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
