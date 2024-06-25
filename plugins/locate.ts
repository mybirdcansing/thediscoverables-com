import { map, Observable } from 'rxjs'
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from 'sanity/presentation'

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'settings') {
    return {
      message: 'This document is used on all pages',
      tone: 'caution',
    } satisfies DocumentLocationsState
  }

  if (params.type === 'album') {
    // Listen to the query and fetch the draft and published document
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id && defined(slug.current)][0]{slug,title}`,
      params,
      { perspective: 'previewDrafts' },
    ) as Observable<{
      slug: { current: string }
      title: string | null
    } | null>

    return doc$.pipe(
      map((doc) => {
        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/albums/${doc.slug.current}`,
            },
            {
              title: 'Home',
              href: `/`,
            },
          ],
        }
      }),
    )
  }

  return null
}
