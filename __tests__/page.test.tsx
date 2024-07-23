import { render, screen } from '@testing-library/react'
import {
  AlbumViewProps,
  HomepageProps,
  SharedPageProps,
  WithSettings,
} from 'lib/types/pages'
import { Router } from 'next/router'
import App from 'pages/_app'
import AlbumPage, {
  getStaticProps as getAlbumPageProps,
} from 'pages/albums/[slug]'
import Homepage, { getStaticProps as getHomepageProps } from 'pages/index'
import { expect, test } from 'vitest'

const createMockRouter = (options?: Partial<Router>) =>
  options ? (options as Router) : ({} as Router)

const renderWithApp = async <P extends SharedPageProps>(
  Component: React.ComponentType<P>,
  props: P,
  routerOptions?: Partial<Router>,
) => {
  const mockRouter = createMockRouter(routerOptions)

  render(
    <App Component={Component} pageProps={{ ...props }} router={mockRouter} />,
  )
}

test('Homepage renders without crashing and contains expected content', async () => {
  const { props } = (await getHomepageProps({ draftMode: false })) as {
    props: HomepageProps & WithSettings
  }
  await renderWithApp(Homepage, props)

  expect(screen.getByText('The Discoverables')).toBeDefined()
  expect(screen.getAllByText('Running In Place').length).toBe(5)
  expect(screen.getByText('Albums')).toBeDefined()
  expect(screen.getByText('Songs')).toBeDefined()
})

test('Album page renders without crashing and contains expected content', async () => {
  const { props } = (await getAlbumPageProps({
    draftMode: false,
    params: { slug: 'running-in-place' },
  })) as {
    props: AlbumViewProps & WithSettings
  }
  await renderWithApp(AlbumPage, props, { pathname: '/album/running-in-place' })

  expect(screen.getByText('The Discoverables')).toBeDefined()
  expect(screen.getAllByText('Running In Place').length).toBe(2)
})
