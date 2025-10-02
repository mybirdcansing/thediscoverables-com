interface AlbumTitleProps {
  children: React.ReactNode
}

export const AlbumTitle = ({ children }: AlbumTitleProps) => {
  return (
    <h2 className="text-balance text-left text-xl font-bold leading-tight tracking-tighter md:text-2xl md:leading-none lg:text-3xl">
      {children}
    </h2>
  )
}
