import MainLayout from 'components/MainLayout'
import { PageView } from 'components/PageView'
import { readToken } from 'lib/sanity.api'
import {
  getAlbumBySlug,
  getAllAlbums,
  getAllSlugs,
  getClient,
  getSettings,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'

interface Query {
  [key: string]: string
}

export default function RenderPage(props: any) {
  const { loading, draftMode } = props

  return (
    <MainLayout preview={draftMode} loading={loading}>
      <PageView props={props} />
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async (ctx) => {
  const { draftMode = false, params } = ctx
  const slugArray = Array.from(params.slug ?? '')
  const [slugRoot] = slugArray
  const client = getClient(draftMode ? { token: readToken } : undefined)
  if (!slugRoot) {
    const [settings, albums = []] = await Promise.all([
      getSettings(client),
      getAllAlbums(client),
    ])

    return {
      props: {
        type: 'homepage',
        albums,
        settings,
        draftMode,
        token: draftMode ? readToken : '',
      },
    }
  }

  if (slugRoot === 'albums') {
    const albumSlug = slugArray.slice(1).join('/')
    const [settings, album] = await Promise.all([
      getSettings(client),
      getAlbumBySlug(client, albumSlug),
    ])

    if (!album) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        type: 'album',
        album,
        settings,
        draftMode,
        token: draftMode ? readToken : '',
      },
    }
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths = async () => {
  const albumSlugs = await getAllSlugs()
  return {
    paths: ['/', ...(albumSlugs?.map(({ slug }) => `/albums/${slug}`) || [])],
    fallback: 'blocking',
  }
}
