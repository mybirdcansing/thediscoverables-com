'use server'
import { captureException as captureSentryException } from '@sentry/nextjs'
import { cookies } from 'next/headers'
import nodemailer from 'nodemailer'

export async function handleContactForm(data: FormData) {
  const name = data.get('name')?.toString() || ''
  const email = data.get('email')?.toString() || ''
  const message = data.get('message')?.toString() || ''
  const csrfToken = data.get('csrfToken')?.toString() || ''

  // Retrieve the CSRF token from cookies
  const csrfTokenCookie = cookies().get('csrfToken')?.value

  // Validate CSRF token
  if (!csrfToken || csrfToken !== csrfTokenCookie) {
    return {
      success: false,
      message: 'Invalid CSRF token.',
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
