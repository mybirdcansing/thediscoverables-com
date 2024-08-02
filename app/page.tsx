import { Homepage, type IndexPageProps } from 'components/Homepage'
import { useSanityClient } from 'lib/hooks/useSanityClient'
import { getHomepage, getSettings } from 'lib/sanity.getters'
import { SettingsProvider } from 'lib/settingsContext'
// import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

const PreviewHomepage = dynamic<IndexPageProps>(
  () =>
    import('components/Homepage/PreviewHomepage').then(
      (mod) => mod.PreviewHomepage,
    ),
  {
    ssr: false,
  },
)

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   // read route params
//   const id = params.id

//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json())

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }

export default async function Page() {
  const client = useSanityClient()
  const [homepage, settings] = await Promise.all([
    getHomepage(client),
    getSettings(client),
  ])
  const { isEnabled: isDraftModeEnabled } = draftMode()

  return (
    <SettingsProvider settings={settings}>
      {isDraftModeEnabled ? (
        <PreviewHomepage homepage={homepage} />
      ) : (
        <Homepage homepage={homepage} />
      )}
    </SettingsProvider>
  )
}
