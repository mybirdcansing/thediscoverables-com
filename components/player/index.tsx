import { usePlayer } from 'components/player/hooks/usePlayer'
import { handleInnerClick, isIOS } from 'lib/playerHelper'
import React from 'react'

import { AudioSlider } from './AudioSlider'
import { PlayControls } from './PlayControls'
import { SongDetails } from './SongDetails'
import { SongTime } from './SongTime'
import { ToggleDrawerButton } from './ToggleDrawerButton'
import { VolumeControl } from './VolumeControl'

export const Player = () => {
  const {
    activeSong,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    audioRef,
    airPlayRef,
    playerVolumeSliderRef,
    isDrawerExpanded,
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
    <div
      id="player-bar"
      className="fixed bottom-0 w-full h-full z-50 max-h-[82px] min-h-[82px] flex flex-col"
    >
      <audio
        className="hidden absolute -left-[-2000px]"
        ref={audioRef}
        preload="auto"
      ></audio>

      <div onClick={toggleExpandDrawer} className="flex flex-col w-full h-full">
        <AudioSlider
          audioRef={audioRef}
          currentTime={currentTime}
          duration={duration}
        />

        <div className="flex-grow flex items-center justify-center">
          <div className="w-full flex flex-row justify-between items-center px-3">
            <div className="flex flex-row items-center order-3 md:order-1 gap-2">
              <PlayControls
                isPlaying={isPlaying}
                isLoading={isLoading}
                toggleSong={(e) => {
                  toggleSong(activeSong, e)
                }}
                playPrevious={playPrevious}
                playNext={(e) => {
                  playNext(true, e)
                }}
              />
              <div className="hidden lg:block">
                <SongTime currentTime={currentTime} duration={duration} />
              </div>
              <div className="block md:hidden">
                <ToggleDrawerButton
                  toggleExpandDrawer={toggleExpandDrawer}
                  isDrawerExpanded={isDrawerExpanded}
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <SongDetails activeSong={activeSong} />
            </div>
            <div className="order-2 md:order-3 flex flex-row gap-6">
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
              <div className="md:block hidden">
                <ToggleDrawerButton
                  toggleExpandDrawer={toggleExpandDrawer}
                  isDrawerExpanded={isDrawerExpanded}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
