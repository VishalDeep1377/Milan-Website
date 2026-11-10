import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

function getCategoryPrefix(eventName) {
  const map = {
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

function generateRegistrationNumber(eventName) {
  const prefix = getCategoryPrefix(eventName)
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  return `MILAN26-${prefix}-${randomSuffix}`
}

function isDuplicate(records, email, phone, eventTitle) {
  const cleanEmail = email.trim().toLowerCase()
  const cleanPhone = phone.replace(/[\s-]/g, '')
  return records.some(
    (r) =>
      r.event === eventTitle &&
      (r.email.trim().toLowerCase() === cleanEmail ||
        r.phone.replace(/[\s-]/g, '') === cleanPhone)
  )
}

describe('Registration Service & Ticket Code Suite', () => {
  it('should generate official ticket code with correct category prefix and format', () => {
    const musicCode = generateRegistrationNumber('Pulse of the Planet')
    assert.match(musicCode, /^MILAN26-MUS-\d{4}$/)

    const danceCode = generateRegistrationNumber('Battle of the Beats')
    assert.match(danceCode, /^MILAN26-DNC-\d{4}$/)

    const artsCode = generateRegistrationNumber('The Grand Canvas')
    assert.match(artsCode, /^MILAN26-ART-\d{4}$/)
  })

  it('should detect duplicate registrations for the same event by email', () => {
    const existing = [
      {
        name: 'Rohan Verma',
        email: 'rohan.v@srmist.edu.in',
        phone: '9812345678',
        college: 'SRMIST',
        event: 'Pulse of the Planet',
        registrationNumber: 'MILAN26-MUS-1234'
      }
    ]

    const isDup = isDuplicate(existing, 'rohan.v@srmist.edu.in', '9999999999', 'Pulse of the Planet')
    assert.equal(isDup, true)

    // Different event should be allowed
    const differentEvent = isDuplicate(existing, 'rohan.v@srmist.edu.in', '9999999999', 'Mic Drop')
    assert.equal(differentEvent, false)
  })

  it('should detect duplicate registrations for the same event by phone', () => {
    const existing = [
      {
        name: 'Pooja Iyer',
        email: 'pooja@example.com',
        phone: '9845012345',
        college: 'SRMIST',
        event: 'Battle of the Beats',
        registrationNumber: 'MILAN26-DNC-5678'
      }
    ]

    const isDup = isDuplicate(existing, 'different.email@example.com', '98450 12345', 'Battle of the Beats')
    assert.equal(isDup, true)
  })
})
