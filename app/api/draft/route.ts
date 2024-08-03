import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const client = getClient({ token: readToken })

export async function GET(req: Request) {
  if (!req.url) {
    throw new Error('Missing url')
  }
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    req.url,
  )
  if (!isValid) {
    return new Response('Invalid slug', { status: 401 })
  }
  draftMode().enable()
  redirect(redirectTo)
}
