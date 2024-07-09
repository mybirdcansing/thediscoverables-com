import AlbumPage, { AlbumPageProps } from 'components/album/AlbumPage'
import { Loading } from 'components/Loading'
import { albumBySlugQuery } from 'lib/sanity.queries'
import type { Album } from 'lib/types/album'
import { useLiveQuery } from 'next-sanity/preview'

export const PreviewAlbumPage = (props: AlbumPageProps) => {
  const [album, loadingAlbum] = useLiveQuery<Album>(
    props.album,
    albumBySlugQuery,
    {
      slug: props.album.slug,
    },
  )

  if (!album) {
    return <Loading />
  }

  return <AlbumPage preview album={album} loading={loadingAlbum} />
}
