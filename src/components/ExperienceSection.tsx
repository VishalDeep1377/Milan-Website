import { ArrowUpRight } from 'lucide-react'

interface ExperienceSectionProps {
  onOpenRegister: () => void
}

export function ExperienceSection({ onOpenRegister }: ExperienceSectionProps) {
  return (
    <section
      className="experience-section section-pad"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="container experience-grid">
        <div className="section-index">
          <span>03</span>
          <i aria-hidden="true" /> THE FEELING
        </div>

        <div className="experience-copy">
          <p className="eyebrow">COME AS YOU ARE</p>
          <h2 id="experience-heading">
            Leave with
            <br />
            <em>a thousand stories.</em>
          </h2>
          <p className="experience-desc">
            Bring your crew. Meet your people. Try something you have never tried
            before. Milan is a space to show up, stand out, and celebrate what
            makes us different.
          </p>
          <button
            type="button"
            className="large-link"
            onClick={onOpenRegister}
            aria-label="Register and make your Milan moment"
          >
            MAKE YOUR MILAN MOMENT{' '}
            <span>
              <ArrowUpRight size={21} aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="experience-art" aria-hidden="true">
          <div className="exp-sun" />
          <div className="exp-type">
            M<br />
            26
          </div>
          <span className="exp-caption">CULTURE IN EVERY COLOUR</span>
        </div>
      </div>
    </section>
  )
}
