import Homepage, { type IndexPageProps } from 'components/IndexPage'
import { indexQuery, settingsQuery } from 'lib/sanity.queries'
import type { Album, Settings } from 'lib/types/content'
import { useLiveQuery } from 'next-sanity/preview'

import Loading from './Loading'

export default function PreviewHomepage(props: IndexPageProps) {
  const [albums, loadingAlbums] = useLiveQuery<Array<Album>>(
    props.albums,
    indexQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  if (!albums || !settings) return <Loading />

  return (
    <Homepage
      preview
      loading={loadingAlbums || loadingSettings}
      albums={albums || []}
      settings={settings || {}}
    />
  )
}
