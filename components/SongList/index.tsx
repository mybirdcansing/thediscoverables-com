import cx from 'classnames'
import { usePlayerContext } from 'lib/playerContext'
import { hasAlbumArt, urlForImage } from 'lib/sanity.image'
import { Song } from 'lib/types/content'
import Image from 'next/image'

import Container from '../PageContainer'
import styles from './SongList.module.css'
import Link from 'next/link'

export interface SongListProps {
  title: string
  songs: Array<Song>
  bulletStyle?: 'number' | 'artwork'
  showAlbumLink?: boolean
}

export const SongList = ({
  title,
  songs,
  bulletStyle = 'artwork',
  showAlbumLink = false,
}: SongListProps) => {
  const playerContext = usePlayerContext()
  const { activeSong, isLoading, isSongPlaying } = playerContext
  const isActiveSong = (song) => activeSong && activeSong._id === song._id

  return (
    <Container>
      <h2>{title}</h2>
      <table className={styles['song-table']}>
        <tbody>
          {songs?.length &&
            songs.map((song, index) => {
              const artSrc =
                bulletStyle === 'artwork' && hasAlbumArt(song)
                  ? urlForImage(song.album.coverImage).url()
                  : undefined

              const albumSlug =
                showAlbumLink && song.album?.slug?.current
                  ? song.album.slug.current
                  : undefined

              return (
                <tr
                  key={song._id}
                  className={cx(styles['song-list-row'], {
                    [styles['active-song']]: isActiveSong(song),
                    [styles.loading]: isActiveSong(song) && isLoading,
                    [styles.playing]: isActiveSong(song) && isSongPlaying,
                    [styles.paused]: isActiveSong(song) && !isSongPlaying,
                  })}
                >
                  <td className={styles['song-list-album-cell']}>
                    <Image
                      src="/play-icon.svg"
                      alt="Play"
                      className={styles.play}
                      height={46}
                      width={46}
                    />
                    <Image
                      src="/pause-icon.svg"
                      alt="Pause"
                      className={styles.pause}
                      height={46}
                      width={46}
                    />
                    <Image
                      src="/spinner-icon.svg"
                      alt="Loading"
                      className={styles.spinner}
                      height={46}
                      width={46}
                    />

                    <div className={styles['song-list-album-artwork-div']}>
                      {bulletStyle === 'number' && (
                        <svg
                          className={cx(
                            styles['song-list-album-artwork'],
                            styles['song-list-index'],
                          )}
                        >
                          <text x="16" y="27" fill="white">
                            {index + 1}
                          </text>
                        </svg>
                      )}
                      {bulletStyle === 'artwork' &&
                        (artSrc ? (
                          <Image
                            src={artSrc}
                            alt="song.album.title"
                            className={styles['song-list-album-artwork']}
                            height={46}
                            width={46}
                          />
                        ) : (
                          <Image
                            src="/headphones-icon.svg"
                            alt=""
                            className={cx(
                              styles['song-list-album-artwork'],
                              styles['song-list-listen-icon'],
                            )}
                            height={46}
                            width={46}
                          />
                        ))}
                    </div>
                  </td>
                  <td className={styles['song-title-cell']}>
                    <div className={styles['song-title']}>{song.title}</div>
                    {showAlbumLink && albumSlug && (
                      <Link
                        className={styles['album-title']}
                        href={`/albums/${encodeURIComponent(albumSlug)}`}
                      >
                        {song.album.title}
                      </Link>
                    )}
                  </td>
                  <td className={styles['song-duration-cell']}>
                    {song.duration}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </Container>
  )
}
