import { usePlayer } from 'components/player/hooks/usePlayer'
import { PortableTextView } from 'components/PortableTextView'
import { handleInnerClick, isIOS } from 'lib/playerHelper'
import { useWindowContext } from 'lib/windowContext'
import React, { useState } from 'react'

import { AudioSlider } from './AudioSlider'
import { PlayControls } from './PlayControls'
import { PlayerDrawer } from './PlayerDrawer'
import { SongDetails } from './SongDetails'
import { SongTime } from './SongTime'
import { VolumeControl } from './VolumeControl'

export const Player = () => {
  const [isExpanded, setIsExpanded] = useState(false)

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

  const { width, height, isLandscape, scrollX, scrollY } = useWindowContext()

  if (!activeSong) {
    return null
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const drawerTabs = [
    {
      name: 'Next up',
      content: (
        <div>
          <p>Width: {width}px</p>
          <p>Height: {height}px</p>
          <p>Landscape: {isLandscape ? 'Yes' : 'No'}</p>
          <p>Scroll X: {scrollX}px</p>
          <p>Scroll Y: {scrollY}px</p>
        </div>
      ),
    },
  ]
  if (activeSong.lyrics) {
    drawerTabs.push({
      name: 'Lyrics',
      content: (
        <div className="h-[60vh] overflow-y-auto">
          <PortableTextView content={activeSong.lyrics} />
        </div>
      ),
    })
  }

  return (
    <div className="fixed bottom-0 w-full">
      <div className="bg-slate-400">
        <audio
          className="hidden absolute -left-[-2000px]"
          ref={audioRef}
          preload="auto"
        ></audio>

        <div
          onClick={toggleExpand}
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
      <div
        className="absolute w-full -z-30 bg-slate-400 max-h-[75vh] transition-[bottom,transform] duration-[350] ease-in-out"
        style={{
          bottom: isExpanded ? '100%' : '0px',
          transform: isExpanded ? 'translateY(0)' : 'translateY(100%)',
          boxShadow: '0 -4px 2px -4px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="h-[75vh]">
          <PlayerDrawer tabs={drawerTabs} />
        </div>
      </div>
    </div>
  )
}
