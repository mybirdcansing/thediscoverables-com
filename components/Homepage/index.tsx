'use client'
import cx from 'classnames'
import { AlbumList } from 'components/AlbumList'
import { Container } from 'components/Container'
import { PageHead } from 'components/IndexPageHead'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { SongList } from 'components/SongList'
import { urlForImage } from 'lib/sanity.image'
import { useSettings } from 'lib/settingsContext'
import { BulletStyle } from 'lib/types/bulletStyle'
import type { HomepageProps } from 'lib/types/pages'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from './Homepage.module.css'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  homepage: HomepageProps
}

export const Homepage = (props: IndexPageProps) => {
  const { homepage, preview, loading } = props
  const settings = useSettings()
  const { title } = settings || {}
  const { songsTitle, songs, albumsTitle, albums, allSongs, backgroundImage } =
    homepage

  const songsForQueue = React.useMemo(() => {
    if (!songs || !allSongs) {
      return songs
    }

    const songIds = new Set(songs.map((song) => song._id))
    const additionalSongs = allSongs.filter((song) => !songIds.has(song._id))

    // Sort the additionalSongs by _createdAt in descending order
    const sortedAdditionalSongs = additionalSongs.sort((a, b) =>
      b._createdAt! > a._createdAt! ? 1 : -1,
    )

    // Create the new array by concatenating `songs` and `sortedAdditionalSongs`
    return [...songs, ...sortedAdditionalSongs]
  }, [songs, allSongs])

  if (!songs) {
    return null
  }
  return (
    <PageLayout preview={preview} loading={loading}>
      <div className="pb-20 relative">
        <PageHead />
        <div className="w-full relative h-[260px] sm:h-[340px] lg:h-[640px] -z-50">
          <Image
            src={
              backgroundImage?.asset?._ref
                ? urlForImage(backgroundImage).url()
                : '/xx-large-adam_bay5.jpg'
            }
            alt={`${title} hero image`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />

          <Container className="relative">
            <div className="absolute top-0">
              <PageHeader title={title} />
            </div>
          </Container>

          <div
            className={cx(
              'z-0 absolute h-full w-full',
              styles['gradient-overlay'],
            )}
          />
        </div>
        <section className="flex flex-col gap-8">
          <Container className="flex flex-col gap-8 place-items-center">
            <SongList
              title={songsTitle}
              songs={songs}
              bulletStyle={BulletStyle.Artwork}
              songsForQueue={songsForQueue}
              showAlbumLink
            />

            <div className="max-w-4xl w-full flex flex-col">
              <Link href="/songs" className="hover:underline">
                ALL SONGS &gt;
              </Link>
            </div>
          </Container>
          <AlbumList albums={albums} albumsTitle={albumsTitle} />
        </section>
      </div>
    </PageLayout>
  )
}
