import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(draft?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: draft?.token ? true : false,
      studioUrl,
    },
  })
  if (draft) {
    if (!draft.token) {
      throw new Error('You must provide a token to preview draft content')
    }

    return client.withConfig({
      token: draft.token,
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
