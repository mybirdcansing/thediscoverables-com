import Homepage from 'components/Homepage'
import MainLayout from 'components/MainLayout'
import PreviewHomepage from 'components/PreviewHomepage'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getHomepage, getSettings } from 'lib/sanity.getters'
import { HomepageProps } from 'lib/types/pages'
import { GetStaticProps } from 'next'

export default function RenderPage(props: HomepageProps) {
  const { loading, draftMode, settings } = props

  return (
    <MainLayout preview={draftMode} loading={loading}>
      {draftMode ? (
        <PreviewHomepage homepage={props} settings={settings} />
      ) : (
        <Homepage homepage={props} settings={settings} />
      )}
    </MainLayout>
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
