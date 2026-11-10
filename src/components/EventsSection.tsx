import { ArrowDownRight, ArrowRight, ArrowUpRight, Search, X } from 'lucide-react'
import type { EventItem } from '../types'
import { EventCard } from './EventCard'

interface EventsSectionProps {
  events: EventItem[]
  categories: string[]
  activeCategory: string
  query: string
  onSelectCategory: (category: string) => void
  onQueryChange: (query: string) => void
  onClearFilters: () => void
  onSelectEvent: (event: EventItem) => void
  onOpenRegister: () => void
}

export function EventsSection({
  events,
  categories,
  activeCategory,
  query,
  onSelectCategory,
  onQueryChange,
  onClearFilters,
  onSelectEvent,
  onOpenRegister
}: EventsSectionProps) {
  return (
    <section className="events-section section-pad" id="events" aria-labelledby="events-heading">
      <div className="container">
        <div className="section-top">
          <div>
            <div className="section-index">
              <span>02</span>
              <i aria-hidden="true" /> THE LINEUP
            </div>
            <p className="eyebrow">PICK YOUR PLAYGROUND</p>
            <h2 id="events-heading">
              What's <em>your thing?</em>
            </h2>
          </div>
          <p className="section-aside">
            From the first beat to the final curtain.
            <br />
            Find the event that feels like yours.
          </p>
        </div>

        <div className="filter-bar" role="search" aria-label="Event search and category filters">
          <div className="category-list" role="tablist" aria-label="Event categories">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={activeCategory === c}
                className={activeCategory === c ? 'active' : ''}
                onClick={() => onSelectCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="search-box">
            <Search size={16} aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Find an event..."
              aria-label="Search events"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </label>
        </div>

        <div className="results-line" aria-live="polite">
          <span>{events.length.toString().padStart(2, '0')} EVENTS FOUND</span>
          <span>
            SELECT AN EVENT TO DISCOVER MORE <ArrowDownRight size={13} aria-hidden="true" />
          </span>
        </div>

        {events.length > 0 ? (
          <div className="event-grid">
            {events.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                onSelect={onSelectEvent}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <Search size={28} aria-hidden="true" />
            <h3>No events found.</h3>
            <p>Try another keyword or choose a different category.</p>
            <button
              type="button"
              className="text-link"
              onClick={onClearFilters}
            >
              CLEAR ALL FILTERS <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="events-bottom">
          <span>MORE THAN AN EVENT. A WHOLE NEW ENERGY.</span>
          <button type="button" onClick={onOpenRegister}>
            READY TO BE THERE? <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
