import { generateMetadataForPage } from 'app/metadataGenerator'
import { NotFound } from 'components/NotFound'
import SongsPage, { SongsPageProps } from 'components/pages/Songs/SongsPage'
import { getSanityClient } from 'lib/getSanityClient'
import { getSongs } from 'lib/sanity.getters'
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
  const songsView = await getSongs(getSanityClient())

  if (!songsView) {
    return <NotFound />
  }

  return draftMode().isEnabled ? (
    <PreviewSongsPage songsView={songsView} />
  ) : (
    <SongsPage songsView={songsView} />
  )
}
