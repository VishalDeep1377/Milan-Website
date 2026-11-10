import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Copy, Loader2, X } from 'lucide-react'
import type { EventItem, RegistrationFormData, RegistrationRecord, RegistrationValidationErrors } from '../types'
import { validateRegistrationForm } from '../utils/validation'
import { registrationService } from '../services/registrationService'

interface RegistrationModalProps {
  initialEvent: EventItem | null
  events: EventItem[]
  onClose: () => void
  onSuccessToast: (message: string) => void
}

export function RegistrationModal({
  initialEvent,
  events,
  onClose,
  onSuccessToast
}: RegistrationModalProps) {
  const [form, setForm] = useState<RegistrationFormData>({
    name: '',
    email: '',
    phone: '',
    college: '',
    event: initialEvent ? initialEvent.title : ''
  })

  const [errors, setErrors] = useState<RegistrationValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeBtnRef.current?.focus()
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear error for the field being edited
    if (errors[field] || errors.duplicate) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        delete next.duplicate
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { isValid, errors: validationErrors } = validateRegistrationForm(form)
    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const result = await registrationService.submit(form)
      if (!result.success || !result.record) {
        setErrors({ duplicate: result.error || 'Registration failed. Please try again.' })
        setIsSubmitting(false)
        return
      }

      setSubmittedRecord(result.record)
      onSuccessToast(`Registered for ${result.record.event}! Pass: ${result.record.registrationNumber}`)
    } catch {
      setErrors({ duplicate: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2500)
    } catch {
      // Fallback
    }
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="register-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close registration modal"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {submittedRecord ? (
          <div className="success-state" role="status">
            <div className="success-icon" aria-hidden="true">
              <Check size={30} />
            </div>
            <p className="eyebrow">YOU'RE ON THE LIST</p>
            <h2 id="register-title">
              See you
              <br />
              <em>at Milan.</em>
            </h2>

            <div className="ticket-badge">
              <div className="ticket-header">
                <span className="ticket-label">OFFICIAL PASS CODE</span>
                <span className="ticket-status">CONFIRMED</span>
              </div>
              <div className="ticket-number-row">
                <span className="ticket-code">{submittedRecord.registrationNumber}</span>
                <button
                  type="button"
                  className="ticket-copy-btn"
                  onClick={() => handleCopyCode(submittedRecord.registrationNumber)}
                  aria-label="Copy pass code"
                >
                  {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedCode ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <div className="ticket-details">
                <div>
                  <small>DELEGATE</small>
                  <strong>{submittedRecord.name}</strong>
                </div>
                <div>
                  <small>EVENT</small>
                  <strong>{submittedRecord.event}</strong>
                </div>
              </div>
            </div>

            <p>
              Your registration has been saved successfully in this browser. Keep your pass code handy during festival entry at the SRMIST Kattankulathur campus.
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={onClose}
            >
              DONE <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">TAKE YOUR PLACE</p>
            <h2 id="register-title">
              Get in
              <br />
              <em>the picture.</em>
            </h2>
            <p className="form-intro">
              A few details and you're one step closer to the experience.
            </p>

            {errors.duplicate && (
              <div className="error-banner" role="alert">
                {errors.duplicate}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label>
                  FULL NAME
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <small role="alert">{errors.name}</small>}
                </label>

                <label>
                  EMAIL ADDRESS
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <small role="alert">{errors.email}</small>}
                </label>
              </div>

              <div className="form-row">
                <label>
                  MOBILE NUMBER
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="10-digit mobile (e.g. 9876543210)"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <small role="alert">{errors.phone}</small>}
                </label>

                <label>
                  COLLEGE / INSTITUTION
                  <input
                    type="text"
                    value={form.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    placeholder="Your institution / university"
                    aria-invalid={!!errors.college}
                  />
                  {errors.college && <small role="alert">{errors.college}</small>}
                </label>
              </div>

              <label>
                CHOOSE YOUR EVENT
                <select
                  value={form.event}
                  onChange={(e) => handleInputChange('event', e.target.value)}
                  aria-invalid={!!errors.event}
                >
                  <option value="">Select an event</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.title}>
                      {ev.title} ({ev.category}) — {ev.date}
                    </option>
                  ))}
                </select>
                {errors.event && <small role="alert">{errors.event}</small>}
              </label>

              <button
                className="primary-btn submit-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span>SUBMITTING REGISTRATION...</span>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span>SUBMIT REGISTRATION</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="privacy-note">
                Direct registration demonstration · Data stored safely in browser storage.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
