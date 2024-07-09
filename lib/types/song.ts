import { Album } from 'lib/types/album'
import { AudioFile } from 'lib/types/audioFile'
import { PortableTextBlock } from 'sanity'

export interface Song {
  _type?: 'song'
  _id: string
  title?: string
  url?: string
  description?: Array<PortableTextBlock>
  lyrics?: Array<PortableTextBlock>
  duration?: string
  album?: Album
  audioFile?: AudioFile
}
