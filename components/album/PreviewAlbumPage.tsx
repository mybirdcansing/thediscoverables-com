import AlbumPage, { AlbumPageProps } from 'components/album/AlbumPage'
import { Loading } from 'components/Loading'
import { albumBySlugQuery, settingsQuery } from 'lib/sanity.queries'
import type { Album, Settings } from 'lib/types/content'
import { useLiveQuery } from 'next-sanity/preview'

export const PreviewAlbumPage = (props: AlbumPageProps) => {
  const [album, loadingAlbum] = useLiveQuery<Album>(
    props.album,
    albumBySlugQuery,
    {
      slug: props.album.slug,
    },
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  if (!album || !settings) return <Loading />

  return (
    <AlbumPage
      preview
      album={album}
      settings={settings}
      loading={loadingAlbum || loadingSettings}
    />
  )
}
