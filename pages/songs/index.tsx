import SongsPage, { SongsPageProps } from 'components/Songs/SongsPage'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getSettings, getSongs } from 'lib/sanity.getters'
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
  const { settings, songsView, preview } = props

  return preview ? (
    <PreviewSongsPage songsView={songsView} settings={settings} />
  ) : (
    <SongsPage songsView={songsView} settings={settings} />
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async ({
  draftMode = false,
}) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const [settings, songsView] = await Promise.all([
    getSettings(client),
    getSongs(client),
  ])

  if (!songsView) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      type: 'album',
      songsView,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
