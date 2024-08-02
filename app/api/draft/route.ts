import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from 'next-sanity'

const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error(
    'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.',
  )
}
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

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
