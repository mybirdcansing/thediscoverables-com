import { Album, Settings } from 'lib/sanity.queries'
import { SharedPageProps } from 'pages/_app'
import React from 'react'

import AlbumPage from './album/AlbumPage'
import Homepage from './IndexPage'
import PreviewAlbumPage from './PreviewAlbumPage'
import PreviewIndexPage from './PreviewIndexPage'

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
  return props.type === 'album' ? (
    <AlbumView props={props} />
  ) : (
    <HomepageView props={props} />
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
