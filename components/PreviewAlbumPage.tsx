import AlbumPage, { AlbumPageProps } from 'components/album/AlbumPage'
import { albumBySlugQuery, settingsQuery } from 'lib/sanity.queries'
import type { Album, Settings } from 'lib/types/content'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewAlbumPage(props: AlbumPageProps) {
  const [{ album: albumPreview, moreAlbums }, loadingAlbum] = useLiveQuery<{
    album: Album
    moreAlbums: Album[]
  }>({ album: props.album, moreAlbums: props.moreAlbums }, albumBySlugQuery, {
    slug: props.album.slug,
  })
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <AlbumPage
      preview
      loading={loadingAlbum || loadingSettings}
      album={albumPreview}
      moreAlbums={moreAlbums}
      settings={settings}
    />
  )
}
