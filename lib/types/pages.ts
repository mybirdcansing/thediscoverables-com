import { PortableTextBlock } from 'sanity'

import { Album, SanityImage, Settings, Song } from './content'

export interface SharedPageProps {
  draftMode: boolean
  token: string
  loading: boolean
  settings?: Settings
}

export interface HomepageProps extends SharedPageProps {
  type: 'homepage'
  backgroundImage?: SanityImage
  description?: Array<PortableTextBlock>
  albumsTitle?: string
  albums?: Array<Album>
  songsTitle?: string
  songs?: Array<Song>
  settings?: Settings
}

export interface AlbumViewProps extends SharedPageProps {
  type: 'album'
  album: Album
}
