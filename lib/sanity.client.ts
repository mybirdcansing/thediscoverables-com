import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  albumBySlugQuery,
  albumSlugsQuery,
  indexQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

import { Album, Settings } from './types/content'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: preview?.token ? true : false,
      studioUrl,
    },
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export interface Query {
  [key: string]: string
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

export async function getAllAlbums(
  client: SanityClient,
): Promise<Array<Album>> {
  return (await client.fetch(indexQuery)) || []
}

export async function getAlbumSlugs(): Promise<Pick<Album, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<Array<string>>(albumSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getAlbumBySlug(
  client: SanityClient,
  slug: string,
): Promise<Album> {
  return (await client.fetch(albumBySlugQuery, { slug })) || ({} as any)
}
