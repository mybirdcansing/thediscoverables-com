import Homepage, { IndexPageProps } from 'components/Homepage'
import { indexQuery, settingsQuery } from 'lib/sanity.queries'
import type { Settings } from 'lib/types/content'
import { HomepageProps } from 'lib/types/pages'
import { useLiveQuery } from 'next-sanity/preview'

import Loading from './Loading'

export default function PreviewHomepage(props: IndexPageProps) {
  const [homepage] = useLiveQuery<HomepageProps>(props.homepage, indexQuery)
  const [settings] = useLiveQuery<Settings>(props.settings, settingsQuery)

  if (!homepage || !settings) return <Loading />

  return <Homepage preview homepage={homepage} settings={settings || {}} />
}
