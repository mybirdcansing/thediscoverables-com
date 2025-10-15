'use server'
import { captureException as captureSentryException } from '@sentry/nextjs'
import { cookies } from 'next/headers'
import nodemailer from 'nodemailer'

import type { FormData } from '../types/contactFormData'

export async function handleContactForm(data: FormData) {
  const { name, email, message, csrfToken } = data
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
    from: '"Contact Form" <thediscoverables@gmail.com',
    to: smtpUser,
    replyTo: email,
    subject: `Fan mail from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message:
${message}
  `,
    html: `
    <h2>Fan mail</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
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
