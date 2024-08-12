'use client'
import { getClient } from 'lib/sanity.client'
import { LiveQueryProvider } from 'next-sanity/preview'
import { useMemo } from 'react'

export interface PreviewProviderProps {
  children: React.ReactNode
  token: string
}

export default function PreviewProvider({
  children,
  token,
}: PreviewProviderProps) {
  const client = useMemo(() => getClient({ token }), [token])
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>
}
