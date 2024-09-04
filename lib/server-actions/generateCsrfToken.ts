// lib/server-actions/generateCsrfToken.ts
'use server'

import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

export async function generateCsrfToken() {
  const csrfToken = uuidv4()

  // Store the CSRF token in a secure HTTP-only cookie
  cookies().set('csrfToken', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })

  return csrfToken
}
