// __tests__/pages/page.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import RootLayout from '../../app/layout'
import Page from '../../app/page'
import { homepageFixture } from './fixtures/homepageFixture'
import { settingsFixture } from './fixtures/settingsFixture'

// Mock Sanity client and getters to return fixtures
vi.mock('../../lib/hooks/useSanityClient', () => ({
  useSanityClient: () => ({
    fetch: vi.fn((query: string) => {
      if (query.includes('homepage')) return Promise.resolve(homepageFixture)
      if (query.includes('settings')) return Promise.resolve(settingsFixture)
      return Promise.resolve({})
    }),
  }),
}))

vi.mock('../../lib/sanity.getters', () => ({
  getHomepage: () => Promise.resolve(homepageFixture),
  getSettings: () => Promise.resolve(settingsFixture),
}))

import * as nextHeaders from 'next/headers'

// Define a draft mode mock with enable and disable methods
const mockDraftMode = () => ({
  isEnabled: false,
  enable() {
    this.isEnabled = true
  },
  disable() {
    this.isEnabled = false
  },
})

vi.mock('next/headers', () => ({
  draftMode: vi.fn(() => mockDraftMode()),
}))

describe('Page with RootLayout component', () => {
  const TestWrapper = async () => {
    return <RootLayout>{await Page()}</RootLayout>
  }

  it('renders the Homepage component within the RootLayout', async () => {
    render(await TestWrapper())

    await waitFor(() => {
      expect(screen.getByText('Albums')).toBeTruthy()
    })
  })

  it('renders the PreviewHomepage component within the RootLayout when in draft mode', async () => {
    const draftModeInstance = mockDraftMode()
    draftModeInstance.enable()

    vi.mocked(nextHeaders.draftMode).mockReturnValueOnce(draftModeInstance)

    render(await TestWrapper())

    await waitFor(() => {
      // Use a flexible matcher function
      const previewElement = screen.getByText((content, element) => {
        const hasText = (text: string) => text.includes('Albums')
        const elementHasText = hasText(content)
        const childrenDontHaveText = Array.from(element?.children || []).every(
          (child) => !hasText(child.textContent || ''),
        )
        return elementHasText && childrenDontHaveText
      })

      expect(previewElement).toBeTruthy()
    })
  })

  it('renders VisualEditingView when in draft mode', async () => {
    const draftModeInstance = mockDraftMode()
    draftModeInstance.enable()

    vi.mocked(nextHeaders.draftMode).mockReturnValue(draftModeInstance)

    render(await TestWrapper())

    await waitFor(() => {
      expect(screen.getByTestId('visual-editing')).toBeTruthy()
    })
  })

  it('uses the settings data within the SettingsProvider', async () => {
    render(await TestWrapper())

    await waitFor(() => {
      expect(screen.queryByText('The Discoverables')).toBeTruthy()
    })
  })
})
