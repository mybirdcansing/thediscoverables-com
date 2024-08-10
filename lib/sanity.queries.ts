import { groq } from 'next-sanity'

const albumFields = groq`
  _id,
  title,
  description,
  publishDate,
  coverImage,
  _updatedAt,
  slug,
  'bandName': *[_type == "settings"][0].bandName,
  "songs": songs[]->{
    _id,
    _createdAt,
    title,
    duration,
    lyrics,
    'bandName':  *[_type == "settings"][0].bandName,
    'album': {
      'title': ^.title,
      'description': ^.description,
      'coverImage': ^.coverImage,
      'slug': ^.slug,
      'publishDate': ^.publishDate
    },
    audioFile{
      asset->{
        url,
        mimeType,        
      }
    },
  },
`

const songFields = groq`
    _id,
    _createdAt,
    title,
    duration,
    lyrics,
    audioFile{
      asset->{
        url,
        mimeType,        
      }
    },
    'bandName': *[_type == "settings"][0].bandName,
    'album': *[ _type == 'album' && ^._id in songs[]._ref][0]{
      _id,
      _updatedAt,
      title,
      description,
      publishDate,
      coverImage,
      slug,
    }
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
    ${songFields}
  }
}
`

export const homepageQuery = groq`
*[_type == "homepage"][0] {
  title,
  description,
  backgroundImage,
  albumsTitle,
  'bandName': *[_type == "settings"][0].bandName,
  'albums': *[_type == 'album']| order(publishDate desc){
    _id,
    title,
    slug,
    coverImage,
    publishDate,
    'bandName': ^.bandName
  },
  songsTitle,
  songs[]->{
    ${songFields}
  },
  'allSongs': *[_type == "song"][] {
    ${songFields}
  }
}
`
