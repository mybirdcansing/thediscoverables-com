import { fireEvent, render } from '@testing-library/react'
import { VolumeControl } from 'components/player/VolumeControl'
import { Breakpoints } from 'lib/breakpoints'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

// Mock the useWindowContext hook
vi.mock('lib/windowContext', () => ({
  useWindowContext: () => ({ width: Breakpoints.md }),
}))

describe('VolumeControl', () => {
  const lowerVolume = vi.fn()
  const raiseVolume = vi.fn()
  const setVolume = vi.fn()
  const playerVolumeSliderRef = React.createRef<HTMLInputElement>()
  const airPlayRef = React.createRef<HTMLSpanElement>()
  const isIOS = false

  it('fires onChange event', () => {
    const { getByTestId } = render(
      <VolumeControl
        lowerVolume={lowerVolume}
        raiseVolume={raiseVolume}
        setVolume={setVolume}
        playerVolumeSliderRef={playerVolumeSliderRef}
        isIOS={isIOS}
        airPlayRef={airPlayRef}
      />,
    )

    const slider = getByTestId('volumeSlider') as HTMLInputElement
    slider.value = '50'
    fireEvent.change(slider, { target: { value: '40' } })

    expect(setVolume).toHaveBeenCalledTimes(1)
    expect(setVolume).toHaveBeenCalledWith(expect.any(Object))
  })

  it('calls lowerVolume when the lower volume button is clicked', () => {
    const { getByAltText } = render(
      <VolumeControl
        lowerVolume={lowerVolume}
        raiseVolume={raiseVolume}
        setVolume={setVolume}
        playerVolumeSliderRef={playerVolumeSliderRef}
        isIOS={isIOS}
        airPlayRef={airPlayRef}
      />,
    )

    const lowerVolumeButton = getByAltText('volume down')
    fireEvent.click(lowerVolumeButton)

    expect(lowerVolume).toHaveBeenCalledTimes(1)
  })

  it('calls raiseVolume when the raise volume button is clicked', () => {
    const { getByAltText } = render(
      <VolumeControl
        lowerVolume={lowerVolume}
        raiseVolume={raiseVolume}
        setVolume={setVolume}
        playerVolumeSliderRef={playerVolumeSliderRef}
        isIOS={isIOS}
        airPlayRef={airPlayRef}
      />,
    )

    const raiseVolumeButton = getByAltText('volume up')
    fireEvent.click(raiseVolumeButton)

    expect(raiseVolume).toHaveBeenCalledTimes(1)
  })

  it('renders AirPlay icon on iOS devices when width is greater than Breakpoints.xs', () => {
    vi.mock('lib/windowContext', () => ({
      useWindowContext: () => ({ width: Breakpoints.md }),
    }))

    const { getByTestId } = render(
      <VolumeControl
        lowerVolume={lowerVolume}
        raiseVolume={raiseVolume}
        setVolume={setVolume}
        playerVolumeSliderRef={playerVolumeSliderRef}
        isIOS={true}
        airPlayRef={airPlayRef}
      />,
    )

    const airPlayIcon = getByTestId('airplayIcon')
    expect(airPlayIcon).toBeTruthy()
  })
})
