// app/albums/[slug]/page.tsx

import AlbumPage, { AlbumPageProps } from 'components/album/AlbumPage'
import { NotFound } from 'components/NotFound'
import { useSanityClient } from 'lib/hooks/useSanityClient'
import { getClient } from 'lib/sanity.client'
import { getAlbumBySlug, getAlbumSlugs, getSettings } from 'lib/sanity.getters'
import { SettingsProvider } from 'lib/settingsContext'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

const PreviewAlbumPage = dynamic<AlbumPageProps>(
  () =>
    import('components/album/PreviewAlbumPage').then(
      (mod) => mod.PreviewAlbumPage,
    ),
  { ssr: false },
)

export default async function Page({ params }: { params: { slug: string } }) {
  const { isEnabled: isDraftModeEnabled = false } = draftMode()

  const client = useSanityClient()

  const [album, settings] = await Promise.all([
    getAlbumBySlug(client, params.slug),
    getSettings(client),
  ])

  if (!album) {
    return <NotFound />
  }

  return (
    <SettingsProvider settings={settings}>
      {isDraftModeEnabled ? (
        <PreviewAlbumPage album={album} />
      ) : (
        <AlbumPage album={album} />
      )}
    </SettingsProvider>
  )
}

export async function generateStaticParams() {
  const client = getClient()
  const albumSlugs = await getAlbumSlugs(client)

  return (
    albumSlugs?.map((slug) => ({
      slug,
    })) ?? []
  )
}
