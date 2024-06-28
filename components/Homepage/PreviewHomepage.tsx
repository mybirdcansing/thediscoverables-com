import { homepageQuery, settingsQuery } from 'lib/sanity.queries'
import type { Settings } from 'lib/types/content'
import { HomepageProps } from 'lib/types/pages'
import { useLiveQuery } from 'next-sanity/preview'

import { Loading } from '../Loading'
import Homepage, { IndexPageProps } from '.'

export default function PreviewHomepage(props: IndexPageProps) {
  const [homepage, loadingHomepage] = useLiveQuery<HomepageProps>(
    props.homepage,
    homepageQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  if (!settings || !homepage) {
    return <Loading />
  }

  return (
    <Homepage
      homepage={homepage}
      settings={settings}
      preview
      loading={loadingHomepage || loadingSettings}
    />
  )
}
