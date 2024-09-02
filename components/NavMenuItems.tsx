import Link from 'next/link'

export interface NavMenuItemsProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void | undefined
}
export const NavMenuItems: React.FC<NavMenuItemsProps> = ({ onClick }) => {
  return (
    <ul className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-items-center">
      <li>
        <Link href={'/'} className="hover:underline" onClick={onClick}>
          Home
        </Link>
      </li>
      {/* 
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li> 
      */}
      <li>
        <Link href="/contact" className="hover:underline" onClick={onClick}>
          Contact
        </Link>
      </li>
    </ul>
  )
}
