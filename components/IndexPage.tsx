import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import IndexPageHead from 'components/IndexPageHead'
import Layout from 'components/MainLayout'
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
      <Layout preview={preview} loading={loading}>
        <Container>
          <IndexPageHead settings={settings} />
          <BlogHeader title={title} description={description} level={1} />
        </Container>
      </Layout>
    </>
  )
}
