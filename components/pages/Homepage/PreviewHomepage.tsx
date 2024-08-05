'use client'
import { Loading } from 'components/Loading'
import { homepageQuery } from 'lib/sanity.queries'
import { HomepageProps } from 'lib/types/pages'
import { useLiveQuery } from 'next-sanity/preview'

import { Homepage, type IndexPageProps } from '.'

export const PreviewHomepage = (props: IndexPageProps) => {
  const [homepage, loadingHomepage] = useLiveQuery<HomepageProps>(
    props.homepage,
    homepageQuery,
  )

  if (!homepage) {
    return <Loading />
  }

  return <Homepage homepage={homepage} isDraft loading={loadingHomepage} />
}
