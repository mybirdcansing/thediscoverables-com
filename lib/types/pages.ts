import type { Album } from 'lib/types/album'
import type { Playlist } from 'lib/types/playlist'
import { PortableTextBlock } from 'sanity'

import { SanityImage } from './sanityImage'
import { Settings } from './settings'

export interface SharedPageProps {
  isDraft?: boolean
  token?: string
  loading?: boolean
}

export interface HomepageProps extends SharedPageProps {
  _type: 'homepage'
  backgroundImage?: SanityImage
  description?: Array<PortableTextBlock>
  albumsTitle?: string
  albums?: Array<Album>
  songsTitle?: string
  songs?: Playlist
  allSongs?: Playlist
}

export interface AlbumViewProps extends SharedPageProps {
  _type: 'album'
  album: Album
}

export interface SongsViewProps extends SharedPageProps {
  _type?: 'songs'
  songs?: Playlist
  title?: string
  description?: Array<PortableTextBlock>
}

export interface WithSettings {
  settings: Settings
}
