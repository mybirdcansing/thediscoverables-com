import { toPlainText } from '@portabletext/react'
import { Meta } from 'components/Meta'
import { urlForImage } from 'lib/sanity.image'
import type { Settings } from 'lib/types/content'
import Head from 'next/head'

export interface IndexPageHeadProps {
  settings: Settings
}

export const PageHead = ({ settings }: IndexPageHeadProps) => {
  const { title, description, ogImage } = settings

  return (
    <Head>
      <title>{title}</title>
      <Meta />
      {description && (
        <meta
          key="description"
          name="description"
          content={toPlainText(description)}
        />
      )}
      {ogImage && (
        <meta
          property="og:image"
          content={urlForImage(ogImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </Head>
  )
}
