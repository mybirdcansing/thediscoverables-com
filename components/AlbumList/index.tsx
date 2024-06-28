import { Container } from 'components/Container'
import { hasAlbumArt, urlForImage } from 'lib/sanity.image'
import { Album } from 'lib/types/content'
import Image from 'next/image'
import Link from 'next/link'
export interface AlbumListProps {
  albumsTitle?: string
  albums: Array<Album>
}

export const AlbumList = ({ albumsTitle, albums }: AlbumListProps) => {
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
                href={`/albums/${album.slug.current}`}
                key={album._id}
                className="flex flex-row gap-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="relative w-32 h-32 md:w-64 md:h-64">
                    <Image src={artSrc} alt="Album thumbnail" fill />
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
