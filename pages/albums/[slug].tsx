import AlbumPage from 'components/AlbumPage'
import PreviewAlbumPage from 'components/PreviewAlbumPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllAlbumsSlugs,
  getClient,
  getAlbumAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Album, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  album: Album
  moreAlbums: Album[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, album, moreAlbums, draftMode } = props

  if (draftMode) {
    return (
      <PreviewAlbumPage
        album={album}
        moreAlbums={moreAlbums}
        settings={settings}
      />
    )
  }

  return <AlbumPage album={album} moreAlbums={moreAlbums} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { album, moreAlbums }] = await Promise.all([
    getSettings(client),
    getAlbumAndMoreStories(client, params.slug),
  ])

  if (!album) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      album,
      moreAlbums,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllAlbumsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/albums/${slug}`) || [],
    fallback: 'blocking',
  }
}
