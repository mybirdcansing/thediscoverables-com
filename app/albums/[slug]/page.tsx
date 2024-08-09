import { toPlainText } from '@portabletext/react'
import { icons } from 'app/metadataGenerator'
import { NotFound } from 'components/NotFound'
import AlbumPage, { AlbumPageProps } from 'components/pages/Album/AlbumPage'
import { getSanityClient } from 'lib/getSanityClient'
import { getClient } from 'lib/sanity.client'
import { getAlbumBySlug, getAlbumSlugs } from 'lib/sanity.getters'
import { urlForImage } from 'lib/sanity.image'
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
  const album: Album = await getAlbumBySlug(getSanityClient(), params.slug)

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
  const album = await getAlbumBySlug(getSanityClient(), params.slug)

  if (!album) {
    return <NotFound />
  }

  return draftMode().isEnabled ? (
    <PreviewAlbumPage album={album} />
  ) : (
    <AlbumPage album={album} />
  )
}

export async function generateStaticParams() {
  const albumSlugs = await getAlbumSlugs(getClient())

  return (
    albumSlugs?.map((slug) => ({
      slug,
    })) ?? []
  )
}
