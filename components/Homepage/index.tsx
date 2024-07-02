import cx from 'classnames'
import { AlbumList } from 'components/AlbumList'
import { Container } from 'components/Container'
import { PageHead } from 'components/IndexPageHead'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { SongList } from 'components/SongList'
import { BulletStyle, type Settings } from 'lib/types/content'
import type { HomepageProps } from 'lib/types/pages'
import Image from 'next/image'
import React from 'react'

import styles from './Homepage.module.css'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  homepage: HomepageProps
  settings: Settings
}

export const Homepage = (props: IndexPageProps) => {
  const { settings, homepage, preview, loading } = props

  const { title } = settings || {}
  const { songsTitle, songs, albumsTitle, albums } = homepage

  return (
    <PageLayout settings={settings} preview={preview} loading={loading}>
      <div className="pb-20 relative">
        <PageHead settings={settings} />
        <div className="w-full relative h-[180px] sm:h-[350px] lg:h-[650px] -z-10">
          <Image
            src="/xx-large-adam_bay5.jpg"
            alt={`${title} hero image`}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
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
          <SongList
            title={songsTitle}
            songs={songs}
            bulletStyle={BulletStyle.Artwork}
            showAlbumLink
          />
          <AlbumList albums={albums} albumsTitle={albumsTitle} />
        </section>
      </div>
    </PageLayout>
  )
}
