import { usePlayer } from 'components/player/hooks/usePlayer'
import { handleInnerClick, isIOS } from 'lib/playerHelper'
import React from 'react'

import { AudioSlider } from './AudioSlider'
import { PlayControls } from './PlayControls'
import { PlayerDrawer } from './PlayerDrawer'
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
    <>
      <PlayerDrawer />
      <div
        id="player-bar"
        className="fixed bottom-0 z-50 flex size-full max-h-[82px] min-h-[82px] flex-col"
      >
        <audio
          className="absolute left-[-2000px] hidden"
          ref={audioRef}
          preload="auto"
        ></audio>

        <div onClick={toggleExpandDrawer} className="flex size-full flex-col">
          <AudioSlider
            audioRef={audioRef}
            currentTime={currentTime}
            duration={duration}
          />

          <div className="flex grow items-center justify-center">
            <div className="flex w-full flex-row items-center justify-between px-3">
              <div className="order-3 flex flex-row items-center gap-2 md:order-1">
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
              <div className="order-2 flex flex-row gap-6 md:order-3">
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
                <div className="hidden md:block">
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
    </>
  )
}
