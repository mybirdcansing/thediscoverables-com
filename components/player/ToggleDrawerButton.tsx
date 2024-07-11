import cx from 'classnames'

export const ToggleDrawerButton = ({
  toggleExpandDrawer,
  isDrawerExpanded,
}: {
  toggleExpandDrawer: () => void
  isDrawerExpanded: boolean
}) => {
  return (
    <button onClick={toggleExpandDrawer} className="pt-2">
      <svg
        className={cx('transition-transform', {
          'rotate-180': !isDrawerExpanded,
        })}
        fill="currentColor"
        height="20px"
        width="20px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 386.257 386.257"
      >
        <polygon points="0,96.879 193.129,289.379 386.257,96.879 " />
      </svg>
    </button>
  )
}
