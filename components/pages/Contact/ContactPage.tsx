'use client'
import { captureException as captureSentryException } from '@sentry/nextjs'
import { Container } from 'components/Container'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { Puzzle } from 'components/Puzzle/Puzzle'
import { generateCsrfToken } from 'lib/server-actions/generateCsrfToken' // Import the server action
import { handleContactForm } from 'lib/server-actions/handleContactForm'
import { useSettings } from 'lib/settingsContext'
import React, { useState } from 'react'

export const ContactFormContent = () => {
  const { title } = useSettings()

  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false)

  const handlePuzzleSolved = () => {
    setIsCaptchaSolved(true)
    setFormError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setFormError(null)
    const form = e.currentTarget
    const formData = new FormData(form)

    if (!isCaptchaSolved) {
      setFormError('Captcha verification failed.')
      setLoading(false)
      return
    }

    try {
      const csrfToken = await generateCsrfToken()

      formData.append('csrfToken', csrfToken)
      const response = await handleContactForm(formData)

      if (response.success) {
        setFormSuccess(true)
        form.reset()
        window.scrollTo(0, 0)
      } else {
        setFormError(
          'There was an issue submitting the form. Please try again.',
        )
      }
    } catch (error) {
      captureSentryException(`Failed to verify send contact form: ${error}`)
      setFormError(
        'There was an issue submitting the form. Please try again later.',
      )
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormSuccess(false)
    setFormError(null)
    setIsCaptchaSolved(false)
  }

  return (
    <PageLayout darkBg>
      <Container>
        <PageHeader title={title} isLightFont />
        <div className="flex w-full flex-col">
          <div className="mx-auto w-full max-w-[600px]">
            <h2 className="mb-5 text-xl font-bold">Contact Us</h2>
            <p className="my-4 space-y-4">
              Whether you have questions, feedback, or just want to say hello,
              we’re here to connect with our fans and community.
            </p>

            {formSuccess ? (
              <div className="my-4">
                <p className="mb-4 text-green-600">
                  Thank you for reaching out! We have received your message and
                  will get back to you shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {formError && <p className="text-red-600">{formError}</p>}
                <div>
                  <label className="block text-sm font-medium">
                    Do the puzzle to prove you&apos;re a human
                  </label>

                  <div className="mx-auto w-fit p-2">
                    <Puzzle onCorrectPositions={handlePuzzleSolved} />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}
