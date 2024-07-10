import cx from 'classnames'
import { Container } from 'components/Container'
import { Dot } from 'components/Dot'
import { getYear } from 'date-fns'
import { hasAlbumArt, urlForImage } from 'lib/sanity.image'
import { Album } from 'lib/types/album'
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

  return (
    <Container className="flex flex-col place-items-center">
      <div className="max-w-4xl w-full flex flex-col gap-4">
        <h2>{albumsTitle}</h2>
        <div
          className={cx(
            `grid gap-x-6 gap-y-8 w-full`,
            albums.length > 2
              ? 'grid-cols-1 md:grid-cols-3'
              : 'grid-cols-1 xs:grid-cols-2',
          )}
        >
          {albums.map((album) => {
            const { _id, coverImage, title, slug, publishDate } = album
            const artSrc = hasAlbumArt(album)
              ? urlForImage(coverImage).url()
              : null

            return (
              <div key={_id} className="flex flex-col gap-3 w-full h-fit">
                <Link
                  href={`/albums/${slug?.current}`}
                  className="relative block w-full aspect-square"
                >
                  {artSrc ? (
                    <Image
                      src={artSrc}
                      alt={`Cover of album ${title}`}
                      fill
                      sizes="(min-width: 768px) 512px, 256px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 flex items-center justify-center w-full aspect-square">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </Link>
                <div className="flex flex-row gap-1">
                  {slug && (
                    <Link
                      href={`/albums/${slug.current}`}
                      className="text-left hover:underline"
                    >
                      {title}
                    </Link>
                  )}
                  {publishDate && (
                    <>
                      <Dot />
                      <span>{getYear(publishDate)}</span>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
