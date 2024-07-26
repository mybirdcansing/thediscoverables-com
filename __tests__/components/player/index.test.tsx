import { fireEvent, screen } from '@testing-library/react'
import { Player } from 'components/player'
import { usePlayer } from 'components/player/hooks/usePlayer'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { render } from '../../testUtils'

// Mock the usePlayer hook to control its return values
vi.mock('components/player/hooks/usePlayer')

const mockUsePlayer = usePlayer as ReturnType<typeof vi.fn>

describe('Player Component Tests', () => {
  beforeEach(() => {
    mockUsePlayer.mockReturnValue({
      activeSong: {
        title: 'Test Song',
        bandName: 'Test Band',
        album: {
          title: 'Test Album',
          slug: { current: 'test-album' },
          coverImage: { asset: { url: 'test-url' } },
          publishDate: '2023-01-01',
        },
        audioFile: { asset: { url: 'test-audio-url' } },
      },
      isPlaying: false,
      isLoading: false,
      currentTime: 0,
      duration: 200,
      audioRef: { current: null },
      airPlayRef: { current: null },
      playerVolumeSliderRef: { current: null },
      isDrawerExpanded: false,
      toggleSong: vi.fn(),
      setVolume: vi.fn(),
      lowerVolume: vi.fn(),
      raiseVolume: vi.fn(),
      playPrevious: vi.fn(),
      playNext: vi.fn(),
      toggleExpandDrawer: vi.fn(),
    })
  })

  test('renders player with active song', () => {
    render(<Player />)

    expect(screen.getAllByText('Test Band')).toBeTruthy()
    expect(screen.getByText('Test Song')).toBeTruthy()
  })

  test('toggles song playback', () => {
    const toggleSongMock = vi.fn()
    mockUsePlayer.mockReturnValue({
      ...mockUsePlayer(),
      toggleSong: toggleSongMock,
      isPlaying: true,
    })

    render(<Player />)
    fireEvent.click(screen.getByRole('button', { name: /pause/i }))
    expect(toggleSongMock).toHaveBeenCalled()
  })

  test('displays correct song duration and current time', () => {
    render(<Player />)
    expect(screen.getByText('0:00 / 3:20')).toBeTruthy()
  })
})
