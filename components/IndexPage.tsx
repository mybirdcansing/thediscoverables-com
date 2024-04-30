import IndexPageHead from 'components/IndexPageHead'
import PageHeader from 'components/PageHeader'
import type { Album, Settings } from 'lib/types/content'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  albums: Album[]
  settings: Settings
}

export default function Homepage(props: IndexPageProps) {
  const { settings } = props
  const { title, description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />
      <PageHeader title={title} description={description} level={1} />
    </>
  )
}
