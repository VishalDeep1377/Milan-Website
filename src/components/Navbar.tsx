import { ArrowUpRight, Menu, X } from 'lucide-react'

interface NavbarProps {
  mobileOpen: boolean
  onToggleMobile: () => void
  onNavigate: (sectionId: string) => void
  onOpenRegister: () => void
}

export function Navbar({
  mobileOpen,
  onToggleMobile,
  onNavigate,
  onOpenRegister
}: NavbarProps) {
  return (
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Main Navigation">
        <a
          className="brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            onNavigate('home')
          }}
          aria-label="Milan 2026 Home"
        >
          <img
            src="/images/milan-mark.svg"
            alt=""
            className="brand-logo-img"
            width={34}
            height={34}
            aria-hidden="true"
          />
          <span>
            MILAN<span className="brand-year">26</span>
          </span>
        </a>

        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <button type="button" onClick={() => onNavigate('home')}>
            Home
          </button>
          <button type="button" onClick={() => onNavigate('about')}>
            About
          </button>
          <button type="button" onClick={() => onNavigate('events')}>
            Events
          </button>
          <button type="button" onClick={() => onNavigate('experience')}>
            Experience
          </button>
          <button
            type="button"
            className="mobile-register"
            onClick={onOpenRegister}
          >
            Register <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="nav-actions">
          <span className="edition">SRMIST · KTR</span>
          <button
            type="button"
            className="nav-cta"
            onClick={onOpenRegister}
            aria-label="Get your festival pass"
          >
            Get your pass <ArrowUpRight size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="menu-btn"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={onToggleMobile}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
