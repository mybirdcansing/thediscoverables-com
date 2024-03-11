import { groq } from 'next-sanity'

const albumFields = groq`
  _id,
  title,
  description,
  publishDate,
  coverImage,
  _updatedAt,
  "slug": slug.current,
  "songs": songs[]->,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "album"] | order(date desc, _updatedAt desc) {
  ${albumFields}
}`

export const albumAndMoreStoriesQuery = groq`
{
  "album": *[_type == "album" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${albumFields}
  },
  "moreAlbums": *[_type == "album" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${albumFields}
  }
}`

export const albumSlugsQuery = groq`
*[_type == "album" && defined(slug.current)][].slug.current
`

export const albumBySlugQuery = groq`
*[_type == "album" && slug.current == $slug][0] {
  ${albumFields}
}
`

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
}

export interface Album {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
