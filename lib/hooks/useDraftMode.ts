import { useRouter } from 'next/router'

export const useDraftMode = () => {
  const { isPreview } = useRouter()
  return isPreview
}
