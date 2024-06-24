import {
  albumBySlugQuery,
  albumSlugsQuery,
  indexQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { type SanityClient } from 'next-sanity'

import { Album, Settings } from './types/content'

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

export async function getAllAlbums(
  client: SanityClient,
): Promise<Array<Album>> {
  return (await client.fetch(indexQuery)) || []
}

export async function getAlbumSlugs(
  client: SanityClient,
): Promise<Pick<Album, 'slug'>[]> {
  const slugs = (await client.fetch<Array<string>>(albumSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getAlbumBySlug(
  client: SanityClient,
  slug: string,
): Promise<Album> {
  return (await client.fetch(albumBySlugQuery, { slug })) || ({} as any)
}
