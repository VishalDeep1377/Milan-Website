import type { RegistrationFormData, RegistrationValidationErrors } from '../types'

export function validateRegistrationForm(form: RegistrationFormData): {
  isValid: boolean
  errors: RegistrationValidationErrors
} {
  const errors: RegistrationValidationErrors = {}

  const cleanName = form.name.trim()
  if (!cleanName) {
    errors.name = 'Please enter your full name.'
  } else if (cleanName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.'
  } else if (!/^[a-zA-Z\s.'-]+$/.test(cleanName)) {
    errors.name = 'Name should only contain letters and spaces.'
  }

  const cleanEmail = form.email.trim()
  if (!cleanEmail) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    errors.email = 'Enter a valid email address (e.g., student@srmist.edu.in).'
  }

  const cleanPhone = form.phone.replace(/[\s-]/g, '')
  if (!cleanPhone) {
    errors.phone = 'Please enter your 10-digit mobile number.'
  } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number starting with 6–9.'
  }

  const cleanCollege = form.college.trim()
  if (!cleanCollege) {
    errors.college = 'Please enter your institution/college.'
  } else if (cleanCollege.length < 2) {
    errors.college = 'Institution name must be at least 2 characters long.'
  }

  if (!form.event || form.event.trim() === '') {
    errors.event = 'Please choose an event to register for.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
