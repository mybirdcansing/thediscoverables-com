import { render, screen } from '@testing-library/react'
import { AudioSlider } from 'components/player/AudioSlider'
import { describe, expect, test } from 'vitest'

describe('AudioSlider Component', () => {
  test('renders AudioSlider component', () => {
    render(
      <AudioSlider
        audioRef={{ current: null }}
        currentTime={30}
        duration={200}
      />,
    )

    expect(screen.getByRole('slider')).toBeDefined()
  })

  // Additional tests for interaction, like dragging the slider
})
