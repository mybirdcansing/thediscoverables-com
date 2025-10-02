'use client'
import { captureException as captureSentryException } from '@sentry/nextjs'
import { Container } from 'components/Container'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { Puzzle } from 'components/Puzzle/Puzzle'
import { generateCsrfToken } from 'lib/server-actions/generateCsrfToken' // Import the server action
import { handleContactForm } from 'lib/server-actions/handleContactForm'
import { useSettings } from 'lib/settingsContext'
import { FormState } from 'lib/types/contactFormData'
import React, { useEffect, useMemo, useRef, useState } from 'react'

type Errors = Partial<Record<keyof FormState, string>>

export const ContactFormContent = () => {
  const { title } = useSettings()
  const [state, setState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    captchaIsValid: false,
  })

  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [shouldFocusOnSubmit, setShouldFocusOnSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const errors = useMemo<Errors>(() => {
    const e: Errors = {}
    const email = state.email.trim()
    if (!state.name.trim()) e.name = 'Name is required.'
    if (!email) e.email = 'Email is required.'
    if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email))
      e.email = 'Please enter a valid email address.'
    if (!state.message) e.message = 'Please enter a message.'
    if (!isCaptchaSolved) e.captchaIsValid = 'Please solve the puzzle.'
    return e
  }, [isCaptchaSolved, state])

  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    if (!submitted || isValid || !shouldFocusOnSubmit) return
    if (errors.name) {
      nameRef.current?.focus()
    } else if (errors.email) {
      emailRef.current?.focus()
    } else if (errors.message) {
      messageRef.current?.focus()
    }
    setShouldFocusOnSubmit(false)
  }, [submitted, isValid, errors, shouldFocusOnSubmit])

  const assign = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((s) => ({ ...s, [key]: value }))
  }

  const onBlur = (key: keyof FormState) =>
    setTouched((t) => ({ ...t, [key]: true }))

  const handlePuzzleSolved = () => {
    setIsCaptchaSolved(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched((t) => ({
      ...t,
      name: true,
      email: true,
      message: true,
      captchaIsValid: true,
    }))
    setFormError(null)
    setSubmitted(true)
    setShouldFocusOnSubmit(true)
    if (!isValid) return

    setLoading(true)

    try {
      const csrfToken = await generateCsrfToken()
      const formData: FormState & { csrfToken: string } = {
        ...state,
        csrfToken,
      }

      const response = await handleContactForm(formData)

      if (response.success) {
        setFormSuccess(true)
        setState({
          name: '',
          email: '',
          message: '',
          captchaIsValid: false,
        })
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

  console.log({ errors, touched })

  const resetForm = () => {
    setTouched({})
    setFormSuccess(false)
    setFormError(null)
    setIsCaptchaSolved(false)
    setSubmitted(false)
    setShouldFocusOnSubmit(false)
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
                noValidate
                className="flex w-full flex-col gap-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => assign('name', e.target.value)}
                    onBlur={() => onBlur('name')}
                  />
                  {errors.name && touched.name && (
                    <div className="mt-1 text-red-200">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => assign('email', e.target.value)}
                    onBlur={() => onBlur('email')}
                  />
                  {errors.email && touched.email && (
                    <div className="mt-1 text-red-200">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => assign('message', e.target.value)}
                    onBlur={() => onBlur('message')}
                  />
                  {errors.message && touched.message && (
                    <div className="mt-1 text-red-200">{errors.message}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Do the puzzle to prove you&apos;re a human
                  </label>

                  <div className="mx-auto w-fit p-2">
                    <Puzzle onCorrectPositions={handlePuzzleSolved} />
                  </div>
                </div>
                {errors.captchaIsValid && touched.captchaIsValid && (
                  <div className="mt-1 text-red-200">
                    {errors.captchaIsValid}
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                  {formError && <p className="text-red-600">{formError}</p>}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}
