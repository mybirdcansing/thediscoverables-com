/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { definePlugin, type DocumentDefinition } from 'sanity'
import type { StructureResolver } from 'sanity/structure'

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

export const settingsStructure = (
  typeDef: DocumentDefinition,
): StructureResolver => {
  return (S) => {
    // The `Settings` root list item
    const settingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
      S.listItem()
        .title(typeDef.title)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        )

    // The default root list items (except custom ones)
    // const defaultListItems = S.documentTypeListItems().filter(
    //   (listItem) => listItem.getId() !== typeDef.name,
    // )
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => listItem.getId() === 'sanity.previewUrlSecret',
    )

    return S.list()
      .title('Content')
      .items([
        settingsListItem,
        S.divider(),
        ...defaultListItems,
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
      ])
  }
}
