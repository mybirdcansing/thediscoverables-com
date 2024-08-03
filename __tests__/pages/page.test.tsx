// import { screen } from '@testing-library/react'
// import { AlbumViewProps, HomepageProps, WithSettings } from 'lib/types/pages'
// import AlbumPage, {
//   getStaticProps as getAlbumPageProps,
// } from 'pages/albums2/[slug]'
// import Homepage, { getStaticProps as getHomepageProps } from 'pages/index'
// import { describe, expect, test } from 'vitest'

// import { Settings } from "lib/types/settings";

// import { renderWithApp } from '../testUtils'

// export interface WithSettings {
//   settings: Settings
// }

// describe('Page Tests', () => {
//   test('Homepage renders without crashing and contains expected content', async () => {
//     const { props } = (await getHomepageProps({ draftMode: false })) as {
//       props: HomepageProps & WithSettings
//     }
//     await renderWithApp(Homepage, props)

//     expect(screen.getByText('The Discoverables')).toBeDefined()
//     expect(screen.getAllByText('Running In Place').length).toBeGreaterThan(3)
//     expect(screen.getByText('Albums')).toBeDefined()
//     expect(screen.getByText('Songs')).toBeDefined()
//   })

//   test('Album page renders without crashing and contains expected content', async () => {
//     const { props } = (await getAlbumPageProps({
//       draftMode: false,
//       params: { slug: 'running-in-place' },
//     })) as {
//       props: AlbumViewProps & WithSettings
//     }
//     await renderWithApp(AlbumPage, props, {
//       pathname: '/album/running-in-place',
//     })

//     expect(screen.getByText('The Discoverables')).toBeDefined()
//     expect(screen.getAllByText('Running In Place').length).toBe(2)
//   })
// })
