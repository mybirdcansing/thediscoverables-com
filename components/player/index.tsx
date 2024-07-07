import { usePlayer } from 'components/player/hooks/usePlayer'
import { handleInnerClick, isIOS } from 'lib/playerHelper'
import React from 'react'

import { AudioSlider } from './AudioSlider'
import { PlayControls } from './PlayControls'
import { SongDetails } from './SongDetails'
import { SongTime } from './SongTime'
import { VolumeControl } from './VolumeControl'

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
    toggleExpandDrawer,
  } = usePlayer()

  if (!activeSong) {
    return null
  }

  return (
    <div className="fixed bottom-0 w-full z-50">
      <div className="bg-slate-400">
        <audio
          className="hidden absolute -left-[-2000px]"
          ref={audioRef}
          preload="auto"
        ></audio>

        <div
          onClick={toggleExpandDrawer}
          className="flex flex-col place-content-center place-items-center pb-2 relative cursor-default w-full"
        >
          <div className="w-full">
            <AudioSlider
              audioRef={audioRef}
              currentTime={currentTime}
              duration={duration}
            />
          </div>
          <div className="w-full flex flex-row justify-between place-items-center p-2 mt-1">
            <div className="flex flex-row place-items-center">
              <PlayControls
                isPlaying={isPlaying}
                isLoading={isLoading}
                toggleSong={(e) => {
                  toggleSong(activeSong, e)
                }}
                playPrevious={playPrevious}
                playNext={(e) => {
                  playNext(false, e)
                }}
                songIndex={songIndex()}
                playlistLength={playlist.length}
              />
              <SongTime currentTime={currentTime} duration={duration} />
            </div>
            <SongDetails activeSong={activeSong} />

            <VolumeControl
              lowerVolume={(e) => {
                lowerVolume()
                handleInnerClick(e)
              }}
              raiseVolume={(e) => {
                raiseVolume()
                handleInnerClick(e)
              }}
              setVolume={setVolume}
              playerVolumeSliderRef={playerVolumeSliderRef}
              isIOS={isIOS()}
              airPlayRef={airPlayRef}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
