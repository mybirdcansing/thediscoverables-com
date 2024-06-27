import AlbumPage from 'components/album/AlbumPage'
import PreviewAlbumPage from 'components/album/PreviewAlbumPage'
import MainLayout from 'components/MainLayout'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getAlbumBySlug, getAlbumSlugs, getSettings } from 'lib/sanity.getters'
import { AlbumViewProps } from 'lib/types/pages'
import { GetStaticProps } from 'next'

export default function RenderPage(props: AlbumViewProps) {
  const { settings, album, draftMode, loading } = props

  return (
    <MainLayout preview={draftMode} loading={loading} settings={settings}>
      {draftMode ? (
        <PreviewAlbumPage album={album} settings={settings} />
      ) : (
        <AlbumPage album={album} settings={settings} />
      )}
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async ({
  draftMode = false,
  params,
}) => {
  const { slug } = params
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const [settings, album] = await Promise.all([
    getSettings(client),
    getAlbumBySlug(client, slug),
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

export const getStaticPaths = async () => {
  const client = getClient()
  const albumSlugs = await getAlbumSlugs(client)

  return {
    paths: albumSlugs?.map((slug) => `/albums/${slug}`) ?? [],
    fallback: 'blocking',
  }
}
