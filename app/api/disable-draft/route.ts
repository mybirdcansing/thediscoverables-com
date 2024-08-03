import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  if (!req.url) {
    throw new Error('Missing url')
  }
  const { isEnabled, disable } = draftMode()
  if (isEnabled) {
    disable()
  }
  redirect(req.referrer ?? '/')
}
