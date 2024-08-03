'use client'
import { Loading } from 'components/Loading'
import AlbumPage, { AlbumPageProps } from 'components/pages/Album/AlbumPage'
import { albumBySlugQuery } from 'lib/sanity.queries'
import type { Album } from 'lib/types/album'
import { useLiveQuery } from 'next-sanity/preview'

export const PreviewAlbumPage = (props: AlbumPageProps) => {
  const [album, loadingAlbum] = useLiveQuery<Album>(
    props.album,
    albumBySlugQuery,
    {
      slug: props.album.slug?.current,
    },
  )

  if (!album) {
    return <Loading />
  }

  return <AlbumPage draftMode album={album} loading={loadingAlbum} />
}
