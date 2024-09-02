'use client'

import { ContactFormContent } from 'components/pages/Contact/ContactPage'
import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const ContactPage = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
    >
      <ContactFormContent />
    </GoogleReCaptchaProvider>
  )
}

export default ContactPage
