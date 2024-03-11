import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/AlbumDate'
import type { Album } from 'lib/sanity.queries'
import Link from 'next/link'

export default function AlbumPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
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
        <Date dateString={date} />
      </div>
      {excerpt && (
        <p className="mb-4 text-lg leading-relaxed text-pretty">{excerpt}</p>
      )}
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  )
}
