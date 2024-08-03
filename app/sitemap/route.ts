// app/api/sitemap/route.ts

import { getClient } from 'lib/sanity.client'
import { getAllAlbums, getSongs } from 'lib/sanity.getters'
import { Album } from 'lib/types/album'
import { Song } from 'lib/types/song'
import { NextResponse } from 'next/server'

type SitemapLocation = {
  url: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
  lastmod?: Date
}

// Manually add routes to the sitemap
const defaultUrls: Array<SitemapLocation> = [
  {
    url: '/',
    changefreq: 'daily',
    priority: 1,
    lastmod: new Date(),
  },
]

const createSitemap = (locations: SitemapLocation[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locations
        .map((location) => {
          return `<url>
                    <loc>${baseUrl}${location.url}</loc>
                    <priority>${location.priority}</priority>
                    ${
                      location.lastmod
                        ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
                        : ''
                    }
                  </url>`
        })
        .join('')}
  </urlset>
  `
}

const getMostRecentDate = (songs: Array<Song>): string | null => {
  if (songs.length === 0) return null

  const mostRecentSong = songs.reduce((latest, song) => {
    const songDate = song._createdAt
    return songDate > latest ? songDate : latest
  }, songs[0]._createdAt)

  return mostRecentSong
}

export async function GET() {
  const client = getClient()

  // Get list of Album urls
  const albums = await getAllAlbums(client)
  const songsView = await getSongs(client)

  const albumUrls: SitemapLocation[] = (albums ?? [])
    .filter(({ slug = '' }) => slug)
    .map((album: Album) => {
      return {
        url: `/albums/${album.slug?.current}`,
        priority: 0.5,
        lastmod: new Date(album._updatedAt),
      }
    })

  // Combine default urls with dynamic album urls
  const locations = [...defaultUrls, ...albumUrls]
  const songs = songsView?.songs
  const latestSongDate = songs ? getMostRecentDate(songs) : undefined
  if (latestSongDate) {
    locations.push({
      url: `/songs`,
      priority: 0.5,
      lastmod: new Date(latestSongDate),
    })
  }
  // Generate the sitemap XML
  const sitemap = createSitemap(locations)

  // Set the response to XML
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
