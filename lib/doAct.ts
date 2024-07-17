import { act } from '@testing-library/react'
import { usePlayerContext } from 'lib/playerContext'

import { PlayerContextAction } from './types/player'

export const doAct = (context: PlayerContextAction | PlayerContextAction[]) => {
  act(() => {
    const { dispatch } = usePlayerContext()
    if (Array.isArray(context)) {
      context.forEach((item) => {
        dispatch(item)
      })
    } else {
      dispatch(context)
    }
  })
}
