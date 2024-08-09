import { Homepage, type IndexPageProps } from 'components/pages/Homepage'
import { getSanityClient } from 'lib/getSanityClient'
import { getHomepage } from 'lib/sanity.getters'
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
  const homepage = await getHomepage(getSanityClient())

  return draftMode().isEnabled ? (
    <PreviewHomepage homepage={homepage} />
  ) : (
    <Homepage homepage={homepage} />
  )
}
