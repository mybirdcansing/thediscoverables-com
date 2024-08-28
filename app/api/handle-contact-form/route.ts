'use server'

import nodemailer from 'nodemailer'

export async function handleContactForm(data: FormData) {
  const name = data.get('name')?.toString() || ''
  const email = data.get('email')?.toString() || ''
  const message = data.get('message')?.toString() || ''
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  console.log({ name, email, message })

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  // Set up email data
  const mailOptions = {
    from: email,
    to: smtpUser,
    subject: `Contact form submission from ${name}`,
    text: message,
  }

  try {
    // Send the email
    await transporter.sendMail(mailOptions)
    return {
      success: true,
      message: 'Email sent successfully!',
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      message: 'Failed to send email.',
    }
  }
}
