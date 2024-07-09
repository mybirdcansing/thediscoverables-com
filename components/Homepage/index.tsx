import cx from 'classnames'
import { AlbumList } from 'components/AlbumList'
import { Container } from 'components/Container'
import { PageHead } from 'components/IndexPageHead'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { SongList } from 'components/SongList'
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
  const { songsTitle, songs, albumsTitle, albums } = homepage

  return (
    <PageLayout preview={preview} loading={loading}>
      <div className="pb-20 relative">
        <PageHead />
        <div className="w-full relative h-[180px] sm:h-[350px] lg:h-[650px] -z-50">
          <Image
            src="/xx-large-adam_bay5.jpg"
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
              showAlbumLink
            />

            <div className="max-w-4xl w-full flex flex-col ">
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
