import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  draftMode().disable()

  const url = new URL(request.url)
  const redirectUrl = url.searchParams.get('redirect') || '/'

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl,
    },
  })
}
