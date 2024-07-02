import { groq } from 'next-sanity'

const albumFields = groq`
  _id,
  title,
  description,
  publishDate,
  coverImage,
  _updatedAt,
  "slug": slug.current,
  "songs": songs[]->{
    _id,
    title,
    duration,
    _createdAt,
    audioFile{
      asset->{
        url,
        mimeType,        
      }
    },
  },
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
export const songsQuery = groq`
*[_type == "songs"][0] {
  ...,
  songs[]->{
    _id,
    title,
    duration,
    _createdAt,
    audioFile{
      asset->{
        url,
        mimeType,        
      }
    },
    'album': *[ _type == 'album' && ^._id in songs[]._ref][0]{
      _id,
      coverImage,
      title,
      slug
    }
  }
}
`

export const homepageQuery = groq`
*[_type == "homepage"][0] {
  title,
  description,
  backgroundImage,
  albumsTitle,
  'albums': *[_type == 'album']{
    _id,
    title,
    slug,
    coverImage,
    publishedAt
  },
  songsTitle,
  songs[]->{
    _id,
    title,
    duration,
    _createdAt,
    audioFile{
      asset->{
        url,
        mimeType,        
      }
    },
    'album': *[ _type == 'album' && ^._id in songs[]._ref][0]{
      _id,
      coverImage,
      title,
      slug
    }
  }
}
`
