import { toPlainText } from '@portabletext/react'
import { Meta } from 'components/Meta'
import { urlForImage } from 'lib/sanity.image'
import { useSettings } from 'lib/settingsContext'
import { Album } from 'lib/types/album'
import Head from 'next/head'

export interface AlbumPageHeadProps {
  album: Album
}

export const AlbumPageHead = ({ album }: AlbumPageHeadProps) => {
  const { title: bandName = process.env.NEXT_PUBLIC_BAND_NAME } = useSettings()

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
