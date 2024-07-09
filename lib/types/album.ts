import { PortableTextBlock } from 'sanity'

import { Playlist } from './playlist'
import { SanityImage } from './sanityImage'

export interface Album {
  _type?: 'album'
  _id?: string
  slug?: { current: string }
  title?: string
  description?: Array<PortableTextBlock>
  songs?: Playlist
  coverImage?: SanityImage
  publishDate?: string
  _updatedAt: string
}
