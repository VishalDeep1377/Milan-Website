import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

// Lightweight replica of validation logic to verify rules
function validateRegistrationForm(form) {
  const errors = {}

  const cleanName = (form.name || '').trim()
  if (!cleanName) {
    errors.name = 'Please enter your full name.'
  } else if (cleanName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.'
  } else if (!/^[a-zA-Z\s.'-]+$/.test(cleanName)) {
    errors.name = 'Name should only contain letters and spaces.'
  }

  const cleanEmail = (form.email || '').trim()
  if (!cleanEmail) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    errors.email = 'Enter a valid email address (e.g., student@srmist.edu.in).'
  }

  const cleanPhone = (form.phone || '').replace(/[\s-]/g, '')
  if (!cleanPhone) {
    errors.phone = 'Please enter your 10-digit mobile number.'
  } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number starting with 6–9.'
  }

  const cleanCollege = (form.college || '').trim()
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

describe('Registration Form Validation Suite', () => {
  it('should accept valid applicant details', () => {
    const valid = {
      name: 'Aditya Sharma',
      email: 'aditya.s@srmist.edu.in',
      phone: '9876543210',
      college: 'SRM Institute of Science and Technology',
      event: 'Pulse of the Planet'
    }
    const result = validateRegistrationForm(valid)
    assert.equal(result.isValid, true)
    assert.deepEqual(result.errors, {})
  })

  it('should reject empty fields', () => {
    const empty = { name: '', email: '', phone: '', college: '', event: '' }
    const result = validateRegistrationForm(empty)
    assert.equal(result.isValid, false)
    assert.ok(result.errors.name)
    assert.ok(result.errors.email)
    assert.ok(result.errors.phone)
    assert.ok(result.errors.college)
    assert.ok(result.errors.event)
  })

  it('should reject names shorter than 2 characters', () => {
    const invalid = { name: 'A', email: 'test@example.com', phone: '9876543210', college: 'SRMIST', event: 'Pulse of the Planet' }
    const result = validateRegistrationForm(invalid)
    assert.equal(result.isValid, false)
    assert.match(result.errors.name, /at least 2 characters/i)
  })

  it('should reject invalid email formats', () => {
    const invalid = { name: 'Dev Sharma', email: 'invalid-email-no-at', phone: '9876543210', college: 'SRMIST', event: 'Pulse of the Planet' }
    const result = validateRegistrationForm(invalid)
    assert.equal(result.isValid, false)
    assert.match(result.errors.email, /valid email address/i)
  })

  it('should enforce 10-digit Indian phone rules (starting with 6-9)', () => {
    // Starts with 5 (invalid)
    let res = validateRegistrationForm({ name: 'Dev', email: 'dev@test.com', phone: '5123456789', college: 'SRMIST', event: 'Mic Drop' })
    assert.equal(res.isValid, false)
    assert.match(res.errors.phone, /10-digit Indian mobile/i)

    // Only 9 digits (invalid)
    res = validateRegistrationForm({ name: 'Dev', email: 'dev@test.com', phone: '987654321', college: 'SRMIST', event: 'Mic Drop' })
    assert.equal(res.isValid, false)

    // Formatted with spaces or dashes (should pass)
    res = validateRegistrationForm({ name: 'Dev', email: 'dev@test.com', phone: '98765 43210', college: 'SRMIST', event: 'Mic Drop' })
    assert.equal(res.isValid, true)
  })

  it('should reject missing event selection', () => {
    const res = validateRegistrationForm({ name: 'Dev', email: 'dev@test.com', phone: '9876543210', college: 'SRMIST', event: '' })
    assert.equal(res.isValid, false)
    assert.match(res.errors.event, /choose an event/i)
  })
})
