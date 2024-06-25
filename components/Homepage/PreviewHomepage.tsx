import { indexQuery, settingsQuery } from 'lib/sanity.queries'
import type { Settings } from 'lib/types/content'
import { HomepageProps } from 'lib/types/pages'
import { useLiveQuery } from 'next-sanity/preview'

import Loading from '../Loading'
import Homepage, { IndexPageProps } from '.'

export default function PreviewHomepage(props: IndexPageProps) {
  const [homepage] = useLiveQuery<HomepageProps>(props.homepage, indexQuery)
  const [settings] = useLiveQuery<Settings>(props.settings, settingsQuery)

  if (!homepage || !settings) return <Loading />

  return <Homepage preview homepage={homepage} settings={settings || {}} />
}
