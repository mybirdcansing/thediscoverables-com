import IndexPage, { type IndexPageProps } from 'components/IndexPage'
import {
  type Album,
  indexQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewIndexPage(props: IndexPageProps) {
  const [albums, loadingAlbums] = useLiveQuery<Album[]>(
    props.albums,
    indexQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <IndexPage
      preview
      loading={loadingAlbums || loadingSettings}
      albums={albums || []}
      settings={settings || {}}
    />
  )
}
