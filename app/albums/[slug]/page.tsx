import { toPlainText } from '@portabletext/react'
import { icons } from 'app/metadataGenerator'
import { NotFound } from 'components/NotFound'
import AlbumPage, { AlbumPageProps } from 'components/pages/Album/AlbumPage'
import { useSanityClient } from 'lib/hooks/useSanityClient'
import { getClient } from 'lib/sanity.client'
import { getAlbumBySlug, getAlbumSlugs, getSettings } from 'lib/sanity.getters'
import { urlForImage } from 'lib/sanity.image'
import { SettingsProvider } from 'lib/settingsContext'
import { Album } from 'lib/types/album'
import { isNonEmptyString } from 'lib/util'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

const PreviewAlbumPage = dynamic<AlbumPageProps>(
  () =>
    import('components/pages/Album/PreviewAlbumPage').then(
      (mod) => mod.PreviewAlbumPage,
    ),
  { ssr: false },
)

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const client = getClient()
  const album: Album = await getAlbumBySlug(client, params.slug)

  const bandName = album.bandName || process.env.NEXT_PUBLIC_BAND_NAME
  const { description, title, coverImage } = album

  return {
    icons,
    title: isNonEmptyString(title) ? `${title} by ${bandName}` : bandName,
    description: Array.isArray(description)
      ? toPlainText(description)
      : undefined,
    openGraph: {
      title: isNonEmptyString(title) ? `${title} by ${bandName}` : bandName,
      description: Array.isArray(description)
        ? toPlainText(description)
        : undefined,
      images: isNonEmptyString(coverImage?.asset?._ref)
        ? [
            {
              url: urlForImage(coverImage)
                .width(1200)
                .height(627)
                .fit('crop')
                .url(),
            },
          ]
        : [],
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const isDraft = draftMode().isEnabled
  const client = useSanityClient()
  const [album, settings] = await Promise.all([
    getAlbumBySlug(client, params.slug),
    getSettings(client),
  ])

  if (!album) {
    return <NotFound />
  }

  return (
    <SettingsProvider settings={settings} isDraft={isDraft}>
      {isDraft ? (
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
