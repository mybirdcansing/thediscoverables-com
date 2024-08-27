'use client'
/* eslint-disable @next/next/no-html-link-for-pages */
import cx from 'classnames'
import { Container } from 'components/Container'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

export default function AlertBanner({
  preview,
  loading,
}: {
  preview?: boolean
  loading?: boolean
}) {
  const shouldShow = useSyncExternalStore(
    subscribe,
    () => window.top === window,
    () => false,
  )

  if (!shouldShow || !preview) return null

  return (
    <div
      className={cx(
        'order-b border-accent-7 bg-slate-400 text-white bottom-10 left-10 fixed z-50 rounded-xl',
        { 'animate-pulse': loading },
      )}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {'Previewing drafts. '}
          <a
            href={`/api/disable-draft?redirect=${encodeURIComponent(window.location.href)}`}
            className="underline transition-colors duration-200 hover:text-cyan"
          >
            Back to published
          </a>
        </div>
      </Container>
    </div>
  )
}
