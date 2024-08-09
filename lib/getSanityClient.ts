import { getClient } from 'lib/sanity.client'
import { draftMode } from 'next/headers'
import { type SanityClient } from 'next-sanity'

import { readToken } from './sanity.api'

export const getSanityClient = (): SanityClient => {
  if (!readToken) {
    throw new Error(
      'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.',
    )
  }
  const isDraft = draftMode().isEnabled
  return getClient(isDraft ? { token: readToken } : undefined)
}
