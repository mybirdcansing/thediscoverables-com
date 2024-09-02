'use server'
import { captureException as captureSentryException } from '@sentry/nextjs'
import nodemailer from 'nodemailer'

export enum RecaptchaErrorCode {
  'missing-input-secret',
  'invalid-input-secret',
  'missing-input-response',
  'invalid-input-response',
  'bad-request',
  'timeout-or-duplicate',
}
export interface RecaptchaResult {
  success: true | false
  'error-codes'?: RecaptchaErrorCode[]
}
export async function handleContactForm(data: FormData) {
  const name = data.get('name')?.toString() || ''
  const email = data.get('email')?.toString() || ''
  const message = data.get('message')?.toString() || ''
  const recaptcha = data.get('recaptcha')?.toString() || ''

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
  const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptcha}`

  const recaptchaResult = (await fetch(recaptchaUrl, { method: 'POST' }).then(
    (res) => res.json(),
  )) as RecaptchaResult

  if (!recaptchaResult?.success) {
    const errorCodes = recaptchaResult['error-codes'] ?? []

    captureSentryException(
      `reCAPTCHA verification failed with error code${errorCodes.length > 1 ? 's' : ''}: ${errorCodes.join(', ')}`,
    )
    return {
      success: false,
      message: 'reCAPTCHA verification failed. Please try again.',
    }
  }

  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const mailOptions = {
    from: email,
    to: smtpUser,
    subject: `Fan mail from ${name}`,
    text: message,
  }

  try {
    await transporter.sendMail(mailOptions)
    return {
      success: true,
      message: 'Email sent successfully!',
    }
  } catch (error) {
    captureSentryException(`Error sending email: ${error}`)
    return {
      success: false,
      message: 'Failed to send email.',
    }
  }
}
