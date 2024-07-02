import { Container } from 'components/Container'
import { PageHead } from 'components/IndexPageHead'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { SongList } from 'components/SongList'
import type { Settings } from 'lib/types/content'
import { BulletStyle } from 'lib/types/content'
import { SongsViewProps } from 'lib/types/pages'
import isEmpty from 'lodash/isEmpty'

export interface SongsPageProps {
  preview?: boolean
  loading?: boolean
  songsView: SongsViewProps
  settings?: Settings
}

export default function SongsPage(props: SongsPageProps) {
  const { songsView, settings, loading, preview } = props

  if (!songsView || isEmpty(songsView) || !settings || isEmpty(settings)) {
    return null
  }
  const { songs, description, title } = songsView

  return (
    <PageLayout settings={settings} loading={loading} preview={preview}>
      <PageHead settings={settings} />
      <Container>
        <PageHeader
          title={settings.title}
          description={description}
          isLightFont
        />

        <SongList
          title={title}
          songs={songs}
          bulletStyle={BulletStyle.Artwork}
          showAlbumLink
        />
      </Container>
    </PageLayout>
  )
}
