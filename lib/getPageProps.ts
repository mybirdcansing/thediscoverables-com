// lib/getPageProps.ts
import { AppContext } from 'next/app'

export const getPageProps = async (appContext: AppContext) => {
  const { Component } = appContext
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(appContext.ctx)
  }

  return pageProps
}
