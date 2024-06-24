import AlbumDate from 'components/album/AlbumDate'
import CoverImage from 'components/CoverImage'
import type { Album } from 'lib/types/content'
import Link from 'next/link'

export default function HeroAlbum({
  title,
  coverImage,
  publishDate,
  slug,
}: Pick<Album, 'title' | 'coverImage' | 'publishDate' | 'slug'>) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage slug={slug} title={title} image={coverImage} priority />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl text-balance">
            <Link href={`/albums/${slug}`} className="hover:underline">
              {title || 'Untitled'}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <AlbumDate dateString={publishDate} />
          </div>
        </div>
      </div>
    </section>
  )
}
