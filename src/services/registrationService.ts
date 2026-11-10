import type { RegistrationFormData, RegistrationRecord } from '../types'

const STORAGE_KEY = 'milan-registrations'

function getCategoryPrefix(eventName: string): string {
  const map: Record<string, string> = {
    'Pulse of the Planet': 'MUS',
    'The Grand Canvas': 'ART',
    'Battle of the Beats': 'DNC',
    'Frame by Frame': 'PHT',
    'Mic Drop': 'LIT',
    'Rhythm & Roots': 'MUS',
    'Theatre Unscripted': 'DRA',
    'Pixel Playground': 'ESPORTS'
  }
  return map[eventName] || 'GEN'
}

export function generateRegistrationNumber(eventName: string): string {
  const prefix = getCategoryPrefix(eventName)
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  return `MILAN26-${prefix}-${randomSuffix}`
}

export const registrationService = {
  getAll(): RegistrationRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  },

  isDuplicate(email: string, phone: string, eventTitle: string): boolean {
    const records = this.getAll()
    const cleanEmail = email.trim().toLowerCase()
    const cleanPhone = phone.replace(/\s+/g, '')
    return records.some(
      (r) =>
        r.event === eventTitle &&
        (r.email.trim().toLowerCase() === cleanEmail ||
          r.phone.replace(/\s+/g, '') === cleanPhone)
    )
  },

  async submit(data: RegistrationFormData): Promise<{ success: boolean; record?: RegistrationRecord; error?: string }> {
    // Check if external API is configured
    const apiUrl = import.meta.env.VITE_API_URL
    const useMock = import.meta.env.VITE_USE_MOCK_API !== 'false'

    if (apiUrl && !useMock) {
      try {
        const response = await fetch(`${apiUrl}/api/registrations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        const result = await response.json()
        if (!response.ok) {
          return { success: false, error: result.message || 'Registration failed' }
        }
        return { success: true, record: result.data }
      } catch (err) {
        console.warn('API submission failed, falling back to local storage', err)
      }
    }

    // Default Local Persistence with simulated network latency
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (this.isDuplicate(data.email, data.phone, data.event)) {
      return {
        success: false,
        error: 'You are already registered for this event with this email or phone number.'
      }
    }

    const regNumber = generateRegistrationNumber(data.event)
    const record: RegistrationRecord = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `reg-${Date.now()}`,
      registrationNumber: regNumber,
      submittedAt: new Date().toISOString()
    }

    const previous = this.getAll()
    const updated = [...previous, record]
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error('Failed to save registration', e)
    }

    return { success: true, record }
  }
}
