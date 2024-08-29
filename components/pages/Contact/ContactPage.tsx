'use client'

import { Container } from 'components/Container'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { handleContactForm } from 'lib/server-actions/handleContactForm'
import { useSettings } from 'lib/settingsContext'
import { useReCAPTCHA } from 'lib/useReCAPTCHA'
import React, { useState } from 'react'

export const ContactFormContent = () => {
  const { title } = useSettings()
  const { recaptchaToken, error: recaptchaError } = useReCAPTCHA({
    action: 'contact_form',
  })

  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setFormError(null) // Clear previous errors
    const form = e.currentTarget
    const formData = new FormData(form)

    if (!recaptchaToken) {
      setFormError(recaptchaError || 'ReCAPTCHA verification failed.')
      setLoading(false)
      return
    }

    formData.append('recaptcha', recaptchaToken)

    const response = await handleContactForm(formData)
    if (response.success) {
      setFormSuccess(true)
      form.reset()
    } else {
      setFormError('There was an issue submitting the form. Please try again.')
    }

    setLoading(false)
  }

  // Function to reset the form state to show the form again
  const resetForm = () => {
    setFormSuccess(false)
    setFormError(null)
  }

  return (
    <PageLayout darkBg>
      <Container>
        <PageHeader title={title} isLightFont />
        <div className="flex flex-col w-full">
          <div className="max-w-[600px] w-full mx-auto">
            <h2 className="text-xl font-bold mb-5">Contact Us</h2>
            <div className="space-y-4 my-4">
              <p>
                We’d love to hear from you! Whether you have questions,
                feedback, or just want to say hello, we’re here to connect with
                our fans and community.
              </p>

              <p>
                Please fill out the form below, and we’ll get back to you as
                soon as possible.
              </p>
            </div>
            {formSuccess ? (
              <div className="my-4">
                <p className="text-green-600 mb-4">
                  Thank you for reaching out! We have received your message and
                  will get back to you shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {formError && <p className="text-red-600">{formError}</p>}

                <button
                  type="submit"
                  className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>

                <p className="mt-4 text-xs">
                  We value your privacy. Your personal information and email
                  address will not be shared or sold to third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}
