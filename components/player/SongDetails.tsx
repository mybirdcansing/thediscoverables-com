import { format } from 'date-fns/format'
import { handleInnerClick } from 'lib/playerHelper'
import { hasAlbumArt, urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface SongDetailsProps {
  activeSong: any
}

export const SongDetails = ({ activeSong }: SongDetailsProps) => {
  const album = activeSong.album
  console.log(album)

  const artSrc =
    !!album && hasAlbumArt(album)
      ? urlForImage(album?.coverImage).height(94).width(94).url()
      : undefined

  const albumSlug = album?.slug?.current ? album.slug.current : undefined

  return (
    <div className="flex flex-row place-items-center gap-2">
      {artSrc && (
        <div>
          <Image
            src={artSrc}
            alt="Song artwork thumbnail"
            height={40}
            width={40}
          />
        </div>
      )}

      <div className="flex flex-col gap-0.5">
        <div className="font-bold">{activeSong.title}</div>
        {albumSlug && (
          <div className="flex flex-row gap-1 text-sm">
            <Link
              href={`/albums/${activeSong.album.slug.current}`}
              onClick={handleInnerClick}
              className="hover:underline"
            >
              {activeSong.album.title}
            </Link>
            <span>•</span>
            <span>{format(album.publishDate, 'yyyy')}</span>
          </div>
        )}
      </div>
    </div>
  )
}
