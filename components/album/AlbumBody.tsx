import { PortableTextBlock } from 'components/PortableTextBlock'

export const AlbumDescription = ({ content }) => {
  if (content) {
    return <PortableTextBlock content={content} />
  }
}
