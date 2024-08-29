import { useCallback, useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

type UseReCAPTCHAProps = {
  action: string
}

export const useReCAPTCHA = ({ action }: UseReCAPTCHAProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.warn('Execute recaptcha not yet available')
      setError('Recaptcha is not available yet. Please try again later.')
      return
    }

    try {
      const token = await executeRecaptcha(action)
      setRecaptchaToken(token)
      setError(null)
    } catch (error) {
      console.error('Recaptcha execution failed:', error)
      setError('Failed to verify recaptcha. Please try again.')
    }
  }, [executeRecaptcha, action])

  useEffect(() => {
    handleReCaptchaVerify()
  }, [handleReCaptchaVerify])

  return { recaptchaToken, error }
}
