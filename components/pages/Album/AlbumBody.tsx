import { PortableTextView } from 'components/PortableTextView'
import { PortableTextBlock } from 'sanity'

export interface AlbumDescriptionProps {
  content?: Array<PortableTextBlock>
}
export const AlbumDescription = ({ content }: AlbumDescriptionProps) => {
  if (content) {
    return <PortableTextView content={content} />
  }
}
