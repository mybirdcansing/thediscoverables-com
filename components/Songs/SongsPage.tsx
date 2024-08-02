'use client'
import { Container } from 'components/Container'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { SongList } from 'components/SongList'
import { useSettings } from 'lib/settingsContext'
import { BulletStyle } from 'lib/types/bulletStyle'
import { SharedPageProps, SongsViewProps } from 'lib/types/pages'
import isEmpty from 'lodash/isEmpty'

export interface SongsPageProps extends SharedPageProps {
  _type?: 'songs'
  songsView: SongsViewProps
}

export default function SongsPage(props: SongsPageProps) {
  const { songsView } = props
  const settings = useSettings()
  if (!songsView || isEmpty(songsView)) {
    return null
  }
  const { songs, description, title } = songsView

  return (
    <PageLayout>
      <Container>
        <PageHeader
          title={settings.title}
          description={description}
          isLightFont
        />
        <div className="flex flex-col place-items-center">
          <SongList
            title={title}
            songs={songs}
            bulletStyle={BulletStyle.Artwork}
            showAlbumLink
          />
        </div>
      </Container>
    </PageLayout>
  )
}
