import AlbumPage, { AlbumPageProps } from 'components/album/AlbumPage'
import { albumBySlugQuery, settingsQuery } from 'lib/sanity.queries'
import type { Album, Settings } from 'lib/types/content'
import { useLiveQuery } from 'next-sanity/preview'

import Loading from './Loading'

export default function PreviewAlbumPage(props: AlbumPageProps) {
  const [album, loadingAlbum] = useLiveQuery<Album>(
    props.album,
    albumBySlugQuery,
    {
      slug: props.album.slug,
    },
  )

  console.log({
    album,
    albumBySlugQuery,
    slug: props.album.slug,
  })

  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )
  if (!album || !settings) return <Loading />

  return (
    <AlbumPage
      preview
      loading={loadingAlbum || loadingSettings}
      album={album}
      settings={settings}
    />
  )
}
