import { ImageResponse } from '@vercel/og'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextRequest } from 'next/server'
import type { PageConfig } from 'next/types'
import { createClient } from 'next-sanity'

export const config: PageConfig = { runtime: 'edge' }

import { height, OpenGraphImage, width } from 'components/OpenGraphImage'
import { settingsQuery } from 'lib/sanity.queries'
import type { Settings } from 'lib/types/content'

export default async function og(req: NextRequest) {
  const font = fetch(new URL('public/Inter-Bold.woff', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  )
  const { searchParams } = new URL(req.url)

  let title: string | null | undefined = searchParams.get('title')
  if (!title) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
    const settings = (await client.fetch<Settings>(settingsQuery)) || {}
    title = settings?.ogImage?.title
  }

  return new ImageResponse(
    <OpenGraphImage title={title || 'The Discoverables'} />,
    {
      width,
      height,
      fonts: [
        {
          name: 'Inter',
          data: await font,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  )
}
