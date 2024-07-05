import { PortableText } from '@portabletext/react'
import cx from 'classnames'
import Link from 'next/link'
import { PortableTextBlock } from 'sanity'

import styles from './PageHeader.module.css'

export const PageHeader = ({
  title,
  description,
  isLightFont,
}: {
  title?: string
  description?: Array<PortableTextBlock>
  isLightFont?: boolean
}) => {
  return (
    <div className="flex flex-col mb-5 md:mb-10 md:flex-row md:justify-between text-pretty">
      <h1
        className={cx(
          'mt-8 text-xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight md:tracking-tighter text-pretty',
          isLightFont ? 'text-slate-300' : 'text-slate-700',
        )}
      >
        <Link href="/" className="hover:underline">
          {title}
        </Link>
      </h1>
      {description && (
        <h4
          className={cx(
            `mt-5 text-center text-lg md:pl-8 md:text-left`,
            styles.portableText,
            isLightFont ? 'text-slate-300' : 'text-slate-700',
          )}
        >
          <PortableText value={description} />
        </h4>
      )}
    </div>
  )
}
