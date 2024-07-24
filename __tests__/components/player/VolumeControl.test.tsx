import { screen } from '@testing-library/react'
import { VolumeControl } from 'components/player/VolumeControl'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { render } from '../../testUtils'

describe('VolumeControl Component', () => {
  const mockSetVolume = vi.fn()
  const mockLowerVolume = vi.fn()
  const mockRaiseVolume = vi.fn()
  const playerVolumeSliderRef = { current: document.createElement('input') }
  const airPlayRef = { current: null }

  // Set the viewport width to be greater than the md breakpoint
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    window.dispatchEvent(new Event('resize'))
  })

  test('renders VolumeControl component', () => {
    render(
      <VolumeControl
        setVolume={mockSetVolume}
        lowerVolume={mockLowerVolume}
        raiseVolume={mockRaiseVolume}
        playerVolumeSliderRef={playerVolumeSliderRef}
        isIOS={false}
        airPlayRef={airPlayRef}
      />,
    )

    expect(screen.getByAltText('volume down')).toBeDefined()
    expect(screen.getByAltText('volume up')).toBeDefined()
    expect(screen.getByTestId('volumeSlider')).toBeDefined()
  })

  //   test('calls setVolume on slider change', () => {
  //     render(
  //       <VolumeControl
  //         setVolume={mockSetVolume}
  //         lowerVolume={mockLowerVolume}
  //         raiseVolume={mockRaiseVolume}
  //         playerVolumeSliderRef={playerVolumeSliderRef}
  //         isIOS={false}
  //         airPlayRef={airPlayRef}
  //       />,
  //     )

  //     const volumeSlider = screen.getByTestId('volumeSlider') as HTMLInputElement
  //     volumeSlider.value = '0.5'
  //     fireEvent.change(volumeSlider)
  //     expect(mockSetVolume).toHaveBeenCalled()
  //   })
})
