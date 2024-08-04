import {
  albumBySlugQuery,
  albumSlugsQuery,
  homepageQuery,
  indexQuery,
  settingsQuery,
  songsQuery,
} from 'lib/sanity.queries'
import { SongsViewProps } from 'lib/types/pages'
import { type SanityClient } from 'next-sanity'

import { Album } from './types/album'
import { HomepageProps } from './types/pages'
import { Settings } from './types/settings'

export async function getAllAlbums(
  client: SanityClient,
): Promise<Array<Album>> {
  return (await client.fetch(indexQuery)) || []
}

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch<Settings>(settingsQuery)) || {}
}

export async function getSongs(client: SanityClient): Promise<SongsViewProps> {
  return (await client.fetch<SongsViewProps>(songsQuery)) || []
}

export async function getAlbumSlugs(
  client: SanityClient,
): Promise<Array<string>> {
  return (await client.fetch<Array<string>>(albumSlugsQuery)) || []
}

export async function getAlbumBySlug(
  client: SanityClient,
  slug: string,
): Promise<Album> {
  return (
    (await client.fetch<Album>(albumBySlugQuery, { slug })) || ({} as Album)
  )
}

export async function getHomepage(
  client: SanityClient,
): Promise<HomepageProps> {
  return (
    (await client.fetch<HomepageProps>(homepageQuery)) || ({} as HomepageProps)
  )
}
