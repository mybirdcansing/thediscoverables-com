import Homepage from 'components/IndexPage'
import MainLayout from 'components/MainLayout'
import PreviewHomepage from 'components/PreviewHomepage'
import { readToken } from 'lib/sanity.api'
import { getAllAlbums, getClient, getSettings, Query } from 'lib/sanity.client'
import { Album, Settings } from 'lib/types/content'
import { GetStaticProps } from 'next'

import { SharedPageProps } from './_app'

export interface HomepageViewProps extends SharedPageProps {
  type: 'homepage'
  albums: Array<Album>
  settings: Settings
}

export default function RenderPage(props: HomepageViewProps) {
  const { loading, draftMode, albums, settings } = props

  return (
    <MainLayout preview={draftMode} loading={loading}>
      {draftMode ? (
        <PreviewHomepage albums={albums} settings={settings} />
      ) : (
        <Homepage albums={albums} settings={settings} />
      )}
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async (ctx) => {
  const { draftMode = false } = ctx

  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, albums = []] = await Promise.all([
    getSettings(client),
    getAllAlbums(client),
  ])

  return {
    props: {
      albums,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
