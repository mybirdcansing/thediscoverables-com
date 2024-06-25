import IndexPageHead from 'components/IndexPageHead'
import PageHeader from 'components/PageHeader'
import type { Settings } from 'lib/types/content'
import type { HomepageProps } from 'lib/types/pages'

export interface IndexPageProps {
  preview?: boolean
  homepage: HomepageProps
  settings: Settings
}

export default function Homepage(props: IndexPageProps) {
  const { settings, homepage } = props

  const { title, description: settingsDescription } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />
      <PageHeader
        title={title}
        description={homepage.description || settingsDescription}
        level={1}
      />
    </>
  )
}
