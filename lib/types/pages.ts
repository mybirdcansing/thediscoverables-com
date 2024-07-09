import type { Album } from 'lib/types/album'
import type { Playlist } from 'lib/types/playlist'
import type { Settings } from 'lib/types/settings'
import { PortableTextBlock } from 'sanity'

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
  allSongs?: Playlist
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
