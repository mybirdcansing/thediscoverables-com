export interface FormState {
  name: string
  email: string
  message: string
  captchaIsValid: boolean
}

export type FormData = FormState & { csrfToken: string }
