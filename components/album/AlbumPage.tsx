import AlbumBody from 'components/album/AlbumBody'
import AlbumHeader from 'components/album/AlbumHeader'
import AlbumPageHead from 'components/album/AlbumPageHead'
import AlbumTitle from 'components/album/AlbumTitle'
import MoreStories from 'components/MoreStories'
import Container from 'components/PageContainer'
import PageHeader from 'components/PageHeader'
import SectionSeparator from 'components/SectionSeparator'
import type { Album, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

export interface AlbumPageProps {
  preview?: boolean
  loading?: boolean
  album: Album
  moreAlbums: Album[]
  settings: Settings
}

const NO_POSTS: Album[] = []

export default function AlbumPage(props: AlbumPageProps) {
  const { preview, moreAlbums = NO_POSTS, album, settings } = props
  const { title } = settings || {}

  const slug = album?.slug

  if (!slug && !preview) {
    notFound()
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
                date={album.date}
                author={album.author}
              />
              <AlbumBody content={album.content} />
            </article>
            <SectionSeparator />
            {moreAlbums?.length > 0 && <MoreStories albums={moreAlbums} />}
          </>
        )}
      </Container>
    </>
  )
}
