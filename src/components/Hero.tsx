import { ArrowDownRight } from 'lucide-react'

interface HeroProps {
  onExploreEvents: () => void
}

export function Hero({ onExploreEvents }: HeroProps) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb orb-one" aria-hidden="true" />
      <div className="hero-orb orb-two" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-kicker">
          <span className="kicker-line" aria-hidden="true" />
          SRM INSTITUTE OF SCIENCE AND TECHNOLOGY{' '}
          <span className="kicker-year">PRESENTS · 2026</span>
        </div>

        <h1 id="hero-title">
          FIND YOUR
          <br />
          <span className="outline-word">FREQUENCY</span>
          <span className="hero-period">.</span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-copy">
            A collision of culture, creativity
            <br />
            and everything in between.
          </p>

          <div className="hero-meta">
            <div>
              <span className="meta-label">WHEN</span>
              <strong>18 — 20 DEC</strong>
            </div>
            <div>
              <span className="meta-label">WHERE</span>
              <strong>CHENNAI, INDIA</strong>
            </div>
          </div>

          <button
            type="button"
            className="round-link"
            onClick={onExploreEvents}
            aria-label="Scroll down to festival events lineup"
          >
            <ArrowDownRight size={25} aria-hidden="true" />
          </button>
        </div>

        <div className="hero-side-note" aria-hidden="true">
          THREE DAYS. ONE CAMPUS. INFINITE STORIES.
        </div>
      </div>

      <div className="hero-footer">
        <span>01 / 04 — THE BEGINNING</span>
        <span className="scroll-hint">
          SCROLL TO EXPLORE <ArrowDownRight size={13} aria-hidden="true" />
        </span>
        <span>12°49' N&nbsp; 80°02' E</span>
      </div>
    </section>
  )
}
