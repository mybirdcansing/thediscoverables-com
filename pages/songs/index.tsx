import SongsPage, { SongsPageProps } from 'components/Songs/SongsPage'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getSettings, getSongs } from 'lib/sanity.getters'
import { SettingsProvider } from 'lib/settingsContext'
import { WithSettings } from 'lib/types/pages'
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
export default function RenderPage(props: SongsPageProps & WithSettings) {
  const { songsView, draftMode, settings } = props

  const pageComponent = draftMode ? (
    <PreviewSongsPage songsView={songsView} />
  ) : (
    <SongsPage songsView={songsView} />
  )

  return (
    <SettingsProvider settings={settings}>{pageComponent}</SettingsProvider>
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async ({
  draftMode = false,
}) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const [songsView, settings] = await Promise.all([
    getSongs(client),
    getSettings(client),
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
      draftMode,
      token: draftMode ? readToken : '',
      settings,
    },
    revalidate: Number(process.env.REVALIDATE_SECONDS ?? 900),
  }
}
