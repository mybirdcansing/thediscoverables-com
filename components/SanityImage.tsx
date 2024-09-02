import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { getClient } from 'lib/sanity.client'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

export interface SanityImageProps {
  asset: SanityImageSource
  alt: string
  caption?: string
}

export const SanityImage = (props: SanityImageProps) => {
  const { asset, alt, caption } = props
  const imageProps = useNextSanityImage(getClient(), asset)

  if (!imageProps) return null

  return (
    <figure>
      <Image
        {...imageProps}
        alt={alt}
        sizes="(max-width: 800px) 100vw, 800px"
      />
      {caption && (
        <figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400 text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
