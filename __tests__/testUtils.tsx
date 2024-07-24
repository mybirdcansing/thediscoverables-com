import { render } from '@testing-library/react'
import { PlayerProvider } from 'lib/playerContext'
import { SharedPageProps } from 'lib/types/pages'
import { WindowProvider } from 'lib/windowContext'
import { Router } from 'next/router'
import App from 'pages/_app'
import { ReactNode } from 'react'

export const createMockRouter = (options?: Partial<Router>) =>
  options ? (options as Router) : ({} as Router)

const ProvidersForPlayer = ({ children }: { children: ReactNode }) => {
  return (
    <WindowProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </WindowProvider>
  )
}

export const renderWithApp = async <P extends SharedPageProps>(
  Component: React.ComponentType<P>,
  props: P,
  routerOptions?: Partial<Router>,
) => {
  const mockRouter = createMockRouter(routerOptions)

  render(
    <App Component={Component} pageProps={{ ...props }} router={mockRouter} />,
    { wrapper: ProvidersForPlayer },
  )
}

const customRender = (ui: ReactNode, options = {}) =>
  render(ui, { wrapper: ProvidersForPlayer, ...options })

export * from '@testing-library/react'
export { customRender as render }
