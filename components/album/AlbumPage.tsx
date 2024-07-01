import { AlbumDescription } from 'components/album/AlbumBody'
import { AlbumPageHead } from 'components/album/AlbumPageHead'
import { Container } from 'components/Container'
import { CoverImage } from 'components/CoverImage'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { SongList } from 'components/SongList'
import type { Album, Settings } from 'lib/types/content'
import { BulletStyle } from 'lib/types/content'

import { AlbumDate } from './AlbumDate'
import { AlbumTitle } from './AlbumTitle'

export interface AlbumPageProps {
  preview?: boolean
  loading?: boolean
  album: Album
  settings?: Settings
}

export default function AlbumPage(props: AlbumPageProps) {
  const { album, settings, loading, preview } = props

  if (!album || !settings) {
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
    <PageLayout settings={settings} loading={loading} preview={preview}>
      <AlbumPageHead settings={settings} album={album} />
      <Container>
        <PageHeader title={pageTitle} level={1} isLightFont />
        <div className="flex flex-col place-items-center">
          <div className="max-w-4xl w-full flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="mb-8 sm:mx-0 md:mb-16">
                <CoverImage
                  title={albumTitle}
                  image={coverImage}
                  priority
                  slug={slug}
                />
              </div>
              <div>
                <AlbumTitle>{albumTitle}</AlbumTitle>
                <div className="mx-auto max-w-2xl">
                  <div className="mb-6 text-lg">
                    <AlbumDate dateString={publishDate} />
                  </div>
                </div>
                <AlbumDescription content={description} />
              </div>
            </div>
          </div>
        </div>
        <SongList songs={album.songs} bulletStyle={BulletStyle.Number} />
      </Container>
    </PageLayout>
  )
}
