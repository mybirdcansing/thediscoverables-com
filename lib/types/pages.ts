import { PortableTextBlock } from 'sanity'

import type { Album, Playlist, Settings } from './content'

export interface SharedPageProps {
  draftMode: boolean
  token: string
  loading: boolean
  settings?: Settings
}

export interface HomepageProps extends SharedPageProps {
  _type: 'homepage'
  backgroundImage?: any
  description?: Array<PortableTextBlock>
  albumsTitle?: string
  albums?: Array<Album>
  songsTitle?: string
  songs?: Playlist
  settings?: Settings
}

export interface AlbumViewProps extends SharedPageProps {
  _type: 'album'
  album: Album
}

export interface SongsViewProps extends SharedPageProps {
  _type: 'songs'
  songs?: Playlist
  title?: string
  description?: Array<PortableTextBlock>
}
