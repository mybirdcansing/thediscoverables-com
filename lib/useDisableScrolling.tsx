import React from 'react'

export const useDisableScrolling = (isDisabled: boolean) => {
  React.useEffect(() => {
    if (isDisabled) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isDisabled])
}
