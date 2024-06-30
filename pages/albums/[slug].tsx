import AlbumPage, { AlbumPageProps } from 'components/album/AlbumPage'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getAlbumBySlug, getAlbumSlugs, getSettings } from 'lib/sanity.getters'
import type { AlbumViewProps } from 'lib/types/pages'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

const PreviewAlbumPage = dynamic<AlbumPageProps>(
  () =>
    import('components/album/PreviewAlbumPage').then(
      (mod) => mod.PreviewAlbumPage,
    ),
  {
    ssr: false,
  },
)
export default function RenderPage(props: AlbumViewProps) {
  const { settings, album, draftMode } = props

  return draftMode ? (
    <PreviewAlbumPage album={album} settings={settings} />
  ) : (
    <AlbumPage album={album} settings={settings} />
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async ({
  draftMode = false,
  params,
}) => {
  const slug = params?.slug ?? '/'
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
