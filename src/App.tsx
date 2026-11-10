import { useMemo, useState } from 'react'
import { events, categories, type EventItem } from './events'
import { AnnouncementBar } from './components/AnnouncementBar'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { MarqueeTicker } from './components/MarqueeTicker'
import { AboutSection } from './components/AboutSection'
import { EventsSection } from './components/EventsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { StatsSection } from './components/StatsSection'
import { ClosingCta } from './components/ClosingCta'
import { Footer } from './components/Footer'
import { EventDetailsModal } from './components/EventDetailsModal'
import { RegistrationModal } from './components/RegistrationModal'
import { Toast } from './components/Toast'
import { validateRegistrationForm } from './utils/validation'

export function App() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [query, setQuery] = useState<string>('')
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false)
  const [registerInitialEvent, setRegisterInitialEvent] = useState<EventItem | null>(null)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  // Compatibility validator hook reference
  const validate = validateRegistrationForm

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events.filter((e) => {
      const matchesCategory = activeCategory === 'All' || e.category === activeCategory
      const searchTarget = `${e.title} ${e.category} ${e.description} ${e.venue} ${e.tag}`.toLowerCase()
      const matchesQuery = q === '' || searchTarget.includes(q)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const triggerToast = (message: string) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 3500)
  }

  const handleOpenRegister = (event?: EventItem) => {
    setRegisterInitialEvent(event || null)
    setRegisterModalOpen(true)
    setSelectedEvent(null)
  }

  const handleCloseRegister = () => {
    setRegisterModalOpen(false)
    setRegisterInitialEvent(null)
  }

  return (
    <div className="site-shell">
      <AnnouncementBar onExploreClick={() => scrollTo('events')} />

      <Navbar
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((prev) => !prev)}
        onNavigate={scrollTo}
        onOpenRegister={() => handleOpenRegister()}
      />

      <main>
        <Hero onExploreEvents={() => scrollTo('events')} />
        <MarqueeTicker />
        <AboutSection />

        <EventsSection
          events={filteredEvents}
          categories={categories}
          activeCategory={activeCategory}
          query={query}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onQueryChange={(q) => setQuery(q)}
          onClearFilters={() => {
            setQuery('')
            setActiveCategory('All')
          }}
          onSelectEvent={(ev) => setSelectedEvent(ev)}
          onOpenRegister={() => handleOpenRegister()}
        />

        <ExperienceSection onOpenRegister={() => handleOpenRegister()} />
        <StatsSection />
        <ClosingCta onOpenRegister={() => handleOpenRegister()} />
      </main>

      <Footer onBackToTop={() => scrollTo('home')} />

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={(ev) => handleOpenRegister(ev)}
        />
      )}

      {registerModalOpen && (
        <RegistrationModal
          initialEvent={registerInitialEvent}
          events={events}
          onClose={handleCloseRegister}
          onSuccessToast={triggerToast}
        />
      )}

      <Toast message={toastMessage} />
    </div>
  )
}

export default App
