import Meta from 'components/Meta'
import { urlForImage } from 'lib/sanity.image'
import { Album, Settings } from 'lib/sanity.queries'
import Head from 'next/head'

export interface AlbumPageHeadProps {
  settings: Settings
  album: Album
}

export default function AlbumPageHead({ settings, album }: AlbumPageHeadProps) {
  const title = settings.title ?? 'The Discoverables'
  return (
    <Head>
      <title>{album.title ? `${album.title} | ${title}` : title}</title>
      <Meta />
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
