import React from 'react'
import PreviewIndexPage from './PreviewIndexPage'
import Homepage from './IndexPage'
import PreviewAlbumPage from './PreviewAlbumPage'
import AlbumPage from './album/AlbumPage'
import { Album, Settings } from 'lib/sanity.queries'
import { SharedPageProps } from 'pages/_app'

export type PageViewProps = HomepageViewProps | AlbumViewProps

export interface HomepageViewProps extends SharedPageProps {
  type: 'page'
  albums: Array<Album>
  settings: Settings
}
export interface AlbumViewProps extends SharedPageProps {
  type: 'album'
  album: Album
  moreAlbums: Array<Album>
  settings?: Settings
}

export function PageView({
  props,
}: {
  props: HomepageViewProps | AlbumViewProps
}): React.ReactNode {
  const { type: pageType } = props
  return (
    <>
      <nav>header nav</nav>
      {pageType === 'album' ? (
        <AlbumView props={props} />
      ) : (
        <HomepageView props={props} />
      )}
      <nav>footer</nav>
    </>
  )
}

const HomepageView = ({ props }: { props: HomepageViewProps }) => {
  const { albums, settings, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage albums={albums} settings={settings} />
  }

  return <Homepage albums={albums} settings={settings} />
}

const AlbumView = ({ props }: { props: AlbumViewProps }) => {
  const { settings, album, moreAlbums, draftMode } = props

  if (draftMode) {
    return (
      <PreviewAlbumPage
        album={album}
        moreAlbums={moreAlbums}
        settings={settings}
      />
    )
  }

  return <AlbumPage album={album} moreAlbums={moreAlbums} settings={settings} />
}
