import AlbumPage, { AlbumPageProps } from 'components/album/AlbumPage'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getAlbumBySlug, getAlbumSlugs } from 'lib/sanity.getters'
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
  const { album, draftMode } = props

  return draftMode ? (
    <PreviewAlbumPage album={album} />
  ) : (
    <AlbumPage album={album} />
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async ({
  draftMode = false,
  params,
}) => {
  const slug = params?.slug ?? '/'
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const album = await getAlbumBySlug(client, slug)

  if (!album) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      type: 'album',
      album,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: Number(process.env.REVALIDATE_SECONDS ?? 900),
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
