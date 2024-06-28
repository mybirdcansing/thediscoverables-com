import { PortableText } from '@portabletext/react'
import { portableTextComponents } from 'components/portableTextComponents'

import styles from './PortableTextBlock.module.css'

export const PortableTextBlock = ({ content }) => {
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      <PortableText value={content} components={portableTextComponents} />
    </div>
  )
}
