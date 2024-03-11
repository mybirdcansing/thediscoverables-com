import { PageView } from 'components/PageView'
import type { PageViewProps } from 'components/PageView'
import { readToken } from 'lib/sanity.api'
import {
  getAlbumAndMoreStories,
  getAllAlbums,
  getAllAlbumsSlugs,
  getClient,
  getSettings,
} from 'lib/sanity.client'

import { GetStaticProps } from 'next'

interface Query {
  [key: string]: string
}

export default function RenderPage(props: PageViewProps) {
  return <PageView props={props} />
}

export const getStaticProps: GetStaticProps<any, Query> = async (ctx) => {
  const { draftMode = false, params } = ctx
  const slugArray = Array.from(params.slug ?? '')
  const [slugRoot] = slugArray
  const client = getClient(draftMode ? { token: readToken } : undefined)
  if (!slugRoot) {
    const [settings, albums = []] = await Promise.all([
      getSettings(client),
      getAllAlbums(client),
    ])

    return {
      props: {
        type: 'homepage',
        albums,
        settings,
        draftMode,
        token: draftMode ? readToken : '',
      },
    }
  }

  if (slugRoot === 'albums') {
    const albumSlug = slugArray.slice(1).join('/')
    const [settings, { album, moreAlbums }] = await Promise.all([
      getSettings(client),
      getAlbumAndMoreStories(client, albumSlug),
    ])

    if (!album) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        type: 'album',
        album,
        moreAlbums,
        settings,
        draftMode,
        token: draftMode ? readToken : '',
      },
    }
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths = async () => {
  const albumSlugs = await getAllAlbumsSlugs()
  return {
    paths: ['/', ...(albumSlugs?.map(({ slug }) => `/albums/${slug}`) || [])],
    fallback: 'blocking',
  }
}
