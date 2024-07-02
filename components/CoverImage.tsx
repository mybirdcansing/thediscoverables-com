import cx from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
  title?: string
  slug?: { current: string }
  image: any
  priority?: boolean
}

export const CoverImage = (props: CoverImageProps) => {
  const { title = '', slug, image: source, priority } = props
  const image = source?.asset?._ref ? (
    <div
      className={cx('shadow-small', {
        'transition-shadow duration-200 hover:shadow-medium': slug?.current,
      })}
    >
      <Image
        className="aspect-square"
        width={750}
        height={750}
        alt={`Cover image for ${title}`}
        src={urlForImage(source).url()}
        priority={priority}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug?.current ? (
        <Link href={`/albums/${slug.current}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
