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
    return
  }
  return (
    <Container className="flex flex-col place-items-center">
      <div className="max-w-4xl w-full flex flex-col gap-4">
        <h2>{albumsTitle}</h2>
        <div className="flex flex-row gap-6">
          {albums.map((album) => {
            const artSrc = hasAlbumArt(album)
              ? urlForImage(album.coverImage).height(560).width(560).url()
              : undefined

            return (
              <Link
                href={`/albums/${album.slug?.current}`}
                key={album._id}
                className="flex flex-row gap-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="relative w-40 h-40 md:w-64 md:h-64">
                    {artSrc && (
                      <Image
                        src={artSrc}
                        alt="Album thumbnail"
                        fill
                        sizes="(min-width: 768px) 512px, 256px"
                      />
                    )}
                  </div>
                  <div>{album.title}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
