import { PortableTextBlock } from 'sanity'

export interface Song {
  _id: string
  title?: string
  url?: string
  description?: Array<PortableTextBlock>
  duration?: number
}

export interface Album {
  _id: string
  slug?: string
  title?: string
  description?: Array<PortableTextBlock>
  songs?: Array<Song>
  coverImage?: any
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
