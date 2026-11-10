import { ArrowUpRight } from 'lucide-react'

interface ClosingCtaProps {
  onOpenRegister: () => void
}

export function ClosingCta({ onOpenRegister }: ClosingCtaProps) {
  return (
    <section className="closing-cta" aria-labelledby="closing-title">
      <div className="container closing-inner">
        <p className="eyebrow">YOUR STAGE IS WAITING</p>
        <h2 id="closing-title">
          DON'T JUST
          <br />
          <span>HEAR ABOUT IT.</span>
        </h2>
        <button
          type="button"
          onClick={onOpenRegister}
          aria-label="Register for Milan 2026 now"
        >
          COUNT ME IN <ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <div className="closing-orbit" aria-hidden="true" />
      </div>
    </section>
  )
}
