import { homepageQuery } from 'lib/sanity.queries'
import { HomepageProps } from 'lib/types/pages'
import { useLiveQuery } from 'next-sanity/preview'

import { Loading } from '../Loading'
import { Homepage, type IndexPageProps } from '.'

export const PreviewHomepage = (props: IndexPageProps) => {
  const [homepage, loadingHomepage] = useLiveQuery<HomepageProps>(
    props.homepage,
    homepageQuery,
  )

  if (!homepage) {
    return <Loading />
  }

  return <Homepage homepage={homepage} preview loading={loadingHomepage} />
}
