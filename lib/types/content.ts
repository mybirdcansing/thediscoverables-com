import { PortableTextBlock } from 'sanity'
export interface SanityImage {
  _id: string
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
    to: {
      _type: 'file'
    }
  }
  hotspot: {
    x: number
    y: number
  }
}

export enum BulletStyle {
  Number,
  Artwork,
}

export interface Song {
  _id: string
  title?: string
  url?: string
  description?: Array<PortableTextBlock>
  duration?: number
  album?: Album
}

export interface Album {
  _id: string
  slug?: { current: string }
  title?: string
  description?: Array<PortableTextBlock>
  songs?: Array<Song>
  coverImage?: SanityImage
  publishDate?: string
  _updatedAt: string
}

export interface Settings {
  title?: string
  description?: Array<PortableTextBlock>
  ogImage?: {
    title?: string
  }
}
