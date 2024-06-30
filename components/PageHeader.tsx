import { PortableText } from '@portabletext/react'
import cx from 'classnames'
import Link from 'next/link'
import { PortableTextBlock } from 'sanity'

import styles from './PageHeader.module.css'

export const PageHeader = ({
  title,
  description,
  level,
  isLightFont,
}: {
  title: string
  description?: Array<PortableTextBlock>
  level: 1 | 2
  isLightFont?: boolean
}) => {
  switch (level) {
    case 1:
      return (
        <header className="flex flex-col mb-5 md:mb-10 md:flex-row md:justify-between text-pretty">
          <h1
            className={cx(
              'mt-8 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight md:tracking-tighter text-pretty',
              isLightFont ? 'text-slate-300' : 'text-slate-700',
            )}
          >
            <Link href="/">{title}</Link>
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
        </header>
      )

    case 2:
      return (
        <header>
          <h2
            className={cx(
              'mb-20 mt-8 text-2xl md:text-4xl lg:text-6xl font-bold leading-tight tracking-tight md:tracking-tighter text-pretty',
              isLightFont ? 'text-slate-300' : 'text-slate-700',
            )}
          >
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </h2>
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`,
      )
  }
}
