import Date from 'components/album/AlbumDate'
import AlbumTitle from 'components/album/AlbumTitle'
import CoverImage from 'components/CoverImage'
import type { Album } from 'lib/types/content'

export default function AlbumHeader(
  props: Pick<Album, 'title' | 'coverImage' | 'slug' | 'publishDate'>,
) {
  const { title, coverImage, publishDate, slug } = props
  return (
    <>
      <AlbumTitle>{title}</AlbumTitle>

      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-lg">
          <Date dateString={publishDate} />
        </div>
      </div>
    </>
  )
}
