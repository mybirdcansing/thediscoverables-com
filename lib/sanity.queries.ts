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

export const albumSlugsQuery = groq`
*[_type == "album" && defined(slug.current)][].slug.current
`

export const albumBySlugQuery = groq`
*[_type == "album" && slug.current == $slug][0] {
  ${albumFields}
}
`
