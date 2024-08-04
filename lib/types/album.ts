import { PortableTextBlock } from 'sanity'

import { Playlist } from './playlist'
import { SanityImage } from './sanityImage'

export interface Album {
  _type?: 'album'
  _id?: string
  _updatedAt: string
  slug?: { current: string; _type?: 'slug' }
  title?: string
  bandName?: string
  description?: Array<PortableTextBlock>
  songs?: Playlist
  coverImage?: SanityImage
  publishDate?: string
}
