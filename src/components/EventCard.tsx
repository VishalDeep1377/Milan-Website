import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import type { EventItem } from '../types'

interface EventCardProps {
  event: EventItem
  index: number
  onSelect: (event: EventItem) => void
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

export function EventCard({ event, index, onSelect }: EventCardProps) {
  const glyph = getCategoryGlyph(event.category)

  return (
    <article
      className={`event-card ${event.accent}`}
      style={{ '--delay': `${index * 60}ms` } as React.CSSProperties}
      onClick={() => onSelect(event)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(event)
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${event.title}`}
    >
      <div className="event-card-top">
        <span className="event-number">0{event.id}</span>
        <span className="event-tag">{event.tag}</span>
        <button
          type="button"
          className="card-arrow"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(event)
          }}
          aria-label={`Open ${event.title} details`}
        >
          <ArrowUpRight size={19} aria-hidden="true" />
        </button>
      </div>

      <div className="event-art" aria-hidden="true">
        <div className="art-ring ring-a" />
        <div className="art-ring ring-b" />
        <span className="art-glyph">{glyph}</span>
        <span className="art-caption">
          {event.category.toUpperCase()} / MILAN 26
        </span>
      </div>

      <div className="event-info">
        <span className="event-category">{event.category}</span>
        <h3>{event.title}</h3>
        <p>{event.description}</p>

        <div className="event-details">
          <span>
            <CalendarDays size={13} aria-hidden="true" />
            {event.date}
          </span>
          <span>
            <MapPin size={13} aria-hidden="true" />
            {event.venue}
          </span>
        </div>

        <button
          type="button"
          className="text-link"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(event)
          }}
        >
          EXPLORE EVENT <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
