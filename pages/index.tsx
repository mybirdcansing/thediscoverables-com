import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getAllAlbums, getClient, getSettings } from 'lib/sanity.client'
import { Album, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  albums: Array<Album>
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { albums, settings, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage albums={albums} settings={settings} />
  }

  return <IndexPage albums={albums} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
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
