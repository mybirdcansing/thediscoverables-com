import cx from 'classnames'
import IndexPageHead from 'components/IndexPageHead'
import PageHeader from 'components/PageHeader'
import { SongList } from 'components/SongList'
import { urlForImage } from 'lib/sanity.image'
import type { Settings } from 'lib/types/content'
import type { HomepageProps } from 'lib/types/pages'
import Image from 'next/image'
import React from 'react'

import Container from '../PageContainer'
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
    <>
      <IndexPageHead settings={settings} />

      <section className="w-full relative h-[180px] sm:h-[350px] lg:h-[650px] -z-10">
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
            <PageHeader title={title} level={2} />
          </div>
        </Container>

        <div
          className={cx(
            'z-0 absolute h-full w-full',
            styles['gradient-overlay'],
          )}
        />
      </section>

      <SongList
        title={songsTitle}
        songs={songs}
        bulletStyle="artwork"
        showAlbumLink
      />
    </>
  )
}
