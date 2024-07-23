import { SanityImage } from 'lib/types/sanityImage'
import { PortableTextBlock } from 'sanity'

export interface Settings {
  _type?: 'settings'
  title?: string
  bandName?: string
  description?: Array<PortableTextBlock>
  ogImage?: SanityImage
}
