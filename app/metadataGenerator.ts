import { toPlainText } from '@portabletext/react'
import { getClient } from 'lib/sanity.client'
import { getSettings } from 'lib/sanity.getters'
import { urlForImage } from 'lib/sanity.image'
import { Metadata } from 'next'

export async function generateMetadataForPage(): Promise<Metadata> {
  const client = getClient()
  const settings = await getSettings(client)

  const { title, description, ogImage } = settings

  return {
    title,
    description: description ? toPlainText(description) : undefined,
    openGraph: {
      images: ogImage?.asset?._ref
        ? [
            {
              url: urlForImage(ogImage)
                .width(1200)
                .height(627)
                .fit('crop')
                .url(),
            },
          ]
        : [],
    },
  }
}
