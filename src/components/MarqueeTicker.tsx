import { Sparkles } from 'lucide-react'

export function MarqueeTicker() {
  return (
    <section className="ticker" aria-label="Festival highlights marquee">
      <div className="ticker-track">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>
            MAKE SOME NOISE <Sparkles size={15} aria-hidden="true" /> MAKE SOME
            MEMORIES <span className="ticker-star">✳</span> MAKE IT MILAN{' '}
            <Sparkles size={15} aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  )
}
