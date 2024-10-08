/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { debugSecrets } from '@sanity/preview-url-secret/sanity-plugin-debug-secrets'
import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  dataset,
  DRAFT_MODE_ROUTE,
  projectId,
} from 'lib/sanity.api'
import { locate } from 'plugins/locate'
import { previewDocumentNode } from 'plugins/previewPane'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import albumType from 'schemas/album'
import homepageType from 'schemas/homepage'
import settingsType from 'schemas/settings'
import songType from 'schemas/song'
import songsType from 'schemas/songs'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Artist Website'

const productionPlugins =
  process.env.NODE_ENV !== 'production'
    ? [debugSecrets(), visionTool({ defaultApiVersion: apiVersion })]
    : []

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [homepageType, songType, songsType, albumType, settingsType],
  },
  plugins: [
    structureTool({
      structure: settingsStructure(),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode(),
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: DRAFT_MODE_ROUTE,
        },
      },
    }),
    media(),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsType.name }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    ...productionPlugins,
  ],
})
