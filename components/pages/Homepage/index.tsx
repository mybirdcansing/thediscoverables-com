'use client'
import cx from 'classnames'
import { AlbumList } from 'components/AlbumList'
import { Container } from 'components/Container'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { SongList } from 'components/SongList'
import { urlForImage } from 'lib/sanity.image'
import { useSettings } from 'lib/settingsContext'
import { BulletStyle } from 'lib/types/bulletStyle'
import type { HomepageProps, SharedPageProps } from 'lib/types/pages'
import { Playlist } from 'lib/types/playlist'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from './Homepage.module.css'

export interface IndexPageProps extends SharedPageProps {
  homepage: HomepageProps
}

const sortSongsByCreatedAt = (songs: Playlist): Playlist => {
  return [...songs].sort((a, b) => (b._createdAt! > a._createdAt! ? 1 : -1))
}

export const Homepage = (props: IndexPageProps) => {
  const { homepage, isDraft, loading } = props
  const { title } = useSettings()
  const { songsTitle, songs, albumsTitle, albums, allSongs, backgroundImage } =
    homepage

  const songsForQueue = React.useMemo(() => {
    if (!songs || !allSongs) {
      return songs
    }

    const songIds = new Set(songs.map((song) => song._id))
    const additionalSongs = allSongs.filter((song) => !songIds.has(song._id))
    const sortedAdditionalSongs = sortSongsByCreatedAt(additionalSongs)

    return [...songs, ...sortedAdditionalSongs]
  }, [songs, allSongs])

  if (!songs) {
    return null
  }
  return (
    <PageLayout isDraft={isDraft} loading={loading}>
      <div className="pb-20 relative">
        <div className="w-full relative h-[200px] xs:h-[320px] sm:h-[380px] lg:h-[640px] xl:h-[720px] 2xl:h-[750px] -z-50">
          <Image
            src={
              backgroundImage?.asset?._ref
                ? urlForImage(backgroundImage).url()
                : '/xx-large-adam_bay6.jpg'
            }
            alt={`${title} hero image`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <Container className="relative">
            <div className="absolute -mt-10 md:pt-18 lg:pt-20 xl:pt-28">
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
