import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from 'lib/sanity.api'

import { Song } from './types/content'

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format').fit('max')

export const hasAlbumArt = (song: Song) => {
  return !!song?.album?.coverImage?.asset?._ref
}
