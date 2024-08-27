'use client'
import { Container } from 'components/Container'
import { CoverImage } from 'components/CoverImage'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { AlbumDescription } from 'components/pages/Album/AlbumBody'
import { SongList } from 'components/SongList'
import { useSettings } from 'lib/settingsContext'
import type { Album } from 'lib/types/album'
import { BulletStyle } from 'lib/types/bulletStyle'
import { SharedPageProps } from 'lib/types/pages'
import isEmpty from 'lodash/isEmpty'

import { AlbumDate } from './AlbumDate'
import { AlbumTitle } from './AlbumTitle'

export interface AlbumPageProps extends SharedPageProps {
  album: Album
}

export default function AlbumPage(props: AlbumPageProps) {
  const { album, loading, isDraft } = props
  const settings = useSettings()

  if (isEmpty(album)) {
    return null
  }

  const { title: pageTitle } = settings

  const {
    coverImage,
    publishDate,
    description,
    title: albumTitle,
    slug,
  } = album

  return (
    <PageLayout darkBg loading={loading} isDraft={isDraft}>
      <Container>
        <PageHeader title={pageTitle} isLightFont />

        <section className="flex flex-col place-items-center">
          <div className="max-w-4xl w-full flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="mb-8 md:mx-0 md:mb-16">
                <CoverImage
                  title={albumTitle}
                  image={coverImage}
                  priority
                  slug={slug}
                />
              </div>
              <div>
                <AlbumTitle>{albumTitle}</AlbumTitle>
                <div className="my-6 text-sm">
                  <AlbumDate dateString={publishDate} />
                </div>
                <div className="hidden md:block">
                  <AlbumDescription content={description} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {album.songs && (
          <div className="flex flex-col place-items-center">
            <SongList songs={album.songs} bulletStyle={BulletStyle.Number} />
          </div>
        )}
        <div className="md:hidden">
          <AlbumDescription content={description} />
        </div>
      </Container>
    </PageLayout>
  )
}
