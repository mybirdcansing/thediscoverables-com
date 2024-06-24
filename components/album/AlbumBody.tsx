import PortableTextBlock from 'components/PortableTextBlock'

export default function AlbumDescription({ content }) {
  if (content) {
    return <PortableTextBlock content={content} />
  }
}
