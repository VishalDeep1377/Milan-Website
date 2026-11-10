import { useEffect, useRef } from 'react'
import { ArrowUpRight, CalendarDays, MapPin, Ticket, Users, X } from 'lucide-react'
import type { EventItem } from '../types'

interface EventDetailsModalProps {
  event: EventItem
  onClose: () => void
  onRegister: (event: EventItem) => void
}

function getCategoryGlyph(category: string): string {
  switch (category) {
    case 'Music':
      return '♫'
    case 'Dance':
      return '✳'
    case 'Fine Arts':
      return '◒'
    case 'Photography':
      return '◎'
    case 'Literary':
      return '“'
    case 'Theatre':
      return '✦'
    default:
      return '⌘'
  }
}

export function EventDetailsModal({
  event,
  onClose,
  onRegister
}: EventDetailsModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Focus close button on mount
    closeBtnRef.current?.focus()

    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Handle Escape key
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

  const glyph = getCategoryGlyph(event.category)

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="event-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close event details modal"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className={`modal-art ${event.accent}`}>
          <span>{event.category.toUpperCase()} / MILAN 26</span>
          <strong>{glyph}</strong>
          <small>0{event.id}</small>
        </div>

        <div className="modal-content">
          <span className="eyebrow">
            {event.tag} · {event.category}
          </span>
          <h2 id="modal-title">{event.title}</h2>
          <p>{event.longDescription}</p>

          <div className="modal-facts">
            <span>
              <CalendarDays aria-hidden="true" />
              {event.date} · {event.time}
            </span>
            <span>
              <MapPin aria-hidden="true" />
              {event.venue}
            </span>
            <span>
              <Users aria-hidden="true" />
              {event.team}
            </span>
            <span>
              <Ticket aria-hidden="true" />
              {event.prize}
            </span>
          </div>

          <button
            type="button"
            className="primary-btn"
            onClick={() => onRegister(event)}
          >
            REGISTER FOR THIS EVENT <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
