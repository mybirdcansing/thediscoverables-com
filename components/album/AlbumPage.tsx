import AlbumDescription from 'components/album/AlbumBody'
import AlbumHeader from 'components/album/AlbumHeader'
import AlbumPageHead from 'components/album/AlbumPageHead'
import AlbumTitle from 'components/album/AlbumTitle'
import Container from 'components/PageContainer'
import PageHeader from 'components/PageHeader'
import type { Album, Settings } from 'lib/types/content'

export interface AlbumPageProps {
  preview?: boolean
  loading?: boolean
  album: Album
  settings: Settings
}

export default function AlbumPage(props: AlbumPageProps) {
  const { album, settings } = props

  if (!album || !settings) return null

  const { title: pageTitle } = settings
  const { coverImage, publishDate, description, title: albumTitle } = album
  return (
    <>
      <AlbumPageHead settings={settings} album={album} />
      <Container>
        <PageHeader title={pageTitle} level={2} />
        <AlbumHeader
          title={albumTitle}
          coverImage={coverImage}
          publishDate={publishDate}
        />
        <AlbumDescription content={description} />
      </Container>
    </>
  )
}
