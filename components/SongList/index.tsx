import cx from 'classnames'
import { usePlayerContext } from 'lib/playerContext'
import { hasAlbumArt, urlForImage } from 'lib/sanity.image'
import { BulletStyle, Song } from 'lib/types/content'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '../Container'
import styles from './SongList.module.css'

export interface SongListProps {
  title?: string
  songs: Array<Song>
  bulletStyle?: BulletStyle
  showAlbumLink?: boolean
}

export const SongList = ({
  title,
  songs,
  bulletStyle = BulletStyle.Artwork,
  showAlbumLink = false,
}: SongListProps) => {
  const {
    setSong,
    state: { activeSong, isLoading, isPlaying },
  } = usePlayerContext()

  const isActiveSong = (song) => activeSong && activeSong._id === song._id
  const handleClickSong = (song: Song) => {
    setSong(song, songs)
  }
  return (
    <Container className="flex flex-col place-items-center">
      <div className="max-w-4xl w-full flex flex-col gap-1">
        {title && <h2>{title}</h2>}
        {songs?.length &&
          songs.map((song, index) => {
            const { _id, album, duration, title: songTitle } = song
            const artSrc =
              bulletStyle === BulletStyle.Artwork && hasAlbumArt(album)
                ? urlForImage(album.coverImage).height(94).width(94).url()
                : undefined

            const albumSlug =
              showAlbumLink && album?.slug?.current
                ? album.slug.current
                : undefined

            return (
              <div
                key={_id}
                className={cx(
                  'w-full flex flex-row gap-4 py-1',
                  styles['song-list-row'],
                  {
                    [styles['active-song']]: isActiveSong(song),
                    [styles.loading]: isActiveSong(song) && isLoading,
                    [styles.playing]: isActiveSong(song) && isPlaying,
                    [styles.paused]: isActiveSong(song) && !isPlaying,
                  },
                )}
              >
                <button
                  onClick={() => {
                    handleClickSong(song)
                  }}
                  className="cursor-pointer"
                >
                  <Image
                    unoptimized
                    src="/play-icon.svg"
                    alt="Play"
                    className={styles.play}
                    height={46}
                    width={46}
                  />
                  <Image
                    unoptimized
                    src="/pause-icon.svg"
                    alt="Pause"
                    className={styles.pause}
                    height={46}
                    width={46}
                  />
                  <Image
                    unoptimized
                    src="/spinner-icon.svg"
                    alt="Loading"
                    className={styles.spinner}
                    height={46}
                    width={46}
                  />

                  <div className={styles['song-list-album-artwork']}>
                    {bulletStyle === BulletStyle.Number && (
                      <svg
                        x="0px"
                        y="0px"
                        viewBox="0 0 46 46"
                        className={styles['song-list-index']}
                      >
                        <text x="16" y="27" fill="white">
                          {index + 1}
                        </text>
                      </svg>
                    )}
                    {bulletStyle === BulletStyle.Artwork &&
                      (artSrc ? (
                        <Image
                          src={artSrc}
                          alt="Song artwork thumbnail"
                          height={46}
                          width={46}
                          className="h-auto"
                        />
                      ) : (
                        <Image
                          src="/headphones-icon.svg"
                          alt="Listen to song thumbnail"
                          height={46}
                          width={46}
                          className="h-auto"
                        />
                      ))}
                  </div>
                </button>
                <div className="w-full flex flex-row justify-between">
                  <div className="flex flex-col gap-2 justify-center">
                    <button
                      onClick={() => {
                        handleClickSong(song)
                      }}
                      className="cursor-pointer py-2 md:p-0"
                    >
                      {songTitle}
                    </button>
                    {showAlbumLink && albumSlug && (
                      <Link
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        href={`/albums/${encodeURIComponent(albumSlug)}`}
                        className="text-slate-400 hover:underline py-2 md:p-0"
                      >
                        {album.title ?? 'Album'}
                      </Link>
                    )}
                  </div>
                  <div className={cx('flex flex-col justify-center pr-2')}>
                    {duration}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </Container>
  )
}
