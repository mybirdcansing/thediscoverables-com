import { render } from '@testing-library/react'
import { PlayerProvider } from 'lib/playerContext'
import { WindowProvider } from 'lib/windowContext'
import { ReactNode } from 'react'

const ProvidersForPlayer = ({ children }: { children: ReactNode }) => {
  return (
    <WindowProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </WindowProvider>
  )
}

const customRender = (ui: ReactNode, options = {}) =>
  render(ui, { wrapper: ProvidersForPlayer, ...options })

export * from '@testing-library/react'
export { customRender as render }
