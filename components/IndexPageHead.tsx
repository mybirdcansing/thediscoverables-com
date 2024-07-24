import { toPlainText } from '@portabletext/react'
import { Meta } from 'components/Meta'
import { urlForImage } from 'lib/sanity.image'
import { useSettings } from 'lib/settingsContext'
import Head from 'next/head'

export const PageHead = () => {
  const settings = useSettings()
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
      {ogImage?.asset?._ref && (
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
