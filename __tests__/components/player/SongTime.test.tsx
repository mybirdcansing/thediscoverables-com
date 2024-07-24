import { render, screen } from '@testing-library/react'
import { SongTime } from 'components/player/SongTime'
import { describe, expect, test } from 'vitest'

describe('SongTime Component', () => {
  test('renders SongTime component with correct time format', () => {
    render(<SongTime currentTime={30} duration={200} />)

    expect(screen.getByText('0:30 / 3:20')).toBeDefined()
  })
})
