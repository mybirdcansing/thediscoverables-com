import { Dot } from 'components/Dot'
import { getYear } from 'date-fns/getYear'
import { usePlayerContext } from 'lib/playerContext'
import { handleInnerClick } from 'lib/playerHelper'
import { hasAlbumArt, urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface SongDetailsProps {
  activeSong: any
}

export const SongDetails = ({ activeSong }: SongDetailsProps) => {
  const { bandName, title, album } = activeSong
  const { dispatch } = usePlayerContext()
  const handleGoToPage = (e: React.MouseEvent) => {
    handleInnerClick(e)
    dispatch({
      type: 'SET_DRAWER_EXPANDED',
      payload: false,
    })
  }

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

      <div className="flex flex-col gap-0.5 overflow-clip  whitespace-nowrap">
        <div className="font-bold">{title}</div>
        {albumSlug && (
          <div className="hidden md:flex flex-row gap-1 text-sm">
            <Link href="/" onClick={handleGoToPage} className="hover:underline">
              {bandName}
            </Link>
            <div className="md:hidden">{bandName}</div>
            <div className="hidden md:flex flex-row gap-1">
              <Dot />
              <Link
                href={`/albums/${album.slug.current}`}
                onClick={handleGoToPage}
                className="hover:underline"
              >
                {album.title}
              </Link>
              <Dot />
              <span>{getYear(album.publishDate)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
