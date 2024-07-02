// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import { DRAFT_MODE_ROUTE } from 'lib/sanity.api'
import type {
  DefaultDocumentNodeResolver,
  StructureBuilder,
} from 'sanity/structure'
import { Iframe, IframeOptions } from 'sanity-plugin-iframe-pane'
import albumType from 'schemas/album'
import homepageType from 'schemas/homepage'
import songsType from 'schemas/songs'

export const iframeOptions = {
  url: {
    origin: 'same-origin',
    preview: (document) => {
      if (!document) {
        return new Error('Missing document')
      }
      switch (document._type) {
        case 'album':
          return (document as any)?.slug?.current
            ? `/albums/${(document as any).slug.current}`
            : new Error('Missing slug')
        case 'homepage':
          return `/`
        case 'songs':
          return `/songs`

        default:
          return new Error(
            `Unknown document type: ${document?._type}. See iframeOptions in plugins/previewPane/index.tsx`,
          )
      }
    },
    draftMode: DRAFT_MODE_ROUTE,
  },
  reload: { button: true },
} satisfies IframeOptions

export const previewDocumentViews = (S: StructureBuilder) => [
  S.view.form(),
  S.view.component(Iframe).options(iframeOptions).title('Preview'),
]
export const previewDocumentNode = (): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    if (
      [albumType.name, homepageType.name, songsType.name].includes(
        schemaType as any,
      )
    ) {
      return S.document().views(previewDocumentViews(S))
    }
  }
}
