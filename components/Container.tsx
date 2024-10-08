import cx from 'classnames'
export interface ContainerProps {
  className?: string
  children: React.ReactNode
}
export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cx('container mx-auto px-4 md:px-5', className)}>
      {children}
    </div>
  )
}
