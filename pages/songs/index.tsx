import SongsPage, { SongsPageProps } from 'components/Songs/SongsPage'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getSongs } from 'lib/sanity.getters'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

const PreviewSongsPage = dynamic<SongsPageProps>(
  () =>
    import('components/Songs/PreviewSongsPage').then(
      (mod) => mod.PreviewSongsPage,
    ),
  {
    ssr: false,
  },
)
export default function RenderPage(props: SongsPageProps) {
  const { songsView, preview } = props

  return preview ? (
    <PreviewSongsPage songsView={songsView} />
  ) : (
    <SongsPage songsView={songsView} />
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async ({
  draftMode = false,
}) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const songsView = await getSongs(client)

  if (!songsView) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      type: 'album',
      songsView,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: Number(process.env.REVALIDATE_SECONDS ?? 900),
  }
}
