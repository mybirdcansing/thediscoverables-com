import React from 'react'
import PreviewIndexPage from './PreviewIndexPage'
import IndexPage from './IndexPage'
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
  switch (props.type) {
    case 'album':
      return renderAlbumView(props)

    default:
      return renderHomepageView(props)
  }
}

const renderHomepageView = (props: HomepageViewProps) => {
  const { albums, settings, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage albums={albums} settings={settings} />
  }

  return <IndexPage albums={albums} settings={settings} />
}

const renderAlbumView = (props: AlbumViewProps) => {
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
