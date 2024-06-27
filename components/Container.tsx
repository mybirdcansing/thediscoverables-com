import classNames from 'classnames'
import cx from 'classnames'
export interface ContainerProps {
  className?: string
  children: React.ReactNode
}
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cx('container mx-auto px-5', className)}>{children}</div>
  )
}
