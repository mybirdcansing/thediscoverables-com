import Date from 'components/album/AlbumDate'
import AlbumTitle from 'components/album/AlbumTitle'
import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import type { Album } from 'lib/sanity.queries'

export default function AlbumHeader(
  props: Pick<Album, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>,
) {
  const { title, coverImage, date, author, slug } = props
  return (
    <>
      <AlbumTitle>{title}</AlbumTitle>
      <div className="hidden md:mb-12 md:block">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
