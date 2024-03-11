import {
  PortableText,
  type PortableTextReactComponents,
} from '@portabletext/react'

import { SanityImage } from '../SanityImage'
import styles from './AlbumBody.module.css'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function AlbumBody({ content }) {
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
