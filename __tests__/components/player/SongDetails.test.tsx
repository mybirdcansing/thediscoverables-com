import { render, screen } from '@testing-library/react'
import { SongDetails } from 'components/player/SongDetails'
import { describe, expect, test } from 'vitest'

describe('SongDetails Component', () => {
  test('renders SongDetails component', () => {
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

    render(<SongDetails activeSong={activeSong} />)

    expect(screen.getByText('Test Song')).toBeDefined()
    expect(screen.getAllByText('Test Band')).toBeDefined()
  })
})
