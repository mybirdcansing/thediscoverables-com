import { type PortableTextReactComponents } from '@portabletext/react'

import { SanityImage } from './SanityImage'

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}
