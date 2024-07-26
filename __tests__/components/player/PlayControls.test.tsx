import { fireEvent, render, screen } from '@testing-library/react'
import { PlayControls } from 'components/player/PlayControls'
import { beforeEach, describe, expect, test, vi } from 'vitest'

describe('PlayControls Component', () => {
  const mockToggleSong = vi.fn()
  const mockPlayPrevious = vi.fn()
  const mockPlayNext = vi.fn()

  beforeEach(() => {
    mockToggleSong.mockClear()
    mockPlayPrevious.mockClear()
    mockPlayNext.mockClear()
  })

  test('renders PlayControls component', () => {
    render(
      <PlayControls
        isPlaying={false}
        isLoading={false}
        toggleSong={mockToggleSong}
        playPrevious={mockPlayPrevious}
        playNext={mockPlayNext}
      />,
    )

    expect(screen.getByRole('button', { name: /play/i })).toBeDefined()
  })

  test('calls toggleSong on play button click', () => {
    render(
      <PlayControls
        isPlaying={false}
        isLoading={false}
        toggleSong={mockToggleSong}
        playPrevious={mockPlayPrevious}
        playNext={mockPlayNext}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /play/i }))
    expect(mockToggleSong).toHaveBeenCalled()
  })
})
