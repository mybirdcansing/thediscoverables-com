import cx from 'classnames'
import { AlbumList } from 'components/AlbumList'
import { PageHead } from 'components/IndexPageHead'
import { PageHeader } from 'components/PageHeader'
import { SongList } from 'components/SongList'
import { urlForImage } from 'lib/sanity.image'
import { BulletStyle, type Settings } from 'lib/types/content'
import type { HomepageProps } from 'lib/types/pages'
import Image from 'next/image'
import React from 'react'

import Container from '../Container'
import styles from './Homepage.module.css'

export interface IndexPageProps {
  preview?: boolean
  homepage: HomepageProps
  settings: Settings
}

export default function Homepage(props: IndexPageProps) {
  const { settings, homepage } = props

  const { title } = settings || {}
  const { backgroundImage, songsTitle, songs, albumsTitle, albums } = homepage

  const backgroundImageUrl = React.useMemo(
    () =>
      backgroundImage?.asset?._ref
        ? urlForImage(backgroundImage).url()
        : undefined,
    [backgroundImage],
  )

  return (
    <div className="pb-20">
      <PageHead settings={settings} />
      <div className="w-full relative h-[180px] sm:h-[350px] lg:h-[650px] -z-10">
        {backgroundImageUrl && (
          <Image
            src={backgroundImageUrl}
            alt={`${title} hero image`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
        <Container>
          <div className="absolute z-10 left-10 -top-2 sm:top-0 lg:top-6">
            <PageHeader title={title} level={1} />
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
  )
}
