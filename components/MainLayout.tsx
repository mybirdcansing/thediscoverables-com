import AlertBanner from 'components/AlertBanner'

export default function MainLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AlertBanner preview={preview} loading={loading} />
      <div>Header navigation</div>

      <main>{children}</main>
      <div className="place-items-end">footer navigation</div>
    </div>
  )
}
