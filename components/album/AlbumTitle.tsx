interface AlbumTitleProps {
  children: React.ReactNode
}

export const AlbumTitle = ({ children }: AlbumTitleProps) => {
  return (
    <h1 className="mb-12 text-xl font-bold leading-tight tracking-tighter text-left md:text-2xl md:leading-none lg:text-3xl text-balance">
      {children}
    </h1>
  )
}
