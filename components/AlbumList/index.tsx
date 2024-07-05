import { Container } from 'components/Container'
import { hasAlbumArt, urlForImage } from 'lib/sanity.image'
import { Album } from 'lib/types/content'
import Image from 'next/image'
import Link from 'next/link'

export interface AlbumListProps {
  albumsTitle?: string
  albums?: Array<Album>
}

export const AlbumList = ({ albumsTitle, albums }: AlbumListProps) => {
  if (!albums) {
    return null
  }

  const gridColsClass =
    albums.length > 2
      ? 'grid-cols-1 md:grid-cols-3'
      : 'grid-cols-1 md:grid-cols-2'

  return (
    <Container className="flex flex-col place-items-center">
      <div className="max-w-4xl w-full flex flex-col gap-4">
        <h2>{albumsTitle}</h2>
        <div className={`grid ${gridColsClass} gap-6 w-full`}>
          {albums.map((album) => {
            const artSrc = hasAlbumArt(album)
              ? urlForImage(album.coverImage).url()
              : null

            return (
              <div key={album._id} className="flex flex-col gap-2 w-full h-fit">
                <Link
                  href={`/albums/${album.slug?.current}`}
                  className="relative block w-full aspect-square"
                >
                  {artSrc ? (
                    <Image
                      src={artSrc}
                      alt={`Cover of album ${album.title}`}
                      layout="fill"
                      sizes="(min-width: 768px) 512px, 256px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 flex items-center justify-center w-full aspect-square">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </Link>
                {album.slug && (
                  <Link
                    href={`/albums/${album.slug.current}`}
                    className="text-left hover:underline"
                  >
                    {album.title}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
