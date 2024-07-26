import { fireEvent, screen } from '@testing-library/react'
import { ToggleDrawerButton } from 'components/player/ToggleDrawerButton'
import { describe, expect, test, vi } from 'vitest'

import { render } from '../../testUtils'

describe('ToggleDrawerButton Component', () => {
  const mockToggleExpandDrawer = vi.fn()

  test('renders ToggleDrawerButton component', () => {
    render(
      <ToggleDrawerButton
        toggleExpandDrawer={mockToggleExpandDrawer}
        isDrawerExpanded={false}
      />,
    )

    expect(screen.getByRole('button')).toBeDefined()
  })

  test('calls toggleExpandDrawer on button click', () => {
    render(
      <ToggleDrawerButton
        toggleExpandDrawer={mockToggleExpandDrawer}
        isDrawerExpanded={false}
      />,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(mockToggleExpandDrawer).toHaveBeenCalled()
  })
})
