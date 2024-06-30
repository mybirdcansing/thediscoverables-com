import { usePlayer } from 'components/player/hooks/usePlayer'
import { isIOS } from 'lib/playerHelper'
import React from 'react'

import { AudioSlider } from './AudioSlider'
import { PlayControls } from './PlayControls'
import { SongInfo } from './SongInfo'
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
  } = usePlayer()

  if (!activeSong) {
    return null
  }

  return (
    <div className="fixed bottom-0 bg-slate-400 w-full pt-3 pb-2 px-5">
      <audio
        className="hidden absolute -left-[-2000px]"
        ref={audioRef}
        preload="auto"
      ></audio>

      <div className="flex flex-col place-content-center place-items-center gap-3">
        <AudioSlider
          audioRef={audioRef}
          currentTime={currentTime}
          duration={duration}
        />

        <SongInfo
          currentTime={currentTime}
          duration={duration}
          activeSong={activeSong}
        />
      </div>
      <div className="flex flex-col sm:flex-row place-content-center place-items-center gap-y-2 gap-x-4">
        <PlayControls
          isPlaying={isPlaying}
          isLoading={isLoading}
          toggleSong={() => toggleSong(activeSong)}
          playPrevious={playPrevious}
          playNext={() => playNext(false)}
          songIndex={songIndex()}
          playlistLength={playlist.length}
        />
        <VolumeControl
          lowerVolume={lowerVolume}
          raiseVolume={raiseVolume}
          setVolume={setVolume}
          playerVolumeSliderRef={playerVolumeSliderRef}
          isIOS={isIOS()}
          airPlayRef={airPlayRef}
        />
      </div>
    </div>
  )
}
