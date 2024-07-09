import { Loading } from 'components/Loading'
import { songsQuery } from 'lib/sanity.queries'
import { SongsViewProps } from 'lib/types/pages'
import { useLiveQuery } from 'next-sanity/preview'

import SongsPage, { SongsPageProps } from './SongsPage'

export const PreviewSongsPage = (props: SongsPageProps) => {
  const [songsView, loadingSongs] = useLiveQuery<SongsViewProps>(
    props.songsView,
    songsQuery,
  )

  if (!songsView) return <Loading />

  return <SongsPage preview songsView={songsView} loading={loadingSongs} />
}
