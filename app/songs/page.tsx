import { generateMetadataForPage } from 'app/metadataGenerator'
import { NotFound } from 'components/NotFound'
import SongsPage, { SongsPageProps } from 'components/pages/Songs/SongsPage'
import { useSanityClient } from 'lib/hooks/useSanityClient'
import { getSettings, getSongs } from 'lib/sanity.getters'
import { SettingsProvider } from 'lib/settingsContext'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

const PreviewSongsPage = dynamic<SongsPageProps>(
  () =>
    import('components/pages/Songs/PreviewSongsPage').then(
      (mod) => mod.PreviewSongsPage,
    ),
  { ssr: false },
)

export const generateMetadata = generateMetadataForPage

export default async function Page() {
  const isDraft = draftMode().isEnabled
  const client = useSanityClient()
  const [songsView, settings] = await Promise.all([
    getSongs(client),
    getSettings(client),
  ])

  if (!songsView) {
    return <NotFound />
  }

  return (
    <SettingsProvider settings={settings} isDraft={isDraft}>
      {isDraft ? (
        <PreviewSongsPage songsView={songsView} />
      ) : (
        <SongsPage songsView={songsView} />
      )}
    </SettingsProvider>
  )
}
