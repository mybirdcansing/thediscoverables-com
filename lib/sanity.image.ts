import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from 'lib/sanity.api'

import { Album } from './types/album'

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format').fit('max')

export const hasAlbumArt = (album: Album | undefined) => {
  return !!album?.coverImage?.asset?._ref
}
