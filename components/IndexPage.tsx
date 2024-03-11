import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import type { Album, Settings } from 'lib/sanity.queries'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  albums: Album[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, settings } = props
  const { title, description } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} description={description} level={1} />
        </Container>
      </Layout>
    </>
  )
}
