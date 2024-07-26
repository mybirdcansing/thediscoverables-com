import { screen } from '@testing-library/react'
import { usePlayer } from 'components/player/hooks/usePlayer'
import { PlayerDrawer } from 'components/player/PlayerDrawer'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { render } from '../../testUtils'

vi.mock('components/player/hooks/usePlayer')

const mockUsePlayer = usePlayer as ReturnType<typeof vi.fn>

describe('PlayerDrawer Component', () => {
  const activeSong = {
    title: 'Test Song',
    bandName: 'Test Band',
    album: {
      title: 'Test Album',
      slug: { current: 'test-album' },
      coverImage: { asset: { url: 'test-url' } },
      publishDate: '2023-01-01',
    },
  }
  beforeEach(() => {
    mockUsePlayer.mockReturnValue({
      activeSong: activeSong,
      playlist: [activeSong],
      isDrawerExpanded: true,
      toggleExpandDrawer: vi.fn(),
    })
  })

  test('renders PlayerDrawer component', () => {
    render(<PlayerDrawer />)

    expect(screen.getByText('Test Song')).toBeDefined()
  })
})
