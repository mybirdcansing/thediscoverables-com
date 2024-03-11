import AlbumPreview from 'components/album/AlbumPreview'
import type { Album } from 'lib/sanity.queries'

export default function MoreStories({ albums }: { albums: Album[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Stories
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {albums.map((album) => (
          <AlbumPreview
            key={album._id}
            title={album.title}
            coverImage={album.coverImage}
            date={album.date}
            author={album.author}
            slug={album.slug}
            excerpt={album.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
