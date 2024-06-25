import AlbumPage, { AlbumPageProps } from 'components/album/AlbumPage'
import { albumBySlugQuery, settingsQuery } from 'lib/sanity.queries'
import type { Album, Settings } from 'lib/types/content'
import { useLiveQuery } from 'next-sanity/preview'

import Loading from './Loading'

export default function PreviewAlbumPage(props: AlbumPageProps) {
  const [album] = useLiveQuery<Album>(props.album, albumBySlugQuery, {
    slug: props.album.slug,
  })
  const [settings] = useLiveQuery<Settings>(props.settings, settingsQuery)

  if (!album || !settings) return <Loading />

  return <AlbumPage preview album={album} settings={settings} />
}
