import { Loading } from 'components/Loading'
import { settingsQuery, songsQuery } from 'lib/sanity.queries'
import type { Settings } from 'lib/types/content'
import { SongsViewProps } from 'lib/types/pages'
import { useLiveQuery } from 'next-sanity/preview'

import SongsPage, { SongsPageProps } from './SongsPage'

export const PreviewSongsPage = (props: SongsPageProps) => {
  const [songsView, loadingSongs] = useLiveQuery<SongsViewProps>(
    props.songsView,
    songsQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings ?? {},
    settingsQuery,
  )

  if (!songsView || !settings) return <Loading />

  return (
    <SongsPage
      preview
      songsView={songsView}
      settings={settings}
      loading={loadingSongs || loadingSettings}
    />
  )
}
