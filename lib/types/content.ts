export interface Author {
  name?: string
  picture?: any
}

export interface Song {
  _id: string
  title?: string
  url?: string
  description?: string
  duration?: number
}

export interface Album {
  _id: string
  slug?: string
  title?: string
  description?: string
  songs?: Array<Song>
  coverImage?: any
  publishDate?: string
  _updatedAt: string
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
