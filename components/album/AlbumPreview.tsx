import Date from 'components/album/AlbumDate'
import CoverImage from 'components/CoverImage'
import type { Album } from 'lib/types/content'
import Link from 'next/link'

export default function AlbumPreview({
  title,
  coverImage,
  publishDate,
  slug,
}: Omit<Album, '_id'>) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
      </div>
      <h3 className="mb-3 text-3xl leading-snug text-balance">
        <Link href={`/albums/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4 text-lg">
        <Date dateString={publishDate} />
      </div>
    </div>
  )
}
