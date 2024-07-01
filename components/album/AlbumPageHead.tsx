import { toPlainText } from '@portabletext/react'
import { Meta } from 'components/Meta'
import { urlForImage } from 'lib/sanity.image'
import { Album, Settings } from 'lib/types/content'
import Head from 'next/head'

export interface AlbumPageHeadProps {
  settings: Settings
  album: Album
}

export const AlbumPageHead = ({ settings, album }: AlbumPageHeadProps) => {
  const bandName = settings.title || process.env.NEXT_PUBLIC_BAND_NAME
  const { description } = album
  return (
    <Head>
      <title>{album.title ? `${album.title} by ${bandName}` : bandName}</title>
      <Meta />
      {description && (
        <meta
          key="description"
          name="description"
          content={toPlainText(description)}
        />
      )}
      {album.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(album.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </Head>
  )
}
