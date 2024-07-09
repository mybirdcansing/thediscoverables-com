interface AlbumTitleProps {
  children: React.ReactNode
}

export const AlbumTitle = ({ children }: AlbumTitleProps) => {
  return (
    <h2 className="text-xl font-bold leading-tight tracking-tighter text-left md:text-2xl md:leading-none lg:text-3xl text-balance">
      {children}
    </h2>
  )
}
