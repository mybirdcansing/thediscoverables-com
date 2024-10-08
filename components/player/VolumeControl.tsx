import { Breakpoints } from 'lib/breakpoints'
import { handleInnerClick } from 'lib/playerHelper'
import { useWindowContext } from 'lib/windowContext'
import Image from 'next/image'
import React from 'react'

interface VolumeControlProps {
  lowerVolume: (e: React.MouseEvent) => void
  raiseVolume: (e: React.MouseEvent) => void
  setVolume: (e: React.ChangeEvent<HTMLInputElement>) => void
  playerVolumeSliderRef: React.RefObject<HTMLInputElement>
  isIOS: boolean
  airPlayRef: React.RefObject<HTMLSpanElement>
}

export const VolumeControl = ({
  lowerVolume,
  raiseVolume,
  setVolume,
  playerVolumeSliderRef,
  isIOS,
  airPlayRef,
}: VolumeControlProps) => {
  const { width } = useWindowContext()

  if (isIOS && width > Breakpoints.xs) {
    return (
      <span ref={airPlayRef} data-testId="airplayIcon">
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
    )
  }

  return (
    <div className="md:flex flex-row gap-2 hidden">
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
        onChange={setVolume}
        onClick={handleInnerClick}
        ref={playerVolumeSliderRef}
        type="range"
        min="0"
        max="100"
        role="slider"
        data-testid="volumeSlider"
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
  )
}
