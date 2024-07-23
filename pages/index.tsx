import { Homepage, type IndexPageProps } from 'components/Homepage'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getHomepage, getSettings } from 'lib/sanity.getters'
import { SettingsProvider } from 'lib/settingsContext'
import type { HomepageProps, WithSettings } from 'lib/types/pages'
import isEmpty from 'lodash/isEmpty'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

const PreviewHomepage = dynamic<IndexPageProps>(
  () =>
    import('components/Homepage/PreviewHomepage').then(
      (mod) => mod.PreviewHomepage,
    ),
  {
    ssr: false,
  },
)

export default function RenderPage(props: HomepageProps & WithSettings) {
  const { draftMode, settings } = props

  const pageComponent = draftMode ? (
    <PreviewHomepage homepage={props} />
  ) : (
    <Homepage homepage={props} />
  )

  return (
    <SettingsProvider settings={settings}>{pageComponent}</SettingsProvider>
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async (ctx) => {
  const { draftMode = false } = ctx

  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [homepage, settings] = await Promise.all([
    getHomepage(client),
    getSettings(client),
  ])

  if (!homepage || isEmpty(homepage)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...homepage,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: Number(process.env.REVALIDATE_SECONDS ?? 900),
  }
}
