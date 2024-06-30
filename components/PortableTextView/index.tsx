import { PortableText } from '@portabletext/react'
import { portableTextComponents } from 'components/portableTextComponents'
import { PortableTextBlock } from 'sanity'

import styles from './PortableTextBlock.module.css'

export interface PortableTextViewProps {
  content: Array<PortableTextBlock>
}

export const PortableTextView = ({ content }: PortableTextViewProps) => {
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      <PortableText value={content} components={portableTextComponents} />
    </div>
  )
}
