import { CogIcon, HomeIcon } from '@sanity/icons'
import { ComponentType } from 'react'
import { definePlugin } from 'sanity'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'

import { previewDocumentViews } from './previewPane'

interface TypeDef {
  title: string
  icon: ComponentType
  name: string
}
// Define the actual types for settings and homepage
const settingsType: TypeDef = {
  title: 'Settings',
  icon: CogIcon,
  name: 'settings',
}

const homepageType: TypeDef = {
  title: 'Homepage',
  icon: HomeIcon,
  name: 'homepage',
}
export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: 'settings',
    document: {
      // Hide 'Settings' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId !== type)
        }

        return prev
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
})

const singletonStructureItem = (
  S: StructureBuilder,
  typeDef: TypeDef,
  allowPreview = false,
) =>
  S.listItem()
    .title(typeDef.title)
    .icon(typeDef.icon)
    .child(
      S.document()
        .id(typeDef.name)
        .schemaType(typeDef.name)
        .documentId(typeDef.name)
        .views(allowPreview ? previewDocumentViews(S) : []),
    )

export const settingsStructure = (): StructureResolver => {
  return (S) => {
    // The `Settings` root list item
    const settingsListItem = singletonStructureItem(S, settingsType)
    // The `Homepage` list item
    const homepageListItem = singletonStructureItem(S, homepageType, true)

    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => listItem.getId() === 'sanity.previewUrlSecret',
    )

    return S.list()
      .title('Content')
      .items([
        homepageListItem,
        S.listItem()
          .title('Songs')
          .child(
            S.documentList()
              .title('Songs')
              .schemaType('song')
              .filter('_type == "song"'),
          ),
        S.listItem()
          .title('Albums')
          .child(
            S.documentList()
              .title('Albums')
              .schemaType('album')
              .filter('_type == "album"'),
          ),
        S.divider(),
        settingsListItem,
        ...defaultListItems,
      ])
  }
}
