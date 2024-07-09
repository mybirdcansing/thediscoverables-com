import { AlbumDescription } from 'components/album/AlbumBody'
import { AlbumPageHead } from 'components/album/AlbumPageHead'
import { Container } from 'components/Container'
import { CoverImage } from 'components/CoverImage'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { SongList } from 'components/SongList'
import { useSettings } from 'lib/settingsContext'
import type { Album } from 'lib/types/album'
import { BulletStyle } from 'lib/types/bulletStyle'
import isEmpty from 'lodash/isEmpty'

import { AlbumDate } from './AlbumDate'
import { AlbumTitle } from './AlbumTitle'

export interface AlbumPageProps {
  preview?: boolean
  loading?: boolean
  album: Album
}

export default function AlbumPage(props: AlbumPageProps) {
  const { album, loading, preview } = props
  const settings = useSettings()
  if (!album || isEmpty(album)) {
    return null
  }

  const songsWithAlbum = album.songs?.map((song) => ({
    ...song,
    album: {
      ...album,
      songs: undefined,
    },
  }))
  const { title: pageTitle } = settings
  const {
    coverImage,
    publishDate,
    description,
    title: albumTitle,
    slug,
  } = album
  return (
    <PageLayout loading={loading} preview={preview}>
      <AlbumPageHead album={album} />
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
        <div className="flex flex-col place-items-center">
          <SongList songs={songsWithAlbum} bulletStyle={BulletStyle.Number} />
        </div>
        <div className="md:hidden">
          <AlbumDescription content={description} />
        </div>
      </Container>
    </PageLayout>
  )
}
