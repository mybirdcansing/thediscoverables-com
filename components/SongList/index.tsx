import cx from 'classnames'
import { usePlayerContext } from 'lib/playerContext'
import { hasAlbumArt, urlForImage } from 'lib/sanity.image'
import { BulletStyle } from 'lib/types/bulletStyle'
import { Playlist } from 'lib/types/playlist'
import { Song } from 'lib/types/song'
import Image from 'next/image'
import Link from 'next/link'

import styles from './SongList.module.css'

export interface SongListProps {
  title?: string
  songs?: Playlist
  bulletStyle?: BulletStyle
  showAlbumLink?: boolean
  songsForQueue?: Playlist
}

export const SongList = ({
  title,
  songs,
  bulletStyle = BulletStyle.Artwork,
  showAlbumLink = false,
  songsForQueue,
}: SongListProps) => {
  const {
    setSong,
    state: { activeSong, isLoading, isPlaying },
  } = usePlayerContext()

  const isActiveSong = (song: Song | undefined) => activeSong?._id === song?._id
  const handleClickSong = (song: Song) => {
    setSong(song, songsForQueue ?? songs)
  }
  return (
    <div className="max-w-4xl w-full flex flex-col gap-1">
      {title && <h2 className="pb-2">{title}</h2>}
      {songs?.length &&
        songs.map((song, index) => {
          const { _id, album, duration, title: songTitle } = song
          const artSrc =
            bulletStyle === BulletStyle.Artwork && hasAlbumArt(album)
              ? urlForImage(album?.coverImage).height(94).width(94).url()
              : undefined

          const albumSlug =
            showAlbumLink && album?.slug?.current
              ? album.slug.current
              : undefined
          const songNumber = index + 1

          return (
            <div
              key={_id}
              className={cx(
                'w-full flex flex-row py-1',
                styles['song-list-row'],
                {
                  'gap-4': bulletStyle === BulletStyle.Artwork,
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
                className="cursor-pointer relative"
              >
                <Image
                  unoptimized
                  src="/play-icon.svg"
                  alt="Play"
                  className={styles.play}
                  height={50}
                  width={50}
                />
                <Image
                  unoptimized
                  src="/pause-icon.svg"
                  alt="Pause"
                  className={styles.pause}
                  height={50}
                  width={50}
                />
                <Image
                  unoptimized
                  src="/spinner-icon.svg"
                  alt="Loading"
                  className={styles.spinner}
                  height={50}
                  width={50}
                />

                <div className={styles['song-list-album-artwork']}>
                  {bulletStyle === BulletStyle.Number && (
                    <svg
                      x="0"
                      y="0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      className={styles['song-list-index']}
                    >
                      <title>{`Song number ${songNumber}`}</title>
                      <text x="20" y="27" fill="white">
                        {songNumber}
                      </text>
                    </svg>
                  )}
                  {bulletStyle === BulletStyle.Artwork &&
                    (artSrc ? (
                      <Image
                        src={artSrc}
                        alt="Song artwork thumbnail"
                        height={50}
                        width={50}
                        className="h-auto"
                      />
                    ) : (
                      <Image
                        src="/headphones-icon.svg"
                        alt="Listen to song thumbnail"
                        height={50}
                        width={50}
                        className="h-auto"
                      />
                    ))}
                </div>
              </button>
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-col gap-1 justify-center">
                  <button
                    onClick={() => {
                      handleClickSong(song)
                    }}
                    className="cursor-pointer p-0 text-left"
                  >
                    {songTitle}
                  </button>
                  {showAlbumLink && albumSlug && (
                    <Link
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      href={`/albums/${encodeURIComponent(albumSlug)}`}
                      className="text-slate-400 hover:underline"
                    >
                      {album?.title ?? 'Album'}
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
  )
}
