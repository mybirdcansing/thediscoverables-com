import { Homepage, type IndexPageProps } from 'components/Homepage'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getHomepage, getSettings } from 'lib/sanity.getters'
import type { HomepageProps } from 'lib/types/pages'
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

export default function RenderPage(props: HomepageProps) {
  const { draftMode, settings } = props

  return draftMode ? (
    <PreviewHomepage homepage={props} settings={settings} />
  ) : (
    <Homepage homepage={props} settings={settings} />
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async (ctx) => {
  const { draftMode = false } = ctx

  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, homepage] = await Promise.all([
    getSettings(client),
    getHomepage(client),
  ])

  const {
    backgroundImage,
    description,
    albums,
    songs,
    songsTitle,
    albumsTitle,
  } = homepage

  return {
    props: {
      backgroundImage,
      description,
      albums,
      songs,
      songsTitle,
      albumsTitle,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
