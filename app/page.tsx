import { Homepage, type IndexPageProps } from 'components/pages/Homepage'
import { useSanityClient } from 'lib/hooks/useSanityClient'
import { getHomepage, getSettings } from 'lib/sanity.getters'
import { SettingsProvider } from 'lib/settingsContext'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import { generateMetadataForPage } from './metadataGenerator'

const PreviewHomepage = dynamic<IndexPageProps>(
  () =>
    import('components/pages/Homepage/PreviewHomepage').then(
      (mod) => mod.PreviewHomepage,
    ),
  {
    ssr: false,
  },
)

export const generateMetadata = generateMetadataForPage

export default async function Page() {
  const client = useSanityClient()
  const [homepage, settings] = await Promise.all([
    getHomepage(client),
    getSettings(client),
  ])

  const isDraft = draftMode().isEnabled

  return (
    <SettingsProvider settings={settings} isDraft={isDraft}>
      {isDraft ? (
        <PreviewHomepage homepage={homepage} />
      ) : (
        <Homepage homepage={homepage} />
      )}
    </SettingsProvider>
  )
}
