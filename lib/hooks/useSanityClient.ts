import { getClient } from 'lib/sanity.client'
import { draftMode } from 'next/headers'
import { type SanityClient } from 'next-sanity'

import { readToken } from './../sanity.api'

export const useSanityClient = (): SanityClient => {
  if (!readToken) {
    throw new Error(
      'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.',
    )
  }
  const { isEnabled: isDraftModeEnabled = false } = draftMode()
  return getClient(isDraftModeEnabled ? { token: readToken } : undefined)
}
