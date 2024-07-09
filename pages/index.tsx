import { Homepage, type IndexPageProps } from 'components/Homepage'
import { readToken } from 'lib/sanity.api'
import { getClient, Query } from 'lib/sanity.client'
import { getHomepage } from 'lib/sanity.getters'
import type { HomepageProps } from 'lib/types/pages'
import isEmpty from 'lodash/isEmpty'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'

const PreviewHomepage = dynamic<IndexPageProps>(
  () =>
    import('components/Homepage/PreviewHomepage').then(
      (mod) => mod.PreviewHomepage,
    ),
  {
    ssr: false,
  },
)

export default function RenderPage(props: HomepageProps) {
  const { draftMode } = props

  return draftMode ? (
    <PreviewHomepage homepage={props} />
  ) : (
    <Homepage homepage={props} />
  )
}

export const getStaticProps: GetStaticProps<any, Query> = async (ctx) => {
  const { draftMode = false } = ctx

  const client = getClient(draftMode ? { token: readToken } : undefined)

  const homepage = await getHomepage(client)

  if (!homepage || isEmpty(homepage)) {
    return {
      notFound: true,
    }
  }
  const {
    backgroundImage,
    description,
    albums,
    songs,
    songsTitle,
    albumsTitle,
    allSongs,
  } = homepage

  return {
    props: {
      backgroundImage,
      description,
      albums,
      songs,
      songsTitle,
      albumsTitle,
      draftMode,
      allSongs,
      token: draftMode ? readToken : '',
    },
    revalidate: Number(process.env.REVALIDATE_SECONDS ?? 900),
  }
}
