import AlbumDescription from 'components/album/AlbumBody'
import AlbumHeader from 'components/album/AlbumHeader'
import AlbumPageHead from 'components/album/AlbumPageHead'
import AlbumTitle from 'components/album/AlbumTitle'
import Container from 'components/PageContainer'
import PageHeader from 'components/PageHeader'
import type { Album, Settings } from 'lib/types/content'
import { notFound } from 'next/navigation'

export interface AlbumPageProps {
  preview?: boolean
  loading?: boolean
  album: Album
  settings: Settings
}

export default function AlbumPage(props: AlbumPageProps) {
  const { preview, album, settings } = props
  const { title } = settings || {}

  const slug = album?.slug

  if (!slug && !preview) {
    console.error('not an album and not a preview')
  }

  return (
    <>
      <AlbumPageHead settings={settings} album={album} />

      <Container>
        <PageHeader title={title} level={2} />
        {preview && !album ? (
          <AlbumTitle>Loading…</AlbumTitle>
        ) : (
          <>
            <article>
              <AlbumHeader
                title={album.title}
                coverImage={album.coverImage}
                publishDate={album.publishDate}
              />
              <AlbumDescription content={album.description} />
            </article>
          </>
        )}
      </Container>
    </>
  )
}
